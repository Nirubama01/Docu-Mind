import os
from pathlib import Path

from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from sqlalchemy import create_engine, text
from pgvector.sqlalchemy import Vector

load_dotenv(Path(__file__).resolve().parent / ".env")
load_dotenv()

from app.database.config import DATABASE_URL
database_url = DATABASE_URL

engine = create_engine(database_url, connect_args={"password": os.environ["PGPASSWORD"]})

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

with engine.begin() as connection:
    documents = connection.execute(
        text("""
            SELECT id, content
            FROM documents
            WHERE content IS NOT NULL
            ORDER BY id
        """)
    ).fetchall()

    if not documents:
        raise RuntimeError("No documents with stored text were found.")

    embeddings = []
    for document_id, content in documents:
        vector = model.encode(content).tolist()
        if len(vector) != 384:
            raise RuntimeError(
                f"Document {document_id}: expected 384 dimensions, "
                f"got {len(vector)}"
            )
        embeddings.append((document_id, vector))

    connection.execute(
        text("DELETE FROM document_vectors")
    )

    connection.execute(
        text("""
            ALTER TABLE document_vectors
            ALTER COLUMN embedding TYPE vector(384)
        """)
    )

    insert_vector = text("""
        INSERT INTO document_vectors (document_id, embedding)
        VALUES (:document_id, :embedding)
        ON CONFLICT (document_id)
        DO UPDATE SET embedding = EXCLUDED.embedding
    """)

    for document_id, vector in embeddings:
        connection.execute(
            insert_vector,
            {
                "document_id": document_id,
                "embedding": Vector(384).bind_processor(engine.dialect)(vector),
            },
        )

    result = connection.execute(
        text("""
            SELECT COUNT(*) AS total_vectors,
                   MIN(vector_dims(embedding)) AS min_dimensions,
                   MAX(vector_dims(embedding)) AS max_dimensions
            FROM document_vectors
        """)
    ).one()

    print(
        f"Migration successful: {result.total_vectors} vectors; "
        f"dimensions {result.min_dimensions}–{result.max_dimensions}."
    )

engine.dispose()

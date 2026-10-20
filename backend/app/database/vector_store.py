
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.document import Document
from app.models.document_vector import DocumentVector


def similarity_search(
    db: Session,
    query_embedding: list[float],
    limit: int = 5,
    document_id: int | None = None,
):
    statement = (
        select(Document, DocumentVector)
        .join(
            DocumentVector,
            Document.id == DocumentVector.document_id,
        )
    )

    if document_id is not None:
        statement = statement.where(Document.id == document_id)

    statement = (
        statement
        .order_by(
            DocumentVector.embedding.cosine_distance(query_embedding)
        )
        .limit(limit)
    )

    return db.execute(statement).all()

from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.app.models.document_vector import DocumentVector


def similarity_search(
    db: Session,
    query_embedding: list[float],
    limit: int = 5,
):
    statement = (
        select(DocumentVector)
        .order_by(DocumentVector.embedding.cosine_distance(query_embedding))
        .limit(limit)
    )

    return db.scalars(statement).all()

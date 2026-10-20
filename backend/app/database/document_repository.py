from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.document import Document
from app.models.document_vector import DocumentVector


def create_document(
    db: Session,
    filename: str,
    content: str | None = None,
) -> Document:
    document = Document(
        filename=filename,
        content=content,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def get_document(
    db: Session,
    document_id: int,
) -> Document | None:
    statement = select(Document).where(
        Document.id == document_id
    )

    return db.scalar(statement)


def get_documents(
    db: Session,
    skip: int = 0,
    limit: int = 20,
) -> list[Document]:
    statement = (
        select(Document)
        .order_by(Document.created_at.desc())
        .offset(skip)
        .limit(limit)
    )

    return list(db.scalars(statement).all())


def save_document_embedding(
    db: Session,
    document_id: int,
    embedding: list[float],
) -> DocumentVector:
    existing_embedding = db.scalar(
        select(DocumentVector).where(
            DocumentVector.document_id == document_id
        )
    )

    if existing_embedding is not None:
        existing_embedding.embedding = embedding
        db.commit()
        db.refresh(existing_embedding)

        return existing_embedding

    document_vector = DocumentVector(
        document_id=document_id,
        embedding=embedding,
    )

    db.add(document_vector)
    db.commit()
    db.refresh(document_vector)

    return document_vector


def get_document_embedding(
    db: Session,
    document_id: int,
) -> DocumentVector | None:
    statement = select(DocumentVector).where(
        DocumentVector.document_id == document_id
    )

    return db.scalar(statement)
def delete_document(
    db: Session,
    document_id: int,
) -> bool:
    document = get_document(
        db=db,
        document_id=document_id,
    )

    if document is None:
        return False

    try:
        db.query(DocumentVector).filter(
            DocumentVector.document_id == document_id
        ).delete(synchronize_session=False)

        db.delete(document)
        db.commit()
        return True

    except Exception:
        db.rollback()
        raise

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session


from app.database.document_repository import (
    create_document,
    delete_document,
    get_document,
    get_documents,
    save_document_embedding,
)

from app.database.vector_db import get_db

router = APIRouter(
    prefix="/documents",
    tags=["documents"],
)


@router.post("/")
def create_document_endpoint(
    filename: str,
    content: str | None = None,
    db: Session = Depends(get_db),
):
    document = create_document(
        db=db,
        filename=filename,
        content=content,
    )

    return {
        "id": document.id,
        "filename": document.filename,
        "content": document.content,
        "created_at": document.created_at,
    }


@router.get("/")
def list_documents_endpoint(
    skip: int = Query(
        default=0,
        ge=0,
        description="Number of documents to skip",
    ),
    limit: int = Query(
        default=20,
        ge=1,
        le=100,
        description="Maximum number of documents to return",
    ),
    db: Session = Depends(get_db),
):
    documents = get_documents(
        db=db,
        skip=skip,
        limit=limit,
    )

    return [
        {
            "id": document.id,
            "filename": document.filename,
            "content": document.content,
            "created_at": document.created_at,
        }
        for document in documents
    ]


@router.get("/{document_id}")
def get_document_endpoint(
    document_id: int,
    db: Session = Depends(get_db),
):
    document = get_document(
        db=db,
        document_id=document_id,
    )

    if document is None:
        return {
            "error": "Document not found",
        }

    return {
        "id": document.id,
        "filename": document.filename,
        "content": document.content,
        "created_at": document.created_at,
    }


@router.post("/{document_id}/embedding")
def save_embedding_endpoint(
    document_id: int,
    embedding: list[float],
    db: Session = Depends(get_db),
):
    document = get_document(
        db=db,
        document_id=document_id,
    )

    if document is None:
        return {
            "error": "Document not found",
        }

    document_vector = save_document_embedding(
        db=db,
        document_id=document_id,
        embedding=embedding,
    )

    return {
        "id": document_vector.id,
        "document_id": document_vector.document_id,
        "message": "Embedding saved successfully",
    }
@router.delete("/{document_id}")
def delete_document_endpoint(
    document_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_document(
        db=db,
        document_id=document_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    return {
        "message": "Document deleted successfully",
        "id": document_id,
    }

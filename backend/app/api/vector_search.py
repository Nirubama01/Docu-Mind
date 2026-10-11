from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.app.database.vector_db import get_db
from backend.app.database.vector_store import similarity_search
from backend.app.services.embedding_service import create_embedding

router = APIRouter(
    prefix="/search",
    tags=["vector search"],
)


class TextSearchRequest(BaseModel):
    query: str


@router.post("/")
def search_documents(
    query_embedding: list[float],
    limit: int = Query(
        default=5,
        ge=1,
        le=50,
        description="Maximum number of similar documents to return",
    ),
    db: Session = Depends(get_db),
):
    if len(query_embedding) != 384:
        raise HTTPException(
            status_code=400,
            detail=(
                "Invalid embedding dimension. "
                "Expected 384 values."
            ),
        )

    results = similarity_search(
        db=db,
        query_embedding=query_embedding,
        limit=limit,
    )

    return [
        {
            "document_id": document.id,
            "filename": document.filename,
            "content": document.content,
            "vector_id": document_vector.id,
        }
        for document, document_vector in results
    ]


@router.post("/text")
def search_documents_by_text(
    request: TextSearchRequest,
    limit: int = Query(
        default=5,
        ge=1,
        le=50,
        description="Maximum number of similar documents to return",
    ),
    db: Session = Depends(get_db),
):
    query_text = request.query.strip()

    if not query_text:
        raise HTTPException(
            status_code=400,
            detail="Search query cannot be empty.",
        )

    query_embedding = create_embedding(query_text)

    results = similarity_search(
        db=db,
        query_embedding=query_embedding,
        limit=limit,
    )

    return [
        {
            "document_id": document.id,
            "filename": document.filename,
            "content": document.content,
            "vector_id": document_vector.id,
        }
        for document, document_vector in results
    ]

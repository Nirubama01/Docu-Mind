from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.vector_db import get_db
from app.database.vector_store import similarity_search
from app.services.embedding_service import create_embedding
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/v1/rag",
    tags=["rag"],
)


class RAGQuery(BaseModel):
    question: str
    document_id: int | None = None


@router.post("/query")
def rag_query(
    request: RAGQuery,
    db: Session = Depends(get_db),
):
    query_embedding = create_embedding(request.question)

    results = similarity_search(
        db=db,
        query_embedding=query_embedding,
        limit=5,
    )

    return {
        "answer": "Relevant documents retrieved successfully.",
        "sources": [
            {
                "document_id": result.document_id,
            }
            for result in results
        ],
    }
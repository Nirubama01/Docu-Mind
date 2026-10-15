from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
import ollama

from app.database.vector_db import get_db
from app.database.vector_store import similarity_search
from app.services.embedding_service import create_embedding


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
    try:
        query_embedding = create_embedding(request.question)

        results = similarity_search(
            db=db,
            query_embedding=query_embedding,
            limit=5,
        )

        documents = []

        for document, vector in results:
            if (
                request.document_id is not None
                and document.id != request.document_id
            ):
                continue

            if document.content:
                documents.append(document)

        if not documents:
            return {
                "answer": (
                    "I couldn't find relevant document content "
                    "to answer your question."
                ),
                "sources": [],
            }

        context = "\n\n".join(
            f"Document: {document.filename}\n"
            f"Document ID: {document.id}\n"
            f"Content:\n{document.content}"
            for document in documents
        )

        response = ollama.chat(
            model="llama3.2:1b",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are DocuMind, a document question-answering "
                        "assistant. Use only the supplied document context. "
                        "The context may contain PDF text in an imperfect "
                        "reading order. Distinguish stage headings from the "
                        "activities listed beneath them. Do not treat every "
                        "activity as a separate career stage. Do not invent "
                        "missing stages or reorder the source silently. "
                        "If the source order is ambiguous, say that the "
                        "extracted text order is unclear. For questions "
                        "asking for all stages, list only headings that "
                        "include a stage name and time period, and include "
                        "their time periods exactly as written."
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        f"Document context:\n{context}\n\n"
                        f"Question: {request.question}"
                    ),
                },
            ],
            options={
                "temperature": 0,
                "num_predict": 500,
            },
        )

        answer = response.message.content

        return {
            "answer": answer,
            "sources": [
                {
                    "document_id": document.id,
                    "filename": document.filename,
                    "content": document.content,
                }
                for document in documents
            ],
        }

    except ollama.ResponseError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Ollama model error: {exc}",
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"RAG query failed: {exc}",
        ) from exc

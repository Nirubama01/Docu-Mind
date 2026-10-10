from pathlib import Path

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session

from app.services.document_processor import process_document
from app.services.embedding_service import create_embedding
from app.database.vector_db import get_db
from app.database.document_repository import (
    create_document,
    save_document_embedding,
)

router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    file_path = UPLOAD_DIR / file.filename

    try:
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        extracted_text = process_document(str(file_path))

        document = create_document(
            db=db,
            filename=file.filename,
            content=extracted_text,
        )

        if extracted_text.strip():
            embedding = create_embedding(extracted_text)

            save_document_embedding(
                db=db,
                document_id=document.id,
                embedding=embedding,
            )

        return {
            "id": document.id,
            "filename": file.filename,
            "content_type": file.content_type,
            "message": "Document uploaded and indexed successfully",
            "extracted_text": extracted_text,
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Document upload or indexing failed: {exc}",
        ) from exc
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.services.document_processor import process_document
from app.database.vector_db import get_db
from app.database.document_repository import create_document

router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    extracted_text = process_document(str(file_path))

    document = create_document(
        db=db,
        filename=file.filename,
        content=extracted_text,
    )

    return {
        "id": document.id,
        "filename": file.filename,
        "content_type": file.content_type,
        "message": "Document uploaded successfully",
        "extracted_text": extracted_text,
    }
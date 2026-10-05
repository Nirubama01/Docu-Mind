from pathlib import Path

import pymupdf

from .ocr_processor import extract_text_from_image


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from a PDF.

    First, try normal PDF text extraction using PyMuPDF.
    If a page contains no extractable text, render that page
    as an image and use OCR.
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    if not path.is_file():
        raise ValueError(f"Path is not a file: {file_path}")

    document = pymupdf.open(str(path))
    pages_text = []

    try:
        for page in document:
            text = page.get_text().strip()

            if text:
                pages_text.append(text)
                continue

            pixmap = page.get_pixmap()
            image_path = path.parent / f".ocr_{path.stem}_{page.number}.png"

            try:
                pixmap.save(str(image_path))
                ocr_text = extract_text_from_image(str(image_path))

                if ocr_text:
                    pages_text.append(ocr_text)
            finally:
                if image_path.exists():
                    image_path.unlink()

    finally:
        document.close()

    return "\n\n".join(pages_text).strip()
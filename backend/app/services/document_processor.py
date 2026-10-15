from pathlib import Path

from .image_processor import process_image
from .pdf_processor import extract_text_from_pdf
from .text_extractor import extract_text_from_txt


SUPPORTED_EXTENSIONS = {".pdf", ".jpg", ".jpeg", ".png", ".txt"}


def process_document(file_path: str) -> str:
    """
    Process a supported document and return its extracted text.
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    if not path.is_file():
        raise ValueError(f"Path is not a file: {file_path}")

    extension = path.suffix.lower()

    if extension not in SUPPORTED_EXTENSIONS:
        raise ValueError(
            f"Unsupported file type: {extension}. "
            f"Supported types: {', '.join(sorted(SUPPORTED_EXTENSIONS))}"
        )

    if extension == ".txt":
        return extract_text_from_txt(str(path))

    if extension == ".pdf":
        return extract_text_from_pdf(str(path))

    return process_image(str(path))
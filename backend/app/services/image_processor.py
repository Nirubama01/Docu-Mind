from pathlib import Path

from .ocr_processor import extract_text_from_image


SUPPORTED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png"}


def process_image(file_path: str) -> str:
    """
    Process an image document and extract its text using OCR.
    """
    path = Path(file_path)

    if path.suffix.lower() not in SUPPORTED_IMAGE_EXTENSIONS:
        raise ValueError(
            f"Unsupported image format: {path.suffix}. "
            f"Supported formats: {', '.join(sorted(SUPPORTED_IMAGE_EXTENSIONS))}"
        )

    return extract_text_from_image(str(path))
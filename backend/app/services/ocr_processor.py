from pathlib import Path

import pytesseract
from PIL import Image


TESSERACT_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def extract_text_from_image(file_path: str) -> str:
    """
    Extract text from an image using Tesseract OCR.
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    if not path.is_file():
        raise ValueError(f"Path is not a file: {file_path}")

    if not Path(TESSERACT_PATH).exists():
        raise FileNotFoundError(
            f"Tesseract executable not found at: {TESSERACT_PATH}"
        )

    pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

    with Image.open(path) as image:
        text = pytesseract.image_to_string(image)

    return text.strip()
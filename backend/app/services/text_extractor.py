from pathlib import Path


def extract_text_from_txt(file_path: str) -> str:
    """
    Extract text from a plain-text document.

    The file is decoded as UTF-8. If the document contains a UTF-8 BOM,
    it is handled automatically.
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    if not path.is_file():
        raise ValueError(f"Path is not a file: {file_path}")

    return path.read_text(encoding="utf-8-sig")
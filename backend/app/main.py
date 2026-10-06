from fastapi import FastAPI

from backend.app.api.database import router as database_router
from backend.app.api.documents import router as documents_router
from backend.app.api.vector_search import router as vector_search_router

app = FastAPI(
    title="DocuMind API",
    description="Backend API for the DocuMind document intelligence system",
    version="1.0.0",
)

app.include_router(database_router, prefix="/api/v1")
app.include_router(documents_router, prefix="/api/v1")
app.include_router(vector_search_router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "DocuMind API is running"}

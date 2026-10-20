from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.health import router as health_router
from app.routes.documents import router as documents_router
from app.api.documents import router as database_documents_router
from app.api.rag import router as rag_router
from app.api.database import router as database_router
from app.api.vector_search import router as vector_search_router

app = FastAPI(
    title="DocuMind API",
    description="Backend API for the DocuMind document intelligence system",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "DocuMind API is running"}


app.include_router(health_router)
app.include_router(documents_router)
app.include_router(database_documents_router)
app.include_router(rag_router)
app.include_router(database_router, prefix="/api/v1")
app.include_router(vector_search_router, prefix="/api/v1")

from fastapi import FastAPI
from app.routes.health import router as health_router
from app.routes.documents import router as documents_router
from app.api.documents import router as database_documents_router
from app.api.rag import router as rag_router

app = FastAPI(
    title="DocuMind API",
    description="Backend API for the DocuMind document intelligence system",
    version="1.0.0",
)


@app.get("/")
def root():
    return {"message": "DocuMind API is running"}


app.include_router(health_router)
app.include_router(documents_router)
app.include_router(database_documents_router)
app.include_router(rag_router)
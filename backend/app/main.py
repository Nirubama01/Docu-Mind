from fastapi import FastAPI

from backend.app.api.database import router as database_router

app = FastAPI(title="DocuMind API")

app.include_router(database_router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "DocuMind API is running"}

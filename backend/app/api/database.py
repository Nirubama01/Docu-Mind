from fastapi import APIRouter

router = APIRouter(prefix="/database", tags=["database"])


@router.get("/health")
def database_health():
    return {"status": "ok"}

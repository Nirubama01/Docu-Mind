from backend.app.database.vector_db import engine
from backend.app.models import Base


def init_db():
    Base.metadata.create_all(bind=engine)

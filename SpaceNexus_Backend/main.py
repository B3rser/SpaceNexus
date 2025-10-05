# main.py
from fastapi import FastAPI
from app.api.endpoints import graph  
from app.api.endpoints import labels 
from app.api.endpoints import graph, labels, articles
from app.api.endpoints import search 
 
app = FastAPI(
    title="Space Biology Knowledge Engine API",
    description="API para interactuar con el Knowledge Graph de Biología Espacial.",
    version="1.0.0"
)

#Imports de los routers
app.include_router(graph.router, tags=["Graph"])
app.include_router(labels.router, tags=["Labels"])
app.include_router(articles.router, tags=["Articles"]) 
app.include_router(search.router, tags=["Search"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the Space Biology Knowledge Engine API"}
# main.py
from fastapi import FastAPI
from app.api.endpoints import graph  
from app.api.endpoints import labels 
from app.api.endpoints import graph, labels, articles # <-- 1. IMPORTA ARTICLES

 
# Creamos la instancia principal de la aplicación
app = FastAPI(
    title="Space Biology Knowledge Engine API",
    description="API para interactuar con el Knowledge Graph de Biología Espacial.",
    version="1.0.0"
)

app.include_router(graph.router, tags=["Graph"])
app.include_router(labels.router, tags=["Labels"])
app.include_router(articles.router, tags=["Articles"]) 

# Una ruta de bienvenida para verificar que la API está funcionando
@app.get("/")
def read_root():
    return {"message": "Welcome to the Space Biology Knowledge Engine API"}
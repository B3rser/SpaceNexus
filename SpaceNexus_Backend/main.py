# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import graph  
from app.api.endpoints import labels 
from app.api.endpoints import graph, labels, articles
from app.api.endpoints import search 
 
app = FastAPI(
    title="Space Biology Knowledge Engine API",
    description="API para interactuar con el Knowledge Graph de Biología Espacial.",
    version="1.0.0"
)



origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"], # Permite todas las cabeceras
)


#Imports de los routers
app.include_router(graph.router, tags=["Graph"])
app.include_router(labels.router, tags=["Labels"])
app.include_router(articles.router, tags=["Articles"]) 
app.include_router(search.router, tags=["Search"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the Space Biology Knowledge Engine API"}
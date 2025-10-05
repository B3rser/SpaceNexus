import os
from app.services.semantic_search import EmbbedingsManager
import dotenv

dotenv.load_dotenv()

manager = EmbbedingsManager("./embeddings")

len(manager.db.get())
len(manager.db.get()['ids'])
print(manager.db)

query = "russian"

if manager.db is None:
    print("Error al realizar la búsqueda semántica")
else:
    results = manager.similaritySearch(query, k=4)

sources = [os.path.basename(result.metadata["source"]) for result in results]

print(sources)
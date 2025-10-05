from app.services.semantic_search import EmbbedingsManager
import os
import dotenv

dotenv.load_dotenv()

pdfs_dir = "pdfs"

pdf_paths: list[str] = [
    os.path.join(pdfs_dir, filename)
    for filename in os.listdir(pdfs_dir)
    if filename.endswith(".pdf")
]

documents = [EmbbedingsManager.loadPdf(path) for path in pdf_paths]

flat_documents = [doc for sublist in documents for doc in sublist]

EmbbedingsManager.createEmbbedings(flat_documents)

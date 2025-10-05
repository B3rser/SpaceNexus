import threading
from langchain_core.documents import Document
from langchain_openai import AzureOpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader


# singleton
class EmbbedingsManager:
    _instance = None
    _lock = threading.Lock()

    db: Chroma

    def __new__(cls, embeddings_dir: str) -> "EmbbedingsManager":
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(EmbbedingsManager, cls).__new__(cls)
                    cls._instance.__initialize(embeddings_dir)
        return cls._instance

    def __initialize(self, embeddings_dir: str) -> None:
        self.loadEmbbedings(embeddings_dir)

    @staticmethod
    def loadPdf(file_path: str) -> list[Document]:
        loader = PyPDFLoader(file_path)
        docs = loader.load()

        return docs

    @staticmethod
    def splitDocs(docs: list[Document]) -> list[Document]:
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=200, add_start_index=True
        )
        all_splits = text_splitter.split_documents(docs)

        return all_splits

    def createEmbbedings(self, docs: list[Document]) -> None:
        embeddings = AzureOpenAIEmbeddings(model="text-embedding-3-large")

        self.db.add_documents(
            documents=docs,
            embedding=embeddings,
            collection_name="collection",
            persist_directory="./embeddings",
        )

    def loadEmbbedings(self, persistDirectory: str) -> None:
        embeddings = AzureOpenAIEmbeddings(model="text-embedding-3-large")

        self.db = Chroma(
            persist_directory=persistDirectory,
            collection_name="collection",
            embedding_function=embeddings,
        )

    def similaritySearch(self, query: str, k: int = 4) -> set[str]:
        results = self.db.similarity_search(query, k=k)

        return results

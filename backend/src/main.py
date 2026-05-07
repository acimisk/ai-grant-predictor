import os
import re
import json
import uvicorn
import requests
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer

load_dotenv()

# --- Ayarlar ---
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")
INDEX_NAME = "vector_index"

app = FastAPI(
    title="GrantInsight RAG API (Ollama Edition)",
    description="Yerel Llama 3 motoru ile TÜBİTAK proje değerlendirme sistemi.",
    version="2.0.0"
)

# React bağlantısı için CORS (Burası kritik!)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("[SİSTEM] Vektör modeli belleğe alınıyor...")
# Senin veritabanına veri basarken kullandığın model neyse onu yaz (L12-v2 daha iyidir)
embedding_model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')

def get_relevant_context(query_text, top_k=3):
    """MongoDB üzerinden vektör araması yapar."""
    try:
        db_client = MongoClient(MONGO_URI)
        db = db_client[DB_NAME]
        collection = db[COLLECTION_NAME]
        query_vector = embedding_model.encode(query_text).tolist()

        pipeline = [
            {
                "$vectorSearch": {
                    "index": INDEX_NAME,
                    "path": "embedding",
                    "queryVector": query_vector,
                    "numCandidates": 100,
                    "limit": top_k
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "title": 1,
                    "abstract": 1,
                    "score": {"$meta": "vectorSearchScore"}
                }
            }
        ]
        return list(collection.aggregate(pipeline))
    except Exception as e:
        print(f"[HATA] Veritabanı araması: {e}")
        return []

@app.post("/api/analyze")
async def evaluate_project(request: Request):
    try:
        # 1. Gelen JSON verisini al
        data = await request.json()
        input_text = data.get("query", "") # React'tan 'query' olarak gelecek
        
        if not input_text:
            raise HTTPException(status_code=400, detail="Sorgu metni boş olamaz.")

        # 2. RAG (Bağlam Getirme)
        results = get_relevant_context(input_text)
        if not results:
            context_for_llm = "Referans makale bulunamadı."
        else:
            context_for_llm = "\n\n".join([f"Başlık: {r['title']}\nÖzet: {r['abstract']}" for r in results])

        # 3. Ollama (Yerel Llama 3) Promptu
        prompt = f"""
        Sen kıdemli bir TÜBİTAK proje danışmanısın. Aşağıdaki akademik makaleleri kullanarak başvuruyu analiz et.
        
        [REFERANS MAKALE ÖZETLERİ]:
        {context_for_llm}

        [DEĞERLENDİRİLECEK BAŞVURU]:
        {input_text}

        Lütfen TÜRKÇE olarak, profesyonel bir dille cevap ver.
        """

        # 4. Ollama İsteği
        ollama_response = requests.post("http://localhost:11434/api/generate", 
            json={
                "model": "llama3:latest",
                "prompt": prompt,
                "stream": False
            }
        )
        
        ai_message = ollama_response.json().get("response", "Ollama yanıt veremedi.")

        return {
            "status": "success",
            "response": ai_message,
            "sources": [{"title": r['title'], "score": round(r['score'], 4)} for r in results]
        }

    except Exception as e:
        print(f"[HATA]: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "GrantInsight RAG API is live with Ollama Support"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
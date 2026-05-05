import os
import re
import json
import uvicorn
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from dotenv import load_dotenv
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer
from google import genai

load_dotenv()

# --- Sistem Sabitleri ve API Ayarları ---
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")
INDEX_NAME = "vector_index"

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise RuntimeError("[-] HATA: .env dosyasında GOOGLE_API_KEY bulunamadı!")

# Gemini API Yeni Nesil İstemci
ai_client = genai.Client(api_key=GOOGLE_API_KEY)

# --- FastAPI Uygulaması ---
app = FastAPI(
    title="TÜBİTAK/KOSGEB Karar Destek API",
    description="LLM ve RAG tabanlı asenkron proje ön değerlendirme sistemi.",
    version="1.1.0"
)

print("[SİSTEM] Vektör modeli (SentenceTransformer) belleğe alınıyor...")
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Swagger dokümantasyonu için şema (kullanılmasa da durabilir)
class ProjectApplication(BaseModel):
    project_text: str

def get_relevant_context(query_text, top_k=3):
    """MongoDB üzerinden vektör araması yapar."""
    try:
        db_client = MongoClient(MONGO_URI)
        collection = db_client[DB_NAME][COLLECTION_NAME]
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
                    "text_content": 1
                }
            }
        ]
        results = list(collection.aggregate(pipeline))
        return [res['text_content'] for res in results]
    except Exception as e:
        print(f"[HATA] Veritabanı araması başarısız: {e}")
        return []

@app.post("/evaluate")
async def evaluate_project(request: Request):
    """Gelen veriyi temizleyip analiz eden asenkron endpoint."""
    try:
        # 1. Ham gövdeyi (body) al ve temizle
        raw_body = await request.body()
        body_str = raw_body.decode("utf-8")
        
        # JSON decode hatasına neden olan kontrol karakterlerini uçur
        safe_body_str = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', body_str)
        
        # JSON'a çevir
        data = json.loads(safe_body_str)
        input_text = data.get("project_text", "")
        
        if not input_text:
            raise ValueError("project_text alanı boş olamaz.")
            
    except Exception as e:
        print(f"[HATA] JSON İşleme Hatası: {e}")
        raise HTTPException(status_code=400, detail="JSON formatı bozuk veya geçersiz karakter içeriyor.")

    # 2. Metin Temizliği (Enter, Tab ve Tırnak karakterleri)
    clean_text = input_text.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
    clean_text = " ".join(clean_text.split())

    if len(clean_text) < 50:
        raise HTTPException(status_code=400, detail="Proje metni analiz için çok kısa.")

    # 3. RAG (Bağlam Getirme)
    similar_projects_list = get_relevant_context(clean_text)
    
    if not similar_projects_list:
        raise HTTPException(status_code=500, detail="Veritabanından referans projeler çekilemedi.")

    context_for_llm = "\n\n---\n\n".join(similar_projects_list)

    # 4. Prompt Mühendisliği (Kısa ve Öz Rapor)
    prompt = f"""
    Sen TÜBİTAK/KOSGEB panelistisin. Aşağıdaki başvuruyu, referans makalelere dayanarak 
    SADECE 3 MADDEDE ve TOPLAMDA 150 KELİMEYİ GEÇMEYECEK şekilde değerlendir.
    
    [REFERANS MAKALE PARÇALARI]:
    {context_for_llm}

    [DEĞERLENDİRİLECEK BAŞVURU]:
    {clean_text}

    Formatın tam olarak şu olsun (Dışına çıkma):
    - ÖZGÜNLÜK: (Maksimum 2 cümle)
    - KRİTİK EKSİK: (En önemli 1 eksik)
    - TAVSİYE: (Projeyi kurtaracak en önemli tavsiye)
    """

    # 5. Gemini 2.5 Flash ile Üretim
    try:
        response = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return {
            "status": "success",
            "ai_evaluation_report": response.text,
            "retrieved_similar_projects": similar_projects_list
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM hatası: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
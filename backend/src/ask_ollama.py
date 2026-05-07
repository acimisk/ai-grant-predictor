import os
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer
import requests # Ollama API'sine istek atmak için
from dotenv import load_dotenv

load_dotenv()

# Ayarlar
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

# Modeli Yükle (Vektör arama için senin indirdiğin model)
embed_model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')

def ask_ollama(question):
    # 1. Soruyu vektöre çevir
    query_vector = embed_model.encode(question).tolist()

    # 2. MongoDB'de Vektör Araması
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    pipeline = [
        {
            "$vectorSearch": {
                "index": "vector_index", 
                "path": "embedding",
                "queryVector": query_vector,
                "numCandidates": 100,
                "limit": 3 # Yerel model yorulmasın diye 3 makale yeterli
            }
        },
        {
            "$project": {
                "title": 1,
                "abstract": 1,
                "score": {"$meta": "vectorSearchScore"}
            }
        }
    ]

    results = list(collection.aggregate(pipeline))
    
    if not results:
        print("Sonuç bulunamadı.")
        return

    context = "\n\n".join([f"Title: {r['title']}\nAbstract: {r['abstract']}" for r in results])

    prompt = f"""
    Sen kıdemli bir TÜBİTAK proje danışmanısın. Görevin, aşağıda verilen makale özetlerini 
    kullanarak sorulan soruyu analiz etmek ve TÜRKÇE cevap vermektir.
    
    MAKALE ÖZETLERİ:
    {context}
    
    SORU: {question}
    
    TALİMAT: Lütfen cevabını tamamen Türkçe, profesyonel ve akademik bir dille yaz. 
    Makalelerde geçen teknik terimleri (UAV, GNSS vb.) kullanabilirsin.
    """

    print("\n[BİLGİ] Ollama (Llama 3) yanıt hazırlıyor...\n")

    try:
        response = requests.post("http://localhost:11434/api/generate", 
            json={
                "model": "llama3", # Sende yüklü olan model
                "prompt": prompt,
                "stream": False
            }
        )
        
        result_text = response.json().get("response", "")
        
        print("--- OLLAMA CEVABI ---")
        print(result_text)
        print("\n--- KAYNAKÇA ---")
        for r in results:
            print(f"- {r['title']} (Skor: {round(r['score'], 4)})")

    except Exception as e:
        print(f"Ollama bağlantı hatası: {e}. Ollama'nın açık olduğundan emin ol!")

if __name__ == "__main__":
    sorgu = input("TÜBİTAK projeleri (Ollama): ")
    ask_ollama(sorgu)
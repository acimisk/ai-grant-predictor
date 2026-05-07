import os
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer
from google import genai # Yeni standart SDK
from dotenv import load_dotenv

load_dotenv()

# Ayarlar
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

# 2026 Standart Client Yapılandırması
# API anahtarını otomatik olarak environment değişkenlerinden çeker
client_gemini = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Embedding Modeli
embed_model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')

def ask_question(question):
    # 1. Vektörleştirme ve MongoDB Arama (Aynı kalıyor)
    query_vector = embed_model.encode(question).tolist()
    mongo_client = MongoClient(MONGO_URI)
    db = mongo_client[DB_NAME]
    collection = db[COLLECTION_NAME]

    pipeline = [
        {
            "$vectorSearch": {
                "index": "vector_index", 
                "path": "embedding",
                "queryVector": query_vector,
                "numCandidates": 100,
                "limit": 5
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

    context = "\n\n".join([f"Başlık: {r['title']}\nÖzet: {r['abstract']}" for r in results])

    # 2. Yeni SDK ile İçerik Üretimi (2026 Standartı)
    prompt = f"Aşağıdaki makaleleri kullanarak şu soruyu cevapla: {question}\n\nMAKALE ÖZETLERİ:\n{context}"
    

    try:
        # Listendeki en stabil ve güncel ismi doğrudan kullanıyoruz
        response = client_gemini.models.generate_content(
            model="gemini-2.0-flash-lite", 
            contents=prompt
        )

        
        print("\n--- SİSTEMİN CEVABI ---")
        print(response.text)
        
        print("\n--- KAYNAKÇA ---")
        for r in results:
            print(f"- {r['title']} (Skor: {round(r['score'], 4)})")

    except Exception as e:
        print(f"Hata oluştu: {e}")

if __name__ == "__main__":
    sorgu = input("TÜBİTAK projeleri hakkında ne bilmek istersin?: ")
    ask_question(sorgu)
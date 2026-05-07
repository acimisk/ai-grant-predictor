import os
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer
from tqdm import tqdm
from dotenv import load_dotenv

load_dotenv()

# --- AYARLAR ---
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

# Türkçe destekli, hızlı ve 384 boyutlu model (Index ayarına uygun)
model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')

def generate_embeddings():
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    # Henüz embedding'i olmayan tüm makaleleri çek
    query = {"embedding": {"$exists": False}}
    documents = list(collection.find(query))
    
    print(f"[SİSTEM] {len(documents)} adet makale vektörleştirilecek...")

    for doc in tqdm(documents):
        # Başlık ve Özeti birleştirerek daha zengin bir anlam penceresi oluşturuyoruz
        text_to_embed = f"{doc.get('title', '')} {doc.get('abstract', '')}"
        
        if len(text_to_embed.strip()) < 10:
            continue
            
        # Vektörü oluştur
        embedding = model.encode(text_to_embed).tolist()
        
        # MongoDB'de ilgili dökümanı güncelle
        collection.update_one(
            {"_id": doc["_id"]},
            {"$set": {"embedding": embedding}}
        )

    print("\n[TAMAMLANDI] Tüm makaleler vektörleştirildi ve MongoDB'ye basıldı!")

if __name__ == "__main__":
    generate_embeddings()
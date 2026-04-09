import os
from dotenv import load_dotenv
load_dotenv()
import json
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer

# --- Sistem Sabitleri ---
METADATA_FILE = os.getenv("METADATA_FILE")
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

def build_mongo_vector_db():
    print("[SİSTEM] MongoDB Atlas bağlantısı kuruluyor...")
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    print("[SİSTEM] Embedding Modeli (all-MiniLM-L6-v2) belleğe yükleniyor...")
    model = SentenceTransformer("all-MiniLM-L6-v2")

    print(f"[SİSTEM] '{METADATA_FILE}' okunuyor...")
    with open(METADATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    documents_to_insert = []

    print("[SİSTEM] JSON verileri vektörleştiriliyor ve MongoDB şemasına uyarlanıyor...")
    for item in data:
        proj_id = str(item.get("_id", item.get("id", "")))
        
        tr_abstract = ""
        title = ""
        keywords = ""
        
        for abs_data in item.get("abstracts", []):
            if abs_data.get("language") == "TUR":
                tr_abstract = abs_data.get("abstract", "")
                title = abs_data.get("title", "")
                keywords = ", ".join(abs_data.get("keywords", []))
                break
        
        if tr_abstract:
            # RAG için zenginleştirilmiş bağlam (Context)
            full_context = f"Proje Başlığı: {title}\nAnahtar Kelimeler: {keywords}\nÖzet: {tr_abstract}"
            
            # Vektör Dönüşümü (Embedding)
            # numpy array'i standart Python listesine (.tolist()) çeviriyoruz (MongoDB Array beklentisi)
            embedding_vector = model.encode(full_context).tolist()
            
            author_name = item.get("authors", [{}])[0].get("name", "Bilinmiyor") if item.get("authors") else "Bilinmiyor"
            year = str(item.get("issue", {}).get("year", "Bilinmiyor"))

            # MongoDB Döküman Şeması
            doc = {
                "project_id": proj_id,
                "title": title,
                "author": author_name,
                "year": year,
                "abstract": tr_abstract,
                "context_text": full_context,
                "embedding": embedding_vector # Vektör İndeksinin okuyacağı alan
            }
            documents_to_insert.append(doc)

    if documents_to_insert:
        print(f"[SİSTEM] {len(documents_to_insert)} proje MongoDB'ye yazılıyor...")
        # Toplu yazma işlemi (Performans için insert_many)
        collection.insert_many(documents_to_insert)
        print("[+] BAŞARILI: Veriler ve vektörler başarıyla MongoDB Atlas'a yüklendi.")
    else:
        print("[-] HATA: Eklenecek uygun Türkçe doküman bulunamadı.")

if __name__ == "__main__":
    build_mongo_vector_db()
import os
import json
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
# --- AYARLAR ---
MONGO_URI = os.getenv("MONGO_URI") 
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")
JSON_DIR = "semantic_scholar_veriseti"

def upload_to_mongodb():
    # MongoDB Bağlantısı
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]
    
    print(f"[SİSTEM] {JSON_DIR} klasöründeki dosyalar taranıyor...")
    
    files = [f for f in os.listdir(JSON_DIR) if f.endswith('.json')]
    total_files = len(files)
    uploaded_count = 0
    skipped_count = 0

    for filename in files:
        file_path = os.path.join(JSON_DIR, filename)
        
        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
                
                # UNIQUE KONTROLÜ: Aynı paperId veritabanında var mı?
                if collection.find_one({"paperId": data.get("paperId")}):
                    skipped_count += 1
                    continue
                
                # Veriyi yükle
                collection.insert_one(data)
                uploaded_count += 1
                
                if uploaded_count % 500 == 0:
                    print(f"--- {uploaded_count}/{total_files} dosya yüklendi...")
            
            except Exception as e:
                print(f"[HATA] {filename} yüklenemedi: {e}")

    print(f"\n[İŞLEM TAMAMLANDI]")
    print(f"Toplam Dosya: {total_files}")
    print(f"Yeni Yüklenen: {uploaded_count}")
    print(f"Zaten Var Olan (Atlanan): {skipped_count}")

if __name__ == "__main__":
    upload_to_mongodb()
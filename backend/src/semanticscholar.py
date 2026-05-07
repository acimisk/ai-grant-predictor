import requests
import json
import os
import time
import random
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("API_KEY") 
SAVE_DIR = "semantic_scholar_veriseti"
if not os.path.exists(SAVE_DIR): os.makedirs(SAVE_DIR)

# Sorguları daha genel yapıyoruz ki daha çok sonuç çıksın
queries = [
    "TÜBİTAK", "KOSGEB", "bilimsel araştırma", "AR-GE projesi",
    "akademik makale", "fen bilimleri", "mühendislik araştırmaları",
    "sosyal bilimler", "teknoloji transferi", "sanayi işbirliği" , "2209"
]

def fetch_deep_search(query, total_needed=1000):
    url = "https://api.semanticscholar.org/graph/v1/paper/search"
    headers = {"x-api-key": API_KEY}
    current_offset = 0
    limit = 100 # Her istekte 100 tane
    saved_for_query = 0
    
    print(f"\n[BÜYÜK TARAMA] Sorgu: {query} (Hedef: {total_needed})")
    
    while saved_for_query < total_needed:
        params = {
            "query": query,
            "limit": limit,
            "offset": current_offset,
            "fields": "title,abstract,year,externalIds,citationCount" #
        }
        
        try:
            res = requests.get(url, params=params, headers=headers, timeout=30)
            if res.status_code == 200:
                data = res.json().get('data', [])
                if not data: 
                    print("--- Bu sorgu için sonuçlar bitti.")
                    break
                
                for p in data:
                    abstract = p.get('abstract')
                    if abstract and len(abstract) > 50: # Özet şart!
                        paper_id = p.get('paperId')
                        file_path = os.path.join(SAVE_DIR, f"{paper_id}.json")
                        
                        if not os.path.exists(file_path):
                            with open(file_path, "w", encoding="utf-8") as f:
                                json.dump(p, f, ensure_ascii=False, indent=4)
                            saved_for_query += 1
                
                print(f"İlerleme: {current_offset + limit} sonuç tarandı, {saved_for_query} dosya kaydedildi.")
                current_offset += limit # Bir sonraki sayfaya geç
                
                # API Limitlerini korumak için kısa mola
                time.sleep(1.2) 
            
            elif res.status_code == 429:
                print("Hız sınırı! 30 saniye mola...")
                time.sleep(30)
            else:
                print(f"Hata: {res.status_code}")
                break
                
        except Exception as e:
            print(f"Bağlantı kesildi: {e}")
            time.sleep(5)
            
    return saved_for_query

if __name__ == "__main__":
    total_count = 0
    for q in queries:
        count = fetch_deep_search(q, total_needed=1000) # Her kelimeden 1000 tane çekmeye çalış
        total_count += count
        print(f"Mevcut toplam: {total_count}")
        time.sleep(10) # Kelimeler arası uzun mola
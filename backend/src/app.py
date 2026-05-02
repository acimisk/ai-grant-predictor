import os
import time
import json
import requests

# --- Sistem Sabitleri ve Konfigürasyon ---
# Proje: NLP ve LLM Tabanlı Karar Destek Sistemi
# Rol: Veri Toplama Katmanı (Data Acquisition Layer)
BASE_API_URL = "https://search.trdizin.gov.tr/api/defaultSearch/publication/"
DOWNLOAD_DIR = "proje_pdf_veriseti"
METADATA_FILE = "trdizin_metadata.json"

# NFR: 50 sayfa * 100 limit = 5000 veri. 
TOTAL_PAGES = 50

# Browser simülasyonu için güncel Header seti
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection': 'keep-alive',
    'Referer': 'https://search.trdizin.gov.tr/tr/yayin/ara'
}

def setup_environment():
    """Çalışma ortamını (dizinleri) hazırlar."""
    if not os.path.exists(DOWNLOAD_DIR):
        os.makedirs(DOWNLOAD_DIR)
        print(f"[SİSTEM] '{DOWNLOAD_DIR}' klasörü oluşturuldu.")

def fetch_data_pipeline():
    """TR Dizin API üzerinden Türkçe ve Açık Erişimli projeleri çeker."""
    all_metadata = []

    for page in range(1, TOTAL_PAGES + 1):
        print(f"\n[SİSTEM] Sayfa {page}/{TOTAL_PAGES} çekiliyor...")
        
        # İstediğin 'TUR' filtresi ve diğer kriterler buraya entegre edildi
        params = {
            'q': '',
            'order': 'publicationYear-DESC',
            'page': page,
            'limit': 100,
            'facet-accessType': 'OPEN',
            'facet-documentType': 'PROJECT',
            'facet-publicationLanguage': 'TUR' # Sadece Türkçe projeler
        }

        try:
            response = requests.get(BASE_API_URL, headers=HEADERS, params=params, timeout=20)
            
            if response.status_code == 200:
                json_data = response.json()
                hits_data = json_data.get('hits', {})
                items = hits_data.get('hits', [])
                
                if not items:
                    print(f"[UYARI] Sayfa {page} boş! Veri akışı tamamlandı.")
                    break

                for item in items:
                    source_data = item.get('_source', {})
                    if not source_data:
                        source_data = item
                        
                    all_metadata.append(source_data)
                    
                    # Elasticsearch ID tespiti ve PDF indirme başlatma
                    doc_id = item.get('_id', source_data.get('id', 'Bilinmeyen_ID'))
                    pdf_url = f"https://search.trdizin.gov.tr/api/publication/download/{doc_id}" 
                    download_pdf(pdf_url, doc_id)

                print(f"[+] Sayfa {page} başarıyla işlendi. (Kümülatif Veri: {len(all_metadata)})")
                
                # Rate Limiting: Sunucuyu yormamak ve banlanmamak için
                time.sleep(2) 
                
            elif response.status_code == 429:
                print("[HATA] Çok fazla istek! 60 saniye bekleniyor...")
                time.sleep(60)
            else:
                print(f"[HATA] HTTP {response.status_code} - Sayfa {page} atlandı.")
                
        except Exception as e:
            print(f"[!] İSTİSNA: Bağlantı hatası: {str(e)}")
            time.sleep(5)
            continue

    # Verileri JSON olarak diske yazma
    with open(METADATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_metadata, f, ensure_ascii=False, indent=4)
    print(f"\n[SİSTEM] İŞLEM TAMAMLANDI.")
    print(f"[SİSTEM] Toplam {len(all_metadata)} metadata kaydedildi: {METADATA_FILE}")

def download_pdf(pdf_url, doc_id):
    """PDF dosyasını binary formatta indirir (Idempotent: Tekrarı önler)."""
    file_path = os.path.join(DOWNLOAD_DIR, f"proje_{doc_id}.pdf")
    
    # Dosya zaten varsa tekrar indirme
    if os.path.exists(file_path):
        return

    try:
        res = requests.get(pdf_url, headers=HEADERS, stream=True, timeout=15)
        if res.status_code == 200 and 'application/pdf' in res.headers.get('Content-Type', ''):
            with open(file_path, "wb") as f:
                for chunk in res.iter_content(chunk_size=4096):
                    if chunk:
                        f.write(chunk)
        time.sleep(0.3) # Dosyalar arası nefes alma süresi
    except Exception:
        # Hata durumunda sessizce atla, bir sonraki dosyaya geç
        pass

if __name__ == "__main__":
    # Çevre hazırlığı ve Pipeline başlatma
    setup_environment()
    fetch_data_pipeline()
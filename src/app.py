import os
from dotenv import load_dotenv # Bunu ekle
load_dotenv() # Bunu da ekle, .env dosyasını sisteme yükler
import time
import json
import requests

# --- Sistem Sabitleri ve Konfigürasyon ---
BASE_API_URL = os.getenv("BASE_API_URL")
DOWNLOAD_DIR = "proje_pdf_veriseti"
METADATA_FILE = os.getenv("METADATA_FILE")

# NFR: 50 sayfa * 100 limit = 5000 veri. 
# Test aşamasında (PoC) bunu 1 veya 2 yapabilirsin.
TOTAL_PAGES = 10

# Network analizinden elde edilen başlıklar
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:149.0) Gecko/20100101 Firefox/149.0',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection': 'keep-alive'
}

def setup_environment():
    """Çalışma ortamını hazırlar."""
    if not os.path.exists(DOWNLOAD_DIR):
        os.makedirs(DOWNLOAD_DIR)
        print(f"[SİSTEM] '{DOWNLOAD_DIR}' klasörü oluşturuldu.")

def fetch_data_pipeline():
    """API üzerinden sayfa sayfa veri çeker ve Elasticsearch formatını parse eder."""
    all_metadata = []

    for page in range(1, TOTAL_PAGES + 1):
        print(f"\n[SİSTEM] Sayfa {page}/{TOTAL_PAGES} çekiliyor...")
        
        params = {
            'q': '',
            'order': 'publicationYear-DESC',
            'page': page,
            'limit': 100,
            'facet-accessType': 'OPEN',
            'facet-documentType': 'PROJECT'
        }

        try:
            response = requests.get(BASE_API_URL, headers=HEADERS, params=params)
            
            if response.status_code == 200:
                json_data = response.json()
                
                # Elasticsearch mimarisine göre veriyi ayrıştırıyoruz
                hits_data = json_data.get('hits', {})
                items = hits_data.get('hits', [])
                
                if not items:
                    print(f"[UYARI] Sayfa {page} boş! Veri bulunamadı.")
                    break

                for item in items:
                    # Elasticsearch verileri '_source' objesi içinde saklar
                    source_data = item.get('_source', {})
                    
                    # Eğer meta veri boşsa ana objeyi kullan (fallback)
                    if not source_data:
                        source_data = item
                        
                    all_metadata.append(source_data)
                    
                    # Doküman ID'sini tespit et (Elasticsearch '_id' kullanır)
                    doc_id = item.get('_id', source_data.get('id', 'Bilinmeyen_ID'))
                    
                    # PDF İndirme bağlantısını hazırla
                    pdf_url = f"https://search.trdizin.gov.tr/api/publication/download/{doc_id}" 
                    download_pdf(pdf_url, doc_id)

                print(f"[+] Sayfa {page} başarıyla işlendi. {len(items)} proje çekildi.")
                time.sleep(3) # Rate Limiting
                
            else:
                print(f"[HATA] HTTP {response.status_code} - Sayfa {page} çekilemedi.")
                break
                
        except Exception as e:
            print(f"[!] İSTİSNA: İstek atılırken hata oluştu: {str(e)}")
            break

    # Tüm metadataları dosyaya yaz
    with open(METADATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_metadata, f, ensure_ascii=False, indent=4)
    print(f"\n[SİSTEM] Toplam {len(all_metadata)} projenin metadatası '{METADATA_FILE}' dosyasına kaydedildi.")

def download_pdf(pdf_url, doc_id):
    """PDF dosyasını binary formatta indirir."""
    file_path = os.path.join(DOWNLOAD_DIR, f"proje_{doc_id}.pdf")
    
    # Eğer dosya zaten inmişse atla (Idempotency kuralı)
    if os.path.exists(file_path):
        return

    try:
        res = requests.get(pdf_url, headers=HEADERS, stream=True)
        if res.status_code == 200 and 'application/pdf' in res.headers.get('Content-Type', ''):
            with open(file_path, "wb") as f:
                for chunk in res.iter_content(chunk_size=1024):
                    if chunk:
                        f.write(chunk)
        # Her dosya indirme arası ufak bir gecikme
        time.sleep(0.5)
    except Exception as e:
        print(f"   [-] PDF İndirme Hatası (ID: {doc_id}): {str(e)}")

if __name__ == "__main__":
    setup_environment()
    
    # Checkpoint: Önce 1 sayfa (100 veri) ile test etmeni öneririm.
    # TOTAL_PAGES = 1 yaparak sistemi test edebilirsin.
    fetch_data_pipeline()
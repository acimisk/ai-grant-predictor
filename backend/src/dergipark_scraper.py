import os
import time
import requests
from bs4 import BeautifulSoup

# --- SİSTEM KONFİGÜRASYONU ---
DOWNLOAD_DIR = "proje_pdf_veriseti"
BASE_SEARCH_URL = "https://dergipark.org.tr/tr/search"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36',
    
    # Senin tarayıcından aldığımız giriş yapmış oturum çerezi (Bilet)
    'Cookie': '_ga=GA1.1.209717976.1777722731; dp_user=%7B%22name%22%3A%22Kenan%20Ac%5Cu0131m%5Cu0131%5Cu015f%22%2C%22username%22%3A%22kenan-acimis%22%2C%22avatar%22%3A%22%5C%2Fzollu%5C%2Fimages%5C%2Fdefault-avatar.png%22%2C%22fullname%22%3A%22Kenan%20Ac%5Cu0131m%5Cu0131%5Cu015f%22%2C%22session_id%22%3A%22dee48d812b89495677ac77b01c13aab1%22%2C%22is_admin%22%3Afalse%2C%22verification%22%3A0%2C%22approved%22%3Afalse%2C%22user_id%22%3A958337%7D; PHPSESSID=dee48d812b89495677ac77b01c13aab1; _ga_694ZECXSSZ=GS2.1.s1777722730$o1$g1$t1777722840$j20$l0$h0',
    
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    'Referer': 'https://dergipark.org.tr/tr/login',
    'Upgrade-Insecure-Requests': '1'
}

def setup_environment():
    if not os.path.exists(DOWNLOAD_DIR):
        os.makedirs(DOWNLOAD_DIR)

def fetch_articles_from_search(start_page=1, end_page=10):
    print("[SİSTEM] DergiPark Veri Çekme İşlemi Başladı...\n" + "-"*50)
    
    for page in range(start_page, end_page + 1):
        print(f"\n[SİSTEM] Arama Sonuçları Sayfa {page} taranıyor...")
        
        # URL'nin bozulmaması için parametreleri sözlük (dict) olarak veriyoruz
        params = {
            'q': '"TÜBİTAK projesi" OR "TÜBİTAK tarafından desteklenmiştir" OR "KOSGEB projesi"',
            'advanced': '1',
            'section': 'article',
            'page': page
        }
        
        try:
            response = requests.get(BASE_SEARCH_URL, headers=HEADERS, params=params, timeout=15)
            
            if response.status_code != 200:
                print(f"[HATA] Sayfa yüklenemedi! HTTP Status: {response.status_code}")
                continue
                
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # MAKALELERİ BULMAK İÇİN YENİ VE AGRESİF YÖNTEM
            article_links = []
            
            # Sayfadaki BÜTÜN linkleri (a etiketlerini) gez
            for a in soup.find_all('a', href=True):
                href = a['href']
                # Eğer linkin içinde hem "/pub/" hem de "/article/" geçiyorsa bu bir makale sayfasıdır
                if '/pub/' in href and '/article/' in href:
                    article_links.append(href)
            
            # Aynı makaleyi birden fazla kez indirmemek için tekrarları temizle (Set yapısı)
            clean_links = set()
            for url in article_links:
                if not url.startswith('http'):
                    url = "https://dergipark.org.tr" + url
                # Linkin sonundaki issue_id gibi gereksiz parametreleri kes at
                clean_url = url.split('?')[0]
                clean_links.add(clean_url)
                
            if not clean_links:
                print("[UYARI] Bu sayfada makale bulunamadı.")
                # Hata ayıklama: Sorunun ne olduğunu görebilmek için HTML'i kaydediyoruz
                with open("debug_dergipark.html", "w", encoding="utf-8") as f:
                    f.write(response.text)
                print("[!] Lütfen projenin klasöründeki 'debug_dergipark.html' dosyasını tarayıcıda açıp DergiPark'ın bize ne gösterdiğini kontrol edin.")
                break
                
            print(f"[+] Sayfa {page}'de {len(clean_links)} adet benzersiz makale linki bulundu. İndirmeler başlıyor...")
            
            # Her bir makaleye girip PDF'i indir
            for article_url in clean_links:
                download_pdf_from_article_page(article_url)
                
            time.sleep(3) # Sunucuyu yormamak için sayfa arası bekleme

        except Exception as e:
            print(f"[!] İstisna: Sayfa {page} taranırken hata oluştu: {str(e)}")

def download_pdf_from_article_page(article_url):
    try:
        res = requests.get(article_url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(res.text, 'html.parser')
        
        pdf_url = None
        
        # 1. Strateji: href içinde download/article geçen linkleri ara
        for a in soup.find_all('a', href=True):
            if 'download/article' in a['href']:
                pdf_url = a['href']
                break
        
        # 2. Strateji: Buton metninde PDF yazanları ara
        if not pdf_url:
            for a in soup.find_all('a', href=True):
                if 'PDF' in a.get_text().upper() or 'TAM METIN' in a.get_text().upper():
                    pdf_url = a['href']
                    break
                    
        if pdf_url:
            if not pdf_url.startswith('http'):
                 pdf_url = "https://dergipark.org.tr" + pdf_url
                 
            doc_id = article_url.split('/article/')[1]
            file_path = os.path.join(DOWNLOAD_DIR, f"dergipark_{doc_id}.pdf")
            
            if os.path.exists(file_path):
                print(f"  [ATLANDI] PDF Zaten mevcut: {doc_id}")
                return
                
            print(f"  [İNDİRİLİYOR] Makale ID: {doc_id}")
            pdf_res = requests.get(pdf_url, headers=HEADERS, stream=True, timeout=20)
            
            if pdf_res.status_code == 200:
                with open(file_path, "wb") as f:
                    for chunk in pdf_res.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
                time.sleep(1.5)
            else:
                print(f"  [-] İndirme başarısız. HTTP: {pdf_res.status_code}")
                
        else:
            print(f"  [!] PDF indirme linki makale sayfasında bulunamadı: {article_url}")
            
    except Exception as e:
        print(f"  [HATA] Makale sayfasında hata: {str(e)}")

if __name__ == "__main__":
    setup_environment()
    fetch_articles_from_search(start_page=1, end_page=5)
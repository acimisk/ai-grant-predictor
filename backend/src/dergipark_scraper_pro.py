import undetected_chromedriver as uc
import os
import time
import random
from bs4 import BeautifulSoup

# İndirme klasörünü tam yol (absolute path) olarak alalım ki Chrome karıştırmasın
DOWNLOAD_DIR = os.path.join(os.getcwd(), "proje_pdf_veriseti")
if not os.path.exists(DOWNLOAD_DIR): 
    os.makedirs(DOWNLOAD_DIR)

def get_undetected_driver():
    options = uc.ChromeOptions()
    
    # Otomatik indirme ayarlarını ekliyoruz
    prefs = {
        "download.default_directory": DOWNLOAD_DIR, # PDF'lerin ineceği yer
        "download.prompt_for_download": False,      # Sormadan indir
        "download.directory_upgrade": True,
        "plugins.always_open_pdf_externally": True  # Tarayıcıda açma, direkt indir
    }
    options.add_experimental_option("prefs", prefs)
    
    # Chrome sürümün 147 olduğu için bunu sabitliyoruz
    driver = uc.Chrome(options=options, version_main=147) 
    return driver

def scrape_with_bypass():
    driver = get_undetected_driver()
    search_query = '"TÜBİTAK projesi" OR "KOSGEB projesi"'
    
    try:
        # Ana sayfada Cloudflare onayı için bekleme
        driver.get("https://dergipark.org.tr/tr/")
        print("[SİSTEM] Siteye girildi. Eğer Captcha çıkarsa ELLE ONAYLA! (20 sn süren var)")
        time.sleep(20)
        
        page = 1
        while page <= 10:
            url = f"https://dergipark.org.tr/tr/search?q={search_query}&section=article&page={page}"
            driver.get(url)
            time.sleep(random.uniform(6, 10))
            
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            # Linkleri topla
            links = {a['href'] for a in soup.find_all('a', href=True) if '/article/' in a['href'] and '/pub/' in a['href']}
            
            if not links:
                print("[!] Bu sayfada makale bulunamadı, güvenlik engelini kontrol et.")
                break
                
            for article_url in links:
                # URL tamamlama (invalid argument hatasının çözümü)
                if not article_url.startswith('http'):
                    article_url = "https://dergipark.org.tr" + article_url
                
                doc_id = article_url.split('/')[-1].split('?')[0] # ID'yi temiz alalım
                
                # Zaten indirilmiş mi kontrol et
                if os.path.exists(os.path.join(DOWNLOAD_DIR, f"dergipark_{doc_id}.pdf")):
                    print(f"  [ATLANDI] {doc_id} zaten mevcut.")
                    continue

                print(f"  [GİRİLİYOR] Makale Sayfası: {doc_id}")
                driver.get(article_url)
                time.sleep(random.uniform(5, 8))
                
                # PDF Linkini bul
                article_soup = BeautifulSoup(driver.page_source, 'html.parser')
                pdf_meta = article_soup.find('meta', attrs={'name': 'citation_pdf_url'})
                
                if pdf_meta and pdf_meta.get('content'):
                    pdf_url = pdf_meta['content']
                    
                    # PDF URL tamamlama
                    if not pdf_url.startswith('http'):
                        pdf_url = "https://dergipark.org.tr" + pdf_url
                    
                    print(f"  [İNDİRİLİYOR] {doc_id} ...")
                    try:
                        driver.get(pdf_url) 
                        time.sleep(7) # İndirme işlemi için bekle
                    except Exception as e:
                        print(f"  [HATA] {doc_id} indirilirken sorun çıktı: {e}")
                else:
                    print(f"  [!] {doc_id} için PDF linki bulunamadı.")
            
            print(f"\n[SİSTEM] Sayfa {page} bitti. Sonraki sayfaya geçiliyor...\n")
            page += 1
            time.sleep(random.uniform(10, 15)) 
            
    finally:
        print("[SİSTEM] Tarayıcı kapatılıyor. İndirilenleri kontrol et.")
        driver.quit()

if __name__ == "__main__":
    scrape_with_bypass()
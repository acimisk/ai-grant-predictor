import os
import PyPDF2
from dotenv import load_dotenv
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer

load_dotenv()

# --- SİSTEM KONFİGÜRASYONU ---
DOWNLOAD_DIR = "proje_pdf_veriseti"
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

# Makalenizde bahsettiğiniz bağlam kaybını (hallucination) önlemek için Chunk boyutları
CHUNK_SIZE = 1000  # Her bir parçanın karakter limiti
OVERLAP = 200      # Cümleler ortadan bölünmesin diye bir önceki parçadan alınacak örtüşme payı

def extract_text_from_pdf(pdf_path):
    """PDF'in içindeki tüm metinleri çıkarır."""
    text = ""
    try:
        with open(pdf_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + " "
    except Exception as e:
        print(f"[HATA] {pdf_path} okunamadı: {str(e)}")
    return text.strip()

def chunk_text(text, chunk_size, overlap):
    """Metni 'Sliding Window' mantığıyla, anlam bütünlüğünü koruyarak parçalara ayırır."""
    chunks = []
    start = 0
    text_length = len(text)
    
    while start < text_length:
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start += (chunk_size - overlap) # Örtüşme (Overlap) kaydırması
        
    return chunks

def build_rag_vector_db():
    if not MONGO_URI:
        print("[-] HATA: .env dosyasında MONGO_URI bulunamadı!")
        return

    print("[SİSTEM] MongoDB Atlas bağlantısı kuruluyor...")
    client = MongoClient(MONGO_URI)
    collection = client[DB_NAME][COLLECTION_NAME]
    
    # Yeni veri setini yüklerken eski çöpleri temizlemek istersen alttaki satırı aktif edebilirsin
    # collection.delete_many({})

    print("[SİSTEM] Embedding Modeli (all-MiniLM-L6-v2) belleğe yükleniyor. Bu biraz sürebilir...")
    model = SentenceTransformer("all-MiniLM-L6-v2")

    pdf_files = [f for f in os.listdir(DOWNLOAD_DIR) if f.endswith('.pdf')]
    print(f"\n[SİSTEM] Klasörde toplam {len(pdf_files)} PDF bulundu. Vektörizasyon başlıyor...\n" + "-"*50)

    documents_to_insert = []

    for filename in pdf_files:
        pdf_path = os.path.join(DOWNLOAD_DIR, filename)
        doc_id = filename.replace("dergipark_", "").replace(".pdf", "")
        
        print(f"[İŞLENİYOR] Makale ID: {doc_id} okunuyor...")
        full_text = extract_text_from_pdf(pdf_path)
        
        # Sadece taranmış resim içeren PDF'leri filtrelemek için uzunluk kontrolü
        if len(full_text) < 500:
            print(f"  [UYARI] Makale {doc_id} çok kısa veya metin okunamadı (Resim olabilir). Atlanıyor.")
            continue
            
        chunks = chunk_text(full_text, CHUNK_SIZE, OVERLAP)
        
        for index, chunk in enumerate(chunks):
            # Model, her bir 1000 karakterlik metni 384 boyutlu matematiksel vektöre dönüştürür
            embedding = model.encode(chunk).tolist()
            
            doc = {
                "project_id": doc_id,
                "chunk_index": index,
                "text_content": chunk,         # LLM'e göndereceğimiz asıl bağlam (Context)
                "embedding": embedding         # MongoDB Vector Search için sayısal array
            }
            documents_to_insert.append(doc)

    if documents_to_insert:
        print(f"\n[SİSTEM] Toplam {len(documents_to_insert)} adet vektör parçası (chunk) Atlas'a yazılıyor...")
        collection.insert_many(documents_to_insert)
        print("[+] BAŞARILI: Makalenizde sözü verilen ileri düzey RAG altyapısı veritabanına işlendi.")
    else:
        print("[-] HATA: Veritabanına eklenecek geçerli metin bulunamadı.")

if __name__ == "__main__":
    build_rag_vector_db()
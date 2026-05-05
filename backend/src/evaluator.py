import os
from dotenv import load_dotenv
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer
from google import genai

# Çevresel değişkenleri yükle
load_dotenv()

# --- Sistem Sabitleri ve API Ayarları ---
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")
INDEX_NAME = "vector_index"

# Gemini API Yeni Nesil İstemci (Client) Başlatma
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    print("[-] HATA: .env dosyasında GOOGLE_API_KEY bulunamadı!")
    exit(1)

# Yeni kütüphaneye göre client oluşturulması
client = genai.Client(api_key=GOOGLE_API_KEY)

def get_relevant_context(query_text, top_k=3):
    """MongoDB Atlas üzerinden vektör araması yaparak en yakın bağlamı çeker."""
    try:
        db_client = MongoClient(MONGO_URI)
        collection = db_client[DB_NAME][COLLECTION_NAME]
        
        # Kullanıcının girdiği metni vektöre çeviriyoruz
        model = SentenceTransformer("all-MiniLM-L6-v2")
        query_vector = model.encode(query_text).tolist()

        pipeline = [
            {
                "$vectorSearch": {
                    "index": INDEX_NAME,
                    "path": "embedding",
                    "queryVector": query_vector,
                    "numCandidates": 100,
                    "limit": top_k
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "text_content": 1,
                    "score": {"$meta": "vectorSearchScore"}
                }
            }
        ]
        
        results = list(collection.aggregate(pipeline))
        if not results:
            return "İlgili geçmiş proje bulunamadı."
            
        context = "\n\n---\n\n".join([res['text_content'] for res in results])
        return context
        
    except Exception as e:
        print(f"[HATA] Vektör arama başarısız oldu: {e}")
        return ""

def generate_decision_support(application_text):
    """Gemini API kullanarak başvuruyu analiz eder (Generation)."""
    
    print("[SİSTEM] Veritabanından benzer projeler getiriliyor...")
    context = get_relevant_context(application_text)
    
    # İleri Düzey Prompt Mühendisliği
    prompt = f"""
    Sen TÜBİTAK ve KOSGEB projeleri üzerinde uzmanlaşmış KATIKSIZ BİR AKADEMİK HAKEMSİN.
    Sana iki bölüm vereceğim: "REFERANS GEÇMİŞ PROJELER" ve "DEĞERLENDİRİLECEK YENİ BAŞVURU".
    
    KURALLARIN:
    1. REFERANS GEÇMİŞ PROJELER kısmındaki metinler KESİNLİKLE değerlendirmeyeceğin, sadece standartları anlamak için bakacağın geçmiş verilerdir. Onları eleştirme!
    2. SADECE VE SADECE "DEĞERLENDİRİLECEK YENİ BAŞVURU" kısmındaki projeyi analiz et.
    3. Raporunu KESİNLİKLE %100 TÜRKÇE yaz.
    4. Cümlelerin akademik, ciddi ve yol gösterici olmalı.

    [REFERANS GEÇMİŞ PROJELER (Sadece oku, değerlendirme!)]:
    {context}

    [DEĞERLENDİRİLECEK YENİ BAŞVURU (Asıl görevin bunu incelemek)]:
    {application_text}

    Lütfen yeni başvuru için aşağıdaki başlıklardan oluşan bir ön değerlendirme raporu hazırla:
    1. Özgünlük Değerlendirmesi:
    2. Metodolojik Uygunluk:
    3. Eksiklikler ve Riskler:
    4. Geliştirme Önerileri:
    """

    print("[SİSTEM] LLM analizi başlatılıyor (Gemini 2.5 Flash)...")
    
    try:
        # Yeni kütüphane ile API çağrısı
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text
    except Exception as e:
        return f"[HATA] Gemini API yanıt veremedi: {str(e)}"

if __name__ == "__main__":
    test_proje = """
    Bu proje, KOSGEB ve TÜBİTAK araştırma başvurularını değerlendirmek üzere 
    Büyük Dil Modelleri (LLM'ler) ve RAG (Retrieval-Augmented Generation) mimarisi kullanan 
    bir karar destek (triyaj) sistemi geliştirmeyi amaçlamaktadır. Projede Python FastAPI 
    kullanılacak olup, vektör veritabanı olarak MongoDB Atlas tercih edilmiştir. 
    İnsan hakemlerin yükünü azaltmak hedeflenmektedir.
    """
    
    rapor = generate_decision_support(test_proje)
    print("\n" + "="*70 + "\n[AKADEMİK ÖN DEĞERLENDİRME RAPORU]\n" + "="*70)
    print(rapor)
import os
from dotenv import load_doten
load_dotenv()
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")
INDEX_NAME = os.getenv("INDEX_NAME")

THRESHOLD_SCORE = 0.85 

def run_core_filter(new_project_text):
    print("[SİSTEM] MongoDB Atlas'a bağlanılıyor...")
    client = MongoClient(MONGO_URI)
    collection = client[DB_NAME][COLLECTION_NAME]

    print("[SİSTEM] Başvuru metni vektörel uzaya dönüştürülüyor...")
    model = SentenceTransformer("all-MiniLM-L6-v2")
    query_vector = model.encode(new_project_text).tolist()

    print("[SİSTEM] Özgünlük taraması (Vector Search) başlatıldı...\n")
    
    # MongoDB Aggregation Pipeline
    pipeline = [
        {
            "$vectorSearch": {
                "index": INDEX_NAME,
                "path": "embedding",
                "queryVector": query_vector,
                "numCandidates": 100, # Belleğe alınacak aday sayısı
                "limit": 3 # En çok benzeyen ilk 3 projeyi getir
            }
        },
        {
            # Sadece ihtiyacımız olan alanları getir (NFR: Performans)
            "$project": {
                "_id": 0,
                "title": 1,
                "author": 1,
                "score": {"$meta": "vectorSearchScore"} 
            }
        }
    ]

    results = list(collection.aggregate(pipeline))
    
    is_original = True
    
    for rank, res in enumerate(results, 1):
        score = res['score']
        # Atlas Score'u gerçek Cosine Similarity yüzdesine geri çeviriyoruz
        cosine_sim = (score * 2) - 1
        
        print(f"{rank}. Eşleşen Proje: {res['title']}")
        print(f"   Yazar: {res['author']}")
        print(f"   Atlas Skoru: {score:.4f} | Gerçek Benzerlik: %{cosine_sim * 100:.2f}")
        
        if score >= THRESHOLD_SCORE:
            print("   [!] DİKKAT: BU PROJE %70 EŞİK DEĞERİNİ AŞMIŞTIR. ÖZGÜNLÜK İHLALİ RİSKİ!\n")
            is_original = False
        else:
            print("   [+] Eşik değerinin altında. (Özgünlük açısından güvenli)\n")

    print("-" * 50)
    if is_original:
        print("[SONUÇ] Başvuru özgündür. Modül 1 (TÜBİTAK Onay Tahmini) aşamasına geçilebilir.")
    else:
        print("[SONUÇ] BAŞVURU REDDEDİLDİ. Çekirdek Filtre'ye takıldı.")

if __name__ == "__main__":
    
    test_application = """
Proje Başlığı: Gerçekliği Şüpheli İnançlar (Komplo, Paranormal Ve Sahte Bilim İnançları) Zaman İçinde Nasıl Değişiyor? Yordayıcıların Ve Düzenleyicilerinin Boylamsal Olarak İncelenmesi
Anahtar Kelimeler: eğitim, kişilik, biliş, sosyal, komplo, sahte bilim, Gerçekliği şüpheli inançlar, paranormal
Özet: Bu proje, gerçekliği şüpheli inançların (GŞİ)?komplo, paranormal ve sahte bilim inançlarının?zaman içerisindeki değişimini ve bu değişime etki eden bireysel, bilişsel ve sosyal yordayıcıları boylamsal olarak iki farklı kültürde incelemeyi amaçlamaktadır. Türkiye ve Birleşik Krallık?ta yürütülen dört ayrı çalışmada, aynı bireylerden 25 ay boyunca beş farklı zamanda veri toplanmış ve bu süreçteki inanç değişimleri ile yordayıcı değişkenlerdeki değişimler arasındaki ilişkiler analiz edilmiştir.  Elde edilen bulgular, GŞİ?lerin birbirleriyle yüksek düzeyde ilişkili olduğunu ve benzer bilişsel, kişilik temelli ve sosyal faktörlerle bağlantılı olduğunu ortaya koymuştur. Boylamsal analizlerde, paranormal ve sahte bilim inançlarında zamanla anlamlı bir azalma gözlemlenirken, komplo inançlarının daha durağan olduğu görülmüştür. Ayrıca, düşünme stillerindeki ve kişilik özelliklerindeki değişimlerin, GŞİ?lerdeki değişimleri hem yordadığı hem de bu değişimlerden etkilendiği bulunmuştur. Bu da GŞİ?lerin hem neden hem de sonuç olabileceğine işaret etmektedir. Çalışma, sağ kanat yetkeciliği, sosyal baskınlık yönelimi, dindarlık, yolsuzluk algısı gibi sosyal değişkenlerin GŞİ?lerle ilişkili olduğunu gösterirken; eforlu düşünme, analitik düşünme ve bilim okuryazarlığı gibi bilişsel faktörlerin etkilerini karmaşık bir şekilde ortaya koymuştur. Özellikle sahte bilim inançlarının bazı örneklerde analitik düşünme ile pozitif ilişki göstermesi dikkat çekici bir bulgu olarak öne çıkmaktadır. Bu araştırma, GŞİ?lerin bireylerde nasıl şekillendiğini, zamanla nasıl değiştiğini ve hangi sosyal/bilişsel süreçlerle bağlantılı olduğunu anlamaya yönelik önemli bir katkı sunmaktadır. Bulgular, toplumsal güveni güçlendirme, bilimsel okuryazarlığı artırma ve eleştirel düşünmeyi teşvik etme yönünde uygulamalı öneriler geliştirmek için kullanılabilir.    """
    
    run_core_filter(test_application)
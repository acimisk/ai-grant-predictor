# 🚀 AI-Based Grant Prediction System (Yapay Zeka Tabanlı Hibe Tahmin Sistemi)

Yeni mezun girişimleri ve öğrenciler için KOSGEB ve TÜBİTAK süreçlerinde kullanılmak üzere geliştirilmiş, **NLP destekli kapsamlı karar destek mekanizması**. 

Girişimcilerin aylarca emek verdiği projelerin, basit format hataları veya özgünlük eksikliği sebebiyle elenmesini önlemek amacıyla tasarlanmıştır. Sistem, projelerin onay ihtimalini başvurudan önce otonom olarak test eden risksiz bir **"Sandbox"** (ön-filtre) ortamı sunar.

---

## 🌟 Temel Özellikler (Modüller)

Sistem veri karışıklığını önlemek amacıyla birbirinden tamamen izole edilmiş 3 ana modülden oluşmaktadır:

* 📈 **TÜBİTAK Modülü:** Geçmiş verilere dayalı makine öğrenmesi algoritmaları ile projelerin % Başarı İhtimali Tahminini üretir.
* 📝 **KOSGEB Modülü:** LLM entegrasyonu kullanılarak resmi mevzuata anlamsal uygunluk testi yapar ve kullanıcıya otonom bir Eksik/Revize Listesi sunar.
* 🎓 **Akademik Onay Modülü:** Projeleri akademik kabul kriterlerine göre değerlendirir ve YGA/MVP standartlarına uygunluk skoru çıkarır.

> ⚠️ **Sistem Sınırları:** Bu proje sıfırdan metin üreten bir "Üretken Zeka" aracı değil, yüklenen veriyi okuyan bir "Analitik" araçtır. Resmi kurumlara doğrudan başvuru yapmaz veya %100 onay garantisi sunmaz.

---

## 🧠 Sistem Mimarisi: Neden RAG?

Geleneksel Büyük Dil Modellerine (LLM) binlerce geçmiş projeyi tek seferde okutmanın yaratacağı yüksek maliyet, kilitlenme ve **halüsinasyon (uydurma veri üretme)** risklerini ortadan kaldırmak için **RAG (Retrieval-Augmented Generation)** mimarisi inşa edilmiştir.

**Veriden Karara 3 Adımlı Boru Hattı (Pipeline):**
1.  **Vektörizasyon:** Geçmiş 5.000 proje metni matematiksel vektör dizilerine (embedding) çevrilerek veritabanına kaydedilir.
2.  **Kosinüs Benzerliği (Cosine Similarity):** Yeni proje yüklendiğinde, %70 eşik değeri baz alınarak anlamsal olarak en yakın projeler saniyeler içinde bulunur. Vektörel özgünlük kontrolü ile kopya projeler anında tespit edilir.
3.  **LLM Sentezi ve Tahmin:** Yalnızca en alakalı projeler bağlamı daraltılmış bir şekilde LLM'e sunulur ve halüsinasyonsuz analiz raporu üretilir.

---

## 💻 Teknoloji Yığını (Tech Stack)

### ⚙️ Sistem Çekirdeği (The Engine)
* **Backend Framework:** Python (FastAPI) - *Ağır AI süreçlerini kilitlemeden ortalama 15 saniyede asenkron yanıt dönmek için*.
* **LLM & Karar Motoru:** LangChain + LLM API (Gemini/OpenAI).
* **NLP & Vektörizasyon:** Hugging Face (Sentence-Transformers).
* **Veri İşleme:** pdfplumber & BeautifulSoup.
* **Veritabanı:** MongoDB Atlas (JSON esnekliği ve yerleşik Vector Search özelliği için).

### 🎨 Kullanıcı Arayüzü (The Interface)
* **Frontend Framework:** React.js (veya Next.js).
* **API İletişimi:** Axios + React Query.
* **Stil:** Tailwind CSS ile modern UX/UI tasarımı.

---

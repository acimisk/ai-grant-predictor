import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="relative px-8 pt-20 pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold mb-6">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          YAPAY ZEKA DESTEKLİ AKADEMİK TİTİZLİK
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-background leading-tight mb-6">
          Hibe Değerlendirmelerinde <span className="text-primary">LLM &amp; RAG</span> ile Devrim Yaratın
        </h1>
        <p className="text-xl text-secondary leading-relaxed mb-10 max-w-2xl">
          Yapay zeka odaklı objektiflik ile KOSGEB ve TÜBİTAK değerlendirme süreçlerini %60 oranında hızlandırın. Karmaşık akademik teklifleri eyleme geçirilebilir içgörülere dönüştürün.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/platform">
            <button className="primary-gradient text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform cursor-pointer">
              Projenize Başlayın
            </button>
          </Link>
          <Link to="/methodology">
            <button className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-xl text-lg font-semibold hover:bg-surface-container-high transition-colors cursor-pointer">
              Metodolojiyi İncele
            </button>
          </Link>
        </div>
      </div>
      <div className="lg:col-span-5 relative">
        <div className="bg-surface-container-low rounded-[2rem] p-4 relative overflow-hidden">
          <img className="rounded-[1.5rem] w-full shadow-2xl" alt="Futuristic digital dashboard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuoUODLoulwdCP02JwSG-PCGM5pua4JHZ8QG5o-9yQdEni-5iAhshRcVtnV_3ZAiH-5QOwdzl8YjW-9KhH8WsG4My3JNrjmTgFoJr67Cf5VPo6ejvtuJrgmJNwK89SA0BiLsQQ1MLfZq-cXL4acuqjIHyJaEqKQZYJb40vemawLI8SjkBlFrKuNH513J8FG1TCMfc_o2-IKawbmhsw9uPHQigl9WXy2BOaRlw1mN5kpDgwMNh_-3tOrQsyT3ixLNOgoCP4wfbmmg1V" />
          <div className="absolute bottom-10 -left-6 bg-surface-container-lowest p-6 rounded-2xl shadow-xl max-w-[240px]">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="font-bold text-sm">Benzerlik Tespit Edildi</span>
            </div>
            <div className="h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-tertiary w-[88%]"></div>
            </div>
            <p className="text-[10px] mt-2 text-secondary">14.2 Milyon akademik makale ile karşılaştırıldı.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-secondary-container/20 to-transparent blur-3xl opacity-50"></div>
  </section>
);

const StatsSection = () => (
  <section className="px-8 py-24 bg-surface-container-low">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface-container-lowest p-10 rounded-[2rem] flex flex-col justify-between group hover:bg-primary-fixed transition-colors duration-500">
          <div>
            <span className="text-6xl font-black text-primary mb-4 block">%60</span>
            <h3 className="text-xl font-bold text-on-surface mb-2">Zaman Tasarrufu</h3>
          </div>
          <p className="text-secondary group-hover:text-on-primary-fixed-variant">Otomatik tarama ve anlamsal analiz, manuel inceleme döngülerini önemli ölçüde azaltır.</p>
        </div>
        <div className="bg-surface-container-lowest p-10 rounded-[2rem] flex flex-col justify-between group hover:bg-tertiary-fixed transition-colors duration-500">
          <div>
            <span className="text-6xl font-black text-tertiary mb-4 block">%68.4</span>
            <h3 className="text-xl font-bold text-on-surface mb-2">Yüksek Doğruluk Metrikleri</h3>
          </div>
          <p className="text-secondary group-hover:text-on-tertiary-fixed-variant">RAG destekli doğrulama, yapay zeka analizlerinin resmi hibe kriterleriyle uyumlu olmasını sağlar.</p>
        </div>
        <div className="bg-surface-container-lowest p-10 rounded-[2rem] flex flex-col justify-between group hover:bg-secondary-fixed transition-colors duration-500">
          <div>
            <span className="material-symbols-outlined text-6xl text-secondary mb-4 block">balance</span>
            <h3 className="text-xl font-bold text-on-surface mb-2">Yapay Zeka Odaklı Tutarlılık</h3>
          </div>
          <p className="text-secondary group-hover:text-on-secondary-fixed-variant">Standartlaştırılmış LLM puanlama yönergeleri ve bağlamsal bilgi erişimi ile insan hatalarını ortadan kaldırır.</p>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="px-8 py-32 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="mb-24 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Kurumsal Titizlik İçin Tasarlandı</h2>
        <p className="text-lg text-secondary">Cognitive Canvas sadece bir araç değil; akademik teklifleri derin bir bağlamsal anlayışla yorumlayan dijital bir küratördür.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="bg-tertiary-fixed/20 p-8 rounded-[2.5rem]">
            <img className="rounded-[2rem] shadow-lg" alt="Macro photography of high-tech circuit board" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYgW6EGK4PCmBDLAKdEABGm7nKHY8R6HkL4VxCyubk1urwzYXbU3Ke9kIPkBFIqnvPKFe6rgfn-oEG0PkMYvqxPsO91tkwNy7sYzpuAxFcCrJItCkqUnXwCC4cqTLD_y4zKiX6JSJOgoTTaRmEswiM2QAzrD83a-CvXnmdwJx8f5ixN1r44EbDo1ZjH8dBkb2rNl6sl8vWYc_A2qN_zEFjDGHxGSv3nERPvwkMDAspbirS2Z_aKmf6tRxzIj1GI7znwVlSaTDF0FCI" />
          </div>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2">
          <span className="text-tertiary font-bold tracking-widest uppercase text-sm mb-4 block">Mimari Avantaj</span>
          <h3 className="text-3xl font-bold mb-6">RAG Mimarisi ve Anlamsal Derinlik</h3>
          <p className="text-lg text-secondary mb-8 leading-relaxed">
            Genel yapay zeka modellerinin aksine, Gelişmiş Bilgi Getirimi (RAG) mimarimiz doğrudan KOSGEB ve TÜBİTAK bilgi tabanlarına bağlanır. Bu, her değerlendirmenin güncel mevzuata ve geçmiş hibe verilerine dayanmasını sağlar.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-tertiary mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="font-medium">Akademik kaynakların bağlama duyarlı doğrulaması</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-tertiary mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="font-medium">Fon sağlayıcı öncelikleri ile gerçek zamanlı eşleştirme</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Bilişsel Mantık</span>
          <h3 className="text-3xl font-bold mb-6">Gelişmiş Benzerlik Tespiti</h3>
          <p className="text-lg text-secondary mb-8 leading-relaxed">
            Akademik dürüstlüğü korumak her şeyden önemlidir. Cognitive Canvas, birden fazla dil ve disiplin arasındaki kavramsal örtüşmeleri ve proje benzerliklerini belirlemek için vektör modeli kullanarak, basit kelime eşleştirmesinin çok ötesine geçer.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-6 rounded-2xl">
              <span className="material-symbols-outlined text-primary mb-2">language</span>
              <div className="font-bold">Çok Dilli Senkronizasyon</div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl">
              <span className="material-symbols-outlined text-primary mb-2">hub</span>
              <div className="font-bold">Projeler Arası Ağ Tespiti</div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="bg-primary-fixed/20 p-8 rounded-[2.5rem] rotate-3">
            <img className="rounded-[2rem] shadow-lg -rotate-3" alt="Artistic satellite view" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwio6Tg3U3T-unT2ET_3y1N3eaPNkNbauLf72DOavJEAvCXk_HXIlV61laazaxwCNXz2Q_kM7eIoqNDn6o8GFJpyx0jhdD-CQWt9Wpqq5Wlhh3-GdQDSlDGH7pdV_3qKJFGnFaVRWnwecAxfrOfCBirO6nOPdZrpLqwtIq-3tF6D7XhACOkDIwwRxJri7nslZuglaHwfQDqR2mLwfIN-3BZnwUWRCa2MJfDkMc9lp_JEvAwU_0hAai-Ty0fJMM0DwplSdoorT3Cftf" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="px-8 py-24">
    <div className="max-w-7xl mx-auto">
      <div className="primary-gradient rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-8">Akademik Etkinizi Artırmaya Hazır Mısınız?</h2>
          <p className="text-primary-fixed text-xl mb-12 max-w-2xl mx-auto">
            Hibe iş akışlarını kolaylaştırmak ve en yüksek standartlarda değerlendirme sağlamak için Cognitive Canvas'ı kullanan lider kurumların arasına katılın.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/platform">
              <button className="bg-white text-primary px-10 py-5 rounded-2xl text-xl font-black shadow-2xl hover:bg-surface-container-lowest transition-all cursor-pointer">
                Projenize Başlayın
              </button>
            </Link>
            <button className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 transition-all cursor-pointer">
              Demo Talep Edin
            </button>
          </div>
        </div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-tertiary-fixed/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  </section>
);

function Landing() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}

export default Landing;

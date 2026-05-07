import React, { useState } from 'react';

export default function DocumentAnalyzer() {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');

  // Backend API'sine RAG Analiz İsteği
  const handleAnalyze = async () => {
    if (!query.trim()) {
      setError('Lütfen analiz edilecek bir proje metni veya soru girin.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setError('');

    try {
      // Backend adresimiz: http://127.0.0.1:8000/api/analyze
      const response = await fetch('http://127.0.0.1:8000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Sunucu hatası oluştu.');
      }

      const data = await response.json();
      // Backend'den gelen format: { response: "...", sources: [...] }
      setAnalysisResult(data);
    } catch (err) {
      setError(`Bağlantı Hatası: ${err.message}. Backend'in çalıştığından ve Ollama'nın açık olduğundan emin olun.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 mt-10 mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-600 rounded-lg text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800">GrantInsight AI Değerlendirme</h2>
      </div>
      
      {/* Metin Giriş Alanı */}
      <div className="relative">
        <textarea
          className="w-full h-64 p-5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-gray-700 text-lg resize-none shadow-inner"
          placeholder="TÜBİTAK projenizin özetini buraya yapıştırın veya sistemdeki makaleler hakkında bir soru sorun..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium">
          {query.length} karakter girildi
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 border-l-4 border-red-500 rounded-r-lg flex items-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
          {error}
        </div>
      )}

      {/* Analiz Butonu */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-500 italic">Yerel Llama 3 & MongoDB Vector Search aktif.</p>
        <button 
          onClick={handleAnalyze} 
          disabled={isAnalyzing || !query.trim()}
          className={`px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center gap-3 ${
            isAnalyzing || !query.trim() 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:-translate-y-1 active:scale-95'
          }`}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Analiz Ediliyor...
            </>
          ) : 'Analiz Et'}
        </button>
      </div>

      {/* Analiz Sonuç Paneli */}
      {analysisResult && (
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sol Taraf: AI Yanıtı */}
            <div className="lg:col-span-2 bg-indigo-50 p-8 rounded-2xl border border-indigo-100 shadow-sm">
              <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path></svg>
                AI Değerlendirme Raporu
              </h3>
              <div className="prose prose-indigo max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
                {analysisResult.response}
              </div>
            </div>

            {/* Sağ Taraf: Kaynakçalar (RAG) */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.993 7.993 0 0113.134 4c1.743 0 3.332.557 4.616 1.503a.75.75 0 01.25 1.057l-1.5 2.502a.75.75 0 01-1.057.25C14.542 8.71 13.86 8.5 13.134 8.5c-.724 0-1.408.21-2.112.511l-1.5 2.503a.75.75 0 11-1.056-.633l1.5-2.503c.12-.2.27-.37.44-.51a8.03 8.03 0 01-1.406-1.064l-1.5 2.502a.75.75 0 11-1.057-.633l1.5-2.502c-.171-.14-.321-.31-.441-.51a8.04 8.04 0 01-1.406-1.064l-1.5 2.502a.75.75 0 01-1.057.25z"></path></svg>
                Benzer Makaleler
              </h3>
              {analysisResult.sources.map((source, index) => (
                <div key={index} className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-indigo-300 transition-colors">
                  <h4 className="font-bold text-gray-800 text-sm mb-2">{source.title}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-md">
                      Benzerlik: %{(source.score * 100).toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
              {analysisResult.sources.length === 0 && (
                <p className="text-sm text-gray-400 italic">Eşleşen referans bulunamadı.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
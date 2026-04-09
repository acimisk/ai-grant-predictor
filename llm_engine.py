from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
import json

# LM Studio'nun yerel sunucusuna bağlanıyoruz
llm = ChatOpenAI(
    base_url="http://localhost:1234/v1", 
    api_key="lm-studio",
    temperature=0.1,
    max_tokens=2000
)

def get_system_prompt(module_name: str) -> str:
    prompts = {
        "academic_approval": "Sen Doç. Dr. Muhammet Baykara'nın dijital asistanısın. Yazılım mühendisliği prensiplerine, SOLID kurallarına ve kod güvenliğine çok önem verirsin. Spagetti kod veya güvenlik açığı varsa projeyi acımasızca eleştir.",
        "tubitak": "Sen sert bir TÜBİTAK proje değerlendirme hakemisin. Projeyi 3 ana kritere göre analiz et: 1-Özgün Değer (Yenilikçi mi?), 2-Yöntem (Gerçekçi mi?), 3-Yaygın Etki (Topluma/Ekonomiye faydası var mı?). Eğer proje sıradan, vizyonsuz ve yenilikten uzaksa düşük puan ver ve reddet.",
        "kosgeb": "Sen KOSGEB mevzuat uzmanısın. Projenin ticari uygulanabilirliğini, pazarlanabilirliğini ve destek sınırlarına uygunluğunu analiz et."
    }
    return prompts.get(module_name, "Sen genel bir proje asistanısın.")

def evaluate_project_with_llm(module_name: str, project_metadata: dict, project_content: dict) -> dict:
    system_prompt = get_system_prompt(module_name)
    
    template = """
    Kurallar: {system_prompt}
    
    Proje Başlığı: {title}
    Proje İçeriği: {content}
    
    Lütfen analizi TAMAMEN TÜRKÇE yap. Sadece ama sadece aşağıdaki JSON formatını döndür. Başka hiçbir giriş, açıklama veya not ekleme:
    {{
        "score": <0-100 arası sayı>,
        "status": "<REJECTED, REVISIONS veya APPROVED>",
        "strengths": ["<güçlü yön>"],
        "weaknesses": ["<zayıf yön>"]
    }}
    """
    
    prompt = PromptTemplate(
        input_variables=["system_prompt", "title", "content"],
        template=template
    )
    
    chain = prompt | llm
    
    try:
        raw_response = chain.invoke({
            "system_prompt": system_prompt,
            "title": project_metadata.get('title', ''),
            "content": str(project_content.get('abstract', '')) + " " + str(project_content.get('methodology', ''))
        })
        
        raw_content = raw_response.content
        
        # Yapay zeka gevezelik yaparsa JSON formatını cımbızlayan zırh
        start_idx = raw_content.find('{')
        end_idx = raw_content.rfind('}')
        
        if start_idx != -1 and end_idx != -1:
            clean_json_str = raw_content[start_idx:end_idx+1]
            parsed_json = json.loads(clean_json_str)
            return parsed_json
        else:
            raise ValueError("Model geçerli bir JSON objesi üretmedi.")
            
    except Exception as e:
        return {"score": 0, "status": "ERROR", "strengths": [], "weaknesses": [f"Sistem/Ayrıştırma Hatası: {str(e)}"]}
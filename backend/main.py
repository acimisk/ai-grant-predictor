import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

# .env dosyasını yükle
load_dotenv()

app = FastAPI(title="GrantInsight AI Backend")

# React Frontend'in istek yapabilmesi için CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI Client'ı başlat (API key .env içindeki OPENAI_API_KEY değişkeninden otomatik alınır)
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key) if api_key and api_key != "sk-senin-api-anahtarin-buraya-gelecek" else None

# Prompt dosyasını oku
def get_system_prompt():
    try:
        # main.py backend klasöründe, prompt ise ana dizinde
        prompt_path = os.path.join(os.path.dirname(__dirname__), "GRANTINSIGHT_AI_PROMPT.md")
        with open(prompt_path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        print(f"Uyarı: Sistem prompt dosyası okunamadı: {e}")
        return "Senin adın GrantInsight AI. Profesyonel bir hibe danışmanısın."

class AnalyzeRequest(BaseModel):
    query: str

class AnalyzeResponse(BaseModel):
    response: str

@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze_project(request: AnalyzeRequest):
    if not client:
        # Eğer API anahtarı ayarlanmamışsa, test amaçlı sahte bir metin döndür
        return AnalyzeResponse(response="[TEST MODU] API anahtarı ayarlanmamış. Sistem şu an test modunda çalışıyor. Lütfen backend klasöründeki .env dosyasına OpenAI API anahtarınızı girin.\n\nSorduğunuz soru: " + request.query)

    try:
        system_prompt = get_system_prompt()
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo", # Daha gelişmiş bir analiz için gpt-4o kullanılabilir
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.query}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        
        ai_message = response.choices[0].message.content
        return AnalyzeResponse(response=ai_message)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "GrantInsight AI Backend is running"}

from fastapi import FastAPI, HTTPException
from schemas import AnalysisRequest, AnalysisResponse
from llm_engine import evaluate_project_with_llm

app = FastAPI(title="YGA Karar Destek Sistemi API", version="1.0.0")

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_project(request: AnalysisRequest):
    target = request.target_module
    valid_modules = ["tubitak", "academic_approval", "kosgeb"]
    
    if target not in valid_modules:
        raise HTTPException(status_code=400, detail="Geçersiz modül seçimi!")

    metadata_dict = request.project_metadata.model_dump()
    content_dict = request.content.model_dump()
    
    # İSTEK BURADA GERÇEK LLAMA-3 MOTORUNA GÖNDERİLİR
    llm_result = evaluate_project_with_llm(
        module_name=target,
        project_metadata=metadata_dict,
        project_content=content_dict
    )

    return AnalysisResponse(
        module=target,
        score=llm_result.get("score", 0),
        status=llm_result.get("status", "ERROR"),
        detailed_analysis={
            "strengths": llm_result.get("strengths", []),
            "weaknesses": llm_result.get("weaknesses", [])
        }
    )
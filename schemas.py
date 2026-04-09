from pydantic import BaseModel
from typing import List, Optional

class ContentSchema(BaseModel):
    abstract: str
    methodology: str
    technologies: List[str]

class ProjectMetadata(BaseModel):
    title: str
    author: str
    submission_date: str

class AnalysisRequest(BaseModel):
    project_metadata: ProjectMetadata
    content: ContentSchema
    target_module: str  # tubitak, academic_approval, kosgeb

class AnalysisResponse(BaseModel):
    module: str
    score: int
    status: str
    detailed_analysis: dict
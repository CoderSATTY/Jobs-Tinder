import os
import json
from pydoc import doc
import tempfile
import numpy as np
import pytesseract
from pdf2image import convert_from_path
from groq import Groq
from google import genai
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, UploadFile, File, HTTPException,WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict, List
import firebase_admin
from firebase_admin import credentials, firestore, auth

# Load environment variables
load_dotenv()

# Tesseract and Poppler paths
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
POPPLER_PATH = r"C:\poppler\Release-25.12.0-0\poppler-25.12.0\Library\bin"
SYSTEM_PROMPT_PATH = os.path.join(os.path.dirname(__file__),  "system_prompt.txt")
# DATABASE_PATH = os.path.join(os.path.dirname(__file__), "data", "database_with_embeddings.json")

app = FastAPI(title="Resume Parser & Job Recommendation API")

cred = credentials.Certificate("C:\\Users\\ninad\\Downloads\\ppt-maker-7f813-firebase-adminsdk-fbsvc-facb0c310f.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:3000", "http://127.0.0.1:5173", "http://localhost:8080", "http://localhost:8081", "http://127.0.0.1:8080", "http://127.0.0.1:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RankedJob(BaseModel):
    id: str
    title: str
    company: str
    tags: List[str]
    location: str
    date_posted: str
    apply_link: str
    description_snippet: str
    score: float

def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid auth header")

    token = authorization.split(" ")[1]

    try:
        decoded_token = auth.verify_id_token(token)

        # Return useful user info
        return {
            "uid": decoded_token.get("uid"),
            "email": decoded_token.get("email"),
            "name": decoded_token.get("name"),          # Google / provider name
       
        }

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from PDF using OCR."""
    try:
        images = convert_from_path(pdf_path, poppler_path=POPPLER_PATH)
        text_content = ""
        for image in images:
            text_content += pytesseract.image_to_string(image)
        return text_content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF extraction error: {str(e)}")


def parse_resume_with_llm(text_content: str) -> dict:
    """Parse resume text to JSON using Groq LLM."""
    api_key = os.getenv("GROQ_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GROQ_KEY not found in environment")
    
    if not os.path.exists(SYSTEM_PROMPT_PATH):
        raise HTTPException(status_code=500, detail="system_prompt.txt not found")

    with open(SYSTEM_PROMPT_PATH, "r", encoding="utf-8") as f:
        system_prompt = f.read()

    client = Groq(api_key=api_key)

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": text_content}
            ],
            temperature=0,
            response_format={"type": "json_object"}
        )
        return json.loads(completion.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM parsing error: {str(e)}")


def create_embedding(text: str) -> np.ndarray:
    """Create embedding using Gemini text-embedding-004."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not found in environment")
    
    client = genai.Client(api_key=api_key)
    
    try:
        response = client.models.embed_content(
            model="text-embedding-004",
            contents=text
        )
        return np.array(response.embeddings[0].values).reshape(1, -1)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Embedding error: {str(e)}")


def load_job_database() -> List[dict]:
    """Load the job database with embeddings."""
    try:
        jobs_ref=db.collection("resumes").stream()
        jobs = []
        for doc in jobs_ref:
            data = doc.to_dict()
            data["id"] = doc.id   # keep document ID
            jobs.append(data)

        if not jobs:
            raise HTTPException(status_code=404, detail="No jobs found in Firestore")

        return jobs

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Firestore error: {str(e)}")

def compute_and_store_ranking(uid):
    user_doc = db.collection("users").document(uid).get()
    job_dict = user_doc.to_dict()["job_dict"]

    database = load_job_database()
    ranked_jobs = rank_jobs_by_similarity(job_dict, database, top_k=3000)

    ranked_job_ids = [job["id"] for job in ranked_jobs]

    db.collection("users").document(uid).update({
        "ranked_job_ids": ranked_job_ids,
        "ranking_updated_at": firestore.SERVER_TIMESTAMP
    })


def rank_jobs_by_similarity(
    job_dict: dict,
    database: List[dict],
    top_k: int = 50,
) -> List[dict]:
 
    # 1️⃣ Embed the resume/job preference
    job_text = json.dumps(job_dict, sort_keys=True)
    query_embedding = create_embedding(job_text)

    results = []

    for item in database:
        embedding = item.get("embedding")
        if not embedding:
            continue  # skip jobs without embeddings

        item_embedding = np.array(embedding).reshape(1, -1)
        score = cosine_similarity(query_embedding, item_embedding)[0][0]

        # 2️⃣ Build frontend-safe job object
        job_result = {
            "id": item["id"],                 # 🔑 correct id
            "title": item.get("title", ""),
            "company": item.get("company_name", ""),
            "tags": item.get("tags", []),                 # may be empty
            "location": item.get("location", ""),
            "extensions": item.get("extensions", {}),   
            "apply_link": item.get("share_link", ""),
            "description_snippet": (
                item.get("description", "")[:300]         # 🔑 derive snippet
            ),
            "score": float(score),
        }

        results.append(job_result)

    # 3️⃣ Sort by similarity score
    results.sort(key=lambda x: x["score"], reverse=True)
    print(f"Top job match score: {results[0]['score'] if results else 'N/A'}")
    print(f"Top company name: {results[0]['company'] if results else 'N/A'}")

    return results[:top_k]

@app.websocket("/ws/jobs")
async def jobs_ws(ws: WebSocket):
    await ws.accept()

    try:
        token = ws.query_params.get("token")
        if not token:
            await ws.close(code=1008)
            return

        decoded = auth.verify_id_token(token)
        uid = decoded["uid"]

        # 2. Load user state (example)
        user_ref = db.collection("users").document(uid)
        user = user_ref.get().to_dict()

        ranked_job_ids = user.get("ranked_job_ids", [])
        count = user.get("count", 0)

        while True:
            data = json.loads(await ws.receive_text())

            if data["type"] == "NEXT_JOB":
                if count >= len(ranked_job_ids):
                    await ws.send_json({ "type": "END" })
                    continue

                job_id = ranked_job_ids[count]
                count += 1

                doc = db.collection("resumes").document(job_id).get()
                if doc.exists:
                    job_data = doc.to_dict()
                    job_data = {key: job_data.get(key, "") for key in ["apply_options", "company_name", "description", "detected_extensions", "extensions", "job_highlights", "location", "title"]}
                    job_data["id"] = job_id
                    
                    await ws.send_json({
                        "type": "JOB",
                        "job": job_data
                    })

                user_ref.update({"count": count})

    except WebSocketDisconnect:
        print("Client disconnected")

@app.post("/parse-resume")
async def parse_resume(file: UploadFile = File(...),user: dict = Depends(get_current_user)):
    """
    Upload a resume PDF and get parsed info_dict and job_dict.
    """
    # Validate file type
    if not file.filename.lower().endswith(('.pdf', '.docx')):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")
    
    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
        content = await file.read()
        tmp_file.write(content)
        tmp_path = tmp_file.name
    
    try:
        # Extract text from PDF
        raw_text = extract_text_from_pdf(tmp_path)
        
        if not raw_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")
        
        # Parse with LLM
        parsed_data = parse_resume_with_llm(raw_text)
        
        # Get both info_dict and job_dict
        info_dict = parsed_data.get("info_dict", {})
        job_dict = parsed_data.get("job_dict", {})
        new_keys_tracker = parsed_data.get("new_keys_tracker", {})

        db.collection("users").document(user["uid"]).set(
            {
                "info_dict": info_dict,
                "job_dict": job_dict,
                "dynamic_keys": new_keys_tracker,
                "count":0,
                "updated_at": firestore.SERVER_TIMESTAMP,
            },
            merge=True,
        )
        
        return {
            "success": True,
            "info_dict": info_dict,
            "job_dict": job_dict,
            "dynamic_keys": {
                "info_dict": new_keys_tracker.get("info_dict", []),
                "job_dict": new_keys_tracker.get("job_dict", [])
            }
        }
        
    finally:
        # Clean up temp file
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)

        # Compute and store ranking
        compute_and_store_ranking(user["uid"])


@app.get("/save-profile")
async def save_profile(user: dict = Depends(get_current_user)):
    """
    Save profile and get ranked job recommendations.
    
    Takes job_dict, creates embedding, and returns jobs ranked by similarity.
    """
    try:
        # Load database
        # database = load_job_database()
        user_doc = db.collection("users").document(user["uid"]).get()
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User data not found")
        count=user_doc.to_dict().get("count",0)
        # Rank jobs by similarity
        ranked_job_ids = user_doc.to_dict().get("ranked_job_ids", [])
        #fetch only top 5 based on count*5
        jobs_to_send = ranked_job_ids[count : count + 5]
        #write code fetching these job details from firestore
        jobs_to_send_details = []
        for job_id in jobs_to_send:
            job_doc = db.collection("resumes").document(job_id).get()
            if job_doc.exists:
                job_data = job_doc.to_dict()
                job_data = {key: job_data.get(key, "") for key in ["apply_options", "company_name", "description", "detected_extensions", "extensions", "job_highlights", "location", "title"]}
                job_data["id"] = job_id
                jobs_to_send_details.append(job_data)
 
        print("Ranked jobs sent successfully.")#also shows ranked_job_ids
        print(jobs_to_send_details)
        return {
            "success": True,
            "ranked_jobs":jobs_to_send_details,
            "total_jobs": len(ranked_job_ids)
        }
        
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/debug/ranked_jobs")
async def debug_ranked_jobs(user: dict = Depends(get_current_user)):
    """Debug endpoint: compute and return ranked jobs and a sample of the resumes DB.
    This is protected by the same auth used elsewhere and is intended for debugging only.
    """
    try:
        user_doc = db.collection("users").document(user["uid"]).get()
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User data not found")

        job_dict = user_doc.to_dict().get("job_dict", {})
        database = load_job_database()

        # Compute ranking (in-memory, do not store)
        ranked = rank_jobs_by_similarity(job_dict, database, top_k=50)

        # Provide a sample mapping of doc ids -> titles from the DB to inspect whether doc ids are titles
        db_sample = [{"doc_id": d.get("id"), "title": d.get("title")} for d in database[:50]]

        return {
            "success": True,
            "ranked_jobs_sample": ranked[:20],
            "database_sample": db_sample
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/me")
async def get_my_profile(user: dict = Depends(get_current_user)):
    doc = db.collection("users").document(user["uid"]).get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail="User data not found")

    return {
        "success": True,
        "data": doc.to_dict()
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


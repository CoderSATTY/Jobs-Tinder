# SwipeHire

> AI-Powered Job Discovery Platform with Semantic Matching & Conversational RAG

SwipeHire is a modern job discovery platform that leverages advanced NLP and machine learning to match candidates with opportunities using semantic understanding of resumes and job descriptions.

## 🏗️ Architecture Overview

### Architecture Diagram

![Architecture Diagram](https://mermaid.ink/img/Zmxvd2NoYXJ0IFRCCiAgICBzdWJncmFwaCBDbGllbnRbIkZyb250ZW5kIChOZXh0LmpzICsgVHlwZVNjcmlwdCkiXQogICAgICAgIFVJW1JlYWN0IFVJIENvbXBvbmVudHNdCiAgICAgICAgQXV0aFtGaXJlYmFzZSBBdXRoXQogICAgICAgIFdTW1dlYlNvY2tldCBDbGllbnRdCiAgICAgICAgQ2hhdFtSQUcgQ2hhdCBJbnRlcmZhY2VdCiAgICBlbmQKCiAgICBzdWJncmFwaCBBUElbIkJhY2tlbmQgKEZhc3RBUEkgKyBQeXRob24pIl0KICAgICAgICBSb3V0ZXJbQVBJIFJvdXRlcl0KICAgICAgICBQYXJzZXJbUmVzdW1lIFBhcnNlcl0KICAgICAgICBFbWJlZGRlcltFbWJlZGRpbmcgR2VuZXJhdG9yXQogICAgICAgIFJhbmtlcltTZW1hbnRpYyBSYW5rZXJdCiAgICAgICAgUkFHW1JBRyBFbmdpbmVdCiAgICBlbmQKCiAgICBzdWJncmFwaCBOTFBbIk5MUCBQaXBlbGluZSJdCiAgICAgICAgR2VtaW5pW0dvb2dsZSBHZW1pbmkgTExNXQogICAgICAgIFRleHRFbWJlZFt0ZXh0LWVtYmVkZGluZy0wMDRdCiAgICAgICAgVG9rZW5pemVyW1RleHQgUHJlcHJvY2Vzc2luZ10KICAgIGVuZAoKICAgIHN1YmdyYXBoIERhdGFbIkRhdGEgTGF5ZXIgKEZpcmVzdG9yZSkiXQogICAgICAgIFVzZXJzWyhVc2VyIFByb2ZpbGVzKV0KICAgICAgICBKb2JzWyhKb2IgQ29ycHVzKV0KICAgICAgICBNYXRjaGVzWyhTYXZlZCBNYXRjaGVzKV0KICAgIGVuZAoKICAgIFVJIC0tPnxVcGxvYWQgUERGL0RPQ1h8IFJvdXRlcgogICAgUm91dGVyIC0tPiBQYXJzZXIKICAgIFBhcnNlciAtLT58UmF3IFRleHR8IFRva2VuaXplcgogICAgVG9rZW5pemVyIC0tPnxDbGVhbmVkIFRleHR8IEdlbWluaQogICAgR2VtaW5pIC0tPnxTdHJ1Y3R1cmVkIEpTT058IFBhcnNlcgogICAgUGFyc2VyIC0tPnxSZXN1bWUgRGF0YXwgRW1iZWRkZXIKICAgIEVtYmVkZGVyIC0tPiBUZXh0RW1iZWQKICAgIFRleHRFbWJlZCAtLT58NzY4LWRpbSBWZWN0b3J8IFVzZXJzCgogICAgV1MgPC0tPnxTdHJlYW0gSm9ic3wgUmFua2VyCiAgICBSYW5rZXIgLS0-IEpvYnMKICAgIFJhbmtlciAtLT58Q29zaW5lIFNpbWlsYXJpdHl8IFRleHRFbWJlZAogICAgUmFua2VyIC0tPnxSYW5rZWQgUmVzdWx0c3wgV1MKCiAgICBDaGF0IC0tPiBSQUcKICAgIFJBRyAtLT58Q29udGV4dDogUmVzdW1lICsgSm9ifCBHZW1pbmkKICAgIEdlbWluaSAtLT58U1NFIFN0cmVhbXwgQ2hhdAoKICAgIEF1dGggPC0tPiBVc2VycwogICAgVUkgLS0-fFNhdmUgTWF0Y2h8IE1hdGNoZXM=)


### Pipeline Flow

![Pipeline Flow](https://mermaid.ink/img/Zmxvd2NoYXJ0IExSCiAgICBBW_Cfk4QgUmVzdW1lIFVwbG9hZF0gLS0-fFB5TXVQREYvZG9jeHwgQltUZXh0IEV4dHJhY3Rpb25dCiAgICBCIC0tPnxEYXRhIENsZWFuaW5nfCBDW05MUCBQcmVwcm9jZXNzaW5nXQogICAgQyAtLT58R2VtaW5pIExMTXwgRFtFbnRpdHkgRXh0cmFjdGlvbl0KICAgIEQgLS0-fEpTT04gU2NoZW1hfCBFW1N0cnVjdHVyZWQgUHJvZmlsZV0KICAgIEUgLS0-fHRleHQtZW1iZWRkaW5nLTAwNHwgRltWZWN0b3IgRW1iZWRkaW5nXQogICAgRiAtLT58RmlyZXN0b3JlfCBHWyhVc2VyIFN0b3JlKV0KICAgIAogICAgRyAtLT4gSHtTZW1hbnRpYyBSYW5rZXJ9CiAgICBJWyhKb2IgQ29ycHVzKV0gLS0-IEgKICAgIEggLS0-fENvc2luZSBTaW1pbGFyaXR5fCBKW1Njb3JlIENhbGN1bGF0aW9uXQogICAgSiAtLT58VG9wLUsgU2VsZWN0aW9ufCBLW1dlYlNvY2tldCBTdHJlYW1dCiAgICBLIC0tPiBMW_Cfk7EgRGlzY292ZXJ5IFVJXQogICAgCiAgICBMIC0tPnxVc2VyIFF1ZXJ5fCBNW1JBRyBFbmdpbmVdCiAgICBHIC0tPnxSZXN1bWUgQ29udGV4dHwgTQogICAgSSAtLT58Sm9iIENvbnRleHR8IE0KICAgIE0gLS0-fEdlbWluaSBTdHJlYW1pbmd8IE5b8J-SrCBBSSBSZXNwb25zZV0=)


## 🔬 Core Pipeline

### 1. Resume Parsing & Information Extraction

The system employs a multi-stage parsing pipeline to extract structured data from unstructured resume documents:

- **Document Ingestion**: Supports PDF and DOCX formats via PyMuPDF and python-docx
- **LLM-Powered Extraction**: Uses Google Gemini to extract:
  - Personal information (name, email, contact)
  - Educational background with institutions and degrees
  - Technical skills categorized by proficiency
  - Work experience with responsibilities and achievements
  - Project descriptions with technologies used
- **Schema Validation**: Outputs structured JSON conforming to defined schemas

### 2. Semantic Embedding Generation

Converts textual content into dense vector representations for similarity computation:

- **Embedding Model**: Google's `text-embedding-004` model
- **Dual Encoding**: Generates embeddings for both resumes and job descriptions
- **Vector Dimensions**: 768-dimensional dense vectors
- **Batch Processing**: Efficient batch embedding for job corpus

### 3. Recommendation & Ranking Engine

Implements a hybrid ranking system combining semantic similarity with heuristic scoring:

```
Final Score = α × Semantic_Similarity + β × Skill_Match + γ × Experience_Fit
```

- **Semantic Similarity**: Cosine similarity between resume and job embeddings
- **Skill Matching**: Weighted overlap between candidate skills and job requirements
- **Experience Alignment**: Years of experience vs. job seniority requirements
- **Real-time Ranking**: Jobs ranked and streamed via WebSocket for instant updates

### 4. Conversational RAG (Retrieval-Augmented Generation)

Context-aware conversational AI for job-specific queries:

- **Context Injection**: Injects user's resume and current job posting into prompts
- **Streaming Responses**: Real-time token streaming via Server-Sent Events (SSE)
- **Use Cases**:
  - Fit analysis ("Am I qualified for this role?")
  - Interview preparation tips
  - Cover letter generation assistance
  - Skills gap identification

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Python 3.11+, FastAPI, Uvicorn |
| **AI/ML** | Google Gemini (text-embedding-004, gemini-3-flash-preview) |
| **Database** | Firebase Firestore |
| **Auth** | Firebase Authentication |
| **Real-time** | WebSocket (for job streaming) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Firebase project with Firestore enabled
- Google AI API key (Gemini)

### Backend Setup

```bash
cd backend
pip install -r requirements.txt

# Set environment variables
export GEMINI_API_KEY="your-gemini-api-key"
export GOOGLE_APPLICATION_CREDENTIALS="path/to/serviceAccountKey.json"

# Run the server
uvicorn server:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install

# Configure Firebase (create .env.local)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...

# Run development server
npm run dev
```

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/upload-resume` | POST | Parse and store resume |
| `/user` | GET | Fetch user profile |
| `/ws/jobs` | WS | Stream ranked job recommendations |
| `/match` | POST | Save job to matches |
| `/matches` | GET | Retrieve saved matches |
| `/chat` | POST | RAG-powered chat about jobs |

## 🔐 Authentication Flow

1. User signs in via Firebase (Email/Password or Google OAuth)
2. Frontend obtains Firebase ID token
3. Token sent in `Authorization: Bearer <token>` header
4. Backend verifies token via Firebase Admin SDK
5. User UID extracted for database operations

## 📊 Data Models

### User Profile
```json
{
  "uid": "firebase-user-id",
  "info_dict": {
    "full_name": "string",
    "email": "string",
    "education": [{ "institution": "string", "degree": "string" }]
  },
  "job_dict": {
    "technical_skills": ["string"],
    "experience_summary": "string",
    "projects": [{ "title": "string", "technologies": ["string"] }]
  },
  "embedding": [0.123, ...] // 768-dim vector
}
```

### Job Listing
```json
{
  "id": "job-id",
  "title": "string",
  "company_name": "string",
  "location": "string",
  "description": "string",
  "extensions": ["Full-time", "Remote"],
  "apply_options": [{ "title": "string", "link": "url" }],
  "embedding": [0.456, ...] // 768-dim vector
}
```

## 🎯 Features

- ✅ Resume parsing with LLM extraction
- ✅ Semantic job matching with embeddings
- ✅ Real-time job recommendations via WebSocket
- ✅ Swipe-based discovery interface
- ✅ RAG-powered job-specific chatbot
- ✅ Match persistence and management
- ✅ Responsive, animated UI

## 📄 License

MIT License - See LICENSE file for details.

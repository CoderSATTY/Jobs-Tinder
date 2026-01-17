# 💼 SwipeHire

> AI-Powered Job Discovery Platform with Semantic Matching & Conversational RAG

SwipeHire is a modern job discovery platform that leverages advanced NLP and machine learning to match candidates with opportunities using semantic understanding of resumes and job descriptions.

---

## Architecture Overview

### System Architecture

The platform follows a microservices-inspired architecture deployed on serverless infrastructure (Modal) with a modern frontend (Next.js on Vercel).

![Architecture Diagram](https://mermaid.ink/img/Zmxvd2NoYXJ0IExSCiAgICBzdWJncmFwaCBDbGllbnRbIkNsaWVudCBMYXllciJdCiAgICAgICAgZGlyZWN0aW9uIFRCCiAgICAgICAgTmV4dEpTWyJOZXh0LmpzIDE2PGJyLz5SZWFjdCBGcmFtZXdvcmsiXQogICAgICAgIFZlcmNlbFsiVmVyY2VsIEVkZ2U8YnIvPkNETiBhbmQgU1NSIl0KICAgICAgICBOZXh0SlMgLS0-IFZlcmNlbAogICAgZW5kCgogICAgc3ViZ3JhcGggR2F0ZXdheVsiQVBJIEdhdGV3YXkiXQogICAgICAgIGRpcmVjdGlvbiBUQgogICAgICAgIEF1dGhbIkZpcmViYXNlIEF1dGg8YnIvPkpXVCBUb2tlbnMiXQogICAgICAgIENPUlNbIkNPUlMgTWlkZGxld2FyZTxici8-T3JpZ2luIFZhbGlkYXRpb24iXQogICAgICAgIFdTWyJXZWJTb2NrZXQgU2VydmVyPGJyLz5SZWFsLXRpbWUgU3RyZWFtaW5nIl0KICAgIGVuZAoKICAgIHN1YmdyYXBoIENvbXB1dGVbIlNlcnZlcmxlc3MgQ29tcHV0ZSAtIE1vZGFsIl0KICAgICAgICBkaXJlY3Rpb24gVEIKICAgICAgICBGYXN0QVBJWyJGYXN0QVBJIEFTR0k8YnIvPkFzeW5jIFJFU1QgQVBJIl0KICAgICAgICBQYXJzZXJbIlBhcnNlciBBZ2VudDxici8-UmVzdW1lIEV4dHJhY3Rpb24iXQogICAgICAgIFJhbmtlclsiU2VtYW50aWMgUmFua2VyPGJyLz5Db3NpbmUgU2ltaWxhcml0eSJdCiAgICAgICAgUkFHWyJSQUcgRW5naW5lPGJyLz5Db250ZXh0IFJldHJpZXZhbCJdCiAgICAgICAgQ2hhdGJvdFsiTExNIENoYXRib3Q8YnIvPkdlbWluaSAzIEZsYXNoIl0KICAgIGVuZAoKICAgIHN1YmdyYXBoIE5MUFsiTkxQIFBpcGVsaW5lIl0KICAgICAgICBkaXJlY3Rpb24gVEIKICAgICAgICBPQ1JbIlRlc3NlcmFjdCBPQ1I8YnIvPlRleHQgRXh0cmFjdGlvbiJdCiAgICAgICAgUG9wcGxlclsiUG9wcGxlciBVdGlsczxici8-UERGIFJlbmRlcmluZyJdCiAgICAgICAgRW1iZWRkZXJbIlRleHQgRW1iZWRkZXI8YnIvPnRleHQtZW1iZWRkaW5nLTAwNCJdCiAgICAgICAgTExNWyJMTE0gUmVhc29uZXI8YnIvPkdlbWluaSAzIEZsYXNoIl0KICAgIGVuZAoKICAgIHN1YmdyYXBoIFN0b3JhZ2VbIlBlcnNpc3RlbmNlIExheWVyIl0KICAgICAgICBkaXJlY3Rpb24gVEIKICAgICAgICBGaXJlc3RvcmVbKCJGaXJlc3RvcmU8YnIvPk5vU1FMIERhdGFiYXNlIildCiAgICAgICAgVmVjdG9yU3RvcmVbKCJWZWN0b3IgSW5kZXg8YnIvPkVtYmVkZGluZ3MiKV0KICAgICAgICBNb2RhbFZvbFsiTW9kYWwgVm9sdW1lPGJyLz5DcmVkZW50aWFscyBTdG9yZSJdCiAgICBlbmQKCiAgICBzdWJncmFwaCBJbmdlc3Rpb25bIkRhdGEgSW5nZXN0aW9uIl0KICAgICAgICBkaXJlY3Rpb24gVEIKICAgICAgICBTY3JhcGVyWyJKb2JTcHkgU2NyYXBlcjxici8-TXVsdGktU291cmNlIEFnZ3JlZ2F0b3IiXQogICAgICAgIFVwbG9hZFsiUmVzdW1lIFVwbG9hZDxici8-UERGL0RPQ1ggUGFyc2VyIl0KICAgIGVuZAoKICAgIENsaWVudCAtLT58SFRUUFN8IEdhdGV3YXkKICAgIFZlcmNlbCAtLT58UkVTVHwgRmFzdEFQSQogICAgVmVyY2VsIC0tPnxXU1N8IFdTCgogICAgQXV0aCAtLT4gRmFzdEFQSQogICAgV1MgLS0-IFJhbmtlcgoKICAgIFNjcmFwZXIgLS0-IEZpcmVzdG9yZQogICAgVXBsb2FkIC0tPiBPQ1IKICAgIE9DUiAtLT4gUG9wcGxlcgogICAgUG9wcGxlciAtLT4gTExNCiAgICBMTE0gLS0-IEVtYmVkZGVyCgogICAgRW1iZWRkZXIgLS0-IFZlY3RvclN0b3JlCiAgICBQYXJzZXIgLS0-IEZpcmVzdG9yZQoKICAgIEZhc3RBUEkgLS0-IFBhcnNlcgogICAgRmFzdEFQSSAtLT4gUmFua2VyCiAgICBGYXN0QVBJIC0tPiBSQUcKICAgIFJBRyAtLT4gQ2hhdGJvdAogICAgUmFua2VyIC0tPiBWZWN0b3JTdG9yZQogICAgUmFua2VyIC0tPiBGaXJlc3RvcmUKICAgIFJBRyAtLT4gRmlyZXN0b3JlCiAgICBDaGF0Ym90IC0tPiBMTE0=)

**Key Components:**

| Component | Technology | Description |
|-----------|------------|-------------|
| **Client Layer** | Next.js 16, Vercel Edge | React-based SSR frontend with CDN distribution |
| **API Gateway** | Firebase Auth, WebSocket | JWT authentication and real-time bidirectional streaming |
| **Serverless Compute** | Modal (ASGI) | FastAPI backend with Parser Agent, Semantic Ranker, RAG Engine |
| **NLP Pipeline** | Tesseract, Poppler, Gemini | OCR extraction, PDF rendering, LLM reasoning, vector embeddings |
| **Persistence** | Firestore, Vector Store | NoSQL database with semantic embedding index |
| **Ingestion** | JobSpy Scraper | Multi-source job aggregation from LinkedIn, Indeed, Glassdoor |

---

### Data Pipeline Flow

The 7-stage pipeline processes data from ingestion through real-time delivery:

![Pipeline Flow](https://mermaid.ink/img/Zmxvd2NoYXJ0IFRCCiAgICBQMVsiMS4gREFUQSBBQ1FVSVNJVElPTjxici8-Sm9iIFNjcmFwaW5nIOKAoiBSZXN1bWUgVXBsb2FkIl0KICAgIFAyWyIyLiBET0NVTUVOVCBQUk9DRVNTSU5HPGJyLz5PQ1IgRW5naW5lIOKAoiBEYXRhIFNhbml0aXplciJdCiAgICBQM1siMy4gTkxQIEFORCBFTUJFRERJTkdTPGJyLz5QYXJzZXIgQWdlbnQg4oCiIFZlY3RvciBFbWJlZGRlciDigKIgRW50aXR5IEV4dHJhY3RvciJdCiAgICBQNFsiNC4gU1RPUkFHRSBBTkQgSU5ERVhJTkc8YnIvPkZpcmVzdG9yZSDigKIgVmVjdG9yIFN0b3JlIl0KICAgIFA1WyI1LiBSRVRSSUVWQUwgQU5EIFJBTktJTkc8YnIvPlNlbWFudGljIFJldHJpZXZlciDigKIgU2NvcmUgUmFua2VyIl0KICAgIFA2WyI2LiBSQUcgQU5EIFJFU1BPTlNFPGJyLz5SQUcgQ29udGV4dCDigKIgTExNIFJlc3BvbnNlIl0KICAgIFA3WyI3LiBSRUFMLVRJTUUgREVMSVZFUlk8YnIvPldlYlNvY2tldCBTdHJlYW0g4oCiIE5leHQuanMgRnJvbnRlbmQiXQoKICAgIFAxIC0tPiBQMiAtLT4gUDMgLS0-IFA0IC0tPiBQNSAtLT4gUDYgLS0-IFA3)

**Pipeline Stages Explained:**

| Stage | Component | Technical Description |
|-------|-----------|----------------------|
| **1. Data Acquisition** | JobSpy Scraper | Multi-source job aggregation using web scraping from LinkedIn, Indeed, Glassdoor |
| **2. Document Processing** | Tesseract OCR + Poppler | PDF rendering via Poppler, text extraction via Tesseract OCR engine |
| **3. NLP & Embeddings** | Parser Agent + Embedder | Gemini 3 Flash Preview for entity extraction, text-embedding-004 for semantic vectors |
| **4. Storage & Indexing** | Firestore + Vector Store | NoSQL persistence with approximate nearest neighbor (ANN) indexing |
| **5. Retrieval & Ranking** | Semantic Retriever + Ranker | Pure cosine similarity scoring between resume and job embeddings |
| **6. RAG & Response** | RAG Engine + LLM | In-memory context retrieval with streaming SSE responses |
| **7. Real-time Delivery** | WebSocket Stream | Bidirectional WSS for instant job card updates |

---

## Core Pipeline Details

### 1. Resume Parsing & Information Extraction

Multi-stage parsing pipeline to extract structured data from unstructured resume documents:

- **Document Ingestion**: PDF/DOCX support via Poppler and python-docx
- **OCR Processing**: Tesseract for scanned document text extraction
- **LLM-Powered Extraction**: Gemini 3 Flash Preview extracts entities (name, skills, education, experience)
- **Schema Validation**: Structured JSON output conforming to defined schemas

### 2. Semantic Embedding Generation

Dense vector representations for similarity computation:

- **Embedding Model**: Google's `text-embedding-004`
- **Dual Encoding**: Separate embeddings for resumes and job descriptions
- **Batch Processing**: Efficient corpus embedding for 3000+ jobs

### 3. Recommendation & Ranking Engine

Pure semantic similarity ranking using cosine similarity:

- **Semantic Similarity**: Cosine similarity between resume and job embeddings
- **Real-time Ranking**: Jobs ranked and streamed via WebSocket in descending order

### 4. Conversational RAG (Retrieval-Augmented Generation)

Context-aware conversational AI for job-specific queries:

- **Context Injection**: User resume + job posting injected into prompts
- **Streaming Responses**: Real-time token streaming via Server-Sent Events (SSE)
- **Use Cases**: Fit analysis, interview prep, cover letter generation, skills gap identification

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16, React, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Python 3.11+, FastAPI (ASGI), Modal Serverless |
| **AI/ML** | Google Gemini 3 Flash Preview, text-embedding-004 |
| **Database** | Firebase Firestore, Vector Store |
| **Auth** | Firebase Authentication (JWT) |
| **Real-time** | WebSocket (WSS), Server-Sent Events (SSE) |
| **OCR** | Tesseract, Poppler |
| **Deployment** | Vercel (Frontend), Modal (Backend) |

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/parse-resume` | POST | OCR + LLM parsing of resume documents |
| `/save-profile` | GET | Fetch ranked job recommendations |
| `/ws/jobs` | WS | Real-time streaming of ranked jobs |
| `/match` | POST | Save job to user's matches |
| `/matches` | GET | Retrieve saved matches |
| `/match/{id}` | DELETE | Remove a saved match |
| `/matches` | DELETE | Clear all matches |
| `/chat` | POST | RAG-powered contextual chat |
| `/health` | GET | Health check endpoint |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Firebase project with Firestore enabled
- Google AI API key (Gemini)
- Tesseract OCR installed
- Poppler installed

### Running Locally

#### Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Set environment variables
set GEMINI_API_KEY=your-gemini-api-key

# Run the local server
uvicorn server:app --reload --port 8000
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local

# Run development server
npm run dev
```

The app will be available at `http://localhost:3000`

---

## Production Deployment

### Backend (Modal)

```bash
cd backend

# Create volume for credentials
modal volume create tfj-data
modal volume put tfj-data firebase-credentials.json /firebase-credentials.json
modal volume put tfj-data system_prompt.txt /system_prompt.txt

# Create secret for API key
modal secret create gemini-secret GEMINI_API_KEY=your_key

# Deploy to Modal
modal deploy modal_server.py
```

### Frontend (Vercel)

```bash
cd frontend
vercel --prod -e NEXT_PUBLIC_API_URL=https://your-modal-url.modal.run
```

---

## Features

- ✅ Resume parsing with OCR + LLM extraction
- ✅ Semantic job matching with vector embeddings
- ✅ Real-time job recommendations via WebSocket
- ✅ Swipe-based discovery interface (Tinder-style UX)
- ✅ RAG-powered job-specific chatbot
- ✅ Match persistence and management
- ✅ Responsive, animated UI with Framer Motion
- ✅ Serverless deployment on Modal + Vercel

---

## License

MIT License - See LICENSE file for details.

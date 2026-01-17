# 💼 SwipeHire

> AI-Powered Job Discovery Platform with Semantic Matching & Conversational RAG

SwipeHire is a modern job discovery platform that leverages advanced NLP and machine learning to match candidates with opportunities using semantic understanding of resumes and job descriptions.

---

## Architecture Overview

### System Architecture

The platform follows a microservices-inspired architecture deployed on serverless infrastructure (Modal) with a modern frontend (Next.js on Vercel).

![Architecture Diagram](https://mermaid.ink/img/Zmxvd2NoYXJ0IExSCiAgICBzdWJncmFwaCBDbGllbnRbIkNsaWVudCBMYXllciJdCiAgICAgICAgZGlyZWN0aW9uIFRCCiAgICAgICAgTmV4dEpTWyJOZXh0LmpzIDE2Jmx0O2JyLyZndDsmbHQ7aSZndDtSZWFjdCBGcmFtZXdvcmsmbHQ7L2kmZ3Q7Il0KICAgICAgICBWZXJjZWxbIlZlcmNlbCBFZGdlJmx0O2JyLyZndDsmbHQ7aSZndDtDRE4gYW5kIFNTUiZsdDsvaSZndDsiXQogICAgICAgIE5leHRKUyAtLT4gVmVyY2VsCiAgICBlbmQKCiAgICBzdWJncmFwaCBHYXRld2F5WyJBUEkgR2F0ZXdheSJdCiAgICAgICAgZGlyZWN0aW9uIFRCCiAgICAgICAgQXV0aFsiRmlyZWJhc2UgQXV0aCZsdDtici8mZ3Q7Jmx0O2kmZ3Q7SldUIFRva2VucyZsdDsvaSZndDsiXQogICAgICAgIENPUlNbIkNPUlMgTWlkZGxld2FyZSZsdDtici8mZ3Q7Jmx0O2kmZ3Q7T3JpZ2luIFZhbGlkYXRpb24mbHQ7L2kmZ3Q7Il0KICAgICAgICBXU1siV2ViU29ja2V0IFNlcnZlciZsdDtici8mZ3Q7Jmx0O2kmZ3Q7UmVhbC10aW1lIFN0cmVhbWluZyZsdDsvaSZndDsiXQogICAgZW5kCgogICAgc3ViZ3JhcGggQ29tcHV0ZVsiU2VydmVybGVzcyBDb21wdXRlIC0gTW9kYWwiXQogICAgICAgIGRpcmVjdGlvbiBUQgogICAgICAgIEZhc3RBUElbIkZhc3RBUEkgQVNHSSZsdDtici8mZ3Q7Jmx0O2kmZ3Q7QXN5bmMgUkVTVCBBUEkmbHQ7L2kmZ3Q7Il0KICAgICAgICBQYXJzZXJbIlBhcnNlciBBZ2VudCZsdDtici8mZ3Q7Jmx0O2kmZ3Q7UmVzdW1lIEV4dHJhY3Rpb24mbHQ7L2kmZ3Q7Il0KICAgICAgICBSYW5rZXJbIlNlbWFudGljIFJhbmtlciZsdDtici8mZ3Q7Jmx0O2kmZ3Q7Q29zaW5lIFNpbWlsYXJpdHkmbHQ7L2kmZ3Q7Il0KICAgICAgICBSQUdbIlJBRyBFbmdpbmUmbHQ7YnIvJmd0OyZsdDtpJmd0O0NvbnRleHQgUmV0cmlldmFsJmx0Oy9pJmd0OyJdCiAgICAgICAgQ2hhdGJvdFsiTExNIENoYXRib3QmbHQ7YnIvJmd0OyZsdDtpJmd0O0dlbWluaSAyLjAgRmxhc2gmbHQ7L2kmZ3Q7Il0KICAgIGVuZAoKICAgIHN1YmdyYXBoIE5MUFsiTkxQIFBpcGVsaW5lIl0KICAgICAgICBkaXJlY3Rpb24gVEIKICAgICAgICBPQ1JbIlRlc3NlcmFjdCBPQ1ImbHQ7YnIvJmd0OyZsdDtpJmd0O1RleHQgRXh0cmFjdGlvbiZsdDsvaSZndDsiXQogICAgICAgIFBvcHBsZXJbIlBvcHBsZXIgVXRpbHMmbHQ7YnIvJmd0OyZsdDtpJmd0O1BERiBSZW5kZXJpbmcmbHQ7L2kmZ3Q7Il0KICAgICAgICBFbWJlZGRlclsiVGV4dCBFbWJlZGRlciZsdDtici8mZ3Q7Jmx0O2kmZ3Q7dGV4dC1lbWJlZGRpbmctMDA0Jmx0Oy9pJmd0OyJdCiAgICAgICAgTExNWyJMTE0gUmVhc29uZXImbHQ7YnIvJmd0OyZsdDtpJmd0O0dlbWluaSAyLjAgRmxhc2gmbHQ7L2kmZ3Q7Il0KICAgIGVuZAoKICAgIHN1YmdyYXBoIFN0b3JhZ2VbIlBlcnNpc3RlbmNlIExheWVyIl0KICAgICAgICBkaXJlY3Rpb24gVEIKICAgICAgICBGaXJlc3RvcmVbKCJGaXJlc3RvcmUmbHQ7YnIvJmd0OyZsdDtpJmd0O05vU1FMIERhdGFiYXNlJmx0Oy9pJmd0OyIpXQogICAgICAgIFZlY3RvclN0b3JlWygiVmVjdG9yIEluZGV4Jmx0O2JyLyZndDsmbHQ7aSZndDs3NjgtZGltIEVtYmVkZGluZ3MmbHQ7L2kmZ3Q7IildCiAgICAgICAgTW9kYWxWb2xbIk1vZGFsIFZvbHVtZSZsdDtici8mZ3Q7Jmx0O2kmZ3Q7Q3JlZGVudGlhbHMgU3RvcmUmbHQ7L2kmZ3Q7Il0KICAgIGVuZAoKICAgIHN1YmdyYXBoIEluZ2VzdGlvblsiRGF0YSBJbmdlc3Rpb24iXQogICAgICAgIGRpcmVjdGlvbiBUQgogICAgICAgIFNjcmFwZXJbIkpvYlNweSBTY3JhcGVyJmx0O2JyLyZndDsmbHQ7aSZndDtNdWx0aS1Tb3VyY2UgQWdncmVnYXRvciZsdDsvaSZndDsiXQogICAgICAgIFVwbG9hZFsiUmVzdW1lIFVwbG9hZCZsdDtici8mZ3Q7Jmx0O2kmZ3Q7UERGL0RPQ1ggUGFyc2VyJmx0Oy9pJmd0OyJdCiAgICBlbmQKCiAgICAlJSBDbGllbnQgdG8gR2F0ZXdheQogICAgQ2xpZW50IC0tPnxIVFRQU3wgR2F0ZXdheQogICAgVmVyY2VsIC0tPnxSRVNUfCBGYXN0QVBJCiAgICBWZXJjZWwgLS0-fFdTU3wgV1MKCiAgICAlJSBHYXRld2F5IHRvIENvbXB1dGUKICAgIEF1dGggLS0-IEZhc3RBUEkKICAgIFdTIC0tPiBSYW5rZXIKCiAgICAlJSBJbmdlc3Rpb24gdG8gTkxQCiAgICBTY3JhcGVyIC0tPiBGaXJlc3RvcmUKICAgIFVwbG9hZCAtLT4gT0NSCiAgICBPQ1IgLS0-IFBvcHBsZXIKICAgIFBvcHBsZXIgLS0-IExMTQogICAgTExNIC0tPiBFbWJlZGRlcgoKICAgICUlIE5MUCB0byBTdG9yYWdlCiAgICBFbWJlZGRlciAtLT4gVmVjdG9yU3RvcmUKICAgIFBhcnNlciAtLT4gRmlyZXN0b3JlCgogICAgJSUgQ29tcHV0ZSB1c2VzIE5MUCBhbmQgU3RvcmFnZQogICAgRmFzdEFQSSAtLT4gUGFyc2VyCiAgICBGYXN0QVBJIC0tPiBSYW5rZXIKICAgIEZhc3RBUEkgLS0-IFJBRwogICAgUkFHIC0tPiBDaGF0Ym90CiAgICBSYW5rZXIgLS0-IFZlY3RvclN0b3JlCiAgICBSYW5rZXIgLS0-IEZpcmVzdG9yZQogICAgUkFHIC0tPiBGaXJlc3RvcmUKICAgIENoYXRib3QgLS0-IExMTQ==)

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

![Pipeline Flow](https://mermaid.ink/img/Zmxvd2NoYXJ0IExSCiAgICBzdWJncmFwaCBQaGFzZTFbIjEuIERhdGEgQWNxdWlzaXRpb24iXQogICAgICAgIGRpcmVjdGlvbiBUQgogICAgICAgIEpvYnNbIkpvYiBTY3JhcGluZyZsdDtici8mZ3Q7Jmx0O2kmZ3Q7Sm9iU3B5IE11bHRpLVNvdXJjZSZsdDsvaSZndDsiXQogICAgICAgIFJlc3VtZVsiUmVzdW1lIFVwbG9hZCZsdDtici8mZ3Q7Jmx0O2kmZ3Q7RHJhZyBhbmQgRHJvcCBVSSZsdDsvaSZndDsiXQogICAgZW5kCgogICAgc3ViZ3JhcGggUGhhc2UyWyIyLiBEb2N1bWVudCBQcm9jZXNzaW5nIl0KICAgICAgICBkaXJlY3Rpb24gVEIKICAgICAgICBPQ1JbIk9DUiBFbmdpbmUmbHQ7YnIvJmd0OyZsdDtpJmd0O1Rlc3NlcmFjdCArIFBvcHBsZXImbHQ7L2kmZ3Q7Il0KICAgICAgICBDbGVhblsiRGF0YSBTYW5pdGl6ZXImbHQ7YnIvJmd0OyZsdDtpJmd0O1RleHQgTm9ybWFsaXphdGlvbiZsdDsvaSZndDsiXQogICAgZW5kCgogICAgc3ViZ3JhcGggUGhhc2UzWyIzLiBOTFAgYW5kIEVtYmVkZGluZ3MiXQogICAgICAgIGRpcmVjdGlvbiBUQgogICAgICAgIExMTVsiUGFyc2VyIEFnZW50Jmx0O2JyLyZndDsmbHQ7aSZndDtHZW1pbmkgMi4wIEZsYXNoJmx0Oy9pJmd0OyJdCiAgICAgICAgRW1iZWRbIlZlY3RvciBFbWJlZGRlciZsdDtici8mZ3Q7Jmx0O2kmZ3Q7NzY4LWRpbSBTZW1hbnRpYyZsdDsvaSZndDsiXQogICAgICAgIEVudGl0eVsiRW50aXR5IEV4dHJhY3RvciZsdDtici8mZ3Q7Jmx0O2kmZ3Q7U2tpbGxzIGFuZCBFeHBlcmllbmNlJmx0Oy9pJmd0OyJdCiAgICBlbmQKCiAgICBzdWJncmFwaCBQaGFzZTRbIjQuIFN0b3JhZ2UgYW5kIEluZGV4aW5nIl0KICAgICAgICBkaXJlY3Rpb24gVEIKICAgICAgICBEQlsoIkZpcmVzdG9yZSZsdDtici8mZ3Q7Jmx0O2kmZ3Q7VXNlciBQcm9maWxlcyZsdDsvaSZndDsiKV0KICAgICAgICBWREJbKCJWZWN0b3IgU3RvcmUmbHQ7YnIvJmd0OyZsdDtpJmd0O0pvYiBFbWJlZGRpbmdzJmx0Oy9pJmd0OyIpXQogICAgZW5kCgogICAgc3ViZ3JhcGggUGhhc2U1WyI1LiBSZXRyaWV2YWwgYW5kIFJhbmtpbmciXQogICAgICAgIGRpcmVjdGlvbiBUQgogICAgICAgIFJldHJpZXZlclsiU2VtYW50aWMgUmV0cmlldmVyJmx0O2JyLyZndDsmbHQ7aSZndDtBTk4gU2VhcmNoJmx0Oy9pJmd0OyJdCiAgICAgICAgUmFua2VyWyJTY29yZSBSYW5rZXImbHQ7YnIvJmd0OyZsdDtpJmd0O0Nvc2luZSBTaW1pbGFyaXR5Jmx0Oy9pJmd0OyJdCiAgICBlbmQKCiAgICBzdWJncmFwaCBQaGFzZTZbIjYuIFJBRyBhbmQgUmVzcG9uc2UiXQogICAgICAgIGRpcmVjdGlvbiBUQgogICAgICAgIFJBR1siUkFHIENvbnRleHQmbHQ7YnIvJmd0OyZsdDtpJmd0O0luLU1lbW9yeSBSZXRyaWV2YWwmbHQ7L2kmZ3Q7Il0KICAgICAgICBDaGF0WyJMTE0gUmVzcG9uc2UmbHQ7YnIvJmd0OyZsdDtpJmd0O1N0cmVhbWluZyBTU0UmbHQ7L2kmZ3Q7Il0KICAgIGVuZAoKICAgIHN1YmdyYXBoIFBoYXNlN1siNy4gUmVhbC10aW1lIERlbGl2ZXJ5Il0KICAgICAgICBkaXJlY3Rpb24gVEIKICAgICAgICBXU1siV2ViU29ja2V0IFN0cmVhbSZsdDtici8mZ3Q7Jmx0O2kmZ3Q7Sm9iIENhcmRzJmx0Oy9pJmd0OyJdCiAgICAgICAgVUlbIk5leHQuanMgRnJvbnRlbmQmbHQ7YnIvJmd0OyZsdDtpJmd0O1N3aXBlIEludGVyZmFjZSZsdDsvaSZndDsiXQogICAgZW5kCgogICAgJSUgRmxvdyBDb25uZWN0aW9ucwogICAgSm9icyAtLT4gQ2xlYW4KICAgIFJlc3VtZSAtLT4gT0NSCiAgICBPQ1IgLS0-IENsZWFuCiAgICBDbGVhbiAtLT4gTExNCiAgICBMTE0gLS0-IEVudGl0eQogICAgTExNIC0tPiBFbWJlZAogICAgRW50aXR5IC0tPiBEQgogICAgRW1iZWQgLS0-IFZEQgogICAgVkRCIC0tPiBSZXRyaWV2ZXIKICAgIERCIC0tPiBSZXRyaWV2ZXIKICAgIFJldHJpZXZlciAtLT4gUmFua2VyCiAgICBSYW5rZXIgLS0-IFJBRwogICAgUkFHIC0tPiBDaGF0CiAgICBSYW5rZXIgLS0-IFdTCiAgICBDaGF0IC0tPiBVSQogICAgV1MgLS0-IFVJ)

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

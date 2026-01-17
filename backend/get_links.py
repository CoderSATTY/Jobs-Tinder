import base64

arch_diagram = """flowchart TB
    subgraph DataSources["Data Acquisition"]
        direction TB
        Scraper["Web Scraping<br/>(JobSpy)"]
        Uploads["User Uploads<br/>(PDF/DOCX)"]
    end

    subgraph Processing["Data Processing & NLP"]
        direction TB
        OCR["OCR & Parsing<br/>(pytesseract, PyMuPDF)"]
        Cleaner["Data Cleaning &<br/>Normalization"]
        LLM["LLM Reasoning<br/>(Gemini 2.5)"]
        Embedder["Vector Embedding<br/>(text-embedding-004)"]
    end

    subgraph Storage["Persistence Layer (Firebase)"]
        direction TB
        Firestore[("Firestore<br/>NoSQL")]
        Vectors[("Vector Store")]
    end

    subgraph Application["Application Logic"]
        direction TB
        Ranker["Semantic<br/>Ranker"]
        RAG["In-Memory<br/>RAG Engine"]
        Chatbot["Generative<br/>Chatbot"]
    end

    subgraph Client["Presentation Layer"]
        direction TB
        WS["WebSocket<br/>Stream"]
        NextJS["Next.js<br/>Frontend"]
    end

    %% Data Flow
    Scraper & Uploads --> OCR
    OCR --> Cleaner
    Cleaner --> LLM
    LLM --> Embedder
    
    %% Storage Flow
    Cleaner --> Firestore
    Embedder --> Vectors
    
    %% Logic Flow
    Vectors & Firestore --> Ranker
    Firestore --> RAG
    
    %% App Flow
    Ranker --> WS
    RAG --> Chatbot
    
    %% Client Flow
    Chatbot & WS --> NextJS"""

pipeline_flow = """flowchart TB
    subgraph Ingestion["1. Data Ingestion"]
        direction TB
        Jobs["Job Aggregation<br/>(JobSpy)"] 
        Resumes["Resume Upload<br/>(PDF/DOCX)"]
    end

    subgraph Preprocessing["2. Preprocessing & Cleaning"]
        direction TB
        CleanJobs["Structured<br/>Job Listings"]
        CleanText["Cleaned<br/>Resume Text"]
    end

    subgraph NLP["3. NLP & Semantic Understanding"]
        direction TB
        Entities["Entity Extraction<br/>(Skills/Experience)"]
        Embeddings["Vector Embedding<br/>(768-dim)"]
    end

    subgraph Storage["4. Storage & Indexing"]
        direction TB
        DB[("Firebase<br/>Firestore")]
    end

    subgraph Discovery["5. Discovery & RAG"]
        direction TB
        Matcher["Semantic<br/>Matcher"]
        Bot["Chatbot<br/>Response"]
    end
    
    subgraph UI["6. User Interface"]
        Frontend["Next.js UI"]
    end

    %% Flow
    Jobs --> CleanJobs
    Resumes --> CleanText
    
    CleanText --> Entities
    CleanJobs & CleanText --> Embeddings
    
    Entities & Embeddings --> DB
    
    DB --> Matcher
    DB --> Bot
    
    Matcher --> Frontend
    Bot --> Frontend"""

def get_link(mermaid_code):
    encoded = base64.urlsafe_b64encode(mermaid_code.encode('utf8')).decode('ascii')
    return f"https://mermaid.ink/img/{encoded}"

print(f"ARCH_URL={get_link(arch_diagram)}")
print(f"PIPE_URL={get_link(pipeline_flow)}")

if __name__ == "__main__":
    get_link(arch_diagram)
    #get_link(pipeline_flow)

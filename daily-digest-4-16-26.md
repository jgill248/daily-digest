# Ask Sage Enhanced Platform — System Specification

**Version:** 2.0.0-draft
**Date:** 2026-04-15
**Status:** Proposal
**Author:** John (AI-Assisted)

---

## 1. Executive Summary

This specification defines a complete prototype platform that replicates and extends the core functionality of Ask Sage's generative AI platform. The system serves as a functional proof-of-concept for proposed enhancements, demonstrating improvements to dataset management, retrieval quality, knowledge navigation, and operational transparency — while preserving Ask Sage's strengths as a secure multi-model gateway.

The platform is organized into seven subsystems:

1. **Gateway Layer** — NestJS backend that proxies Ask Sage's API for model inference while intercepting and enhancing the request/response pipeline with local capabilities.
2. **Document Lifecycle** — Ingestion, parsing, chunking, embedding, and storage of source documents with full configurability and transparency at every stage.
3. **Retrieval Engine** — Multi-strategy retrieval (semantic, keyword, hybrid, metadata-filtered) powered by pgvector and Postgres full-text search, replacing Ask Sage's opaque RAG pipeline.
4. **Taxonomy Engine** — Managed controlled vocabulary with hierarchical term structures, synonym resolution, query expansion, and auto-tagging.
5. **Dataset Wiki** — Auto-generated, browsable, editable knowledge base with provenance tracking, cross-references, and coverage analysis.
6. **Chat Interface** — React-based conversational UI with full context assembly transparency, source citations, and session management.
7. **Audit & Observability** — Comprehensive logging of every decision in the pipeline from query to response, exportable for compliance review.

### 1.1 Architectural Philosophy

The system uses a **proxy-and-replace** architecture. NestJS acts as the sole backend for the React frontend. For capabilities where Ask Sage excels (multi-model access, government cloud hosting, security posture), the backend proxies requests to Ask Sage's API. For capabilities being replaced or enhanced (dataset management, retrieval, knowledge navigation, audit), the backend uses local Postgres/pgvector infrastructure.

The frontend never communicates directly with Ask Sage. This creates a clean seam where any proxied capability can be replaced with a local implementation without frontend changes, and vice versa.

```
┌─────────────────────────────────────────────────────────┐
│                   React Frontend                        │
│  Chat │ Wiki Browser │ Dataset Mgr │ Taxonomy │ Admin   │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/WebSocket
┌──────────────────────┴──────────────────────────────────┐
│                   NestJS Backend                        │
│                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ Chat Module  │  │ Dataset      │  │ Wiki Module   │  │
│  │             │  │ Module       │  │               │  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬───────┘  │
│         │                │                   │          │
│  ┌──────┴──────┐  ┌──────┴───────┐  ┌───────┴───────┐  │
│  │ Retrieval   │  │ Ingestion    │  │ Taxonomy      │  │
│  │ Engine      │  │ Pipeline     │  │ Engine        │  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬───────┘  │
│         │                │                   │          │
│  ┌──────┴────────────────┴───────────────────┴───────┐  │
│  │              Audit & Observability                 │  │
│  └───────────────────────┬───────────────────────────┘  │
│                          │                              │
│  ┌───────────────────────┴───────────────────────────┐  │
│  │            Ask Sage API Proxy                      │  │
│  │  (model inference, personas, plugins, auth)        │  │
│  └───────────────────────┬───────────────────────────┘  │
└──────────────────────────┼──────────────────────────────┘
                           │ HTTPS
              ┌────────────┴────────────┐
              │   Ask Sage API          │
              │   api.asksage.ai        │
              │   /server/* /user/*     │
              └─────────────────────────┘

              ┌─────────────────────────┐
              │   PostgreSQL + pgvector  │
              │   Documents, Chunks,    │
              │   Vectors, Taxonomy,    │
              │   Wiki, Audit Logs      │
              └─────────────────────────┘

              ┌─────────────────────────┐
              │   Redis                 │
              │   Job Queues, Cache,    │
              │   Session State         │
              └─────────────────────────┘
```

### 1.2 Tech Stack

| Layer | Technology | Justification |
|---|---|---|
| Frontend | React + TypeScript | Existing team expertise; component ecosystem |
| Styling | Tailwind CSS + Radix UI primitives | IBM Carbon-adjacent aesthetic; accessible primitives |
| State Management | Zustand or TanStack Query | Lightweight; server-state-first for data-heavy UI |
| Backend | NestJS + TypeScript | Modular architecture; decorator-based DI; WebSocket support |
| ORM | Prisma or TypeORM | Type-safe schema management; migration tooling |
| Database | PostgreSQL 16+ with pgvector | Vector search + relational + full-text in one engine |
| Job Queue | BullMQ + Redis | Reliable async processing; job monitoring dashboard |
| Cache | Redis | Shared cache for taxonomy, wiki TOC, session data |
| File Storage | Local filesystem (prototype) / S3-compatible (production) | Original document storage |
| Search | PostgreSQL tsvector + pgvector | No external search dependency; hybrid search capability |
| Containerization | Docker + Docker Compose | Single-command dev environment; production parity |

### 1.3 Design Principles

1. **Provenance is non-negotiable.** Every AI-generated output traces to specific source material through an auditable chain.
2. **Transparency over magic.** Users see how documents were processed, how retrieval worked, and what context the model received.
3. **Human-in-the-loop by default.** Auto-generated content is staged for review. SMEs can correct and extend. Machine and human contributions are distinguished.
4. **Taxonomy is infrastructure, not bureaucracy.** Controlled vocabulary reduces friction via auto-suggest and auto-tag, not mandatory forms.
5. **Incremental value.** Each subsystem is useful independently. Taxonomy improves retrieval. Wiki improves navigation. Together they compound.
6. **Proxy what works, replace what doesn't.** Ask Sage's model gateway is good. Its dataset pipeline is not. The architecture respects that distinction.

---

## 2. Gateway Layer — Ask Sage API Proxy

### 2.1 Overview

The Gateway Layer manages authentication with Ask Sage's API and proxies requests for capabilities that remain on Ask Sage's infrastructure. It also intercepts and enriches requests where local capabilities augment Ask Sage's functionality.

### 2.2 Authentication Flow

```
User Login (React)
    │
    ▼
NestJS Auth Module
    │
    ├─► Local session created (JWT, stored in Redis)
    │
    ├─► POST api.asksage.ai/user/get-token-with-api-key
    │   (email + API key from local config)
    │
    ▼
Ask Sage access token stored in local session
    │
    ▼
All proxied requests attach x-access-tokens header automatically
```

#### 2.2.1 Credential Management

Ask Sage credentials (email + API key per user) are stored encrypted in Postgres. The backend manages token refresh transparently — if a proxied request returns 401, the backend re-authenticates and retries once before surfacing the error to the frontend.

```sql
CREATE TABLE user_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    asksage_email VARCHAR(255) NOT NULL,
    asksage_api_key_encrypted BYTEA NOT NULL,
    asksage_access_token TEXT,
    token_expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 2.3 Proxied Endpoints

These Ask Sage endpoints are proxied as-is through NestJS. The backend adds audit logging but does not modify payloads.

| Local Route | Proxied To | Purpose |
|---|---|---|
| `POST /api/v1/models` | `/server/get-models` | List available models |
| `POST /api/v1/personas` | `/server/get-personas` | List personas |
| `POST /api/v1/plugins` | `/server/get-plugins` | List plugins |
| `POST /api/v1/query/plugin` | `/server/query-plugin` | Execute a plugin query |
| `POST /api/v1/query/execute-plugin` | `/server/execute-plugin` | Execute plugin with content |
| `POST /api/v1/tokens/count` | `/server/count-monthly-tokens` | Token usage |
| `POST /api/v1/tts` | `/server/get-text-to-speech` | Text-to-speech |
| `POST /api/v1/agents/list` | `/server/list-agents` | List available agents |
| `POST /api/v1/agents/execute` | `/server/execute-agent` | Execute agent workflow |

### 2.4 Replaced Endpoints

These Ask Sage capabilities are replaced by local implementations:

| Replaced Ask Sage Endpoint | Local Replacement | Reason |
|---|---|---|
| `/server/query` | Local retrieval + context assembly + Ask Sage model call | Control over retrieval, context, and audit |
| `/server/query_with_file` | Local file processing + retrieval + model call | Control over file handling |
| `/server/train` | Local ingestion pipeline | Full lifecycle control |
| `/server/train-with-file` | Local ingestion pipeline | Full lifecycle control |
| `/server/get-datasets` | Local dataset management | Relational dataset model |
| `/server/file` | Local file processing | Preserve originals |
| `/user/add-dataset` | Local dataset CRUD | Versioned datasets |
| `/user/delete-datasets` | Local dataset CRUD | Soft-delete with history |
| `/user/get-chats` | Local session management | Richer session model |
| `/user/get-chat-session` | Local session management | Full context reconstruction |

### 2.5 The Enhanced Query Flow

```
User sends message (React)
    │
    ▼
POST /api/v1/chat/message
    │
    ▼
1. Session Resolution
   - Load or create chat session
   - Load session history and summarized context
    │
    ▼
2. Retrieval (LOCAL - pgvector + Postgres FTS)
   - Determine retrieval strategy (from workspace config or explicit)
   - Expand query terms via taxonomy synonyms
   - Execute retrieval against selected datasets
   - Score and rank results
   - Return chunks with provenance metadata
    │
    ▼
3. Context Assembly (LOCAL)
   - Apply token budget (model-specific context window)
   - Deduplicate overlapping chunks
   - Order by relevance (or chronological)
   - Format chunks with source citations
   - Prepend system prompt (persona or custom)
   - Append conversation history (summarized if needed)
   - Record assembled context as audit artifact
    │
    ▼
4. Model Inference (PROXIED to Ask Sage)
   - POST api.asksage.ai/server/query
     OR POST api.asksage.ai/server/openai/v1/chat/completions
   - Body includes assembled context as the message
   - Model, temperature from workspace config or user override
    │
    ▼
5. Response Processing (LOCAL)
   - Parse response
   - Extract and validate source citations
   - Store query + context + response in audit log
   - Update session history
   - Return response with structured citation metadata
    │
    ▼
React renders response with clickable source citations
```

---

## 3. Core Data Model — Users, Workspaces, Configuration

### 3.1 Users

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    display_name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'member'
        CHECK (role IN ('admin', 'manager', 'member', 'viewer')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 3.2 Workspaces

Workspaces bundle configuration, team membership, datasets, wikis, and defaults into a scoped environment. Replaces Ask Sage's flat global context.

```sql
CREATE TABLE workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    default_model VARCHAR(100) NOT NULL DEFAULT 'gpt-4o-mini',
    default_persona_id VARCHAR(50),
    default_temperature REAL NOT NULL DEFAULT 0.7,
    default_retrieval_strategy VARCHAR(30) NOT NULL DEFAULT 'hybrid'
        CHECK (default_retrieval_strategy IN ('semantic', 'keyword', 'hybrid', 'metadata_filtered')),
    default_retrieval_limit INTEGER NOT NULL DEFAULT 10,
    classification_level VARCHAR(30) NOT NULL DEFAULT 'unclassified'
        CHECK (classification_level IN ('unclassified', 'cui', 'cui_specified', 'confidential', 'secret', 'top_secret')),
    config JSONB NOT NULL DEFAULT '{}',
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE workspace_members (
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    workspace_role VARCHAR(20) NOT NULL DEFAULT 'member'
        CHECK (workspace_role IN ('admin', 'editor', 'member', 'viewer')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (workspace_id, user_id)
);
```

### 3.3 Workspace Configuration Schema

```typescript
interface WorkspaceConfig {
    retrieval: {
        strategy: 'semantic' | 'keyword' | 'hybrid' | 'metadata_filtered';
        semantic_weight: number;              // 0.0-1.0, default: 0.7
        keyword_weight: number;               // 0.0-1.0, default: 0.3
        max_chunks: number;                   // default: 10
        min_relevance_score: number;          // default: 0.3
        taxonomy_expansion_enabled: boolean;  // default: true
        include_wiki_pages: boolean;          // default: false
    };
    chat: {
        system_prompt_override: string | null;
        max_history_messages: number;         // default: 20
        auto_summarize_history: boolean;      // default: true
        summarize_after_messages: number;     // default: 10
        show_retrieval_debug: boolean;        // default: false
    };
    ingestion: {
        default_chunking_strategy: string;
        auto_tag_with_taxonomy: boolean;      // default: true
        auto_generate_summaries: boolean;     // default: true
        summary_model: string;                // default: 'gpt-4o-mini'
    };
    wiki: {
        auto_publish: boolean;                // default: false
        require_review: boolean;              // default: true
        generation_model: string;             // default: 'gpt-4o-mini'
        max_tokens_per_page: number;          // default: 4000
    };
}
```

---

## 4. Document Lifecycle

### 4.1 Overview

Replaces Ask Sage's opaque `/train` and `/train-with-file` with a transparent, configurable pipeline that preserves source files, exposes chunking decisions, and stores rich metadata alongside embeddings.

### 4.2 Data Model

#### 4.2.1 Datasets

Datasets are logical groupings. A document can belong to multiple datasets. Datasets do not own or destroy their documents.

```sql
CREATE TABLE datasets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    classification_level VARCHAR(30) NOT NULL DEFAULT 'unclassified'
        CHECK (classification_level IN ('unclassified', 'cui', 'cui_specified', 'confidential', 'secret', 'top_secret')),
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'archived', 'deleted')),
    document_count INTEGER NOT NULL DEFAULT 0,
    chunk_count INTEGER NOT NULL DEFAULT 0,
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (workspace_id, name)
);

CREATE TABLE dataset_documents (
    dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE NOT NULL,
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
    added_by UUID REFERENCES users(id) NOT NULL,
    added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (dataset_id, document_id)
);
```

#### 4.2.2 Documents

```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
    filename VARCHAR(500) NOT NULL,
    original_filename VARCHAR(500) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    file_hash VARCHAR(128) NOT NULL,
    file_storage_path TEXT NOT NULL,
    title VARCHAR(500),
    author VARCHAR(255),
    publication_date DATE,
    document_type VARCHAR(50),
    classification_level VARCHAR(30) NOT NULL DEFAULT 'unclassified',
    language VARCHAR(10) NOT NULL DEFAULT 'en',
    page_count INTEGER,
    metadata JSONB NOT NULL DEFAULT '{}',
    processing_status VARCHAR(20) NOT NULL DEFAULT 'uploaded'
        CHECK (processing_status IN ('uploaded', 'parsing', 'parsed', 'chunking', 'chunked', 'embedding', 'embedded', 'ready', 'error')),
    processing_error TEXT,
    uploaded_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_documents_workspace ON documents(workspace_id);
CREATE INDEX idx_documents_status ON documents(processing_status);
CREATE INDEX idx_documents_hash ON documents(file_hash);
```

#### 4.2.3 Document Sections

```sql
CREATE TABLE document_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
    parent_section_id UUID REFERENCES document_sections(id) ON DELETE CASCADE,
    section_number VARCHAR(50),
    title VARCHAR(500),
    content_text TEXT NOT NULL,
    content_type VARCHAR(20) NOT NULL DEFAULT 'text'
        CHECK (content_type IN ('text', 'table', 'list', 'image_caption', 'header', 'footer')),
    page_start INTEGER,
    page_end INTEGER,
    depth INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    word_count INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sections_document ON document_sections(document_id);
CREATE INDEX idx_sections_parent ON document_sections(parent_section_id);
```

#### 4.2.4 Chunking Strategies

```sql
CREATE TABLE chunking_strategies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    algorithm VARCHAR(30) NOT NULL
        CHECK (algorithm IN ('fixed_size', 'section_based', 'semantic', 'sentence_window', 'recursive_character')),
    parameters JSONB NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    applicable_doc_types TEXT[],
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Algorithm parameters:**

- `fixed_size`: `{ "chunk_size": 512, "overlap": 50 }`
- `section_based`: `{ "max_section_tokens": 1024, "split_large_sections": true, "overlap": 50 }`
- `semantic`: `{ "similarity_threshold": 0.5, "min_chunk_size": 100, "max_chunk_size": 1000 }`
- `sentence_window`: `{ "window_size": 3, "max_tokens": 512 }`
- `recursive_character`: `{ "chunk_size": 1000, "overlap": 200, "separators": ["\n\n", "\n", ". "] }`

#### 4.2.5 Chunks

```sql
CREATE TABLE chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
    section_id UUID REFERENCES document_sections(id) ON DELETE SET NULL,
    strategy_id UUID REFERENCES chunking_strategies(id) NOT NULL,
    chunk_index INTEGER NOT NULL,
    content_text TEXT NOT NULL,
    content_hash VARCHAR(128) NOT NULL,
    token_count INTEGER NOT NULL,
    page_start INTEGER,
    page_end INTEGER,
    section_path TEXT,
    metadata JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (document_id, strategy_id, chunk_index)
);

CREATE INDEX idx_chunks_document ON chunks(document_id);
CREATE INDEX idx_chunks_section ON chunks(section_id);
CREATE INDEX idx_chunks_content_fts ON chunks USING GIN (to_tsvector('english', content_text));
```

#### 4.2.6 Embeddings

```sql
CREATE TABLE embedding_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    provider VARCHAR(50) NOT NULL,
    dimensions INTEGER NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE chunk_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chunk_id UUID REFERENCES chunks(id) ON DELETE CASCADE NOT NULL,
    model_id UUID REFERENCES embedding_models(id) NOT NULL,
    embedding vector NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (chunk_id, model_id)
);

CREATE INDEX idx_chunk_embeddings_vector ON chunk_embeddings
    USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 200);
```

### 4.3 Ingestion Pipeline

Asynchronous, multi-stage, implemented as a BullMQ job chain.

**Stage 1 — Upload:** Validate, hash, store original, create document record, enqueue parsing.

**Stage 2 — Parsing:** Determine parser by MIME type (pdf-parse, mammoth, direct parse). Extract structure into `document_sections`. Preserve hierarchy.

**Stage 3 — Chunking:** Load strategy, apply algorithm, compute token counts and hashes, store chunks with section path breadcrumbs.

**Stage 4 — Embedding:** Batch chunks, generate embeddings via configured provider, store in `chunk_embeddings` with model reference.

**Stage 5 — Auto-Tagging (optional):** Dictionary match against taxonomy + LLM extraction. Assign chunk/document tags. Stage unmatched frequent terms as proposed taxonomy additions.

### 4.4 Document API

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/documents/upload` | Upload and begin processing |
| `GET` | `/api/v1/documents` | List (filterable by workspace, dataset, status, type) |
| `GET` | `/api/v1/documents/:id` | Detail with sections and status |
| `GET` | `/api/v1/documents/:id/sections` | Parsed section tree |
| `GET` | `/api/v1/documents/:id/chunks` | Chunks with strategy info and tags |
| `GET` | `/api/v1/documents/:id/original` | Download original file |
| `PUT` | `/api/v1/documents/:id` | Update metadata |
| `DELETE` | `/api/v1/documents/:id` | Soft-delete |
| `POST` | `/api/v1/documents/:id/rechunk` | Re-chunk with different strategy |
| `POST` | `/api/v1/documents/:id/reembed` | Re-embed with different model |

### 4.5 Dataset API

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/datasets` | Create dataset |
| `GET` | `/api/v1/datasets` | List in workspace |
| `GET` | `/api/v1/datasets/:id` | Detail with document list and stats |
| `PUT` | `/api/v1/datasets/:id` | Update metadata |
| `DELETE` | `/api/v1/datasets/:id` | Soft-delete (documents preserved) |
| `POST` | `/api/v1/datasets/:id/documents` | Add document(s) to dataset |
| `DELETE` | `/api/v1/datasets/:id/documents/:docId` | Remove document from dataset |

### 4.6 Chunking Strategy API

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/chunking-strategies` | Create strategy |
| `GET` | `/api/v1/chunking-strategies` | List strategies |
| `GET` | `/api/v1/chunking-strategies/:id` | Detail |
| `PUT` | `/api/v1/chunking-strategies/:id` | Update parameters |
| `DELETE` | `/api/v1/chunking-strategies/:id` | Delete (fails if in use) |
| `POST` | `/api/v1/chunking-strategies/:id/preview` | Dry-run on a document |

---

## 5. Retrieval Engine

### 5.1 Strategies

**Semantic:** pgvector cosine similarity against chunk embeddings.

**Keyword:** Postgres `tsvector` full-text search with `ts_rank_cd` scoring.

**Hybrid:** Execute both, normalize scores, combine via Reciprocal Rank Fusion (RRF):
```
RRF_score = Σ (1 / (k + rank_i))  for each strategy where chunk appears
```
Default k = 60.

**Metadata-Filtered:** Any strategy combined with pre-filters on taxonomy terms, document types, classification levels, date ranges, or specific document inclusion/exclusion.

### 5.2 Query Processing

1. **Taxonomy expansion:** Resolve query terms → add synonyms/child terms.
2. **Query embedding:** Embed expanded query with same model as chunks.
3. **Execute strategy:** Run configured search, apply filters, rank results.

### 5.3 Retrieval API

```
POST /api/v1/retrieval/search
```

```typescript
interface RetrievalRequest {
    query: string;
    dataset_ids: string[];
    strategy: 'semantic' | 'keyword' | 'hybrid' | 'metadata_filtered';
    limit: number;                          // default: 10
    min_relevance_score: number;            // default: 0.3
    metadata_filters?: {
        taxonomy_term_ids?: string[];
        document_types?: string[];
        classification_levels?: string[];
        date_range?: { from?: Date; to?: Date };
        document_ids?: string[];
        exclude_document_ids?: string[];
    };
    taxonomy_expansion?: {
        enabled: boolean;                   // default: true
        include_synonyms: boolean;          // default: true
        include_children: boolean;          // default: false
        max_depth: number;                  // default: 1
    };
    hybrid_config?: {
        semantic_weight: number;            // default: 0.7
        keyword_weight: number;             // default: 0.3
        fusion_method: 'weighted' | 'rrf'; // default: 'rrf'
    };
    include_debug: boolean;                 // default: false
}

interface RetrievalResponse {
    results: {
        chunk_id: string;
        content_text: string;
        relevance_score: number;
        found_by: string[];
        document: { id: string; title: string; filename: string; document_type: string; classification_level: string };
        location: { section_path: string; page_start: number | null; page_end: number | null };
        taxonomy_tags: { id: string; canonical_name: string }[];
    }[];
    debug?: {
        expanded_query: string;
        taxonomy_terms_matched: { id: string; name: string }[];
        strategy_used: string;
        execution_time_ms: number;
        semantic_results_count: number;
        keyword_results_count: number;
    };
}
```

---

## 6. Chat Interface

### 6.1 Data Model

```sql
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL,
    title VARCHAR(500),
    model VARCHAR(100) NOT NULL,
    persona_id VARCHAR(50),
    dataset_ids UUID[] NOT NULL DEFAULT '{}',
    retrieval_strategy VARCHAR(30),
    system_prompt_override TEXT,
    context_summary TEXT,
    message_count INTEGER NOT NULL DEFAULT 0,
    is_archived BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    model_used VARCHAR(100),
    token_count_prompt INTEGER,
    token_count_completion INTEGER,
    retrieval_result_ids UUID[],
    context_assembly_id UUID,
    processing_time_ms INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE chat_pinned_facts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    pinned_by UUID REFERENCES users(id) NOT NULL,
    source_message_id UUID REFERENCES chat_messages(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE context_assemblies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE NOT NULL,
    message_id UUID REFERENCES chat_messages(id) ON DELETE CASCADE,
    system_prompt TEXT NOT NULL,
    retrieved_chunks JSONB NOT NULL,
    conversation_history JSONB NOT NULL,
    pinned_facts JSONB NOT NULL DEFAULT '[]',
    user_query TEXT NOT NULL,
    total_prompt_tokens INTEGER,
    model VARCHAR(100) NOT NULL,
    temperature REAL NOT NULL,
    retrieval_strategy VARCHAR(30),
    retrieval_debug JSONB,
    response_text TEXT,
    response_tokens INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 6.2 Session Memory Management

1. **Rolling summarization:** After N messages (default 10), generate summary via lightweight model. Store in `chat_sessions.context_summary`.
2. **Token budgeting:** Allocate context window across system prompt (fixed), retrieved chunks (40-60%), conversation history (20-30%), and generation headroom.
3. **Pinned facts:** Users pin important facts; always included regardless of summarization.

### 6.3 Chat API

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/chat/sessions` | Create session |
| `GET` | `/api/v1/chat/sessions` | List sessions |
| `GET` | `/api/v1/chat/sessions/:id` | Get with messages |
| `PUT` | `/api/v1/chat/sessions/:id` | Update settings |
| `DELETE` | `/api/v1/chat/sessions/:id` | Archive |
| `POST` | `/api/v1/chat/sessions/:id/messages` | Send message (triggers full pipeline) |
| `GET` | `/api/v1/chat/sessions/:id/messages/:msgId/context` | Full context assembly (audit) |
| `POST` | `/api/v1/chat/sessions/:id/pin` | Pin fact |
| `DELETE` | `/api/v1/chat/sessions/:id/pin/:pinId` | Unpin |

### 6.4 Chat UI Components

**Chat Panel (Center):** Message thread, markdown rendering, clickable citation chips that expand to source chunk preview with document link.

**Session Config (Top Bar / Drawer):** Model selector, dataset selector, retrieval strategy, persona, temperature, debug toggle.

**Context Inspector (Right Drawer):** Retrieved chunks with scores, taxonomy expansion details, token budget visualization, raw assembled prompt, timing breakdown.

**Session Sidebar (Left):** Session list, search, title editing, pinned facts panel.

---

## 7. Taxonomy Engine

### 7.1 Data Model

```sql
CREATE TABLE taxonomy_domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    workspace_id UUID REFERENCES workspaces(id),
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE taxonomy_terms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain_id UUID REFERENCES taxonomy_domains(id) ON DELETE CASCADE NOT NULL,
    parent_id UUID REFERENCES taxonomy_terms(id) ON DELETE CASCADE,
    canonical_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    depth INTEGER NOT NULL DEFAULT 0,
    is_leaf BOOLEAN NOT NULL DEFAULT true,
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'deprecated', 'proposed')),
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (domain_id, slug),
    UNIQUE (domain_id, parent_id, canonical_name)
);

CREATE TABLE taxonomy_synonyms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    term_id UUID REFERENCES taxonomy_terms(id) ON DELETE CASCADE NOT NULL,
    synonym VARCHAR(255) NOT NULL,
    synonym_type VARCHAR(20) NOT NULL DEFAULT 'synonym'
        CHECK (synonym_type IN ('synonym', 'abbreviation', 'acronym', 'alternate_spelling')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (term_id, synonym)
);

CREATE TABLE taxonomy_term_relations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_term_id UUID REFERENCES taxonomy_terms(id) ON DELETE CASCADE NOT NULL,
    target_term_id UUID REFERENCES taxonomy_terms(id) ON DELETE CASCADE NOT NULL,
    relation_type VARCHAR(30) NOT NULL
        CHECK (relation_type IN ('related_to', 'see_also', 'broader_than', 'narrower_than', 'replaces', 'replaced_by')),
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (source_term_id, target_term_id, relation_type)
);

CREATE TABLE document_tags (
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
    term_id UUID REFERENCES taxonomy_terms(id) ON DELETE CASCADE NOT NULL,
    confidence REAL,
    assigned_by UUID REFERENCES users(id),
    assignment_method VARCHAR(20) NOT NULL DEFAULT 'manual'
        CHECK (assignment_method IN ('manual', 'auto_ingest', 'auto_llm', 'bulk_import')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (document_id, term_id)
);

CREATE TABLE chunk_tags (
    chunk_id UUID REFERENCES chunks(id) ON DELETE CASCADE NOT NULL,
    term_id UUID REFERENCES taxonomy_terms(id) ON DELETE CASCADE NOT NULL,
    confidence REAL,
    assignment_method VARCHAR(20) NOT NULL DEFAULT 'auto_llm'
        CHECK (assignment_method IN ('manual', 'auto_ingest', 'auto_llm', 'inherited')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (chunk_id, term_id)
);

CREATE INDEX idx_taxonomy_terms_parent ON taxonomy_terms(parent_id);
CREATE INDEX idx_taxonomy_terms_domain ON taxonomy_terms(domain_id);
CREATE INDEX idx_taxonomy_synonyms_value ON taxonomy_synonyms(synonym);
CREATE INDEX idx_taxonomy_synonyms_trigram ON taxonomy_synonyms USING GIN (synonym gin_trgm_ops);
```

### 7.2 Term Resolution

Precedence: exact canonical match → exact synonym match → fuzzy match (Levenshtein ≤ 2) → no match. Cached in-memory, TTL 5 minutes.

### 7.3 Taxonomy API

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/taxonomy/domains` | Create domain |
| `GET` | `/api/v1/taxonomy/domains` | List domains |
| `GET` | `/api/v1/taxonomy/domains/:id` | Get with top-level terms |
| `PUT` | `/api/v1/taxonomy/domains/:id` | Update |
| `DELETE` | `/api/v1/taxonomy/domains/:id` | Soft-delete |
| `POST` | `/api/v1/taxonomy/domains/:id/terms` | Create term |
| `GET` | `/api/v1/taxonomy/domains/:id/terms` | Full term tree |
| `GET` | `/api/v1/taxonomy/terms/:id` | Term with synonyms and relations |
| `PUT` | `/api/v1/taxonomy/terms/:id` | Update term |
| `DELETE` | `/api/v1/taxonomy/terms/:id` | Soft-delete |
| `POST` | `/api/v1/taxonomy/terms/:id/synonyms` | Add synonym |
| `DELETE` | `/api/v1/taxonomy/terms/:termId/synonyms/:synId` | Remove synonym |
| `POST` | `/api/v1/taxonomy/terms/:id/relations` | Create relation |
| `GET` | `/api/v1/taxonomy/resolve` | Resolve string to terms |
| `GET` | `/api/v1/taxonomy/search` | Search terms and synonyms |
| `GET` | `/api/v1/taxonomy/terms/:id/expansion` | Get expanded set for retrieval |
| `POST` | `/api/v1/taxonomy/domains/:id/import` | Import from CSV/JSON |
| `GET` | `/api/v1/taxonomy/domains/:id/export` | Export domain |
| `GET` | `/api/v1/taxonomy/proposed` | Proposed terms queue |
| `POST` | `/api/v1/taxonomy/proposed/:id/approve` | Approve |
| `POST` | `/api/v1/taxonomy/proposed/:id/reject` | Reject |
| `POST` | `/api/v1/taxonomy/proposed/:id/merge` | Merge as synonym |

### 7.4 Prebuilt Templates

- NIST 800-53 Rev 5 (20 families, ~1,100 controls)
- CMMC 2.0 (3 levels, 14 domains, 110 practices)
- FedRAMP baselines (Low/Moderate/High)
- CUI category markings
- Military document types (OPORD, FRAGORD, WARNORD, SOP, TM, AR, etc.)

### 7.5 Taxonomy UI

**Manager (Admin):** Tree view, drag-and-drop, inline edit, synonym panel, import/export, proposed queue, usage stats.

**Picker (Reusable):** Typeahead, hierarchical dropdown, multi-select chips. Used across document upload, chunk detail, wiki editor, retrieval config.

---

## 8. Dataset Wiki

### 8.1 Data Model

```sql
CREATE TABLE wikis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    workspace_id UUID REFERENCES workspaces(id),
    generation_status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (generation_status IN ('pending', 'generating', 'ready', 'error', 'stale')),
    last_generated_at TIMESTAMPTZ,
    generation_config JSONB NOT NULL DEFAULT '{}',
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE wiki_datasets (
    wiki_id UUID REFERENCES wikis(id) ON DELETE CASCADE NOT NULL,
    dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (wiki_id, dataset_id)
);

CREATE TABLE wiki_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wiki_id UUID REFERENCES wikis(id) ON DELETE CASCADE NOT NULL,
    parent_page_id UUID REFERENCES wiki_pages(id) ON DELETE SET NULL,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL,
    page_type VARCHAR(30) NOT NULL DEFAULT 'topic'
        CHECK (page_type IN ('topic', 'document_summary', 'index', 'custom')),
    content_markdown TEXT NOT NULL,
    content_status VARCHAR(20) NOT NULL DEFAULT 'draft'
        CHECK (content_status IN ('draft', 'review', 'published', 'archived')),
    generated_by_model VARCHAR(100),
    generation_prompt TEXT,
    sort_order INTEGER DEFAULT 0,
    created_by UUID REFERENCES users(id),
    published_by UUID REFERENCES users(id),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (wiki_id, slug)
);

CREATE TABLE wiki_page_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES wiki_pages(id) ON DELETE CASCADE NOT NULL,
    chunk_id UUID REFERENCES chunks(id) ON DELETE CASCADE NOT NULL,
    relevance_score REAL,
    usage_type VARCHAR(20) NOT NULL DEFAULT 'supporting'
        CHECK (usage_type IN ('primary', 'supporting', 'referenced', 'cross_ref')),
    source_section_label VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE wiki_cross_references (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_page_id UUID REFERENCES wiki_pages(id) ON DELETE CASCADE NOT NULL,
    target_page_id UUID REFERENCES wiki_pages(id) ON DELETE CASCADE NOT NULL,
    reference_type VARCHAR(30) NOT NULL
        CHECK (reference_type IN ('related', 'depends_on', 'supersedes', 'implements', 'references')),
    context TEXT,
    detected_by VARCHAR(20) NOT NULL DEFAULT 'auto',
    confidence REAL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (source_page_id, target_page_id, reference_type)
);

CREATE TABLE wiki_page_revisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES wiki_pages(id) ON DELETE CASCADE NOT NULL,
    revision_number INTEGER NOT NULL,
    content_markdown TEXT NOT NULL,
    edit_summary VARCHAR(500),
    edited_by UUID REFERENCES users(id) NOT NULL,
    edit_type VARCHAR(20) NOT NULL DEFAULT 'manual'
        CHECK (edit_type IN ('manual', 'auto_generated', 'auto_refreshed', 'bulk_update')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (page_id, revision_number)
);

CREATE TABLE wiki_page_tags (
    page_id UUID REFERENCES wiki_pages(id) ON DELETE CASCADE NOT NULL,
    term_id UUID REFERENCES taxonomy_terms(id) ON DELETE CASCADE NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (page_id, term_id)
);

CREATE TABLE wiki_coverage_expectations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wiki_id UUID REFERENCES wikis(id) ON DELETE CASCADE NOT NULL,
    term_id UUID REFERENCES taxonomy_terms(id) ON DELETE CASCADE NOT NULL,
    is_required BOOLEAN NOT NULL DEFAULT false,
    expected_depth VARCHAR(20) NOT NULL DEFAULT 'summary'
        CHECK (expected_depth IN ('mention', 'summary', 'detailed')),
    actual_page_id UUID REFERENCES wiki_pages(id) ON DELETE SET NULL,
    coverage_status VARCHAR(20) NOT NULL DEFAULT 'missing'
        CHECK (coverage_status IN ('missing', 'partial', 'covered', 'excess')),
    last_assessed_at TIMESTAMPTZ,
    UNIQUE (wiki_id, term_id)
);

CREATE INDEX idx_wiki_pages_wiki ON wiki_pages(wiki_id);
CREATE INDEX idx_wiki_pages_fts ON wiki_pages USING GIN (to_tsvector('english', content_markdown));
CREATE INDEX idx_wiki_page_sources_page ON wiki_page_sources(page_id);
CREATE INDEX idx_wiki_page_sources_chunk ON wiki_page_sources(chunk_id);
```

### 8.2 Generation Pipeline

**Phase 1 — Topic Discovery:** Cluster chunks by embedding similarity. Label clusters with dominant taxonomy terms or LLM-generated labels. Merge similar clusters.

**Phase 2 — Page Generation:** For each cluster, select top chunks, generate summarized page via LLM with mandatory inline citations. Parse citations into `wiki_page_sources`.

**Phase 3 — Document Summaries:** Generate structured summary page per source document.

**Phase 4 — Cross-References:** Pairwise page embedding similarity + regex citation detection (MIL-STD, NIST SP, FAR/DFARS, AR, TM patterns).

**Phase 5 — Indexes:** Root TOC, domain indexes, document index, coverage dashboard page.

**Staleness:** Monitor for dataset changes. Flag affected pages. Queue targeted refresh. Preserve manual edits.

**Configuration:**
```typescript
interface WikiGenerationConfig {
    topic_discovery: {
        clustering_distance_threshold: number;  // default: 0.35
        merge_similarity_threshold: number;     // default: 0.75
        min_cluster_size: number;               // default: 3
        max_topics: number;                     // default: 200
        model_for_labeling: string;             // default: "gpt-4o-mini"
    };
    summarization: {
        model: string;
        max_chunks_per_summary: number;         // default: 20
        summary_target_length: string;          // default: "500-1000 words"
        include_source_citations: boolean;      // default: true
    };
    cross_references: {
        similarity_threshold: number;           // default: 0.7
        max_refs_per_page: number;              // default: 10
        detect_regulatory_refs: boolean;        // default: true
    };
    publishing: {
        auto_publish: boolean;                  // default: false
        require_review: boolean;                // default: true
    };
}
```

### 8.3 Wiki API

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/wikis` | Create wiki |
| `GET` | `/api/v1/wikis` | List wikis |
| `GET` | `/api/v1/wikis/:id` | Detail and status |
| `PUT` | `/api/v1/wikis/:id` | Update config |
| `DELETE` | `/api/v1/wikis/:id` | Soft-delete |
| `POST` | `/api/v1/wikis/:id/generate` | Full generation |
| `POST` | `/api/v1/wikis/:id/refresh` | Incremental refresh |
| `GET` | `/api/v1/wikis/:id/status` | Generation progress |
| `GET` | `/api/v1/wikis/:wikiId/pages` | List pages |
| `GET` | `/api/v1/wikis/:wikiId/pages/:slug` | Page with sources/cross-refs |
| `PUT` | `/api/v1/wikis/pages/:id` | Edit page (creates revision) |
| `POST` | `/api/v1/wikis/pages/:id/publish` | Publish |
| `GET` | `/api/v1/wikis/pages/:id/revisions` | History |
| `POST` | `/api/v1/wikis/pages/:id/revisions/:revId/restore` | Restore |
| `GET` | `/api/v1/wikis/pages/:id/sources` | Source chunks |
| `GET` | `/api/v1/wikis/pages/:id/cross-references` | Cross-refs |
| `POST` | `/api/v1/wikis/:wikiId/pages` | Create custom page |
| `GET` | `/api/v1/wikis/:wikiId/index` | TOC tree |
| `GET` | `/api/v1/wikis/:wikiId/search` | Full-text search |
| `GET` | `/api/v1/wikis/:wikiId/graph` | Cross-ref graph data |
| `GET` | `/api/v1/wikis/:wikiId/coverage` | Coverage report |
| `POST` | `/api/v1/wikis/:wikiId/coverage/expectations` | Define expectations |
| `POST` | `/api/v1/wikis/:wikiId/coverage/assess` | Run assessment |

### 8.4 Wiki UI

**Browser (3-panel):** Left TOC tree → Center page renderer with citation chips → Right sources/tags/cross-refs/revisions panel.

**Editor:** Split-pane markdown with chunk insertion tool, taxonomy picker, cross-ref creator, edit summary.

**Coverage Dashboard:** Taxonomy terms × status matrix, color-coded, clickable, CSV export.

**Knowledge Graph:** D3 force-directed, nodes = pages, edges = cross-refs, filterable.

**Generation Monitor:** Phase progress, real-time log, ETA, cancel.

### 8.5 Wiki ↔ Retrieval Integration

Wiki pages can be embedded and included in retrieval. Chat responses citing a chunk can link to the relevant wiki page.

---

## 9. Audit & Observability

### 9.1 Data Model

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id UUID REFERENCES users(id),
    workspace_id UUID REFERENCES workspaces(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    details JSONB NOT NULL DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    session_id UUID
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
```

### 9.2 Audited Actions

Authentication, chat messages/responses, document upload/parse/chunk/embed/delete, dataset CRUD, retrieval execution, context assembly, wiki generation/edit/publish, taxonomy CRUD/approve/reject, tag assignments.

### 9.3 Provenance Chain

Reconstruct full decision pipeline for any AI output:

```
User Query → Retrieval Log (query, expansion, strategy, results)
           → Context Assembly (prompt, chunks, history)
           → Model Invocation (model, params, timing)
           → Response (text, tokens)
           → Source Chain (citation → chunk → section → document → file)
```

### 9.4 Audit API

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/audit/logs` | Query (filter by user, action, entity, date, workspace) |
| `GET` | `/api/v1/audit/logs/:id` | Detail |
| `GET` | `/api/v1/audit/entity/:type/:id` | All logs for an entity |
| `GET` | `/api/v1/audit/export` | Export CSV/JSON |
| `GET` | `/api/v1/audit/chat/:sessionId/provenance` | Full provenance chain |

---

## 10. Security & Access Control

### 10.1 Workspace Roles → Permissions

| Role | Permissions |
|---|---|
| `viewer` | Read published wiki, read workspace content |
| `member` | + upload docs, read drafts, use chat |
| `editor` | + edit wiki, manage taxonomy, manage datasets |
| `admin` | All permissions including workspace config, audit, user management |

### 10.2 Classification Inheritance

Documents inherit workspace floor. Chunks inherit document. Wiki pages inherit highest source chunk classification. Cannot override downward.

### 10.3 Data Isolation

All queries scoped to workspace. pgvector searches pre-filtered to dataset scope.

---

## 11. Background Jobs

| Queue | Purpose | Concurrency |
|---|---|---|
| `document-parsing` | Parse uploads | 5 |
| `document-chunking` | Chunk documents | 5 |
| `document-embedding` | Generate embeddings | 3 |
| `auto-tagging` | Taxonomy tagging | 5 |
| `wiki-generation` | Full wiki generation | 1 per wiki |
| `wiki-refresh` | Incremental refresh | 3 |
| `page-generation` | Individual pages | 5 |
| `cross-ref-detection` | Cross-reference scan | 3 |
| `context-summarization` | Chat history summarization | 5 |
| `coverage-assessment` | Coverage analysis | 2 |

LLM jobs: exponential backoff, 3 retries. Dead letter queue for persistent failures. Token budgets enforced per job.

---

## 12. Frontend Structure

### 12.1 Routes

| View | Route | Description |
|---|---|---|
| Chat | `/chat` `/chat/:sessionId` | Conversational interface |
| Wiki | `/wiki/:wikiId` `/wiki/:wikiId/:slug` | Knowledge base |
| Wiki Editor | `/wiki/:wikiId/:slug/edit` | Page editing |
| Documents | `/documents` `/documents/:id` | Upload, list, inspect |
| Datasets | `/datasets` `/datasets/:id` | Dataset management |
| Taxonomy | `/taxonomy` `/taxonomy/:domainId` | Term management |
| Coverage | `/wiki/:wikiId/coverage` | Coverage dashboard |
| Graph | `/wiki/:wikiId/graph` | Knowledge graph |
| Audit | `/admin/audit` | Log viewer |
| Settings | `/admin/settings` | Workspace config |

### 12.2 Shared Components

`TaxonomyPicker`, `SourceCitationChip`, `ChunkPreview`, `ModelSelector`, `DatasetSelector`, `MarkdownRenderer`, `RetrievalDebugPanel`, `ProcessingStatusBadge`

---

## 13. Docker Compose

```yaml
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    depends_on: [backend]

  backend:
    build: ./backend
    ports: ["3001:3001"]
    depends_on: [postgres, redis]
    environment:
      - DATABASE_URL=postgresql://app:password@postgres:5432/asksage_enhanced
      - REDIS_URL=redis://redis:6379
      - ASKSAGE_BASE_URL=https://api.asksage.ai
      - ENCRYPTION_KEY=${ENCRYPTION_KEY}

  postgres:
    image: pgvector/pgvector:pg16
    ports: ["5432:5432"]
    environment:
      - POSTGRES_DB=asksage_enhanced
      - POSTGRES_USER=app
      - POSTGRES_PASSWORD=password
    volumes: [pgdata:/var/lib/postgresql/data]

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

volumes:
  pgdata:
```

---

## 14. Implementation Phases

### Phase 1: Foundation (Week 1-3)
NestJS scaffolding, Postgres schema, Ask Sage proxy (auth, models, personas), document upload/parse/chunk/embed pipeline, basic React shell with document management views.

**Exit:** Upload a document, watch it process, inspect chunks and sections.

### Phase 2: Retrieval & Chat (Week 4-5)
Retrieval engine (semantic/keyword/hybrid), context assembly, chat sessions, enhanced query flow, chat UI with citations, context inspector.

**Exit:** Chat grounded in local documents with visible provenance.

### Phase 3: Taxonomy (Week 6-7)
Taxonomy CRUD, manager UI, prebuilt templates, picker component, query expansion, auto-tagging, proposed terms queue.

**Exit:** Import NIST 800-53, auto-tag documents, expand queries via synonyms.

### Phase 4: Wiki Core (Week 8-10)
Wiki generation pipeline, topic discovery, page generation, document summaries, browser UI, editing with revisions, generation monitor.

**Exit:** Generate browsable wiki from dataset with source citations.

### Phase 5: Cross-References & Coverage (Week 11-12)
Cross-ref detection, knowledge graph, search, indexes, coverage system, wiki-enhanced retrieval, staleness detection.

**Exit:** Navigate cross-references, see coverage gaps, refresh stale content.

### Phase 6: Audit & Polish (Week 13-14)
Audit logging, provenance reconstruction, log viewer/export, classification enforcement, permissions, caching, error handling, export (wiki→PDF, taxonomy→CSV).

**Exit:** Full provenance chain for any output. All operations audited.

---

## 15. Performance Targets

| Metric | Target |
|---|---|
| Document upload to ready (10p PDF) | < 60s |
| Document upload to ready (100p PDF) | < 5 min |
| Hybrid retrieval (100K chunks) | < 500ms |
| Chat to first response | < 3s |
| Wiki page load | < 500ms |
| Wiki search | < 200ms |
| Wiki generation (1K chunks) | < 10 min |
| Taxonomy resolution | < 50ms |
| Coverage assessment (1K expectations) | < 30s |

---

## 16. Open Questions

1. **Streaming:** Does Ask Sage's OpenAI-compatible endpoint support SSE streaming? Critical for chat UX.
2. **Embedding provider:** Proxy through Ask Sage or call directly? Direct is faster/cheaper for prototype.
3. **Multi-language:** Multilingual taxonomy synonyms? Multi-language wiki generation?
4. **Collaborative editing:** Single-user with revisions, or CRDT-based real-time collab?
5. **Cross-dataset access control:** When a wiki spans datasets with different access policies, restrict by most conservative policy?
6. **Offline/DDIL mode:** Static export for air-gapped environments?
7. **Ask Sage feature stubs:** Include Workbook/Code Canvas/Prose Canvas as pass-through stubs for demo completeness?
8. **Re-embedding migration:** Background re-embed when better models arrive? Side-by-side vector stores?

---

## Appendix A: Ask Sage API Usage Map

### Proxied
`POST /server/get-models`, `POST /server/get-personas`, `POST /server/get-plugins`, `POST /server/query-plugin`, `POST /server/execute-agent`, `POST /server/get-text-to-speech`, `GET /server/count-monthly-tokens`, `POST /user/get-token-with-api-key`

### Used for Inference (backend only)
`POST /server/query`, `POST /server/openai/v1/chat/completions`

### Replaced
`POST /server/train`, `POST /server/train-with-file`, `POST /server/get-datasets`, `POST /server/file`, `POST /user/add-dataset`, `POST /user/delete-datasets`, `POST /user/get-chats`, `POST /user/get-chat-session`

## Appendix B: LLM Prompt Templates

### Wiki Topic Labeling
```
Given the following text passages from government/defense documents, generate a concise
topic label (3-8 words). Do not use generic labels. Be specific.

Passages:
{passages}

Respond with only the label.
```

### Wiki Page Generation
```
Generate a knowledge base article for a government technical wiki.

TOPIC: {topic_label}
TAXONOMY: {taxonomy_path}
SOURCE MATERIAL: {formatted_chunks}

Requirements: Use ONLY sources provided. Cite every claim: [Source: {doc}, §{section}].
Note contradictions. Add "Coverage Gaps" section if insufficient. End with Sources table.
Target: {target_length}. Professional tone.
```

### Cross-Reference Detection
```
Analyze two articles for relationships. Respond JSON only:
{"is_related": bool, "relationship_type": "related|depends_on|supersedes|implements|references|none", "confidence": 0.0-1.0, "explanation": "..."}

ARTICLE A: "{title_a}" {summary_a}
ARTICLE B: "{title_b}" {summary_b}
```

### Auto-Tagging
```
Extract 3-5 important topics from this passage. Return topic names only, one per line.
Be specific — prefer "FedRAMP continuous monitoring" over "compliance."

{chunk_text}
```

### Chat Context Summarization
```
Summarize preserving: key decisions, facts established, open questions, user constraints.
150-300 words.

{messages}
```

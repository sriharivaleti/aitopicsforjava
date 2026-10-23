/**
 * AI for Java Developers - Interview Mastery Dataset
 * 0 to 15+ Years Experience (Junior, Mid, Senior, Lead, Principal Architect)
 */

const INTERVIEW_TIERS = [
  {
    tierId: "junior",
    name: "Junior Developer (0 - 3 YOE)",
    badge: "Foundations & Basics",
    badgeColor: "blue",
    description: "Core terminology, tokens, basic Spring AI / OpenAI calls, and simple prompt handling.",
    questions: [
      {
        q: "What is a 'token' in Generative AI, and how does it relate to Java Strings?",
        a: "A token is a subword numerical unit produced by Byte-Pair Encoding (BPE), not a character. On average, 1 token is approximately 4 characters or 0.75 English words. In Java, a String is an array of UTF-16 chars or UTF-8 bytes (`byte[]` in Java 9+ compact strings). An LLM never sees Java characters directly; it converts the string into an array of integer token IDs (e.g., `int[] tokenIds`). Exceeding token limits causes immediate context truncation.",
        insight: "Junior tip: Mention that 1,000 tokens ≈ 750 words. Token length directly determines cloud billing ($ per million tokens) and latency."
      },
      {
        q: "Why can't we use traditional String methods like contains() or regex for semantic search in Java?",
        a: "String matching and regex are strictly syntactic—they check for exact character matches. If a user queries 'cancel subscription' and your documentation says 'terminate recurring billing', regex returns 0 matches despite identical semantic intent. Vector embeddings solve this by projecting text into geometrical space where synonyms have near-zero angular distance.",
        insight: "Relate this to `Comparable` vs semantic distance: Java's `compareTo()` sorts lexically, while vector cosine similarity measures conceptual proximity."
      },
      {
        q: "What is Temperature in LLM sampling, and what value should you set for Java code generation?",
        a: "Temperature (ranging from 0.0 to 2.0) controls the randomness of the model's token selection. At Temperature = 0.0, the model acts greedily and deterministically, always picking the token with the highest probability. For code generation, JSON extraction, or mathematical calculations, you should set Temperature to 0.0 (or ≤ 0.2) to prevent syntax errors and hallucinations. For creative writing, 0.7 to 1.0 is standard.",
        insight: "Demonstrate that while temperature 0.0 is deterministic, hardware concurrency and FP non-associativity can still cause tiny variations unless you also fix `seed`."
      },
      {
        q: "How does Spring AI abstract different LLM providers (OpenAI, Anthropic, Ollama)?",
        a: "Spring AI uses the `ChatModel` interface (analogous to Spring's `JdbcTemplate` or `RestTemplate`). Calling `chatModel.call(prompt)` returns a `ChatResponse` regardless of whether the underlying implementation is `OpenAiChatModel`, `AnthropicChatModel`, or `OllamaChatModel`. This decouples business logic from vendor-specific HTTP APIs and payloads.",
        insight: "Highlight the Strategy Pattern in Spring: swapping `spring-ai-openai-spring-boot-starter` for `spring-ai-ollama-spring-boot-starter` requires zero changes to application code."
      },
      {
        q: "What is a Hallucination, and what is the primary architecture used to prevent it?",
        a: "A hallucination occurs when an LLM produces an answer that sounds fluent and authoritative but is factually incorrect or invents non-existent methods/classes. Because LLMs are probabilistic next-token predictors rather than deterministic databases, they will fill knowledge gaps with plausible falsehoods. The primary enterprise architecture to prevent hallucinations is RAG (Retrieval-Augmented Generation), which feeds verified source facts into the prompt before asking the model to answer.",
        insight: "Emphasize: 'Grounding' means forcing the LLM to cite evidence from supplied context documents."
      }
    ]
  },
  {
    tierId: "mid",
    name: "Mid-Level Engineer (3 - 7 YOE)",
    badge: "RAG & Vector Pipelines",
    badgeColor: "amber",
    description: "RAG implementation, Vector search tuning, Structured output handling, and Chunking trade-offs.",
    questions: [
      {
        q: "Explain the Naive RAG pipeline end-to-end and where it fails in real-world Java applications.",
        a: "Naive RAG has two phases: Ingestion (Document -> Chunking -> Embedding -> Vector DB) and Retrieval (User Query -> Embedding -> Vector Search Top-K -> Injected into Prompt -> LLM Generation). It fails in production due to: 1) Chunk boundary cutoff (sentences sliced in half), 2) Out-of-domain embeddings failing on specific technical acronyms, 3) The 'Lost in the Middle' phenomenon where LLMs ignore context in the middle of long prompts, and 4) Lack of metadata filtering (retrieving data from another tenant or outdated version).",
        insight: "Explain how Advanced RAG fixes this using Sentence-Window chunking, Cross-Encoder rerankers, and Tenant metadata filters."
      },
      {
        q: "How do you guarantee that an LLM outputs valid JSON that maps cleanly into a Java 21 Record?",
        a: "Use Spring AI's `BeanOutputConverter<T>` or OpenAI's native Structured Outputs (`response_format: json_schema` with `strict: true`). The framework reflects over your Java Record, creates a JSON Schema, and sends it to the model. In strict mode, the LLM's token decoding grammar is constrained so that it is mathematically impossible for the model to emit tokens that violate the JSON schema. You then deserialize using Jackson or Spring AI's `entity(MyRecord.class)`.",
        insight: "Mention why regex parsing of LLM outputs is an anti-pattern that breaks in production."
      },
      {
        q: "What is the difference between Cosine Similarity, Dot Product, and Euclidean Distance?",
        a: "Cosine Similarity measures the angle between two vectors: `(A · B) / (||A|| ||B||)`. It ranges from -1 to 1 and is invariant to vector magnitude (length). Dot Product is `A · B`; if vectors are normalized to unit length ($L2=1.0$), Dot Product is mathematically identical to Cosine Similarity but executes 3x faster because division by norms is eliminated. Euclidean Distance measures straight-line geometrical distance; smaller distance means higher similarity. Most text embedding models (OpenAI, HuggingFace) produce normalized vectors, so Dot Product or Cosine Distance are standard.",
        insight: "Relate this to SIMD: In Java 21 Vector API, normalized dot products can be unrolled across 512-bit registers."
      },
      {
        q: "What are the trade-offs between chunk sizes of 100 tokens vs 1000 tokens in RAG?",
        a: "Small chunks (100 tokens) yield high retrieval specificity (fine-grained semantic matches) and minimize irrelevant noise, but they risk losing surrounding context and breaking sentences across chunks. Large chunks (1,000 tokens) preserve complete paragraphs and broader arguments, but dilute the vector embedding (averaging out nuances) and consume much more context window budget, increasing LLM cost and latency. The industry standard sweet spot is 400-800 tokens with 10-15% overlap.",
        insight: "Mention the 'Parent-Child Document Retriever' pattern: embed 100-token chunks for fast lookup, but retrieve the 1,000-token parent document to pass to the LLM."
      },
      {
        q: "How do you test LLM integrations reliably in a CI/CD pipeline using Java?",
        a: "1) Unit testing: Mock `ChatModel` using Mockito to verify prompt construction and JSON deserialization logic without network calls. 2) Integration testing: Use Testcontainers with local Ollama (`ollama/ollama`) or WireMock to test against a containerized model with fixed temperature (0.0) and fixed seed. 3) LLM-as-a-Judge: Run evaluation assertions on generated answers checking for faithfulness, ground truth similarity, and latency.",
        insight: "Never hit paid OpenAI APIs in automated PR builds; use Testcontainers + Ollama or mock fixtures."
      }
    ]
  },
  {
    tierId: "senior",
    name: "Senior Engineer (7 - 12 YOE)",
    badge: "Tool Calling & Agents",
    badgeColor: "purple",
    description: "Enterprise RAG at scale, Hybrid search, Semantic cache design, Tool calling failure recovery, and PII redaction.",
    questions: [
      {
        q: "Explain how Tool Calling works under the hood in Spring AI. Does the LLM execute the Java method?",
        a: "No! The LLM NEVER executes Java code. The process is: 1) Spring AI reflects over `@Tool` methods to generate a JSON Schema description. 2) Spring AI passes this schema in the `tools` array to the LLM. 3) The LLM decides it needs data and returns a response with `finish_reason: tool_calls` containing the function name and JSON arguments. 4) Spring AI catches this response, matches the function name in its `ApplicationContext`, invokes the Java method, and serializes the return value into a `ToolResponseMessage`. 5) Spring AI sends this result back to the LLM, which finally synthesizes the natural language answer.",
        insight: "Key point: Tool calling is a multi-round-trip orchestration protocol managed by the client framework."
      },
      {
        q: "Compare HNSW and IVFFlat index types in PostgreSQL pgvector for 10 million vectors.",
        a: "HNSW (Hierarchical Navigable Small World) builds a multi-layer graph. It provides very low query latency ($O(\\log N)$), high recall (>95%), and performs well even without training data, but it consumes more RAM and has slower write/insert times. IVFFlat (Inverted File Flat) clusters vectors into Voronoi cells. It builds faster and requires far less memory, but requires a dataset warmup/training step and suffers lower recall if the dataset grows dynamically without re-indexing. For 10M enterprise vectors with strict SLA, HNSW is preferred, provided sufficient RAM is allocated for the working set.",
        insight: "Senior architects will mention tuning `m` (number of bi-directional links, default 16) and `ef_construction` (search depth during index build, default 64)."
      },
      {
        q: "How would you design a Semantic Cache in Java using Redis Vector Store to reduce LLM costs?",
        a: "When a query arrives: 1) Generate its embedding float vector $V_q$. 2) Query Redis Vector Store using cosine distance. 3) If the nearest neighbor has a cosine similarity $\\ge 0.96$ (threshold determined empirically), return the cached answer immediately (latency < 5ms, cost $0.00). 4) If no match, call the LLM, stream the answer to the user, and asynchronously persist $(V_q, Answer, TTL)$ into Redis. Add an eviction policy (TTL 24h) and a bypass flag for time-sensitive queries.",
        insight: "Quantify the business impact: In enterprise support portals with high repetitive query density, semantic caching routinely saves 40-60% of total API token spend."
      },
      {
        q: "How do you protect an enterprise Java AI application against Prompt Injection (OWASP LLM01)?",
        a: "1) Defensive Prompt Structuring: Wrap user inputs in explicit boundary delimiters (e.g. `<user_query>{input}</user_query>`) and instruct the system prompt to treat content within delimiters strictly as data, never instructions. 2) Input Sanitization: Strip XML tags from user input to prevent tag breakout. 3) Dual LLM Guardrails: Pass incoming prompts through a lightweight classification model (e.g., Llama-Guard or Azure AI Content Safety) before invoking the main model. 4) Output Validation: Use strict JSON Schema output converters so that even if an injection attempts to output system instructions, the deserializer rejects it.",
        insight: "Emphasize that prompt injection is fundamentally similar to SQL Injection: mixing untrusted user data with control instructions."
      },
      {
        q: "Describe the ReAct (Reason + Act) loop pattern in an autonomous Java agent. How do you prevent infinite loops?",
        a: "The ReAct loop follows three steps in a cycle: 1) Thought (LLM analyzes current progress and decides the next step), 2) Action (LLM selects a tool and passes arguments), 3) Observation (client executes the tool and injects the output back into the prompt). The loop terminates when the model outputs 'Final Answer'. To prevent infinite loops: 1) Hard iteration cap (e.g. `max_iterations = 5`), 2) Timeout circuit breaker (abort after 30 seconds), 3) Action duplicate detector (abort if the agent invokes the exact same tool with identical arguments twice in a row), and 4) Token budget accumulator.",
        insight: "Mention that real-world agents must have human-in-the-loop gates before executing any state-mutating tool (POST/PUT/DELETE)."
      }
    ]
  },
  {
    tierId: "architect",
    name: "Lead / Principal Architect (12 - 15+ YOE)",
    badge: "Enterprise System Design",
    badgeColor: "rose",
    description: "AI Gateway architecture, High-throughput streaming, FinOps, Fine-tuning vs RAG trade-offs, and Zero-Trust AI governance.",
    questions: [
      {
        q: "Design a High-Throughput Enterprise GenAI Gateway serving 5,000 requests/sec across 50 microservices.",
        a: "Architecture Components: 1) Ingress: Spring Cloud Gateway / Envoy with Virtual Threads handling non-blocking HTTP/2 & HTTP/3. 2) Security Layer: OAuth2/OIDC token verification, tenant quota enforcement, and PII anonymization via regex + Presidio. 3) Semantic Caching: Clustered Redis Enterprise Vector Store with sub-5ms lookup, caching frequent questions. 4) Rate Limiter: Bucket4j / Redis Token Bucket preventing 429 errors from upstream LLM providers. 5) Dynamic Model Router: Multi-provider load balancer (OpenAI, Azure, Anthropic, Bedrock, On-Prem Ollama) with Resilience4j circuit breakers and automatic failover. 6) Egress Streaming: WebFlux Server-Sent Events (SSE) streaming back to clients. 7) FinOps & Telemetry: OpenTelemetry spans exported to Langfuse/Grafana, recording token consumption into a Postgres ledger for department chargebacks.",
        insight: "Principal Architect perspective: Emphasize SLA isolation, cost controls, multi-region failover, and legal compliance (GDPR/HIPAA)."
      },
      {
        q: "When should an enterprise Fine-Tune an LLM versus using RAG? Provide a decision framework.",
        a: "RAG is for KNOWLEDGE (Dynamic facts, corporate wikis, customer accounts, recent documents). Fine-Tuning is for FORM, STYLE, and DOMAIN VOCABULARY (Medical terminology, specialized code formatting, strict JSON structures, tone). Decision Framework: 1) If data changes frequently (daily/weekly) -> RAG. 2) If hallucination must be zero and responses require citations -> RAG. 3) If you need to teach a 7B model a proprietary dialect or internal DSL to match GPT-4 quality at 1/10th the cost -> LoRA / QLoRA Fine-Tuning. 4) Optimal Hybrid: Fine-tune a small model to follow internal schemas, then use RAG at runtime to feed live data.",
        insight: "Fine-tuning is NOT a replacement for RAG! Fine-tuning does not inject reliable new facts; it only adjusts weights and probabilities."
      },
      {
        q: "How do you optimize Time-To-First-Token (TTFT) in enterprise RAG systems?",
        a: "1) Prompt Caching: Leverage provider prompt caching (OpenAI / Anthropic KV cache) by placing static instructions and system documents in the first 1024+ tokens. Cached prefixes achieve 80% lower TTFT. 2) Parallelism: Execute Vector search, relational DB lookups, and user preference loading concurrently using Java 21 Virtual Threads (`Executors.newVirtualThreadPerTaskExecutor()`). 3) Speculative Decoding / Model Cascading: Use a smaller, faster model (e.g. GPT-4o-mini) to rewrite queries and rank candidates. 4) Reactive Streaming: Stream tokens via SSE so the user sees the first token in ~400ms rather than waiting 4 seconds for full completion. 5) Context Pruning: Keep context chunks under 1,500 tokens total.",
        insight: "Perceived latency is dominated by TTFT. Streaming tokens makes a 3-second generation feel instantaneous to human users."
      },
      {
        q: "How do you evaluate RAG quality at scale? Explain Ragas / TruLens metrics (Context Recall, Context Precision, Faithfulness, Answer Relevance).",
        a: "Evaluating RAG cannot rely on human reviews at scale. We use automated LLM-as-a-Judge with 4 standard metrics: 1) Context Recall: Did the vector search retrieve ALL facts necessary to answer the ground truth? 2) Context Precision: Were the retrieved chunks densely relevant, or did they contain high noise? (Measures chunker and reranker quality). 3) Faithfulness (Groundedness): Can every claim in the generated answer be directly inferred from the retrieved context? (Measures hallucination rate). 4) Answer Relevance: Does the answer directly address the user's question without digression? In Java, we run these assertions in automated nightly CI/CD regression suites using synthetic test datasets.",
        insight: "If Faithfulness is low, fix prompt guardrails or temperature. If Context Precision is low, fix chunking and add a cross-encoder reranker."
      },
      {
        q: "What is your architecture for Zero-Trust Enterprise AI Governance and Data Loss Prevention (DLP)?",
        a: "1) Air-Gapped / VPC Peering: Deploy open-weight models (Llama 3.3, DeepSeek) inside internal Kubernetes clusters with zero egress to the public internet for sensitive data. 2) In-Flight PII Redaction: Java interceptor masks SSNs, credit cards, and customer names before payloads leave the network boundary, maintaining a local decryption map to restore names upon response. 3) RBAC at Chunk Level: Embed tenant IDs and role security tags (e.g. `allowed_roles: ['FINANCE_DIRECTOR']`) directly in vector metadata, enforcing security filters at vector query time. 4) Auditability: Cryptographic hash of every prompt, context chunk, and completion stored in an immutable write-once ledger for regulatory compliance.",
        insight: "Zero-Trust means: Even if the LLM provider is compromised or logs prompts, no customer PII or raw secrets are ever exposed."
      }
    ]
  }
];

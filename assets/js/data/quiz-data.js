/**
 * AI for Java Developers - 100 Mastery Quiz Questions
 * Comprehensive assessment from Beginner (0 YOE) to Principal Architect (15+ YOE)
 */

const QUIZ_DATA = [
  // ==========================================
  // SECTION 1: GENAI FOUNDATIONS (Q1 - Q15)
  // ==========================================
  {
    id: 1,
    question: "Approximately how many English words does a 1,000-token context window represent?",
    category: "Foundations",
    level: "Beginner",
    options: ["250 words", "750 words", "1,500 words", "4,000 words"],
    correctIndex: 1,
    explanation: "As a rule of thumb, 1 token is approximately 4 characters or 0.75 English words. Therefore, 1,000 tokens ≈ 750 words."
  },
  {
    id: 2,
    question: "What temperature setting should a Java engineer specify for deterministic code or JSON output?",
    category: "Foundations",
    level: "Beginner",
    options: ["1.5", "0.9", "0.0 to 0.2", "2.0"],
    correctIndex: 2,
    explanation: "A temperature of 0.0 (or very low, ≤ 0.2) forces greedy decoding, causing the LLM to select the highest-probability tokens deterministically. High temperatures introduce randomness."
  },
  {
    id: 3,
    question: "What does BPE stand for in LLM tokenization?",
    category: "Foundations",
    level: "Beginner",
    options: ["Binary Parsing Engine", "Byte-Pair Encoding", "Bit-Packed Embedding", "Back-Propagation Estimator"],
    correctIndex: 1,
    explanation: "BPE stands for Byte-Pair Encoding, a subword tokenization algorithm that iteratively merges the most frequent pairs of bytes/characters into single tokens."
  },
  {
    id: 4,
    question: "In Spring AI, which core interface serves as the primary abstraction for chat completions?",
    category: "Foundations",
    level: "Beginner",
    options: ["ChatModel", "LlmTemplate", "AiServiceBean", "PromptExecutor"],
    correctIndex: 0,
    explanation: "Spring AI provides the `ChatModel` interface (and the fluent `ChatClient` wrapper) as the central abstraction across OpenAI, Anthropic, Ollama, etc."
  },
  {
    id: 5,
    question: "What happens when an LLM context window is exceeded?",
    category: "Foundations",
    level: "Beginner",
    options: ["The JVM throws an OutOfMemoryError automatically", "The API returns a context length error or silently truncates older tokens", "The model slows down by 50% but succeeds", "Tokens are automatically compressed to 8-bit integers"],
    correctIndex: 1,
    explanation: "LLMs have a rigid attention context window limit (e.g. 128k tokens). Passing more tokens triggers an HTTP 400 Bad Request (Context Window Exceeded) unless pruned."
  },
  {
    id: 6,
    question: "What is Nucleus Sampling in Generative AI?",
    category: "Foundations",
    level: "Intermediate",
    options: ["Sampling only from the nucleus of the GPU memory", "Selecting tokens based on a cumulative probability threshold (Top-P)", "Sampling from the first 50 tokens in the prompt", "Calculating atomic weights of words"],
    correctIndex: 1,
    explanation: "Top-P (Nucleus Sampling) restricts sampling to the smallest set of tokens whose cumulative probability exceeds the threshold P (e.g. 0.9 = top 90%)."
  },
  {
    id: 7,
    question: "Which tokenization library is the official Java port of OpenAI's tiktoken?",
    category: "Foundations",
    level: "Intermediate",
    options: ["Apache Lucene Tokenizer", "JTokkit", "Jackson Tokenizer", "Stanford CoreNLP"],
    correctIndex: 1,
    explanation: "JTokkit (`com.knuddels:jtokkit`) is the widely adopted high-performance Java implementation of tiktoken for token counting."
  },
  {
    id: 8,
    question: "What is the primary role of the 'System' message in a chat completion prompt?",
    category: "Foundations",
    level: "Beginner",
    options: ["To execute OS system commands", "To define the persona, behavioral boundaries, and output formatting rules", "To authenticate the user with LDAP", "To allocate JVM thread pools"],
    correctIndex: 1,
    explanation: "The System message establishes the model's instructions, tone, guardrails, and role before any user turn is processed."
  },
  {
    id: 9,
    question: "How does the Attention mechanism in Transformers scale with context length $N$ in standard self-attention?",
    category: "Foundations",
    level: "Senior",
    options: ["O(1) constant time", "O(log N)", "O(N) linear time", "O(N^2) quadratic time and memory"],
    correctIndex: 3,
    explanation: "Standard self-attention computes an attention weight between every token and every other token, scaling quadratically $O(N^2)$ without optimizations like FlashAttention."
  },
  {
    id: 10,
    question: "What is the KV Cache in LLM inference?",
    category: "Foundations",
    level: "Senior",
    options: ["A Key-Value store in Redis for caching prompt strings", "Cached Key and Value attention tensors from previous tokens to avoid recomputation during generation", "A database of knowledge vectors", "A Java ConcurrentHashMap inside Spring AI"],
    correctIndex: 1,
    explanation: "During autoregressive token generation, the Key and Value attention matrices for previously computed tokens are retained in GPU VRAM (KV Cache) so only the new token needs forward computation."
  },
  {
    id: 11,
    question: "Which Spring AI starter enables running inference on local open-weight models without cloud API keys?",
    category: "Foundations",
    level: "Beginner",
    options: ["spring-ai-ollama-spring-boot-starter", "spring-ai-local-jvm-starter", "spring-ai-embedded-model", "spring-boot-starter-deeplearning"],
    correctIndex: 0,
    explanation: "The `spring-ai-ollama-spring-boot-starter` communicates with an Ollama daemon running locally on `http://localhost:11434`."
  },
  {
    id: 12,
    question: "What is 'Hallucination' in the context of LLMs?",
    category: "Foundations",
    level: "Beginner",
    options: ["A hardware GPU fault causing corrupted floats", "When the model confidently generates plausible-sounding but factually false claims", "A buffer overflow in the tokenizer", "When the model outputs text in an infinite loop"],
    correctIndex: 1,
    explanation: "Hallucination is the generation of factually incorrect or fabricated claims with high apparent fluency and confidence."
  },
  {
    id: 13,
    question: "What does the 'Seed' parameter do when calling an LLM API?",
    category: "Foundations",
    level: "Intermediate",
    options: ["Initializes the model weights from scratch", "Provides a deterministic pseudo-random seed to make outputs reproducible across requests", "Encrypts the prompt payload", "Sets the token cost discount rate"],
    correctIndex: 1,
    explanation: "Setting a fixed `seed` alongside temperature 0.0 aims to make model responses identical for regression testing."
  },
  {
    id: 14,
    question: "How do you achieve real-time token-by-token display in a Spring Boot REST API?",
    category: "Foundations",
    level: "Intermediate",
    options: ["Using HTTP/1.0 chunked transfers", "Returning a Reactive WebFlux Flux<String> with MediaType.TEXT_EVENT_STREAM_VALUE (SSE)", "Polling the API every 10 milliseconds", "Using Java Thread.sleep() in a loop"],
    correctIndex: 1,
    explanation: "Spring WebFlux with Server-Sent Events (SSE) `Flux<String>` streams each token to the client as it is received from the LLM."
  },
  {
    id: 15,
    question: "What is Prompt Caching in modern LLM APIs (OpenAI / Anthropic)?",
    category: "Foundations",
    level: "Senior",
    options: ["Caching answers in the browser localStorage", "Reusing computed KV attention states for identical prompt prefixes longer than 1024 tokens", "Storing prompt templates in Git", "Saving user queries in PostgreSQL"],
    correctIndex: 1,
    explanation: "Provider-level Prompt Caching reuses the KV cache for static prompt prefixes across calls, reducing latency by up to 80% and token cost by 50%."
  },

  // ==========================================
  // SECTION 2: VECTORS & EMBEDDINGS (Q16 - Q30)
  // ==========================================
  {
    id: 16,
    question: "What is a vector embedding?",
    category: "Vectors",
    level: "Beginner",
    options: ["A compressed ZIP file of text", "A dense array of floating-point numbers capturing semantic relationships", "A 32-bit Java Object hashcode", "A database primary key"],
    correctIndex: 1,
    explanation: "An embedding maps unstructured text into a dense vector (e.g. `float[1536]`) where semantic similarity corresponds to geometric proximity."
  },
  {
    id: 17,
    question: "Which metric is most commonly used to measure similarity between text embeddings?",
    category: "Vectors",
    level: "Beginner",
    options: ["Manhattan Distance", "Cosine Similarity", "Hamming Distance", "Jaccard Index"],
    correctIndex: 1,
    explanation: "Cosine Similarity measures the cosine of the angle between two vectors, normalizing for document length."
  },
  {
    id: 18,
    question: "When two vectors are normalized to unit length (L2 norm = 1.0), which operation equals Cosine Similarity?",
    category: "Vectors",
    level: "Intermediate",
    options: ["Cross Product", "Dot Product (Inner Product)", "Euclidean Sum", "Matrix Determinant"],
    correctIndex: 1,
    explanation: "Cosine Similarity is `(A · B) / (||A|| * ||B||)`. When `||A|| = ||B|| = 1.0`, the denominator is 1.0, so Cosine Similarity exactly equals Dot Product."
  },
  {
    id: 19,
    question: "In PostgreSQL with the pgvector extension, which operator computes Cosine Distance?",
    category: "Vectors",
    level: "Intermediate",
    options: ["<->", "<#>", "<=>", "@@"],
    correctIndex: 2,
    explanation: "In pgvector: `<=>` denotes Cosine Distance, `<#>` denotes Negative Dot Product, and `<->` denotes Euclidean (L2) Distance."
  },
  {
    id: 20,
    question: "What does HNSW stand for in vector indexing?",
    category: "Vectors",
    level: "Senior",
    options: ["Hierarchical Navigable Small World", "High-Node Spatial Weighting", "Heterogeneous Network Sparse Walk", "Heuristic Nearest Sample Window"],
    correctIndex: 0,
    explanation: "HNSW stands for Hierarchical Navigable Small World, a multi-layer graph index that enables $O(\\log N)$ Approximate Nearest Neighbor search."
  },
  {
    id: 21,
    question: "How does IVFFlat differ from HNSW in vector databases?",
    category: "Vectors",
    level: "Senior",
    options: ["IVFFlat stores vectors on tape, HNSW in RAM", "IVFFlat partitions vector space into Voronoi cells using k-means, while HNSW creates a proximity graph", "IVFFlat is only for images, HNSW is only for text", "IVFFlat has zero memory footprint"],
    correctIndex: 1,
    explanation: "IVFFlat clusters vectors into Voronoi cells. It builds faster and uses less RAM than HNSW, but has lower recall under dynamic insertions."
  },
  {
    id: 22,
    question: "Which Java 21 feature enables SIMD acceleration for vector mathematics on AVX-512 hardware?",
    category: "Vectors",
    level: "Senior",
    options: ["Virtual Threads", "Vector API (jdk.incubator.vector)", "Foreign Function & Memory API", "ZGC Generational Mode"],
    correctIndex: 1,
    explanation: "The incubator Vector API (`jdk.incubator.vector`) compiles directly into CPU SIMD vector instructions (AVX-512 / ARM Neon) for parallel floating-point math."
  },
  {
    id: 23,
    question: "What is the typical dimensionality of OpenAI's text-embedding-3-small model?",
    category: "Vectors",
    level: "Beginner",
    options: ["64", "384", "1,536", "100,000"],
    correctIndex: 2,
    explanation: "OpenAI's `text-embedding-3-small` generates 1,536-dimensional float vectors by default (which can optionally be shortened to 512 dimensions)."
  },
  {
    id: 24,
    question: "What is an embedding 'Dimension'?",
    category: "Vectors",
    level: "Beginner",
    options: ["The number of words in the sentence", "A single float element in the vector representing a latent semantic axis", "The physical pixel size of the image", "The font size of the text"],
    correctIndex: 1,
    explanation: "Each dimension corresponds to a continuous coordinate axis learned by the neural network during training."
  },
  {
    id: 25,
    question: "Why does dimensionality reduction (e.g. shortening 1536 to 512 dimensions in text-embedding-3) benefit Java enterprise applications?",
    category: "Vectors",
    level: "Senior",
    options: ["It makes the LLM run 10x faster", "It reduces vector storage and RAM requirements by 66% with negligible recall drop", "It eliminates the need for vector databases entirely", "It prevents prompt injection"],
    correctIndex: 1,
    explanation: "Shortening vectors reduces RAM and disk footprint by 66% and speeds up similarity distance calculations while retaining ~95%+ of search quality."
  },
  {
    id: 26,
    question: "In Spring AI, which interface performs vector persistence and similarity queries?",
    category: "Vectors",
    level: "Beginner",
    options: ["VectorStore", "EmbeddingRepository", "VectorTemplate", "DocumentStorageClient"],
    correctIndex: 0,
    explanation: "Spring AI's `VectorStore` interface provides methods like `add(List<Document>)` and `similaritySearch(SearchRequest)`."
  },
  {
    id: 27,
    question: "What is Metadata Filtering in vector search?",
    category: "Vectors",
    level: "Intermediate",
    options: ["Filtering out spam email headers", "Restricting similarity search to records matching specific structured attributes (e.g., tenantId, date)", "Removing vowels from text before embedding", "Deleting old vectors after 30 days"],
    correctIndex: 1,
    explanation: "Metadata filtering applies SQL-like WHERE conditions (e.g. `tenantId == 'acme'`) to restrict vector candidates during similarity search."
  },
  {
    id: 28,
    question: "What happens if you search a vector database using an embedding from a different model than the one used during ingestion?",
    category: "Vectors",
    level: "Intermediate",
    options: ["It works perfectly because all embeddings are floats", "It returns complete garbage/random results because coordinate spaces are completely incompatible", "The database automatically converts between spaces", "A Java ClassCastException is thrown"],
    correctIndex: 1,
    explanation: "Different embedding models map concepts to completely different high-dimensional coordinate spaces. You MUST query using the exact same model used for indexing."
  },
  {
    id: 29,
    question: "What is Reciprocal Rank Fusion (RRF)?",
    category: "Vectors",
    level: "Architect",
    options: ["A technique to combine ranked results from keyword search (BM25) and vector search into a unified score", "A method for fusing two LLMs into one", "A GPU clustering protocol", "A Java garbage collection algorithm"],
    correctIndex: 0,
    explanation: "RRF combines rankings from disparate retrieval strategies (e.g., BM25 full-text + dense vector search) using the formula $\\sum 1 / (k + rank_i)$."
  },
  {
    id: 30,
    question: "Why should you cache embedding vectors in Redis using text SHA-256 hashes as keys?",
    category: "Vectors",
    level: "Senior",
    options: ["To prevent vector databases from crashing", "To avoid duplicate paid embedding API calls for frequent identical queries or documents", "Because PostgreSQL cannot store vectors directly", "To make embeddings human-readable"],
    correctIndex: 1,
    explanation: "Computing embeddings incurs latency and API costs. Caching `sha256(text) -> float[]` in Redis achieves sub-millisecond retrieval on cache hits."
  },

  // ==========================================
  // SECTION 3: RAG ARCHITECTURE (Q31 - Q45)
  // ==========================================
  {
    id: 31,
    question: "What are the three core stages of the RAG pattern?",
    category: "RAG",
    level: "Beginner",
    options: ["Read, Analyze, Generate", "Retrieve, Augment, Generate", "Re-rank, Assess, Grade", "Run, Allocate, Gather"],
    correctIndex: 1,
    explanation: "RAG stands for Retrieval-Augmented Generation: Retrieve relevant context -> Augment the prompt with context -> Generate the grounded answer."
  },
  {
    id: 32,
    question: "What is the purpose of chunk overlap (e.g. 500 characters chunk size, 50 characters overlap)?",
    category: "RAG",
    level: "Beginner",
    options: ["To compress the document", "To prevent semantic sentences or thoughts from being split across chunk boundaries", "To double the database storage size", "To speed up embedding generation"],
    correctIndex: 1,
    explanation: "Chunk overlap ensures that sentences or entities falling near a chunk boundary are not sliced in half, preserving context continuity."
  },
  {
    id: 33,
    question: "In Spring AI, which built-in advisor attaches RAG vector retrieval to a ChatClient automatically?",
    category: "RAG",
    level: "Intermediate",
    options: ["QuestionAnswerAdvisor", "RagInterceptor", "VectorAdvisor", "DocumentEnrichmentAdvisor"],
    correctIndex: 0,
    explanation: "`QuestionAnswerAdvisor` automatically queries the configured `VectorStore`, injects context into the prompt, and handles source citation metadata."
  },
  {
    id: 34,
    question: "What is HyDE (Hypothetical Document Embeddings)?",
    category: "RAG",
    level: "Senior",
    options: ["A secure encryption protocol for vector databases", "Generating a hypothetical LLM answer first, and searching the vector store using that answer's embedding", "Storing documents on hidden partitions", "A chunking algorithm for Markdown"],
    correctIndex: 1,
    explanation: "HyDE asks the LLM to generate an imaginary answer to the query first, and then embeds that answer to retrieve actual documents with superior semantic alignment."
  },
  {
    id: 35,
    question: "How does a Cross-Encoder Reranker differ from a Bi-Encoder vector search?",
    category: "RAG",
    level: "Senior",
    options: ["Cross-Encoders process (Query, Document) simultaneously through full attention layers, providing much higher precision at higher compute cost", "Cross-encoders only work on XML files", "Bi-encoders are 100x slower than cross-encoders", "Cross-encoders do not use neural networks"],
    correctIndex: 0,
    explanation: "Bi-encoders compute vector embeddings independently. Cross-encoders evaluate query and document pairs together, capturing deep word-level interactions."
  },
  {
    id: 36,
    question: "What is the 'Lost in the Middle' problem in RAG?",
    category: "RAG",
    level: "Intermediate",
    options: ["When vectors get deleted during database compaction", "LLMs tend to pay more attention to information at the beginning and end of long prompts, ignoring facts in the middle", "When HTTP packets are dropped in transit", "When chunk overlap is set to zero"],
    correctIndex: 1,
    explanation: "Research shows LLMs recall facts at the start and end of prompt context with high accuracy, but frequently overlook facts placed in the middle."
  },
  {
    id: 37,
    question: "What is Parent-Child (Hierarchical) Chunking?",
    category: "RAG",
    level: "Senior",
    options: ["Chunking father and son database tables", "Indexing smaller child chunks for precise vector retrieval, while passing the larger parent context to the LLM", "Inheritance hierarchies in Java classes", "Creating duplicate chunks for failover"],
    correctIndex: 1,
    explanation: "Small chunks provide precise semantic similarity matches, while the larger parent chunk provides the broader surrounding context needed for accurate generation."
  },
  {
    id: 38,
    question: "Which Apache library is commonly used in Java for extracting text from PDFs, DOCX, and PPTX files during RAG ingestion?",
    category: "RAG",
    level: "Beginner",
    options: ["Apache Commons IO", "Apache Tika", "Apache Kafka", "Apache Maven"],
    correctIndex: 1,
    explanation: "Apache Tika is the industry standard content analysis toolkit for extracting text and metadata from over a thousand file formats in Java."
  },
  {
    id: 39,
    question: "What is the primary difference between RAG and Fine-Tuning?",
    category: "RAG",
    level: "Intermediate",
    options: ["RAG updates model weights; Fine-Tuning provides prompt context", "RAG injects dynamic external knowledge at runtime; Fine-Tuning updates internal model weights for style, domain terminology, and behavior", "RAG is 100x more expensive than Fine-Tuning", "Fine-Tuning prevents all hallucinations; RAG causes hallucinations"],
    correctIndex: 1,
    explanation: "RAG is for dynamic retrieval of factual knowledge with citations. Fine-Tuning is for teaching specific tone, format, internal DSLs, or task behaviors."
  },
  {
    id: 40,
    question: "What does 'Faithfulness' measure in RAG evaluation (e.g. Ragas framework)?",
    category: "RAG",
    level: "Senior",
    options: ["Whether the user trusts the company", "Whether every factual claim in the generated answer can be directly derived from the retrieved context", "The uptime percentage of the vector store", "Whether the prompt was grammatically correct"],
    correctIndex: 1,
    explanation: "Faithfulness evaluates whether the answer is strictly grounded in the retrieved context chunks, detecting hallucinations."
  },
  {
    id: 41,
    question: "Why should you use an incremental ingestion pipeline with SHA-256 checksums in enterprise RAG?",
    category: "RAG",
    level: "Intermediate",
    options: ["To encrypt all data for GDPR", "To avoid re-embedding unchanged documents during scheduled ETL runs, saving money and time", "Because vector databases reject non-hashed files", "To enable full-text indexing in Solr"],
    correctIndex: 1,
    explanation: "Diffing SHA-256 hashes of document content ensures only new or updated files are passed through expensive embedding models."
  },
  {
    id: 42,
    question: "What is Multi-Query Expansion in RAG?",
    category: "RAG",
    level: "Senior",
    options: ["Executing 1,000 queries in a parallel Java thread pool", "Using an LLM to generate multiple alternative phrasings of the user's question to improve retrieval recall", "Joining multiple relational SQL tables", "Querying both MySQL and MongoDB"],
    correctIndex: 1,
    explanation: "Multi-Query expansion generates 3-5 variations of a prompt from different perspectives to capture documents that use slightly different terminology."
  },
  {
    id: 43,
    question: "What is Context Compression in RAG pipelines?",
    category: "RAG",
    level: "Senior",
    options: ["GZIP compressing documents before saving to disk", "Using an LLM or cross-encoder to extract only the sentences directly pertinent to the query, reducing prompt tokens", "Lowering audio bitrates", "Truncating documents to 50 characters"],
    correctIndex: 1,
    explanation: "Context compression strips irrelevant fluff from retrieved chunks before sending them to the LLM, reducing latency, cost, and distraction."
  },
  {
    id: 44,
    question: "How should a system prompt instruct the LLM to behave when retrieved RAG context does NOT contain the answer?",
    category: "RAG",
    level: "Beginner",
    options: ["Guess the most likely answer based on general knowledge", "Explicitly state that the information is not present in the verified documents", "Throw an HTTP 500 error", "Repeat the user's question 3 times"],
    correctIndex: 1,
    explanation: "Explicitly instructing the model to admit lack of knowledge prevents it from falling back to general hallucination."
  },
  {
    id: 45,
    question: "What is Self-RAG?",
    category: "RAG",
    level: "Architect",
    options: ["RAG running on a single laptop without internet", "An architecture where the model dynamically decides whether to retrieve, evaluates retrieval relevance, and self-critiques its own generated answer", "A vector store that manages its own backups", "RAG implemented purely in Python"],
    correctIndex: 1,
    explanation: "Self-RAG trains or prompts models with reflection tokens to evaluate on-the-fly whether retrieval is needed and whether retrieved chunks are relevant."
  },

  // ==========================================
  // SECTION 4: PROMPTS & STRUCTURED OUTPUT (Q46 - Q60)
  // ==========================================
  {
    id: 46,
    question: "In Spring AI, which class converts LLM JSON output directly into a strongly typed Java Record or POJO?",
    category: "Prompts",
    level: "Beginner",
    options: ["BeanOutputConverter", "JsonEntityParser", "ObjectMapperAdvisor", "PojoDeserializer"],
    correctIndex: 0,
    explanation: "`BeanOutputConverter<T>` generates the required JSON Schema instructions and deserializes the response into the target Java type."
  },
  {
    id: 47,
    question: "What is Chain of Thought (CoT) prompting?",
    category: "Prompts",
    level: "Beginner",
    options: ["Linking multiple prompt strings in a Java LinkedList", "Prompting the LLM to break down its reasoning step-by-step before producing the final answer", "Generating rhymes and poetry", "Invoking multiple LLMs in a sequential chain"],
    correctIndex: 1,
    explanation: "CoT encourages the model to generate intermediate reasoning tokens, significantly reducing errors in math, logic, and code audits."
  },
  {
    id: 48,
    question: "What is Few-Shot prompting?",
    category: "Prompts",
    level: "Beginner",
    options: ["Providing only 2-3 tokens in the prompt", "Including several input-output example demonstrations inside the prompt before asking for the result", "Limiting the API calls to 3 times per day", "Executing prompts using short-lived threads"],
    correctIndex: 1,
    explanation: "Few-shot prompting shows the model examples of desired inputs and outputs, establishing clear format and style guidelines."
  },
  {
    id: 49,
    question: "What is Prompt Injection (OWASP LLM01)?",
    category: "Prompts",
    level: "Intermediate",
    options: ["Injecting Spring beans into prompt templates", "An attack where untrusted user input manipulates the LLM into ignoring system rules and executing unintended actions", "Adding SQL parameters via PreparedStatement", "Loading prompt templates via @Value annotations"],
    correctIndex: 1,
    explanation: "Prompt injection occurs when an attacker crafts input that overrides system instructions, similar to SQL injection in relational databases."
  },
  {
    id: 50,
    question: "How do OpenAI Strict Structured Outputs guarantee 100% schema compliance?",
    category: "Prompts",
    level: "Senior",
    options: ["By running a regex retry loop in the client SDK", "By constraining the model's token-level sampling grammar to only allow tokens valid under the supplied JSON Schema", "By executing Java bytecode in an OpenAI sandbox", "By converting the JSON to XML"],
    correctIndex: 1,
    explanation: "Strict Structured Outputs constrain the token decoding mask at the neural network inference level, making invalid schema tokens impossible to sample."
  },
  {
    id: 51,
    question: "Why should prompt templates be stored in external files (e.g. `classpath:/prompts/review.st`) rather than hardcoded in Java classes?",
    category: "Prompts",
    level: "Intermediate",
    options: ["Because Java compilers reject multiline strings", "To decouple prompt engineering and versioning from Java application recompilation and deployment", "Because external files execute 10x faster", "To enable Spring Data JPA scanning"],
    correctIndex: 1,
    explanation: "Externalizing prompts allows engineers and product teams to iterate on prompts, test variations, and manage versions without redeploying code."
  },
  {
    id: 52,
    question: "What is Negative Prompting?",
    category: "Prompts",
    level: "Intermediate",
    options: ["Insulting the LLM to elicit better answers", "Explicitly specifying what the model must NOT include in its response (e.g. 'No code blocks, no apologies')", "Sending empty strings to the API", "Prompting with negative temperature"],
    correctIndex: 1,
    explanation: "Negative constraints explicitly forbid unwanted stylistic traits, preamble fluff, or sensitive topics."
  },
  {
    id: 53,
    question: "How does wrapping user input in XML tags (e.g. `<user_query>`) mitigate prompt injection?",
    category: "Prompts",
    level: "Intermediate",
    options: ["It converts the prompt to HTML for the browser", "It creates explicit structural boundaries, allowing the system prompt to instruct the model to treat content within tags strictly as data", "It encrypts the payload with TLS", "XML tags cannot be processed by LLMs"],
    correctIndex: 1,
    explanation: "Delimiting untrusted input helps the LLM distinguish between control instructions from the developer and raw data from the end user."
  },
  {
    id: 54,
    question: "In LangChain4j, which annotation provides field-level documentation for LLM schema generation on Java Record components?",
    category: "Prompts",
    level: "Intermediate",
    options: ["@Description", "@SchemaField", "@JsonProperty", "@Comment"],
    correctIndex: 0,
    explanation: "`@Description(\"...\")` adds descriptions to fields in the generated JSON Schema, guiding the LLM on field semantics."
  },
  {
    id: 55,
    question: "What is Constitutional AI?",
    category: "Prompts",
    level: "Senior",
    options: ["AI trained on the US Constitution", "Training or prompting models using a foundational set of non-negotiable principles and rules that govern behavior", "Running AI under governmental supervision", "AI models licensed under Apache 2.0"],
    correctIndex: 1,
    explanation: "Constitutional AI aligns models by providing an explicit list of core principles (constitution) that the model evaluates its own responses against."
  },
  {
    id: 56,
    question: "What is the primary risk of using standard regex to parse LLM JSON responses in Java?",
    category: "Prompts",
    level: "Beginner",
    options: ["Regex runs too slowly in Java", "LLMs may output markdown wrappers, newlines, or escaped characters that break brittle regular expressions, causing runtime NullPointerExceptions", "Regex causes memory leaks in the JVM", "Regex modifies the LLM temperature"],
    correctIndex: 1,
    explanation: "Regex assumes rigid string layouts. LLM responses vary unpredictably unless constrained by structured output schemas."
  },
  {
    id: 57,
    question: "In Spring AI, how do you inject runtime variables into a `PromptTemplate`?",
    category: "Prompts",
    level: "Beginner",
    options: ["Using template.create(Map<String, Object> model)", "By doing string concatenation with +", "Using System.setProperty()", "Via JVM environment variables"],
    correctIndex: 0,
    explanation: "`PromptTemplate.create(Map.of(\"key\", value))` safely replaces placeholders (`{key}`) without manual string manipulation."
  },
  {
    id: 58,
    question: "What is PII Masking in enterprise prompt pipelines?",
    category: "Prompts",
    level: "Senior",
    options: ["Hiding the prompt from internal developers", "Detecting and replacing Personally Identifiable Information (SSNs, emails, credit cards) with tokens before sending to external LLMs", "Encrypting database passwords", "Setting private access modifiers on Java methods"],
    correctIndex: 1,
    explanation: "PII masking protects compliance (GDPR, HIPAA, PCI-DSS) by preventing sensitive personal customer data from leaking to third-party AI APIs."
  },
  {
    id: 59,
    question: "What is Model Speculative Decoding?",
    category: "Prompts",
    level: "Architect",
    options: ["Gambling on which model is cheapest", "Using a small, fast draft model to generate candidate tokens in parallel, which are verified in a single forward pass by a large model", "Allowing models to hallucinate speculatively", "Running models before they are compiled"],
    correctIndex: 1,
    explanation: "Speculative decoding uses a lightweight draft model to propose tokens rapidly, while the larger model validates them in parallel, speeding up generation 2-3x."
  },
  {
    id: 60,
    question: "What is A/B Prompt Testing in production?",
    category: "Prompts",
    level: "Senior",
    options: ["Testing prompts on Alphabet and Bing", "Routing a percentage of live traffic to different prompt template variations to measure quality, user engagement, or cost metrics", "Testing prompts in uppercase vs lowercase", "Running automated unit tests with JUnit"],
    correctIndex: 1,
    explanation: "A/B prompt experimentation splits traffic between prompt designs to empirically validate improvements before full rollout."
  },

  // ==========================================
  // SECTION 5: TOOL CALLING & FUNCTIONS (Q61 - Q75)
  // ==========================================
  {
    id: 61,
    question: "In Spring AI, which annotation exposes a Java method as an LLM-invokable tool?",
    category: "Tools",
    level: "Beginner",
    options: ["@Tool", "@AiFunction", "@CallableTool", "@LlmMethod"],
    correctIndex: 0,
    explanation: "The `@Tool` annotation marks a Java method as an executable tool and generates its JSON Schema."
  },
  {
    id: 62,
    question: "Does an LLM directly execute the bytecode of a Java `@Tool` method?",
    category: "Tools",
    level: "Beginner",
    options: ["Yes, the LLM compiles and executes Java bytecode on GPU", "No, the LLM emits a tool_call instruction; the client Java runtime invokes the method and passes results back", "Yes, via WebAssembly", "Only when running on local Ollama"],
    correctIndex: 1,
    explanation: "The LLM never runs code directly. It returns a tool execution request (name + arguments); the host Java application executes the method."
  },
  {
    id: 63,
    question: "How does Spring AI register tools using standard Java Functional interfaces?",
    category: "Tools",
    level: "Intermediate",
    options: ["By declaring beans of type java.util.function.Function<Request, Response> with a @Description annotation", "Using java.lang.Runnable", "Through Java Reflection API only", "By implementing the Serializable interface"],
    correctIndex: 0,
    explanation: "Spring AI natively recognizes `java.util.function.Function<I, O>` beans decorated with `@Description` as tools."
  },
  {
    id: 64,
    question: "What is Parallel Tool Calling?",
    category: "Tools",
    level: "Intermediate",
    options: ["Running tools on dual monitors", "When the LLM requests the execution of multiple tools simultaneously in a single turn", "Using 2 different LLMs at the same time", "Executing tools using distributed Hadoop clusters"],
    correctIndex: 1,
    explanation: "Modern models can return an array of multiple tool invocations in one response (e.g., fetching weather for 3 cities concurrently)."
  },
  {
    id: 65,
    question: "What Java 21 feature is ideal for executing parallel tool calls with blocking I/O (e.g. REST APIs, database queries)?",
    category: "Tools",
    level: "Intermediate",
    options: ["Vector API", "Virtual Threads (Project Loom)", "Pattern Matching for switch", "Sealed Interfaces"],
    correctIndex: 1,
    explanation: "Virtual Threads allow launching hundreds of lightweight concurrent tasks for blocking I/O tool executions without exhausting OS threads."
  },
  {
    id: 66,
    question: "What is Human-in-the-Loop (HITL) in enterprise tool execution?",
    category: "Tools",
    level: "Senior",
    options: ["A human manually typing LLM responses", "Requiring explicit human approval before executing state-changing or high-risk tools (e.g. refunding money, deleting tables)", "A captcha on the login page", "Pair programming with an AI"],
    correctIndex: 1,
    explanation: "HITL pauses autonomous execution on sensitive tools, awaiting human sign-off before committing irreversible actions."
  },
  {
    id: 67,
    question: "How should a Java tool handle an exception (e.g., CustomerNotFoundException) so the LLM can self-correct?",
    category: "Tools",
    level: "Senior",
    options: ["Throw a RuntimeException to crash the application", "Catch the exception and return a descriptive error message with corrective hints", "Return null silently", "Restart the Spring Boot context"],
    correctIndex: 1,
    explanation: "Returning clear error messages (e.g. 'Customer ID not found. Format should be CUST-XXXX') allows the LLM to self-correct its query arguments."
  },
  {
    id: 68,
    question: "What OWASP security threat corresponds to giving an LLM tool access to execute arbitrary SQL or shell commands without validation?",
    category: "Tools",
    level: "Senior",
    options: ["LLM01: Prompt Injection", "LLM06: Excessive Agency", "LLM04: Model Denial of Service", "LLM09: Overreliance"],
    correctIndex: 1,
    explanation: "OWASP LLM06 (Excessive Agency) occurs when an LLM is granted broad, unchecked permissions or dangerous tools without defense-in-depth."
  },
  {
    id: 69,
    question: "In LangChain4j, what annotation is placed on tool method parameters to provide argument descriptions to the model?",
    category: "Tools",
    level: "Intermediate",
    options: ["@P", "@Description", "@ToolParam", "@ParamDoc"],
    correctIndex: 0,
    explanation: "In LangChain4j, `@P(\"description of parameter\")` is used to document individual tool parameters."
  },
  {
    id: 70,
    question: "How can you restrict tool access based on the currently logged-in Spring Security user?",
    category: "Tools",
    level: "Senior",
    options: ["By filtering the list of tools passed into the ChatClient based on the user's GrantedAuthorities / Roles", "LLMs automatically check Spring Security filters", "By encrypting the Java source code", "By disabling tools in production"],
    correctIndex: 0,
    explanation: "Tools must be dynamically filtered in the service layer based on `SecurityContextHolder.getContext().getAuthentication()` before dispatching to the LLM."
  },
  {
    id: 71,
    question: "What is the purpose of setting a tool execution timeout using Resilience4j `TimeLimiter`?",
    category: "Tools",
    level: "Intermediate",
    options: ["To slow down the LLM deliberately", "To prevent slow external third-party APIs from hanging the LLM request and violating application SLAs", "To reduce GPU power consumption", "To save memory in the heap"],
    correctIndex: 1,
    explanation: "TimeLimiter terminates unresponsive tool calls after a predetermined threshold (e.g., 3s), returning a fallback error to the model."
  },
  {
    id: 72,
    question: "Why should critical tool methods use distributed locks (e.g. Redisson RLock) in clustered environments?",
    category: "Tools",
    level: "Senior",
    options: ["To ensure only one server compiles the tool", "To prevent race conditions and duplicate double-spending when multiple agent instances operate concurrently", "Because Redis requires locks to read data", "To speed up Java garbage collection"],
    correctIndex: 1,
    explanation: "Distributed locks guarantee mutual exclusion across multiple horizontal nodes when agents perform sensitive inventory or banking updates."
  },
  {
    id: 73,
    question: "What happens if a tool returns a massive 50,000-line JSON payload to the LLM?",
    category: "Tools",
    level: "Intermediate",
    options: ["The LLM processes it in 1 millisecond", "It will likely overflow the model's context window, causing an error and huge token billing charges", "The database automatically truncates it to 10 bytes", "The tool is re-executed with smaller fonts"],
    correctIndex: 1,
    explanation: "Tool return payloads are injected directly into the LLM context. Tools should aggregate and summarize data rather than dumping raw massive datasets."
  },
  {
    id: 74,
    question: "How do you test a Java service containing @Tool annotations without making live AI API calls?",
    category: "Tools",
    level: "Beginner",
    options: ["You cannot test tools without live AI", "Test tools as standard Java methods using JUnit 5 and Mockito, testing business logic in complete isolation", "By disabling the JVM security manager", "By running the code on a phone"],
    correctIndex: 1,
    explanation: "Methods annotated with `@Tool` are standard Java methods. They can and should be unit-tested directly using standard assertions and mocks."
  },
  {
    id: 75,
    question: "What is an Audit Aspect in tool execution architectures?",
    category: "Tools",
    level: "Senior",
    options: ["A Spring AOP aspect that intercepts @Tool invocations to record caller identity, inputs, outputs, and timestamps in an audit ledger", "An optical lens for inspecting servers", "A tool that audits Java bytecode for compiler bugs", "A database backup utility"],
    correctIndex: 0,
    explanation: "An AOP `@Around` advice on `@Tool` methods guarantees non-repudiable audit trails for security and regulatory compliance (SOC2, HIPAA)."
  },

  // ==========================================
  // SECTION 6: AUTONOMOUS AGENTS (Q76 - Q88)
  // ==========================================
  {
    id: 76,
    question: "What does the ReAct pattern stand for in autonomous AI agents?",
    category: "Agents",
    level: "Beginner",
    options: ["Reactive Actor Framework", "Reasoning and Acting", "Recursive Action Trigger", "Real-time Action Controller"],
    correctIndex: 1,
    explanation: "ReAct stands for Reasoning and Acting, interleaving chain-of-thought steps with tool execution in a feedback loop."
  },
  {
    id: 77,
    question: "What is the difference between Short-Term Memory and Long-Term Memory in an AI Agent?",
    category: "Agents",
    level: "Intermediate",
    options: ["Short-term is RAM; Long-term is SSD storage", "Short-term is the immediate conversation buffer/context window; Long-term is vector search across historical conversations/facts", "Short-term is for numbers; Long-term is for letters", "They are identical in AI"],
    correctIndex: 1,
    explanation: "Short-term memory stores the current session's recent message window. Long-term memory retrieves relevant past experiences via vector search."
  },
  {
    id: 78,
    question: "In LangChain4j, which component provides a sliding window of recent conversation messages for chat memory?",
    category: "Agents",
    level: "Intermediate",
    options: ["MessageWindowChatMemory", "SlidingBufferStore", "RollingHistoryQueue", "SessionCacheHolder"],
    correctIndex: 0,
    explanation: "`MessageWindowChatMemory.withMaxMessages(N)` retains the last N messages, evicting oldest turns to stay within token limits."
  },
  {
    id: 79,
    question: "What is the Supervisor Pattern in Multi-Agent systems?",
    category: "Agents",
    level: "Senior",
    options: ["A human watching the agents on a screen", "A lead orchestrator agent that receives the overall goal, breaks it into subtasks, and delegates them to specialist worker agents", "A JVM thread watchdog", "An agent that manages Kubernetes pods"],
    correctIndex: 1,
    explanation: "The Supervisor pattern establishes a hierarchical structure where a coordinator agent routes tasks to domain-specific sub-agents."
  },
  {
    id: 80,
    question: "What is the Plan-and-Solve agent pattern?",
    category: "Agents",
    level: "Intermediate",
    options: ["An agent that plans for 1 hour before responding", "An agent that first drafts a complete sequence of sub-tasks before executing each step sequentially", "A project management tool in Jira", "An algorithm for traveling salesmen"],
    correctIndex: 1,
    explanation: "Plan-and-Solve decouples initial macro-planning from step-by-step execution, reducing the compounding error rate common in pure ReAct loops."
  },
  {
    id: 81,
    question: "How do you prevent an autonomous agent from entering an infinite execution loop?",
    category: "Agents",
    level: "Intermediate",
    options: ["By setting max_iterations (e.g. 5-10 turns), wall-clock timeouts, and duplicate action detection", "By running the agent on a single-core CPU", "By turning off the internet connection", "By setting temperature to 2.0"],
    correctIndex: 0,
    explanation: "Guards against infinite loops include hard caps on iterations, strict timeouts, token budgets, and loop-detection heuristics."
  },
  {
    id: 82,
    question: "What is a Self-Reflective Agent?",
    category: "Agents",
    level: "Senior",
    options: ["An agent that talks about its feelings", "An agent that generates a preliminary solution, critiques its own output against constraints, and iteratively refines it", "A mirror image in a vector space", "An agent using Java Reflection to inspect itself"],
    correctIndex: 1,
    explanation: "Self-reflective agents (e.g. Reflexion architecture) evaluate their own outputs against test cases or checklists to iteratively fix errors."
  },
  {
    id: 83,
    question: "Which messaging framework enables event-driven asynchronous collaboration between distributed Java agents?",
    category: "Agents",
    level: "Intermediate",
    options: ["Spring Cloud Stream / Apache Kafka", "Java AWT EventQueue", "HTML5 LocalStorage", "SOAP WebServices"],
    correctIndex: 0,
    explanation: "Spring Cloud Stream with Kafka or RabbitMQ provides distributed event brokers for loose coupling and scalability across agents."
  },
  {
    id: 84,
    question: "What is an 'Observation' in the context of an agent's scratchpad?",
    category: "Agents",
    level: "Beginner",
    options: ["The weather outside the datacenter", "The output or return value produced by executing a tool, fed back into the agent's prompt", "A comment written by a human tester", "A metric in Prometheus"],
    correctIndex: 1,
    explanation: "The Observation is the raw factual result returned by the environment/tool after the agent takes an Action."
  },
  {
    id: 85,
    question: "Why should enterprise agent memory state be stored in Redis rather than in-memory JVM heaps?",
    category: "Agents",
    level: "Senior",
    options: ["Because Redis is written in C", "To enable multi-turn conversations to survive server restarts and route across horizontally scaled cluster nodes", "Because JVM heap memory is too slow", "Because Redis encrypts all data automatically"],
    correctIndex: 1,
    explanation: "Externalizing session memory to Redis ensures state is preserved across node failovers, load balancers, and autoscaling events."
  },
  {
    id: 86,
    question: "What is Context Compaction in long-running agentic workflows?",
    category: "Agents",
    level: "Senior",
    options: ["Compressing ZIP files on disk", "Using an LLM to periodically summarize older conversation turns and tool observations to stay within context window budgets", "Deleting all agent memory", "Lowering screen resolution"],
    correctIndex: 1,
    explanation: "Context compaction condenses historical steps into concise factual summaries, preventing context overflow during complex multi-step tasks."
  },
  {
    id: 87,
    question: "What is a Semantic Router in agent orchestration?",
    category: "Agents",
    level: "Senior",
    options: ["A physical Cisco networking switch", "Using vector embeddings of user queries to route immediately to specialist agents without calling an expensive LLM router", "A URL routing rule in Spring WebMVC", "A DNS server"],
    correctIndex: 1,
    explanation: "Semantic routers use fast vector similarity lookups to classify intent in sub-5ms, avoiding the latency and cost of an LLM routing call."
  },
  {
    id: 88,
    question: "How do you ensure safe sandboxed execution when an agent is permitted to write and run Java code?",
    category: "Agents",
    level: "Architect",
    options: ["By running code inside ephemeral, network-isolated Docker containers or gVisor microVMs with strict memory and CPU limits", "By putting code inside a try-catch block", "By setting Java variables to final", "By running code on a thread with low priority"],
    correctIndex: 0,
    explanation: "Code execution agents require sandboxing (Docker, gVisor, Firecracker) with no network egress, limited CPU/RAM, and read-only filesystems."
  },

  // ==========================================
  // SECTION 7: SYSTEM DESIGN & PRODUCTION (Q89 - Q100)
  // ==========================================
  {
    id: 89,
    question: "What does TTFT stand for in AI system performance, and why is it critical?",
    category: "Architecture",
    level: "Intermediate",
    options: ["Total Time For Transmission; determines bandwidth", "Time-To-First-Token; measures the perceived latency before the user sees the first streamed token", "Thread-To-Fiber-Transition; measures Project Loom overhead", "Token Translation Formatting Time"],
    correctIndex: 1,
    explanation: "Time-To-First-Token (TTFT) dictates user experience. Fast TTFT with streaming makes a response feel instantaneous even if total generation takes several seconds."
  },
  {
    id: 90,
    question: "How does a Semantic Cache achieve sub-10ms response times for LLM queries?",
    category: "Architecture",
    level: "Senior",
    options: ["By predicting future questions before they are asked", "By embedding the query and checking if a previously answered question has > 0.95 cosine similarity in an in-memory vector store like Redis", "By storing all possible English sentences on disk", "By overclocking the CPU"],
    correctIndex: 1,
    explanation: "Semantic Caching matches incoming queries against cached embeddings. Hits bypass the LLM entirely, returning in 5-10ms with zero token cost."
  },
  {
    id: 91,
    question: "Which token bucket rate limiting library is commonly used in Spring Boot microservices?",
    category: "Architecture",
    level: "Intermediate",
    options: ["Bucket4j", "RateLimiterPro", "Spring Throttle", "Apache Commons Limiter"],
    correctIndex: 0,
    explanation: "Bucket4j is the popular Java rate-limiting library based on the token-bucket algorithm, supporting in-memory and Redis distributed backends."
  },
  {
    id: 92,
    question: "How should a production AI Gateway handle an upstream HTTP 429 Too Many Requests from OpenAI?",
    category: "Architecture",
    level: "Senior",
    options: ["Immediately return HTTP 500 to the client", "Use exponential backoff with jitter via Resilience4j Retry, and failover to a secondary model/provider if retry budget is exhausted", "Crash the Spring Boot application", "Send 10 simultaneous duplicate requests"],
    correctIndex: 1,
    explanation: "Exponential backoff with jitter respects provider retry-after headers, preventing thundering herd problems, paired with multi-provider fallback."
  },
  {
    id: 93,
    question: "What is OWASP LLM02?",
    category: "Architecture",
    level: "Senior",
    options: ["Insecure Output Handling", "Sensitive Information Disclosure (unintended leakage of confidential data, PII, or internal secrets)", "Training Data Poisoning", "Improper Model Serialization"],
    correctIndex: 1,
    explanation: "OWASP LLM02 addresses Sensitive Information Disclosure, where proprietary source code, internal IPs, or customer PII are leaked in completions."
  },
  {
    id: 94,
    question: "In Micrometer / Prometheus observability, which metric type is best suited for tracking total token usage over time?",
    category: "Architecture",
    level: "Beginner",
    options: ["Gauge", "Counter", "DistributionSummary", "LongTaskTimer"],
    correctIndex: 1,
    explanation: "Counters are monotonically increasing cumulative metrics, making them ideal for tracking total input and output token consumption."
  },
  {
    id: 95,
    question: "What is an Air-Gapped LLM deployment in enterprise banking or defense?",
    category: "Architecture",
    level: "Architect",
    options: ["Running LLMs on airplanes", "Hosting open-weight models (e.g. Llama 3, DeepSeek) inside fully isolated private networks with zero outbound internet access", "Cooling servers with high-speed fans", "Using wireless networking only"],
    correctIndex: 1,
    explanation: "Air-gapped deployments ensure data never leaves internal perimeter networks, satisfying strict national security and banking regulations."
  },
  {
    id: 96,
    question: "What is the FinOps concept of 'Token Budgeting and Internal Chargebacks'?",
    category: "Architecture",
    level: "Architect",
    options: ["Buying cryptocurrency tokens to pay for servers", "Attributing LLM API dollar costs to individual internal cost centers/departments based on prompt and completion token usage recorded in a database ledger", "Restricting employees to 10 words per email", "A discount coupon program"],
    correctIndex: 1,
    explanation: "FinOps chargebacks track token consumption per department/tenant, billing respective business units for their actual AI infrastructure spend."
  },
  {
    id: 97,
    question: "How does Spring Cloud Config enable zero-downtime hot swapping of LLM models in production?",
    category: "Architecture",
    level: "Senior",
    options: ["By recompiling Java classes in memory", "By combining Spring's @RefreshScope with external config repositories, updating active model names on actuator refresh without restart", "By using Java bytecode manipulation", "It cannot be done without restart"],
    correctIndex: 1,
    explanation: "Beans annotated with `@RefreshScope` reinitialize when `/actuator/refresh` is called, reloading property values like active model name seamlessly."
  },
  {
    id: 98,
    question: "What is OpenTelemetry distributed tracing correlation for LLM requests?",
    category: "Architecture",
    level: "Senior",
    options: ["Assigning unique trace IDs that propagate across microservices, RAG vector searches, and LLM API calls for unified debugging in Jaeger / Tempo", "Translating code into English", "Correlating weather with server temperature", "A Java serialization format"],
    correctIndex: 0,
    explanation: "OpenTelemetry propagates trace and span IDs across the entire call graph, enabling engineers to inspect latency at every pipeline stage."
  },
  {
    id: 99,
    question: "What is Model Cascading (or Model Routing)?",
    category: "Architecture",
    level: "Architect",
    options: ["Cascading Style Sheets for AI", "Routing simple or common queries to small, inexpensive models (e.g. GPT-4o-mini / Haiku), escalating to large reasoning models (e.g. o1 / Claude 3.5 Sonnet) only when complexity demands it", "Water cooling for server racks", "Chaining 10 models in a waterfall"],
    correctIndex: 1,
    explanation: "Model cascading optimizes the cost-performance frontier: 80% of simple requests cost pennies on small models, reserving high-cost models for difficult edge cases."
  },
  {
    id: 100,
    question: "What is the Pareto Frontier in enterprise GenAI architecture design?",
    category: "Architecture",
    level: "Architect",
    options: ["The border between two countries' datacenters", "The trade-off curve representing the optimal balance between accuracy/quality, latency (TTFT), and token cost ($) where no parameter can improve without degrading another", "A rule that 80% of engineers write 20% of code", "A proprietary neural network architecture"],
    correctIndex: 1,
    explanation: "The Pareto Frontier describes the optimal trade-off boundary between Accuracy, Latency, and Cost. A senior architect chooses the ideal operating point along this frontier based on business SLA."
  }
];

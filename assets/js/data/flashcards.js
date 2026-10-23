/**
 * AI for Java Developers - Memorization Hub & Flashcards Dataset
 * High-Yield Mnemonics, 3D Flip Flashcards & Java-to-AI Rosetta Stone
 */

const FLASHCARDS_DATA = [
  {
    id: "fc-1",
    topic: "Foundations",
    question: "What is 1 Token roughly equivalent to in English text and Java Strings?",
    answer: "1 Token ≈ 4 characters or ~0.75 English words. 1,000 tokens ≈ 750 words. In Java, Strings are characters/bytes, whereas LLMs strictly operate on integer token IDs from Byte Pair Encoding (BPE).",
    mnemonic: "Rule of 75: 1,000 tokens = 750 words."
  },
  {
    id: "fc-2",
    topic: "Sampling",
    question: "What Temperature and Top-P settings should you use for Java Code and JSON extraction?",
    answer: "Temperature = 0.0 (or ≤ 0.2) and Top-P = 0.1. This forces greedy deterministic decoding, preventing syntax errors and hallucinations in code generation.",
    mnemonic: "T.E.M.P.: Temperature 0 = Strict Code/JSON; Temperature 1 = Creative Poetry."
  },
  {
    id: "fc-3",
    topic: "Vectors",
    question: "When is Dot Product mathematically identical to Cosine Similarity?",
    answer: "When both vectors are L2 normalized (unit length = 1.0). In that case, division by norms is eliminated, making Dot Product 3x faster to compute in Java.",
    mnemonic: "Normalized Vectors: Dot Product == Cosine Similarity (Zero Division overhead!)."
  },
  {
    id: "fc-4",
    topic: "RAG",
    question: "What are the 3 core phases of RAG (Retrieval Augmented Generation)?",
    answer: "1. Retrieve: Search vector store for top-K relevant chunks based on user query. 2. Augment: Inject retrieved chunks into system prompt context. 3. Generate: LLM synthesizes grounded answer with citations.",
    mnemonic: "R.A.G. = Retrieve facts -> Augment prompt -> Generate grounded response."
  },
  {
    id: "fc-5",
    topic: "Vector Indexing",
    question: "Why is HNSW preferred over IVFFlat for production enterprise vector search?",
    answer: "HNSW (Hierarchical Navigable Small World) uses a multi-layered proximity graph. It provides O(log N) search speed, higher recall (>95%), and requires no offline cluster training step.",
    mnemonic: "H.N.S.W. = High Speed, Navigable graph, Superior recall, Worth the RAM."
  },
  {
    id: "fc-6",
    topic: "Tool Calling",
    question: "Does the LLM execute your Java @Tool method directly on the server?",
    answer: "NO! The LLM returns a structured JSON payload requesting a tool execution. Spring AI reflects over your bean, invokes the Java method locally, and sends the result back to the LLM.",
    mnemonic: "The LLM is the Brain (Decision Maker), Java is the Hands (Executor)."
  },
  {
    id: "fc-7",
    topic: "Agents",
    question: "What is the ReAct loop pattern in Autonomous AI Agents?",
    answer: "A repeating cycle of: Thought (model reasons what to do) -> Action (model selects and invokes a tool) -> Observation (model evaluates tool result). Repeats until Goal is reached.",
    mnemonic: "ReAct = Reason + Act + Observe in a continuous loop."
  },
  {
    id: "fc-8",
    topic: "Advanced RAG",
    question: "What is HyDE (Hypothetical Document Embeddings)?",
    answer: "The LLM first generates a hypothetical answer to the user query. The embedding of that generated answer is used for similarity search instead of the user's raw query.",
    mnemonic: "H.y.D.E. = Hallucinate hypothetical answer first -> Search vector store with it."
  },
  {
    id: "fc-9",
    topic: "Architecture",
    question: "What is Time-To-First-Token (TTFT) and how do you minimize it in Java?",
    answer: "TTFT is the latency between sending the request and receiving the first emitted token. Minimize it by using Server-Sent Events (SSE) streaming, prompt caching, and parallel retrieval with Virtual Threads.",
    mnemonic: "TTFT = First token speed. Stream with WebFlux Flux<String> for instant user feedback."
  },
  {
    id: "fc-10",
    topic: "Security",
    question: "What is OWASP LLM01, and how does XML wrapping protect against it?",
    answer: "LLM01 is Prompt Injection. Wrapping untrusted user input inside XML tags (e.g. <user_query>...</user_query>) and instructing the system prompt to treat tags as data prevents command hijacking.",
    mnemonic: "Treat prompt injection like SQL injection: Never concatenate raw strings without delimiters!"
  },
  {
    id: "fc-11",
    topic: "Cost Optimization",
    question: "How does Semantic Caching work in a GenAI Gateway?",
    answer: "Instead of hashing exact strings, query text is embedded and compared against Redis vectors. If cosine similarity > 0.95, return cached answer in 5ms at $0 cost.",
    mnemonic: "Semantic Cache: Close enough meaning = instant free answer."
  },
  {
    id: "fc-12",
    topic: "Structured Output",
    question: "Why should you use BeanOutputConverter over manual regex parsing?",
    answer: "BeanOutputConverter generates an exact JSON Schema from a Java Record. Constrained decoding guarantees that the LLM output is 100% syntactically valid JSON matching your DTO.",
    mnemonic: "Schema first, Record binding always, regex never."
  }
];

const ROSETTA_STONE_DATA = [
  {
    javaConcept: "Deterministic Method f(x) -> y",
    aiConcept: "Next-Token Probability P(w | context)",
    keyDifference: "Java methods always return the exact same output for the same input. LLMs sample from probability distributions governed by Temperature."
  },
  {
    javaConcept: "JVM Heap & OutOfMemoryError",
    aiConcept: "Context Window & KV Cache Truncation",
    keyDifference: "JVM heap is managed by Garbage Collection. Context windows are fixed token budgets (e.g. 128k) where memory cost scales quadratically with attention."
  },
  {
    javaConcept: "Object.hashCode() & Comparable",
    aiConcept: "Vector Embeddings & Cosine Distance",
    keyDifference: "hashCode() maps to a 32-bit integer for exact hash table bucket placement. Embeddings map to float[1536] where geometrical distance equals semantic meaning."
  },
  {
    javaConcept: "Database B-Tree Index",
    aiConcept: "HNSW Vector Index",
    keyDifference: "B-Trees allow exact range lookups for scalars. HNSW builds multi-layered proximity graphs for high-dimensional Approximate Nearest Neighbor (ANN) search."
  },
  {
    javaConcept: "CPU L1/L2 Cache",
    aiConcept: "RAG (Retrieval-Augmented Generation)",
    keyDifference: "A CPU doesn't store the whole database in registers; it caches needed pages. RAG loads only the top 3-5 relevant document chunks into the prompt context."
  },
  {
    javaConcept: "Jackson ObjectMapper / JSR-380",
    aiConcept: "BeanOutputConverter / JSON Schema Strict",
    keyDifference: "Both enforce type safety, but LLM structured output constrains token generation grammar at decoding time rather than post-generation deserialization."
  },
  {
    javaConcept: "Java Reflection / Spring Beans",
    aiConcept: "Tool Calling / Function Calling",
    keyDifference: "Spring AI reflects over Java @Tool annotations to publish JSON Schemas to LLMs, executing local methods when the model issues a tool_call event."
  },
  {
    javaConcept: "Saga Pattern / Camunda FSM",
    aiConcept: "ReAct Agent Loop",
    keyDifference: "Sagas follow predetermined state charts. ReAct agents dynamically reason what state transition to take based on the latest observation."
  },
  {
    javaConcept: "Spring Cloud Gateway & Resilience4j",
    aiConcept: "Enterprise GenAI Gateway & Model Fallbacks",
    keyDifference: "An AI Gateway adds semantic caching, token bucket rate limits, PII masking, and multi-LLM failover to protect microservices from outages."
  },
  {
    javaConcept: "SLF4J & Micrometer / Prometheus",
    aiConcept: "OpenTelemetry & Langfuse Telemetry",
    keyDifference: "AI observability tracks Time-To-First-Token, Prompt/Completion token spend, Faithfulness scores, and multi-turn agent thought traces."
  }
];

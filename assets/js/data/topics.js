/**
 * AI for Java Developers - Master Topics Dataset
 * Zero to Hero Curriculum tailored for Java & Spring Boot Engineers
 */

const TOPICS_DATA = [
  {
    id: "genai-foundations",
    title: "1. GenAI Foundations & LLM Internals",
    category: "foundations",
    level: "Zero to Hero",
    badge: "Essential",
    badgeColor: "blue",
    readTime: "18 min read",
    summary: "Understand how Generative Models think, calculate tokens, sample probabilities, and process context. Master the transition from deterministic Java code to probabilistic AI.",
    mentalModel: {
      javaConcept: "Deterministic Method Call (f(x) -> y)",
      aiConcept: "Next-Token Probability Distribution P(w | context)",
      explanation: "In Java, calling `calculateTax(100)` always returns the exact same value. In an LLM, the model evaluates thousands of vocabulary probabilities for the next token and samples one based on temperature and top-p settings.",
      whyItMatters: "Java developers must abandon pure deterministic expectations and design idempotent, resilient wrappers with guardrails, retries, and strict schema validation."
    },
    diagramSvg: `
      <svg class="ai-diagram-svg" viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.05"/>
          </linearGradient>
          <linearGradient id="grad-java" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#b45309" stop-opacity="0.05"/>
          </linearGradient>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1"/>
          </marker>
        </defs>

        <!-- Step 1: Raw Prompt -->
        <g class="diag-node" transform="translate(30, 70)">
          <rect class="diag-node-rect" width="160" height="110" rx="10" fill="url(#grad-java)" stroke="#f59e0b"/>
          <text class="diag-text-title" x="80" y="35">Raw Input Text</text>
          <text class="diag-text-sub" x="80" y="60">"public class OrderService"</text>
          <text class="diag-text-java" x="80" y="90">Java String UTF-8</text>
        </g>

        <!-- Arrow 1 -->
        <path class="diag-arrow diag-arrow-active" d="M 190 125 L 240 125" marker-end="url(#arrow)"/>

        <!-- Step 2: Byte Pair Encoding / Tokenizer -->
        <g class="diag-node" transform="translate(245, 70)">
          <rect class="diag-node-rect" width="170" height="110" rx="10" fill="url(#grad-blue)" stroke="#38bdf8"/>
          <text class="diag-text-title" x="85" y="32">BPE Tokenizer</text>
          <text class="diag-text-sub" x="85" y="55">Chunks into Token IDs</text>
          <text class="diag-text-sub" x="85" y="75">[1583, 4012, 9812]</text>
          <text class="diag-text-java" x="85" y="95">~0.75 words / token</text>
        </g>

        <!-- Arrow 2 -->
        <path class="diag-arrow diag-arrow-active" d="M 415 125 L 465 125" marker-end="url(#arrow)"/>

        <!-- Step 3: Transformer Attention / Context -->
        <g class="diag-node" transform="translate(470, 50)">
          <rect class="diag-node-rect" width="180" height="145" rx="10" fill="#111827" stroke="#6366f1" stroke-width="2"/>
          <text class="diag-text-title" x="90" y="35">Transformer Core</text>
          <text class="diag-text-sub" x="90" y="60">Self-Attention Matrix</text>
          <text class="diag-text-sub" x="90" y="82">KV Cache (Context)</text>
          <text class="diag-text-java" x="90" y="110">P(Token | Prompt)</text>
          <text class="diag-text-sub" x="90" y="130" fill="#94a3b8">Temp &amp; Top-P sampling</text>
        </g>

        <!-- Arrow 3 -->
        <path class="diag-arrow diag-arrow-active" d="M 650 125 L 700 125" marker-end="url(#arrow)"/>

        <!-- Step 4: Stream Output -->
        <g class="diag-node" transform="translate(705, 70)">
          <rect class="diag-node-rect" width="125" height="110" rx="10" fill="#13231e" stroke="#10b981"/>
          <text class="diag-text-title" x="62" y="35" fill="#34d399">Generated</text>
          <text class="diag-text-sub" x="62" y="60">Next Token</text>
          <text class="diag-text-java" x="62" y="85">Flux&lt;String&gt;</text>
        </g>
      </svg>
    `,
    deepDive: `
      <h3>Core Concepts Every Java Developer Must Grasp</h3>
      <p>1. <strong>Tokens vs Characters</strong>: LLMs do not see characters or strings. They process numbers representing byte-pair subwords. A token in English is approximately 3 to 4 characters or 0.75 words. 1,000 tokens ≈ 750 words. In Java, token length directly affects memory (KV Cache), latency, and cost ($ per 1M tokens).</p>
      <p>2. <strong>Context Window vs JVM Heap</strong>: The context window (e.g., 128k tokens in GPT-4o, 1M+ in Gemini) is the LLM's working memory for a single request. Just like JVM OutOfMemoryError, exceeding the context limit results in truncation or request failure. Unlike JVM heap, the cost of attention grows quadratically $O(N^2)$ without optimized FlashAttention.</p>
      <p>3. <strong>Temperature (0.0 to 2.0)</strong>: Controls randomness. Low temperature (0.0 - 0.2) makes the model greedy/deterministic (ideal for code generation, JSON extraction, and SQL). High temperature (0.7 - 1.0) increases creativity.</p>
      <p>4. <strong>Top-P (Nucleus Sampling)</strong>: Dynamically cuts off the cumulative probability distribution tail. If Top-P is set to 0.9, the model only samples from tokens whose combined probability equals 90%.</p>
      <p>5. <strong>Hallucination</strong>: Since an LLM is a probabilistic next-token generator, it will fluently fabricate non-existent Java libraries or methods if ungrounded. RAG and Tool Calling are the primary cures.</p>
    `,
    memorizationKeys: [
      "Rule of Thumb: 1 token ≈ 4 characters or 0.75 English words.",
      "Temperature 0.0 = Deterministic/Code/JSON. Temperature 0.7+ = Brainstorming.",
      "Context Window = LLM working memory. KV Cache = Internal session state.",
      "LLMs generate tokens autoregressively (one-by-one, token-by-token)."
    ],
    examples: [
      {
        id: "ex-1-1",
        title: "1. Hello World with Spring AI ChatClient",
        desc: "The canonical Spring AI client setup using the fluent ChatClient builder.",
        tags: ["Spring AI", "ChatClient", "Basics"],
        code: `@RestController
@RequestMapping("/api/ai")
public class AiBasicController {

    private final ChatClient chatClient;

    public AiBasicController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder
            .defaultSystem("You are an expert Java Architect assistant.")
            .build();
    }

    @GetMapping("/ask")
    public String askAi(@RequestParam(defaultValue = "Explain Spring AI in 2 sentences") String query) {
        return this.chatClient.prompt()
            .user(query)
            .call()
            .content();
    }
}`
      },
      {
        id: "ex-1-2",
        title: "2. Setting Temperature & Top-P Options Programmatically",
        desc: "Configure sampling parameters to ensure deterministic code/JSON outputs in Java.",
        tags: ["Spring AI", "OpenAiChatOptions", "Sampling"],
        code: `ChatResponse response = chatClient.prompt()
    .user("Generate a valid Java 21 record for CustomerProfile")
    .options(OpenAiChatOptions.builder()
        .withModel("gpt-4o")
        .withTemperature(0.0f) // Deterministic for code/schema!
        .withTopP(0.1f)
        .withMaxTokens(500)
        .build())
    .call()
    .chatResponse();

String output = response.getResult().getOutput().getContent();`
      },
      {
        id: "ex-1-3",
        title: "3. Reactive Token Streaming with Spring WebFlux (SSE)",
        desc: "Stream tokens back to the browser in real-time as Server-Sent Events (SSE).",
        tags: ["Spring WebFlux", "Reactive", "Streaming"],
        code: `@GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<String> streamAiResponse(@RequestParam String prompt) {
    return this.chatClient.prompt()
        .user(prompt)
        .stream()
        .content(); // Emits each token as it arrives from the model
}`
      },
      {
        id: "ex-1-4",
        title: "4. Token Counting in Java with JTokkit (Tiktoken)",
        desc: "Pre-calculate exact token counts before dispatching requests to avoid API limits.",
        tags: ["Java", "JTokkit", "Tokenization"],
        code: `import com.knuddels.jtokkit.Encodings;
import com.knuddels.jtokkit.api.Encoding;
import com.knuddels.jtokkit.api.EncodingRegistry;
import com.knuddels.jtokkit.api.EncodingType;

public class TokenCounterService {
    private final EncodingRegistry registry = Encodings.newDefaultEncodingRegistry();
    private final Encoding enc = registry.getEncoding(EncodingType.O200K_BASE);

    public int countTokens(String text) {
        if (text == null || text.isBlank()) return 0;
        return enc.countTokens(text);
    }
}`
      },
      {
        id: "ex-1-5",
        title: "5. LangChain4j Basic AiServices Interface",
        desc: "Declarative, annotation-driven AI service interface similar to Spring Data Repositories.",
        tags: ["LangChain4j", "Declarative"],
        code: `import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.spring.AiService;

@AiService
public interface JavaCodeReviewer {

    @SystemMessage("You are a Senior Java Security Auditor. Identify CVEs and memory leaks.")
    @UserMessage("Review this code: {{codeSnippet}}")
    String reviewCode(String codeSnippet);
}`
      },
      {
        id: "ex-1-6",
        title: "6. Inspecting Model Metadata & Token Usage in Spring AI",
        desc: "Extract prompt tokens, completion tokens, and exact cost attribution.",
        tags: ["Spring AI", "Metadata", "Auditing"],
        code: `ChatResponse response = chatClient.prompt()
    .user("List 3 advantages of Virtual Threads in Java 21")
    .call()
    .chatResponse();

Usage usage = response.getMetadata().getUsage();
System.out.println("Prompt Tokens: " + usage.getPromptTokens());
System.out.println("Generation Tokens: " + usage.getGenerationTokens());
System.out.println("Total Tokens: " + usage.getTotalTokens());`
      },
      {
        id: "ex-1-7",
        title: "7. Local Offline LLM Inference via Ollama & Spring AI",
        desc: "Zero-cost local testing using Llama 3 or DeepSeek without cloud API keys.",
        tags: ["Ollama", "Local LLM", "Spring AI"],
        code: `// application.yml:
// spring.ai.ollama.base-url: http://localhost:11434
// spring.ai.ollama.chat.options.model: llama3.2:3b

@Service
public class LocalAiService {
    private final OllamaChatModel ollamaChatModel;

    public LocalAiService(OllamaChatModel ollamaChatModel) {
        this.ollamaChatModel = ollamaChatModel;
    }

    public String runLocalInference(String prompt) {
        return ollamaChatModel.call(prompt);
    }
}`
      },
      {
        id: "ex-1-8",
        title: "8. Handling Context Window Truncation Gracefully",
        desc: "Slide context window by pruning old conversation turns to fit budget.",
        tags: ["Context Window", "Memory Management"],
        code: `public List<Message> pruneContext(List<Message> history, int maxAllowedTokens) {
    List<Message> pruned = new ArrayList<>(history);
    while (calculateTotalTokens(pruned) > maxAllowedTokens && pruned.size() > 2) {
        // Remove oldest message after the primary system prompt (index 0)
        pruned.remove(1);
    }
    return pruned;
}`
      },
      {
        id: "ex-1-9",
        title: "9. System Message vs User Message vs Assistant Message",
        desc: "Understanding message roles and enforcing persona boundaries in Java.",
        tags: ["Prompt Architecture", "Spring AI"],
        code: `Message systemMsg = new SystemMessage("You are a strict Spring Boot 3 migration tool.");
Message userMsg = new UserMessage("Can I use javax.servlet in Spring Boot 3?");
Message assistantHistory = new AssistantMessage("No, Spring Boot 3 baseline requires jakarta.servlet.");
Message nextUserMsg = new UserMessage("What maven coordinate should I use instead?");

Prompt prompt = new Prompt(List.of(systemMsg, userMsg, assistantHistory, nextUserMsg));
String response = chatClient.prompt(prompt).call().content();`
      },
      {
        id: "ex-1-10",
        title: "10. Spring AI Multi-Model Routing Strategy",
        desc: "Route queries dynamically to fast/cheap models (GPT-4o-mini) or reasoning models (Claude 3.5 Sonnet / o1).",
        tags: ["Architecture", "Routing", "Cost Optimization"],
        code: `@Service
public class ModelRoutingService {
    private final ChatModel openAiModel;
    private final ChatModel anthropicModel;

    public String routeAndExecute(String prompt, boolean requiresDeepReasoning) {
        ChatModel targetModel = requiresDeepReasoning ? anthropicModel : openAiModel;
        return targetModel.call(prompt);
    }
}`
      },
      {
        id: "ex-1-11",
        title: "11. Testcontainers for Ollama in Integration Tests",
        desc: "Run reliable, reproducible JUnit 5 tests against a local LLM container.",
        tags: ["Testing", "Testcontainers", "JUnit 5"],
        code: `@Testcontainers
@SpringBootTest
class AiIntegrationTest {

    @Container
    static OllamaContainer ollama = new OllamaContainer("ollama/ollama:latest")
            .withModel("llama3.2:1b");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.ai.ollama.base-url", ollama::getEndpoint);
    }

    @Test
    void testLocalModelGeneratesAnswer(@Autowired ChatClient.Builder builder) {
        String answer = builder.build().prompt().user("Ping").call().content();
        assertThat(answer).isNotBlank();
    }
}`
      },
      {
        id: "ex-1-12",
        title: "12. Stop Sequences in Code Generation",
        desc: "Prevent model run-on by terminating completion immediately upon matching a delimiter.",
        tags: ["Sampling", "Stop Sequence"],
        code: `ChatResponse response = chatClient.prompt()
    .user("Write a Java method signature for finding a user by email.")
    .options(OpenAiChatOptions.builder()
        .withStop(List.of(";", "public class")) // Stop as soon as semicolon or new class appears
        .build())
    .call()
    .chatResponse();`
      },
      {
        id: "ex-1-13",
        title: "13. Seed-Based Reproducible Generation",
        desc: "Use deterministic seeds for automated regression testing of prompts.",
        tags: ["Testing", "Determinism", "Seed"],
        code: `ChatResponse response = chatClient.prompt()
    .user("Return JSON: {'status': 'UP'}")
    .options(OpenAiChatOptions.builder()
        .withTemperature(0.0f)
        .withSeed(42L) // Guarantees identical outputs for regression tests
        .build())
    .call()
    .chatResponse();`
      },
      {
        id: "ex-1-14",
        title: "14. Token Budget Guardrail Aspect (AOP)",
        desc: "Intercept calls and abort if estimated tokens exceed safety thresholds.",
        tags: ["Spring AOP", "Guardrails"],
        code: `@Aspect
@Component
public class TokenBudgetAspect {
    private static final int MAX_INPUT_TOKENS = 8000;

    @Around("@annotation(EnforceTokenBudget) && args(promptText,..)")
    public Object enforceLimit(ProceedingJoinPoint pjp, String promptText) throws Throwable {
        if (estimateTokens(promptText) > MAX_INPUT_TOKENS) {
            throw new TokenLimitExceededException("Prompt exceeds safe token budget!");
        }
        return pjp.proceed();
    }
}`
      },
      {
        id: "ex-1-15",
        title: "15. Logprobs Extraction for Model Confidence Scoring",
        desc: "Inspect raw logarithmic probabilities to measure how confident the model is in its answer.",
        tags: ["Logprobs", "Confidence"],
        code: `ChatResponse resp = chatClient.prompt()
    .user("Is Java statically typed? Answer YES or NO.")
    .options(OpenAiChatOptions.builder()
        .withLogprobs(true)
        .withTopLogprobs(3)
        .build())
    .call()
    .chatResponse();
// Evaluate logprob values: logprob close to 0.0 means near 100% certainty`
      },
      {
        id: "ex-1-16",
        title: "16. Multimodal Image Analysis in Spring AI",
        desc: "Pass Java architectural diagrams or screenshots directly to GPT-4o / Claude 3.5.",
        tags: ["Multimodal", "Vision", "Spring AI"],
        code: `var imageResource = new ClassPathResource("architecture.png");
var userMessage = new UserMessage(
    "Analyze this architecture diagram and list single points of failure.",
    List.of(new Media(MimeTypeUtils.IMAGE_PNG, imageResource))
);

String auditReport = chatClient.prompt(new Prompt(userMessage)).call().content();`
      },
      {
        id: "ex-1-17",
        title: "17. Cost Calculation Service for LLM Requests",
        desc: "Calculate exact cloud spend based on input and output token counts.",
        tags: ["FinOps", "Cost Tracking"],
        code: `public record RequestCost(double inputCost, double outputCost, double totalCost) {}

public RequestCost computeCost(int promptTokens, int completionTokens, String model) {
    // Example rates: GPT-4o: $2.50 / 1M input, $10.00 / 1M output
    double inRate = 2.50 / 1_000_000.0;
    double outRate = 10.00 / 1_000_000.0;
    double inCost = promptTokens * inRate;
    double outCost = completionTokens * outRate;
    return new RequestCost(inCost, outCost, inCost + outCost);
}`
      },
      {
        id: "ex-1-18",
        title: "18. Audio Transcription with Whisper in Spring AI",
        desc: "Convert voice input (e.g. customer service call recordings) to text in Java.",
        tags: ["Whisper", "Audio", "Spring AI"],
        code: `@Autowired
private OpenAiAudioTranscriptionModel transcriptionModel;

public String transcribeAudio(Resource audioFile) {
    var options = OpenAiAudioTranscriptionOptions.builder()
        .withLanguage("en")
        .withResponseFormat(OpenAiAudioApi.TranscriptResponseFormat.TEXT)
        .build();
    AudioTranscriptionPrompt prompt = new AudioTranscriptionPrompt(audioFile, options);
    return transcriptionModel.call(prompt).getResult().getOutput();
}`
      },
      {
        id: "ex-1-19",
        title: "19. Handling Rate Limits with Resilience4j Retry",
        desc: "Decorate LLM API calls with exponential backoff on HTTP 429 Too Many Requests.",
        tags: ["Resilience4j", "Retry", "Production"],
        code: `@Retry(name = "aiClient", fallbackMethod = "cachedFallback")
public String callLlmWithBackoff(String userPrompt) {
    return chatClient.prompt().user(userPrompt).call().content();
}

public String cachedFallback(String userPrompt, WebClientResponseException.TooManyRequests ex) {
    log.warn("AI Rate limit hit! Falling back to cached knowledge base.");
    return fallbackCacheService.getClosestMatch(userPrompt);
}`
      },
      {
        id: "ex-1-20",
        title: "20. Complete End-to-End Spring Boot AI Health Indicator",
        desc: "Spring Boot Actuator HealthIndicator to check LLM connectivity and latency.",
        tags: ["Actuator", "HealthCheck", "DevOps"],
        code: `@Component
public class LlmHealthIndicator implements HealthIndicator {
    private final ChatClient chatClient;

    public LlmHealthIndicator(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @Override
    public Health health() {
        try {
            long start = System.currentTimeMillis();
            String res = chatClient.prompt().user("ping").call().content();
            long latency = System.currentTimeMillis() - start;
            return Health.up().withDetail("latencyMs", latency).withDetail("ping", res.trim()).build();
        } catch (Exception e) {
            return Health.down(e).build();
        }
    }
}`
      }
    ]
  },
  {
    id: "embeddings-and-vectors",
    title: "2. Embeddings & Vector Mathematics",
    category: "vectors",
    level: "Zero to Hero",
    badge: "Core Math",
    badgeColor: "amber",
    readTime: "22 min read",
    summary: "Demystify vectors: how text translates into numerical coordinates in 1536-dimensional space. Learn Cosine Similarity, Java Vector API, and PostgreSQL PgVector integration.",
    mentalModel: {
      javaConcept: "Object.hashCode() & Comparable<T>",
      aiConcept: "High-Dimensional Vector Embedding & Cosine Distance",
      explanation: "Java's `hashCode()` maps an object to a 32-bit scalar integer for exact hash table lookups. An AI embedding maps text to a floating-point array (e.g. float[1536]) where semantic similarity equals geometrical proximity (angle between vectors).",
      whyItMatters: "Exact SQL `WHERE title = 'Spring'` fails when users search for 'Application Context'. Vector embeddings bridge the semantic synonym gap effortlessly."
    },
    diagramSvg: `
      <svg class="ai-diagram-svg" viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-vec" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4"/>
          </marker>
        </defs>

        <!-- Coordinate System -->
        <g transform="translate(60, 40)">
          <!-- Axes -->
          <line class="axis-line" x1="50" y1="180" x2="320" y2="180"/>
          <line class="axis-line" x1="50" y1="180" x2="50" y2="20"/>
          <text class="axis-label" x="325" y="185">Dimension 1 (e.g., Spring / Framework)</text>
          <text class="axis-label" x="50" y="10">Dimension 2 (e.g., Performance / Latency)</text>

          <!-- Vector A: "Virtual Threads" -->
          <line class="vector-arrow" x1="50" y1="180" x2="220" y2="60" stroke="#10b981" marker-end="url(#arrow-vec)"/>
          <text x="230" y="55" fill="#34d399" font-size="12" font-weight="700">Vec A: "Virtual Threads"</text>
          <text x="230" y="70" fill="#94a3b8" font-size="10">[0.82, 0.74, 0.12, ...]</text>

          <!-- Vector B: "Project Loom Concurrency" -->
          <line class="vector-arrow" x1="50" y1="180" x2="250" y2="80" stroke="#38bdf8" marker-end="url(#arrow-vec)"/>
          <text x="260" y="95" fill="#38bdf8" font-size="12" font-weight="700">Vec B: "Project Loom"</text>
          <text x="260" y="110" fill="#94a3b8" font-size="10">[0.80, 0.71, 0.15, ...]</text>

          <!-- Vector C: "Making Pasta" (Orthogonal / Unrelated) -->
          <line class="vector-arrow" x1="50" y1="180" x2="80" y2="160" stroke="#f43f5e"/>
          <text x="90" y="160" fill="#fb7185" font-size="11">Vec C: "Cooking Recipe"</text>

          <!-- Cosine Angle Arc -->
          <path class="vector-similarity-arc" d="M 120 130 A 60 60 0 0 1 130 140"/>
          <text x="140" y="132" fill="#fbbf24" font-size="11" font-weight="700">θ (Small Angle = High Cosine Sim: 0.96)</text>
        </g>

        <!-- PgVector / HNSW Summary Box -->
        <g class="diag-node" transform="translate(480, 45)">
          <rect class="diag-node-rect" width="330" height="175" rx="12" fill="#0c1724" stroke="#06b6d4" stroke-width="1.8"/>
          <text class="diag-text-title" x="165" y="32" fill="#38bdf8">Vector Indexing (HNSW / IVFFlat)</text>
          <text class="diag-text-sub" x="165" y="60">Hierarchical Navigable Small World</text>
          <text class="diag-text-java" x="165" y="90">cosine_distance = 1 - (A · B / (||A|| ||B||))</text>
          <text class="diag-text-sub" x="165" y="120">PostgreSQL + pgvector Extension</text>
          <text class="diag-text-java" x="165" y="145" fill="#10b981">SELECT * ORDER BY embedding &lt;=&gt; q LIMIT 5;</text>
        </g>
      </svg>
    `,
    deepDive: `
      <h3>Vector Embeddings Explained for Software Engineers</h3>
      <p>1. <strong>What is an Embedding?</strong> An embedding is a dense mathematical vector (an array of floating-point numbers, e.g. 1536 floats for OpenAI text-embedding-3-small, or 384 floats for MiniLM) that captures semantic relationships. Words or sentences with similar meanings occupy adjacent points in multi-dimensional space.</p>
      <p>2. <strong>Similarity Metrics</strong>:</p>
      <ul>
        <li><strong>Cosine Similarity</strong>: Measures the cosine of the angle between two vectors: <code>dot(A, B) / (norm(A) * norm(B))</code>. Ranges from -1 to 1. Most common for text search because it normalizes for document length.</li>
        <li><strong>Dot Product (Inner Product)</strong>: If vectors are already normalized to unit length (L2 norm = 1.0), Dot Product is mathematically identical to Cosine Similarity and executes much faster on CPUs and GPUs.</li>
        <li><strong>Euclidean Distance (L2)</strong>: Measures the straight-line distance between two points. Smaller means more similar.</li>
      </ul>
      <p>3. <strong>Indexing Algorithms (HNSW vs IVFFlat)</strong>:</p>
      <ul>
        <li><strong>HNSW (Hierarchical Navigable Small World)</strong>: A multi-layered graph index. Very fast search $O(\log N)$, high recall (95%+), but takes more RAM to build. The gold standard in production.</li>
        <li><strong>IVFFlat (Inverted File Flat)</strong>: Clusters vectors into Voronoi cells. Fast build, smaller memory footprint, but lower recall on edge cases.</li>
      </ul>
    `,
    memorizationKeys: [
      "Cosine Similarity = 1 means identical meaning; 0 means unrelated/orthogonal.",
      "L2 Normalized vectors: Dot Product == Cosine Similarity (Super fast).",
      "HNSW = Graph-based, highest query speed & recall, more RAM.",
      "PgVector operator: <=> is Cosine Distance, <#> is Negative Dot Product, <-> is L2."
    ],
    examples: [
      {
        id: "ex-2-1",
        title: "1. Generating Embeddings with Spring AI EmbeddingModel",
        desc: "Convert arbitrary Java strings into dense float arrays.",
        tags: ["Spring AI", "EmbeddingModel", "Basics"],
        code: `@Service
public class VectorService {
    private final EmbeddingModel embeddingModel;

    public VectorService(EmbeddingModel embeddingModel) {
        this.embeddingModel = embeddingModel;
    }

    public float[] embed(String text) {
        // Returns dense float array (e.g. 1536 dimensions)
        return embeddingModel.embed(text);
    }
}`
      },
      {
        id: "ex-2-2",
        title: "2. Pure Java Cosine Similarity Calculator",
        desc: "Implement cosine similarity without external dependencies to understand the math.",
        tags: ["Math", "Algorithms", "Java Core"],
        code: `public class VectorMath {

    public static double cosineSimilarity(float[] vA, float[] vB) {
        if (vA.length != vB.length) {
            throw new IllegalArgumentException("Vector dimension mismatch!");
        }
        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;

        for (int i = 0; i < vA.length; i++) {
            dotProduct += vA[i] * vB[i];
            normA += vA[i] * vA[i];
            normB += vB[i] * vB[i];
        }

        if (normA == 0.0 || normB == 0.0) return 0.0;
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}`
      },
      {
        id: "ex-2-3",
        title: "3. Accelerated Vector Math using Java 21 SIMD Vector API",
        desc: "Use Project Panama's jdk.incubator.vector to calculate dot products using CPU AVX-512 instructions.",
        tags: ["Java 21", "Vector API", "Performance"],
        code: `import jdk.incubator.vector.FloatVector;
import jdk.incubator.vector.VectorSpecies;

public class SimdVectorMath {
    private static final VectorSpecies<Float> SPECIES = FloatVector.SPECIES_PREFERRED;

    public static float simdDotProduct(float[] a, float[] b) {
        float sum = 0f;
        int i = 0;
        int upperBound = SPECIES.loopBound(a.length);

        for (; i < upperBound; i += SPECIES.length()) {
            var va = FloatVector.fromArray(SPECIES, a, i);
            var vb = FloatVector.fromArray(SPECIES, b, i);
            sum += va.mul(vb).reduceLanes(jdk.incubator.vector.VectorOperators.ADD);
        }
        // Tail cleanup
        for (; i < a.length; i++) {
            sum += a[i] * b[i];
        }
        return sum;
    }
}`
      },
      {
        id: "ex-2-4",
        title: "4. Spring AI PgVector Store Configuration",
        desc: "Configure PgVectorStore bean with PostgreSQL for persistence and similarity search.",
        tags: ["Spring AI", "PgVector", "Database"],
        code: `@Configuration
public class PgVectorConfig {

    @Bean
    public VectorStore vectorStore(JdbcTemplate jdbcTemplate, EmbeddingModel embeddingModel) {
        return PgVectorStore.builder(jdbcTemplate, embeddingModel)
            .dimensions(1536)
            .distanceType(PgVectorStore.PgDistanceType.COSINE_DISTANCE)
            .indexType(PgVectorStore.PgIndexType.HNSW)
            .initializeSchema(true)
            .build();
    }
}`
      },
      {
        id: "ex-2-5",
        title: "5. Writing & Querying Documents in Spring AI VectorStore",
        desc: "Insert documents with rich metadata and execute top-K similarity searches.",
        tags: ["VectorStore", "Metadata", "Spring AI"],
        code: `@Service
public class KnowledgeBaseService {
    private final VectorStore vectorStore;

    public KnowledgeBaseService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void storeDoc(String id, String content, String category) {
        Document doc = Document.builder()
            .withId(id)
            .withText(content)
            .withMetadata(Map.of("category", category, "updatedAt", System.currentTimeMillis()))
            .build();
        vectorStore.add(List.of(doc));
    }

    public List<Document> search(String query, int topK) {
        return vectorStore.similaritySearch(
            SearchRequest.query(query).withTopK(topK).withSimilarityThreshold(0.75)
        );
    }
}`
      },
      {
        id: "ex-2-6",
        title: "6. Metadata Filter Expressions in Vector Search",
        desc: "Filter vector searches by tenant, author, or status before/during vector calculation.",
        tags: ["FilterExpression", "Multi-Tenancy", "Security"],
        code: `public List<Document> searchByTenant(String query, String tenantId) {
    Filter.Expression tenantFilter = new Filter.Expression(
        Filter.ExpressionType.EQ,
        new Filter.Key("tenantId"),
        new Filter.Value(tenantId)
    );

    return vectorStore.similaritySearch(
        SearchRequest.query(query)
            .withTopK(5)
            .withFilterExpression(tenantFilter)
    );
}`
      },
      {
        id: "ex-2-7",
        title: "7. LangChain4j In-Memory Vector Store for Unit Tests",
        desc: "Blazingly fast in-memory embedding store for unit and slice testing without Docker.",
        tags: ["LangChain4j", "Testing", "Unit Tests"],
        code: `EmbeddingStore<TextSegment> embeddingStore = new InMemoryEmbeddingStore<>();
EmbeddingModel embeddingModel = new AllMiniLmL6V2EmbeddingModel();

TextSegment segment = TextSegment.from("Spring Boot 3 requires Java 17 minimum.");
Embedding embedding = embeddingModel.embed(segment).content();
embeddingStore.add(embedding, segment);

Embedding queryEmbedding = embeddingModel.embed("What Java version for Spring 3?").content();
List<EmbeddingMatch<TextSegment>> matches = embeddingStore.findRelevant(queryEmbedding, 1);
System.out.println("Match: " + matches.get(0).embedded().text());`
      },
      {
        id: "ex-2-8",
        title: "8. Normalizing Vectors in Java (L2 Norm)",
        desc: "Normalize embeddings to unit length so dot product equals cosine similarity.",
        tags: ["Math", "Normalization"],
        code: `public static float[] normalizeL2(float[] v) {
    double sumSq = 0.0;
    for (float f : v) sumSq += f * f;
    float norm = (float) Math.sqrt(sumSq);

    if (norm == 0) return v;
    float[] normalized = new float[v.length];
    for (int i = 0; i < v.length; i++) {
        normalized[i] = v[i] / norm;
    }
    return normalized;
}`
      },
      {
        id: "ex-2-9",
        title: "9. Raw SQL PgVector Index Creation & HNSW Tuning",
        desc: "Flyway migration script for creating PostgreSQL pgvector HNSW index with optimal m and efConstruction.",
        tags: ["PostgreSQL", "Flyway", "SQL"],
        code: `-- V1__init_vector_store.sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS vector_store (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    metadata JSONB,
    embedding VECTOR(1536)
);

-- Create HNSW Index with high recall parameters
CREATE INDEX IF NOT EXISTS vector_store_hnsw_idx 
ON vector_store 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);`
      },
      {
        id: "ex-2-10",
        title: "10. Spring Data JPA with Hibernate pgvector Extension",
        desc: "Map vector column directly to Java entity using Hypersistence or Hibernate Vector.",
        tags: ["Spring Data JPA", "Hibernate", "Entity"],
        code: `@Entity
@Table(name = "kb_articles")
public class KnowledgeArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(columnDefinition = "TEXT")
    private String content;

    // Mapping PG vector to float array
    @Column(name = "embedding", columnDefinition = "vector(1536)")
    private float[] embedding;

    // Getters and Setters...
}`
      },
      {
        id: "ex-2-11",
        title: "11. Batch Embedding Generation with Spring AI",
        desc: "Embed large batches of chunks in single HTTP call to minimize network round-trips.",
        tags: ["Batching", "Performance", "EmbeddingModel"],
        code: `public List<float[]> batchEmbed(List<String> textChunks) {
    EmbeddingResponse response = embeddingModel.call(
        new EmbeddingRequest(textChunks, EmbeddingOptionsBuilder.builder().build())
    );
    return response.getResults().stream()
        .map(Embedding::getOutput)
        .toList();
}`
      },
      {
        id: "ex-2-12",
        title: "12. Milvus Vector Database Integration in Java",
        desc: "Connect to dedicated enterprise distributed vector store Milvus using Spring AI.",
        tags: ["Milvus", "Enterprise", "Spring AI"],
        code: `@Bean
public VectorStore milvusVectorStore(EmbeddingModel embeddingModel) {
    return MilvusVectorStore.builder(new MilvusServiceClient(
        ConnectParam.newBuilder()
            .withHost("localhost")
            .withPort(19530)
            .build()), embeddingModel)
        .collectionName("enterprise_docs")
        .databaseName("default")
        .build();
}`
      },
      {
        id: "ex-2-13",
        title: "13. Qdrant Vector Store Configuration in Spring AI",
        desc: "Lightweight, blazing-fast Rust-based vector search engine connection.",
        tags: ["Qdrant", "Rust", "VectorStore"],
        code: `@Bean
public VectorStore qdrantVectorStore(EmbeddingModel embeddingModel) {
    QdrantClient client = new QdrantClient(
        QdrantGrpcClient.newBuilder("localhost", 6334, false).build()
    );
    return new QdrantVectorStore(client, "enterprise_collection", embeddingModel);
}`
      },
      {
        id: "ex-2-14",
        title: "14. Euclidean Distance (L2) Implementation",
        desc: "Calculate straight-line geometric distance between two vector coordinates.",
        tags: ["Math", "Euclidean", "L2"],
        code: `public static double euclideanDistance(float[] v1, float[] v2) {
    double sum = 0.0;
    for (int i = 0; i < v1.length; i++) {
        double diff = v1[i] - v2[i];
        sum += diff * diff;
    }
    return Math.sqrt(sum);
}`
      },
      {
        id: "ex-2-15",
        title: "15. Hybrid Search: Combining Vector & Full-Text Search in Java",
        desc: "Reciprocal Rank Fusion (RRF) merging BM25 keyword matches with vector matches.",
        tags: ["Hybrid Search", "RRF", "Search"],
        code: `public List<Document> reciprocalRankFusion(List<Document> vectorDocs, List<Document> bm25Docs, int k) {
    Map<String, Double> rrfScores = new HashMap<>();
    Map<String, Document> docLookup = new HashMap<>();

    applyRrfRank(vectorDocs, rrfScores, docLookup, k);
    applyRrfRank(bm25Docs, rrfScores, docLookup, k);

    return rrfScores.entrySet().stream()
        .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
        .map(entry -> docLookup.get(entry.getKey()))
        .toList();
}

private void applyRrfRank(List<Document> docs, Map<String, Double> scores, Map<String, Document> lookup, int k) {
    for (int rank = 0; rank < docs.size(); rank++) {
        Document d = docs.get(rank);
        lookup.put(d.getId(), d);
        scores.merge(d.getId(), 1.0 / (k + rank + 1), Double::sum);
    }
}`
      },
      {
        id: "ex-2-16",
        title: "16. Handling Out-Of-Vocabulary and Multilingual Embeddings",
        desc: "Using multilingual models (e.g., text-embedding-3 or bge-m3) for cross-lingual Java apps.",
        tags: ["Multilingual", "EmbeddingModel"],
        code: `// Query in German, retrieves English architecture document
String queryGerman = "Wie konfiguriere ich Virtual Threads im Tomcat?";
List<Document> matches = vectorStore.similaritySearch(
    SearchRequest.query(queryGerman).withTopK(3)
);
// Model maps German and English concepts to the exact same semantic cluster!`
      },
      {
        id: "ex-2-17",
        title: "17. Vector Dimensionality Reduction with PCA / Truncation",
        desc: "OpenAI text-embedding-3 allows shortening vectors from 1536 to 512 with minimal accuracy loss.",
        tags: ["Dimensionality", "Optimization"],
        code: `EmbeddingOptions options = OpenAiEmbeddingOptions.builder()
    .withModel("text-embedding-3-small")
    .withDimensions(512) // Reduces RAM & storage footprint by 66%!
    .build();

EmbeddingResponse resp = embeddingModel.call(
    new EmbeddingRequest(List.of("Scalable microservices"), options)
);`
      },
      {
        id: "ex-2-18",
        title: "18. Embedding Caching Layer with Spring Cache & Redis",
        desc: "Cache calculated embeddings by SHA-256 hash of text to save costs and reduce latency.",
        tags: ["Redis", "Caching", "Performance"],
        code: `@Service
public class CachedEmbeddingService {
    private final EmbeddingModel delegate;

    public CachedEmbeddingService(EmbeddingModel delegate) {
        this.delegate = delegate;
    }

    @Cacheable(value = "embeddings", key = "#text.hashCode()")
    public float[] getCachedEmbedding(String text) {
        return delegate.embed(text);
    }
}`
      },
      {
        id: "ex-2-19",
        title: "19. Validating Embedding Quality & Cosine Score Thresholds",
        desc: "Filter out irrelevant hallucination noise by enforcing strict minimum similarity scores.",
        tags: ["Guardrails", "SimilarityThreshold"],
        code: `public List<Document> safeVectorLookup(String query) {
    double MIN_CONFIDENCE = 0.82; // Discard anything with lower similarity
    List<Document> docs = vectorStore.similaritySearch(
        SearchRequest.query(query).withSimilarityThreshold(MIN_CONFIDENCE)
    );
    if (docs.isEmpty()) {
        log.warn("No documents matched query with confidence > {}", MIN_CONFIDENCE);
    }
    return docs;
}`
      },
      {
        id: "ex-2-20",
        title: "20. Embedding Store Warmup on Spring Boot ApplicationReadyEvent",
        desc: "Pre-warm vector database connections and model pipelines during application startup.",
        tags: ["Spring Boot", "Warmup", "Startup"],
        code: `@Component
public class VectorStoreWarmupListener implements ApplicationListener<ApplicationReadyEvent> {
    private final VectorStore vectorStore;

    public VectorStoreWarmupListener(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        log.info("Warming up VectorStore connection...");
        try {
            vectorStore.similaritySearch(SearchRequest.query("warmup").withTopK(1));
            log.info("VectorStore warmup complete.");
        } catch (Exception ex) {
            log.error("Failed to warmup VectorStore", ex);
        }
    }
}`
      }
    ]
  },
  {
    id: "rag-architecture",
    title: "3. RAG Architecture (Retrieval Augmented Generation)",
    category: "rag",
    level: "Zero to Hero",
    badge: "Industry Standard",
    badgeColor: "purple",
    readTime: "25 min read",
    summary: "Build state-of-the-art enterprise RAG pipelines. From document ingestion and semantic chunking to HyDE, cross-encoder rerankers, and LangChain4j / Spring AI integration.",
    mentalModel: {
      javaConcept: "CPU L1/L2 Cache & DB Indexing",
      aiConcept: "Retrieval Augmented Generation (RAG)",
      explanation: "A CPU doesn't keep all database tables in its registers; it loads only needed pages into cache. Similarly, an LLM cannot fit your entire corporate Wiki in its prompt; RAG fetches the top 3-5 relevant chunks from a vector store and passes them as transient context.",
      whyItMatters: "Eliminates fine-tuning costs ($$$), solves stale training data (knowledge cutoff), and grounds responses with verifiable source citations."
    },
    diagramSvg: `
      <svg class="ai-diagram-svg" viewBox="0 0 850 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-rag" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#6d28d9" stop-opacity="0.05"/>
          </linearGradient>
          <marker id="arrow-rag" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7"/>
          </marker>
        </defs>

        <!-- Phase 1: Ingestion Pipeline (Top) -->
        <rect x="20" y="20" width="810" height="95" rx="10" fill="#0f172a" stroke="#334155" stroke-dasharray="4,4"/>
        <text x="35" y="42" fill="#a855f7" font-size="12" font-weight="700">OFFLINE / ASYNC INGESTION PIPELINE</text>

        <g transform="translate(40, 50)">
          <rect width="130" height="50" rx="6" fill="#1e293b" stroke="#64748b"/>
          <text class="diag-text-title" x="65" y="25">PDF / Docs / Wiki</text>
          <text class="diag-text-sub" x="65" y="40">Apache Tika</text>
        </g>

        <path d="M 180 75 L 230 75" class="diag-arrow" marker-end="url(#arrow-rag)"/>

        <g transform="translate(240, 50)">
          <rect width="140" height="50" rx="6" fill="#1e293b" stroke="#64748b"/>
          <text class="diag-text-title" x="70" y="25">Chunking</text>
          <text class="diag-text-sub" x="70" y="40">500 tokens / 50 overlap</text>
        </g>

        <path d="M 390 75 L 440 75" class="diag-arrow" marker-end="url(#arrow-rag)"/>

        <g transform="translate(450, 50)">
          <rect width="150" height="50" rx="6" fill="#1e293b" stroke="#64748b"/>
          <text class="diag-text-title" x="75" y="25">Embedding Model</text>
          <text class="diag-text-sub" x="75" y="40">Spring AI / OpenAI</text>
        </g>

        <path d="M 610 75 L 660 75" class="diag-arrow" marker-end="url(#arrow-rag)"/>

        <g transform="translate(670, 50)">
          <rect width="140" height="50" rx="6" fill="#1e1b4b" stroke="#8b5cf6"/>
          <text class="diag-text-title" x="70" y="25" fill="#c084fc">PgVector Store</text>
          <text class="diag-text-sub" x="70" y="40">HNSW Index</text>
        </g>

        <!-- Phase 2: Runtime RAG Query Flow (Bottom) -->
        <rect x="20" y="135" width="810" height="145" rx="10" fill="#0b1120" stroke="#6366f1"/>
        <text x="35" y="160" fill="#38bdf8" font-size="12" font-weight="700">RUNTIME QUERY PIPELINE</text>

        <!-- User Question -->
        <g transform="translate(40, 180)">
          <rect width="140" height="80" rx="8" fill="#1e293b" stroke="#f59e0b"/>
          <text class="diag-text-title" x="70" y="30">User Query</text>
          <text class="diag-text-java" x="70" y="55">"How to handle OOM?"</text>
        </g>

        <path d="M 190 220 L 250 220" class="diag-arrow diag-arrow-active" marker-end="url(#arrow-rag)"/>

        <!-- Vector Search -->
        <g transform="translate(260, 180)">
          <rect width="150" height="80" rx="8" fill="#172554" stroke="#3b82f6"/>
          <text class="diag-text-title" x="75" y="30">Similarity Search</text>
          <text class="diag-text-sub" x="75" y="50">Top-3 Relevant Chunks</text>
          <text class="diag-text-java" x="75" y="68">similarity &gt; 0.82</text>
        </g>

        <path d="M 420 220 L 480 220" class="diag-arrow diag-arrow-active" marker-end="url(#arrow-rag)"/>

        <!-- Prompt Assembly -->
        <g transform="translate(490, 175)">
          <rect width="160" height="90" rx="8" fill="#1e1b4b" stroke="#a855f7"/>
          <text class="diag-text-title" x="80" y="25">Augmented Prompt</text>
          <text class="diag-text-sub" x="80" y="45">[Context Chunks 1..3]</text>
          <text class="diag-text-sub" x="80" y="62">+ [User Question]</text>
          <text class="diag-text-java" x="80" y="80">PromptTemplate</text>
        </g>

        <path d="M 660 220 L 710 220" class="diag-arrow diag-arrow-active" marker-end="url(#arrow-rag)"/>

        <!-- Final Answer -->
        <g transform="translate(720, 180)">
          <rect width="90" height="80" rx="8" fill="#064e3b" stroke="#10b981"/>
          <text class="diag-text-title" x="45" y="30" fill="#34d399">Answer</text>
          <text class="diag-text-sub" x="45" y="52">+ Citations</text>
        </g>
      </svg>
    `,
    deepDive: `
      <h3>Advanced RAG Strategies for Senior Engineers</h3>
      <p>1. <strong>Naive RAG vs Advanced RAG</strong>:</p>
      <ul>
        <li><strong>Naive RAG</strong>: Simple top-K vector search -> inject directly into prompt. Flaws: high noise, lost in the middle problem, bad chunk boundaries.</li>
        <li><strong>Advanced RAG</strong>: Includes Pre-retrieval (query rewriting, HyDE), Retrieval (hybrid search, metadata filtering), and Post-retrieval (cross-encoder reranking, context compression).</li>
      </ul>
      <p>2. <strong>Chunking Strategies</strong>:</p>
      <ul>
        <li><strong>Fixed-size with overlap</strong>: 500 characters, 50 overlap. Fast, but splits sentences.</li>
        <li><strong>Sentence / Paragraph Chunking</strong>: Respects semantic paragraph boundaries.</li>
        <li><strong>Parent Document Retriever</strong>: Chunks small pieces for embedding lookup, but retrieves the larger parent section for LLM context.</li>
      </ul>
      <p>3. <strong>HyDE (Hypothetical Document Embeddings)</strong>: The LLM first hallucinates a hypothetical answer to the user query. The vector of that answer is used for similarity search instead of the raw user query, dramatically boosting semantic alignment.</p>
      <p>4. <strong>Cross-Encoder Reranking</strong>: Vector search is bi-encoder (fast, approximate). A Cross-Encoder passes (Query, Chunk) together through full attention layers, scoring true relevance with 99% accuracy.</p>
    `,
    memorizationKeys: [
      "RAG Formula: Retrieved Documents + System Guardrails + User Query = Grounded Answer.",
      "Chunk overlap prevents sentences from being split in half at chunk boundaries.",
      "HyDE: Generate hypothetical answer first -> search vector DB with that answer.",
      "Reranker: Drastically improves precision by re-sorting top 20 candidates down to top 3."
    ],
    examples: [
      {
        id: "ex-3-1",
        title: "1. Spring AI QuestionAnswerAdvisor (Built-in RAG)",
        desc: "The fastest way to attach RAG to any Spring AI ChatClient.",
        tags: ["Spring AI", "Advisor", "RAG"],
        code: `@Service
public class RagChatService {
    private final ChatClient chatClient;

    public RagChatService(ChatClient.Builder builder, VectorStore vectorStore) {
        this.chatClient = builder
            .defaultAdvisors(new QuestionAnswerAdvisor(vectorStore, SearchRequest.defaults()))
            .build();
    }

    public String askCorporateKnowledgeBase(String question) {
        // Automatically queries VectorStore, injects context, and answers
        return chatClient.prompt()
            .user(question)
            .call()
            .content();
    }
}`
      },
      {
        id: "ex-3-2",
        title: "2. Document Reading with Apache Tika in Spring AI",
        desc: "Parse PDFs, Word docs, and PowerPoint presentations into structured Spring AI Documents.",
        tags: ["Apache Tika", "PDF", "Ingestion"],
        code: `@Service
public class DocumentIngestionService {
    public List<Document> parsePdf(Resource pdfResource) {
        TikaDocumentReader reader = new TikaDocumentReader(pdfResource);
        return reader.read(); // Automatically extracts text and metadata
    }
}`
      },
      {
        id: "ex-3-3",
        title: "3. TokenTextSplitter for Token-Aware Chunking",
        desc: "Split raw text into exact token budgets without splitting words.",
        tags: ["Chunking", "TokenTextSplitter"],
        code: `public List<Document> chunkDocuments(List<Document> rawDocs) {
    TokenTextSplitter splitter = new TokenTextSplitter(
        800,  // Chunk size in tokens
        100,  // Chunk overlap in tokens
        10,   // Min chunk size
        5000, // Max tokens
        true  // Keep sentence boundaries intact
    );
    return splitter.split(rawDocs);
}`
      },
      {
        id: "ex-3-4",
        title: "4. Custom RAG Prompt Template in Spring AI",
        desc: "Ground the model with strict rules against hallucinating outside the provided documents.",
        tags: ["PromptTemplate", "Guardrails"],
        code: `private static final String RAG_SYSTEM_TEMPLATE = """
    You are a corporate knowledge assistant.
    Use ONLY the contextual facts provided below to answer the user query.
    If the answer is NOT present in the context, explicitly reply:
    "I do not possess information on that topic in the verified documents."
    Do NOT fabricate URLs or class names.

    ----------------
    CONTEXT:
    {context}
    ----------------
    """;

public String executeCustomRag(String question, List<Document> retrievedDocs) {
    String contextBlock = retrievedDocs.stream()
        .map(Document::getText)
        .collect(Collectors.joining("\n\n"));

    PromptTemplate template = new PromptTemplate(RAG_SYSTEM_TEMPLATE);
    Message systemMessage = template.createMessage(Map.of("context", contextBlock));

    return chatClient.prompt(new Prompt(List.of(systemMessage, new UserMessage(question))))
        .call()
        .content();
}`
      },
      {
        id: "ex-3-5",
        title: "5. Implementing HyDE (Hypothetical Document Embeddings) in Java",
        desc: "Generate an imaginary answer first to search vector storage with higher precision.",
        tags: ["HyDE", "Advanced RAG"],
        code: `public List<Document> hydeSearch(String userQuery) {
    // 1. Generate hypothetical answer
    String hypotheticalDoc = chatClient.prompt()
        .user("Write a technical paragraph answering: " + userQuery)
        .options(OpenAiChatOptions.builder().withTemperature(0.2f).build())
        .call()
        .content();

    // 2. Search vector store using the hypothetical answer's embedding
    return vectorStore.similaritySearch(
        SearchRequest.query(hypotheticalDoc).withTopK(4)
    );
}`
      },
      {
        id: "ex-3-6",
        title: "6. Extracting Citations and Source Attribution",
        desc: "Return clickable source references and page numbers alongside the final answer.",
        tags: ["Citations", "Auditability"],
        code: `public record AnswerWithCitations(String answer, List<String> sources) {}

public AnswerWithCitations answerWithCitations(String query) {
    List<Document> docs = vectorStore.similaritySearch(SearchRequest.query(query).withTopK(3));
    
    String answer = generateAnswer(query, docs);
    List<String> sources = docs.stream()
        .map(d -> d.getMetadata().getOrDefault("source_filename", "unknown") + " (p. " + d.getMetadata().getOrDefault("page_number", 1) + ")")
        .distinct()
        .toList();

    return new AnswerWithCitations(answer, sources);
}`
      },
      {
        id: "ex-3-7",
        title: "7. LangChain4j EmbeddingStoreContentRetriever Setup",
        desc: "Configure modular retrieval pipeline with LangChain4j.",
        tags: ["LangChain4j", "ContentRetriever"],
        code: `ContentRetriever retriever = EmbeddingStoreContentRetriever.builder()
    .embeddingStore(embeddingStore)
    .embeddingModel(embeddingModel)
    .maxResults(3)
    .minScore(0.8)
    .build();

List<Content> relevantContent = retriever.retrieve(Query.from("Spring Security OAuth2"));`
      },
      {
        id: "ex-3-8",
        title: "8. Cross-Encoder Reranker Integration (Cohere Rerank)",
        desc: "Pass the top 25 candidate chunks through a cross-encoder to select the true top 3.",
        tags: ["Reranking", "Cohere", "Cross-Encoder"],
        code: `public List<Document> rerank(String query, List<Document> initialDocs, int finalTopK) {
    // Send (query, document) pairs to Rerank API (e.g. Cohere or local ONNX model)
    List<ScoredDoc> scored = rerankClient.score(query, initialDocs);
    return scored.stream()
        .sorted(Comparator.comparingDouble(ScoredDoc::score).reversed())
        .limit(finalTopK)
        .map(ScoredDoc::doc)
        .toList();
}`
      },
      {
        id: "ex-3-9",
        title: "9. Parent-Child Hierarchical Chunking in Java",
        desc: "Index smaller child chunks for precise retrieval, but provide larger parent context to LLM.",
        tags: ["ParentDocumentRetriever", "Chunking"],
        code: `public record ChunkNode(String id, String text, String parentId) {}

public List<String> retrieveParentContext(String query) {
    List<Document> childMatches = vectorStore.similaritySearch(SearchRequest.query(query).withTopK(3));
    // Retrieve parent documents from relational DB by parentId
    List<String> parentIds = childMatches.stream()
        .map(d -> (String) d.getMetadata().get("parentId"))
        .toList();

    return parentDocRepository.findAllById(parentIds).stream()
        .map(ParentEntity::getFullText)
        .toList();
}`
      },
      {
        id: "ex-3-10",
        title: "10. Context Compression to Reduce LLM Input Costs",
        desc: "Strip unnecessary sentences from retrieved documents before sending to LLM.",
        tags: ["ContextCompression", "TokenSavings"],
        code: `public String compressContext(String query, List<Document> docs) {
    String concatenated = docs.stream().map(Document::getText).collect(Collectors.joining("\n"));
    return chatClient.prompt()
        .user("Given this query: '" + query + "', extract ONLY the directly pertinent sentences from:\n" + concatenated)
        .call()
        .content();
}`
      },
      {
        id: "ex-3-11",
        title: "11. Multi-Query Expansion in Java",
        desc: "Expand a single user prompt into 3 alternative formulations to maximize recall.",
        tags: ["QueryExpansion", "Advanced RAG"],
        code: `public List<String> expandQuery(String originalQuery) {
    String prompt = "Generate 3 alternative search queries for: '" + originalQuery + "'. Output 1 per line.";
    String response = chatClient.prompt().user(prompt).call().content();
    return Arrays.stream(response.split("\n"))
        .map(String::trim)
        .filter(s -> !s.isBlank())
        .toList();
}`
      },
      {
        id: "ex-3-12",
        title: "12. Self-RAG: Answer Groundedness Evaluation in Java",
        desc: "Programmatically grade whether an LLM answer is faithful to retrieved context.",
        tags: ["Self-RAG", "Evaluation", "Hallucination"],
        code: `public boolean isAnswerFaithful(String context, String generatedAnswer) {
    String gradePrompt = """
        Evaluate whether the ANSWER is completely supported by the CONTEXT.
        Respond with ONLY 'FAITHFUL' or 'HALLUCINATED'.
        Context: %s
        Answer: %s
        """.formatted(context, generatedAnswer);

    String grade = chatClient.prompt().user(gradePrompt).call().content().trim();
    return "FAITHFUL".equalsIgnoreCase(grade);
}`
      },
      {
        id: "ex-3-13",
        title: "13. Routing Queries: RAG vs Direct LLM vs SQL Agent",
        desc: "Classify incoming user questions to decide whether to query Vector Store or Relational DB.",
        tags: ["SemanticRouter", "Routing"],
        code: `public enum RouteDestination { RAG_VECTOR, SQL_DATABASE, DIRECT_CHAT }

public RouteDestination routeQuery(String query) {
    String classificationPrompt = """
        Classify this user request into one category:
        - RAG_VECTOR: questions about policies, guides, text documents
        - SQL_DATABASE: questions requiring aggregates, numbers, counts, prices
        - DIRECT_CHAT: casual greetings or general coding questions
        Query: %s
        Category:""".formatted(query);

    String category = chatClient.prompt().user(classificationPrompt).call().content().trim();
    return RouteDestination.valueOf(category);
}`
      },
      {
        id: "ex-3-14",
        title: "14. RAG with Markdown Header Aware Chunking",
        desc: "Preserve document structure by splitting chunks along Markdown # and ## headers.",
        tags: ["Markdown", "Chunking"],
        code: `public List<Document> splitByMarkdownHeaders(String markdownContent) {
    String[] sections = markdownContent.split("(?=(?m)^#{1,3} )");
    List<Document> docs = new ArrayList<>();
    for (String sec : sections) {
        if (!sec.isBlank()) {
            docs.add(new Document(sec.trim()));
        }
    }
    return docs;
}`
      },
      {
        id: "ex-3-15",
        title: "15. Incremental Indexing with Document Checksum/Hash",
        desc: "Avoid expensive re-embedding of unchanged documents using SHA-256 diffing.",
        tags: ["Ingestion", "ETL", "Optimization"],
        code: `public boolean shouldReindex(String docId, String content) {
    String currentHash = DigestUtils.sha256Hex(content);
    String existingHash = documentHashRepository.findHashById(docId);
    if (!currentHash.equals(existingHash)) {
        documentHashRepository.saveHash(docId, currentHash);
        return true; // Re-index required
    }
    return false; // Skip!
}`
      },
      {
        id: "ex-3-16",
        title: "16. Semantic Caching of RAG Answers in Redis",
        desc: "Return instant cached answers if a new question has > 0.95 cosine similarity to a past question.",
        tags: ["SemanticCache", "Redis", "Latency"],
        code: `public Optional<String> checkSemanticCache(String newQuestion) {
    float[] qVec = embeddingModel.embed(newQuestion);
    List<CachedQa> matches = redisVectorStore.findSimilar(qVec, 0.96);
    if (!matches.isEmpty()) {
        log.info("Semantic cache HIT! Saved LLM inference.");
        return Optional.of(matches.get(0).getAnswer());
    }
    return Optional.empty();
}`
      },
      {
        id: "ex-3-17",
        title: "17. RAG Time-Window Filtering for Temporal Queries",
        desc: "Inject metadata filter when user query asks 'What happened last week?'.",
        tags: ["TemporalFilter", "Metadata"],
        code: `public List<Document> queryRecentDocs(String query, Instant since) {
    Filter.Expression timeFilter = new Filter.Expression(
        Filter.ExpressionType.GTE,
        new Filter.Key("publishedAt"),
        new Filter.Value(since.toEpochMilli())
    );

    return vectorStore.similaritySearch(
        SearchRequest.query(query).withFilterExpression(timeFilter).withTopK(5)
    );
}`
      },
      {
        id: "ex-3-18",
        title: "18. Parallel Retrieval from Multiple Vector Stores",
        desc: "Query Jira, Confluence, and GitHub vector stores simultaneously using CompletableFuture.",
        tags: ["Concurrency", "CompletableFuture", "VirtualThreads"],
        code: `public List<Document> parallelFederatedSearch(String query) {
    try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
        CompletableFuture<List<Document>> f1 = CompletableFuture.supplyAsync(() -> jiraStore.similaritySearch(query), executor);
        CompletableFuture<List<Document>> f2 = CompletableFuture.supplyAsync(() -> wikiStore.similaritySearch(query), executor);
        CompletableFuture<List<Document>> f3 = CompletableFuture.supplyAsync(() -> gitStore.similaritySearch(query), executor);

        return Stream.of(f1, f2, f3)
            .map(CompletableFuture::join)
            .flatMap(List::stream)
            .toList();
    }
}`
      },
      {
        id: "ex-3-19",
        title: "19. Handling Table Data in RAG (HTML / Markdown Serialization)",
        desc: "Transform tabular SQL data into LLM-digestible markdown tables during ingestion.",
        tags: ["TabularData", "Serialization"],
        code: `public String serializeTableToMarkdown(ResultSet rs) throws SQLException {
    ResultSetMetaData meta = rs.getMetaData();
    int cols = meta.getColumnCount();
    StringBuilder sb = new StringBuilder("| ");
    for (int i = 1; i <= cols; i++) sb.append(meta.getColumnName(i)).append(" | ");
    sb.append("\n|").append("---|".repeat(cols)).append("\n");

    while (rs.next()) {
        sb.append("| ");
        for (int i = 1; i <= cols; i++) sb.append(rs.getString(i)).append(" | ");
        sb.append("\n");
    }
    return sb.toString();
}`
      },
      {
        id: "ex-3-20",
        title: "20. Complete RAG Production Pipeline Controller with Metrics",
        desc: "Production REST endpoint with Micrometer latency timers and error handling.",
        tags: ["Production", "Micrometer", "REST"],
        code: `@RestController
@RequestMapping("/api/rag")
public class ProductionRagController {
    private final ChatClient chatClient;
    private final MeterRegistry registry;

    public ProductionRagController(ChatClient.Builder builder, VectorStore store, MeterRegistry registry) {
        this.chatClient = builder
            .defaultAdvisors(new QuestionAnswerAdvisor(store, SearchRequest.builder().topK(4).build()))
            .build();
        this.registry = registry;
    }

    @PostMapping("/query")
    public ResponseEntity<String> queryKb(@RequestBody String userQuestion) {
        Timer.Sample sample = Timer.start(registry);
        try {
            String answer = chatClient.prompt().user(userQuestion).call().content();
            sample.stop(registry.timer("ai.rag.latency", "status", "success"));
            return ResponseEntity.ok(answer);
        } catch (Exception e) {
            sample.stop(registry.timer("ai.rag.latency", "status", "error"));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("RAG Query Failed");
        }
    }
}`
      }
    ]
  }
];

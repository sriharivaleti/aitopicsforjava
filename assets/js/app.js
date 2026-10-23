/**
 * AI for Java Developers - Main Application Controller
 * Handles SPA routing, global search, theme management, progress tracking, and rendering.
 */

class App {
  constructor() {
    this.currentRoute = "all-topics";
    this.completedTopics = new Set(JSON.parse(localStorage.getItem("ai_java_completed_topics") || "[]"));
    this.currentTheme = localStorage.getItem("ai_java_theme") || "dark";
    this.currentInterviewTier = "junior";
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.bindEvents();
    this.handleRoute();
    this.updateProgressUI();
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ai_java_theme", theme);
    const themeIcon = document.getElementById("theme-toggle-icon");
    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === "dark" ? "light" : "dark";
    this.applyTheme(nextTheme);
  }

  bindEvents() {
    // Hash change router
    window.addEventListener("hashchange", () => this.handleRoute());

    // Theme toggle
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => this.toggleTheme());
    }

    // Mobile sidebar toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const sidebar = document.getElementById("app-sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");

    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        if (backdrop) backdrop.style.display = sidebar.classList.contains("open") ? "block" : "none";
      });
    }

    if (backdrop && sidebar) {
      backdrop.addEventListener("click", () => {
        sidebar.classList.remove("open");
        backdrop.style.display = "none";
      });
    }

    // Search bar
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => this.handleGlobalSearch(e.target.value));
      document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          searchInput.focus();
        }
      });
    }
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || "all-topics";
    this.currentRoute = hash;

    // Update active state in sidebar
    document.querySelectorAll(".sidebar-nav-item").forEach(item => {
      const link = item.querySelector("a");
      if (link && link.getAttribute("href") === `#${hash}`) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Close mobile drawer if open
    const sidebar = document.getElementById("app-sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    if (sidebar && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      if (backdrop) backdrop.style.display = "none";
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (hash.startsWith("topic/")) {
      const topicId = hash.replace("topic/", "");
      this.renderTopicDetail(topicId);
    } else if (hash === "interview-guide") {
      this.renderInterviewGuide();
    } else if (hash === "quiz-hub") {
      this.renderQuizHub();
    } else if (hash === "memorization-hub") {
      this.renderMemorizationHub();
    } else {
      this.renderAllTopicsOverview();
    }
  }

  toggleTopicComplete(topicId) {
    if (this.completedTopics.has(topicId)) {
      this.completedTopics.delete(topicId);
    } else {
      this.completedTopics.add(topicId);
    }
    localStorage.setItem("ai_java_completed_topics", JSON.stringify(Array.from(this.completedTopics)));
    this.updateProgressUI();
    const btn = document.getElementById(`complete-btn-${topicId}`);
    if (btn) {
      const isDone = this.completedTopics.has(topicId);
      btn.innerHTML = isDone ? "✓ Mastered" : "Mark as Mastered";
      btn.className = isDone ? "btn btn-secondary" : "btn btn-primary";
    }
  }

  updateProgressUI() {
    const total = typeof TOPICS_DATA !== "undefined" ? TOPICS_DATA.length : 7;
    const completed = this.completedTopics.size;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    const fillEl = document.getElementById("sidebar-progress-fill");
    const textEl = document.getElementById("sidebar-progress-text");
    const heroProgressVal = document.getElementById("hero-metric-progress");

    if (fillEl) fillEl.style.width = `${pct}%`;
    if (textEl) textEl.textContent = `${completed} / ${total} Mastered (${pct}%)`;
    if (heroProgressVal) heroProgressVal.textContent = `${pct}%`;
  }

  renderAllTopicsOverview() {
    const main = document.getElementById("main-content-view");
    if (!main) return;

    const cardsHtml = TOPICS_DATA.map((t, idx) => {
      const isCompleted = this.completedTopics.has(t.id);
      return `
        <div class="qa-card" style="cursor: pointer; position: relative; border-left: 4px solid var(--accent-ai);" onclick="location.hash='#topic/${t.id}'">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <span class="badge badge-${t.badgeColor}">${t.badge}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${t.readTime}</span>
            </div>
            ${isCompleted ? '<span class="badge badge-green">✓ Mastered</span>' : ''}
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">
            ${t.title}
          </h3>
          <p style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.5;">
            ${t.summary}
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
            <span style="font-size: 0.8rem; color: var(--accent-java); font-family: var(--font-mono);">
              20 Java & Spring Examples
            </span>
            <span style="font-size: 0.85rem; color: var(--accent-ai); font-weight: 600;">
              Explore Module →
            </span>
          </div>
        </div>
      `;
    }).join("");

    main.innerHTML = `
      <div class="hero-banner">
        <div class="hero-pill">
          <span>🚀 Zero to Hero Curriculum for Java Engineers</span>
        </div>
        <h1 class="hero-title">
          Master <span class="gradient-text">Generative AI</span> as a <span class="java-text">Java Developer</span>
        </h1>
        <p class="hero-desc">
          Bridge the gap between deterministic enterprise Java and probabilistic AI. Comprehensive architecture guides, interactive SVG diagrams, 20 production code examples per topic, and 0-to-15 YOE interview preparation.
        </p>

        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="#topic/genai-foundations" class="btn btn-primary">Start Curriculum (Zero to Hero)</a>
          <a href="#quiz-hub" class="btn btn-secondary">Take 100-Question Assessment 🎯</a>
          <a href="#interview-guide" class="btn btn-secondary">0-15 YOE Interview Guide 💼</a>
        </div>

        <div class="hero-metrics">
          <div class="metric-item">
            <span class="metric-value">7</span>
            <span class="metric-label">Comprehensive Modules</span>
          </div>
          <div class="metric-item">
            <span class="metric-value">140+</span>
            <span class="metric-label">Production Java Examples</span>
          </div>
          <div class="metric-item">
            <span class="metric-value">100</span>
            <span class="metric-label">Assessment Questions</span>
          </div>
          <div class="metric-item">
            <span class="metric-value" id="hero-metric-progress">0%</span>
            <span class="metric-label">Curriculum Mastered</span>
          </div>
        </div>
      </div>

      <div class="section-head">
        <h2 class="section-head-title">Curriculum Roadmaps (Zero to Hero)</h2>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.25rem;">
        ${cardsHtml}
      </div>
    `;
  }

  renderTopicDetail(topicId) {
    const main = document.getElementById("main-content-view");
    if (!main) return;

    const topic = TOPICS_DATA.find(t => t.id === topicId);
    if (!topic) {
      main.innerHTML = `<h2>Topic not found</h2><a href="#all-topics" class="btn btn-secondary">Return Home</a>`;
      return;
    }

    const isMastered = this.completedTopics.has(topic.id);

    // Render examples accordion
    const examplesHtml = topic.examples.map((ex, idx) => `
      <div class="example-card" id="card-${ex.id}">
        <div class="example-card-header" onclick="window.app.toggleAccordion('${ex.id}')">
          <div class="example-header-left">
            <div class="example-index-badge">${idx + 1}</div>
            <div>
              <div class="example-title">${ex.title}</div>
              <div class="example-tags" style="margin-top: 0.25rem;">
                ${ex.tags.map(tag => `<span class="example-tag">${tag}</span>`).join("")}
              </div>
            </div>
          </div>
          <div class="example-toggle-arrow" id="arrow-${ex.id}">▼</div>
        </div>
        <div class="example-card-body" id="body-${ex.id}">
          <div class="example-explanation">${ex.desc}</div>
          <div class="code-box">
            <div class="code-box-header">
              <span>Java / Spring Boot</span>
              <button class="code-copy-btn" onclick="window.app.copyCode('${ex.id}')" id="copy-btn-${ex.id}">
                📋 Copy Code
              </button>
            </div>
            <pre class="code-content" id="code-${ex.id}"><code>${this.escapeHtml(ex.code)}</code></pre>
          </div>
        </div>
      </div>
    `).join("");

    main.innerHTML = `
      <div class="topic-container">
        <!-- Topic Header -->
        <div class="topic-header">
          <div class="topic-meta">
            <span class="badge badge-${topic.badgeColor}">${topic.badge}</span>
            <span class="badge" style="background: var(--bg-tertiary); color: var(--text-muted);">${topic.level}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${topic.readTime}</span>
          </div>
          <div class="topic-title">
            <span>${topic.title}</span>
            <button class="btn ${isMastered ? 'btn-secondary' : 'btn-primary'}" id="complete-btn-${topic.id}" onclick="window.app.toggleTopicComplete('${topic.id}')">
              ${isMastered ? '✓ Mastered' : 'Mark as Mastered'}
            </button>
          </div>
          <p class="topic-subtitle">${topic.summary}</p>
        </div>

        <!-- Java Developer Mental Model Callout -->
        <div class="mental-model-box">
          <div class="mental-model-title">
            💡 Java Developer Mental Model Shift
          </div>
          <div class="mental-model-grid">
            <div class="model-side">
              <span class="model-side-title">Traditional Java Concept</span>
              <span class="model-side-concept">${topic.mentalModel.javaConcept}</span>
            </div>
            <div class="model-side">
              <span class="model-side-title">Generative AI Counterpart</span>
              <span class="model-side-concept" style="color: var(--accent-ai);">${topic.mentalModel.aiConcept}</span>
            </div>
          </div>
          <p style="margin-top: 0.85rem; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
            <strong>The Paradigm Shift:</strong> ${topic.mentalModel.explanation}
          </p>
          <div style="margin-top: 0.5rem; font-size: 0.85rem; color: #fbbf24;">
            <strong>Why it matters:</strong> ${topic.mentalModel.whyItMatters}
          </div>
        </div>

        <!-- Interactive Architecture Diagram -->
        <div class="diagram-wrapper">
          <div class="diagram-header">
            <div class="diagram-title">
              <span>📐 Visual Architecture Diagram</span>
              <span class="diagram-badge">Interactive SVG</span>
            </div>
          </div>
          <div class="svg-container">
            ${topic.diagramSvg}
          </div>
        </div>

        <!-- Technical Deep Dive -->
        <div class="qa-card" style="background: var(--bg-secondary);">
          <div style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary);">
            Deep-Dive Guide &amp; Mechanics
          </div>
          <div style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">
            ${topic.deepDive}
          </div>

          <div style="margin-top: 1.5rem; background: rgba(99, 102, 241, 0.08); border-left: 3px solid var(--accent-ai); padding: 1rem; border-radius: var(--radius-sm);">
            <div style="font-weight: 700; font-size: 0.9rem; color: #a5b4fc; margin-bottom: 0.5rem;">
              🧠 Memorization &amp; Retention Keys
            </div>
            <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.35rem;">
              ${topic.memorizationKeys.map(k => `<li>${k}</li>`).join("")}
            </ul>
          </div>
        </div>

        <!-- 20 Real World Java Examples -->
        <div class="examples-section">
          <div class="section-head">
            <div>
              <h2 class="section-head-title">20 Real-World Java &amp; Spring Boot Examples</h2>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem;">
                Production-grade, copy-pasteable snippets covering Spring AI, LangChain4j, and enterprise patterns.
              </p>
            </div>
            <div class="example-search-filter">
              <input type="text" id="filter-topic-examples" class="example-search-input" placeholder="Filter 20 examples..." oninput="window.app.filterTopicExamples(this.value)">
            </div>
          </div>

          <div class="examples-grid" id="topic-examples-container">
            ${examplesHtml}
          </div>
        </div>
      </div>
    `;

    // Expand the first example by default
    if (topic.examples.length > 0) {
      this.toggleAccordion(topic.examples[0].id);
    }
  }

  toggleAccordion(exampleId) {
    const card = document.getElementById(`card-${exampleId}`);
    if (card) {
      card.classList.toggle("expanded");
    }
  }

  filterTopicExamples(query) {
    const q = query.toLowerCase().trim();
    document.querySelectorAll(".example-card").forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? "block" : "none";
    });
  }

  copyCode(exampleId) {
    const codeEl = document.getElementById(`code-${exampleId}`);
    const btn = document.getElementById(`copy-btn-${exampleId}`);
    if (codeEl) {
      navigator.clipboard.writeText(codeEl.innerText).then(() => {
        if (btn) {
          const original = btn.innerHTML;
          btn.innerHTML = "✓ Copied!";
          btn.style.background = "#10b981";
          btn.style.color = "white";
          setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = "";
            btn.style.color = "";
          }, 2000);
        }
      });
    }
  }

  renderInterviewGuide() {
    const main = document.getElementById("main-content-view");
    if (!main) return;

    const currentTierData = INTERVIEW_TIERS.find(t => t.tierId === this.currentInterviewTier) || INTERVIEW_TIERS[0];

    const tabsHtml = INTERVIEW_TIERS.map(t => `
      <button class="interview-tab-btn ${t.tierId === this.currentInterviewTier ? 'active' : ''}" onclick="window.app.switchInterviewTier('${t.tierId}')">
        <span>${t.name}</span>
      </button>
    `).join("");

    const questionsHtml = currentTierData.questions.map((item, idx) => `
      <div class="qa-card">
        <div class="qa-question">
          <span class="qa-q-badge">Q${idx + 1}.</span>
          <span>${item.q}</span>
        </div>
        <div class="qa-answer">
          ${item.a}
        </div>
        <div class="qa-architect-insight">
          <strong>💡 Interviewer Insight &amp; Evaluation Criteria:</strong> ${item.insight}
        </div>
      </div>
    `).join("");

    main.innerHTML = `
      <div class="topic-container">
        <div class="topic-header">
          <div class="topic-meta">
            <span class="badge badge-rose">Interview Mastery</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">From 0 to 15+ Years Experience</span>
          </div>
          <h1 class="topic-title">Java &amp; AI Technical Interview Guide</h1>
          <p class="topic-subtitle">
            Curated interview questions, system design trade-offs, and architecture scenarios across 4 seniority levels.
          </p>
        </div>

        <div class="interview-tabs">
          ${tabsHtml}
        </div>

        <div style="margin-bottom: 1.5rem; background: var(--bg-tertiary); padding: 1rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">
            ${currentTierData.name} - ${currentTierData.badge}
          </div>
          <div style="font-size: 0.88rem; color: var(--text-secondary);">
            ${currentTierData.description}
          </div>
        </div>

        <div class="qa-list">
          ${questionsHtml}
        </div>
      </div>
    `;
  }

  switchInterviewTier(tierId) {
    this.currentInterviewTier = tierId;
    this.renderInterviewGuide();
  }

  renderQuizHub() {
    const main = document.getElementById("main-content-view");
    if (!main) return;

    main.innerHTML = `
      <div class="topic-container">
        <div class="topic-header">
          <div class="topic-meta">
            <span class="badge badge-green">Assessment Center</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">100 Questions</span>
          </div>
          <h1 class="topic-title">100-Question AI Mastery Assessment</h1>
          <p class="topic-subtitle">
            Test your knowledge across all 7 GenAI modules. Filter by topic or seniority tier (0 to 15 YOE) with instant feedback and detailed explanations.
          </p>
        </div>

        <div id="quiz-view-root"></div>
      </div>
    `;

    // Instantiate Quiz Engine
    if (typeof QUIZ_DATA !== "undefined") {
      window.quizEngine = new QuizEngine(QUIZ_DATA);
      window.quizEngine.init();
    }
  }

  renderMemorizationHub() {
    const main = document.getElementById("main-content-view");
    if (!main) return;

    const cardsHtml = FLASHCARDS_DATA.map((fc, idx) => `
      <div class="flashcard" onclick="this.classList.toggle('flipped')">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div>
              <div class="flashcard-topic-tag">${fc.topic} • Card #${idx + 1}</div>
              <div class="flashcard-question" style="margin-top: 0.75rem;">${fc.question}</div>
            </div>
            <div class="flashcard-hint">
              <span>↻ Click to reveal answer &amp; mnemonic</span>
            </div>
          </div>
          <div class="flashcard-back">
            <div>
              <div class="flashcard-topic-tag" style="color: #38bdf8;">Answer</div>
              <div class="flashcard-answer" style="margin-top: 0.5rem;">${fc.answer}</div>
              <div class="flashcard-mnemonic">
                <strong>Mnemonic:</strong> ${fc.mnemonic}
              </div>
            </div>
            <div class="flashcard-hint" style="color: #cbd5e1;">
              <span>↻ Click to flip back</span>
            </div>
          </div>
        </div>
      </div>
    `).join("");

    const rosettaRowsHtml = ROSETTA_STONE_DATA.map(r => `
      <tr style="border-bottom: 1px solid var(--border-subtle);">
        <td style="padding: 1rem; font-family: var(--font-mono); font-size: 0.88rem; color: var(--accent-java); font-weight: 600;">
          ${r.javaConcept}
        </td>
        <td style="padding: 1rem; font-family: var(--font-mono); font-size: 0.88rem; color: #38bdf8; font-weight: 600;">
          ${r.aiConcept}
        </td>
        <td style="padding: 1rem; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
          ${r.keyDifference}
        </td>
      </tr>
    `).join("");

    main.innerHTML = `
      <div class="topic-container">
        <div class="topic-header">
          <div class="topic-meta">
            <span class="badge badge-purple">High-Yield Retention</span>
          </div>
          <h1 class="topic-title">Memorization Hub &amp; Rosetta Stone</h1>
          <p class="topic-subtitle">
            Active recall flashcards, high-yield mnemonics, and the Java-to-AI Rosetta Stone comparison table to cement your understanding.
          </p>
        </div>

        <!-- 3D Flip Flashcards -->
        <div class="section-head">
          <h2 class="section-head-title">Interactive 3D Flashcards (Active Recall)</h2>
        </div>
        <div class="flashcards-container">
          ${cardsHtml}
        </div>

        <!-- Rosetta Stone Matrix -->
        <div class="section-head" style="margin-top: 3rem;">
          <h2 class="section-head-title">The Java-to-AI Rosetta Stone Matrix</h2>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem;">
            Directly maps familiar Java enterprise design patterns to their Generative AI equivalents.
          </p>
        </div>

        <div style="overflow-x: auto; background: var(--bg-secondary); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); margin-top: 1rem;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="background: var(--bg-tertiary); border-bottom: 1px solid var(--border-subtle);">
                <th style="padding: 0.85rem 1rem; font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); width: 28%;">Traditional Java Concept</th>
                <th style="padding: 0.85rem 1rem; font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); width: 28%;">Generative AI Counterpart</th>
                <th style="padding: 0.85rem 1rem; font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted);">Key Difference &amp; Mental Shift</th>
              </tr>
            </thead>
            <tbody>
              ${rosettaRowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  handleGlobalSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      if (this.currentRoute === "all-topics") {
        this.renderAllTopicsOverview();
      }
      return;
    }

    const main = document.getElementById("main-content-view");
    if (!main) return;

    // Search across topics, examples, and interview questions
    const matchingExamples = [];
    TOPICS_DATA.forEach(t => {
      t.examples.forEach(ex => {
        if (ex.title.toLowerCase().includes(q) || ex.desc.toLowerCase().includes(q) || ex.code.toLowerCase().includes(q)) {
          matchingExamples.push({ ...ex, topicTitle: t.title, topicId: t.id });
        }
      });
    });

    const matchingTopics = TOPICS_DATA.filter(t =>
      t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q)
    );

    main.innerHTML = `
      <div class="topic-container">
        <div class="section-head">
          <h2 class="section-head-title">Search Results for "${this.escapeHtml(query)}"</h2>
          <span style="font-size: 0.85rem; color: var(--text-muted);">${matchingTopics.length} modules, ${matchingExamples.length} code examples</span>
        </div>

        ${matchingTopics.length > 0 ? `
          <h3 style="font-size: 1.1rem; margin-bottom: 0.75rem;">Modules:</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;">
            ${matchingTopics.map(t => `
              <div class="qa-card" style="cursor: pointer;" onclick="location.hash='#topic/${t.id}'">
                <h4 style="color: var(--accent-ai); font-size: 1.1rem;">${t.title}</h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.25rem;">${t.summary}</p>
              </div>
            `).join("")}
          </div>
        ` : ''}

        ${matchingExamples.length > 0 ? `
          <h3 style="font-size: 1.1rem; margin-bottom: 0.75rem;">Code Examples:</h3>
          <div class="examples-grid">
            ${matchingExamples.map((ex, idx) => `
              <div class="qa-card">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">From ${ex.topicTitle}</div>
                <h4 style="font-size: 1.05rem; margin: 0.35rem 0; color: var(--text-primary);">${ex.title}</h4>
                <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${ex.desc}</p>
                <a href="#topic/${ex.topicId}" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.3rem 0.75rem;">
                  View in Module →
                </a>
              </div>
            `).join("")}
          </div>
        ` : ''}

        ${matchingTopics.length === 0 && matchingExamples.length === 0 ? `
          <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
            <h3>No results found for "${this.escapeHtml(query)}"</h3>
            <p style="margin-top: 0.5rem;">Try searching for keywords like "Spring AI", "HNSW", "PgVector", "BeanOutputConverter", or "Agent".</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
  window.app.init();
});

/**
 * AI for Java Developers - Interactive 100-Question Quiz Engine
 * Vanilla JavaScript with filtering, timer, immediate feedback, and score analysis
 */

class QuizEngine {
  constructor(questions) {
    this.allQuestions = questions || [];
    this.filteredQuestions = [...this.allQuestions];
    this.currentIndex = 0;
    this.userAnswers = {}; // { questionId: selectedIndex }
    this.bookmarks = new Set();
    this.startTime = null;
    this.timerInterval = null;
    this.elapsedSeconds = 0;
    this.selectedCategory = "all";
    this.selectedLevel = "all";
  }

  init() {
    this.applyFilters();
    this.startTimer();
    this.render();
  }

  applyFilters() {
    this.filteredQuestions = this.allQuestions.filter(q => {
      const matchCat = this.selectedCategory === "all" || q.category.toLowerCase() === this.selectedCategory.toLowerCase();
      const matchLevel = this.selectedLevel === "all" || q.level.toLowerCase() === this.selectedLevel.toLowerCase();
      return matchCat && matchLevel;
    });
    this.currentIndex = 0;
    this.render();
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.startTime = Date.now() - (this.elapsedSeconds * 1000);
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      this.updateTimerDisplay();
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  formatTime(totalSec) {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  updateTimerDisplay() {
    const el = document.getElementById("quiz-timer-display");
    if (el) {
      el.textContent = this.formatTime(this.elapsedSeconds);
    }
  }

  selectAnswer(questionId, optionIndex) {
    if (this.userAnswers[questionId] !== undefined) {
      return; // Already answered
    }
    this.userAnswers[questionId] = optionIndex;
    this.renderQuestionCard();
    this.updateStats();
  }

  nextQuestion() {
    if (this.currentIndex < this.filteredQuestions.length - 1) {
      this.currentIndex++;
      this.renderQuestionCard();
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderQuestionCard();
    }
  }

  jumpTo(index) {
    if (index >= 0 && index < this.filteredQuestions.length) {
      this.currentIndex = index;
      this.renderQuestionCard();
    }
  }

  toggleBookmark(questionId) {
    if (this.bookmarks.has(questionId)) {
      this.bookmarks.delete(questionId);
    } else {
      this.bookmarks.add(questionId);
    }
    this.renderQuestionCard();
  }

  calculateStats() {
    let correct = 0;
    let answered = 0;

    this.filteredQuestions.forEach(q => {
      const ans = this.userAnswers[q.id];
      if (ans !== undefined) {
        answered++;
        if (ans === q.correctIndex) {
          correct++;
        }
      }
    });

    const total = this.filteredQuestions.length;
    const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, answered, total, scorePct };
  }

  updateStats() {
    const stats = this.calculateStats();
    const answeredEl = document.getElementById("quiz-stat-answered");
    const correctEl = document.getElementById("quiz-stat-score");
    const progressFill = document.getElementById("quiz-progress-fill");

    if (answeredEl) answeredEl.textContent = `${stats.answered} / ${stats.total}`;
    if (correctEl) correctEl.textContent = `${stats.correct} (${stats.scorePct}%)`;
    if (progressFill) {
      const pct = stats.total > 0 ? (stats.answered / stats.total) * 100 : 0;
      progressFill.style.width = `${pct}%`;
    }
  }

  render() {
    const container = document.getElementById("quiz-view-root");
    if (!container) return;

    container.innerHTML = `
      <div class="quiz-wrapper">
        <!-- Top Toolbar -->
        <div class="quiz-header-bar">
          <div class="quiz-filters" style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
            <select id="quiz-cat-select" class="example-search-input" style="min-width: 160px;">
              <option value="all">All Categories (100 Questions)</option>
              <option value="foundations">GenAI Foundations</option>
              <option value="vectors">Vectors & Embeddings</option>
              <option value="rag">RAG Architecture</option>
              <option value="prompts">Prompts & Structured Output</option>
              <option value="tools">Tool Calling & Functions</option>
              <option value="agents">Autonomous Agents</option>
              <option value="architecture">System Design & Production</option>
            </select>

            <select id="quiz-level-select" class="example-search-input" style="min-width: 140px;">
              <option value="all">All Levels (0-15 YOE)</option>
              <option value="beginner">Beginner (0-3 YOE)</option>
              <option value="intermediate">Intermediate (3-7 YOE)</option>
              <option value="senior">Senior (7-12 YOE)</option>
              <option value="architect">Principal Architect (15+ YOE)</option>
            </select>
          </div>

          <div class="quiz-stats">
            <div class="quiz-stat-pill">Progress: <strong id="quiz-stat-answered">0 / 0</strong></div>
            <div class="quiz-stat-pill">Score: <strong id="quiz-stat-score">0 (0%)</strong></div>
            <div class="quiz-timer">
              ⏱️ <span id="quiz-timer-display">00:00</span>
            </div>
            <button class="btn btn-secondary" id="quiz-finish-btn" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">
              Finish & Review
            </button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="progress-bar-container" style="margin-bottom: 1.5rem; height: 4px;">
          <div id="quiz-progress-fill" class="progress-bar-fill" style="width: 0%;"></div>
        </div>

        <!-- Question Active Card -->
        <div id="quiz-card-placeholder"></div>
      </div>
    `;

    // Hook listeners
    const catSelect = document.getElementById("quiz-cat-select");
    const levelSelect = document.getElementById("quiz-level-select");
    const finishBtn = document.getElementById("quiz-finish-btn");

    if (catSelect) {
      catSelect.value = this.selectedCategory;
      catSelect.addEventListener("change", (e) => {
        this.selectedCategory = e.target.value;
        this.applyFilters();
      });
    }

    if (levelSelect) {
      levelSelect.value = this.selectedLevel;
      levelSelect.addEventListener("change", (e) => {
        this.selectedLevel = e.target.value;
        this.applyFilters();
      });
    }

    if (finishBtn) {
      finishBtn.addEventListener("click", () => this.showResultsModal());
    }

    this.renderQuestionCard();
    this.updateStats();
  }

  renderQuestionCard() {
    const cardContainer = document.getElementById("quiz-card-placeholder");
    if (!cardContainer) return;

    if (this.filteredQuestions.length === 0) {
      cardContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <h3>No questions match the selected category & level filter.</h3>
          <p style="margin-top: 0.5rem;">Try selecting "All Categories" or "All Levels".</p>
        </div>
      `;
      return;
    }

    const q = this.filteredQuestions[this.currentIndex];
    const isAnswered = this.userAnswers[q.id] !== undefined;
    const selectedAns = this.userAnswers[q.id];
    const isBookmarked = this.bookmarks.has(q.id);

    const levelBadgeClass = {
      "Beginner": "badge-blue",
      "Intermediate": "badge-amber",
      "Senior": "badge-purple",
      "Architect": "badge-rose"
    }[q.level] || "badge-blue";

    const optionsHtml = q.options.map((opt, idx) => {
      const letters = ["A", "B", "C", "D"];
      let stateClass = "";
      if (isAnswered) {
        if (idx === q.correctIndex) {
          stateClass = "correct";
        } else if (idx === selectedAns) {
          stateClass = "wrong";
        }
      }

      return `
        <div class="quiz-option ${stateClass}" onclick="window.quizEngine.selectAnswer(${q.id}, ${idx})">
          <div class="quiz-option-letter">${letters[idx]}</div>
          <div class="quiz-option-text">${opt}</div>
        </div>
      `;
    }).join("");

    let explanationHtml = "";
    if (isAnswered) {
      const isCorrect = selectedAns === q.correctIndex;
      explanationHtml = `
        <div class="quiz-explanation-box ${isCorrect ? 'correct' : 'wrong'}">
          <strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong>
          <p style="margin-top: 0.4rem; color: var(--text-primary);">${q.explanation}</p>
        </div>
      `;
    }

    cardContainer.innerHTML = `
      <div class="quiz-card">
        <div class="question-meta" style="justify-content: space-between;">
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <span class="badge ${levelBadgeClass}">${q.level}</span>
            <span class="badge" style="background: var(--bg-tertiary); color: var(--text-muted);">${q.category}</span>
            <span style="font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);">
              Question ${this.currentIndex + 1} of ${this.filteredQuestions.length}
            </span>
          </div>
          <button class="btn-icon" onclick="window.quizEngine.toggleBookmark(${q.id})" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}">
            ${isBookmarked ? '★' : '☆'}
          </button>
        </div>

        <h3 class="question-text">${q.question}</h3>

        <div class="options-list">
          ${optionsHtml}
        </div>

        ${explanationHtml}

        <!-- Bottom Navigation -->
        <div class="quiz-nav-footer">
          <button class="btn btn-secondary" onclick="window.quizEngine.prevQuestion()" ${this.currentIndex === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
            ← Previous
          </button>

          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Question ID: #${q.id}
          </div>

          <button class="btn btn-primary" onclick="window.quizEngine.nextQuestion()" ${this.currentIndex === this.filteredQuestions.length - 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
            Next Question →
          </button>
        </div>
      </div>
    `;
  }

  showResultsModal() {
    const stats = this.calculateStats();
    let rankTitle = "AI Apprentice";
    let rankColor = "#38bdf8";

    if (stats.scorePct >= 90) {
      rankTitle = "Principal AI Architect 🏆";
      rankColor = "#f43f5e";
    } else if (stats.scorePct >= 75) {
      rankTitle = "Senior AI Engineer ⭐";
      rankColor = "#a855f7";
    } else if (stats.scorePct >= 55) {
      rankTitle = "Mid-Level AI Developer 🚀";
      rankColor = "#10b981";
    }

    const modalHtml = `
      <div id="quiz-results-modal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 999; display: flex; align-items: center; justify-content: center; padding: 1.5rem; backdrop-filter: blur(8px);">
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-glow); border-radius: var(--radius-xl); max-width: 550px; width: 100%; padding: 2.5rem; text-align: center; box-shadow: var(--shadow-lg);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎯</div>
          <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem;">Assessment Complete</h2>
          <div style="display: inline-block; padding: 0.4rem 1rem; border-radius: var(--radius-full); background: rgba(99, 102, 241, 0.15); color: ${rankColor}; font-weight: 700; margin-bottom: 1.5rem;">
            Rank: ${rankTitle}
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; background: var(--bg-tertiary); padding: 1.25rem; border-radius: var(--radius-lg);">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">FINAL SCORE</div>
              <div style="font-size: 2rem; font-weight: 800; font-family: var(--font-mono); color: var(--text-primary);">${stats.scorePct}%</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">ACCURACY</div>
              <div style="font-size: 2rem; font-weight: 800; font-family: var(--font-mono); color: #34d399;">${stats.correct}/${stats.answered}</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">TIME SPENT</div>
              <div style="font-size: 1.4rem; font-weight: 700; font-family: var(--font-mono); color: var(--text-secondary);">${this.formatTime(this.elapsedSeconds)}</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">TOTAL ATTEMPTED</div>
              <div style="font-size: 1.4rem; font-weight: 700; font-family: var(--font-mono); color: var(--text-secondary);">${stats.answered}/${stats.total}</div>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: center;">
            <button class="btn btn-secondary" onclick="document.getElementById('quiz-results-modal').remove()">
              Review Answers
            </button>
            <button class="btn btn-primary" onclick="window.quizEngine.resetQuiz()">
              Retake Assessment ↺
            </button>
          </div>
        </div>
      </div>
    `;

    const existingModal = document.getElementById("quiz-results-modal");
    if (existingModal) existingModal.remove();

    document.body.insertAdjacentHTML("beforeend", modalHtml);
  }

  resetQuiz() {
    this.userAnswers = {};
    this.bookmarks.clear();
    this.currentIndex = 0;
    this.elapsedSeconds = 0;
    const modal = document.getElementById("quiz-results-modal");
    if (modal) modal.remove();
    this.startTimer();
    this.render();
  }
}

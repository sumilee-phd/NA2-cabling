const standards = {
  T568A: [
    { name: "흰초", color: "#f3f4f6", text: "#166534" },
    { name: "초", color: "#22c55e", text: "#ffffff" },
    { name: "흰주", color: "#fff7ed", text: "#c2410c" },
    { name: "파", color: "#3b82f6", text: "#ffffff" },
    { name: "흰파", color: "#eff6ff", text: "#1d4ed8" },
    { name: "주", color: "#fb923c", text: "#ffffff" },
    { name: "흰갈", color: "#faf5ef", text: "#92400e" },
    { name: "갈", color: "#8b5e3c", text: "#ffffff" }
  ],
  T568B: [
    { name: "흰주", color: "#fff7ed", text: "#c2410c" },
    { name: "주", color: "#fb923c", text: "#ffffff" },
    { name: "흰초", color: "#f3f4f6", text: "#166534" },
    { name: "파", color: "#3b82f6", text: "#ffffff" },
    { name: "흰파", color: "#eff6ff", text: "#1d4ed8" },
    { name: "초", color: "#22c55e", text: "#ffffff" },
    { name: "흰갈", color: "#faf5ef", text: "#92400e" },
    { name: "갈", color: "#8b5e3c", text: "#ffffff" }
  ]
};

const lessons = [
  {
    id: "b",
    title: "T568B 표준 배열",
    description: "국내 실습과 일반 랜 케이블 제작에서 가장 자주 접하는 배열입니다. 흰주-주로 시작하는 패턴을 먼저 고정하세요.",
    icon: "B",
    accent: "linear-gradient(135deg, #2f80ed, #60a5fa)",
    standard: "T568B"
  },
  {
    id: "a",
    title: "T568A 표준 배열",
    description: "흰초-초로 시작합니다. 1,2번 쌍과 3,6번 쌍의 교차를 비교하며 T568B와 차이를 익히는 것이 핵심입니다.",
    icon: "A",
    accent: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    standard: "T568A"
  },
  {
    id: "direct",
    title: "다이렉트 케이블",
    description: "양쪽 커넥터가 동일한 표준입니다. PC-스위치, 라우터-스위치 연결에서 기본으로 사용됩니다.",
    icon: "D",
    accent: "linear-gradient(135deg, #10b981, #34d399)",
    standard: "T568B"
  },
  {
    id: "cross",
    title: "크로스 케이블",
    description: "한쪽은 T568A, 다른쪽은 T568B를 사용합니다. 같은 종류 장비 간 직접 연결 문제와 함께 출제됩니다.",
    icon: "X",
    accent: "linear-gradient(135deg, #f59e0b, #fb923c)",
    standard: "T568A"
  }
];

const quizSet = [
  { left: "T568B", right: "T568B", answer: "direct", prompt: "양쪽 커넥터가 모두 T568B입니다. 케이블 종류는?" },
  { left: "T568A", right: "T568B", answer: "cross", prompt: "좌측은 T568A, 우측은 T568B입니다. 케이블 종류는?" },
  { left: "T568A", right: "T568A", answer: "direct", prompt: "양쪽 커넥터가 모두 T568A입니다. 케이블 종류는?" },
  { left: "T568B", right: "T568A", answer: "cross", prompt: "좌측은 T568B, 우측은 T568A입니다. 케이블 종류는?" }
];

const storageKey = "cabling-trainer-progress";
const defaultState = {
  lessonId: "b",
  quizIndex: 0,
  quizCorrect: 0,
  quizAnswered: 0,
  gameTarget: "T568A",
  gameSequence: [],
  gameAttempts: 0,
  gameSolved: 0,
  autoNext: true,
  motion: true,
  dailyGoal: "T568B 배열 정확도 90% 이상 달성",
  history: []
};

let state = loadState();

const screenTitle = document.getElementById("screen-title");
const dailyGoal = document.getElementById("daily-goal");
const learnModules = document.getElementById("learn-modules");
const lessonTitle = document.getElementById("lesson-title");
const lessonDescription = document.getElementById("lesson-description");
const lessonWires = document.getElementById("lesson-wires");
const pinLegend = document.getElementById("pin-legend");
const quizQuestion = document.getElementById("quiz-question");
const quizDiagram = document.getElementById("quiz-diagram");
const quizProgress = document.getElementById("quiz-progress");
const quizFeedback = document.getElementById("quiz-feedback");
const gameTarget = document.getElementById("game-target");
const gameSlots = document.getElementById("game-slots");
const wirePalette = document.getElementById("wire-palette");
const gameFeedback = document.getElementById("game-feedback");
const statsOverview = document.getElementById("stats-overview");
const accuracyChart = document.getElementById("accuracy-chart");
const activityList = document.getElementById("activity-list");
const goalInput = document.getElementById("goal-input");
const autoNextToggle = document.getElementById("auto-next-toggle");
const motionToggle = document.getElementById("motion-toggle");

renderModules();
bindNavigation();
bindQuiz();
bindGame();
bindSettings();
renderLearn();
renderQuiz();
renderGame();
renderSettings();
renderStats();
applyMotion();

function loadState() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : { ...defaultState };
  } catch (error) {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function addHistory(type, label, success) {
  const entry = {
    type,
    label,
    success,
    time: new Date().toLocaleString("ko-KR", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  state.history = [entry, ...state.history].slice(0, 8);
  saveState();
  renderStats();
}

function renderModules() {
  learnModules.innerHTML = "";
  lessons.forEach((lesson) => {
    const button = document.createElement("button");
    button.className = "module-card";
    button.innerHTML = `
      <div class="module-icon" style="background:${lesson.accent}">${lesson.icon}</div>
      <div>
        <strong>${lesson.title}</strong>
        <p>${lesson.description}</p>
      </div>
    `;
    button.addEventListener("click", () => {
      state.lessonId = lesson.id;
      saveState();
      renderLearn();
    });
    learnModules.appendChild(button);
  });
}

function renderLearn() {
  const lesson = lessons.find((item) => item.id === state.lessonId) || lessons[0];
  const standardName = lesson.id === "cross" ? "T568A / T568B" : lesson.standard;

  lessonTitle.textContent = lesson.title;
  lessonDescription.textContent = `${lesson.description} 현재 기준: ${standardName}`;
  lessonWires.innerHTML = "";
  pinLegend.innerHTML = "";

  const left = lesson.id === "cross" ? standards.T568A : standards[lesson.standard];
  left.forEach((wire, index) => {
    const item = createWireChip(wire, index + 1);
    lessonWires.appendChild(item);
  });

  const pinNotes = [
    "1-2번: 송신 또는 교차 핵심",
    "3-6번: 수신 또는 교차 핵심",
    "4-5번: 파랑 쌍",
    "7-8번: 갈색 쌍"
  ];

  pinNotes.forEach((note) => {
    const div = document.createElement("div");
    div.className = "legend-item";
    div.textContent = note;
    pinLegend.appendChild(div);
  });
}

function createWireChip(wire, pinNumber) {
  const item = document.createElement("div");
  item.className = "wire-chip";
  item.style.background = wire.color;
  item.style.color = wire.text;
  item.innerHTML = `<span>${pinNumber}번</span><strong>${wire.name}</strong>`;
  return item;
}

function renderQuiz() {
  const current = quizSet[state.quizIndex % quizSet.length];
  quizProgress.textContent = `${state.quizAnswered + 1} / 10`;
  quizQuestion.textContent = current.prompt;
  quizDiagram.innerHTML = connectorMarkup(current.left, current.right);
}

function connectorMarkup(leftName, rightName) {
  return `
    <div class="connector">
      <h4>좌측 ${leftName}</h4>
      <div class="pins">${standards[leftName].map((wire) => `<div class="pin" style="background:${wire.color}"></div>`).join("")}</div>
    </div>
    <div class="link-arrow">⇄</div>
    <div class="connector">
      <h4>우측 ${rightName}</h4>
      <div class="pins">${standards[rightName].map((wire) => `<div class="pin" style="background:${wire.color}"></div>`).join("")}</div>
    </div>
  `;
}

function bindQuiz() {
  document.querySelectorAll(".answer-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const current = quizSet[state.quizIndex % quizSet.length];
      const selected = button.dataset.answer;
      const correct = selected === current.answer;
      state.quizAnswered += 1;
      if (correct) {
        state.quizCorrect += 1;
      }

      quizFeedback.textContent = correct
        ? "정답입니다. 배열 비교를 정확히 했습니다."
        : `오답입니다. 정답은 ${current.answer === "direct" ? "다이렉트" : "크로스"}입니다.`;
      quizFeedback.className = `feedback ${correct ? "success" : "danger"}`;
      addHistory("quiz", `${current.left} / ${current.right}`, correct);

      if (state.quizAnswered >= 10) {
        const rate = Math.round((state.quizCorrect / state.quizAnswered) * 100);
        quizFeedback.textContent = `10문제 완료. 정답률 ${rate}%입니다. 다시 시작하며 이어서 훈련합니다.`;
        state.quizAnswered = 0;
        state.quizCorrect = 0;
      }

      state.quizIndex += 1;
      saveState();
      renderStats();

      if (state.autoNext) {
        setTimeout(renderQuiz, 700);
      }
    });
  });
}

function bindGame() {
  document.getElementById("undo-wire").addEventListener("click", () => {
    state.gameSequence.pop();
    saveState();
    renderGame();
  });

  document.getElementById("check-order").addEventListener("click", () => {
    if (state.gameSequence.length !== 8) {
      gameFeedback.textContent = "8개 색상을 모두 채운 뒤 정답을 확인하세요.";
      gameFeedback.className = "feedback danger";
      return;
    }

    state.gameAttempts += 1;
    const target = standards[state.gameTarget].map((wire) => wire.name).join(",");
    const answer = state.gameSequence.join(",");
    const correct = target === answer;

    if (correct) {
      state.gameSolved += 1;
      gameFeedback.textContent = `${state.gameTarget} 순서를 정확히 완성했습니다. 다음 문제로 넘어갑니다.`;
      gameFeedback.className = "feedback success";
      addHistory("game", `${state.gameTarget} 순서 완성`, true);
      state.gameTarget = state.gameTarget === "T568A" ? "T568B" : "T568A";
      state.gameSequence = [];
    } else {
      gameFeedback.textContent = "순서가 다릅니다. 1,2번과 3,6번 쌍부터 다시 비교하세요.";
      gameFeedback.className = "feedback danger";
      addHistory("game", `${state.gameTarget} 순서 도전`, false);
    }

    saveState();
    renderGame();
    renderStats();
  });
}

function renderGame() {
  gameTarget.textContent = state.gameTarget;
  gameSlots.innerHTML = "";
  wirePalette.innerHTML = "";

  const target = standards[state.gameTarget];
  for (let i = 0; i < 8; i += 1) {
    const value = state.gameSequence[i];
    const wire = target.find((item) => item.name === value);
    const slot = document.createElement("div");
    slot.className = `slot ${value ? "filled" : ""}`;
    if (wire) {
      slot.style.background = wire.color;
      slot.style.color = wire.text;
      slot.innerHTML = `<span>${i + 1}번</span><strong>${value}</strong>`;
    } else {
      slot.innerHTML = `<span>${i + 1}번</span><strong>비어 있음</strong>`;
    }
    gameSlots.appendChild(slot);
  }

  target.forEach((wire) => {
    const button = document.createElement("button");
    button.className = "wire-btn";
    button.textContent = wire.name;
    button.style.background = wire.color;
    button.style.color = wire.text;
    button.disabled = state.gameSequence.length >= 8;
    button.addEventListener("click", () => {
      if (state.gameSequence.length < 8) {
        state.gameSequence.push(wire.name);
        saveState();
        renderGame();
      }
    });
    wirePalette.appendChild(button);
  });
}

function bindSettings() {
  goalInput.value = state.dailyGoal;
  autoNextToggle.checked = state.autoNext;
  motionToggle.checked = state.motion;

  document.getElementById("save-settings").addEventListener("click", () => {
    state.dailyGoal = goalInput.value.trim() || defaultState.dailyGoal;
    state.autoNext = autoNextToggle.checked;
    state.motion = motionToggle.checked;
    saveState();
    renderSettings();
    applyMotion();
  });

  document.getElementById("reset-progress").addEventListener("click", () => {
    state = { ...defaultState };
    saveState();
    renderLearn();
    renderQuiz();
    renderGame();
    renderSettings();
    renderStats();
    applyMotion();
  });
}

function renderSettings() {
  dailyGoal.textContent = state.dailyGoal;
  goalInput.value = state.dailyGoal;
  autoNextToggle.checked = state.autoNext;
  motionToggle.checked = state.motion;
}

function renderStats() {
  const attempts = state.quizAnswered + state.history.filter((item) => item.type === "quiz").length;
  const recentQuizEntries = state.history.filter((item) => item.type === "quiz");
  const quizAccuracy = recentQuizEntries.length
    ? Math.round((recentQuizEntries.filter((item) => item.success).length / recentQuizEntries.length) * 100)
    : 0;
  const gameAccuracy = state.gameAttempts ? Math.round((state.gameSolved / state.gameAttempts) * 100) : 0;
  const studyDays = Math.max(1, Math.min(30, state.history.length + 1));

  statsOverview.innerHTML = `
    <div class="stat-card">
      <span class="eyebrow">학습 기록</span>
      <strong>${attempts}</strong>
      <span>누적 응답</span>
    </div>
    <div class="stat-card">
      <span class="eyebrow">유형 판별</span>
      <strong>${quizAccuracy}%</strong>
      <span>최근 정답률</span>
    </div>
    <div class="stat-card">
      <span class="eyebrow">순서 맞추기</span>
      <strong>${gameAccuracy}%</strong>
      <span>완성 성공률</span>
    </div>
  `;

  const bars = [
    { label: "월", value: clamp(40 + quizAccuracy * 0.4) },
    { label: "화", value: clamp(44 + gameAccuracy * 0.35) },
    { label: "수", value: clamp(48 + quizAccuracy * 0.32) },
    { label: "목", value: clamp(52 + gameAccuracy * 0.3) },
    { label: "금", value: clamp(58 + quizAccuracy * 0.22) },
    { label: "토", value: clamp(50 + studyDays * 3) }
  ];

  accuracyChart.innerHTML = bars
    .map((bar) => `
      <div class="bar-wrap">
        <div class="bar" style="height:${bar.value}%"></div>
        <span class="bar-label">${bar.label}</span>
      </div>
    `)
    .join("");

  activityList.innerHTML = state.history.length
    ? state.history
        .map(
          (item) =>
            `<li>${item.time} · ${item.label} · <span class="${item.success ? "success" : "danger"}">${item.success ? "성공" : "실패"}</span></li>`
        )
        .join("")
    : "<li>아직 기록이 없습니다. 퀴즈나 순서 맞추기를 시작하세요.</li>";
}

function clamp(value) {
  return Math.max(20, Math.min(100, Math.round(value)));
}

function bindNavigation() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.target;
      document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll(".screen").forEach((screen) => {
        screen.classList.toggle("active", screen.dataset.screen === target);
      });
      screenTitle.textContent = button.textContent;
      if (target === "stats") {
        renderStats();
      }
    });
  });
}

function applyMotion() {
  document.body.classList.toggle("reduced-motion", !state.motion);
}

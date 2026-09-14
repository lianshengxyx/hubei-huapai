const cardFiles = {
  上: "01-上.png",
  大: "02-大.png",
  人: "03-人.png",
  孔: "04-孔.png",
  乙: "05-乙.png",
  己: "06-已.png",
  化: "07-化.png",
  千: "08-千.png",
  子: "09-子.png",
  土: "10-土.png",
  可: "11-可.png",
  知: "12-知.png",
  礼: "13-礼.png",
  二: "14-二.png",
  三: "15-三.png",
  四: "16-四.png",
  五: "17-五.png",
  六: "18-六.png",
  七: "19-七.png",
  八: "20-八.png",
  九: "21-九.png",
  十: "22-十.png",
  别杠: "23-别杠.png",
};

const redCards = new Set(["上", "大", "人", "三", "五", "七", "可", "知", "礼"]);
const phrases = [
  ["上", "大", "人"],
  ["孔", "乙", "己"],
  ["可", "知", "礼"],
  ["十", "八", "九"],
  ["化", "三", "千"],
  ["七", "十", "土"],
  ["二", "四", "五", "六"],
];
const allCards = ["上", "大", "人", "孔", "乙", "己", "可", "知", "礼", "十", "八", "九", "化", "三", "千", "七", "土", "二", "四", "五", "六", "子", "别杠"];

function cardPath(char) {
  return `./assets/cards/${cardFiles[char]}`;
}

function cardColor(char) {
  return redCards.has(char) ? "红字" : "黑字";
}

function createCard(char, options = {}) {
  const card = document.createElement(options.button ? "button" : "article");
  card.className = `hua-card ${redCards.has(char) ? "red" : "black"}`;
  if (options.button) card.type = "button";
  card.setAttribute("aria-label", `${cardColor(char)}花牌 ${char}`);
  card.dataset.char = char;
  card.innerHTML = `<img src="${cardPath(char)}" alt="${cardColor(char)}花牌 ${char}" />`;
  return card;
}

function createCardMarkup(char) {
  return `<span class="hua-card ${redCards.has(char) ? "red" : "black"}"><img src="${cardPath(char)}" alt="${cardColor(char)}花牌 ${char}" /></span>`;
}

function renderCardTrack() {
  const track = document.querySelector("#cardTrack");
  track.replaceChildren();
  allCards.forEach((char) => {
    const card = createCard(char, { button: true });
    card.addEventListener("click", () => selectChallengeCard(card, challenges[challengeIndex]));
    track.appendChild(card);
  });
}

function wireCardControls() {
  const browser = document.querySelector(".card-browser");
  const prev = document.querySelector("#cardPrev");
  const next = document.querySelector("#cardNext");
  if (!browser || !prev || !next) return;

  const moveBy = () => Math.max(browser.clientWidth * 0.72, 320);
  prev.addEventListener("click", () => {
    browser.scrollBy({ left: -moveBy(), behavior: "smooth" });
  });
  next.addEventListener("click", () => {
    browser.scrollBy({ left: moveBy(), behavior: "smooth" });
  });
}

const challenges = [
  { answer: ["上", "大", "人"], pool: ["大", "孔", "人", "乙", "上", "己"] },
  { answer: ["孔", "乙", "己"], pool: ["己", "可", "孔", "礼", "乙", "大"] },
  { answer: ["化", "三", "千"], pool: ["化", "三", "千", "上", "乙", "人"] },
];

let challengeIndex = 0;
let picks = [];

function renderChallenge() {
  const challenge = challenges[challengeIndex];
  const title = document.querySelector("#challengeTitle");
  const result = document.querySelector("#challengeResult");
  const slots = [...document.querySelectorAll("#phraseSlots span")];

  picks = [];
  title.textContent = `请按顺序点出“${challenge.answer.join("")}”`;
  result.textContent = "等待选择";
  slots.forEach((slot) => {
    slot.textContent = "";
  });
  document.querySelectorAll("#cardTrack .hua-card").forEach((card) => {
    card.classList.remove("selected");
  });
}

function selectChallengeCard(card, challenge) {
  if (card.classList.contains("selected") || picks.length >= 3) return;
  card.classList.add("selected");
  picks.push(card.dataset.char);

  const slots = [...document.querySelectorAll("#phraseSlots span")];
  slots[picks.length - 1].textContent = card.dataset.char;

  if (picks.length === 3) {
    const matched = picks.join("") === challenge.answer.join("");
    document.querySelector("#challengeResult").textContent = matched
      ? `${challenge.answer.join("")} ✓`
      : "顺序还不对";
  }
}

function renderRuleCards() {
  const steps = [
    {
      index: "01",
      title: "认识你的牌",
      visual: ["上", "大", "人"].map(createCardMarkup).join(""),
      href: "./play-cards.html",
    },
    {
      index: "02",
      title: "组成一句",
      visual: ["孔", "乙", "己"].map(createCardMarkup).join(""),
      href: "./play-phrases.html",
    },
    {
      index: "03",
      title: "出牌规则",
      visual: `<span class="draw-flow" aria-label="摸牌后出牌">${createCardMarkup("化")}<b>→</b>${createCardMarkup("千")}</span>`,
      href: "./play-rules.html",
      className: "rule-card-play",
    },
    {
      index: "04",
      title: "吃 / 碰 / 过",
      visual: '<span class="action-bubbles"><span>吃</span><span>碰</span><span>过</span></span>',
      href: "./play-actions.html",
    },
    {
      index: "05",
      title: "完成一手",
      visual: `<span class="hand-of-cards" aria-label="收成一手牌">${["上", "大", "人", "可", "知"].map(createCardMarkup).join("")}</span>`,
      href: "./play-experience.html",
      className: "rule-card-finish",
    },
  ];

  const container = document.querySelector("#ruleCards");
  container.innerHTML = steps
    .map(
      (step) => `
        <a class="rule-card ${step.className || ""}" href="${step.href}">
          <b>${step.index}</b>
          <strong>${step.title}</strong>
          <div class="rule-visual">${step.visual}</div>
        </a>
      `
    )
    .join("");
}

function observeSections() {
  const links = [...document.querySelectorAll(".chapter-nav a")];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === entry.target.id);
        });
      });
    },
    { rootMargin: "-38% 0px -56% 0px", threshold: 0 }
  );
  document.querySelectorAll("[data-observe]").forEach((section) => observer.observe(section));
}

document.querySelector("#nextChallenge").addEventListener("click", () => {
  challengeIndex = (challengeIndex + 1) % challenges.length;
  renderChallenge();
});

renderCardTrack();
wireCardControls();
renderChallenge();
renderRuleCards();
observeSections();

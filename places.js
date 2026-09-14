const regions = {
  jingzhou: {
    state: "已开放",
    title: "荆州",
    description: "从牌面图鉴、组句规则到地方口述，先从一副荆州花牌进入这座城的日常记忆。",
  },
  songzi: {
    state: "内容整理中",
    title: "松滋",
    description: "正在整理松滋当地的牌面、玩法与口述资料。这里将保留不同地区之间的相同与差异。",
  },
  enshi: {
    state: "内容整理中",
    title: "恩施",
    description: "正在补充恩施的地方资料。后续会以牌面、玩法和人物故事呈现这一支花牌记忆。",
  },
};

const detail = document.querySelector("#mapDetail");
const pins = [...document.querySelectorAll(".region-pin")];

pins.forEach((pin) => {
  pin.addEventListener("click", () => {
    const region = regions[pin.dataset.region];
    pins.forEach((item) => {
      const active = item === pin;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    detail.replaceChildren();
    const state = document.createElement("b");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    state.textContent = region.state;
    title.textContent = region.title;
    description.textContent = region.description;
    detail.append(state, title, description);
  });
});

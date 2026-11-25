{
const S = window.SITE, P = window.PROJECTS, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const em = s => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>").replace(/\n/g, "<br>");
const ph = s => /\[.*\]/.test(s) ? ` class="ph"` : "";
const IMG = k => `img/${k}.jpg`;
const im = (k, alt = "", cls = "") => `<img src="${IMG(k)}" alt="${esc(alt)}" loading="lazy" ${cls ? `class="${cls}"` : ""} data-zoom>`;
const AR = k => (window.FIGMA_AR || {})[k];
const imc = k => AR(k) ? `<img src="${IMG(k)}" alt="" loading="lazy" data-zoom style="aspect-ratio:${AR(k)};object-fit:cover;width:100%">` : im(k);
const CAT = { uxui: "UX/UI", character: "CHARACTER", graphic: "GRAPHIC", ai: "AI" };
const app = $("#app");
let pendingCat = null;

/* ---------- order ---------- */
const ids = Object.keys(P);
const allSorted = (S.MORE_ORDER || ids.slice().sort((a, b) => P[b].sortKey.localeCompare(P[a].sortKey))).filter(i => P[i]);
const allOrder = allSorted; // NEXT PROJECT도 All Work 순서를 따름

/* ---------- shared ---------- */
const nav = (active) => `<header class="nav"><div class="in"><a class="logo" href="#top">SEYEON YANG</a>
<nav class="menu">${[["about", "About"], ["work", "Work"], ["awards", "Awards"], ["resume", "Resume"], ["contact", "Contact"]].map(([h, t]) => `<a href="#${h}" class="${active === h ? "on" : ""}">${t}</a>`).join("")}</nav></div><div class="progress"></div></header>`;
const setVars = p => { const r = document.documentElement.style; const v = p || P.orbit;
  r.setProperty("--acc", v.acc); r.setProperty("--acct", v.accText || v.acc); r.setProperty("--acc2", v.acc2); r.setProperty("--tint", v.tint); r.setProperty("--accl", v.accl); r.setProperty("--onacc", v.onAcc || "#fff"); };
const tagrow = t => `<div class="tagrow">${t.map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>`;

/* ---------- HOME ---------- */
function home() {
  setVars(P.orbit);
  app.innerHTML = nav("") + `
<section class="hero" id="top"><div class="blobs" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="wrap">
<h1><span class="ln"><span>SEYEON'S</span></span><span class="ln"><span>PORTFOLIO</span></span></h1>
<p class="lead">UX/UI 디자이너 양세연입니다.<br>필요하면 새로운 도구도 배워서, 직접 끝까지 만들어 봅니다.</p>
<div class="tags">${[["UX/UI", "work-uxui"], ["AI", "work-ai"], ["CHARACTER", "work-character"]].map(([t, h]) => `<a href="#${h}">${t}</a>`).join("")}</div></div></section>

<section class="sec" id="about"><div class="wrap">
<div class="shead"><h2 class="stitle" data-r>About</h2></div>
<div class="about"><h3 data-r>사용자를 이해하고,<br>상상을 실제 경험으로 만듭니다.</h3>
<div class="txt" data-r>
<div class="bio"><p>기획부터 UX/UI, 캐릭터, AI, 구현까지. 필요한 방법을 탐구하며 아이디어를 실제 작동하는 서비스로 완성하는 디자이너입니다.</p>
<p>사용자가 불편해하거나 필요로 하는 것에서 출발해 서비스를 기획하고 디자인합니다. 시간 배분 앱 완주, 관심으로 나를 이해하는 ORBIT, 휠체어 사용자의 이동을 돕는 ONVIA를 만들었습니다. 리서치와 UT로 방향을 정하고, 캐릭터·3D·생성형 AI로 비주얼을 만들며, 필요하면 바이브코딩으로 직접 구현해 검증합니다. 완주는 팀과 함께 iOS에 출시했습니다.</p>
<p>일본 학생들과의 워크숍, 다른 학교와의 협업 전시, 직접 꾸린 창업 동아리까지 낯선 팀과 처음 해 보는 일에도 먼저 손을 들어 왔습니다. 모르는 건 배워서 하고, 맡은 일은 끝까지 해냅니다.</p></div>
<div class="kw">${[["리서치 · UT", "p-wanju"], ["서비스 기획", "p-orbit"], ["UX/UI 디자인", "work-uxui"], ["캐릭터 · 3D", "work-character"], ["AI 비주얼 · 바이브코딩", "work-ai"]].map(([t, h]) => `<a class="chip" href="#${h}">${t}</a>`).join("")}</div>
<div class="hlt"><div><b>iOS 출시</b><span>WANJU · 직접 제안한 팀 프로젝트</span></div><div><b>SILVER AWARD</b><span>Global Design Workshop 2025</span></div><div><b>Web MVP</b><span>ORBIT 졸업전시 · 1인 구현</span></div></div>
<a class="btn" href="#resume">이력서 보기 →</a></div></div></div></section>

<section id="work"><div class="wrap">
<div class="shead"><h2 class="stitle" data-r>Selected Work</h2><span class="cnt">03</span></div>
<div class="feat">${S.FEATURED.map(id => featCard(id)).join("")}</div></div></section>

<section id="more"><div class="wrap">
<div class="shead"><h2 class="stitle" data-r>All Work</h2>
<div class="filter" role="tablist">${[["all", "ALL"], ["uxui", "UX/UI"], ["character", "CHARACTER"], ["graphic", "GRAPHIC"], ["ai", "AI"]].map(([k, t], i) => `<button role="tab" data-f="${k}" class="${i ? "" : "on"}">${t}</button>`).join("")}</div></div>
<div class="grid">${allSorted.map(id => card(id)).join("")}</div></div></section>

<section class="sec awards" id="awards"><div class="wrap">
<div class="shead"><h2 class="stitle" data-r>Awards</h2><span class="cnt">${String(window.AWARDS.length).padStart(2, "0")}</span></div>
<div class="agrid">${window.AWARDS.map(a => `<article class="aw" data-r>
<div class="im ${a.noimg ? "noimg" : ""}">${a.noimg ? "" : `<img src="${IMG(a.img)}" alt="${esc(a.t)}" loading="lazy">`}
<div class="cap"><div class="cb"><span class="pill">🏆 ${esc(a.b)}</span><span>${esc(a.t)} · ${esc(a.d)}</span></div><b>${esc(a.w[0])}</b><p>${esc(a.w[1])}</p><small>내가 한 일 · ${esc(a.w[2])}</small></div></div></article>`).join("")}</div></div></section>
` + contact();
  bindHome();
}
function featCard(id) {
  const p = P[id], c = p.card;
  const vis = `<img class="fimg" src="${IMG("fv_" + id)}" alt="${esc(p.title)}">`;
  return `<article class="fcard" data-go="${id}" data-r style="--c1:${p.cardBg};--fb:${p.featBg || p.tint}" data-cursor="View">
<div class="fvis">${vis}</div>
<div class="finfo"><h3>${esc(p.title)}</h3><p class="one">${esc(c.featOne || p.one)}</p><p class="d">${esc(c.desc)}</p>${tagrow(c.chips || c.tags)}
<span class="date">${esc(p.period)}</span>
<div class="acts"><span class="btn">자세히 보기 →</span>${id === "orbit" ? `<a class="btn ghost" href="${S.orbitUrl}" target="_blank" rel="noopener" data-stop>직접 체험하기 ↗</a>` : ""}</div></div></article>`;
}
function card(id) {
  const p = P[id], c = p.card;
  return `<article class="card" data-go="${id}" data-cats="${p.cats.join(" ")}" style="--c1:${p.tint}" data-cursor="View" data-r>
<div class="th"><img src="${IMG("th_" + id)}" alt="${esc(p.title)}" loading="lazy"><span class="go" aria-hidden="true">→</span></div>
<div class="info"><h4>${esc(p.title)}</h4><p>${esc(c.allDesc || c.desc)}</p>${c.role ? `<p class="role">${esc(c.role)}</p>` : ""}${tagrow(c.tags || c.chips)}</div></article>`;
}
const contact = () => `<section class="contact" id="contact"><div class="wrap"><h2 data-r><span>무엇이든 배우고,</span><br><span>끝까지 해내겠습니다.</span></h2>
<div class="mails">${S.emails.map(m => `<button data-copy="${m}">${m} <small>복사</small></button>`).join("")}${S.phone ? `<button data-copy="${S.phone}">${S.phone} <small>복사</small></button>` : ""}</div>
<div class="foot"><span>© 2026 Yang Seyeon · UX/UI Designer</span><button class="up" data-top aria-label="맨 위로">↑</button></div></div></section>`;

function bindHome() {
  $(".filter").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; setFilter(b.dataset.f); });
  $$(".fcard,.card").forEach(c => { const v = $("video", c); if (!v) return; c.addEventListener("mouseenter", () => v.play().catch(() => { })); c.addEventListener("mouseleave", () => v.pause()); });
}
let curFilter = "all";
function setFilter(k) {
  curFilter = k; const f = $(".filter"); if (!f) return;
  $$("button", f).forEach(b => b.classList.toggle("on", b.dataset.f === k));
  let n = 0;
  $$(".grid .card").forEach((c, i) => {
    const show = k === "all" || c.dataset.cats.split(" ").includes(k);
    c.classList.toggle("hide", !show);
    if (show) { n++; c.animate([{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "none" }], { duration: 600, delay: n * 50, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" }); c.classList.add("in"); }
  });
}

/* ---------- DETAIL ---------- */
function head(label, h, b) { return `<div class="head" data-r><span class="lbl">${esc(label)}</span><h2>${em(h)}</h2>${b ? `<p>${em(b)}</p>` : ""}</div>`; }
const donut = (pct, lab) => { const r = 34, C = 2 * Math.PI * r; return `<div class="donut"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="${r}" fill="none" stroke="var(--panel)" stroke-width="10"/><circle class="v" cx="40" cy="40" r="${r}" fill="none" stroke-width="10" stroke-linecap="round" transform="rotate(-90 40 40)" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C * (1 - pct / 100)}"/><text x="40" y="45" text-anchor="middle" font-size="15" font-weight="700" fill="var(--ink)">${pct}%</text></svg><span>${esc(lab)}</span></div>`; };
const bars = (rows, max = 100) => `<div class="bars">${rows.map(([l, v, d]) => `<div class="r"><span>${esc(l)}</span><div class="tr"><i data-w="${(v / max) * 100}%"></i></div><b>${esc(d)}</b></div>`).join("")}</div>`;
const insb = ([a, b]) => `<div class="ins"><b>${esc(a)}</b>${b ? `<span>${esc(b)}</span>` : ""}</div>`;
function side(p) {
  return `<div class="side"><h1>${esc(p.title)}${p.sub ? `<small>${esc(p.sub)}</small>` : ""}</h1><p class="one">${esc(p.one)}</p>
<div class="tg">${p.tags.map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>
<dl>${p.meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd${ph(v)}>${esc(v)}</dd></div>`).join("")}</dl>
${p.cta ? (p.cta.video ? `<button class="btn" data-video="${p.video}">${esc(p.cta.t)}</button>` : `<a class="btn" href="${esc(p.cta.href)}" ${p.cta.href.startsWith("http") ? 'target="_blank" rel="noopener"' : 'data-todo="링크 준비 중"'}>${esc(p.cta.t)}</a>`) : ""}</div>`;
}
function cover(p) { return coverRaw(p); }
function coverRaw(p) {
  const id = Object.keys(P).find(k => P[k] === p);
  if (id) return `<div class="cover" data-r style="aspect-ratio:860/534;height:auto">${im("cv_" + id, p.title)}${p.video ? `<button class="btn ghost play" data-video="${p.video}">▶ ${id === "onvia" ? "시나리오 영상" : "소개 영상"}</button>` : ""}</div>`;
  const c = p.ov.cover;
  if (c.kind === "phones") return `<div class="cover phones" data-r style="background:linear-gradient(135deg,${c.bg[0]},${c.bg[1]})">${c.keys.map(k => im(k)).join("")}${p.video ? `<button class="btn ghost play" data-video="${p.video}">▶ 소개 영상</button>` : ""}</div>`;
  if (c.kind === "posters") return `<div class="cover posters" data-r style="background:linear-gradient(135deg,${c.bg[0]},${c.bg[1]})">${c.keys.map(k => im(k)).join("")}</div>`;
  if (c.kind === "video") return `<div class="cover" data-r style="background:#111 url(${IMG(c.poster)}) center/cover;aspect-ratio:16/9"><video src="${c.src}" poster="${IMG(c.poster)}" autoplay muted loop playsinline></video><button class="btn ghost play" data-video="${p.video}">▶ 시나리오 영상 전체 보기</button></div>`;
  return `<div class="cover" data-r>${im(c.key, p.title)}</div>`;
}
function solution(it) {
  const L = it.lay;
  if (L === "annot") {
    const notes = `<div class="notes">${it.notes.map(([t, d]) => `<div class="note"><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join("")}</div>`;
    const shot = `<div class="shot">${im(it.main)}${it.bubble ? `<div class="bubble"><b>${esc(it.bubble[0])}</b>${esc(it.bubble[1])}</div>` : ""}</div>`;
    const strip = it.strip ? `<div class="stripw">${it.stripTitle ? `<small>${esc(it.stripTitle)}</small>` : ""}<div class="s">${it.strip.map(([k, c]) => `<figure>${im(k)}<figcaption>${esc(c)}</figcaption></figure>`).join("")}</div></div>` : "";
    return `<div class="panel annot ${it.strip ? "strip" : ""} ${it.flip ? "flip" : ""}" data-r>${shot}${notes}${strip}</div>`;
  }
  if (L === "pair") return `<div class="pair" data-r>${it.panels.map(pp => `<div class="panel"><div><b>${esc(pp.t)}</b>${pp.d ? `<p>${esc(pp.d)}</p>` : ""}</div><div class="ims" style="--w:${pp.w || 210}px">${pp.keys.map(k => im(k)).join("")}</div></div>`).join("")}</div>`;
  if (L === "split") return `<div class="split" data-r><div class="panel lp">${it.left.map(c => `<div><b>${esc(c.t)}</b><p>${esc(c.d)}</p>${c.chips ? `<div class="chips">${c.chips.map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>` : ""}${im(c.key)}</div>`).join("")}</div>
<div class="panel rules"><b>${esc(it.rules.t)}</b>${it.rules.d ? `<p>${esc(it.rules.d)}</p>` : ""}${it.rules.items.map(([a, b], i) => `<div class="rl"><i>${i + 1}</i><div><b>${esc(a)}</b><span>${esc(b)}</span></div></div>`).join("")}</div></div>`;
  if (L === "wide") return `<div class="panel wide ${it.tall ? "tall" : ""}" data-r>${it.imgs ? `<div class="ims">${it.imgs.map(([k, c]) => `<figure>${im(k)}<figcaption>${esc(c)}</figcaption></figure>`).join("")}</div>` : imc(it.img)}
${it.notes ? `<div class="wnotes">${it.notes.map(([t, d], i) => `<div><b><i>${i + 1}</i>${esc(t)}</b><p>${esc(d)}</p></div>`).join("")}</div>` : ""}</div>`;
  if (L === "flow") return flowc(it.steps, it.hl);
  return "";
}
const flowc = (steps, hl) => `<div class="flowc" data-r>${steps.map(([t, d], i) => `${i ? `<div class="ar">→</div>` : ""}<div class="${i === hl ? "hl" : ""}"><b>${esc(t)}</b><span>${esc(d)}</span></div>`).join("")}</div>`;
function doc(p) {
  const m = p.more;
  const blk = b => { const [k, a, c, d] = b;
    if (k === "p") return `<p class="p">${em(a)}</p>`; if (k === "h3") return `<h5>${esc(a)}</h5>`;
    if (k === "flow") return flowc(a, c).replace(" data-r", "");
    if (k === "table") return `<div class="tbl"><table><thead><tr>${a.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${c.map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    if (k === "callout") return `<div class="callout ${c ? "t" : ""}"><span>${a}</span><span>${esc(c === true ? b[2] : b[2])}</span></div>`.replace(`<span>${esc(b[2])}</span></div>`, `<span>${esc(b[2])}</span></div>`);
    if (k === "props") return `<div class="props">${a.map(([x, y]) => `<div><span>${esc(x)}</span><b${ph(y)}>${esc(y)}</b></div>`).join("")}</div>`;
    if (k === "bul") return `<ul class="bul">${a.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
    if (k === "imgs") return `<div class="ims">${a.map(([x, y]) => `<figure>${im(x)}<figcaption>${esc(y)}</figcaption></figure>`).join("")}</div>`;
    if (k === "tree") return `<div class="tree">${a.map(([s, t, items]) => `<div><div class="h"><small>${esc(s)}</small><b>${esc(t)}</b></div>${items.map(x => `<div class="i">└ ${esc(x)}</div>`).join("")}</div>`).join("")}</div>`;
    return ""; };
  return `<div class="more" id="ux"><button aria-expanded="false"><div><b>UX 더보기</b><span>${esc(m.sub)}</span></div><i>펼치기 +</i></button>
<div class="mbody"><div><div class="doc"><div class="intro"><h3>${esc(p.title)} — UX 상세</h3><p>${esc(m.intro)}</p><div class="jump">${m.secs.map((s, i) => `<a href="#" data-j="ux-${i}">↳ ${esc(s.t)}</a>`).join("")}</div></div>
${m.secs.map((s, i) => `<section id="ux-${i}"><h4>${esc(s.t)}<span>${esc(s.sub)}</span></h4>${s.blocks.map(b => b[0] === "callout" ? `<div class="callout ${b[3] ? "t" : ""}"><span>${b[1]}</span><span>${esc(b[2])}</span></div>` : blk(b)).join("")}</section>`).join("")}</div></div></div></div>`;
}
function detail(id) {
  const p = P[id]; setVars(p);
  const S2 = [];
  const ov = p.ov;
  S2.push(["Overview", `${head("PROJECT OVERVIEW", ov.h, ov.b)}${cover(p)}`]);
  const bg = p.bg;
  let bgc = "";
  if (bg.stat) bgc = `<div class="wcard" data-r><div class="chead"><b>${esc(bg.stat.t)}</b><span>${esc(bg.stat.m)}</span></div><div class="sbar">${bg.stat.segs.map(([v]) => `<div data-w="${v}%">${v}%</div>`).join("")}</div><div class="lg">${bg.stat.segs.map(([v, l], i) => `<span><i style="background:${i ? "#D9DCE6" : "var(--acc)"}"></i>${esc(l)}</span>`).join("")}</div></div>`;
  if (bg.nums) bgc = `<div class="wcard" data-r><div class="chead"><b>${esc(bg.numsT || "데이터로 본 배경")}</b></div><div class="nums">${bg.nums.map(([v, l, s]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span>${s ? `<small>${esc(s)}</small>` : ""}</div>`).join("")}</div></div>`;
  S2.push(["Background", `${head("BACKGROUND", bg.h, bg.b)}<div class="stk">${bgc}<div class="boxes" data-r style="--n:${bg.boxes.length}">${bg.boxes.map(([t, d], i, a) => `<div class="${i === a.length - 1 ? "last" : ""}"><small>0${i + 1}</small><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join("")}</div></div>`]);
  if (p.rs) { const r = p.rs; let h = "";
    if (r.sv) { const side2 = s => `<div><h4>${esc(s.t)}</h4>${s.donuts ? `<div class="donuts">${s.donuts.map(([v, l]) => donut(v, l)).join("")}</div>` : s.bars ? bars(s.bars, s.max) : s.quotes ? `<div class="quotes">${s.quotes.map(([q, w]) => `<div>"${esc(q)}"${w ? `<small>${esc(w)}</small>` : ""}</div>`).join("")}</div>` : "<div></div>"}${s.ins ? insb(s.ins) : ""}</div>`;
      h += `<div class="wcard" data-r><div class="chead"><b>${esc(r.sv.t)}</b><span>${esc(r.sv.m)}</span></div><div class="cols2">${side2(r.sv.l)}${side2(r.sv.r)}</div>${r.sv.ins ? insb(r.sv.ins) : ""}</div>`; }
    if (r.iv) h += `<div class="wcard" data-r><div class="chead"><b>${esc(r.iv.t)}</b><span>${esc(r.iv.m)}</span></div><div class="ivg" style="--n:${r.iv.items.length}">${r.iv.items.map(([c, n, q]) => `<div><span class="c">${esc(c)}</span><b>${esc(n)}</b>${q ? `<p>${/^→/.test(q) ? esc(q) : `"${esc(q)}"`}</p>` : ""}</div>`).join("")}</div></div>`;
    if (r.sum) h += `<div class="sum" data-r>${em(r.sum)}</div>`;
    S2.push([r.label === "INSIGHT" ? "Insight" : "Research", head(r.label || "USER RESEARCH", r.h, r.b) + `<div class="stk s20">${h}</div>`]); }
  if (p.dir) S2.push([p.dir.label ? p.dir.label.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : "Design Direction", `${head(p.dir.label || "DESIGN DIRECTION", p.dir.h, p.dir.b)}<div class="kcards" data-r style="--n:${p.dir.cards.length}">${p.dir.cards.map(([a, b, c]) => `<div><small>${esc(a)}</small><b>${esc(b)}</b><p>${esc(c)}</p></div>`).join("")}</div>`]);
  S2.push([p.sol.label === "APPLICATIONS" ? "Applications" : "Solution", (p.sol.noHead ? "" : head(p.sol.label || "SOLUTION", p.sol.h, p.sol.b)) + p.sol.items.map((it, i) => `<div class="solh" data-r ${it.cat ? `data-cat="${it.cat}"` : ""}><small>${String(i + 1).padStart(2, "0")}. ${esc(it.kw)}</small><h3>${em(it.t)}</h3><p>${esc(it.d)}</p></div>${solution(it)}`).join("")]);
  if (p.cw) { const w = p.cw; S2.push(["Character & World", `${head("CHARACTER & WORLD", w.h, w.b)}<div class="kcards" data-r style="--n:${w.cards.length}">${w.cards.map(([a, b, c]) => `<div><small>${esc(a)}</small><b>${esc(b)}</b><p>${esc(c)}</p></div>`).join("")}</div><div class="cwimg" data-r><img src="${IMG(w.img)}" alt="${esc(w.alt)}" loading="lazy" onerror="this.parentNode.remove()"></div>`]); }
  if (p.fin) { const f = p.fin; let v;
    if (f.keys) v = `<div class="final phones" data-r style="background:linear-gradient(135deg,${f.bg[0]},${f.bg[1]})">${f.keys.map(k => im(k)).join("")}</div>`;
    else if (f.posters) v = `<div class="final posters" data-r>${f.posters.map(k => im(k)).join("")}</div>`;
    else v = `<div class="final ${f.tall && !AR(f.img) ? "tall" : ""}" data-r>${imc(f.img)}</div>`;
    if (f.video) v += `<div data-r><button class="btn acc" data-video="${p.video}">▶ 영상 전체 보기</button></div>`;
    S2.push([f.label === "BRANDING" ? "Branding" : "Final Output", head(f.label || "FINAL OUTPUT", f.h, f.b) + v]); }
  S2.push(["Result & Insight", `${head("RESULT & INSIGHT", "결과와 배운 점")}<div class="stk s14"><div class="rnum" data-r style="--n:${p.res.nums.length}">${p.res.nums.map(([v, l, s]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span><small>${esc(s)}</small></div>`).join("")}</div><div class="rnum rins" data-r style="--n:${p.res.ins.length}">${p.res.ins.map(([k, t]) => `<div><small>${esc(k)}</small><b>${esc(t)}</b></div>`).join("")}</div></div>`]);
  const idx = allOrder.indexOf(id), nid = allOrder[(idx + 1) % allOrder.length], np = P[nid];
  app.innerHTML = nav("work") + `<main class="dpage"><div class="wrap dbody">${side(p)}<div class="content">${S2.map(([t, h], i) => `<section class="dsec" id="s-${i}" data-t="${esc(t)}">${h}</section>`).join("")}${p.more ? doc(p) : ""}</div></div>${toc()}</main>
<section class="next" data-go="${nid}" data-cursor="Next" style="--tint:${np.tint}"><div class="wrap"><div><span class="lbl" style="color:var(--sub);font-size:13px">NEXT PROJECT</span><h3>${esc(np.title)} →</h3></div><img src="${IMG("th_" + nid)}" alt=""></div></section>
<footer class="dfoot"><div class="wrap"><span>© 2026 Yang Seyeon</span><button data-top>Top ↑</button></div></footer>`;
  const more = $("#ux");
  if (more) $("button", more).onclick = () => toggleMore();
  bindToc();
}
/* 노션식 목차 — 오른쪽에 짧은 선, 마우스를 올리면 제목 목록이 펼쳐짐 */
function toc() { return `<nav class="ntoc" aria-label="목차"><div class="bars"></div><div class="list"></div></nav>`; }
function bindToc() {
  const nt = $(".ntoc"); if (!nt) return;
  const items = [];
  $$(".dsec").forEach(s => { items.push({ el: s, t: s.dataset.t, lv: 0 });
    $$(".solh", s).forEach((h, i) => { if (!h.id) h.id = s.id + "-" + i; items.push({ el: h, t: h.querySelector("small").textContent.replace(/^\d+\.\s*/, ""), lv: 1 }); }); });
  if ($("#ux")) items.push({ el: $("#ux"), t: "UX 더보기", lv: 0, ux: true });
  $(".bars", nt).innerHTML = items.map(it => `<i class="${it.lv ? "sub" : ""}"></i>`).join("");
  $(".list", nt).innerHTML = items.map(it => `<a href="#" class="${it.lv ? "sub" : ""}" data-j="${it.ux ? "ux" : it.el.id}">${esc(it.t)}</a>`).join("");
  const bars = $$(".bars i", nt), links = $$(".list a", nt);
  const upd = () => { let k = 0; items.forEach((it, i) => { if (it.el.getBoundingClientRect().top < innerHeight * .35) k = i; });
    bars.forEach((b, i) => b.classList.toggle("on", i === k)); links.forEach((a, i) => a.classList.toggle("on", i === k)); };
  if (window._tocUpd) removeEventListener("scroll", window._tocUpd);
  window._tocUpd = () => { if (document.body.contains(nt)) upd(); }; addEventListener("scroll", window._tocUpd, { passive: true }); upd();
}
function toggleMore(force) {
  const m = $("#ux"); if (!m) return; const open = force ?? !m.classList.contains("open");
  m.classList.toggle("open", open); $("button", m).setAttribute("aria-expanded", open); $("button i", m).textContent = open ? "접기 −" : "펼치기 +";
}

/* ---------- RESUME ---------- */
function resume() {
  setVars(P.orbit); const R = window.RESUME;
  const rows = rs => rs.map(([d, t, s, tags, badge, link]) => `<div class="rrow" data-r><span class="dt">${esc(d)}</span><div><h3>${esc(t)}${badge ? `<span class="bd">${esc(badge)}</span>` : ""}${link ? `<a href="#p-${link}">작업 보기 →</a>` : ""}</h3>${s ? `<p>${esc(s)}</p>` : ""}${tags ? `<div class="chips">${tags.map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>` : ""}</div></div>`).join("");
  const sec = (en, ko, inner, n) => `<section class="rsec" id="r-${en.toLowerCase()}"><div class="rh"><h2>${esc(en)}<span>${esc(ko)}</span></h2>${n != null ? `<span>${String(n).padStart(2, "0")}</span>` : ""}</div>${inner}</section>`;
  app.innerHTML = nav("resume") + `<main class="dpage rpage"><div class="wrap dbody"><div class="side"><span class="lbl">RESUME</span><h1>양세연<small>Yang Seyeon</small></h1>
<b>UX/UI · Character Designer</b><p class="one" style="font-weight:400;color:var(--body);font-size:14px">서비스 기획과 UX/UI 디자인을 하고, 생성형 AI와 바이브코딩으로 직접 구현까지 합니다. 처음 해 보는 일도 배우면서 끝까지 해냅니다.</p>
<dl>${S.emails.map(m => `<div><dt>Email</dt><dd>${m}</dd></div>`).join("")}${S.phone ? `<div><dt>Phone</dt><dd>${S.phone}</dd></div>` : ""}<div><dt>School</dt><dd>국민대학교 AI디자인학과 · 2027.02 졸업 예정</dd></div></dl>
<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-todo="PDF 파일을 연결하면 바로 내려받을 수 있어요">PDF 다운로드 ↓</button><a class="btn ghost" href="#work">작업 보기 →</a></div>
<nav class="toc">${[...R.sections.map(s => s[0]), "Skills", "Certificates"].map(s => `<a href="#" data-j="r-${s.toLowerCase()}">${s}</a>`).join("")}</nav></div>
<div class="content" style="gap:72px">${R.sections.map(([en, ko, rs]) => sec(en, ko, rows(rs), rs.length)).join("")}
${sec("Skills", "툴킷", `<div class="skills" data-r>${R.skills.map(([k, items]) => `<div><small>${esc(k)}</small>${items.map(x => `<b>${esc(x)}</b>`).join("")}</div>`).join("")}</div>`)}
${sec("Certificates", "자격 · 어학", rows(R.certs), R.certs.length)}
<div class="rcta" data-r><div><b>함께 만들 세계가 있다면, 편하게 연락 주세요.</b><span>${[...S.emails, S.phone].filter(Boolean).join(" · ")}</span></div><button class="btn ghost" data-copy="${S.emails[0]}">이메일 복사</button></div></div></div></main>` + contact();
  const ob = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$(".toc a").forEach(a => a.classList.toggle("on", a.dataset.j === e.target.id)); }), { rootMargin: "-40% 0px -55% 0px" });
  $$(".rsec").forEach(s => ob.observe(s));
}

/* ---------- reveal / counters ---------- */
function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const t = e.target; t.classList.add("in");
    $$("[data-w]", t).forEach(x => x.style.width = x.dataset.w); $$("circle[data-off]", t).forEach(c => c.style.strokeDashoffset = c.dataset.off); io.unobserve(t); }), { rootMargin: "0px 0px -8% 0px" });
  $$("[data-r]").forEach(el => io.observe(el));
}

/* ---------- router ---------- */
let current = null;
function route(first) {
  const h = (location.hash || "").slice(1);
  let view = "home", id = null, anchor = null;
  if (h.startsWith("p-")) { view = "detail"; id = h.slice(2); if (id.endsWith("-ux")) { id = id.slice(0, -3); anchor = "ux"; } if (!P[id]) { view = "home"; id = null; } }
  else if (h === "resume") view = "resume";
  else if (["about", "work", "more", "awards", "contact", "top"].includes(h)) anchor = h;
  else if (h === "archive") anchor = "awards";
  else if (h.startsWith("work-")) { anchor = "more"; }
  const key = view + (id || "");
  const render = () => {
    const cu = $(".cursor"); if (cu) cu.classList.remove("big", "zoom");
    if (key !== current) { current = key; if (view === "home") home(); else if (view === "detail") detail(id); else resume(); reveal(); bindNav(); }
    if (h.startsWith("work-")) setFilter(h.slice(5));
    requestAnimationFrame(() => {
      if (view === "detail" && pendingCat) { const c = pendingCat; pendingCat = null;
        if (c === "ai" && $("#ux")) { toggleMore(true); setTimeout(() => $("#ux").scrollIntoView({ behavior: "smooth" }), 80); return; }
        const t = $(`[data-cat="${c}"]`) || (c === "character" && $$(".dsec").find(s => /Solution/.test(s.dataset.t))); if (t) { t.scrollIntoView({ behavior: "smooth" }); return; } }
      if (anchor === "ux") { toggleMore(true); setTimeout(() => $("#ux")?.scrollIntoView(), 50); return; }
      if (anchor && $("#" + anchor)) $("#" + anchor).scrollIntoView({ behavior: first ? "auto" : "smooth" }); else if (!first || view !== "home") scrollTo({ top: 0, behavior: "auto" });
    });
  };
  if (first || key === current) return render();
  transition(view === "detail" ? P[id] : null, render);
}
function transition(p, fn) {
  const c = $(".curtain"); c.style.setProperty("--cc", p ? (p.accText || p.acc) : "#16161D"); $("b", c).textContent = p ? p.title : "";
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return fn();
  c.className = "curtain"; void c.offsetWidth; c.classList.add("in");
  setTimeout(() => { fn(); c.classList.remove("in"); c.classList.add("out"); setTimeout(() => c.className = "curtain", 700); }, 560);
}
addEventListener("hashchange", () => route(false));

/* ---------- global events ---------- */
function bindNav() {
  const n = $(".nav"), pr = $(".progress");
  onscroll = () => { n && n.classList.toggle("scrolled", scrollY > 10); $(".totop").classList.toggle("on", scrollY > 900);
    if (pr) { const d = document.documentElement; pr.style.width = (scrollY / (d.scrollHeight - innerHeight) * 100) + "%"; } };
  onscroll();
}
document.addEventListener("click", e => {
  const t = e.target;
  if (t.closest("[data-stop]")) return;
  const j = t.closest("[data-j]"); if (j) { e.preventDefault(); if (j.dataset.j === "ux" || j.dataset.j.startsWith("ux-")) toggleMore(true); setTimeout(() => $("#" + j.dataset.j)?.scrollIntoView({ behavior: "smooth" }), j.dataset.j.startsWith("ux") ? 120 : 0); return; }
  const go = t.closest("[data-go]"); if (go && !t.closest("a[href^='http']")) { if (curFilter !== "all" && go.classList.contains("card")) pendingCat = curFilter; location.hash = "p-" + go.dataset.go; return; }
  const v = t.closest("[data-video]"); if (v) { openModal(`<video src="${v.dataset.video}" controls autoplay playsinline></video>`); return; }
  const z = t.closest("[data-zoom]"); if (z && !t.closest("[data-go]")) { openModal(`<img src="${z.src}" alt="">`); return; }
  const cp = t.closest("[data-copy]"); if (cp) { navigator.clipboard?.writeText(cp.dataset.copy).then(() => toast((cp.dataset.copy.includes("@") ? "이메일" : "연락처") + "을 복사했어요 · " + cp.dataset.copy), () => toast(cp.dataset.copy)); return; }
  const td = t.closest("[data-todo]"); if (td) { e.preventDefault(); toast(td.dataset.todo); return; }
  if (t.closest("[data-top]") || t.closest(".totop")) { scrollTo({ top: 0, behavior: "smooth" }); return; }
  if (t.closest(".modal") && (t.classList.contains("modal") || t.closest(".x"))) closeModal();
  const a = t.closest("a[href^='#']"); if (a && a.getAttribute("href") === location.hash) { e.preventDefault(); route(false); }
});
addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
function openModal(html) { const m = $(".modal"); $(".mc", m).innerHTML = html; m.classList.add("on"); }
function closeModal() { const m = $(".modal"); if (!m.classList.contains("on")) return; m.classList.remove("on"); $(".mc", m).innerHTML = ""; }
let tt; function toast(s) { const el = $(".toast"); el.textContent = s; el.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => el.classList.remove("on"), 2200); }

/* cursor */
const cur = $(".cursor");
if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener("mousemove", e => { x = e.clientX; y = e.clientY;
    const g = e.target.closest("[data-cursor]"), z = !g && e.target.closest("[data-zoom]");
    cur.classList.toggle("big", !!g); cur.classList.toggle("zoom", !!z);
    if (g) { const id = g.dataset.go; cur.style.setProperty("--cc", id ? (P[id].accText || P[id].acc) : "#16161D"); $("span", cur).textContent = g.dataset.cursor; } else if (z) $("span", cur).textContent = "＋"; });
  (function loop() { cx += (x - cx) * .2; cy += (y - cy) * .2; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
} else cur.remove();

route(true);
}

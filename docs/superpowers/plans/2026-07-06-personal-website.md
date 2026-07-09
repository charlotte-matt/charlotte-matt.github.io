# Living-Resume Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Charlotte Matthews' living-resume website — a fast, minimal-editorial static site that showcases projects and mirrors her full resume, deployable to GitHub Pages.

**Architecture:** Dependency-free static site (vanilla HTML/CSS/JS, no build step). A single scrolling `index.html` holds all resume sections; each project gets its own page under `projects/`. The Projects grid renders from one data file (`data/projects.js`), so adding a project = adding one object. Design system lives entirely in `css/styles.css` via CSS custom properties.

**Tech Stack:** HTML5, CSS3 (custom properties, fl/grid, IntersectionObserver), vanilla ES module-free JS, Google Fonts (Fraunces + Inter). No frameworks, no bundler, no npm.

## Global Constraints

- No build step, no framework, no npm/dependencies — plain static files only.
- Publish root == repo root (GitHub **user site** `charlotte-matt.github.io` serves from root of `main`).
- Design tokens (exact): `--paper #FBFAF7`, `--ink #1A1A1A`, `--ink-soft #55534E`, `--accent #1D4E89`, `--accent-strong #163A66`, `--rule #E6E3DC`.
- Fonts: Fraunces (display serif, headings) + Inter (body), Google Fonts, `font-display: swap`, with system fallbacks.
- Content column max-width ~1080px, centered, generous vertical rhythm.
- Accessibility: semantic landmarks, keyboard-navigable, sufficient contrast, descriptive alt/link text.
- Motion respects `prefers-reduced-motion`.
- Positioning: skills-forward, industry-agnostic, analytical roles. Full resume content present.
- Verification: local static server via `preview_start` (`.claude/launch.json`) + preview inspect/snapshot/screenshot tools. Commit after each task.

---

### Task 1: Project scaffold, tooling, and design tokens

**Files:**
- Create: `.claude/launch.json`
- Create: `.gitignore`
- Create: `assets/Matthews_Resume.pdf` (copy of repo-root PDF)
- Create: `assets/favicon.svg`
- Create: `css/styles.css` (tokens + reset + base typography only)
- Create: `index.html` (minimal shell that loads the CSS/fonts)

**Interfaces:**
- Produces: the CSS custom properties in `:root` (all `--*` tokens above); base element styles for `body`, headings, `p`, `a`. Later tasks consume these tokens and add component classes to this same file.

- [ ] **Step 1: Create the static-server launch config**

`.claude/launch.json`:
```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "site",
      "runtimeExecutable": "python3",
      "runtimeArgs": ["-m", "http.server", "5173"],
      "port": 5173
    }
  ]
}
```

- [ ] **Step 2: Create `.gitignore`**

```
.DS_Store
*.log
.vscode/
```

- [ ] **Step 3: Copy the resume into assets**

Run: `mkdir -p assets && cp Matthews_Resume.pdf assets/Matthews_Resume.pdf`

- [ ] **Step 4: Create `assets/favicon.svg`** (a simple "C" monogram on ink-blue)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#1D4E89"/>
  <text x="32" y="44" font-family="Georgia, serif" font-size="38" font-weight="700"
        text-anchor="middle" fill="#FBFAF7">C</text>
</svg>
```

- [ ] **Step 5: Create `css/styles.css` with tokens, reset, and base typography**

```css
/* ===== Design tokens ===== */
:root {
  --paper: #FBFAF7;
  --ink: #1A1A1A;
  --ink-soft: #55534E;
  --accent: #1D4E89;
  --accent-strong: #163A66;
  --rule: #E6E3DC;

  --font-display: "Fraunces", Georgia, "Times New Roman", serif;
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;

  --maxw: 1080px;
  --gutter: clamp(1.25rem, 4vw, 3rem);
  --radius: 14px;
  --shadow: 0 1px 2px rgba(26,26,26,.04), 0 8px 24px rgba(26,26,26,.06);
  --space-section: clamp(4rem, 9vw, 7.5rem);
}

/* ===== Reset ===== */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
img, svg { display: block; max-width: 100%; }
a { color: inherit; }

/* ===== Base ===== */
body {
  font-family: var(--font-body);
  background: var(--paper);
  color: var(--ink);
  line-height: 1.65;
  font-size: 1.0625rem;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
h1, h2, h3 { font-family: var(--font-display); line-height: 1.08; font-weight: 600; letter-spacing: -0.01em; }
h1 { font-size: clamp(2.5rem, 6vw, 4rem); }
h2 { font-size: clamp(1.9rem, 4vw, 2.6rem); }
h3 { font-size: 1.25rem; }
p { color: var(--ink-soft); }
p.lead { color: var(--ink); font-size: 1.15rem; }

.container { width: 100%; max-width: var(--maxw); margin-inline: auto; padding-inline: var(--gutter); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
}
```

- [ ] **Step 6: Create `index.html` shell that loads fonts + CSS**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Charlotte Matthews — Applied Mathematician & Data Scientist</title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <main class="container">
    <h1>Charlotte Matthews</h1>
    <p class="lead">Scaffold works.</p>
  </main>
</body>
</html>
```

- [ ] **Step 7: Verify in browser**

Start server: `preview_start` with name `site`. Then:
- `preview_inspect` selector `body` for `["background-color","font-family","color"]` → expect background ~`rgb(251, 250, 247)`, Inter font applied, color ~`rgb(26,26,26)`.
- `preview_inspect` selector `h1` for `["font-family"]` → expect Fraunces.
- `preview_screenshot` → warm off-white page, serif H1.

- [ ] **Step 8: Commit**

```bash
git add .claude assets css index.html .gitignore
git commit -m "feat: scaffold static site with design tokens and fonts"
```

---

### Task 2: Sticky navigation + shared component styles

**Files:**
- Modify: `index.html` (add `<header>` nav above `<main>`; replace placeholder main with empty `<main>` holding section anchors to be filled later)
- Modify: `css/styles.css` (append nav, button, section-header, and reveal component styles)
- Create: `js/main.js` (mobile nav toggle + footer year stub)

**Interfaces:**
- Produces: nav markup with links to `#about`, `#projects`, `#experience`, `#contact`; CSS classes `.nav`, `.btn`, `.btn-primary`, `.btn-ghost`, `.eyebrow`, `.section-head`, `.reveal`; global `js/main.js` loaded with `defer`.
- Consumes: tokens from Task 1.

- [ ] **Step 1: Append component styles to `css/styles.css`**

```css
/* ===== Nav ===== */
.nav {
  position: sticky; top: 0; z-index: 50;
  background: color-mix(in srgb, var(--paper) 85%, transparent);
  backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid var(--rule);
}
.nav__inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.nav__brand { font-family: var(--font-display); font-weight: 700; font-size: 1.15rem; text-decoration: none; }
.nav__links { display: flex; gap: 1.75rem; list-style: none; align-items: center; }
.nav__links a { text-decoration: none; color: var(--ink-soft); font-weight: 500; font-size: .95rem; transition: color .15s; }
.nav__links a:hover, .nav__links a.is-active { color: var(--ink); }
.nav__toggle { display: none; background: none; border: 0; font-size: 1.5rem; cursor: pointer; color: var(--ink); }

/* ===== Buttons ===== */
.btn { display: inline-flex; align-items: center; gap: .5rem; padding: .7rem 1.25rem; border-radius: 999px;
  font-weight: 500; font-size: .95rem; text-decoration: none; cursor: pointer; border: 1px solid transparent; transition: all .15s; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover { background: var(--accent-strong); }
.btn-ghost { background: transparent; color: var(--ink); border-color: var(--rule); }
.btn-ghost:hover { border-color: var(--ink); }

/* ===== Section scaffolding ===== */
section[id] { scroll-margin-top: 84px; padding-block: var(--space-section); border-top: 1px solid var(--rule); }
.eyebrow { text-transform: uppercase; letter-spacing: .14em; font-size: .78rem; font-weight: 600; color: var(--accent); margin-bottom: .75rem; }
.section-head { margin-bottom: 2.5rem; max-width: 46ch; }

/* ===== Reveal on scroll ===== */
.reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
.reveal.in { opacity: 1; transform: none; }

/* ===== Mobile nav ===== */
@media (max-width: 720px) {
  .nav__toggle { display: block; }
  .nav__links { position: absolute; top: 64px; left: 0; right: 0; flex-direction: column; gap: 0;
    background: var(--paper); border-bottom: 1px solid var(--rule); padding: .5rem 0; display: none; }
  .nav__links.open { display: flex; }
  .nav__links li { width: 100%; }
  .nav__links a { display: block; padding: .85rem var(--gutter); }
}
```

- [ ] **Step 2: Replace `index.html` body with nav + empty section anchors**

```html
<body>
  <header class="nav">
    <div class="nav__inner container">
      <a class="nav__brand" href="#top">Charlotte Matthews</a>
      <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>
      <ul class="nav__links" id="navLinks">
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </header>

  <main id="top">
    <!-- hero, about, projects, experience, skills, contact filled in later tasks -->
  </main>

  <script src="js/main.js" defer></script>
</body>
```

- [ ] **Step 3: Create `js/main.js`**

```js
// Mobile nav toggle
const toggle = document.querySelector(".nav__toggle");
const links = document.getElementById("navLinks");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });
}

// Footer year (element added in a later task)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = "2026";
```

- [ ] **Step 4: Verify**

Restart/refresh server. `preview_inspect` `.nav` for `["position"]` → `sticky`. `preview_snapshot` → nav landmark with 4 links. `preview_resize` preset `mobile` then `preview_screenshot` → hamburger visible; `preview_click` `.nav__toggle` → menu opens.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: add sticky nav, buttons, section scaffolding, reveal styles"
```

---

### Task 3: Hero section

**Files:**
- Modify: `index.html` (add hero as first child of `<main>`)
- Modify: `css/styles.css` (append `.hero` styles)

**Interfaces:**
- Consumes: `.btn` classes, tokens. Produces: `#top` hero block; download link to `assets/Matthews_Resume.pdf`.

- [ ] **Step 1: Add hero markup at top of `<main id="top">`**

```html
<section class="hero container">
  <p class="eyebrow reveal">Baylor University · B.S. Applied Mathematics '26</p>
  <h1 class="hero__title reveal">Charlotte Matthews</h1>
  <p class="lead hero__sub reveal">Applied mathematician &amp; data scientist turning large, messy datasets into clear decisions.</p>
  <div class="hero__cta reveal">
    <a class="btn btn-primary" href="#projects">View projects</a>
    <a class="btn btn-ghost" href="assets/Matthews_Resume.pdf" download>Download résumé</a>
  </div>
</section>
```

- [ ] **Step 2: Append `.hero` styles**

```css
.hero { padding-block: clamp(4rem, 11vw, 8rem) 0; }
.hero__title { margin: .25rem 0 1rem; }
.hero__sub { max-width: 34ch; margin-bottom: 2rem; }
.hero__cta { display: flex; gap: .85rem; flex-wrap: wrap; }
```

- [ ] **Step 3: Verify**

Refresh. `preview_snapshot` → H1 "Charlotte Matthews", subhead, two buttons. `preview_inspect` `.btn-primary` for `["background-color"]` → ink-blue `rgb(29,78,137)`. Click "Download résumé" resolves to the PDF (check `preview_network` for `Matthews_Resume.pdf` 200).

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add hero section"
```

---

### Task 4: About section

**Files:**
- Modify: `index.html` (add `#about` section)
- Modify: `css/styles.css` (append `.about` styles)

**Interfaces:** Consumes tokens + `.section-head`, `.eyebrow`, `.reveal`.

- [ ] **Step 1: Add `#about` section after hero**

```html
<section id="about" class="container">
  <div class="section-head reveal">
    <p class="eyebrow">About</p>
    <h2>Math-trained, data-obsessed, decision-focused.</h2>
  </div>
  <div class="about__body reveal">
    <p class="lead">I'm a senior at Baylor University studying Applied Mathematics with a Data Science minor, graduating May 2026. As a data science intern at Seek Insights, I built dashboards and data models on billion-row datasets that shaped real marketing and sales decisions.</p>
    <p>I like the whole arc of analytical work — engineering the data, finding the signal, and translating it into something a non-technical stakeholder can act on. I'm drawn to analytical roles across industries, from retail and consumer to broader business analytics.</p>
  </div>
</section>
```

- [ ] **Step 2: Append `.about` styles**

```css
.about__body { display: grid; gap: 1.25rem; max-width: 62ch; }
```

- [ ] **Step 3: Verify**

Refresh. `preview_snapshot` → `#about` heading + two paragraphs. `preview_inspect` `#about` for `["scroll-margin-top"]` → `84px`.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add about section"
```

---

### Task 5: Projects — data file + rendered grid

**Files:**
- Create: `data/projects.js`
- Modify: `index.html` (add `#projects` section with empty `<div id="projectGrid">`, load `data/projects.js` before `js/main.js`)
- Modify: `js/main.js` (append `renderProjects()`)
- Modify: `css/styles.css` (append project grid/card styles)

**Interfaces:**
- Produces: global `window.PROJECTS` — array of `{ slug:string, title:string, summary:string, tags:string[], date:string, status:"live"|"coming-soon", href:string }`; function `renderProjects()` that injects cards into `#projectGrid`.
- Consumes: tokens, `.section-head`.

- [ ] **Step 1: Create `data/projects.js`**

```js
// Single source of truth for the Projects grid.
// Add a new project by appending one object here.
window.PROJECTS = [
  {
    slug: "imdb",
    title: "IMDb Ratings Analysis",
    summary: "Explored 5,273 films across 27 features in R to surface what drives audience ratings — runtime, era, box office, and rating system.",
    tags: ["R", "ggplot2", "EDA"],
    date: "2023",
    status: "live",
    href: "projects/imdb.html",
  },
  {
    slug: "dashboard",
    title: "Interactive Analytics Dashboard",
    summary: "A dashboard for exploring customer and product data — buyer personas, YoY trends, and segment filters.",
    tags: ["Dashboard", "SQL", "Data Viz"],
    date: "In progress",
    status: "coming-soon",
    href: "projects/dashboard.html",
  },
  {
    slug: "scrollytelling",
    title: "Data Scrollytelling",
    summary: "A scroll-driven narrative that walks a reader through a dataset one insight at a time.",
    tags: ["JavaScript", "Narrative", "Data Viz"],
    date: "In progress",
    status: "coming-soon",
    href: "projects/scrollytelling.html",
  },
  {
    slug: "map",
    title: "Interactive Map",
    summary: "A geographic view of the data — regional patterns rendered on an interactive map.",
    tags: ["Mapping", "Geospatial", "Data Viz"],
    date: "In progress",
    status: "coming-soon",
    href: "projects/map.html",
  },
];
```

- [ ] **Step 2: Add `#projects` section markup**

```html
<section id="projects" class="container">
  <div class="section-head reveal">
    <p class="eyebrow">Projects</p>
    <h2>Selected work.</h2>
    <p>Interactive projects and analyses. More are on the way — placeholders link to pages that will hold the live work.</p>
  </div>
  <div class="project-grid" id="projectGrid"></div>
</section>
```

- [ ] **Step 3: Load the data file before main.js**

In `index.html`, immediately before `<script src="js/main.js" defer></script>`:
```html
  <script src="data/projects.js" defer></script>
```

- [ ] **Step 4: Append `renderProjects()` to `js/main.js`**

```js
// Render project cards from window.PROJECTS
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid || !Array.isArray(window.PROJECTS)) return;
  grid.innerHTML = window.PROJECTS.map((p) => {
    const coming = p.status === "coming-soon";
    const tags = p.tags.map((t) => `<span class="tag">${t}</span>`).join("");
    return `
      <a class="card${coming ? " card--soon" : ""}" href="${p.href}">
        <div class="card__top">
          <span class="card__date">${p.date}</span>
          ${coming ? '<span class="card__badge">Coming soon</span>' : '<span class="card__badge card__badge--live">Live</span>'}
        </div>
        <h3 class="card__title">${p.title}</h3>
        <p class="card__summary">${p.summary}</p>
        <div class="card__tags">${tags}</div>
        <span class="card__cta">${coming ? "Preview" : "View project"} →</span>
      </a>`;
  }).join("");
}
renderProjects();
```

- [ ] **Step 5: Append project grid/card styles**

```css
.project-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
.card { display: flex; flex-direction: column; gap: .75rem; padding: 1.6rem; text-decoration: none;
  background: #fff; border: 1px solid var(--rule); border-radius: var(--radius); box-shadow: var(--shadow);
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
.card:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--accent) 40%, var(--rule)); box-shadow: 0 12px 30px rgba(26,26,26,.10); }
.card--soon { background: #fbfaf7; }
.card__top { display: flex; align-items: center; justify-content: space-between; }
.card__date { font-size: .82rem; color: var(--ink-soft); }
.card__badge { font-size: .72rem; font-weight: 600; text-transform: uppercase; letter-spacing: .08em;
  padding: .2rem .55rem; border-radius: 999px; background: var(--rule); color: var(--ink-soft); }
.card__badge--live { background: color-mix(in srgb, var(--accent) 15%, #fff); color: var(--accent-strong); }
.card__title { color: var(--ink); }
.card__summary { color: var(--ink-soft); font-size: .96rem; }
.card__tags { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: auto; }
.tag { font-size: .76rem; color: var(--ink-soft); border: 1px solid var(--rule); border-radius: 999px; padding: .15rem .55rem; }
.card__cta { color: var(--accent); font-weight: 600; font-size: .9rem; }
@media (max-width: 720px) { .project-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 6: Verify**

Refresh. `preview_snapshot` → 4 cards, titles matching PROJECTS, "Coming soon" badges on 3, "Live" on IMDb. `preview_inspect` `.card` for `["display","border-radius"]`. `preview_resize` `mobile` → grid collapses to 1 column.

- [ ] **Step 7: Commit**

```bash
git add data/projects.js index.html js/main.js css/styles.css
git commit -m "feat: add data-driven projects grid"
```

---

### Task 6: Experience section

**Files:**
- Modify: `index.html` (add `#experience` section)
- Modify: `css/styles.css` (append `.exp` styles)

**Interfaces:** Consumes tokens, `.section-head`. Content verbatim from resume (Seek Insights featured; Favorite Daughter + Childcare compact).

- [ ] **Step 1: Add `#experience` section**

```html
<section id="experience" class="container">
  <div class="section-head reveal">
    <p class="eyebrow">Experience</p>
    <h2>Where I've done the work.</h2>
  </div>

  <article class="exp exp--featured reveal">
    <div class="exp__head">
      <div>
        <h3>Data Science Intern</h3>
        <p class="exp__org">Seek Insights · Nashville, TN</p>
      </div>
      <span class="exp__date">Jun 2025 – Aug 2025</span>
    </div>
    <ul class="exp__bullets">
      <li>Developed an interactive Sigma dashboard over a 2.6-billion-row customer &amp; product dataset, enabling 17,290 brands to analyze buyer personas and improve channel-allocation strategy by 25%.</li>
      <li>Built scalable YoY sales and customer tables in Snowflake from 5.6M customer and 935K product records, powering 49 interactive visuals that improved analyst efficiency by 40%.</li>
      <li>Created dynamic filters segmenting customers across 16,597 cities into 5 personas by loyalty, purchase behavior, timing, and demographics — driving regional marketing strategy.</li>
      <li>Presented technical findings to marketing and technology stakeholders in a non-technical format, enabling better targeting, campaign optimization, and data-driven decisions.</li>
    </ul>
  </article>

  <div class="exp__grid">
    <article class="exp reveal">
      <div class="exp__head">
        <div><h3>Stock Associate</h3><p class="exp__org">Favorite Daughter · Nashville, TN</p></div>
        <span class="exp__date">2026 – Present</span>
      </div>
      <p>Process 200+ units per shift with inventory accuracy, coordinate 100+ daily stockroom-to-floor movements, and keep receiving and sales areas organized during peak periods.</p>
    </article>
    <article class="exp reveal">
      <div class="exp__head">
        <div><h3>Childcare Provider</h3><p class="exp__org">Childcare Solutions · Nashville, TN</p></div>
        <span class="exp__date">2021 – 2024</span>
      </div>
      <p>Managed summer childcare plans for 10+ families, providing attentive, developmentally-minded care for children ages 6 months–12 years, including children with special needs.</p>
    </article>
  </div>
</section>
```

- [ ] **Step 2: Append `.exp` styles**

```css
.exp { border: 1px solid var(--rule); border-radius: var(--radius); padding: 1.6rem; background: #fff; }
.exp--featured { margin-bottom: 1.25rem; box-shadow: var(--shadow); }
.exp__head { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.exp__org { color: var(--accent); font-weight: 500; font-size: .95rem; }
.exp__date { color: var(--ink-soft); font-size: .88rem; white-space: nowrap; }
.exp__bullets { display: grid; gap: .6rem; padding-left: 1.1rem; }
.exp__bullets li { color: var(--ink-soft); }
.exp__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
@media (max-width: 720px) { .exp__grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Verify**

Refresh. `preview_snapshot` → Seek Insights featured with 4 bullets, two compact cards below. `preview_inspect` `.exp__org` color → ink-blue.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add experience section"
```

---

### Task 7: Skills & Education section

**Files:**
- Modify: `index.html` (add `#skills` section — grouped under a single band)
- Modify: `css/styles.css` (append `.skills`, `.edu` styles)

**Interfaces:** Consumes tokens, `.section-head`. Content from resume.

- [ ] **Step 1: Add `#skills` section**

```html
<section id="skills" class="container">
  <div class="section-head reveal">
    <p class="eyebrow">Skills &amp; Education</p>
    <h2>The toolkit.</h2>
  </div>

  <div class="skills reveal">
    <div class="skills__group">
      <h3>Languages</h3><p>Python · R · SQL · Julia · LaTeX</p>
    </div>
    <div class="skills__group">
      <h3>Frameworks &amp; Libraries</h3><p>Pandas · NumPy · Matplotlib · Tidyverse · ggplot2 · readr · broom</p>
    </div>
    <div class="skills__group">
      <h3>Tools &amp; Platforms</h3><p>Snowflake · Sigma · RStudio · PyCharm · Excel · Overleaf · Google Workspace · Linear</p>
    </div>
    <div class="skills__group">
      <h3>Concepts</h3><p>Data Engineering · Data Visualization · Cloud · Regression · Probability · Databases</p>
    </div>
  </div>

  <div class="edu reveal">
    <div class="exp__head">
      <div><h3>Baylor University</h3><p class="exp__org">B.S. Applied Mathematics, Minor in Data Science · Waco, TX</p></div>
      <span class="exp__date">May 2026 · GPA 3.68</span>
    </div>
    <p><strong>Coursework:</strong> Mathematical Statistics II, Regression Analysis, ODEs, Linear Algebra, Probability &amp; Statistics, Intro to Data Science, Sports Analytics, Database Design, Cloud Computing, Numerical Analysis.</p>
    <p><strong>Activities:</strong> Pi Beta Phi (Intramural Chair) · Data Science Club · Math Club · InterVarsity. <strong>Certifications:</strong> Claude 101, Intro to Claude Cowork.</p>
  </div>
</section>
```

- [ ] **Step 2: Append styles**

```css
.skills { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem 2.5rem; margin-bottom: 2.5rem; }
.skills__group h3 { font-size: 1rem; margin-bottom: .35rem; }
.skills__group p { color: var(--ink-soft); }
.edu { border-top: 1px solid var(--rule); padding-top: 2rem; display: grid; gap: .9rem; }
@media (max-width: 720px) { .skills { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Verify**

Refresh. `preview_snapshot` → 4 skill groups + Baylor education block. `preview_resize` `mobile` → skills single column.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add skills and education section"
```

---

### Task 8: Contact section + footer

**Files:**
- Modify: `index.html` (add `#contact` section + `<footer>`)
- Modify: `css/styles.css` (append `.contact`, `.footer` styles)

**Interfaces:** Consumes tokens, `.btn`. Uses `#year` span populated by `js/main.js` (Task 2). Links: email, LinkedIn `charlottematt24`, GitHub `charlotte-matt`, resume PDF.

- [ ] **Step 1: Add `#contact` section + footer (footer OUTSIDE `<main>`, before scripts)**

```html
<section id="contact" class="container">
  <div class="section-head reveal">
    <p class="eyebrow">Contact</p>
    <h2>Let's talk.</h2>
    <p>Open to analytical roles across industries. The fastest way to reach me is email.</p>
  </div>
  <div class="contact__actions reveal">
    <a class="btn btn-primary" href="mailto:charlotte.matthews2004@gmail.com">Email me</a>
    <a class="btn btn-ghost" href="https://www.linkedin.com/in/charlottematt24" target="_blank" rel="noopener">LinkedIn</a>
    <a class="btn btn-ghost" href="https://github.com/charlotte-matt" target="_blank" rel="noopener">GitHub</a>
    <a class="btn btn-ghost" href="assets/Matthews_Resume.pdf" download>Résumé (PDF)</a>
  </div>
</section>
```

Footer (place after `</main>`):
```html
<footer class="footer">
  <div class="container footer__inner">
    <span>© <span id="year">2026</span> Charlotte Matthews</span>
    <a href="#top">Back to top ↑</a>
  </div>
</footer>
```

- [ ] **Step 2: Append styles**

```css
.contact__actions { display: flex; flex-wrap: wrap; gap: .75rem; }
.footer { border-top: 1px solid var(--rule); padding-block: 2rem; }
.footer__inner { display: flex; justify-content: space-between; align-items: center; color: var(--ink-soft); font-size: .9rem; }
.footer__inner a { text-decoration: none; color: var(--ink-soft); }
.footer__inner a:hover { color: var(--ink); }
```

- [ ] **Step 3: Verify**

Refresh. `preview_snapshot` → 4 contact buttons + footer with year 2026. `preview_inspect` verify links' `href` via snapshot. Confirm `#year` shows "2026".

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add contact section and footer"
```

---

### Task 9: Scroll-reveal animation + active-nav highlighting

**Files:**
- Modify: `js/main.js` (append IntersectionObserver logic)

**Interfaces:** Consumes `.reveal` class (Task 2) and `section[id]` + `.nav__links a`. Adds `.in` to revealed elements and `.is-active` to the nav link of the section in view. Must no-op under `prefers-reduced-motion` (elements already visible via fallback).

- [ ] **Step 1: Append reveal + scrollspy to `js/main.js`**

```js
// Reveal-on-scroll
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");
if (prefersReduced || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  revealEls.forEach((el) => io.observe(el));
}

// Active nav link (scrollspy)
const sections = document.querySelectorAll("main section[id]");
const navMap = new Map([...document.querySelectorAll('.nav__links a')].map((a) => [a.getAttribute("href").slice(1), a]));
if ("IntersectionObserver" in window && sections.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navMap.forEach((a) => a.classList.remove("is-active"));
        navMap.get(e.target.id)?.classList.add("is-active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));
}
```

- [ ] **Step 2: Verify**

Refresh with default motion → sections fade/slide in on scroll; scrolling to Projects highlights the "Projects" nav link (`preview_inspect` `.nav__links a.is-active` present). Then `preview_resize` with `colorScheme` unaffected; set reduced motion by re-inspecting — confirm `.reveal` elements have `.in` (content visible, no hidden content). Check `preview_console_logs` `error` → none.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add scroll-reveal and active-nav highlighting"
```

---

### Task 10: Project-page template + IMDb case study

**Files:**
- Create: `projects/imdb.html`
- Modify: `css/styles.css` (append `.project-page` styles, shared by all project pages)

**Interfaces:**
- Produces: the reusable project-page structure (nav-back header, `.project-hero`, `.project-meta`, `.embed-slot`, Context/Approach/Outcome). `dashboard/scrollytelling/map` pages (Task 11) reuse these classes. Relative paths use `../` since pages live in `projects/`.

- [ ] **Step 1: Append `.project-page` styles to `css/styles.css`**

```css
/* ===== Project pages ===== */
.project-topbar { border-bottom: 1px solid var(--rule); }
.project-topbar .container { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.project-topbar a { text-decoration: none; color: var(--ink-soft); font-weight: 500; }
.project-topbar a:hover { color: var(--ink); }
.project-hero { padding-block: clamp(3rem, 8vw, 5rem) 1.5rem; }
.project-hero h1 { font-size: clamp(2.2rem, 5vw, 3.25rem); margin-bottom: 1rem; }
.project-meta { display: flex; flex-wrap: wrap; gap: 1.5rem; border-block: 1px solid var(--rule); padding-block: 1rem; margin-bottom: 2.5rem; }
.project-meta div { display: grid; gap: .15rem; }
.project-meta dt { font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; color: var(--accent); font-weight: 600; }
.project-meta dd { margin: 0; color: var(--ink); font-size: .95rem; }
.embed-slot { border: 1px dashed var(--rule); border-radius: var(--radius); background: #fff;
  min-height: 360px; display: grid; place-items: center; text-align: center; padding: 2rem; margin-bottom: 2.5rem; }
.embed-slot p { max-width: 40ch; }
.project-body { display: grid; gap: 2rem; max-width: 68ch; }
.project-body h2 { font-size: 1.5rem; }
.project-body h2 + p { margin-top: .5rem; }
```

- [ ] **Step 2: Create `projects/imdb.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>IMDb Ratings Analysis — Charlotte Matthews</title>
  <meta name="description" content="An R analysis of 5,273 films exploring what drives audience ratings." />
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/styles.css" />
</head>
<body>
  <header class="project-topbar">
    <div class="container">
      <a href="../index.html#projects">← All projects</a>
      <a href="../index.html">Charlotte Matthews</a>
    </div>
  </header>

  <main class="container">
    <section class="project-hero">
      <p class="eyebrow">Exploratory Data Analysis · R</p>
      <h1>IMDb Ratings Analysis</h1>
      <p class="lead">What actually moves an audience rating? I explored a 5,273-film IMDb dataset to find out.</p>
    </section>

    <dl class="project-meta">
      <div><dt>Role</dt><dd>Solo analysis</dd></div>
      <div><dt>Tools</dt><dd>R, ggplot2, Tidyverse</dd></div>
      <div><dt>Year</dt><dd>2023</dd></div>
      <div><dt>Scope</dt><dd>5,273 films · 27 features</dd></div>
    </dl>

    <div class="embed-slot">
      <p>Selected visualizations from the analysis will be embedded here. Want the full write-up or code? <a href="../index.html#contact">Get in touch.</a></p>
    </div>

    <div class="project-body">
      <section>
        <h2>Context</h2>
        <p>I set out to understand which factors correlate with how audiences rate films. Starting from a raw IMDb dataset of 5,273 movies and 27 features, I filtered for the variables most likely to carry signal while deliberately retaining outliers, since extreme films often reveal the clearest trends.</p>
      </section>
      <section>
        <h2>Approach</h2>
        <p>Working in R with the Tidyverse, I cleaned and reshaped the data, then built six visualizations with ggplot2 to examine distributions in audience ratings over time, runtime, box-office performance, and rating system. Each chart tested a specific hypothesis about what correlates with higher ratings.</p>
      </section>
      <section>
        <h2>Outcome</h2>
        <p>The analysis surfaced clear relationships between rating and factors like runtime and release era, and I packaged the findings into a structured presentation that walked a non-technical audience through the trends and what they implied about viewer preferences.</p>
      </section>
    </div>
  </main>

  <footer class="footer">
    <div class="container footer__inner">
      <span>© 2026 Charlotte Matthews</span>
      <a href="../index.html#top">Back to site ↑</a>
    </div>
  </footer>
</body>
</html>
```

- [ ] **Step 3: Verify**

Navigate to `/projects/imdb.html`. `preview_snapshot` → topbar back-link, hero, meta list (Role/Tools/Year/Scope), embed slot, Context/Approach/Outcome. `preview_inspect` `body` `["font-family"]` → Inter (confirms `../css` path resolves). `preview_network` → no 404s for CSS/fonts/favicon.

- [ ] **Step 4: Commit**

```bash
git add projects/imdb.html css/styles.css
git commit -m "feat: add project-page template and IMDb case study"
```

---

### Task 11: Placeholder project pages (dashboard, scrollytelling, map)

**Files:**
- Create: `projects/dashboard.html`
- Create: `projects/scrollytelling.html`
- Create: `projects/map.html`

**Interfaces:** Reuse the `.project-page` classes from Task 10. Each has a clearly-marked `<!-- EMBED SLOT -->` for future live code. No new CSS.

- [ ] **Step 1: Create `projects/dashboard.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Interactive Analytics Dashboard — Charlotte Matthews</title>
  <meta name="description" content="An interactive dashboard for exploring customer and product data — in progress." />
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/styles.css" />
</head>
<body>
  <header class="project-topbar">
    <div class="container">
      <a href="../index.html#projects">← All projects</a>
      <a href="../index.html">Charlotte Matthews</a>
    </div>
  </header>
  <main class="container">
    <section class="project-hero">
      <p class="eyebrow">Dashboard · In progress</p>
      <h1>Interactive Analytics Dashboard</h1>
      <p class="lead">An interactive view into customer and product data — buyer personas, YoY trends, and segment filters. Currently in progress.</p>
    </section>
    <dl class="project-meta">
      <div><dt>Role</dt><dd>Design &amp; build</dd></div>
      <div><dt>Tools</dt><dd>TBD</dd></div>
      <div><dt>Status</dt><dd>In progress</dd></div>
      <div><dt>Focus</dt><dd>Segmentation &amp; trends</dd></div>
    </dl>
    <!-- EMBED SLOT: drop the live dashboard (iframe embed / chart code) here -->
    <div class="embed-slot">
      <p>This project is in progress — the live dashboard will be embedded here soon. Curious about the direction? <a href="../index.html#contact">Let's talk.</a></p>
    </div>
  </main>
  <footer class="footer">
    <div class="container footer__inner">
      <span>© 2026 Charlotte Matthews</span>
      <a href="../index.html#top">Back to site ↑</a>
    </div>
  </footer>
</body>
</html>
```

- [ ] **Step 2: Create `projects/scrollytelling.html`**

Same as Step 1 with these substitutions: `<title>Data Scrollytelling — Charlotte Matthews</title>`; description "A scroll-driven data narrative — in progress."; eyebrow "Scrollytelling · In progress"; `<h1>Data Scrollytelling</h1>`; lead "A scroll-driven narrative that reveals a dataset one insight at a time. Currently in progress."; meta Tools "JavaScript, TBD", Focus "Narrative viz"; EMBED SLOT comment "drop the scrollytelling narrative here".

- [ ] **Step 3: Create `projects/map.html`**

Same as Step 1 with: `<title>Interactive Map — Charlotte Matthews</title>`; description "An interactive geographic data visualization — in progress."; eyebrow "Mapping · In progress"; `<h1>Interactive Map</h1>`; lead "A geographic view of the data — regional patterns on an interactive map. Currently in progress."; meta Tools "TBD", Focus "Geospatial"; EMBED SLOT comment "drop the interactive map here".

- [ ] **Step 4: Verify**

Visit each of `/projects/dashboard.html`, `/projects/scrollytelling.html`, `/projects/map.html`. `preview_snapshot` each → correct title/H1, styled consistently, back-link works. From `index.html`, `preview_click` each coming-soon card → lands on the right page. `preview_network` → no 404s.

- [ ] **Step 5: Commit**

```bash
git add projects/dashboard.html projects/scrollytelling.html projects/map.html
git commit -m "feat: add placeholder project pages with embed slots"
```

---

### Task 12: SEO/social meta, 404 page, and cross-device polish

**Files:**
- Modify: `index.html` (expand `<head>` with description + Open Graph + Twitter tags)
- Create: `assets/og-image.svg`
- Create: `404.html`

**Interfaces:** No JS/CSS API changes. Adds discoverability + graceful 404.

- [ ] **Step 1: Add meta + OG tags inside `index.html` `<head>` (after the `<title>`)**

```html
  <meta name="description" content="Charlotte Matthews — applied mathematician and data scientist. Living resume and project portfolio." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Charlotte Matthews — Applied Mathematician & Data Scientist" />
  <meta property="og:description" content="Living resume and project portfolio: dashboards, analysis, and interactive data work." />
  <meta property="og:image" content="assets/og-image.svg" />
  <meta property="og:url" content="https://charlotte-matt.github.io/" />
  <meta name="twitter:card" content="summary_large_image" />
```

- [ ] **Step 2: Create `assets/og-image.svg` (1200×630 social card)**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FBFAF7"/>
  <rect x="0" y="0" width="14" height="630" fill="#1D4E89"/>
  <text x="90" y="270" font-family="Georgia, serif" font-size="86" font-weight="700" fill="#1A1A1A">Charlotte Matthews</text>
  <text x="92" y="345" font-family="Helvetica, Arial, sans-serif" font-size="38" fill="#55534E">Applied Mathematician &amp; Data Scientist</text>
  <text x="92" y="430" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#1D4E89">Living resume &amp; project portfolio</text>
</svg>
```

- [ ] **Step 3: Create `404.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page not found — Charlotte Matthews</title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg" />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <main class="container" style="min-height:80vh; display:grid; place-content:center; text-align:center; gap:1rem;">
    <p class="eyebrow">404</p>
    <h1>This page wandered off.</h1>
    <p>The page you're looking for doesn't exist.</p>
    <p><a class="btn btn-primary" href="/">Back to home</a></p>
  </main>
</body>
</html>
```

- [ ] **Step 4: Verify**

Refresh `index.html`; view page source / `preview_eval` `document.querySelector('meta[property=\"og:title\"]').content` → expected string. Visit a bad URL (e.g. `/nope`) → server serves default listing locally, but confirm `404.html` renders standalone at `/404.html`. Run `preview_resize` presets `mobile`/`tablet`/`desktop` + `preview_screenshot` each → no horizontal scroll, nav/grids adapt. `preview_console_logs` `error` → none.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/og-image.svg 404.html
git commit -m "feat: add SEO/social meta, og-image, and 404 page"
```

---

### Task 13: README + deployment guide

**Files:**
- Create: `README.md`

**Interfaces:** Documentation only. Explains structure, how to run locally, how to add a project (one object in `data/projects.js`), and how to deploy to GitHub Pages.

- [ ] **Step 1: Create `README.md`**

````markdown
# Charlotte Matthews — Personal Website

A living-resume + project portfolio. Static site, no build step.

## Run locally
```bash
python3 -m http.server 5173
# open http://localhost:5173
```

## Structure
- `index.html` — main scrolling resume (About, Projects, Experience, Skills, Contact)
- `projects/*.html` — one page per project
- `css/styles.css` — the whole design system (edit tokens in `:root`)
- `js/main.js` — nav, scroll-reveal, project-card rendering
- `data/projects.js` — **add a project by appending one object here**
- `assets/` — resume PDF, favicon, social image

## Add a project
Append an object to `window.PROJECTS` in `data/projects.js` and add a matching
`projects/<slug>.html` (copy an existing one). The card appears automatically.

## Deploy (GitHub Pages, user site)
This repo is `charlotte-matt/charlotte-matt.github.io`, so it publishes from the
root of `main` to https://charlotte-matt.github.io.
```bash
git remote add origin git@github.com:charlotte-matt/charlotte-matt.github.io.git
git push -u origin main
```
Then enable Pages: repo Settings → Pages → Source: `Deploy from a branch`,
Branch: `main` / root. Site is live in ~1 minute.
````

- [ ] **Step 2: Verify**

`preview_start` still serves; README renders on GitHub later. Confirm the deploy commands reference the correct repo/URL.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add README with local-run and deploy guide"
```

---

## Self-Review

**Spec coverage:**
- Architecture / dependency-free / file structure → Tasks 1–2, 5, 13 ✓
- Data-driven projects (`data/projects.js`) → Task 5 ✓
- Hosting (user-site root publish) → Task 13 + Global Constraints ✓
- Hero / About / Projects / Experience / Skills+Education / Contact → Tasks 3–8 ✓
- Design system (tokens, Fraunces+Inter, motion, responsive, a11y, meta) → Tasks 1, 2, 9, 12 ✓
- Project-page template + IMDb real content → Task 10 ✓
- Placeholder pages with embed slots → Task 11 ✓
- Positioning (skills-forward, industry-agnostic) → hero/about/contact copy in Tasks 3, 4, 8 ✓

**Placeholder scan:** No "TBD/TODO" in requirements. The literal `TBD` in dashboard/map project meta is intentional in-product copy (those projects aren't built yet), not a plan gap.

**Type consistency:** `window.PROJECTS` object shape (`slug/title/summary/tags/date/status/href`) defined in Task 5 Step 1 matches `renderProjects()` usage in Task 5 Step 4. `.reveal`/`.in` defined Task 2, consumed Task 9. `.embed-slot`, `.project-meta`, `.project-topbar` defined Task 10, reused Task 11. Nav link `href` slugs (`about/projects/experience/contact`) match `section[id]`s in Tasks 4–8 and scrollspy in Task 9. Consistent.

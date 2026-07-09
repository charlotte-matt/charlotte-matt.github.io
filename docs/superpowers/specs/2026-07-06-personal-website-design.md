# Design Spec — Charlotte Matthews Living-Resume Website

**Date:** 2026-07-06
**Owner:** Charlotte Matthews
**Status:** Approved design, pre-implementation

## 1. Goal

A personal website that functions as a "living resume" for a data-science / applied-math
new grad (Baylor, May 2026) applying for jobs. It showcases projects — starting with a
completed IMDb analysis and growing to include an interactive dashboard, a scrollytelling
piece, and a map — alongside a resume-style summary of experience, skills, and education.

**Positioning:** Target is **analytical roles, industry-agnostic** (open to retail/fashion,
business, and beyond). The site leads with **skills and demonstrated ability**, not personal
interests or any single industry — copy and framing stay versatile so the same site works
across the analytical space. The full resume content is present (this is a true "living
resume"), with projects as the differentiator.

Success criteria:
- A recruiter can understand who Charlotte is and what she can do within ~15 seconds of landing.
- Projects are the centerpiece and can be explored as full interactive pages.
- Adding a new project later requires editing exactly one data file.
- The site is free to host, fast, and easy for a non-web-developer to maintain.

## 2. Approach & Architecture

**Dependency-free static site**: plain HTML, CSS, and vanilla JavaScript. No framework, no
build step, no package manager.

Rationale: publishes directly to GitHub Pages with zero config; every file is human-readable
and editable without tooling; instant load; nothing to break from dependency updates. Fits a
non-web-dev owner who is nonetheless technical (Python/R/SQL/Julia).

### File structure

```
Personal_Website/                 (repo root == GitHub Pages publish root)
├── index.html                    Main living resume — one scrolling page
├── projects/
│   ├── imdb.html                 IMDb analysis — real content
│   ├── dashboard.html            Placeholder, ready for Sigma dashboard
│   ├── scrollytelling.html       Placeholder
│   └── map.html                  Placeholder
├── css/
│   └── styles.css                Entire design system in one file
├── js/
│   └── main.js                   Sticky nav, smooth scroll, scroll-in animation, render project cards
├── data/
│   └── projects.js               Single source of truth: array of project objects
├── assets/
│   ├── Matthews_Resume.pdf       Downloadable resume (copied from repo root)
│   ├── favicon.svg
│   └── (project thumbnails / og-image)
├── 404.html                      Simple styled not-found page
└── docs/superpowers/specs/       This spec
```

**Data-driven projects:** `data/projects.js` exports an array of project objects
(`{ slug, title, summary, tags, date, status, href, thumbnail }`). `js/main.js` renders the
Projects grid from this array. Adding a project = adding one object. `status: "live"` vs
`status: "coming-soon"` controls the card treatment.

## 3. Hosting / Deployment

- **Repo:** `charlotte-matt/charlotte-matt.github.io` (a GitHub **user site**).
- User sites publish from the **root of the default branch**, so the site will be live at
  **https://charlotte-matt.github.io** with no `/docs` folder or config needed.
- Deployment steps (performed when the site is ready): `git init` locally, commit, add the
  remote, push to `main`; GitHub Pages serves it automatically. Custom domain can be attached
  later via a `CNAME` file + DNS.

## 4. Content (mapped from resume)

Single scrolling homepage with a sticky top nav: **About · Projects · Experience · Contact**.

- **Hero** — Name "Charlotte Matthews"; positioning line (draft: *"Applied mathematician &
  data scientist turning billion-row datasets into decisions."*); two CTAs: *View projects*
  and *Download résumé*. Subtle location/status line (Nashville, TN · Baylor '26).
- **About** — 2–3 sentence bio: Baylor B.S. Applied Mathematics, Data Science minor, May 2026;
  data science intern at Seek Insights; interest in turning large datasets into decisions.
- **Projects** — Grid of cards rendered from `data/projects.js`:
  - *IMDb Data Analysis (R)* — **live**, links to `projects/imdb.html` (full case study).
  - *Interactive Dashboard* — **coming soon**, links to `projects/dashboard.html`.
  - *Scrollytelling* — **coming soon**, links to `projects/scrollytelling.html`.
  - *Interactive Map* — **coming soon**, links to `projects/map.html`.
- **Experience** — Seek Insights (Data Science Intern, Jun–Aug 2025) featured with quantified
  bullets. Favorite Daughter (Stock Associate) and Childcare Solutions included as compact
  entries so the page is a complete living resume.
- **Skills & Education** — Skills grouped: Languages (Python, R, SQL, Julia, LaTeX); Frameworks
  & Libraries (Pandas, Matplotlib, NumPy, Tidyverse, ggplot2, readr, broom); Tools & Platforms
  (RStudio, Snowflake, Sigma, PyCharm, Excel, Overleaf, Google Workspace, Linear); Concepts
  (Data Engineering, Data Viz, Cloud, Regression, Probability, Databases); Certifications
  (Claude 101, Intro to Claude Cowork). Education: Baylor, GPA 3.68, coursework highlights,
  activities (Pi Beta Phi, Data Science Club, Math Club, InterVarsity).
- **Contact** — Email (charlotte.matthews2004@gmail.com), LinkedIn
  (linkedin.com/in/charlottematt24), GitHub (github.com/charlotte-matt), and a résumé PDF
  download button.

## 5. Design System (minimal & editorial)

- **Typography:** Fraunces (display serif) for headings; Inter for body/UI. Loaded via Google
  Fonts with `font-display: swap` and a system-font fallback stack.
- **Color tokens (CSS custom properties in `:root`):**
  - `--paper` `#FBFAF7` (warm off-white background)
  - `--ink` `#1A1A1A` (primary text)
  - `--ink-soft` `#55534E` (secondary text)
  - `--accent` `#1D4E89` (deep ink-blue)
  - `--accent-strong` `#163A66` (hover/active)
  - `--rule` `#E6E3DC` (borders/dividers)
- **Layout:** centered content column, max-width ~1080px; generous vertical rhythm; thin rules
  between sections; strong type hierarchy.
- **Motion:** subtle fade/slide-in on scroll via IntersectionObserver; respects
  `prefers-reduced-motion`. No parallax or flashy effects.
- **Responsive:** mobile-first; nav collapses gracefully on small screens.
- **Meta:** title, description, Open Graph + Twitter card tags and an `og-image` so shared
  links render a clean preview for recruiters. Favicon included.
- **Accessibility:** semantic HTML landmarks, sufficient color contrast, keyboard-navigable,
  descriptive alt text and link text.

## 6. Project-Page Template

Each `projects/*.html` shares one structure:
title → one-line summary → meta row (role · tools · date) → **interactive/embed area** →
Context / Approach / Outcome sections → "← Back to projects" link.

- `imdb.html` is filled with real content from the resume (5,273 movies, 27 features, 6
  visualizations, correlations in ratings/runtime/box office).
- `dashboard.html`, `scrollytelling.html`, `map.html` are structured placeholders with a
  clearly-marked `<!-- EMBED SLOT -->` where the live code (iframe embed, D3/Observable,
  scrollama, Leaflet/Mapbox, etc.) will be dropped in later. Each is its own future project
  with its own spec.

## 7. Out of Scope (for this build)

- Building the actual dashboard / scrollytelling / map interactives (future, separate specs).
- Custom domain purchase/DNS (can be added later).
- Any backend, CMS, analytics, or contact-form server (mailto link only).
- Blog / writing section (can be added later as another data-driven section).

## 8. Open Items

None blocking. Hero copy and bio wording will be drafted during implementation and are easy
to tweak. Optional custom domain deferred.

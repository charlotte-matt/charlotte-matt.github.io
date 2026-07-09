# Charlotte Matthews — Personal Website

A living-resume and project portfolio. Static site — plain HTML, CSS, and vanilla
JavaScript, no build step and no dependencies. Live at
**https://charlotte-matt.github.io**.

## Run locally

```bash
python3 -m http.server 5173
# then open http://localhost:5173
```

Any static file server works; there's nothing to build.

## Structure

| Path | Responsibility |
|------|----------------|
| `index.html` | The main scrolling page: hero, about, projects, experience, skills, contact |
| `projects/*.html` | One page per project (IMDb, dashboard, map, scrollytelling) |
| `css/styles.css` | The entire design system — edit color/spacing tokens in `:root` at the top |
| `js/main.js` | Sticky nav, scroll-reveal, and rendering of the project cards |
| `data/projects.js` | **Single source of truth for the Projects grid** |
| `assets/` | Résumé PDF, favicon, social share image (`og-image.png`) |
| `404.html` | Styled "page not found" |

## Add or edit a project

1. Add an object to `window.PROJECTS` in `data/projects.js`:

   ```js
   {
     slug: "my-project",
     title: "My Project",
     summary: "One sentence describing it.",
     tags: ["Tag A", "Tag B"],
     date: "2026",
     status: "live",            // or "coming-soon"
     href: "projects/my-project.html",
   }
   ```

2. Create `projects/my-project.html` (copy an existing project page as a template).
   To embed a live tool, drop an `<iframe>` into the `.embed-frame` block.

The card appears on the homepage automatically.

## Deploy (GitHub Pages)

This repo is `charlotte-matt/charlotte-matt.github.io`, a GitHub **user site**, so it
publishes from the root of the `main` branch — no config or `/docs` folder needed.

```bash
# one-time: connect the remote (HTTPS)
git remote add origin https://github.com/charlotte-matt/charlotte-matt.github.io.git

# every deploy: commit and push to main
git push -u origin main
```

In the repo on GitHub: **Settings → Pages → Build and deployment → Source:
"Deploy from a branch", Branch: `main` / `/ (root)`.** The site goes live at
https://charlotte-matt.github.io within a minute or two of each push.

### Custom domain (optional)

Add a `CNAME` file containing your domain, point your registrar's DNS at GitHub Pages,
and set the domain under Settings → Pages.

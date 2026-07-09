// Single source of truth for the Projects grid.
// Add a new project by appending one object here (and a matching projects/<slug>.html).
window.PROJECTS = [
  {
    slug: "dashboard",
    title: "Seasonal Color Dashboard",
    summary: "Do the colors shoppers search for actually sell? An interactive dashboard validating Google Trends against real H&M sales (2018–2020) across 12 garment categories.",
    tags: ["Retail Analytics", "Dashboard", "Data Viz"],
    date: "Personal project",
    status: "live",
    href: "projects/dashboard.html",
  },
  {
    slug: "map",
    title: "A Day in Zürich",
    summary: "An interactive map guidebook to one perfect day in Zürich — dinner, dessert, and sights, pinned and organized by time of day.",
    tags: ["Interactive Map", "Geospatial", "Travel"],
    date: "Personal project",
    status: "live",
    href: "projects/map.html",
  },
  {
    slug: "imdb",
    title: "IMDb Ratings Analysis",
    summary: "A co-authored R analysis of 5,273 films — how audience ratings, runtime, and box office shifted across a century of cinema.",
    tags: ["R", "ggplot2", "EDA"],
    date: "2023",
    status: "live",
    href: "projects/imdb.html",
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
];

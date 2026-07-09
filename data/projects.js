// Single source of truth for the Projects grid.
// Add a new project by appending one object here (and a matching projects/<slug>.html).
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

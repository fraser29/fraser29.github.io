import { navItems, siteMeta } from "./data.js";

export function renderLayout({ pageId, title, subtitle }) {
  document.title = `${title} | ${siteMeta.siteTitle}`;

  const titleNode = document.getElementById("page-title");
  if (titleNode) titleNode.textContent = title;

  const subtitleNode = document.getElementById("page-subtitle");
  if (subtitleNode) subtitleNode.textContent = subtitle;

  const nav = document.getElementById("site-nav");
  if (nav) {
    nav.innerHTML = navItems
      .map((item) => {
        const active = item.id === pageId ? 'aria-current="page"' : "";
        return `<a class="nav-link" href="${item.href}" ${active}>${item.label}</a>`;
      })
      .join("");
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML =
      `Built for <a href="${siteMeta.githubUrl}" target="_blank" rel="noopener">github.com/fraser29</a>` +
      ` • Research profile: <a href="${siteMeta.orcidUrl}" target="_blank" rel="noopener">ORCID</a>` +
      " • Data source: public GitHub API";
  }
}

export function daysAgo(isoDate) {
  if (!isoDate) return "-";
  const days = Math.floor((Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export function projectCard(project, meta = {}) {
  const docs = project.links.docs
    ? `<a href="${project.links.docs}" target="_blank" rel="noopener">Docs</a>`
    : "";
  const pypi = project.links.pypi
    ? `<a href="${project.links.pypi}" target="_blank" rel="noopener">PyPI</a>`
    : "";

  return `
    <article class="card">
      <div class="title-row">
        <h3>${project.title}</h3>
        <span class="small">${project.area}</span>
      </div>
      <p>${project.summary}</p>
      <div class="badges">
        ${project.tags.map((tag) => `<span class="badge">${tag}</span>`).join("")}
      </div>
      <div class="small">
        <span>Language: ${meta.language || "n/a"}</span> ·
        <span>Stars: ${meta.stars ?? 0}</span> ·
        <span>Updated: ${daysAgo(meta.updated)}</span>
      </div>
      <div class="links">
        <a href="https://github.com/fraser29/${project.repo}" target="_blank" rel="noopener">Repository</a>
        ${docs}
        ${pypi}
      </div>
    </article>
  `;
}

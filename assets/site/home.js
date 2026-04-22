import { homeAbout, landingSections, projects } from "./data.js";
import { renderLayout } from "./common.js";
import { fetchPublicOwnedRepos } from "./github.js";

function renderLandingLinks() {
  const host = document.getElementById("landing-links");
  host.innerHTML = landingSections
    .map(
      (section) => `
        <a class="cta-card" href="${section.href}">
          <h3>${section.title}</h3>
          <p>${section.description}</p>
        </a>
      `
    )
    .join("");
}

function renderHighlights() {
  const host = document.getElementById("highlights");
  const featured = projects.filter((project) => project.isCoreEcosystem).slice(0, 6);
  host.innerHTML = featured
    .map((project) => `<span class="badge">${project.title}</span>`)
    .join("");
}

async function renderMetrics() {
  const repos = await fetchPublicOwnedRepos();
  const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

  document.getElementById("metric-projects").textContent = String(repos.length);
  document.getElementById("metric-stars").textContent = String(stars);
  document.getElementById("metric-core").textContent = String(
    projects.filter((project) => project.isCoreEcosystem).length
  );
}

function init() {
  renderLayout({
    pageId: "home",
    title: "Fraser M. Callaghan",
    subtitle:
      "Fraser Callaghan: Engineer, scientist, physicist, and programmer. A hub for public projects, research profile, major projects and full repository browsing."
  });
  renderLandingLinks();
  renderHighlights();
  renderMetrics();
  document.getElementById("about-heading").textContent = homeAbout.heading;
  document.getElementById("about-text").textContent = homeAbout.text;
}

init();

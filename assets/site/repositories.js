import { renderLayout, daysAgo } from "./common.js";
import { fetchPublicOwnedRepos } from "./github.js";

let repos = [];

function repoCard(repo) {
  return `
    <article class="card">
      <div class="title-row">
        <h3>${repo.name}</h3>
        <span class="small">${repo.language || "n/a"}</span>
      </div>
      <p>${repo.description || "No description provided."}</p>
      <div class="small">
        <span>Stars: ${repo.stargazers_count}</span> ·
        <span>Forks: ${repo.forks_count}</span> ·
        <span>Updated: ${daysAgo(repo.updated_at)}</span>
      </div>
      <div class="links">
        <a href="${repo.html_url}" target="_blank" rel="noopener">Repository</a>
        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener">Homepage</a>` : ""}
      </div>
    </article>
  `;
}

function sortedRepos(items, sortKey) {
  const list = [...items];
  if (sortKey === "name") return list.sort((a, b) => a.name.localeCompare(b.name));
  if (sortKey === "stars") return list.sort((a, b) => b.stargazers_count - a.stargazers_count);
  return list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

function render() {
  const searchTerm = document.getElementById("repo-search").value.trim().toLowerCase();
  const sortValue = document.getElementById("repo-sort").value;

  const filtered = repos.filter((repo) => {
    if (!searchTerm) return true;
    const haystack = `${repo.name} ${repo.description || ""} ${repo.language || ""}`.toLowerCase();
    return haystack.includes(searchTerm);
  });

  const visible = sortedRepos(filtered, sortValue);
  const host = document.getElementById("repo-grid");
  host.innerHTML = visible.map(repoCard).join("");

  document.getElementById("repo-count").textContent = `${visible.length} repositories shown`;
}

async function init() {
  renderLayout({
    pageId: "repositories",
    title: "Repositories (All)",
    subtitle: "All public repositories owned by fraser29, loaded from the GitHub API."
  });

  repos = await fetchPublicOwnedRepos();

  document.getElementById("repo-search").addEventListener("input", render);
  document.getElementById("repo-sort").addEventListener("change", render);
  render();
}

init();

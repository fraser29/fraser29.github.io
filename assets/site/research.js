import { areaNotes, projects, siteMeta } from "./data.js";
import { renderLayout, projectCard } from "./common.js";
import { fetchPublicOwnedRepos, toRepoMetaMap } from "./github.js";

async function init() {
  renderLayout({
    pageId: "research",
    title: "Research",
    subtitle:
      "Public research profile, focus areas, and software outputs supporting medical imaging science."
  });

  document.getElementById("orcid-link").href = siteMeta.orcidUrl;
  document.getElementById("orcid-link-inline").href = siteMeta.orcidUrl;

  const areaHost = document.getElementById("research-areas");
  areaHost.innerHTML = Object.entries(areaNotes)
    .map(([area, note]) => `<li><strong>${area}:</strong> ${note}</li>`)
    .join("");

  const repos = await fetchPublicOwnedRepos();
  const metaMap = toRepoMetaMap(repos);
  const researchProjects = projects.filter(
    (project) =>
      project.area === "Medical Imaging Ecosystem" ||
      project.area === "Clinical Research Applications" ||
      project.area === "Data Interoperability"
  );

  const host = document.getElementById("research-projects");
  host.innerHTML = researchProjects.map((project) => projectCard(project, metaMap.get(project.repo))).join("");
}

init();

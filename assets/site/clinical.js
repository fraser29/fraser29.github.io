import { projects } from "./data.js";
import { renderLayout, projectCard } from "./common.js";
import { fetchPublicOwnedRepos, toRepoMetaMap } from "./github.js";

async function init() {
  renderLayout({
    pageId: "clinical",
    title: "Clinical Tools",
    subtitle:
      "Public tools that support translational imaging workflows, study operations, and clinically aligned research pipelines."
  });

  const repos = await fetchPublicOwnedRepos();
  const metaMap = toRepoMetaMap(repos);
  const clinicalProjects = projects.filter((project) => project.isClinicalTool);

  const host = document.getElementById("clinical-grid");
  host.innerHTML = clinicalProjects
    .map((project) => projectCard(project, metaMap.get(project.repo)))
    .join("");
}

init();

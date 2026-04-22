import { flowStages, projects } from "./data.js";
import { renderLayout, projectCard } from "./common.js";
import { fetchPublicOwnedRepos, toRepoMetaMap } from "./github.js";

function renderFlow() {
  const host = document.getElementById("flow");
  const details = document.getElementById("flow-details");
  host.innerHTML = "";

  flowStages.forEach((stage, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${index + 1}. ${stage.name}`;
    button.classList.toggle("active", index === 0);
    button.addEventListener("click", () => {
      host.querySelectorAll("button").forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
      details.textContent = stage.detail;
    });
    host.append(button);
  });

  details.textContent = flowStages[0].detail;
}

async function init() {
  renderLayout({
    pageId: "ecosystem",
    title: "Medical Imaging Research Ecosystem",
    subtitle:
      "The six core projects that connect Orthanc ingestion, DICOM processing, orchestration, and interactive review."
  });

  renderFlow();

  const repos = await fetchPublicOwnedRepos();
  const metaMap = toRepoMetaMap(repos);
  const coreProjects = projects.filter((project) => project.isCoreEcosystem);

  const host = document.getElementById("core-grid");
  host.innerHTML = coreProjects
    .map((project) => projectCard(project, metaMap.get(project.repo)))
    .join("");
}

init();

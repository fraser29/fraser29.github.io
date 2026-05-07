import { projects } from "./data.js";
import { renderLayout, projectCard } from "./common.js";
import { fetchPublicOwnedRepos, toRepoMetaMap } from "./github.js";

const roleByRepo = {
  autorthanc: "Infrastructure Automation",
  pourewa: "Operational Movement",
  spydcmtk: "DICOM Processing",
  ngawari: "VTK Processing",
  hurahura: "Research Orchestration",
  tui: "Interactive Review"
};

const edges = [
  ["autorthanc", "pourewa"],
  ["autorthanc", "spydcmtk"],
  ["pourewa", "spydcmtk"],
  ["spydcmtk", "ngawari"],
  ["spydcmtk", "hurahura"],
  ["ngawari", "hurahura"],
  ["hurahura", "tui"],
  ["ngawari", "tui"]
];

const interactionOrder = ["autorthanc", "pourewa", "spydcmtk", "ngawari", "hurahura", "tui"];
const roleOrder = [
  "Infrastructure Automation",
  "Operational Movement",
  "DICOM Processing",
  "VTK Processing",
  "Research Orchestration",
  "Interactive Review"
];

let activeRepo = null;

function getNodes() {
  return projects
    .filter((project) => project.isCoreEcosystem)
    .map((project) => ({
      repo: project.repo,
      title: project.title,
      role: roleByRepo[project.repo] || "Core"
    }));
}

function computePositions(nodes, mode, width, height) {
  const positions = {};

  if (mode === "interaction") {
    const centerY = height * 0.5;
    interactionOrder.forEach((repo, index) => {
      positions[repo] = {
        x: ((index + 1) / (interactionOrder.length + 1)) * width,
        y: centerY + (index % 2 === 0 ? -58 : 58)
      };
    });
    return positions;
  }

  const bands = roleOrder.length;
  roleOrder.forEach((role, roleIndex) => {
    const inBand = nodes.filter((node) => node.role === role);
    const y = ((roleIndex + 1) / (bands + 1)) * height;
    inBand.forEach((node, nodeIndex) => {
      positions[node.repo] = {
        x: ((nodeIndex + 1) / (inBand.length + 1)) * width,
        y
      };
    });
  });

  return positions;
}

function renderMindMap(nodes, mode) {
  const host = document.getElementById("mindmap");
  const details = document.getElementById("mindmap-details");
  host.innerHTML = "";

  const width = host.clientWidth || 980;
  const height = 500;
  const positions = computePositions(nodes, mode, width, height);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "mindmap-svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  edges.forEach(([from, to]) => {
    const fromPos = positions[from];
    const toPos = positions[to];
    if (!fromPos || !toPos) return;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(fromPos.x));
    line.setAttribute("y1", String(fromPos.y));
    line.setAttribute("x2", String(toPos.x));
    line.setAttribute("y2", String(toPos.y));
    line.setAttribute("class", "mindmap-edge");
    line.dataset.from = from;
    line.dataset.to = to;
    svg.append(line);
  });

  host.append(svg);

  nodes.forEach((node) => {
    const point = positions[node.repo];
    if (!point) return;

    const element = document.createElement("button");
    element.type = "button";
    element.className = "mindmap-node";
    element.style.left = `${point.x}px`;
    element.style.top = `${point.y}px`;
    element.dataset.repo = node.repo;
    element.innerHTML = `
      <div class="node-name">${node.title}</div>
      <div class="node-role">${node.role}</div>
    `;

    element.addEventListener("click", () => {
      activeRepo = activeRepo === node.repo ? null : node.repo;
      applyMindMapSelection(nodes, mode);
    });

    host.append(element);
  });

  details.textContent =
    mode === "role"
      ? "Grouped by responsibility role. Click any node to focus direct interactions."
      : "Grouped by end-to-end interaction flow. Click any node to highlight direct edges.";

  applyMindMapSelection(nodes, mode);
}

function applyMindMapSelection(nodes, mode) {
  const host = document.getElementById("mindmap");
  const details = document.getElementById("mindmap-details");
  const nodeElements = [...host.querySelectorAll(".mindmap-node")];
  const edgeElements = [...host.querySelectorAll(".mindmap-edge")];

  nodeElements.forEach((nodeEl) => {
    const repo = nodeEl.dataset.repo;
    nodeEl.classList.toggle("active", activeRepo === repo);
  });

  edgeElements.forEach((edgeEl) => {
    const from = edgeEl.dataset.from;
    const to = edgeEl.dataset.to;
    const isActive = activeRepo && (from === activeRepo || to === activeRepo);
    edgeEl.classList.toggle("active", Boolean(isActive));
  });

  if (!activeRepo) {
    details.textContent =
      mode === "role"
        ? "Grouped by responsibility role. Click any node to focus direct interactions."
        : "Grouped by end-to-end interaction flow. Click any node to highlight direct edges.";
    return;
  }

  const node = nodes.find((item) => item.repo === activeRepo);
  const connected = edges
    .filter(([from, to]) => from === activeRepo || to === activeRepo)
    .map(([from, to]) => (from === activeRepo ? to : from));

  details.textContent = `${node.title} (${node.role}) connects with: ${connected.join(", ")}.`;
}

function setupMindMap() {
  const modeSelect = document.getElementById("mindmap-group-mode");
  const nodes = getNodes();

  const draw = () => renderMindMap(nodes, modeSelect.value);
  modeSelect.addEventListener("change", () => {
    activeRepo = null;
    draw();
  });
  window.addEventListener("resize", draw);
  draw();
}

async function init() {
  renderLayout({
    pageId: "ecosystem",
    title: "Medical Imaging Research Ecosystem",
    subtitle:
      "The six core projects connecting Orthanc ingestion, DICOM processing, orchestration, and interactive review."
  });

  setupMindMap();

  const repos = await fetchPublicOwnedRepos();
  const metaMap = toRepoMetaMap(repos);
  const coreProjects = projects.filter((project) => project.isCoreEcosystem);

  const host = document.getElementById("core-grid");
  host.innerHTML = coreProjects
    .map((project) => projectCard(project, metaMap.get(project.repo)))
    .join("");
}

init();

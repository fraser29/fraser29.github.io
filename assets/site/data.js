export const siteMeta = {
  owner: "fraser29",
  siteTitle: "Fraser's Research & Software Portfolio",
  githubUrl: "https://github.com/fraser29",
  orcidUrl: "https://orcid.org/0000-0002-2862-6633"
};

export const navItems = [
  { id: "home", href: "index.html", label: "Home" },
  { id: "research", href: "research.html", label: "Research" },
  { id: "repositories", href: "repositories.html", label: "Repositories (All)" },
  { id: "ecosystem", href: "ecosystem.html", label: "Medical Imaging Ecosystem" },
  { id: "clinical", href: "clinical-tools.html", label: "Clinical Tools" }
];

export const landingSections = [
  {
    title: "Research",
    description: "Public research profile, focus areas, and linked outputs.",
    href: "research.html"
  },
  {
    title: "Repositories (All)",
    description: "Browse all public repositories owned by fraser29.",
    href: "repositories.html"
  },
  {
    title: "Medical Imaging Ecosystem",
    description: "Deep dive into the six-project Orthanc-to-analysis stack.",
    href: "ecosystem.html"
  },
  {
    title: "Clinical Tools",
    description: "Clinical and translational tooling for MRI and workflow automation.",
    href: "clinical-tools.html"
  }
];

export const homeAbout = {
  heading: "About",
  text:
    "I build practical software for medical imaging research, from DICOM ingestion and automation to visualization and reproducible analysis workflows. This site is my living portfolio for public repositories, active ecosystem tools, and research-linked outputs."
};

export const areaNotes = {
  "Medical Imaging Ecosystem":
    "Integrated Orthanc-to-analysis stack for reproducible medical imaging pipelines.",
  "Clinical Research Applications":
    "Domain-specific tools for MRI and broader research workflows.",
  "Visualization & UX":
    "Interactive viewers and interfaces for 3D/4D data exploration.",
  "Data Interoperability":
    "Bridging formats and improving exchange between systems.",
  "Fabrication & Utilities":
    "Supporting tools for model handling and practical workflows."
};

export const flowStages = [
  {
    name: "Ingest & Trigger",
    detail:
      "Orthanc receives studies. autorthanc watches series stability and runs rule scripts to export matched studies."
  },
  {
    name: "Move & Organize",
    detail:
      "pourewa supports manual movement, while hurahura sets reproducible subject/exam directory structures."
  },
  {
    name: "Interpret DICOM",
    detail:
      "spydcmtk handles DICOM hierarchy, summarization, anonymization, and conversion to downstream-ready products."
  },
  {
    name: "Process Geometry",
    detail:
      "ngawari provides VTK-centric transforms and processing primitives for derived datasets."
  },
  {
    name: "Review & Markup",
    detail:
      "tui provides interactive viewing and annotation for QA and human-in-the-loop interpretation."
  },
  {
    name: "Research Outputs",
    detail:
      "Final validated outputs are organized for reproducibility, analysis, publication, and method development."
  }
];

export const projects = [
  {
    repo: "autorthanc",
    title: "autorthanc",
    area: "Medical Imaging Ecosystem",
    summary: "Containerized Orthanc + rule-based automation for study detection and export.",
    tags: ["orthanc", "automation", "dicom", "infrastructure"],
    links: { docs: "https://fraser29.github.io/autorthanc/" },
    isCoreEcosystem: true
  },
  {
    repo: "pourewa",
    title: "pourewa",
    area: "Medical Imaging Ecosystem",
    summary: "CLI toolkit for querying, moving, and managing studies in Orthanc.",
    tags: ["orthanc", "cli", "operations", "dicom"],
    links: { docs: "https://fraser29.github.io/pourewa/", pypi: "https://pypi.org/project/pourewa/" },
    isCoreEcosystem: true
  },
  {
    repo: "spydcmtk",
    title: "spydcmtk",
    area: "Medical Imaging Ecosystem",
    summary: "DICOM interpretation, anonymization, hierarchy handling, and conversion tools.",
    tags: ["dicom", "anonymization", "conversion", "python"],
    links: { docs: "https://fraser29.github.io/spydcmtk/", pypi: "https://pypi.org/project/spydcmtk/" },
    isCoreEcosystem: true
  },
  {
    repo: "ngawari",
    title: "ngawari",
    area: "Medical Imaging Ecosystem",
    summary: "VTK and numerical processing primitives for imaging and geometry workflows.",
    tags: ["vtk", "geometry", "processing", "utilities"],
    links: { docs: "https://fraser29.github.io/ngawari/", pypi: "https://pypi.org/project/ngawari/" },
    isCoreEcosystem: true
  },
  {
    repo: "hurahura",
    title: "hurahura",
    area: "Medical Imaging Ecosystem",
    summary: "Reproducible subject/exam orchestration for medical imaging research.",
    tags: ["workflow", "research", "orchestration", "python"],
    links: { docs: "https://fraser29.github.io/hurahura/", pypi: "https://pypi.org/project/hurahura/" },
    isCoreEcosystem: true
  },
  {
    repo: "tui",
    title: "tui",
    area: "Medical Imaging Ecosystem",
    summary: "Interactive viewing and fast keyboard-based markup workflow support.",
    tags: ["viewer", "annotation", "qa", "interactive"],
    links: {},
    isCoreEcosystem: true
  },
  {
    repo: "wepov",
    title: "wepov",
    area: "Visualization & UX",
    summary: "Standalone web-based 3D/4D polydata viewer.",
    tags: ["viewer", "webgl", "3d", "frontend"],
    links: {}
  },
  {
    repo: "shortCardiac",
    title: "shortCardiac",
    area: "Clinical Research Applications",
    summary: "Open-source framework for accelerated short-axis cardiac MRI analysis.",
    tags: ["cardiac", "mri", "analysis", "framework"],
    links: {},
    isClinicalTool: true
  },
  {
    repo: "kopare",
    title: "kopare",
    area: "Clinical Research Applications",
    summary: "Masking and inversion workflows for head MRI datasets.",
    tags: ["mri", "segmentation", "image-processing", "python"],
    links: {},
    isClinicalTool: true
  },
  {
    repo: "pdf2dcm",
    title: "pdf2dcm",
    area: "Data Interoperability",
    summary: "Python package to convert PDF content into DICOM-compatible objects.",
    tags: ["dicom", "conversion", "python", "interop"],
    links: {},
    isClinicalTool: true
  },
  {
    repo: "freesurfer_queue",
    title: "freesurfer_queue",
    area: "Clinical Research Applications",
    summary: "Basic queue system for FreeSurfer pipeline execution.",
    tags: ["freesurfer", "queue", "automation", "neuroimaging"],
    links: {},
    isClinicalTool: true
  },
  {
    repo: "kaihanga",
    title: "kaihanga",
    area: "Fabrication & Utilities",
    summary: "Utilities supporting 3D printing and model preparation.",
    tags: ["3d-printing", "utilities", "geometry", "tools"],
    links: {}
  }
];

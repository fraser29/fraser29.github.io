# fraser29.github.io

Personal GitHub Pages site for [fraser29](https://github.com/fraser29), focused on public projects and the medical imaging software ecosystem.

## Site structure

### Pages

- `index.html` - main landing page
- `research.html` - research page (includes ORCID)
- `repositories.html` - all public repos owned by `fraser29`
- `ecosystem.html` - medical imaging ecosystem deep dive
- `clinical-tools.html` - clinical/translational tools

### Shared assets

- `assets/site/styles.css` - shared styling
- `assets/site/data.js` - editable content and curated project catalog
- `assets/site/common.js` - shared layout and card helpers
- `assets/site/github.js` - GitHub API fetch helpers

### Page scripts

- `assets/site/home.js`
- `assets/site/research.js`
- `assets/site/repositories.js`
- `assets/site/ecosystem.js`
- `assets/site/clinical.js`

## Quick content updates

Most updates should happen in `assets/site/data.js`.

### Add or edit a project

Update the `projects` array. Each item supports:

- `repo`: GitHub repo name under `fraser29`
- `title`: display name
- `area`: category used for filtering
- `summary`: short project description
- `tags`: list of keywords
- `links`: optional `docs` and `pypi` URLs

### Update navigation and landing sections

Edit `navItems` and `landingSections` in `assets/site/data.js`.

### Update ORCID link

Edit `siteMeta.orcidUrl` in `assets/site/data.js`.

### Update the ecosystem flow

Edit `flowStages` to change the step titles and details in the interactive flow section.

## Local preview

Open `index.html` directly in a browser for quick checks, or use a static server:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.

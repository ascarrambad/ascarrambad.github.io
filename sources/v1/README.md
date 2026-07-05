# Matteo Riva personal website

Static personal website for GitHub Pages. It is intentionally dependency-free:
GitHub Pages can serve `index.html`, `styles.css`, `script.js`, and the files in
`assets/` directly from the repository root.

## Local preview

Open `index.html` in a browser, or run a small static server from this directory:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Editing

- Main content: `index.html`
- Visual system: `styles.css`
- Mobile menu and footer year: `script.js`
- Profile image and CV-derived assets: `assets/`

The layout follows the monochrome, compact, rule-based visual language of the
source CV while using patterns common in strong GitHub Pages academic and
developer homepages: concise intro, selected work, experience, research focus,
technical stack, and direct contact links.

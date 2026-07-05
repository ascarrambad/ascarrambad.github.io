# Matteo Riva — profile website

A source-driven portfolio built with Astro and strict TypeScript, deployed as a
static GitHub Pages site. The visual system follows the compact monochrome
language of the source CV without reproducing the PDF layout literally.

## Architecture

- `src/data/profile.yml` is the single editable source for website content.
- `src/lib/profile.ts` validates that content with Zod and exports inferred
  TypeScript types. Invalid or incomplete CV data fails the build.
- `src/components/` contains focused, reusable Astro components.
- `src/styles/global.css` contains the responsive visual system.
- `sources/` remains the private build input for the portrait, current CV, and
  original documents. Typed static endpoints publish only the portrait and PDF.
- `.github/workflows/deploy.yml` validates, builds, and deploys the static site.

YAML is used for structured CV data such as roles, dates, bullet points, and
technology lists. Markdown should be introduced only for longer project case
studies where rich prose is useful.

## Updating the CV

1. Export the new PDF into `sources/`.
2. Update `cv.url` and `cv.updated` in `src/data/profile.yml`.
3. Reconcile the relevant experience, project, education, and skill entries.
4. Run `npm run build` before committing.

The schema reports the exact field that is missing or malformed, preventing a
partial content update from reaching production.

## Development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Useful checks:

```sh
npm run check
npm run format:check
npm run build
npm run preview
```

## Deployment

In the repository settings, select **GitHub Actions** as the GitHub Pages source.
Every push to `main` runs the official Astro Pages action. The configuration
automatically handles both `username.github.io` repositories and project sites
served from `/repository-name/`.

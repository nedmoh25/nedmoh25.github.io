# NeuroMeshLab – GitHub Pages Site

This repository contains the NeuroMeshLab website built with Vite (vanilla TypeScript) and deployed on GitHub Pages at `neuromeshlab.github.io`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static site will be generated into `dist/`.

## Deploying to GitHub Pages

Because this is a User/Organization site (repository name is `neuromeshlab.github.io`), GitHub Pages serves from the root branch. You can deploy in two ways:

1) Direct deploy (recommended): commit the built `dist/` files to the root of your default branch. One approach is to build locally and copy contents of `dist/` to the repository root.

2) Automated action: use a workflow to build and push to the same repository. For user sites, Pages only serves from the root. If you prefer automation, create a second branch (e.g., `src`) for source, and have CI build and push to `main`.

Minimal manual deploy steps:

```bash
npm install
npm run build
# copy dist/* to repo root, commit, and push
```

Note: Project pages (non-`<user>.github.io`) need a `base` config and `gh-pages` branch. Since this is a user site, `base` is `/` and no special branch is required.



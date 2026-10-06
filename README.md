# Ashutosh Pandey Portfolio

A cinematic portfolio built with React, TypeScript, Vite and Tailwind CSS.

## Requirements

- Node.js 20.19+ or 22.12+ for the current Vite release line.
- VS Code or another code editor.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open the URL shown by Vite, normally:

```text
http://localhost:5173/
```

## Production build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Main files

- `src/App.tsx` — complete portfolio UI and interactions
- `src/index.css` — Tailwind import + custom styles
- `src/main.tsx` — React entry point
- `index.html` — page metadata and font loading
- `vite.config.ts` — Vite + React + Tailwind configuration

## Change your content

Most portfolio copy is in `src/App.tsx`:

- `projects`
- `navItems`
- `Experience()`
- `About()`
- `Contact()`

## Change the background video

At the top of `src/App.tsx`, replace `VIDEO_URL`.

## Change fonts

The two font stylesheet links live in `index.html`.

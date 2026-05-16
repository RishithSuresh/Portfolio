# Rishith Suresh · Aether 3D Portfolio

An immersive, gamified 3D portfolio built with **React**, **Vite**, **Three.js** (`@react-three/fiber`) and cinematic UI motion.

## Local setup

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deployment-ready notes

- Includes SPA rewrites for **Vercel** (`vercel.json`) and **Netlify** (`netlify.toml`).
- Includes SEO and social metadata in `index.html`.
- Includes `robots.txt`, `sitemap.xml`, and `site.webmanifest`.

### Deploying to GitHub Pages

Set the base path before building:

```bash
VITE_BASE_PATH=/Portfolio/ npm run build
```

Then publish the `dist` directory.


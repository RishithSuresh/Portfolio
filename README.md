# Rishith Suresh — Digital Lab Portfolio

A responsive React portfolio combining an editorial hero, asymmetrical bento layout, research showcase, project case studies, GitHub integration, interactive terminal, theme toggle and contact form.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build for production

```bash
npm run build
npm run preview
```

## Personalize before publishing

1. Open `src/data/site.js` and update the email, GitHub username, LinkedIn URL, biography and project details.
2. Put your actual CV at `public/cv.pdf`. The download button expects this exact path.
3. Replace project image URLs in `src/data/site.js` with your own screenshots, diagrams or optimized images.
4. Review research metrics and dataset counts carefully. Only publish verified results and clearly state experimental conditions.
5. Add a real form endpoint in `src/components/Contact.jsx` (Formspree or your own serverless endpoint). The current version opens the visitor's email client using a `mailto:` fallback.
6. Confirm dates, titles and descriptions for LRDE/DRDO, Unisys and BMSIT before publishing.

## GitHub integration

The homepage fetches public repositories from the GitHub public API using the username configured in `src/data/site.js`. It has loading, empty and error states. No personal access token is needed for basic public repository listings.

## Deployment

Import the repository into Vercel. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.

## Accessibility and performance

- Theme preference is persisted in local storage.
- Reduced-motion preferences are respected for the main animations.
- The 3D hero is lazy-loaded and has a CSS fallback.
- Custom cursor effects are desktop-only.
- Project cards and navigation are keyboard accessible.

## Project structure

```text
src/
  components/    Reusable interface components
  data/          Editable portfolio content
  pages/          Home and project detail routes
  styles/         Global theme and layout styles
public/
  cv-placeholder.md
```

# Gangwar — Portfolio

A cinematic, editorial personal portfolio built with React + Vite + Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints in your terminal.

## Editing your content

You almost never need to touch component files to update content:

- **Personal info, About text, Contact links** → `src/data/siteConfig.js`
- **Projects (title, image, description, why built, challenges, GitHub URL)** → `src/data/projects.js`
- **Project images** → drop files into `public/images/` (see `public/images/README.md`)

## Project structure

```
src/
  components/   shared UI building blocks
  sections/     page sections (Hero, About, Builds, Contact, ...)
  pages/        route-level views (project detail, etc.)
  data/         siteConfig.js + projects.js — edit these to update content
  animations/   shared motion variants + hooks (reduced motion, touch detection)
  styles/       global design tokens and base styles
public/
  images/       drop project images here
```

## Build status

This project is being built in phases. See the conversation history for what's
implemented so far and what's next.

- [x] Phase 1 — Architecture, Hero, About Me
- [x] Phase 2 — Builds section + project tiles + opening transition
- [x] Phase 3 — Project detail experience (What I Built / Why / Challenges / GitHub / Go Back)
- [ ] Phase 4 — Contact, Footer, responsive/accessibility/performance polish

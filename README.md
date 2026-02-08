# AEGIS Hackathon Demo Webapp

A demo web application for the AEGIS hackathon. Built with React, Vite, and Tailwind CSS.

## Tech stack

- **React** 18 + **TypeScript**
- **Vite** – build tool & dev server
- **Tailwind CSS** – styling
- **shadcn/ui** (Radix-based components)

## Getting started

### Prerequisites

- Node.js 18+
- npm (or pnpm/yarn)

### Install and run

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev
```

### Build for production

```bash
npm run build
```

Static output is generated in the `dist/` directory.

## GitHub Pages

This repo is set up to deploy to **GitHub Pages** on push to `main`.

1. In your repo: **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Deploy: push to `main` (auto), or run **`npm run deploy`** (requires [GitHub CLI](https://cli.github.com/) installed and `gh auth login`). The site will be at:
   - `https://aegis7702.github.io/demo/`

## Attributions

Third-party assets and components are listed in [ATTRIBUTIONS.md](./ATTRIBUTIONS.md).

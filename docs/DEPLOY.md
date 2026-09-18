# PacingPulse Deployment Guide

## 1. GitHub Pages Automated CI/CD

PacingPulse is configured for automatic deployment to GitHub Pages via GitHub Actions:

- **Target URL**: `https://tbahsan.github.io/PacingPulse/`
- **Base Path**: `/PacingPulse/` (configured in `vite.config.ts`)
- **Workflow File**: `.github/workflows/pages.yml`

### One-Time Repository Setup

1. Open your repository on GitHub: `https://github.com/tbahsan/PacingPulse`
2. Go to **Settings** &rarr; **Pages**.
3. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
4. Every push to the `main` branch will automatically run tests, build the static PWA bundle, and deploy to Pages.

## 2. Local Development & Preview

```bash
# Clone the repository
git clone https://github.com/tbahsan/PacingPulse.git
cd PacingPulse

# Install dependencies
npm install

# Start local development server with hot module reload
npm run dev

# Run unit and integration tests
npm test

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

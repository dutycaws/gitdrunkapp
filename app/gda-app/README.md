# GitDrunkApp

Minimal React app that lists nearby bars and lets users rate them. Ratings are stored in the browser session storage (key: `gda_ratings`).

Quick start

1. From this folder run:

```bash
npm install
npm run dev
```

2. Open the dev URL shown by Vite (usually http://localhost:5173).

Notes
- Ratings persist only for the browser session (closing the tab/window clears them).
- This is a minimal scaffold — extend with real data, maps, or geolocation as needed.

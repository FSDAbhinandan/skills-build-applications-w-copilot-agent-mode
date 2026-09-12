# OctoFit Tracker frontend

## Environment

For a Codespaces backend, define `VITE_CODESPACE_NAME` in `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes this value through `import.meta.env.VITE_CODESPACE_NAME`. The frontend requests API resources from `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. When the variable is unset, it safely falls back to `http://localhost:8000/api/[component]/`.

Run the presentation tier with:

```bash
npm run dev
```

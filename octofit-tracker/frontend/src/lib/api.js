const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const browserHost = typeof window !== 'undefined' ? window.location.hostname : '';
const inferredCodespaceName = browserHost.match(/^(.+)-5173\.app\.github\.dev$/)?.[1];
const codespaceName = configuredCodespaceName || inferredCodespaceName;
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export { apiOrigin };

export const getItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

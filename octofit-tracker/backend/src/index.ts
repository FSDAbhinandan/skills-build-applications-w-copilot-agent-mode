import express from 'express';
import database from './config/database.js';
import apiRouter from './routes.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: database.readyState === 1 ? 'connected' : 'connecting' });
});

app.use('/api', apiRouter);

const server = app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});

const shutdown = () => {
  server.close(() => {
    database.destroy();
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

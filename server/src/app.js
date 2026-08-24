import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import authRoutes from './routes/auth-routes.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundHandler } from './middleware/not-found-handler.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'campus-hub-api' });
});

app.use('/api/auth', authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

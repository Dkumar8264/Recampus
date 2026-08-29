import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

const connectionStateLabels = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting'
};

export const connectDatabase = async () => {
  mongoose.set('strictQuery', true);
  mongoose.set('autoIndex', env.mongoAutoIndex);

  await mongoose.connect(env.mongoUri, {
    autoIndex: env.mongoAutoIndex,
    maxPoolSize: env.mongoMaxPoolSize,
    serverSelectionTimeoutMS: env.mongoServerSelectionTimeoutMs
  });

  logger.info('MongoDB connected.', {
    database: mongoose.connection.name,
    host: mongoose.connection.host,
    autoIndex: env.mongoAutoIndex
  });
};

export const getDatabaseStatus = () => {
  const { readyState, host, name } = mongoose.connection;

  return {
    status: connectionStateLabels[readyState] ?? 'unknown',
    database: name || null,
    host: host || null
  };
};

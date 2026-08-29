import 'dotenv/config';
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { Chat } from '../models/chat-model.js';
import { Listing } from '../models/listing-model.js';
import { Message } from '../models/message-model.js';
import { Report } from '../models/report-model.js';
import { SavedSearch } from '../models/saved-search-model.js';
import { User } from '../models/user-model.js';
import { logger } from '../utils/logger.js';

const models = [User, Listing, Chat, Message, Report, SavedSearch];

const syncIndexes = async () => {
  mongoose.set('strictQuery', true);

  await mongoose.connect(env.mongoUri, {
    autoIndex: false,
    maxPoolSize: env.mongoMaxPoolSize,
    serverSelectionTimeoutMS: env.mongoServerSelectionTimeoutMs
  });

  for (const model of models) {
    await model.syncIndexes();
    logger.info('Indexes synced.', { model: model.modelName });
  }

  logger.info('Database indexes are ready.', {
    database: mongoose.connection.name,
    host: mongoose.connection.host
  });

  await mongoose.disconnect();
};

syncIndexes().catch(async (error) => {
  logger.error('Database index sync failed.', { message: error.message, stack: error.stack });
  await mongoose.disconnect();
  process.exit(1);
});

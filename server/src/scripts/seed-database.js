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

const seedDatabase = async () => {
  await mongoose.connect(env.mongoUri);

  await Promise.all([
    User.init(),
    Listing.init(),
    Chat.init(),
    Message.init(),
    Report.init(),
    SavedSearch.init()
  ]);

  const demoEmail = `demo@${env.allowedEmailDomain}`;
  let demoUser = await User.findOne({ email: demoEmail });

  if (!demoUser) {
    demoUser = await User.create({
      name: 'Demo Student',
      email: demoEmail,
      password: 'password123',
      branch: 'CSE',
      year: 3,
      emailVerified: true
    });
  }

  const existingDemoListing = await Listing.findOne({
    postedBy: demoUser._id,
    title: 'Demo lost notebook'
  });

  if (!existingDemoListing) {
    await Listing.create({
      type: 'lost',
      title: 'Demo lost notebook',
      description: 'A sample listing for checking browse, detail, and my listings pages.',
      category: 'stationery',
      location: 'library',
      postedBy: demoUser._id
    });
  }

  logger.info('Database seeded.', {
    demoEmail,
    demoPassword: 'password123'
  });

  await mongoose.disconnect();
};

seedDatabase().catch(async (error) => {
  logger.error('Database seed failed.', { message: error.message, stack: error.stack });
  await mongoose.disconnect();
  process.exit(1);
});

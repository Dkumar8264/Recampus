import { logger } from '../utils/logger.js';

export const notifyOfflineChatMessage = async ({ recipientEmail, listingTitle, senderName }) => {
  logger.info('Queued offline chat notification.', {
    recipientEmail,
    listingTitle,
    senderName
  });
};

export const notifySavedSearchMatch = async ({ recipientEmail, listingTitle, searchLabel }) => {
  logger.info('Queued saved search match notification.', {
    recipientEmail,
    listingTitle,
    searchLabel
  });
};

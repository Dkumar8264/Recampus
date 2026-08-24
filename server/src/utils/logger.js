const writeLog = (level, message, metadata = {}) => {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...metadata
  };

  const output = JSON.stringify(payload);

  if (level === 'error') {
    console.error(output);
    return;
  }

  console.log(output);
};

export const logger = {
  info: (message, metadata) => writeLog('info', message, metadata),
  warn: (message, metadata) => writeLog('warn', message, metadata),
  error: (message, metadata) => writeLog('error', message, metadata)
};

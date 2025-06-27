import axios from 'axios';

export const log = async (
  stack: string,
  level: string,
  pkg: string,
  message: string
) => {
  try {
    await axios.post('https://log-api.dev/track', {
      stack,
      level,
      package: pkg,
      message,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Logging failed', err);
  }
};

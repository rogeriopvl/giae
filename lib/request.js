import got from 'got';
import cookieJar from '../lib/cookie-jar.js';
import { getConfig } from '../lib/config.js';

const request = async (endpoint, body) => {
  const config = getConfig();

  const url = `${config.giaeBaseUrl}${endpoint}`;

  const httpsOptions = config.disableCertificateValidation
    ? {
        rejectUnauthorized: false, // Ignore SSL errors
      }
    : {};

  return got
    .post(url, { json: { ...body }, https: httpsOptions, cookieJar })
    .json();
};

export default request;

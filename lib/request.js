import got from 'got';
import cookieJar from '../lib/cookie-jar.js';
import { getConfig } from '../lib/config.js';

const baseOptions = () => {
  const config = getConfig();
  const httpsOptions = config.disableCertificateValidation
    ? { rejectUnauthorized: false } // Ignore SSL errors
    : {};
  return {
    url: config.giaeBaseUrl,
    options: { https: httpsOptions, cookieJar },
  };
};

const post = async (endpoint, body) => {
  const { url, options } = baseOptions();
  return got.post(`${url}${endpoint}`, { ...options, json: body }).json();
};

const get = async (endpoint) => {
  const { url, options } = baseOptions();
  return got.get(`${url}${endpoint}`, options).json();
};

export default { post, get };

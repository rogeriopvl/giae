import request from '../lib/request.js';
import { getConfig } from '../lib/config.js';

const ENDPOINT = '/loginv2';

const login = async () => {
  const config = getConfig();

  return request(ENDPOINT, {
    escola: config.schoolId,
    nrcartao: config.cardNumber,
    codigo: config.password,
    modo: config.mode,
  });
};

export default login;

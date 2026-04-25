import request from '../lib/request.js';

const ENDPOINT = '/saldo';

export const saldo = async () => {
  return request.get(ENDPOINT);
};

export default { saldo };

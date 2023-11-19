import test from 'ava';
import nock from 'nock';

import Giae from '../index.js';

test('should call request with the correct params', async (t) => {
  const GIAE_BASE_URL = 'https://test.com/test.exe';

  const expectedBody = {
    escola: 'escola123',
    nrcartao: '12345',
    codigo: 'password',
    modo: 'manual',
  };

  const giae = Giae({
    giaeBaseUrl: GIAE_BASE_URL,
    schoolId: expectedBody.escola,
    cardNumber: expectedBody.nrcartao,
    password: expectedBody.codigo,
    mode: expectedBody.modo,
  });

  const request = nock(GIAE_BASE_URL)
    .post('/loginv2', expectedBody)
    .reply(200, { success: true });

  await giae.login();

  t.deepEqual(request.isDone(), true);
});

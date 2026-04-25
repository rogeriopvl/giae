import test from 'ava';
import nock from 'nock';

import Giae from '../index.js';

test('saldo: should call request with the correct params', async (t) => {
  const GIAE_BASE_URL = 'https://test.com/test.exe';

  const giae = Giae({
    giaeBaseUrl: GIAE_BASE_URL,
    schoolId: 'escola123',
    cardNumber: '12345',
    password: 'password',
    mode: 'manual',
  });

  const request = nock(GIAE_BASE_URL)
    .get('/saldo')
    .reply(200, { success: true });

  await giae.saldo();

  t.deepEqual(request.isDone(), true);
});

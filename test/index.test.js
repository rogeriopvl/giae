import test from 'ava';

import Giae from '../index.js';

test('should expose all supported endpoint methods', async (t) => {
  const GIAE_BASE_URL = 'https://test.com/test.exe';

  const giae = Giae({
    giaeBaseUrl: GIAE_BASE_URL,
    schoolId: 'schoolId',
    cardNumber: 'cardNumber',
    password: 'password',
    mode: 'manual',
  });

  t.is(typeof giae.login, 'function');
  t.is(typeof giae.disciplinas, 'function');
  t.is(typeof giae.sumarios, 'function');
  t.is(typeof giae.saldo, 'function');
  t.is(typeof giae.movimentos, 'function');
  t.is(typeof giae.extratos, 'function');
  t.is(typeof giae.creditos, 'function');
});

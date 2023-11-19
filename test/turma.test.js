import test from 'ava';
import nock from 'nock';

import Giae from '../index.js';

test('disciplinas: should call request with the correct params', async (t) => {
  const GIAE_BASE_URL = 'https://test.com/test.exe';

  const expectedBody = { acao: 'disciplinas' };

  const giae = Giae({
    giaeBaseUrl: GIAE_BASE_URL,
    schoolId: expectedBody.escola,
    cardNumber: expectedBody.nrcartao,
    password: expectedBody.codigo,
    mode: expectedBody.modo,
  });

  const request = nock(GIAE_BASE_URL)
    .post('/turma', expectedBody)
    .reply(200, { success: true });

  await giae.disciplinas();

  t.deepEqual(request.isDone(), true);
});

test('sumarios: should call request with the correct params', async (t) => {
  const GIAE_BASE_URL = 'https://test.com/test.exe';

  const expectedBody = {
    acao: 'sumarios',
    IdTurma: '12345',
    IdDisciplina: '111',
  };

  const giae = await Giae({
    giaeBaseUrl: GIAE_BASE_URL,
    schoolId: expectedBody.escola,
    cardNumber: expectedBody.nrcartao,
    password: expectedBody.codigo,
    mode: expectedBody.modo,
  });

  const request = nock(GIAE_BASE_URL)
    .post('/turma', expectedBody)
    .reply(200, { success: true });

  await giae.sumarios('12345', '111');

  t.deepEqual(request.isDone(), true);
});

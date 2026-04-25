import test from 'ava';
import nock from 'nock';

import Giae from '../index.js';

const GIAE_BASE_URL = 'https://test.com/test.exe';

const buildClient = () =>
  Giae({
    giaeBaseUrl: GIAE_BASE_URL,
    schoolId: 'escola123',
    cardNumber: '12345',
    password: 'password',
    mode: 'manual',
  });

test('movimentos: should call request with the correct params', async (t) => {
  const giae = buildClient();

  const request = nock(GIAE_BASE_URL)
    .post('/movimentoscartao', {
      datainicial: '01-01-2026',
      datafinal: '31-01-2026',
      setor: 'bar',
      acao: 'pesquisa',
    })
    .reply(200, { success: true });

  await giae.movimentos({
    startDate: '01-01-2026',
    endDate: '31-01-2026',
    sector: 'bar',
  });

  t.deepEqual(request.isDone(), true);
});

test('movimentos: should default sector to empty string when omitted', async (t) => {
  const giae = buildClient();

  const request = nock(GIAE_BASE_URL)
    .post('/movimentoscartao', {
      datainicial: '01-01-2026',
      datafinal: '31-01-2026',
      setor: '',
      acao: 'pesquisa',
    })
    .reply(200, { success: true });

  await giae.movimentos({
    startDate: '01-01-2026',
    endDate: '31-01-2026',
  });

  t.deepEqual(request.isDone(), true);
});

test('extratos: should call request with the correct params', async (t) => {
  const giae = buildClient();

  const request = nock(GIAE_BASE_URL)
    .post('/movimentoscartao', {
      idcarteiradigital: 'wallet-1',
      acao: 'get_extrato_cartao',
    })
    .reply(200, { success: true });

  await giae.extratos({ digitalWalletID: 'wallet-1' });

  t.deepEqual(request.isDone(), true);
});

test('creditos: should call request with the correct params', async (t) => {
  const giae = buildClient();

  const request = nock(GIAE_BASE_URL)
    .post('/movimentoscartao', { acao: 'get_creditos_pendentes' })
    .reply(200, { success: true });

  await giae.creditos();

  t.deepEqual(request.isDone(), true);
});

import request from '../lib/request.js';

const ENDPOINT = '/movimentoscartao';

export const pesquisa = async ({ startDate, endDate, sector = '' }) => {
  return request.post(ENDPOINT, {
    datainicial: startDate,
    datafinal: endDate,
    setor: sector,
    acao: 'pesquisa',
  });
};

export const getExtratoCartao = async ({ digitalWalletID = 1 }) => {
  return request.post(ENDPOINT, {
    idcarteiradigital: digitalWalletID,
    acao: 'get_extrato_cartao',
  });
};

export const getCreditosPendentes = async () => {
  return request.post(ENDPOINT, { acao: 'get_creditos_pendentes' });
};

export default { pesquisa, getExtratoCartao, getCreditosPendentes };

import { setConfig } from './lib/config.js';
import loginv2 from './endpoints/loginv2.js';
import turma from './endpoints/turma.js';

export default ({
  giaeBaseUrl,
  schoolId,
  cardNumber,
  password,
  mode = 'manual',
  disableCertificateValidation = false,
}) => {
  setConfig({
    giaeBaseUrl,
    schoolId,
    cardNumber,
    password,
    mode,
    disableCertificateValidation,
  });

  return {
    login: loginv2,
    disciplinas: turma.disciplinas,
    sumarios: turma.sumarios,
  };
};

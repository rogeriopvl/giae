import request from '../lib/request.js';

const ENDPOINT = '/turma';

export const disciplinas = async () => {
  return request(ENDPOINT, { acao: 'disciplinas' });
};

export const sumarios = async (classId, courseId) => {
  return request(ENDPOINT, {
    IdDisciplina: courseId,
    IdTurma: classId,
    acao: 'sumarios',
  }).then((data) => ({ courseId, data }));
};

export default {
  disciplinas,
  sumarios,
};

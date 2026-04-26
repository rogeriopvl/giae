import request from '../lib/request.js';

const ENDPOINT = '/turma';

export const disciplinas = async () => {
  return request.post(ENDPOINT, { acao: 'disciplinas' });
};

export const sumarios = async (classId, courseId) => {
  return request
    .post(ENDPOINT, {
      IdDisciplina: courseId,
      IdTurma: classId,
      acao: 'sumarios',
    })
    .then((data) => ({ courseId, data }));
};

export default {
  disciplinas,
  sumarios,
};

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async (id, { subjectRepositoryMySQL }) => {
  // Se comprueba que se recibe un nombre
  if (!id) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El id es necesario para realizar el borrado del aula o laboratorio', 'name_empty');
  }

  // Se comprueba que existe un aula o laboatorio con ese nombre
  const subject = await subjectRepositoryMySQL.getSubject(id);
  if (!subject) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El aula o laboratorio no está regitrado', 'not_space_exist');
  }

  return subjectRepositoryMySQL.deleteSubject(id);
};

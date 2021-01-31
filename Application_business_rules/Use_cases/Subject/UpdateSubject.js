const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async ({ subjectData }, { subjectRepositoryMySQL }) => {
  // Se comprueba que se ha recibido el id
  const { id } = subjectData;
  if (!id) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Es necesario un id para realizar la actualización', 'id_not_exit');
  }

  // Se comprueba que existe la asignatura
  const subject = await subjectRepositoryMySQL.getSubject(id);
  if (!subject) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'La asignatura no existe', 'subject_not_exist');
  }

  // Se comprueba que se ha recibido el nombre para ser modificado
  const { name } = subjectData;
  if (!name) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario al menos un parámetro para actualizar', 'incomplete_data');
  }

  return subjectRepositoryMySQL.updateSubject({ subjectData });
};

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async (name, { subjectRepositoryMySQL }) => {
  // Se comrpueba que el aula o laboratorio no existe mediante el nombre
  const subjectExist = await subjectRepositoryMySQL.getName(name);
  if (subjectExist) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'La asignatura ya está registrada', 'subject_exist');
  }

  return subjectRepositoryMySQL.createSubject(name);
};

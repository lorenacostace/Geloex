const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async (name, { spaceRepositoryMySQL }) => {
  // Se comprueba que se recibe un nombre
  if (!name) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El nombre es necesario para consultar un aula o laboratorio', 'name_empty');
  }

  // Se comprueba que exista el aula o laboratorio
  const space = await spaceRepositoryMySQL.getName(name);
  if (!space) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El aula o laboratorio solicitado no está regitrado', 'not_space_exist');
  }

  return space;
};

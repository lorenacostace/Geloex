const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async (id, { spaceRepositoryMySQL }) => {
  // Se comprueba que se recibe un id
  if (!id) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El id es necesario para consultar un aula o laboratorio', 'name_empty');
  }

  // Se comprueba que exista el aula o laboratorio
  const space = await spaceRepositoryMySQL.getSpace(id);
  if (!space) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El aula o laboratorio solicitado no está regitrado', 'not_space_exist');
  }

  return space;
};

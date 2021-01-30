const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async (name, { spaceRepositoryMySQL }) => {
  // Se comprueba que se recibe un id
  if (!name) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El ID es necesario para realizar la actualización', 'id_empty');
  }
  const space = await spaceRepositoryMySQL.getName(name);
  if (!space) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El aula o laboratorio no está regitrado', 'not_space_exist');
  }
  return space;
};

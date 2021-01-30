const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async (name, { spaceRepositoryMySQL }) => {
  // Se comprueba que se recibe un nombre
  if (!name) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El nombre es necesario para realizar la actualización', 'name_empty');
  }

  // Se comprueba que existe un aula o laboatorio con ese nombre
  const space = await spaceRepositoryMySQL.getName(name);
  if (!space) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El aula o laboratorio no está regitrado', 'not_space_exist');
  }

  const { id } = space;
  return spaceRepositoryMySQL.deleteSpace(id);
};

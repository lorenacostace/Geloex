const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async (space, { spaceRepositoryMySQL }) => {
  const name = space.getName();
  // Se comprueba que el aula o laboratorio no existe mediante el nombre
  const nameExist = await spaceRepositoryMySQL.getName(name);
  if (nameExist) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'Ese aula o laboratorio ya está registrado', 'space_exist');
  }

  const spaceData = space.toJSON();
  return spaceRepositoryMySQL.createSpace({ spaceData });
};

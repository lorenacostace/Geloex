const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async ({ spaceData }, { spaceRepositoryMySQL }) => {
  // Se comprueba que se ha recibido el nombre
  const { id } = spaceData;
  if (!id) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Es necesario un id para realizar la actualización', 'id_not_exit');
  }

  // Se comprueba que existe un aula o laboratorio
  const space = await spaceRepositoryMySQL.getSpace(id);
  if (!space) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El aula o laboratorio no existe', 'space_not_exist');
  }

  // Se comprueba que al menos se ha recibido un parámetro para modificar
  const { name, numRows, numSeats, isLab } = spaceData;
  if (!name && !numRows && !numSeats && !isLab) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario al menos un parámetro para actualizar', 'incomplete_data');
  }

  return spaceRepositoryMySQL.updateSpace({ spaceData });
};

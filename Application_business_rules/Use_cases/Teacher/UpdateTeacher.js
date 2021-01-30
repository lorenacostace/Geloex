const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async ({ teacherData }, { userRepositoryMySQL }) => {
  // Se comprueba que se ha recibido el id
  const { id } = teacherData;
  if (!id) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El ID es necesario para realizar la actualización', 'id_empty');
  }
  // Se comprueba que existe un usuario para ese id
  const seqTeacher = await userRepositoryMySQL.getUser(id);
  if (!seqTeacher) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }
  // Se comprueba que al menos se ha recibido un parámetro para modificar
  const { name, fSurname, sSurname, email, role } = teacherData;
  if (!name && !fSurname && !sSurname && !email && !role) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario al menos un parámetro para actualizar', 'incomplete_data');
  }
  return userRepositoryMySQL.updateUser({ teacherData });
};

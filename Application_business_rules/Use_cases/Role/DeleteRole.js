const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async ({ userData }, { userRepositoryMySQL }) => {
  const { idAdmin, idUser, role } = userData;
  // Se comprueba que se recibe un id
  if (!idAdmin || !idUser) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Es necesario el identificador del usuario y del adminSystem', 'id_not_found');
  }
  // Se comprueba que exista un usuario administrador con ese id
  const isAdmin = await userRepositoryMySQL.getUser(idAdmin);
  if (!isAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }

  // Se comprueba que exista el usuario a eliminar
  const isUser = await userRepositoryMySQL.getUser(idUser);
  if (!isUser) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }

  // Comprueba el número de roles que tiene el usuario
  const numRoles = await userRepositoryMySQL.userRoles(idUser);
  console.log(numRoles);
  if (numRoles.length <= 1) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario únicamente tiene un rol asignado', 'user_not_exist');
  }

  return userRepositoryMySQL.deleteRole({ roleData: { idUser, role } });
};

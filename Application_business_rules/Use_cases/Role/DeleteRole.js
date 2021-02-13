const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async ({ userData }, { userRepositoryMySQL }) => {
  const { idAdmin, idUser, role } = userData;

  // Se comprueba que se recibe el id del administrador de sistemas y el id del usuario
  if (!idAdmin || !idUser) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Es necesario el identificador del usuario y del adminSystem', 'id_not_found');
  }

  // Se comprueba que el id del administrador y el id del usuario son números
  if (Number.isNaN(Number(idUser)) || Number.isNaN(Number(idAdmin))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El idAdmin y el idUser deben ser números', 'id_format_error');
  }

  // Se comprueba que exista un usuario administrador de sistemas con ese id
  const isAdmin = await userRepositoryMySQL.getUser(idAdmin);
  if (!isAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }

  // Se comprueba que el usuario con idAmin tiene rol Administrador de Sistemas
  const isRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { idUser: idAdmin, role: ROLES.ADMIN_SYS } });
  if (!isRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de Sistemas para añadir un rol a un usuario', 'role _assigned');
  }

  // Se comprueba que exista el usuario a eliminar
  const isUser = await userRepositoryMySQL.getUser(idUser);
  if (!isUser) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }

  // Comprueba el número de roles que tiene el usuario
  const numRoles = await userRepositoryMySQL.userRoles(idUser);
  if (numRoles.length <= 1) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario únicamente tiene un rol asignado', 'user_not_exist');
  }

  return userRepositoryMySQL.deleteRole({ roleData: { idUser, role } });
};

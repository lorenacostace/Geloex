const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async ({ usersData }, { userRepositoryMySQL }) => {
  const { idAdmin, idUser } = usersData;

  // Se comprueba que se reciben los ids, el del admin y el del usuario a borrar, y que son números
  if (!idAdmin || !idUser || Number.isNaN(Number(idUser)) || Number.isNaN(Number(idAdmin))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El ID del administrador y del usuario son necesarios y deben ser números', 'id_empty');
  }

  // Se comprueba que el usuario que solicita el borrado exista
  const existAdmin = await userRepositoryMySQL.getUser(idAdmin);
  if (!existAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El administrador no existe, no es posible borrar el usuario', 'user_not_exist');
  }

  // Se comprueba que el usuario con idAdmin es un administrador de sistemas
  const isRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idAdmin, role: ROLES.ADMIN_SYS } });
  if (!isRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de Sistemas para eliminar un rol a un usuario', 'role_not_assigned');
  }

  // Se comprueba que exista un usuario a ser eliminar
  const existUser = await userRepositoryMySQL.getUser(idUser);
  if (!existUser) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }

  // Se comprueba que el usuario con idUser es un administrador de exámenes
  const hasRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idUser, role: ROLES.ADMIN_EXAM } });
  if (!hasRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario no tiene rol de administrador de exámenes', 'role_not_assigned');
  }

  return userRepositoryMySQL.deleteUser(idUser);
};

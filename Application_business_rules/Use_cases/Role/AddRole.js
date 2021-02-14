const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async ({ roleData }, { userRepositoryMySQL }) => {
  const { idAdmin, idUser, role } = roleData;

  // Se comprueba que se recibe el id del administrador de sistemas y el id del usuario
  if (!idAdmin || !idUser) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Es necesario el identificador del usuario y del adminSystem', 'id_not_found');
  }

  // Se comprueba que el id del administrador y el id del usuario son números
  if (Number.isNaN(Number(idUser)) || Number.isNaN(Number(idAdmin))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El idAdmin y el idUser deben ser números', 'id_format_error');
  }

  // Se comprueba que el usuario con idAdmin existe
  const adminExist = await userRepositoryMySQL.getUser(idAdmin);
  if (!adminExist) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El administrador no existe', 'users_not_exist');
  }

  // Se comprueba que el usuario que solicita añadir el rol sea AdminSystem
  const isRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { idUser: idAdmin, role: ROLES.ADMIN_SYS } });
  if (!isRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de Sistemas para añadir un rol a un usuario', 'role _assigned');
  }

  // Se comprueba que el usuario a modificar existe
  const userExist = await userRepositoryMySQL.getUser(idUser);
  if (!userExist) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario no existe', 'users_not_exist');
  }

  // Se comprueba que ese rol no está asignado a ese usuario
  const isSameRole = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idUser, role } });
  if (isSameRole) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario ya tiene asignado ese rol', 'role _assigned');
  }

  return userRepositoryMySQL.addRole({ roleData: { UserId: idUser, role } });
};

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async ({ roleData }, { userRepositoryMySQL }) => {
  const { idAdmin, idUser, roleCurrent, roleNew } = roleData;

  // Se comprueba que se recibe el id del administrador de sistemas y el id del usuario
  if (!idAdmin || !idUser || !roleCurrent || !roleNew) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Los identificadores y roles son necesarios', 'incomplete_data');
  }

  // Se comprueba que el id del administrador y el id del usuario son números
  if (Number.isNaN(Number(idUser)) || Number.isNaN(Number(idAdmin))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El idAdmin y el idUser deben ser números', 'id_format_error');
  }

  // Se comprueba que el id del administrador está registrado
  const adminExist = await userRepositoryMySQL.getUser(idAdmin);
  if (!adminExist) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario no existe', 'users_not_exist');
  }

  // Se comprueba que el usuario que solicita modificar el rol sea AdminSystem
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
  const isSameRole = await userRepositoryMySQL.getRole({ userRoleData: { idUser, role: roleNew } });
  if (isSameRole) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario ya tiene asignado ese rol', 'role_assigned');
  }

  // Se comprueba que el rol que debe modificarse existe para ese usuario
  const isCurrentRole = await userRepositoryMySQL.getRole({ userRoleData: { idUser, role: roleCurrent } });
  if (!isCurrentRole) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El rol que se desea modificar no existe', 'role_not_assigned');
  }

  return userRepositoryMySQL.modifyRole({ userRoleData: { idUser, roleCurrent, roleNew } });
};

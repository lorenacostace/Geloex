const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async ({ roleData }, { userRepositoryMySQL }) => {
  const { idAdmin, idUser, role } = roleData;

  // Se comprueba que el usuario que solicita añadir el rol sea AdminSystem
  // eslint-disable-next-line max-len
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
  const isSameRole = await userRepositoryMySQL.getRole({ userRoleData: { idUser, role } });
  if (isSameRole) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario ya tiene asignado ese rol', 'role _assigned');
  }

  return userRepositoryMySQL.addRole({ roleData: { idUser, role } });
};

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async ({ usersData }, { userRepositoryMySQL }) => {
  const { idAdmin, idUser } = usersData;

  // Se comprueba que se reciben el idAdmin y el idUser
  if (!idAdmin || !idUser) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para realizar la actualización', 'id_empty');
  }

  // Se comprueba que los ids recibidos son números
  if (Number.isNaN(Number(idAdmin)) || Number.isNaN(Number(idUser))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids deben ser números', 'id_format_error');
  }

  // Se comprueba que el usuario con idAdmin existe
  const existAdmin = await userRepositoryMySQL.getUser(idAdmin);
  if (!existAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El administrador no existe', 'user_not_exist');
  }

  // Se comprueba que el idAdmin tiene rol de administrador de sistemas
  const isRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { idUser: idAdmin, role: ROLES.ADMIN_SYS } });
  if (!isRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de Sistemas para añadir un rol a un usuario', 'role_not_assigned');
  }

  // Se comprueba que el usuario existe
  const adminSystem = await userRepositoryMySQL.getUser(idUser);
  if (!adminSystem) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }

  // Se comprueba que el idUser tiene rol de administrador de sistemas
  const hasRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { idUser, role: ROLES.ADMIN_SYS } });
  if (!hasRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario seleccionado no es administrador de sistemas', 'role_not_assigned');
  }

  return adminSystem;
};

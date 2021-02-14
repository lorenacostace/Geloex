const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

const DeleteRoles = require('../Role/DeleteRoles');

module.exports = async ({ usersData }, { userRepositoryMySQL }) => {
  const { idAdmin, idUser } = usersData;

  // Se comprueba que se reciben  los ids
  if (!idAdmin || !idUser) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids son necesarios para eliminar al profesor', 'id_empty');
  }

  // Se comprueba que los ids sean números
  if (Number.isNaN(Number(idAdmin)) || Number.isNaN(Number(idUser))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids deben ser números', 'id_format_error');
  }

  // Se comprueba que el usuario con idAdmin existe
  const existAdmin = await userRepositoryMySQL.getUser(idAdmin);
  if (!existAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El administrador no existe', 'user_not_exist');
  }

  // Se comprueba que el idAdmin tiene rol de adminsitrador de sistemas
  const isRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idAdmin, role: ROLES.ADMIN_SYS } });
  if (!isRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de Sistemas para eliminar un rol a un usuario', 'role_not_assigned');
  }

  // Se comprueba que exista un usuario para ese id
  const seqTeacher = await userRepositoryMySQL.getUser(idUser);
  if (!seqTeacher) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }

  // Se comprueba que el usuario con idUser es un profesor
  const hasRoleTeacher = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idUser, role: ROLES.TEACHER } });
  if (!hasRoleTeacher) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario no tiene rol de profesor', 'role_not_assigned');
  }

  return userRepositoryMySQL.deleteUser(idUser);
};

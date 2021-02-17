const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async (idAdmin, { spaceRepositoryMySQL }, { userRepositoryMySQL }) => {
  // Se comprueba que se ha recibido el id
  if (!idAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El id del administrador es necesario');
  }

  // Se comprueba que el id sea un número
  if (Number.isNaN(Number(idAdmin))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
  }
  // Se comprueba que el id existe
  const existAdmin = await userRepositoryMySQL.getUser(idAdmin);
  if (!existAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El administrador no existe', 'user_not_exist');
  }

  // Se comprueba que el idAdmin tiene rol de gestión
  const isRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idAdmin, role: ROLES.ADMIN_EXAM } });
  if (!isRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de Sistemas para listar usuarios', 'role_not_assigned');
  }

  return spaceRepositoryMySQL.getSpaces();
};

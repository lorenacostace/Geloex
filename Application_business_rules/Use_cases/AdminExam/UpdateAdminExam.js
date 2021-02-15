const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async ({ usersData }, { userRepositoryMySQL }) => {
  const { idAdmin, idUser, name, fSurname, sSurname, email } = usersData;

  // Se comprueban que se han recibido el id del administrador de sistemas y el id del profesor
  if (!idAdmin || !idUser) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para realizar la actualización', 'id_empty');
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
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de Sistemas para actualizar un rol a un usuario', 'role _assigned');
  }
  // Se comprueba que existe un usuario para ese id
  const seqTeacher = await userRepositoryMySQL.getUser(idUser);
  if (!seqTeacher) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }

  // Se comprueba que al menos se ha recibido un parámetro para modificar
  if (!name && !fSurname && !sSurname && !email) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario al menos un parámetro para actualizar', 'incomplete_data');
  }

  // Se comprueba que el usuario con idUser es un administrador de exámenes
  const hasRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idUser, role: ROLES.ADMIN_EXAM } });
  if (!hasRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario no tiene rol de administrador de exámenes', 'role_not_assigned');
  }

  const userData = {
    id: idUser, name, fSurname, sSurname, email,
  };
  return userRepositoryMySQL.updateUser({ userData });
};

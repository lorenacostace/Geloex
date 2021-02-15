const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async (idAdmin, adminSys, { userRepositoryMySQL }) => {
  // Se comprueba que se ha recibido el idAdmin
  if (!idAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El ID del administrador es necesario', 'id_empty');
  }

  // Se comprueba que el idAdmin recibido es un número
  if (Number.isNaN(Number(idAdmin))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El ID del administrador ser un número', 'id_format_error');
  }

  // Se comprueba que el usuario que solicita el la creación de usuario exista
  const existAdmin = await userRepositoryMySQL.getUser(idAdmin);
  if (!existAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El administrador no existe, no es posible borrar el usuario', 'user_not_exist');
  }

  // Se comprueba que el usuario con idAdmin tiene rol de administrador de exámenes
  const isRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idAdmin, role: ROLES.ADMIN_SYS } });
  if (!isRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de Sistemas para añadir un rol a un usuario', 'role _assigned');
  }

  // Se comrpueba que el usuario no existe mediante el email
  const email = adminSys.getEmail();
  const emailExist = await userRepositoryMySQL.getByEmail(email);
  if (emailExist) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'Este usuario ya está registrado', 'email_exist');
  }

  const userData = adminSys.toJSON();
  const adminSysInfo = await userRepositoryMySQL.createUser({ userData });

  // Extraemos el id que ha sido asignado a este nuevo usuario, y lo guardamos con el rol correspondiente
  const { id } = adminSysInfo;
  const role = adminSys.getRole();
  const roleData = {
    UserId: id,
    role,
  };
  await userRepositoryMySQL.addRole({ roleData });

  return adminSysInfo;
};

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async (adminSys, { userRepositoryMySQL }) => {
  // Se comrpueba que el usuario no existe mediante el email
  const email = adminSys.getEmail();
  const emailExist = await userRepositoryMySQL.getByEmail(email);
  if (emailExist) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'Este usuario ya está registrado', 'email_exist');
  }

  const userData = adminSys.toJSON();
  const adminSysInfo = await userRepositoryMySQL.createUser({ userData });

  // eslint-disable-next-line max-len
  // Extraemos el id que ha sido asignado a este nuevo usuario, y lo guardamos con el rol correspondiente
  const { id } = adminSysInfo;
  const role = adminSys.getRole();
  const roleData = {
    idUser: id,
    role,
  };
  await userRepositoryMySQL.addRole({ roleData });

  return adminSysInfo;
};

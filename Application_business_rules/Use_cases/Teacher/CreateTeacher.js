const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async (idAdmin, teacher, { userRepositoryMySQL }) => {
  // Comprobamos que se ha recibido el idAdmin y que es un número
  if (!idAdmin || Number.isNaN(Number(idAdmin))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Es necesario el identificador del adminSystem y que sea un número', 'incomplete_data');
  }

  // Comprobamos que el idAdmin es un usuario registrado
  const existAdmin = await userRepositoryMySQL.getUser(idAdmin);
  if (!existAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El administrador no existe', 'user_not_exist');
  }

  // Comprobamos que idAdmin tiene rol de administrador de sistemas
  const isRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { idUser: idAdmin, role: ROLES.ADMIN_SYS } });
  if (!isRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de Sistemas para añadir un rol a un usuario', 'role _assigned');
  }

  const email = teacher.getEmail();
  // Se comprueba que el usuario no existe mediante el email
  const emailExist = await userRepositoryMySQL.getByEmail(email);
  if (emailExist) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'Este email ya está registrado', 'email_exist');
  }

  const userData = teacher.toJSON();
  const teacherInfo = await userRepositoryMySQL.createUser({ userData });

  // Extraemos el id que ha sido asignado a este nuevo usuario, y lo guardamos con el rol correspondiente
  const { id } = teacherInfo;
  const role = teacher.getRole();
  const roleData = {
    idUser: id,
    role,
  };
  await userRepositoryMySQL.addRole({ roleData });

  return teacherInfo;
};

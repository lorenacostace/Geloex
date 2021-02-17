const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async (idAdmin, exam, { examRepositoryMySQL }, { userRepositoryMySQL }) => {
  // Se comprueba que se recibe idUser y es un número
  if (idAdmin && Number.isNaN(Number(idAdmin))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El id es necesario y debe ser un número', 'id_format_error');
  }

  // Se comprueba que han sido recibidos los datos necesarios (subject y group)
  if (!exam.getSubject() || !exam.getGroup() || !exam.getDate()) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'La asignatura,el grupo y la fecha son datos necesarios', 'incomplete_data');
  }

  // Se comprueba que es un usuario registrado
  const adminExist = await userRepositoryMySQL.getUser(idAdmin);
  if (!adminExist) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }

  // Se comprueba que el idAdmin tiene rol de administrador
  const isRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idAdmin, role: ROLES.ADMIN_EXAM } });
  if (!isRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de Sistemas para añadir un rol a un usuario', 'role _assigned');
  }

  const examData = exam.toJSON();
  return examRepositoryMySQL.createExam(examData);
};

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async (inscribedData, repositories) => {
  const { idExam, idAdmin } = inscribedData;
  const { userRepositoryMySQL, inscribedRepositoryMySQL, examRepositoryMySQL } = repositories;
  if (!idExam || !idAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para la inscripción', 'incomplete_data');
  }
  // Se comprueba que se recibe idAdmin y es un número
  if (Number.isNaN(Number(idExam)) && Number.isNaN(Number(idAdmin))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El id es necesario y debe ser un número', 'id_format_error');
  }

  // Se comprueba que es un usuario registrado
  const adminExamExist = await userRepositoryMySQL.getUser(idAdmin);
  if (!adminExamExist) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }

  // Se comprueba que el idAdmin tiene rol de adminsitrador de exámenes
  const isRoleAdminExam = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idAdmin, role: ROLES.ADMIN_EXAM } });
  if (!isRoleAdminExam) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de administrador de exámenes para inscribirse a un examen', 'role_not_assigned');
  }

  // Se comprueba que el examen existe
  const existExam = await examRepositoryMySQL.getExam(idExam);
  if (!existExam) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El examen no existe', 'exam_not_exist');
  }

  return inscribedRepositoryMySQL.getListInscribed(idExam);
};

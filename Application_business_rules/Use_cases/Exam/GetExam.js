const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async (examData, repositories) => {
  const { idAdmin, idExam } = examData;
  const { examRepositoryMySQL, userRepositoryMySQL } = repositories;

  // Se comprueba que se reciben el idAdmin y el idUser
  if (!idAdmin || !idExam) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para realizar la consulta', 'id_empty');
  }

  // Se comprueba que los ids recibidos son números
  if (Number.isNaN(Number(idAdmin)) || Number.isNaN(Number(idExam))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids deben ser números', 'id_format_error');
  }

  // Se comprueba que el usuario con idAdmin existe
  const existAdmin = await userRepositoryMySQL.getUser(idAdmin);
  if (!existAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El administrador no existe', 'user_not_exist');
  }

  // Se comprueba que el idAdmin tiene rol de administrador de exámenes
  const isRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idAdmin, role: ROLES.ADMIN_EXAM } });
  if (!isRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de exámenes para solicitar información de un examen', 'role_not_assigned');
  }

  const exam = await examRepositoryMySQL.getExam(idExam);
  if (!exam) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El examen no existe', 'exam_not_exist');
  }

  return exam;
};

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async (examData, repositories) => {
  const { idAdmin, idExam } = examData;
  const { userRepositoryMySQL, examRepositoryMySQL } = repositories;

  // Se comprueba que se reciben los ids, el del admin y el del usuario a borrar, y que son números
  if (!idAdmin || !idExam || Number.isNaN(Number(idExam)) || Number.isNaN(Number(idAdmin))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El ID del administrador y del usuario son necesarios y deben ser números', 'id_empty');
  }

  // Se comprueba que el usuario que solicita el borrado exista
  const existAdmin = await userRepositoryMySQL.getUser(idAdmin);
  if (!existAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El administrador no existe, no es posible borrar el usuario', 'user_not_exist');
  }

  // Se comprueba que el usuario con idAdmin es un administrador de exámenes
  const isRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idAdmin, role: ROLES.ADMIN_EXAM } });
  if (!isRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de exámenes para eliminar un examen', 'role_not_assigned');
  }

  // Se comprueba que exista un examen a eliminar
  const existExam = await examRepositoryMySQL.getExam(idExam);
  if (!existExam) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El examen no existe', 'exam_not_exist');
  }

  return examRepositoryMySQL.deleteExam(idExam);
};

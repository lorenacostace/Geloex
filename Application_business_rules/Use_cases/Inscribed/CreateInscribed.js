const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async (inscribedData, repositories) => {
  const { UserId, ExamId } = inscribedData;
  const { userRepositoryMySQL, inscribedRepositoryMySQL, examRepositoryMySQL } = repositories;
  if (!UserId || !ExamId) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para la inscripción', 'incomplete_data');
  }
  // Se comprueba que se recibe idUser y es un número
  if (Number.isNaN(Number(UserId)) && Number.isNaN(Number(ExamId))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El id es necesario y debe ser un número', 'id_format_error');
  }

  // Se comprueba que es un usuario registrado
  const studentExist = await userRepositoryMySQL.getUser(UserId);
  if (!studentExist) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }

  // Se comprueba que el UserId tiene rol de estudiante
  const isRoleStudent = await userRepositoryMySQL.getRole({ userRoleData: { UserId, role: ROLES.STUDENT } });
  if (!isRoleStudent) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de estudiante para inscribirse a un examen', 'role_not_assigned');
  }

  // Se comprueba que el examen existe
  const existExam = await examRepositoryMySQL.getExam(ExamId);
  if (!existExam) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El examen no existe', 'exam_not_exist');
  }

  // Se comprueba que esté registrado en ese examen
  const isStudentInExam = await inscribedRepositoryMySQL.isInscribed(inscribedData);
  if (isStudentInExam) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El estudiante ya está inscrito en ese examen', 'student_registered');
  }

  return inscribedRepositoryMySQL.createInscribed(inscribedData);
};

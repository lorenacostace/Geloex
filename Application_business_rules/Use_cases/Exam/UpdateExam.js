const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async ({ dataExam }, repositories) => {
  const { idAdmin, id, subject, group, date, teacher, space, state } = dataExam;
  const { userRepositoryMySQL, examRepositoryMySQL } = repositories;

  // Se comprueban que se han recibido el id del administrador de sistemas y el id del examen
  if (!idAdmin || !id) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para realizar la actualización', 'id_empty');
  }

  // Se comprueba que los ids sean números
  if (Number.isNaN(Number(idAdmin)) || Number.isNaN(Number(id))) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids deben ser números', 'id_format_error');
  }

  // Se comprueba que el usuario con idAdmin existe
  const existAdmin = await userRepositoryMySQL.getUser(idAdmin);
  if (!existAdmin) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El administrador no existe', 'user_not_exist');
  }

  // Se comprueba que el idAdmin tiene rol de adminsitrador de exámenes
  const isRoleAdmin = await userRepositoryMySQL.getRole({ userRoleData: { UserId: idAdmin, role: ROLES.ADMIN_EXAM } });
  if (!isRoleAdmin) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'El usuario actual necesita rol de Administrador de exámenes para actualizar un examen', 'role_not_assigned');
  }
  // Se comprueba que exista un examen a modificar
  const existExam = await examRepositoryMySQL.getExam(id);
  if (!existExam) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El examen no existe', 'exam_not_exist');
  }

  // Se comprueba que al menos se ha recibido un parámetro para modificar
  if (!subject && !group && !date && !teacher && !space && !state) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario al menos un parámetro para actualizar', 'incomplete_data');
  }

  return examRepositoryMySQL.updateExam({ examData: { idAdmin, ...dataExam } });
};

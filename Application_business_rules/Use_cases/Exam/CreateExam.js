const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

const { ROLES } = require('../../../Enterprise_business_rules/constant');

module.exports = async (idAdmin, exam, repositories) => {
  const { examRepositoryMySQL, userRepositoryMySQL, reservationRepositoryMySQL } = repositories;
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

  // Se comprueba que ya exista un examen con esta asignatura, el grupo y la fecha
  const dataExam = {
    subject: exam.subject,
    group: exam.group,
    date: exam.date.toString(),
  };
  const existExam = await examRepositoryMySQL.existExam(dataExam);
  if (existExam) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'Ya existe un examen con estos datos', 'exam_exist');
  }

  const examData = exam.toJSON();
  const examInfo = await examRepositoryMySQL.createExam(examData);

  // Se comprueba si se va a actualizar un aula, y si es así, se actualiza la reserva o se reserva
  const { id } = examInfo;
  if (exam.getSpace()) {
    const reservationData = {
      ExamId: id,
      SpaceId: exam.getSpace(),
      date: exam.date.toString(),
    };
    await reservationRepositoryMySQL.addReservation(reservationData);
  }

  return examInfo;
};

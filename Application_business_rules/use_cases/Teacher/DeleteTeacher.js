const ResponseError = require('../../../Enterprise_business_rules/Entities/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/codeError');

module.exports = async (id, { userRepositoryMySQL }) => {
  // Se comprueba que se recibe un id
  if (!id) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El ID es necesario para realizar la actualización', 'id_empty');
  }
  // Se comprueba que exista un usuario para ese id
  const seqTeacher = await userRepositoryMySQL.getUser(id);
  if (!seqTeacher) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
  }
  return userRepositoryMySQL.deleteUser(id);
};

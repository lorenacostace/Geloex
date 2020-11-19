const ResponseError = require('../../../Enterprise_business_rules/Entities/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/codeError');

module.exports = async (teacher, { userRepositoryMySQL }) => {
  const email = teacher.getEmail();
  // Se comrpueba que el usuario no existe mediante el email
  const emailExist = await userRepositoryMySQL.getByEmail(email);
  if (emailExist) {
    throw new ResponseError(TYPES_ERROR.ERROR, 'Este email ya está registrado', 'email_exist');
  }
  const teacherData = teacher.toJSON();
  return userRepositoryMySQL.createUser({ teacherData });
};

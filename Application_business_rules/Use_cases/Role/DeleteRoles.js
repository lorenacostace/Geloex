const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

module.exports = async (idUser, { userRepositoryMySQL }) => {
  // Comprueba el número de roles que tiene el usuario no sea 0
  const numRoles = await userRepositoryMySQL.userRoles(idUser);
  if (numRoles.length < 1) {
    throw new ResponseError(TYPES_ERROR.FATAL, 'El usuario no dispone de roles', 'user_not_exist');
  }

  return userRepositoryMySQL.deleteRoles(idUser);
};

'use strict';

const { TYPES_ERROR } = require('../Enterprise_business_rules/Manage_error/codeError');

module.exports = (response) => {
  const typesError = {
    [TYPES_ERROR.FATAL]: 500,
    [TYPES_ERROR.ERROR]: 400,
    default: 100,
  };

  return (typesError[response.typeError] || typesError.default);
};

'use strict';

class ResponseError extends Error {
  constructor(typeError, message, alias) {
    super(message);

    this.typeError = typeError;
    this.alias = alias;
    this.isOperational = true;
    // Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      typeError: this.typeError,
      alias: this.alias,
      message: this.message,
    };
  }
}

module.exports = ResponseError;

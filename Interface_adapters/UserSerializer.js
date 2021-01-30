'use strict';

const serializeSingleUser = (user) => ({
  id: user.id,
  'first-name': user.firstName,
  'last-name': user.lastName,
  email: user.email,
});

module.exports = class {
  // eslint-disable-next-line class-methods-use-this
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(serializeSingleUser);
    }
    return serializeSingleUser(data);
  }
};

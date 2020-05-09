'use strict';

module.exports = (id, role,{ userRepository }) => {
    // console.log(userRepository.getList(id, role));
    return userRepository.getList(id, role);
};
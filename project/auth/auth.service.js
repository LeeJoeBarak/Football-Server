var jwt = require('jsonwebtoken');

const createWebToken = (payload) => {
    return jwt.sign(payload, 'shhhhh');

}

module.exports = {
    createWebToken: createWebToken
}
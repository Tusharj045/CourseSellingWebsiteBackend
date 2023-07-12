const fs = require('fs');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const Utils = {
    getLoginToken: (username) => {
        const token = jwt.sign({
            username
        }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return token;
    }
};

module.exports = Utils;

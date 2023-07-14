const jwt = require('jsonwebtoken');
// require('dotenv').config();

module.exports = {
    auth: (req, res, next) => {
        const token = req.headers.authorization.split(' ');
        try {
            var decoded = jwt.verify(token[1], process.env.SECRET_KEY);
            req.username = decoded.username;
        } catch(err) {
            console.log(err);
            return res.status(400).send({message: 'Invalid token', err})
        }
        next()
    }
}
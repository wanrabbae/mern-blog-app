const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.header('auth-token')
    console.log(token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }
    const verified = jwt.verify(token, 'testing')
    req.user = verified
    next()
}
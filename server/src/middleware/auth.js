const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.header('auth-token')

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized. silahkan login atau register terlebih dahulu'
            })
        }
        req.decoded = decoded;
        next();
    });
}
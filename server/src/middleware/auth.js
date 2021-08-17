const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.header('auth-token')

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    jwt.verify(token, 'testing', (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({
                success: false,
                message: 'Unauthorized. silahkan login atau register terlebih dahulu'
            })
        }
        req.decoded = decoded;
        next();
    });
}
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants')

const auth = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Токен отсутствует"
        })
    }

    try {
        const verifyResult = jwt.verify(token, JWT_SECRET)

        req.user = {
            email: verifyResult.email
        }

        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Невалидный токен"
        })
    }
}

module.exports = auth
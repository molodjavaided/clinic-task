const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants')
const User = require('../models/User')

const auth = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Токен отсутствует"
        })
    }

    try {
        const verifyResult = jwt.verify(token, JWT_SECRET)

        const user = await User.findById(verifyResult.userId)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Пользователь не найден'
            })
        }
        req.user = {
            id: user._id.toString()
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
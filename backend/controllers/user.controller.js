const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../constants')

const addUser = async (email, password) => {
   try {
      const passwordHash = await bcrypt.hash(password, 10)
   const user = await User.create({ email, password: passwordHash });
   return user
   } catch (error) {
      throw new Error(`Ошибка в создании пользователя ${error.message}`)
   }
}

const loginUser = async (email, password) => {
   const user = await User.findOne({email })

   if (!user) {
      throw new Error('Такого пользователя нет')
   }

   const isPasswordCorrect = await bcrypt.compare(password, user.password);

   if (!isPasswordCorrect) {
      throw new Error('Пароль неверный')
   }

   return jwt.sign({ email }, JWT_SECRET, {expiresIn: '30d' });
}

module.exports = { addUser, loginUser }
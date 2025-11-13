
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { addName, getNames } = require('./notes.controller')
const connectDB = require('./db')
const { addUser, loginUser } = require('./controllers/user.controller')
const auth = require('./middlewares/auth')

const port = 3000
const app = express()

connectDB();

app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.post('/api/login', async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);

    res.cookie('token', token);

    res.json({
      success: true,
      message: "Вход успешно выполнен"
    })
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message
    })
  }
})



app.get('/api/names', auth, async (req, res) => {
  try {
    const names = await getNames(req.user.id)
    res.json(names)
  } catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: 'Ошибка при получении данных'
    })
  }
})

app.post('/api/name', async (req, res) => {
  try {
    const savedData = await addName(
      req.body.namePatient,
       req.body.phone,
       req.body.problem
      )

    res.status(201).json({
      success: true,
      message: 'Заявка успешно отправлена',
      data: savedData
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: 'Ошибка при добавлении данных'
    })
  }
})

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}...`);
})
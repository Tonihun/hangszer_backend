const express = require('express')

const userRoutes = require('./routes/userRoutes')


const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

app.use('/users/', userRoutes)


module.exports = app
const express = require('express')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes')


const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/users/', userRoutes)


module.exports = app
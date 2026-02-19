const express = require('express')

const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

app.use('/users/', userRoutes)


app.use(cors({
    origin: ['http://127.0.0.1:5173&#39;, http://localhost:5173&#39;']
}))

module.exports = app
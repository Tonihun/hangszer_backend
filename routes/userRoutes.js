const express = require("express")
const { register, login, logout, postal } = require("../controllers/userController")
const {auth} = require('../middleware/userMiddleware')


const router= express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/logout', logout)

router.post('/postal', postal)


module.exports=router
const express = require("express")
const { register, login, logout, getCityByPostalCode } = require("../controllers/userController")
const {auth} = require('../middleware/userMiddleware')


const router= express.Router()

router.post('/regisztracio', register)
router.post('/bejelentkezes', login)

router.get('/logout', logout)

router.get('/postal/:postalCode', getCityByPostalCode)


module.exports=router
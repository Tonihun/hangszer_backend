const bcrypt = require("bcrypt")
const { config } = require('../config/dotenvConfig')
const jwt = require('jsonwebtoken')
const { findByEmail, createUser } = require('../models/userModel')

const cookieOptions = {
    httpOn: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
}

async function register(req, res) {
    try {
        const { username, psw, email, phoneNumber, address, postalCode } = req.body
        //console.log(username, psw, email);
        if (!username || !psw || !email || !phoneNumber || !address || !postalCode) {
            return res.status(400).json({ error: "Minden mezőt tölts ki!" })
        }

        if ( isNaN(phoneNumber)) {
            return res.status(400).json({error: "Hibás telefonszám"})
        }

        if (isNaN(postalCode)) {
            return res.status(400).json({error: "Hibás irányítószám"})
        }

        const alreadyExists = await findByEmail(email)
        if (alreadyExists) {
            return res.status(409).json({ error: 'Ezzel az emaillel már regisztráltak' })
        }
        const hash = await bcrypt.hash(psw, 15)

        const { insertId } = await createUser(username, email, hash, phoneNumber, address, postalCode)

        return res.status(201).json({ message: "Sikeres Regisztráció", insertId })


    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a regisztrációban", err })
    }

}

async function login(req, res) {
    try {
        const { email, psw } = req.body
      // console.log(email, psw);
        if (!email || !psw) {
            return res.status(400).json({ error: "Tölts ki minden mezőt" })
        }

        const userSQL = await findByEmail(email)
        //console.log(userSQL);
        if (!userSQL) {
            return res.status(401).json({ error: 'Hibás email' })
        }

        const ok = await bcrypt.compare(psw, userSQL.PSW)
        console.log(ok);
        if (!ok) {
            return res.status(401).json({ error: 'hibás jelszó' })
        }

        const token = jwt.sign({
            id: userSQL.user_id, username: userSQL.username, email: userSQL.email,
            phoneNumber: userSQL.phoneNumber, address: userSQL.address, postalCode: userSQL.postalCode, role: userSQL.role
        },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
        )

        res.cookie(config.COOKIE_NAME, token, cookieOptions)
        return res.status(200).json({ message: 'Sikeres bejelentkezés' })


    } catch (err) {

        console.log(err);
        return res.status(500).json({ error: 'Bejelentkezési hiba' })
    }

}

async function logout(res) {
    return res.clearCookie(config.COOKIE_NAME, {path: '/'}).status(200).json({message:'kijelentkezve'})
}

async function postal(req,res) {
    const {postal} = req.body


}

module.exports = { register, login, logout, postal }
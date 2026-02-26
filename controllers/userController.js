const bcrypt = require("bcrypt")
const { config } = require('../config/dotenvConfig')
const jwt = require('jsonwebtoken')
const { findByEmail, createUser, findByPostalCode } = require('../models/userModel')

const cookieOptions = {
    httpOn: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
}
//ads
async function register(req, res) {
    //console.log(req);
    try {
        const { username, email, psw,  phoneNumber, postalCode, city, street_housenumber } = req.body
        console.log(username, email, psw,  phoneNumber, postalCode, city, street_housenumber);
        if (!username || !email ||  !psw || !phoneNumber || !postalCode || !city || !street_housenumber) {
            return res.status(400).json({ error: "Minden mezőt tölts ki!" })
        }

        if ( isNaN(phoneNumber)) {
            return res.status(400).json({error: "Hibás telefonszám"})
        }

        if (isNaN(postalCode)) {
            return res.status(400).json({error: "Hibás irányítószám"})
        }
        if (postalCode.length < 4 ||postalCode.length > 4) {
            return res.status(400).json({error: "Az irányítószám 4 számból kell hogy álljon"})
        }


        const alreadyExists = await findByEmail(email)
        if (alreadyExists) {
            return res.status(409).json({ error: 'Ezzel az emaillel már regisztráltak' })
        }
        const hash = await bcrypt.hash(psw, 15)

        const { insertId } = await createUser(username, email, hash, phoneNumber, postalCode, city, street_housenumber)

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
            phoneNumber: userSQL.phoneNumber, city: userSQL.city, street_housenumber: userSQL.street_housenumber, postalCode: userSQL.Postal_Code, role: userSQL.role
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

async function logout(req, res) {
    return res.clearCookie(config.COOKIE_NAME, {path: '/'}).status(200).json({message:'kijelentkezve'})
}

async function getCityByPostalCode(req, res) {
    try {
        const { postalCode } = req.params

        if (!postalCode || isNaN(postalCode)) {
            return res.status(400).json({ error: "Hibás irányítószám" })
        }

        const city = await findByPostalCode(postalCode)

        if (!city) {
            return res.status(404).json({ error: "Nincs ilyen irányítószám" })
        }

        return res.status(200).json({
            postalCode,
            city: city.City
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Szerver hiba" })
    }
}



module.exports = { register, login, logout, getCityByPostalCode }
const db = require("../db/db")

async function findByEmail(email) {

    const sql = 'SELECT * FROM `users` WHERE `Email` = ?'
    const [result] = await db.query(sql, [email])

    return result[0] || null

}
//Fiók létrehozása
async function createUser(username, email,  hash, phoneNumber, Postal_Code, city, street_housenumber ) {

    const sql = 'INSERT INTO `users`(`User_Id`, `Username`, `Email`, `PSW`, `Phone_Number`, `Postal_Code`, `City`, `Street_Housenumber`, `User_Role`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, "user")'
    const [result] = await db.query(sql, [username, email, hash,  phoneNumber, Postal_Code, city, street_housenumber ])
 
    return { insertId: result.insertId }
}

//admin fiók létrehozása
async function createAdmin(username, email, hash ) {

    const sql = 'INSERT INTO `users`(`User_Id`, `Username`, `Email`, `PSW`, `User_Role`) VALUES (NULL, ?, ?, ?, "admin")'
    const [result] = await db.query(sql, [username, email, hash ])
 
    return { insertId: result.insertId }
}

//Irányítószám alapján település
async function findByPostalCode(postalCode) {
    const sql = 'SELECT City FROM postal_codes WHERE Postal_Code_DB = ?'
    const [result] = await db.query(sql, [postalCode])

    return result[0] || null
}



module.exports = { findByEmail, createUser, createAdmin ,findByPostalCode }

const db = require("../db/db")

async function findByEmail(email) {

    const sql = 'SELECT * FROM `users` WHERE `Email` = ?'
    const [result] = await db.query(sql, [email])

    return result[0] || null

}

async function createUser(username, email, hash, phoneNumber, address, postalCode) {


    const sql = 'INSERT INTO `users`(`User_Id`, `Username`, `Email`, `PSW`, `Phone_Number`, `Address`, `Postal_Code`, `User_Role`) VALUES (NULL, ?, ?, ?, ?, ?, ?, "user")'
    const [result] = await db.query(sql, [username, email, hash, phoneNumber, address, postalCode])
    return { insertId: result.insertId }
}

module.exports = { findByEmail, createUser }

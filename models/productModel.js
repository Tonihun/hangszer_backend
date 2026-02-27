const db = require("../db/db")
async function createProduct(Product_Name,Product_Price, Product_IMG, Categories) {
    
const sql = 'INSERT INTO `products`(`Product_Id`, `Product_Price`, `Product_Name`, `Product_IMG`, `Categories`) VALUES (NULL,?,?,?,?)'

const [result] = await db.query(sql, [Product_Name,Product_Price, Product_IMG, Categories])



}



module.exports = {createProduct}
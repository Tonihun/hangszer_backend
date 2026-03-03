const db = require("../db/db")

async function createProduct(Product_Name,Product_Description, ProductPrice, SubCategoryId, Product_IMG, Stock) {
    
    const sql = 'INSERT INTO `products`(`Product_Id`, `Product_Name`, `ProductDescription`, `ProductPrice`, `ProductIMG`, `Subcategory_Id`, `Stock`) VALUES (NULL, ?, ?, ?, ?, ?, ?)'
    await db.query(sql, [Product_Name,Product_Description, ProductPrice, SubCategoryId, Product_IMG, Stock])
    
const [result] = await db.query(sql, [Product_Name,Product_Description, ProductPrice, SubCategoryId, Product_IMG, Stock])


return { insertId: result.insertId }

}



module.exports = {createProduct}
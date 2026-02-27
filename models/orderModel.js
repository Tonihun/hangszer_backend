const db = require("../db/db")


async function createOrder(User_Id, Order_Condition) {
 

    const sql = 'INSERT INTO `orders`(`Order_Id`, `User_Id`, `Order_Condition`, `Date`) VALUES (NULL, ?, ?, current_timestamp())' 
    const [result] = await db.query(sql, [User_Id, Order_Condition])


    return { insertId: result.insertId }
}

async function createOrderItems(orderId, productId, quantity, price) {
 
    const sql = 'INSERT INTO `order_items`(`Item_Id`, `Order_Id`, `Product_Id`, `Quantity`, `Price`) VALUES (NULL, ?, ?, ?, ?)' 
    const [result] = await db.query(sql, [orderId, productId, quantity, price])


    return { insertId: result.insertId }
}

module.exports= {createOrder, createOrderItems}

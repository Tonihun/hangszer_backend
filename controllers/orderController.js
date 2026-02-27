const { createOrder, createOrderItems } = require('../models/orderModel')


//Rendelés állapot hozzáadása
async function addOrder(req, res) {
    const AllowedCondition = ["Pending", "En route", "Cancelled", "Delivered"]
    const { User_Id, orderCondition } = req.body


    if (isNaN(User_Id)) {
        return res.status(400).json({error: "A userId csak szám lehet"})
    }



    if (!orderCondition || !User_Id) {
        return res.status(400).json({ error: "Töltsd ki a mezőt" })
    }

    if (!AllowedCondition.includes(orderCondition)) {
        return res.status(400).json({ error: "Nem megfelelő rendelési állapot" })
    }

    const { insertId } = await createOrder(User_Id, orderCondition)

    return res.status(201).json({ message: "Rendelés állapot hozzáadva", insertId })

}


//Rendelés értékek hozzáadása
async function addOrderItems(req, res) {
    const { orderId, productId, quantity, price } = req.body

    if (!quantity || !price) {
        return res.status(400).json({ error: "Minden mezőt tölts ki" })
    }

    if (isNaN(price) || isNaN(quantity)) {
        return res.status(400).json({ error: "Árnak és mennyiségnek számot adj meg" })
    }


    const { insertId } = await createOrderItems(orderId, productId, quantity, price)

    return res.status(201).json({ message: "Rendelés értékek hozzáadva", insertId })

}

module.exports = { addOrder, addOrderItems }
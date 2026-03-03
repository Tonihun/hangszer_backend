
const { createProduct } = require('../models/productModel')


async function addProduct(req, res) {
   try {
      const { ProductName, ProductDescription, ProductPrice, SubCategoryId, ProductIMG, Stock } = req.body;

      if (!ProductName || ProductDescription || !ProductPrice || !SubCategoryId || !ProductIMG || !Stock) {
         return res.status(400).json({ error: "Minden mezőt tölts ki!" })
      }

      if (!req.file) {
         return res.status(400).json({ error: "Kép feltöltése kötelező" });
      }

      const imagePath = req.file.filename;

      res.status(201).json({ message: "Termék sikeresen létrehozva" });

   } catch (err) {
      res.status(500).json({ error: "Hiba a termék létrehozásánál" });
   }
}

module.exports = { addProduct }
async function newProduct() {
     const {Product_Name,Product_Price, Product_IMG, Categories } = req.body

     if (  !Product_Name || !Product_Price || !Product_IMG || !Categories  ) {
        return res.status(400).json({error: "Minden mezőt tölts ki"})
     }
     if (condition) {
        
     }

}
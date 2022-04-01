const express = require("express");
const Cart = require("../model/cart.model");
const router = express.Router();

router.get("/price", async(req, res) => {
  try{
    let cart = await Cart.find({}, {price: 1}).lean().exec();
    let sum = 0; 
    for(let i = 0; i < cart.length; i++){
      sum += cart[i].price;
    }
    return res.send({ sum });
  }
  catch(e){
    return res.status(500).json({
      message: e.message, 
      status: "Failed"
    });
  }
});

//To get the data from cart collection ***
router.get("/", async(req, res) => {
      const cart = await Cart.find().lean().exec();
      //Where we are passing the data and which data we are passing
      //products is the folder name and cart_page is the file name
        return res.render("products/cart", {
          cart,
        });
        // return res.send(cart);
});

router.get("/:id", async(req, res) => {
  try{
    const product = await Cart.findByIdAndDelete(req.params.id).lean().exec();
    return res.send(product);
  }
  catch(e){
    return res.status(500).json({
      message: e.message, 
      status: "Failed"
    });
  }
});

module.exports = router;
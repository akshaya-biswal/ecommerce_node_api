const Product = require("../models/Product");

class ProductController {
  async Add(req, res) {
    const newProduct = new Product(req.body);

    try {
      const saveProduct = await newProduct.save();
      res.status(201).json(saveProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new ProductController();

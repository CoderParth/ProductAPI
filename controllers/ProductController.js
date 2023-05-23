const express = require("express");
const router = express.Router();
const productService = require("../services/prismaService");

// GET  /products
router.get("/", async (req, res) => {
  try {
    const { name, quantity, stock, category, isActive, page, limit } =
      req.query;

    const filters = {
      name: name || undefined,
      quantity: quantity ? parseInt(quantity) : undefined,
      stock: stock ? parseInt(stock) : undefined,
      category: category || undefined,
      isActive: isActive ? isActive === "true" : undefined,
    };

    const pagination = {
      skip: page ? (parseInt(page) - 1) * parseInt(limit) : undefined,
      take: limit ? parseInt(limit) : undefined,
    };

    const products = await productService.getAllProducts(filters, pagination);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Products not found" });
  }
});

// POST /products
router.post("/", async (req, res) => {
  const productData = req.body;
  try {
    const createdProduct = await productService.createProduct(productData);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /products/:id
router.get("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const product = await productService.getProduct(productId);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /products/name/:name
router.get("/name/:name", async (req, res) => {
  const productName = req.params.name;
  try {
    const product = await productService.getProductByName(productName);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /products/:id
router.put("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const productData = req.body;
  try {
    const updatedProduct = await productService.updateProduct(
      productId,
      productData
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /products/:id
router.delete("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    await productService.deleteProduct(productId);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

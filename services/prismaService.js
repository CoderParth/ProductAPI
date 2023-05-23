const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createProduct(productData) {
  const product = await prisma.product.create({ data: productData });
  return product;
}

async function updateProduct(productId, productData) {
  const product = await prisma.product.update({
    where: { id: productId },
    data: productData,
  });
  return product;
}

async function deleteProduct(productId) {
  const product = await prisma.product.delete({
    where: { id: productId },
  });
  return product;
}

async function getProduct(productId) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  return product;
}

async function getAllProducts(filters, pagination) {
  const { name, quantity, stock, category, isActive } = filters;
  const { skip, take } = pagination;

  const products = await prisma.product.findMany({
    where: {
      name: name ? { contains: name } : undefined,
      quantity: quantity ? { equals: quantity } : undefined,
      stock: stock ? { equals: stock } : undefined,
      category: category ? { equals: category } : undefined,
      isActive: isActive !== undefined ? { equals: isActive } : undefined,
    },
    skip,
    take,
  });

  return products;
}

async function getProductByName(productName) {
  const product = await prisma.product.findFirst({
    where: { name: productName },
  });
  return product;
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  getProductByName,
};

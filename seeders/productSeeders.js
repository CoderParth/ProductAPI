const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const products = [
  {
    name: "Product 1",
    description: "This is product 1",
    stock: 10,
    quantity: 100,
    category: "clothing",
    isActive: true,
  },
  {
    name: "Product 2",
    description: "This is product 2",
    stock: 5,
    quantity: 50,
    category: "shoes",
    isActive: true,
  },
];

async function seed() {
  try {
    for (const product of products) {
      await prisma.product.create({
        data: product,
      });
    }

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

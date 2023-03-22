const express = require("express");
const app = express();
const { faker } = require("@faker-js/faker");
const port = 3001;

app.get("/", (req, res) => {
  res.send("hola mundo, desde express");
});

app.get("/products", (req, res) => {
  const products = [];
  for(let i = 0; i < 10; i++) {
    products.push({
      id: i+1,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.imageUrl(),
    });
  }
  res.json({
    products,
  });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: `Producto ${id}`,
  });
});

app.get("/categories", (req, res) => {
  res.json({
    categories: [
      {
        id: 1,
        name: "Categoria 1",
      },
      {
        id: 2,
        name: "Categoria 2",
      },
    ],
  });
});

app.get("/categories/:id/products", (req, res) => {
  const { id } = req.params;
  res.json({
    products: [
      {
        id: 1,
        name: `Producto 1 de la categoria ${id}`,
      },
      {
        id: 2,
        name: `Producto 2 de la categoria ${id}`,
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`Estamos corriendo en: http://localhost:${port}`)
});

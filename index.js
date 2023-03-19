const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("hola mundo, desde express");
});

app.listen(port, () => {
  console.log(`Estamos corriendo en: http://localhost:${port}`)
});

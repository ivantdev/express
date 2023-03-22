const express = require("express");
const routerApi = require("./routes");
const app = express();
const port = 3001;

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hola mundo, desde express");
});

routerApi(app);

app.listen(port, () => {
  console.log(`Estamos corriendo en: http://localhost:${port}`)
});

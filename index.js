const express = require("express");
const { errorHandler, logErrors } = require("./middlewares/error.handler");
const routerApi = require("./routes");
const app = express();
const port = 3001;

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hola mundo, desde express");
});

routerApi(app);

// middleware de error
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Estamos corriendo en: http://localhost:${port}`)
});

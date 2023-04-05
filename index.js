const express = require("express");
const { errorHandler, logErrors, boomErrorHandler, ormErrorHandler } = require("./middlewares/error.handler");
const routerApi = require("./routes");
const app = express();
const port = 3001;

const authHandler = require("./middlewares/auth.handler");

// middleware
app.use(express.json());

app.get("/", authHandler, (req, res) => {
  res.send("hola mundo, desde express");
});

routerApi(app);

// middleware de error
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Estamos corriendo en: http://localhost:${port}`)
});

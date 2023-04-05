const boom = require("@hapi/boom");

function checkAPIKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if(apiKey == "123") {
    next();
  } else {
    next(boom.unauthorized("API Key is required"));
  }
}

module.exports = checkAPIKey;

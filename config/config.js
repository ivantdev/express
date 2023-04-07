require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db_host: process.env.DB_HOST || 'localhost',
  db_port: process.env.DB_PORT || 5434,
  db_name: process.env.DB_NAME || 'mystore',
  db_user: process.env.DB_USER || 'ivan',
  db_password: process.env.DB_PASSWORD || 'ivanpass',
  jwt_secret: process.env.JWT_SECRET || "secret",
};

module.exports = config;

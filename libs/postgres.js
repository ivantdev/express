const { Client } = require("pg");

async function getConnection() {
  const client = new Client({
    host: "localhost",
    port: 5434,
    user: "ivan",
    password: "ivanpass",
    database: "mystore",
  });

  await client.connect();
  return client;
};

module.exports = getConnection;

const getConnection = require('../libs/postgres');

class UserService {
  constructor () {}

  async create (data) {
    return data;
  }

    async find() {
      const client = await getConnection();
      const res = await client.query('SELECT * FROM tasks');
      return res.rows;
    }

    async findOne(id) {
      return id;
    }

  async update (id, data) {
    return data;
  }

  async delete (id) {
    return id;
  }

  async get (id) {
    return id;
  }
}

module.exports = UserService;

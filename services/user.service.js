const { models }  = require('../libs/sequelize');

class UserService {
  constructor () {}

  async create (data) {
    return data;
  }

    async find() {
      const res = await models.User.findAll();
      return res;
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

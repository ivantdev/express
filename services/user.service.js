const { models }  = require('../libs/sequelize');
const boom  = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UserService {
  constructor () {}

  async create (data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const res = await models.User.findAll({
      include: ["customer"]
    });
    return res;
  }

  async findByEmail(email) {
    const res = await models.User.findOne({
      where: { email }
    });
    if(!res) {
      throw new boom.notFound('User not found');
    }
    return res;
  }

  async findOne(id) {
    const res = await models.User.findByPk(id);
    if(!res) {
      throw new boom.notFound('User not found');
    }
    return res;
  }

  async update (id, changes) {
    const user = await this.findOne(id);
    const res = await user.update(changes);
    return res;
  }

  async delete (id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;

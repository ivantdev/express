const { Model, DataTypes, Sequelize } = require("sequelize");

const USER_TABLE = "users";

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "customer",
  }
}

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: "customer",
      foreignKey: "userId",
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    }
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User,
}

const { Model, DataTypes, Sequelize } = require("sequelize");

const CATEGORY_TABLE = "categories";

const CategorySchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    field: "created_at",
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: "products",
      foreignKey: "categoryId",
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: "Category",
      timestamps: false,
    }
  }
}

module.exports = {
  CATEGORY_TABLE,
  CategorySchema,
  Category,
};

const { Model, DataTypes, Sequelize } = require("sequelize");

const PRODUCT_TABLE = "products";

const ProductSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    field: "created_at",
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  categoryId: {
    field: "category_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "categories",
      key: "id",
    },
  },
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: "category",
      foreignKey: "categoryId",
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false,
    }
  }
}

module.exports = {
  PRODUCT_TABLE,
  ProductSchema,
  Product,
};

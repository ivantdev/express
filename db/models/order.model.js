const { Model, DataTypes, Sequelize } = require("sequelize")
const { CUSTOMER_TABLE } = require("./customer.model")

const ORDER_TABLE = "orders"

const OrderSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerId: {
    field: "customer_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CUSTOMER_TABLE,
      key: "id",
    },
    OnDelete: "SET NULL",
    OnUpdate: "CASCADE",
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
  createdAt: {
    field: "created_at",
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if(!this.items) return 0;
      if(this.items.length > 0) {
        return this.items.reduce((acc, item) => acc + (item.price * item.OrderProduct.quantity), 0);
      }
      return 0;
    }
  }
}

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: "customer",
    });
    this.belongsToMany(models.Product, {
      through: models.OrderProduct,
      as: "items",
      foreignKey: "orderId",
      otherKey: "productId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      nameModel: "Order",
      timestamps: false,
    }
  }
}

module.exports = {
  OrderSchema,
  Order,
  ORDER_TABLE,
}

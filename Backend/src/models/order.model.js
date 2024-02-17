module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    orderId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    items: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("items").split(",");
      },
      set(val) {
        this.setDataValue("items", val.join(","));
      },
    },
    orderPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.UUID,
      foreignKey: true,
    },
  });

  return Order;
};

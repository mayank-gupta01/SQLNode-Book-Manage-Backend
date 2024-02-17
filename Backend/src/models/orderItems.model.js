module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define("orderItem", {
    orderItemId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bookId: {
      type: DataTypes.UUID,
      foreignKey: true,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return OrderItem;
};

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("book", {
    bookId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    authorId: {
      type: DataTypes.UUID,
      foreignKey: true,
    },
  });

  return Book;
};

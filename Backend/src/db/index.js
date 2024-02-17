const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  `${process.env.DATABASE_NAME}`,
  `${process.env.DATABASE_USERNAME}`,
  `${process.env.DATABASE_PASSWORD}`,
  {
    host: `${process.env.DATABASE_HOST}`,
    dialect: "mysql",
    operatorsAliases: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("SQL connected.....");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require("../models/book.model.js")(sequelize, DataTypes);
db.authors = require("../models/author.model.js")(sequelize, DataTypes);
db.customers = require("../models/customer.model.js")(sequelize, DataTypes);
db.orders = require("../models/order.model.js")(sequelize, DataTypes);
db.orderItems = require("../models/orderItems.model.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

//1 to many relations
db.authors.hasMany(db.books, {
  foreignKey: "authorId",
  as: "book",
});

db.books.belongsTo(db.authors, {
  foreignKey: "authorId",
  as: "author",
});

db.customers.hasMany(db.orders, {
  foreignKey: "customerId",
  as: "order",
});

db.orders.belongsTo(db.customers, {
  foreignKey: "customerId",
  as: "customer",
});

db.books.hasMany(db.orderItems, {
  foreignKey: "bookId",
  as: "orderItem",
});

db.orderItems.belongsTo(db.books, {
  foreignKey: "bookId",
  as: "book",
});

module.exports = db;

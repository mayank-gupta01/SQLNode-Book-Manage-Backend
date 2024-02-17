const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const db = require("../db");
const Book = db.books;
const OrderItem = db.orderItems;
const sequelize = db.sequelize;

const createOrderItems = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { qty } = req.body;

  const orderItem = await OrderItem.create({
    bookId,
    qty,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, orderItem, "Order Item created successfully"));
});

const getTopSellingBooks = asyncHandler(async (req, res) => {
  /*
    query should be run is :
    select b.name as book_name 
    from bookbin.orderitems as o left join bookbin.books as b
    on o.bookId = b.bookId
    group by o.bookId
    having sum(o.qty)
    order by sum(o.qty) desc
    limit 5
  */
  const topBooks = await OrderItem.findAll({
    include: [
      {
        model: Book,
        as: "book",
        attributes: [],
      },
    ],
    attributes: [
      [sequelize.fn("sum", sequelize.col("qty")), "total_sold_qty"],
      [sequelize.col("Book.name"), "book_name"],
    ],
    group: ["OrderItem.bookId"],
    order: [[sequelize.literal("total_sold_qty"), "DESC"]],
    limit: 5,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, topBooks, "Top 5 Books fetched successfully"));
});

module.exports = { createOrderItems, getTopSellingBooks };

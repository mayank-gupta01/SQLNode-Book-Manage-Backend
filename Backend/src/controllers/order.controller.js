const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const ApiResponse = require("../utils/ApiResponse.js");
const db = require("../db/index.js");

const Order = db.orders;

const createOrder = asyncHandler(async (req, res) => {
  const { customerId } = req.params;
  const { items, orderPrice } = req.body;

  if (!items || !orderPrice) {
    throw new ApiError(400, "All fields are mendatory");
  }

  if (items.length === 0) {
    throw new ApiError(400, "Cart should have something");
  }

  if (!customerId) {
    throw new ApiError(400, "customer id should be given");
  }

  const order = await Order.create({
    items,
    orderPrice,
    customerId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully"));
});

const getTotalSales = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const totalSales = await Order.findAll({
    attribute: [
      [sequelize.fn("sum", sequelize.col("totalPrice")), "total_sales"],
    ],
    where: {
      from: {
        $between: [startDate, endDate],
      },
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, totalSales, "total sales is fetched successfully")
    );
});

module.exports = { createOrder, getTotalSales };

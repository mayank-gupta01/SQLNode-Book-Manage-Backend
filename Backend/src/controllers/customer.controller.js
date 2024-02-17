const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const db = require("../db");
// const Customer = require("../models/customer.model.js")(sequelize, DataTypes);
const Customer = db.customers;

const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber } = req.body;

  if (!name || !email || !phoneNumber) {
    throw new ApiError(400, "All fields are mendatory");
  }

  if ([name, email, phoneNumber].some((field) => field.trim() === "")) {
    throw new ApiError(400, "fields should not be empty");
  }

  const customer = await Customer.create({
    name,
    email,
    phoneNumber,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, customer, "Customer created successfully"));
});

module.exports = createCustomer;

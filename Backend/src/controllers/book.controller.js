// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db/index.js");

const db = require("../db/index.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");
// const Book = require("../models/book.model.js")(sequelize, DataTypes);
const Book = db.books;

const createBook = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  const { authorId } = req.params;

  if (!name || !description || !price) {
    throw new ApiError(400, "All fields are mendatory");
  }
  if ([name, description].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  if (!authorId) {
    throw new ApiError(400, "author Id shouldn't be empty");
  }

  const book = await Book.create({
    name,
    description,
    price,
    authorId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, book, "Book created successfully"));
});

module.exports = createBook;

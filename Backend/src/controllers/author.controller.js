const db = require("../db/index.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");
const Author = db.authors;

const createAuthor = asyncHandler(async (req, res) => {
  const { name, description, email, phoneNumber } = req.body;

  if (!email || !description || !name) {
    throw new ApiError(400, "all fields are mendatory");
  }
  if ([name, email, description].some((field) => field.trim() === "")) {
    throw new ApiError(400, "all fields are required");
  }

  const author = await Author.create({
    name: name,
    description: description,
    email: email,
    phoneNumber: phoneNumber,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, author, "Author created successfully"));
});

module.exports = createAuthor;

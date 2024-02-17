const { Router } = require("express");
const {
  createOrderItems,
  getTopSellingBooks,
} = require("../controllers/orderItem.controller.js");
const router = Router();

router.route("/create/:bookId").post(createOrderItems);
router.route("/top-selling-books").get(getTopSellingBooks);

module.exports = router;

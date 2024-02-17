const { Router } = require("express");
const {
  createOrder,
  getTotalSales,
} = require("../controllers/order.controller.js");

const router = Router();

router.route("/create/:customerId").post(createOrder);
router.route("/total-sales").get(getTotalSales);
module.exports = router;

const { Router } = require("express");
const createCustomer = require("../controllers/customer.controller");

const router = Router();

router.route("/create").post(createCustomer);

module.exports = router;

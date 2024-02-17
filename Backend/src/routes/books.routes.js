const { Router } = require("express");
const createBook = require("../controllers/book.controller.js");

const router = Router();

router.route("/create/:authorId").post(createBook);

module.exports = router;

const { Router } = require("express");
const createAuthor = require("../controllers/author.controller.js");

const router = Router();

router.route("/create").post(createAuthor);

module.exports = router;

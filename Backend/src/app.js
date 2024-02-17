require("dotenv").config({ path: "./env" });
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bookRoutes = require("./routes/books.routes.js");
const authorRoutes = require("./routes/author.routes.js");
const customerRoutes = require("./routes/customer.routes.js");
const orderRoutes = require("./routes/orders.routes.js");
const orderItemsRoutes = require("./routes/orderItems.routes.js");

//define routes
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/authors", authorRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/orderItems", orderItemsRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
});

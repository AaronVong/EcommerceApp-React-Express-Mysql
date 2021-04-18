const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const route = express();
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
dotenv.config();
route.use(cors());
route.use(express.json());
route.use(express.urlencoded({ extended: false }));

route.listen(process.env.SERVER_PORT, () => {
  console.log("server is runing on port " + process.env.SERVER_PORT);
});

route.use("/api/product", productRoute);
route.use("/api/category", categoryRoute);
route.use("/api/user", userRoute);
route.use("/api/order", orderRoute);

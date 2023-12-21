require('dotenv').config()
const express = require("express");
const server = express();
const port = process.env.PORT;
// const morgan = require("morgan");
const mongoose = require("mongoose");
let jwt = require('jsonwebtoken');
const productRoute = require("./Routes/product_routes");
const userRoute = require("./Routes/user_routes");
const cartRoute = require("./Routes/cart_routes");

async function main() {
  await mongoose.connect(process.env.MONGODB_PATH);
}
main()
  .then(() => {
    console.log("DB is Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

// server.use(morgan("dev"));
server.use(express.json());

server.use("/api/products", productRoute);
server.use("/api/user", userRoute);
server.use("/api/cart", cartRoute);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});





// "email":"darshan@123.com",
// 	"password":"1234"
// 	"password":"darshan"
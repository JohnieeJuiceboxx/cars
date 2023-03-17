const express = require("express");
const app = express();
const morgan = require("./frontend/node_modules/morgan");

// morgan logger
app.use(morgan("dev"));

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/cars", require("./routes/carsRoute"));

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}
app.listen(3001, function () {
  console.log("express server is running on port 3001");
});

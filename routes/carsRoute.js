const express = require("express");
const router = express.Router();
const carsController = require("../controllers/carsControllers");
//carsRoute = require("../controllers/carsControllers");

//router.get("/", carsRoute.carsController);

router
  .route("/")
  .get(carsController.getAllCars)
  .post(carsController.createNewCar);

router.route("/add/:id").post(carsController.createNewCar);

router.route("/:id").get(carsController.getCar);

module.exports = router;

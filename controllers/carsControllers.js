const data = {
  cars: require("../model/cars.json"),
  setCars: function (data) {
    this.cars = data;
  },
};

const getAllCars = (req, res) => {
  res.json(data.cars);
};

const createNewCar = (req, res) => {
  const newCars = {
    Make: req.body.Make,
    Model: req.body.Model,
    Package: req.body.Package,
    Color: req.body.Color,
    Year: req.body.Year,
    Category: req.body.Category,
    Mileage: req.body.Mileage,
    Price: req.body.Price,
    Id: req.body.Id,
  };
  if (
    !newCars.Make ||
    !newCars.Model ||
    !newCars.Package ||
    !newCars.Color ||
    !newCars.Year ||
    !newCars.Category ||
    !newCars.Mileage ||
    !newCars.Price ||
    !newCars.Id
  ) {
    return res.status(400).json({ message: "All entry fields are required." });
  }
  data.setCars([...data.cars, newCars]);
  res.status(201).json(data.employees);
};

const getCar = (req, res) => {
  const car = data.cars.find((c) => c.Id === req.params.id);

  if (!car) {
    return res
      .status(400)
      .json({ message: `Car Id: ${req.params.id} not found` });
  }
  res.json(car);
};

module.exports = {
  getAllCars,
  createNewCar,
  getCar,
};

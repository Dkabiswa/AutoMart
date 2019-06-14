"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _carModel = _interopRequireDefault(require("../models/carModel"));

var _carValidation = _interopRequireDefault(require("../validations/carValidation"));

var _validationhandler = _interopRequireDefault(require("../middleware/validationhandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Car = {
  getUnsold: function getUnsold(req, res) {
    var options = req.query; // if no query is passed return all cars

    if (options === undefined || Object.keys(options).length === 0) {
      var user = _userModel["default"].findId(req.user.id); // check if user is admin


      if (user.isAdmin === true) {
        var aCars = _carModel["default"].getAll();

        return res.status(200).send({
          status: 200,
          data: aCars
        });
      }

      return res.status(403).send({
        status: 403,
        message: 'you must be an admin'
      });
    }

    var notValid = _validationhandler["default"].validator(options, _carValidation["default"].querySchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    var min = parseInt(options.minPrice, 10);
    var max = parseInt(options.maxPrice, 10);

    var cars = _carModel["default"].getUnsold(options.status); // return unsold cars


    if (options.status && options.minPrice === undefined) {
      return res.status(200).json({
        status: 200,
        data: cars
      });
    } // return cars in a price range


    if (max > min) {
      var pCar = cars.filter(function (p) {
        return p.price >= min && p.price <= max;
      });
      return res.status(200).json({
        status: 200,
        data: pCar
      });
    }

    return res.status(400).json({
      status: 400,
      message: 'price range doesnot exisit'
    });
  },
  getCar: function getCar(req, res, next) {
    var notValid = _validationhandler["default"].validator(req.params, _carValidation["default"].carIdSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    var oldCar = _carModel["default"].findId(parseInt(req.params.id, 10));

    if (!oldCar) {
      var err = new Error('car not found');
      err.status = 404;
      next(err);
    }

    return res.status(200).json({
      status: 200,
      data: oldCar
    });
  },
  create: function create(req, res) {
    var notValid = _validationhandler["default"].validator(req.body, _carValidation["default"].createSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    var newCar = _carModel["default"].create(req.body);

    return res.status(201).send({
      status: 201,
      data: newCar
    });
  },
  deleteCar: function deleteCar(req, res) {
    var notValid = _validationhandler["default"].validator(req.params, _carValidation["default"].carIdSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    var user = _userModel["default"].findId(req.user.id); // check if user is admin


    if (user.isAdmin === true) {
      var oldCar = _carModel["default"].findId(parseInt(req.params.id, 10));

      if (!oldCar) {
        return res.status(404).send({
          status: 404,
          message: 'car not found'
        });
      }

      _carModel["default"].deleteId(parseInt(req.params.id, 10));

      return res.status(200).send({
        status: 200,
        message: 'CarAd sucessfully deleted'
      });
    }

    return res.status(403).send({
      status: 403,
      message: 'you must be an admin'
    });
  },
  mark: function mark(req, res) {
    var notValid = _validationhandler["default"].validator(req.params, _carValidation["default"].carIdSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    notValid = _validationhandler["default"].validator(req.body, _carValidation["default"].markSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    var oldCar = _carModel["default"].findId(parseInt(req.params.id, 10));

    if (!oldCar) {
      return res.status(404).send({
        status: 404,
        message: 'car not found'
      });
    }

    oldCar.status = req.body.status;
    return res.status(200).send({
      status: 200,
      data: oldCar
    });
  },
  updatePrice: function updatePrice(req, res) {
    if (!req.body.price) {
      return res.status(400).json({
        status: 400,
        message: 'Enter new price to be updated'
      });
    }

    var oldCar = _carModel["default"].findId(parseInt(req.params.id, 10));

    if (!oldCar) {
      return res.status(404).json({
        status: 404,
        message: 'car not found'
      });
    }

    oldCar.price = req.body.price;
    return res.status(200).json({
      status: 200,
      data: oldCar
    });
  }
};
var _default = Car;
exports["default"] = _default;
const { AppError } = require("../utils/appError.js");
const { Employee } = require("../models/employee.js");
const isValidObjectId = require("../validator/ObjectId.js");
module.exports = async function (req, res, next) {
  try {
    if (!isValidObjectId(req.params.id)) {
      const ex = new AppError("Invalid Id", "fail", 400);
      return next(ex);
    }
    const employee = await Employee.findById(req.params.id)
      .populate("company", "name _id")
      .select("-__v");
    if (!employee) {
      const ex = new AppError("Employee not found", "fail", 404);
      return next(ex);
    }
    req.employee = employee;
    next();
  } catch (error) {
    const ex = new AppError(error.message, "error", 500);
    return next(ex);
  }
};

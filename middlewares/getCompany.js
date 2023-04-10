const { AppError } = require("../utils/appError.js");
const Company = require("../models/company.js");
const isValidObjectId = require("../validator/ObjectId.js");
module.exports = async function (req, res, next) {
  try {
    if (!isValidObjectId(req.params.id)) {
      const ex = new AppError("Invalid Id", "fail", 400);
      return next(ex);
    }
    const company = await Company.findById(req.params.id).select(
      "-__v"
    );
    if (!company) {
      const ex = new AppError("Company not found", "fail", 404);
      return next(ex);
    }
    req.company = company;
    next();
  } catch (error) {
    const ex = new AppError(error.message, "error", 500);
    return next(ex);
  }
};

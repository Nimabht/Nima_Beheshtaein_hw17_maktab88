const isValidObjectId = require("../validator/ObjectId");
const { Company, validateCompany } = require("../models/company");
const { Employee } = require("../models/employee");
const { AppError } = require("../utils/appError");
module.exports = {
  getCompanies: async (req, res, next) => {
    const filter = {};
    let sort = { registrationDate: -1 };

    if (req.query.registeredLastTwoYears) {
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
      filter.registrationDate = { $gte: twoYearsAgo };
    }

    let companies;
    if (req.query.sortBy === "employeeCountDesc") {
      companies = await Company.aggregate([
        {
          $lookup: {
            from: "employees",
            localField: "_id",
            foreignField: "company",
            as: "employees",
          },
        },
        {
          $addFields: {
            employeeCount: { $size: "$employees" },
          },
        },
        {
          $sort: { employeeCount: -1 },
        },
      ]);
    } else if (req.query.avgAge) {
      const targetAvgAge = Number(req.query.avgAge);
      companies = await Employee.aggregate([
        {
          $lookup: {
            from: "companies",
            localField: "company",
            foreignField: "_id",
            as: "company",
          },
        },
        {
          $unwind: "$company",
        },
        {
          $group: {
            _id: "$company._id",
            avgAge: {
              $avg: {
                $divide: [
                  { $subtract: [new Date(), "$dateOfBirth"] },
                  31536000000,
                ],
              },
            },
            company: { $first: "$company" },
          },
        },
        {
          $match: {
            avgAge: { $gte: targetAvgAge, $lt: targetAvgAge + 1 },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$company.name",
            registrationNumber: "$company.registrationNumber",
            province: "$company.province",
            city: "$company.city",
            landLineNumber: "$company.landLineNumber",
            registrationDate: "$company.registrationDate",
            avgAge: 1,
          },
        },
      ]);
    } else {
      companies = await Company.find(filter)
        .sort(sort)
        .select("-__v");
    }
    const total = companies.length;
    const page = parseInt(req.query.page);
    const pageSize = 6;
    const skipCount = (page - 1) * pageSize || 0;
    if (page) {
      res.send({
        page,
        total,
        data: companies.slice(skipCount, skipCount + pageSize),
      });
    } else {
      res.send({
        page: "not-set",
        total,
        data: companies,
      });
    }
  },
  getCompanyById: async (req, res, next) => {
    res.send(req.company);
  },
  createCompany: async (req, res, next) => {
    const { error, value } = validateCompany(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    // Check if phone number already exists in database
    let existingCompany = await Company.findOne({
      landLineNumber: value.landLineNumber,
    });
    if (existingCompany) {
      const ex = new AppError(
        "Use another land line phone number.",
        "fail",
        400
      );
      return next(ex);
    }
    // Check if registrationNumber already exists in database
    existingCompany = await Company.exists({
      registrationNumber: value.registrationNumber,
    });
    if (existingCompany) {
      const ex = new AppError(
        "Use another registration number.",
        "fail",
        400
      );
      return next(ex);
    }
    const company = new Company(value);
    await company.save();
    res.status(201).send(company);
  },
  updateCompany: async (req, res, next) => {
    const { error, value } = validateCompany(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    // Check if phone number already exists in database
    let existingCompany = await Company.findOne({
      landLineNumber: value.landLineNumber,
      _id: { $ne: req.company._id }, // exclude company with specified id
    });
    if (existingCompany) {
      const ex = new AppError(
        "Use another land line phone number.",
        "fail",
        400
      );
      return next(ex);
    }
    // Check if registrationNumber already exists in database
    existingCompany = await Company.exists({
      registrationNumber: value.registrationNumber,
      _id: { $ne: req.company._id }, // exclude company with specified id
    });
    if (existingCompany) {
      const ex = new AppError(
        "Use another registration number.",
        "fail",
        400
      );
      return next(ex);
    }
    const company = req.company;
    company.set(value);
    await company.save();
    res.send(company);
  },
  deleteCompany: async (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
      const ex = new AppError("Invalid Id", "fail", 400);
      return next(ex);
    }
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      const ex = new AppError("Company not found", "fail", 404);
      return next(ex);
    }
    res.status(200).send("Company deleted successfully");
  },
};

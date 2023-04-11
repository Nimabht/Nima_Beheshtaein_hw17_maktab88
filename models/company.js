const Joi = require("joi");
const mongoose = require("mongoose");
const validProvinces = require("../data/province.json");

const isValidProvince = (province) => {
  return validProvinces.some((p) => p.name === province);
};

function checkValidCity(province, city) {
  for (let i = 0; i < validProvinces.length; i++) {
    if (validProvinces[i].name === province) {
      const cities = validProvinces[i].cities;
      for (let j = 0; j < cities.length; j++) {
        if (cities[j] === city) {
          return true;
        }
      }
    }
  }
  return false;
}

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true,
    },
    registrationNumber: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{11}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid Registration Number!`,
      },
      required: true,
    },
    province: {
      type: String,
      required: true,
      validate: {
        validator: function (province) {
          return isValidProvince(province);
        },
        message: "Invalid province",
      },
    },
    city: {
      type: String,
      required: true,
      validate: {
        validator: function (city) {
          return checkValidCity(this.province, city);
        },
        message: "Invalid city",
      },
    },
    landLineNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^0\d{2,3}-\d{7}$/.test(v);
        },
        message: "Invalid landline phone number",
      },
    },
  },
  {
    timestamps: {
      createdAt: "registrationDate",
      updatedAt: "updatedAt",
    },
  }
);

const validateCompany = (company) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    registrationNumber: Joi.string().length(11).required(),
    province: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!isValidProvince(value)) {
          return helpers.message("Invalid province");
        }
        return value;
      }),
    city: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!checkValidCity(company.province, value)) {
          return helpers.message("Invalid city");
        }
        return value;
      }),
    landLineNumber: Joi.string()
      .regex(/^0\d{2,3}-\d{7}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Phone number must be in 0XX-XXXXXXX format",
        "any.required": "Phone number is required",
      }),
    registrationDate: Joi.date().default(Date.now).forbidden(),
  });
  return schema.validate(company);
};

module.exports.Company = mongoose.model("Company", companySchema);
module.exports.validateCompany = validateCompany;

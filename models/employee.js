const Joi = require("joi");
const mongoose = require("mongoose");
const validProvinces = require("../data/province.json");

const isValidProvince = (province) => {
  return validProvinces.some((p) => p.name === province);
};

const employeeSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    gender: {
      type: String,
      enum: ["man", "woman", "unknown", "not-set"],
      default: "not-set",
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          // Check that each phone number matches the Iran phone number pattern
          for (let i = 0; i < v.length; i++) {
            if (!/^(\+98|0)?9\d{9}$/.test(v[i])) {
              return false;
            }
          }
          return true;
        },
        message: (props) =>
          `${props.value} is not a valid Iran phone number!`,
      },
      set: (value) => {
        return value.map((phone) => {
          console.log(phone.startsWith("0"));
          if (phone.startsWith("0")) {
            return `+98${phone.slice(1)}`;
          }
          return phone;
        });
      },
    },
    idNumber: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid idNumber!`,
      },
    },
    province: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || isValidProvince(v);
        },
        message: (props) =>
          `${props.value} is not a valid province in Iran!`,
      },
      default: "not-set",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    roleInCompany: {
      type: String,
      enum: ["Employee", "Manager"],
      default: "Employee",
    },
  },
  {
    timestamps: {
      createdAt: "registrationDate",
      updatedAt: "updatedAt",
    },
  }
);

// Create a unique index on the phoneNumber field
employeeSchema.index({ phoneNumber: 1 }, { unique: true });

module.exports.Employee = mongoose.model("Employee", employeeSchema);
module.exports.validateEmployee = (employee) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    gender: Joi.string()
      .valid("man", "woman", "unknown", "not-set")
      .default("not-set"),
    dateOfBirth: Joi.date().required(),
    phoneNumber: Joi.array()
      .items(Joi.string().pattern(/^(\+98|0)?9\d{9}$/))
      .required(),
    idNumber: Joi.string()
      .pattern(/^\d{10}$/)
      .required(),
    province: Joi.string().custom((value, helpers) => {
      if (!value || isValidProvince(value)) {
        return value;
      }
      return helpers.message(
        `"${value}" is not a valid province in Iran`
      );
    }),
    companyId: Joi.objectId().required(),
    roleInCompany: Joi.string()
      .valid("Employee", "Manager")
      .default("Employee"),
    registrationDate: Joi.date().forbidden(),
  });
  return schema.validate(employee);
};

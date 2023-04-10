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

const companySchema = mongoose.Schema({
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
        return checkValidCity(this.province, checkValidCity);
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
  registrationDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("Company", companySchema);

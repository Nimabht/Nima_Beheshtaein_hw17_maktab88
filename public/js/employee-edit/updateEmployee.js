function validateForm(formData) {
  const constraints = {
    firstname: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 30,
      },
    },
    lastname: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 30,
      },
    },
    gender: {
      inclusion: {
        within: ["man", "woman", "unknown", "not-set"],
      },
    },
    dateOfBirth: {
      presence: true,
      format: {
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        message: "must be in the format YYYY-MM-DD",
      },
    },
    phoneNumber: {
      type: "array",
      length: {
        minimum: 1,
      },
    },
    idNumber: {
      presence: true,
      format: {
        pattern: /^\d{10}$/,
      },
    },
    province: {
      length: {
        minimum: 0,
        maximum: 50,
      },
    },
    companyName: {
      presence: true,
      length: {
        minimum: 2,
        maximum: 40,
      },
    },
    roleInCompany: {
      presence: true,
      inclusion: {
        within: ["Employee", "Manager"],
        message: "not selected",
      },
    },
  };

  const errors = validate(formData, constraints);

  if (errors) {
    return errors;
  }
}

const updateEmployee = async () => {
  let url = window.location.href;
  let id = url.match(/edit\/(.*)/)[1];
  let updatedEmployee = {
    firstname: $("#firstname").val(),
    lastname: $("#lastname").val(),
    gender: $("#gender").val(),
    dateOfBirth: $("#dateOfBirth").val(),
    phoneNumber: $("#phoneNumber").val().split(","),
    idNumber: $("#idNumber").val(),
    province: $("#province").val(),
    companyName: $("#company").val(),
    roleInCompany: $("#role").val(),
  };
  let polipop = new Polipop("updateSection", {
    layout: "popups",
    insert: "before",
    pool: 5,
    life: 3000,
    progressbar: true,
  });
  const errors = validateForm(updatedEmployee);
  if (!!errors) {
    for (const error in errors) {
      polipop.add({
        type: "error",
        title: "Error",
        content: errors[error],
      });
    }
  } else {
    let companies = await axios.get("/api/company");
    companies = companies.data.data;
    for (const company of companies) {
      if (company.name === $("#company").val()) {
        updatedEmployee = {
          firstname: $("#firstname").val(),
          lastname: $("#lastname").val(),
          gender: $("#gender").val(),
          dateOfBirth: $("#dateOfBirth").val(),
          phoneNumber: $("#phoneNumber").val().split(","),
          idNumber: $("#idNumber").val(),
          province: $("#province").val(),
          companyId: company._id,
          roleInCompany: $("#role").val(),
        };
      }
    }
    axios
      .put(`/api/employee/${id}`, updatedEmployee)
      .then((response) => {
        polipop.add({
          type: "success",
          title: "Success",
          content: "Updated successfully!",
        });
        setTimeout(() => {
          window.location.href = `http://localhost:1010/employee/profile/${id}`;
        }, 3000);
      })
      .catch((error) => {
        polipop.add({
          type: "error",
          title: "Error",
          content: error.response.data.message,
        });
      });
  }
};

function validateForm(formData) {
  const constraints = {
    name: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 30,
      },
    },
    registrationNumber: {
      presence: true,
      length: {
        is: 11,
      },
    },
    province: {
      presence: true,
      length: {
        minimum: 0,
        maximum: 50,
      },
    },
    city: {
      presence: true,
      length: {
        minimum: 0,
        maximum: 50,
      },
    },
    landLineNumber: {
      presence: true,
      format: /^0?\d{2,3}-\d{7}$/,
    },
  };

  const errors = validate(formData, constraints);

  if (errors) {
    return errors;
  }
}

const updateCompany = async () => {
  let url = window.location.href;
  let id = url.match(/edit\/(.*)/)[1];
  let updatedCompany = {
    name: $("#name").val(),
    registrationNumber: $("#registrationNumber").val(),
    province: $("#province").val(),
    city: $("#city").val(),
    landLineNumber: $("#landLineNumber").val(),
  };
  console.log(updatedCompany);
  let polipop = new Polipop("updateSection", {
    layout: "popups",
    insert: "before",
    pool: 5,
    life: 3000,
    progressbar: true,
  });
  const errors = validateForm(updatedCompany);
  console.log(errors);
  if (!!errors) {
    for (const error in errors) {
      polipop.add({
        type: "error",
        title: "Error",
        content: errors[error],
      });
    }
  } else {
    axios
      .put(`/api/company/${id}`, updatedCompany)
      .then((response) => {
        polipop.add({
          type: "success",
          title: "Success",
          content: "Updated successfully!",
        });
        setTimeout(() => {
          window.location.href = `http://localhost:1010/company/profile/${id}`;
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

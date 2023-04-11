$(async () => {
  const companies = await axios.get("/api/company");
  let companiesOption = "";
  for (const companyData of companies.data.data) {
    if (companyData.name === company.name) {
      companiesOption += `<option value="${companyData.name}" selected>${companyData.name}</option>`;
    } else {
      companiesOption += `<option value="${companyData.name}">${companyData.name}</option>`;
    }
  }
  $("#company").html(companiesOption);

  $("form").submit(function (e) {
    e.preventDefault();
    let newEmployee = {
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
    let polipop = new Polipop("newSection", {
      layout: "popups",
      insert: "before",
      pool: 5,
      life: 3000,
      progressbar: true,
    });
    const errors = validateForm(newEmployee);
    if (!!errors) {
      for (const error in errors) {
        polipop.add({
          type: "error",
          title: "Error",
          content: errors[error],
        });
      }
    } else {
      for (const company of companies.data.data) {
        if (company.name === $("#company").val()) {
          newEmployee = {
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
        .post("/api/employee", newEmployee)
        .then((response) => {
          polipop.add({
            type: "success",
            title: "Success",
            content: "Created successfully!",
          });
          setTimeout(() => {
            window.location.href = `/employees`;
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
  });
});

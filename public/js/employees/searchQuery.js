document
  .getElementById("srch-submit")
  .addEventListener("click", function () {
    // get references to the input elements
    const provinceInput = document.getElementById("srch-province");
    const ageInput = document.getElementById("srch-age");
    const phoneNumberCheckbox = document.getElementById(
      "srch-phonenumber"
    );
    const genderInputs = document.getElementsByName("gender");
    const roleInputs = document.getElementsByName("role");
    const registeredLastWeekCheckbox = document.getElementById(
      "registeredLastWeek"
    );
    const sortInputs = document.getElementsByName("sortBy");

    // get the selected gender value
    let genderValue = "";
    for (let i = 0; i < genderInputs.length; i++) {
      if (genderInputs[i].checked) {
        genderValue = genderInputs[i].value;
        break;
      }
    }

    // get the selected role value
    let roleValue = "";
    for (let i = 0; i < roleInputs.length; i++) {
      if (roleInputs[i].checked) {
        roleValue = roleInputs[i].value;
        break;
      }
    }

    // get the selected sort value
    let sortValue = "";
    for (let i = 0; i < sortInputs.length; i++) {
      if (sortInputs[i].checked) {
        sortValue = sortInputs[i].value;
        break;
      }
    }

    // construct the query string
    let queryString = "";
    if (provinceInput.value) {
      queryString += `province=${provinceInput.value}&`;
    }
    if (ageInput.value) {
      queryString += `age=${ageInput.value}&`;
    }
    if (phoneNumberCheckbox.checked) {
      queryString += "phone=true&";
    }
    if (genderValue) {
      queryString += `gender=${genderValue}&`;
    }
    if (roleValue) {
      queryString += `role=${roleValue}&`;
    }
    if (registeredLastWeekCheckbox.checked) {
      queryString += "registeredLastWeek=true&";
    }
    if (sortValue) {
      queryString += `sortBy=${sortValue}`;
    }

    console.log(`queryString is : ${queryString}`);
    axios
      .get(`/api/employee?${queryString}`)
      .then((response) => {
        const data = response.data;
        renderContainer(data.data, data.total, 1, queryString);
      })
      .catch((error) => {
        console.log(error);
      });
  });

document
  .getElementById("srch-submit")
  .addEventListener("click", function () {
    // get references to the input elements
    const avgAgeInput = document.getElementById("srch-avgAge");
    const registeredLastTwoYearsCheckbox = document.getElementById(
      "registeredLastTwoYears"
    );
    const sortInputs = document.getElementsByName("sortBy");

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
    if (avgAgeInput.value) {
      queryString += `avgAge=${avgAgeInput.value}&`;
    }
    if (registeredLastTwoYearsCheckbox.checked) {
      queryString += "registeredLastTwoYears=true&";
    }
    if (sortValue) {
      queryString += `sortBy=${sortValue}`;
    }
    console.log(`queryString is : ${queryString}`);
    axios
      .get(`/api/company?page=1&${queryString}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        renderContainer(data.data, data.total, 1, queryString);
      })
      .catch((error) => {
        console.log(error);
      });
  });

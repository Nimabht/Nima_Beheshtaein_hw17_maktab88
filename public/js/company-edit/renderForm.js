const renderForm = async (id) => {
  const company = await axios.get(`/api/company/${id}`);
  const {
    name,
    registrationNumber,
    registrationDate,
    province,
    city,
    landLineNumber,
    _id,
  } = company.data;
  let provinces = await axios.get("/data/province.json");
  provinces = provinces.data;
  let provinceOption = "";
  let cityOption = "";
  for (const provinceInJson of provinces) {
    if (provinceInJson.name === province) {
      provinceOption += `<option value="${provinceInJson.name}" selected>${provinceInJson.name}</option>`;
      for (const cityInJson of provinceInJson.cities) {
        if (cityInJson === city) {
          cityOption += `<option value="${cityInJson}" selected>${cityInJson}</option>`;
        } else {
          cityOption += `<option value="${cityInJson}">${cityInJson}</option>`;
        }
      }
    } else {
      provinceOption += `<option value="${provinceInJson.name}">${provinceInJson.name}</option>`;
    }
  }

  $(".container")
    .html(` <p class="display-4 my-2"><b>Edit profile</b></p>
        <div class="container center">
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name">Company name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  value="${name}" />
              </div>
              <div class="form-group">
                <label for="registrationNumber">Registration number:</label>
                <input
                  type="text"
                  class="form-control"
                  id="registrationNumber"
                  value="${registrationNumber}" />
              </div>
              <div class="form-group">
                <label for="registrationDate">Registration Date:</label>
                <input
                  type="text"
                  class="form-control"
                  id="registrationDate"
                  value="${registrationDate.substring(0, 10)}"
                  readonly/>
              </div>
              <div class="form-group">
                <label for="province">Province:</label>
                <select class="form-select" id="province">${provinceOption}</select>
              </div>
              <div class="form-group">
                <label for="city">City:</label>
                <select class="form-select" id="city">
               ${cityOption}
              </select>
              </div>
              <div class="form-group">
                <label for="landLineNumber">LandLine number:</label>
                <input
                  type="text"
                  class="form-control"
                  id="landLineNumber"
                  value="${landLineNumber}" />
              </div>
            </div>
            <div class="col-md-6">           
              <div
                class="form-group d-flex justify-content-center align-items-center h-50 gap-3">
                <button
                  class="btn btn-success py-3 px-5"
                  id="submit-btn"
                  onclick="updateCompany()">
                  Submit
                </button>
                <button
                  class="btn btn-danger py-3 px-5"
                  id="delete-btn"
                  onclick="deleteCompany()">
                  Delete
                </button>
                <button
                  class="btn btn-warning py-3 px-5"
                  onclick="window.location.href = '/company/profile/${_id}';">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>`);
  $("#province").on("change", function () {
    const province = provinces.find((p) => p.name === this.value);
    $("#city").empty();
    for (const city of province.cities) {
      let newOption = $("<option>").val(city).text(city);
      $("#city").append(newOption);
    }
  });
};

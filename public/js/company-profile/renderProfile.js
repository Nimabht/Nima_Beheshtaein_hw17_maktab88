const renderProfile = (id) => {
  axios
    .get(`/api/company/${id}`)
    .then((response) => {
      console.log(response.data);
      const {
        name,
        registrationNumber,
        registrationDate,
        province,
        city,
        landLineNumber,
        _id,
      } = response.data;
      const date = new Date(registrationDate);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      $(".container").html(`<h2 class="my-3">Company Profile</h2>
      <div class="container center">
        <div class="row mt-3">
          <div class="col-md-6">
            <div class="form-group">
              <label for="name">Name:</label>
              <input
                type="text"
                class="form-control"
                id="name"
                value="${name}"
                readonly />
            </div>
            <div class="form-group">
              <label for=registrationNumber">Registration number:</label>
              <input
                type="text"
                class="form-control"
                id="registrationNumber"
                value="${registrationNumber}"
                readonly />
            </div>
            <div class="form-group">
              <label for="registrationDate">Registration date:</label>
              <input
                type="text"
                class="form-control"
                id="registrationDate"
                value="${formattedDate}"
                readonly />
            </div>
            <div class="form-group">
              <label for="landLineNumber">LandLine number:</label>
              <input
                type="text"
                class="form-control"
                id="landLineNumber"
                value="${landLineNumber}"
                readonly />
            </div>
            <div class="form-group">
              <label for="province">Province:</label>
              <input
                type="text"
                class="form-control"
                id="province"
                value="${province}"
                readonly />
            </div>
            <div class="form-group">
              <label for="city">City:</label>
              <input
                type="text"
                class="form-control"
                id="city"
                value="${city}"
                readonly />
            </div>
            <div class="form-group">
              <label for="_id">ID:</label>
              <input
                type="text"
                class="form-control"
                id="_id"
                value="${_id}"
                readonly />
            </div>
          </div>
            <div
              class="form-group d-flex justify-content-center align-items-center h-75 gap-5 mt-4">
              <button
                class="btn btn-primary py-3 px-5"
                onclick="window.location.href = '/company/edit/${_id}';">
                Edit
              </button>
              <button
                class="btn btn-danger py-3 px-5"
                onclick="window.location.href = '/companies';">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>`);
    })
    .catch((error) => {
      console.log(error);
    });
};

const renderProfile = (id) => {
  axios
    .get(`/api/employee/${id}`)
    .then((response) => {
      const {
        firstname,
        lastname,
        dateOfBirth,
        gender,
        company,
        idNumber,
        phoneNumber,
        province,
        roleInCompany,
        registrationDate,
        _id,
      } = response.data;
      $(".container").html(` <h2 class="my-3">User Profile</h2>
      <div class="container center">
        <div class="row mt-3">
          <div class="col-md-6">
            <div class="form-group">
              <label for="firstname">First Name:</label>
              <input
                type="text"
                class="form-control"
                id="firstname"
                value="${firstname}"
                readonly />
            </div>
            <div class="form-group">
              <label for="lastname">Last Name:</label>
              <input
                type="text"
                class="form-control"
                id="lastname"
                value="${lastname}"
                readonly />
            </div>
            <div class="form-group">
              <label for="dob">Date of Birth:</label>
              <input
                type="text"
                class="form-control"
                id="dateOfBirth"
                value="${dateOfBirth.substring(0, 10)}"
                readonly />
            </div>
            <div class="form-group">
              <label for="gender">Gender:</label>
              <input
                type="text"
                class="form-control"
                id="gender"
                value="${gender}"
                readonly />
            </div>
            <div class="form-group">
              <label for="company">Company:</label>
              <input
                type="text"
                class="form-control"
                id="company"
                value="${company.name}"
                readonly />
            </div>
            <div class="form-group">
              <label for="idNumber">ID Number:</label>
              <input
                type="text"
                class="form-control"
                id="idNumber"
                value="${idNumber}"
                readonly />
            </div>
            <div class="form-group">
              <label for="phoneNumber">Phone Number:</label>
              <input
                type="text"
                class="form-control"
                id="phoneNumber"
                value="${phoneNumber}"
                readonly />
            </div>
          </div>
          <div class="col-md-6">
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
              <label for="role">Role in Company:</label>
              <input
                type="text"
                class="form-control"
                id="role"
                value="${roleInCompany}"
                readonly />
            </div>
            <div class="form-group">
              <label for="regDate">Registration Date:</label>
              <input
                type="text"
                class="form-control"
                id="regDate"
                value="${registrationDate.substring(0, 10)}"
                readonly />
            </div>
            <div
              class="form-group d-flex justify-content-center align-items-center h-75 gap-5">
              <button
                class="btn btn-primary py-3 px-5"
                onclick="window.location.href = '/employee/edit/${_id}';">
                Edit
              </button>
              <button
                class="btn btn-danger py-3 px-5"
                onclick="window.location.href = '/employees';">
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

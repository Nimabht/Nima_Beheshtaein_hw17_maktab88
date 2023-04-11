const renderForm = async (id) => {
  const epmloyees = await axios.get(`/api/employee/${id}`);
  const {
    firstname,
    lastname,
    dateOfBirth,
    company,
    idNumber,
    phoneNumber,
    registrationDate,
    _id,
  } = epmloyees.data;

  const companies = await axios.get("/api/company");
  let companiesOption = "";
  for (const companyData of companies.data.data) {
    if (companyData.name === company.name) {
      companiesOption += `<option value="${companyData.name}" selected>${companyData.name}</option>`;
    } else {
      companiesOption += `<option value="${companyData.name}">${companyData.name}</option>`;
    }
  }
  $(".container")
    .html(` <p class="display-4 my-2"><b>Edit profile</b></p>
        <div class="container center">
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="form-group">
                <label for="firstname">First Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstname"
                  value="${firstname}" />
              </div>
              <div class="form-group">
                <label for="lastname">Last Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastname"
                  value="${lastname}" />
              </div>
              <div class="form-group">
                <label for="dob">Date of Birth:</label>
                <input
                  type="text"
                  class="form-control"
                  id="dateOfBirth"
                  value="${dateOfBirth.substring(0, 10)}" />
              </div>
              <div class="form-group">
                <label for="gender">Gender:</label>
                <select class="form-select" id="gender">
                  <option value="not-set" selected></option>
                  <option value="man">Male</option>
                  <option value="woman">Female</option>
                  <option value="unknown">Unknown</option>
              </select>
              </div>
              <div class="form-group">
                <label for="company">Company:</label>
                <select class="form-select" id="company">
                ${companiesOption}
              </select>
              </div>
              <div class="form-group">
                <label for="idNumber">ID Number:</label>
                <input
                  type="text"
                  class="form-control"
                  id="idNumber"
                  value="${idNumber}" />
              </div>
              <div class="form-group">
                <label for="phoneNumber">Phone Number:</label>
                <input
                  type="text"
                  class="form-control"
                  id="phoneNumber"
                  value="${phoneNumber}" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="province">Province:</label>
                <select class="form-select" id="province">
                  <option value="not-set" selected>not-set</option>
    <option value="Alborz">Alborz</option>
    <option value="Ardabil">Ardabil</option>
    <option value="Bushehr">Bushehr</option>
    <option value="Chaharmahal and Bakhtiari">Chaharmahal and Bakhtiari</option>
    <option value="East Azerbaijan">East Azerbaijan</option>
    <option value="Isfahan">Isfahan</option>
    <option value="Fars">Fars</option>
    <option value="Gilan">Gilan</option>
    <option value="Golestan">Golestan</option>
    <option value="Hamadan">Hamadan</option>
    <option value="Hormozgan">Hormozgan</option>
    <option value="Ilam">Ilam</option>
    <option value="Kerman">Kerman</option>
    <option value="Kermanshah">Kermanshah</option>
    <option value="Khuzestan">Khuzestan</option>
    <option value="Kohgiluyeh and Boyer-Ahmad">Kohgiluyeh and Boyer-Ahmad</option>
    <option value="Kurdistan">Kurdistan</option>
    <option value="Lorestan">Lorestan</option>
    <option value="Markazi">Markazi</option>
    <option value="Mazandaran">Mazandaran</option>
    <option value="North Khorasan">North Khorasan</option>
    <option value="Qazvin">Qazvin</option>
    <option value="Qom">Qom</option>
    <option value="Khorasan Razavi">Khorasan Razavi</option>
    <option value="Semnan">Semnan</option>
    <option value="Sistan and Baluchestan">Sistan and Baluchestan</option>
    <option value="South Khorasan">South Khorasan</option>
    <option value="Tehran">Tehran</option>
    <option value="West Azerbaijan">West Azerbaijan</option>
    <option value="Yazd">Yazd</option>
    <option value="Zanjan">Zanjan</option>
  </select>
              </div>
              <div class="form-group">
                <label for="role">Role in Company:</label>
                <select class="form-select" id="role">
                  <option selected></option>
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
              </select>
              </div>
              <div class="form-group">
                <label for="regDate">Registration Date:</label>
                <input
                  type="text"
                  class="form-control"
                  id="regDate"
                  value="${registrationDate.substring(0, 10)}"
                  readonly/>
              </div>
              <div
                class="form-group d-flex justify-content-center align-items-center h-50 gap-3">
                <button
                  class="btn btn-success py-3 px-5"
                  id="submit-btn"
                  onclick="updateEmployee()">
                  Submit
                </button>
                <button
                  class="btn btn-danger py-3 px-5"
                  id="delete-btn"
                  onclick="deleteEmployee()">
                  Delete
                </button>
                <button
                  class="btn btn-warning py-3 px-5"
                  onclick="window.location.href = '/profile/${_id}';">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>`);
};

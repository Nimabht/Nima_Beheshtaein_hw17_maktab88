const renderContainer = (
  data,
  totalItems,
  currentPage,
  searchQuery
) => {
  //Table part
  $("table").html(`<thead class="table-primary">
          <tr class="p-2">
            <th class="p-2" scope="col">Name</th>
            <th class="p-2" scope="col">Last name</th>
            <th class="p-2" scope="col">Gender</th>
            <th class="p-2" scope="col">Age</th>
            <th class="p-2" scope="col">Company name</th>
            <th class="p-2" scope="col">Province</th>
            <th class="p-2" scope="col"></th>
          </tr>
        </thead>`);
  for (const employee of data) {
    let birthdate = new Date(employee.dateOfBirth);
    let ageInMilliseconds = Date.now() - birthdate.getTime();
    let ageInYears =
      ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    let age = Math.floor(ageInYears);
    const newRow = $(`<tr scope="row">
        <td class="p-2" >${employee.firstname}</td>
        <td class="p-2" >${employee.lastname}</td>
        <td class="p-2" >${employee.gender}</td>
        <td class="p-2" >${age}</td>
        <td class="p-2" >${employee.company.name}</td>
        <td class="p-2" >${employee.province}</td>
        <td class="p-2" ><i class="bi bi-person-circle text-primary" onclick="window.location.href = '/employee/profile/${employee._id}';"></i></td>
    </tr>`);
    $("table").append(newRow);
  }
  $("tr").hover(
    function () {
      $(this).addClass("hover");
    },
    function () {
      $(this).removeClass("hover");
    }
  );
  //Pagination part
  $(".pagination").html("");
  totalPages = Math.ceil(totalItems / 6);
  const pagination = $(".pagination");
  for (let i = 1; i <= totalPages; i++) {
    let li;
    if (i === currentPage) {
      li = $('<li class="page-item active"></li>');
    } else {
      li = $('<li class="page-item"></li>');
    }
    const a = $(`<a id="${i}"></a>`).addClass("page-link").text(i);
    li.append(a);
    pagination.append(li);
  }
  $(".page-link").on("click", function () {
    const page = this.id;
    axios
      .get(`/api/employee/?page=${page}&${searchQuery}`)
      .then((response) => {
        const employees = response.data.data;
        renderContainer(
          employees,
          response.data.total,
          Number(page),
          searchQuery
        );
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

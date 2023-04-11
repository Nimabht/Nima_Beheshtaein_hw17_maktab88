const renderContainer = (
  data,
  totalItems,
  currentPage,
  searchQuery
) => {
  //Table part
  $("table").html(`<thead class="table-primary">
          <tr class="p-2">
            <th class="p-2" scope="col">Company name</th>
            <th class="p-2" scope="col">Province</th>
            <th class="p-2" scope="col">Registration date</th>
            <th class="p-2" scope="col"></th>
          </tr>
        </thead>`);
  for (const company of data) {
    const date = new Date(company.registrationDate);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const newRow = $(`<tr scope="row">
        <td class="p-2" >${company.name}</td>
        <td class="p-2" >${company.province}</td>
        <td class="p-2" >${formattedDate}</td>
        <td class="p-2" ><i class="bi bi-building-exclamation text-primary" onclick="window.location.href = 'company/profile/${company._id}';"></i></td>
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
      .get(`/api/company/?page=${page}&${searchQuery}`)
      .then((response) => {
        const companies = response.data.data;
        renderContainer(
          companies,
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

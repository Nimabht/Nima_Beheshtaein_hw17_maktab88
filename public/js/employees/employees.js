$(() => {
  axios
    .get(`/api/employee?page=1`)
    .then((response) => {
      const employees = response.data.data;
      renderContainer(employees, response.data.total, 1);
    })
    .catch((error) => {
      console.log(error);
    });
});

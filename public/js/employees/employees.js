$(() => {
  axios
    .get(`/api/employee`)
    .then((response) => {
      const employees = response.data.data;
      renderContainer(employees, response.data.total, 1);
    })
    .catch((error) => {
      console.log(error);
    });
});

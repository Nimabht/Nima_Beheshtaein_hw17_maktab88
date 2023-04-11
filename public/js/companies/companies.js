$(() => {
  axios
    .get(`/api/company?page=1`)
    .then((response) => {
      const companies = response.data.data;
      renderContainer(companies, response.data.total, 1);
    })
    .catch((error) => {
      console.log(error);
    });
});

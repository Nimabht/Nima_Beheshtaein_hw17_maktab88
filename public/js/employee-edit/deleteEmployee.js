const deleteEmployee = () => {
  let polipop = new Polipop("updateSection", {
    layout: "popups",
    insert: "before",
    pool: 5,
    life: 3000,
    progressbar: true,
  });
  let url = window.location.href;
  let id = url.match(/edit\/(.*)/)[1];
  axios
    .delete(`/api/employee/${id}`)
    .then((_response) => {
      polipop.add({
        type: "info",
        title: "Deleted!",
        content: "Employee deleted successfully!",
      });
      setTimeout(() => {
        window.location.href = `http://localhost:1010/employees`;
      }, 3000);
    })
    .catch((_error) => {
      polipop.add({
        type: "error",
        title: "Error",
        content: "Something is wrong!!!",
      });
    });
};

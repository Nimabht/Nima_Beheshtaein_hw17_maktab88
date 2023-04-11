$(() => {
  let url = window.location.href;
  let id = url.match(/edit\/(.*)/)[1];
  renderForm(id);
});

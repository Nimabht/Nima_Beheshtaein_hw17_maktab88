// Get the reset button element by ID
const resetButton = document.getElementById("srch-reset");

// Add an event listener to the reset button
resetButton.addEventListener("click", () => {
  // Get the input elements by their ID and set their values to an empty string
  const provinceInput = document.getElementById("srch-province");
  provinceInput.value = "";

  const ageInput = document.getElementById("srch-age");
  ageInput.value = "";

  const phoneNumberInput = document.getElementById(
    "srch-phonenumber"
  );
  phoneNumberInput.checked = false;

  const manRadio = document.getElementById("srch-man");
  manRadio.checked = false;

  const womanRadio = document.getElementById("srch-woman");
  womanRadio.checked = false;

  const employeeRadio = document.getElementById("srch-employee");
  employeeRadio.checked = false;

  const managerRadio = document.getElementById("srch-manager");
  managerRadio.checked = false;

  const registeredLastWeekInput = document.getElementById(
    "registeredLastWeek"
  );
  registeredLastWeekInput.checked = false;

  const sortAscRadio = document.getElementById("srch-Asc");
  sortAscRadio.checked = false;

  const sortDescRadio = document.getElementById("srch-Desc");
  sortDescRadio.checked = false;
});

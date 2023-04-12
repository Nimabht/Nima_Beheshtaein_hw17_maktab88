// Get the reset button element by ID
const resetButton = document.getElementById("srch-reset");

// Add an event listener to the reset button
resetButton.addEventListener("click", () => {
  // Get the input elements by their ID and set their values to an empty string
  const avgAgeInput = document.getElementById("srch-avgAge");
  avgAgeInput.value = "";

  const registeredLastTwoYearsInput = document.getElementById(
    "registeredLastTwoYears"
  );
  registeredLastTwoYearsInput.checked = false;

  const sortAscRadio = document.getElementById("srch-Asc");
  sortAscRadio.checked = false;

  const sortDescRadio = document.getElementById("srch-Desc");
  sortDescRadio.checked = false;
});

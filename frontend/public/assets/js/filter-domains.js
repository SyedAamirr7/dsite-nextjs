// Start filter domains
let dropdownMenu = document.querySelector(
  ".website-name .dropdown .dropdown-menu"
);
let dropdownInput = dropdownMenu.querySelector("#searchDomain");

dropdownInput.addEventListener("input", () => {
  let filter = dropdownInput.value.toUpperCase();
  let dropdownItems = dropdownMenu.getElementsByTagName("a");
  for (let i = 0; i < dropdownItems.length; i++) {
    txtValue = dropdownItems[i].textContent || dropdownItems[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      dropdownItems[i].style.display = "";
    } else {
      dropdownItems[i].style.display = "none";
    }
  }
});
// End filter domains

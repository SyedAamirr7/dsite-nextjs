const toggleBar = document.querySelector(".header nav .toggle-bars");
const openBarIcon = document.querySelector(
  ".header nav .toggle-bars .open-menu-icon"
);
const closeBarIcon = document.querySelector(
  ".header nav .toggle-bars .close-menu-icon"
);
const mainMenu = document.querySelector(".header nav .header-links");
const mainMenuLi = document.querySelectorAll(".header nav .header-links li a");

toggleBar.addEventListener("click", () => {
  mainMenu.classList.toggle("active");
  closeBarIcon.classList.toggle("active");
  openBarIcon.classList.toggle("active");
});
mainMenuLi.forEach((item) => {
  item.addEventListener("click", () => {
    mainMenu.classList.toggle("active");
    closeBarIcon.classList.toggle("active");
    openBarIcon.classList.toggle("active");
  });
});

// Start Header Links
const pageItem = document.querySelector(
  ".header nav .header-links .pages-span"
);
const dropdownPages = document.querySelector(".header .dropdown-pages");
const dropdownLi = document.querySelector(".header .dropdown-li");
pageItem.addEventListener("click", () => {
  dropdownPages.classList.toggle("active-page");
  dropdownLi.classList.toggle("active");
});
// End Header Links

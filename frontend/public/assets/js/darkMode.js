// Start dark and light mode
const bodyElement = document.querySelector("body");
const darkLightIcons = document.querySelectorAll(".dark-light_label .icon");
const darkModeSwitch = document.querySelector(
  ".dark-light_label #darkModeSwitch"
);

// When click on buttons to switch between modes.
darkLightIcons.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.contains("icon--moon")
      ? localStorage.setItem("isDarkMode", true)
      : localStorage.setItem("isDarkMode", false);
    darkModeFun();
  });
});

darkModeFun();

// Dark mode function
function darkModeFun() {
  localStorage.getItem("isDarkMode") == "true"
    ? bodyElement.classList.add("dark")
    : bodyElement.classList.remove("dark");
}
// End dark and light mode

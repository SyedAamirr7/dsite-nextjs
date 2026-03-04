const otherLink = document.querySelector("#otherLink");
const selectLink = document.querySelector("#LinkType");

selectLink.addEventListener("change", () => {
  const selectValue = selectLink.value;
  selectValue == "otherLink"
    ? otherLink.classList.remove("d-none")
    : otherLink.classList.add("d-none");
});

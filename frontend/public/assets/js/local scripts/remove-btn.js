const removeBtns = document.querySelectorAll(".table td .remove_btn");
console.log(removeBtns);
removeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const alertResult = confirm("Are you sure?");
    if (alertResult) {
      btn.parentElement.parentElement.remove();
    }
  });
});

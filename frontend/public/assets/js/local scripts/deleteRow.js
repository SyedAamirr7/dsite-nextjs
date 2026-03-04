const deleteRow = document.querySelectorAll("#deleteRow");
deleteRow.forEach((btn) => {
  btn.addEventListener("click", () => {
    const confirmResult = confirm("هل انت متأكد؟");
    if (confirmResult == true) {
      const targetRow = document.querySelector(btn.dataset.target);
      targetRow.remove();
    }
  });
});

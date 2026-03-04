// Start pick a color from the document
const eyeDropperIcons = document.querySelectorAll(
  ".website-design__form .colors_container .colorInputParent .eyedropper__icon"
);
eyeDropperIcons &&
  eyeDropperIcons.forEach((item) => {
    item.addEventListener("click", async () => {
      const eyedropperInput = item.parentElement.querySelector(
        'input[type="color"]'
      );
      const eyeDropper = new EyeDropper();
      const { sRGBHex } = await eyeDropper.open();
      eyedropperInput.value = sRGBHex;
    });
  });
// End pick a color from the document

// Start active copy button
const copyButton = document.querySelectorAll(".copy-button button");
copyButton &&
  copyButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("active");
      setTimeout(() => {
        btn.classList.remove("active");
      }, 2000);
    });
  });
// End active copy button

// Start color extraction
// const uploadImage = document.querySelector("#colorful_logo");
// const colorInputs = document.querySelectorAll(".color-input");

// if (uploadImage) {
//   uploadImage.onload = function () {
//     extractColorsFromImage(uploadImage);
//   };
// }

// function extractColorsFromImage(image) {
//   colorjs.prominent(image, { amount: 8, format: "hex" }).then((colors) => {
//     for (let i = 0; i < colors.length; i++) {
//       colorInputs[i].value = colors[i];
//     }
//   });
// }
// End color extraction

// Start filter domains
let dropdownMenu = document.querySelector(
  ".website-name .dropdown .dropdown-menu"
);
if (dropdownMenu) {
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
}
// End filter domains

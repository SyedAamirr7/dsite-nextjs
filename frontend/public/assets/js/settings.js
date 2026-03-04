// Start pick a color from the document
const eyeDropperIcons = document.querySelectorAll(
  ".website-design__form .colors_container .colorInputParent .eyedropper__icon"
);
if (eyeDropperIcons) {
  eyeDropperIcons.forEach((item) => {
    item.addEventListener("click", async () => {
      const eyedropperInput = item.parentElement.querySelector(
        'input[type="color"]'
      );
      const eyeDropper = new EyeDropper();
      const { sRGBHex } = await eyeDropper.open();
      eyedropperInput.value = sRGBHex;

      let colorName = ntc.name(sRGBHex)[1];
      console.log(colorName);
    });
  });
}
// End pick a color from the document

// Start delete the img when click delete button
const deleteBtns = document.querySelectorAll(
  ".website-design__form .delete-logo-img__website-design"
);
if (deleteBtns) {
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const deleteTargetImg = document.querySelector(btn.dataset.target);
      deleteTargetImg.src = "";
    });
  });
}
// End delete the img when click delete button

// Start active copy button
const copyButton = document.querySelectorAll(".copy-button button");
if (copyButton) {
  copyButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("active");
      setTimeout(() => {
        btn.classList.remove("active");
      }, 2000);
    });
  });
}

// End active copy button

// Start color extraction
const uploadImage = document.querySelector("#colorful_logo");
const colorInputs = document.querySelectorAll(".color-input");

if (uploadImage) {
  uploadImage.onload = function () {
    extractColorsFromImage(uploadImage);
  };
}

function extractColorsFromImage(image) {
  colorjs.prominent(image, { amount: 8, format: "hex" }).then((colors) => {
    for (let i = 0; i < colors.length; i++) {
      colorInputs[i].value = colors[i];
      let colorName = ntc.name(colors[i])[1];
      console.log(colorName);
    }
  });
}
// End color extraction

// Start pick a color from the document
const eyeDropperIcons = document.querySelectorAll(
  ".colors-logos__container .colors__container .colorInputParent .eyedropper__icon"
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
    });
  });
}
// End pick a color from the document

// Start color extraction
const uploadImage = document.querySelector("#logo_colorful");
const colorInputs = document.querySelectorAll(".color-input");

uploadImage.onload = function () {
  extractColorsFromImage(uploadImage);
};

function extractColorsFromImage(image) {
  colorjs.prominent(image, { amount: 8, format: "hex" }).then((colors) => {
    for (let i = 0; i < colors.length; i++) {
      colorInputs[i].value = colors[i];
    }
  });
}
// End color extraction

// Start loading animation
const submitForm = document.querySelector(".mainContent #builderForm");
const bodywiz = document.querySelector(".mainContent #builderForm #bodywiz");
const submitLoading = document.querySelector(".loading-wrapper");
const submitText = document.querySelector(".loading-text");
const submitBtn = document.querySelector(
  ".mainContent #builderForm .submit_btn"
);

submitBtn.addEventListener("click", () => {
  submitForm.classList.add("active-anim");
  bodywiz.classList.add("active-anim");
  submitLoading.classList.add("active-anim");
  submitText.classList.add("active-anim");
  document.getElementById("builderForm").submit();
});
// End loading animation

// Start filter info
const siteInfoSelect = document.querySelector(".siteInfo #select-site-lang");
const siteInfoGroup = document.querySelectorAll(
  ".siteInfo .form-group[data-lang]"
);

const handleSelectGroup = (selectValue) => {
  siteInfoGroup.forEach((item) => {
    item.style.display = "flex";
    const formLang = item.dataset.lang;
    switch (selectValue) {
      case "ar":
        formLang == "lang_en" && (item.style.display = "none");
        break;
      case "en":
        formLang == "lang_ar" && (item.style.display = "none");
        break;
      default:
        console.log("Nothing lang");
    }
  });
};

siteInfoSelect.addEventListener("change", () => {
  const selectValue = siteInfoSelect.value;
  handleSelectGroup(selectValue);
});
// End filter info

const selectCustomItem = document.querySelector(
  ".dsite-ad_form #selectCustomItem"
);
const cardBody = document.querySelectorAll(".dsite-ad_form .lang_col");
let inputLength = 0;
let dropdownLength = 0;
let nameInputLength = 0;
let nameDropdownLength = 0;
let nameRadioLength = 0;
let radioLength = 0;

// Add input function
function addCustomInput() {
  inputLength++;
  nameInputLength++;
  cardBody.forEach((item) => {
    const customInput = document.createElement("div");
    customInput.id = `formGroupInput${inputLength}`;
    customInput.setAttribute("class", "form-group row align-items-center");
    customInput.innerHTML = `<div class="col-xl-4"> <label class="form-label d-flex align-items-center"> <input type="text" value="فارغ" name=${
      item.id == "custom_lang-en"
        ? "name-input_en-" + nameInputLength
        : "name-input_ar-" + nameInputLength
    } disabled class="bg-transparent" /> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="change-item_svg mx-1" onclick="changeLabel(this)" viewBox="0 0 512 512"> <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /> </svg> </label> </div> <div class="col-xl-8 d-flex align-items-center gap-4"> <input type="text" class="form-control" disabled autocomplete="off" /> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle text-danger remove-item_svg" data-target="#formGroupInput${inputLength}" onclick="removeElement(this)" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg> </div>`;
    item.appendChild(customInput);
  });
}

// Add dropdown function
function addCustomDropdown() {
  dropdownLength++;
  nameDropdownLength++;
  cardBody.forEach((item) => {
    const customDropdown = document.createElement("div");
    const removeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle text-danger remove-item_svg" data-target="#dropdown${dropdownLength}" viewBox="0 0 16 16" onclick="removeElement(this)"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg>`;
    const editSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 512 512" class="mx-2" onclick="changeLabel(this)"> <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>`;
    const addSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle text-success add-item_svg" data-target="#formGroupDropdown${dropdownLength}" viewBox="0 0 16 16" onclick=addOption(this)> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>
  `;
    customDropdown.id = `dropdown${dropdownLength}`;
    customDropdown.setAttribute("class", "row");
    customDropdown.innerHTML = `
    <div class="col-xl-4">
    <div class="d-flex justify-content-center"> <label class="form-label d-flex align-items-center"><input
    type="text"
    value="dropdown"
    name=${
      item.id == "custom_lang-en"
        ? "name-dropdown_en-" + nameDropdownLength
        : "name-dropdown_ar-" + nameDropdownLength
    }
    disabled
    class="bg-transparent"
  />
  ${editSvg} ${removeSvg}
</label> </div>
</div>
<div class="col-xl-8">
<div class="form-group align-items-center"> <div class="d-flex align-items-center gap-4"> <input type="text" class="form-control" required autocomplete="off" /> ${addSvg} </div> </div> <div class="form-group align-items-center" id="formGroupDropdown${dropdownLength}"> <div class="d-flex align-items-center gap-4"> <input type="text" class="form-control" required autocomplete="off" /> ${addSvg} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle text-danger remove-item_svg" data-target="#formGroupDropdown${dropdownLength}" viewBox="0 0 16 16" onclick="removeElement(this)"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg> </div></div></div>`;
    item.appendChild(customDropdown);
  });
}

// Add radio function
function addCustomRadio() {
  radioLength++;
  nameRadioLength++;
  cardBody.forEach((item) => {
    const customRadio = document.createElement("div");
    const removeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle text-danger remove-item_svg" data-target="#radio${radioLength}" viewBox="0 0 16 16" onclick="removeElement(this)"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg>`;
    const editSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 512 512" class="mx-2" onclick="changeLabel(this)"
    ><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>`;
    const addSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle text-success add-item_svg" data-target="#formGroupRadio${radioLength}" viewBox="0 0 16 16" onclick=addOption(this)> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>
    `;
    customRadio.id = `radio${radioLength}`;
    customRadio.setAttribute("class", "row");
    customRadio.innerHTML = `
    <div class="col-xl-4">
    <div class="d-flex justify-content-center"> <label class="form-label d-flex align-items-center"><input
    type="text"
    value="radio"
    name=${
      item.id == "custom_lang-en"
        ? "name-radio_en-" + nameRadioLength
        : "name-radio_ar-" + nameRadioLength
    }
    disabled
    class="bg-transparent"
  />
  ${editSvg} ${removeSvg}
</label> </div>
</div>
<div class="col-xl-8">
<div class="form-group align-items-center"> <div class="d-flex align-items-center gap-4"> <input type="text" class="form-control" required autocomplete="off" /> ${addSvg} </div> </div> <div class="form-group align-items-center" id="formGroupRadio${radioLength}"> <div class="d-flex align-items-center gap-4"> <input type="text" class="form-control" required autocomplete="off" /> ${addSvg} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle text-danger remove-item_svg" data-target="#formGroupRadio${radioLength}" viewBox="0 0 16 16" onclick="removeElement(this)"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg> </div></div></div>`;
    item.appendChild(customRadio);
  });
}

// Add dropdown option function
function addCustomOption(checkOption) {
  const customOption = document.createElement("div");
  customOption.setAttribute("class", "form-group align-items-center");
  if (checkOption == "dropdown") {
    dropdownLength++;
    customOption.id = `formGroupDropdown${dropdownLength}`;
    customOption.innerHTML = `<div class="d-flex align-items-center gap-4"> <input type="text" class="form-control" required autocomplete="off">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" data-target="#formGroupDropdown${dropdownLength}" 
    data-type="dropdown" class="bi bi-plus-circle text-success add-item_svg" viewBox="0 0 16 16" onclick="addOption(this)">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
  </svg>
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" data-target="#formGroupDropdown${dropdownLength}" class="bi bi-x-circle text-danger remove-item_svg" viewBox="0 0 16 16"  onclick="removeElement(this)">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg> </div>`;
    return customOption;
  } else {
    radioLength++;
    customOption.id = `formGroupRadio${radioLength}`;
    customOption.innerHTML = `<div class="d-flex align-items-center gap-4"> <input type="text" class="form-control" required autocomplete="off">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" data-target="#formGroupRadio${radioLength}"
    data-type="radio" class="bi bi-plus-circle text-success add-item_svg" viewBox="0 0 16 16" onclick="addOption(this)">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
  </svg>
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" data-target="#formGroupRadio${radioLength}" class="bi bi-x-circle text-danger remove-item_svg" viewBox="0 0 16 16"  onclick="removeElement(this)">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg> </div>`;
    return customOption;
  }
}

// Start add element when click add button after select element
const addBtn = document.querySelector(".dsite-ad_form .add-custom_btn");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const selectedItem = selectCustomItem.value;
  if (selectedItem == "input") {
    addCustomInput();
  } else if (selectedItem == "dropdown") {
    addCustomDropdown();
  } else {
    addCustomRadio();
  }
});
// End add element when click add button after select element

// Start remove element when click remove button
function removeElement(btn) {
  const targetElements = document.querySelectorAll(btn.dataset.target);
  targetElements.forEach((ele) => {
    ele.remove();
  });
}
// End remove element when click remove button

// Start add element when click add option svg.
function addOption(btn) {
  const targetElements = document.querySelectorAll(btn.dataset.target);
  const optionType = btn.dataset.type;
  const optionElement =
    optionType == "dropdown"
      ? addCustomOption("dropdown")
      : addCustomOption("radio");
  const optionClone = optionElement.cloneNode(true);
  targetElements[0].insertAdjacentElement("afterend", optionElement);
  targetElements[1].insertAdjacentElement("afterend", optionClone);
}
// End add element when click add option svg.

// Start change label
function changeLabel(item) {
  // input field
  const inputField = item.previousElementSibling;
  inputField.focus();
  inputField.disabled = false;

  inputField.addEventListener("input", () => {
    inputField.setAttribute("value", inputField.value);
  });
}
// End change label

const selectCustomItem = document.querySelector(
    ".dsite-ad_form #selectCustomItem"
  ),
  cardBody = document.querySelectorAll(".dsite-ad_form .lang_col");
let order = 0,
  inputLength = 0,
  radioLength = 0,
  dropdownLength = 0,
  nameDropdownLength = 0,
  nameRadioLength = 0,
  appendDropChildNum = 0,
  appendRadioChildNum = 0;
function addCustomInput() {
  order++,
    inputLength++,
    cardBody.forEach((e) => {
      let t = document.createElement("div");
      (t.id = `formGroupInput${inputLength}`),
        t.setAttribute("class", "form-group row align-items-center"),
        (t.innerHTML = `<div class="col-xl-4"><input type="hidden" name=${
          "custom_lang-en" == e.id ? "inputorder_en-[]" : "inputorder_ar-[]"
        } class="bg-transparent" value="${order}" /> <label class="form-label d-flex align-items-center"> <input type="text" value="${"custom_lang-en" == e.id ? "input" : "فارغ"}"
         name=${"custom_lang-en" == e.id ? "inputName_en-[]" : "inputName_ar-[]"} 
        disabled class="bg-transparent" /> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="change-item_svg mx-1" onclick="changeLabel(this)" viewBox="0 0 512 512"> <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /> </svg> </label> </div> <div class="col-xl-8 d-flex align-items-center gap-4"> <input type="text" class="form-control" disabled autocomplete="off" /> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle text-danger remove-item_svg" data-target="#formGroupInput${inputLength}" onclick="removeElement(this)" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg> </div>`),
        e.appendChild(t);
    });
}
function addCustomDropdown() {
  order++,
    dropdownLength++,
    nameDropdownLength++,
    appendDropChildNum++,
    cardBody.forEach((e) => {
      let t = document.createElement("div"),
        a = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle text-danger remove-item_svg" data-target="#dropdown${dropdownLength}" viewBox="0 0 16 16" onclick="removeElement(this)"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg>`,
        n = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle text-success add-item_svg" data-target="#appendDropChild${appendDropChildNum}" data-type="dropdown" data-lang=${
          "custom_lang-en" == e.id ? "en" : "ar"
        } viewBox="0 0 16 16" onclick=addOption(this)> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>
  `;
      (t.id = `dropdown${dropdownLength}`),
        t.setAttribute("class", "row"),
        (t.innerHTML = `
    <div class="col-xl-4">
    <div class="d-flex justify-content-center"> <label class="form-label d-flex align-items-center"><input
    type="text"
    value="${
      "custom_lang-en" == e.id
        ? "Dropdown"
        : "اسقاط"
    }"
    name=${
      "custom_lang-en" == e.id
        ? "dropdownInputName_en[]"
        : "dropdownInputName_ar[]"
    }
    disabled
    class="bg-transparent"
  />
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 512 512" class="mx-2" onclick="changeLabel(this)"> <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg> ${a}
  <input type="hidden" name=${
    "custom_lang-en" == e.id ? "dropdownOrder_en-[]" : "dropdownOrder_ar-[]"
  } class="bg-transparent" value="${order}" />
</label> </div>
</div>
<div class="col-xl-8" id="appendDropChild${appendDropChildNum}">
<div class="form-group align-items-center" id="formGroupDropdown${nameDropdownLength}"> <div class="d-flex align-items-center gap-4"> <input type="text" class="form-control" required autocomplete="off"
name=${
          "custom_lang-en" == e.id
            ? "dropdownInputName_option_value_en-" + nameDropdownLength + "[]"
            : "dropdownInputName_option_value_ar-" + nameDropdownLength + "[]"
        } /> ${n} </div> </div> <div class="form-group align-items-center" data-lang=${
          "custom_lang-en" == e.id ? "en" : "ar"
        } > <div class="d-flex align-items-center gap-4" id="inputDropContainer${dropdownLength}"> <input type="text" class="form-control" required autocomplete="off" name=${
          "custom_lang-en" == e.id
            ? "dropdownInputName_option_value_en-" + nameDropdownLength + "[]"
            : "dropdownInputName_option_value_ar-" + nameDropdownLength + "[]"
        } /> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle text-danger remove-item_svg" data-target="#inputDropContainer${dropdownLength}" viewBox="0 0 16 16" onclick="removeElement(this)"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg> </div></div></div>`),
        e.appendChild(t);
    });
}
function addCustomRadio() {
  order++,
    radioLength++,
    nameRadioLength++,
    appendRadioChildNum++,
    cardBody.forEach((e) => {
      let t = document.createElement("div"),
        a = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle text-danger remove-item_svg" data-target="#radio${radioLength}" viewBox="0 0 16 16" onclick="removeElement(this)"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg>`,
        n = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 512 512" class="mx-2" onclick="changeLabel(this)"
    ><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>`,
        $ = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle text-success add-item_svg" 
    data-target="#appendRadioChild${appendRadioChildNum}" data-type="radio" data-lang=${
          "custom_lang-en" == e.id ? "en" : "ar"
        } viewBox="0 0 16 16" onclick=addOption(this)> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>
    `;
      (t.id = `radio${radioLength}`),
        t.setAttribute("class", "row"),
        (t.innerHTML = `
    <div class="col-xl-4">
    <div class="d-flex justify-content-center"> <label class="form-label d-flex align-items-center"><input
    type="text"
    value="${
      "custom_lang-en" == e.id ? "Radio" : "الراديو"
    }"
    name=${
      "custom_lang-en" == e.id ? "radioInputName_en[]" : "radioInputName_ar[]"
    }
    disabled
    class="bg-transparent"
  />
  ${n} ${a}
  <input type="hidden" name=${
    "custom_lang-en" == e.id ? "radioOrder_en-[]" : "radioOrder_ar-[]"
  } class="bg-transparent" value="${order}" />
</label> </div>
</div>
<div class="col-xl-8" id="appendRadioChild${appendRadioChildNum}">
<div class="form-group align-items-center" id="formGroupRadio${nameRadioLength}"> <div class="d-flex align-items-center gap-4"> <input type="text" class="form-control" required autocomplete="off" name=${
          "custom_lang-en" == e.id
            ? "radioInputName_option_value_en-" + nameRadioLength + "[]"
            : "radioInputName_option_value_ar-" + nameRadioLength + "[]"
        } /> ${$} </div> </div> <div class="form-group align-items-center" id="formGroupRadio${radioLength}"  data-lang=${
          "custom_lang-en" == e.id ? "en" : "ar"
        }> <div class="d-flex align-items-center gap-4" id="inputRadioContainer${dropdownLength}"> <input type="text" class="form-control" required autocomplete="off" name=${
          "custom_lang-en" == e.id
            ? "radioInputName_option_value_en-" + nameRadioLength + "[]"
            : "radioInputName_option_value_ar-" + nameRadioLength + "[]"
        }/> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle text-danger remove-item_svg" data-target="#inputRadioContainer${dropdownLength}" viewBox="0 0 16 16" onclick="removeElement(this)"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg> </div></div></div>`),
        e.appendChild(t);
    });
}
function addCustomOption(e, t) {
  let a = document.createElement("div");
  return (a.setAttribute("class", "form-group align-items-center"),
  "dropdown" == e)
    ? (dropdownLength++,
      (a.id = `formGroupDropdown${dropdownLength}`),
      a.setAttribute("data-lang", `${"en" == t ? "en" : "ar"}`),
      (a.innerHTML = `<div class="d-flex align-items-center gap-4"> <input type="text" class="form-control" required autocomplete="off"  name="dropdownInputName_option_value_ar-${nameDropdownLength}[]"
    }  />
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" data-target="#formGroupDropdown${dropdownLength}" class="bi bi-x-circle text-danger remove-item_svg" viewBox="0 0 16 16"  onclick="removeElement(this)">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg> </div>`),
      a)
    : (radioLength++,
      (a.id = `formGroupRadio${radioLength}`),
      a.setAttribute("data-lang", `${"en" == t ? "en" : "ar"}`),
      (a.innerHTML = `<div class="d-flex align-items-center gap-4"> <input type="text" class="form-control" required autocomplete="off" name="radioInputName_option_value_ar-${nameRadioLength}[]"
    } />
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" data-target="#formGroupRadio${radioLength}" class="bi bi-x-circle text-danger remove-item_svg" viewBox="0 0 16 16"  onclick="removeElement(this)">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg> </div>`),
      a);
}
const addBtn = document.querySelector(".dsite-ad_form .add-custom_btn");
function removeElement(e) {
  document.querySelectorAll(e.dataset.target).forEach((e) => {
    e.remove();
  });
}
function addOption(e) {
  let t = document.querySelectorAll(e.dataset.target),
    a = e.dataset.type,
    n = e.dataset.lang,
    $ =
      "dropdown" == a
        ? addCustomOption("dropdown", n)
        : addCustomOption("radio", n),
    o = $.cloneNode(!0);
  o.setAttribute("data-lang", "en");
  let d = o.querySelector(".form-control");
  "dropdown" == a
    ? d.setAttribute(
        "name",
        "dropdownInputName_option_value_en-" + nameDropdownLength + "[]"
      )
    : d.setAttribute(
        "name",
        "radioInputName_option_value_en-" + nameRadioLength + "[]"
      ),
    t[0].appendChild($),
    t[1].appendChild(o);
}
function changeLabel(e) {
  let t = e.previousElementSibling;
  t.focus(),
    (t.disabled = !1),
    t.addEventListener("input", () => {
      console.log("sok"), t.setAttribute("value", t.value);
    });
}
addBtn &&
  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let t = selectCustomItem.value;
    "input" == t
      ? addCustomInput()
      : "dropdown" == t
      ? addCustomDropdown()
      : addCustomRadio();
  });

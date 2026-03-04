const selectFormTypes = document.querySelectorAll("#selectFormType");
const BuildForms = document.querySelectorAll("#BuildForm");

let inputNum = 1;
let selectInputNum = 1;
let selectMenuNum = 1;
let selectOptionNum = 1;
let appendDropChildNum = 1;
let appendRadioChildNum = 1;

// Start sortable inputs
BuildForms.forEach((item) => {
  $(function () {
    $(item).sortable({
      update: function (e, ui) {
        const parentElements = ui.item[0].parentElement;
        parentElements
          .querySelectorAll(".sortable_order")
          .forEach((item, i) => {
            item.value = i + 1;
          });
      },
    });
  });
});

// Start create inputs
selectFormTypes.forEach((item) => {
  item.addEventListener("change", () => {
    const selectValue = item.value;
    item.querySelectorAll("option")[0].selected = true;
    switch (selectValue) {
      case "text":
        createInput("text");
        break;
      case "number":
        createInput("mobile");
        break;
      case "email":
        createInput("email");
        break;
      case "time":
        createInput("time");
        break;
      case "date":
        createInput("date");
        break;
      case "textarea":
        createInput("textarea");
        break;
      case "multiSelect":
        createInput("dropdown");
        break;
      case "oneSelect":
        createInput("radio");
        break;
      default:
        console.log("No select!");
    }
  });
});

function appendChild(parent, content, type, lang) {
  let sortableIndex = parent.childElementCount + 1;
  const inputContent = {
    textInput: `<input type="hidden" value="text" name="FORM_TEXT_${inputNum}[${lang}[type]]" /><input type="hidden" class="sortable_order" value="${sortableIndex}" name="FORM_TEXT_${inputNum}[${lang}[order]]" /> <span class="sort-btn"> <a href="#!" class="drag-handle ui-sortable-handle" > <img src="${Base_Url}/public/assets/acp/img/sort.svg" alt="sort" /> </a> </span> <div class="flex-grow-1 px-2 text-start"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-fonts" viewBox="0 0 16 16" > <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479z" /> </svg> <input type="text" placeholder="text" name="FORM_TEXT_${inputNum}[${lang}]" class="border-0" /> </div> <div class="buttons px-2"> <input type="hidden" value="1" name="FORM_TEXT_${inputNum}[${lang}[required]]" /> <button type="button" title="Make this field required" class="required_btn active" onclick="requireField(this)" data-target="build-input_${selectInputNum}"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-asterisk required_icon" viewBox="0 0 16 16" > <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" /> </svg> </button> <button type="button" title="Remove field" onclick="removeField(this)" class="removed_btn" data-type="text" data-target="build-input_${selectInputNum}"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3 removed_icon" viewBox="0 0 16 16" > <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" /> </svg> </button> </div>`,
    mobileInput: `<input type="hidden" value="number" name="FORM_MOBILE_${inputNum}[${lang}[type]]" /><input type="hidden" class="sortable_order" value="${sortableIndex}" name="FORM_MOBILE_${inputNum}[${lang}[order]]" /> <span class="sort-btn"> <a href="#!" class="drag-handle ui-sortable-handle" > <img src="${Base_Url}/public/assets/acp/img/sort.svg" alt="sort" /> </a> </span> <div class="flex-grow-1 px-2 text-start"> <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" > <path d="M13.2379 3.63416C13.312 3.22663 13.0417 2.83619 12.6342 2.7621C12.2266 2.688 11.8362 2.9583 11.7621 3.36584L13.2379 3.63416ZM9.7621 14.3658C9.688 14.7734 9.9583 15.1638 10.3658 15.2379C10.7734 15.312 11.1638 15.0417 11.2379 14.6342L9.7621 14.3658ZM8.2379 3.63416C8.312 3.22663 8.0417 2.83619 7.63416 2.7621C7.22663 2.688 6.83619 2.9583 6.7621 3.36584L8.2379 3.63416ZM4.7621 14.3658C4.688 14.7734 4.9583 15.1638 5.36584 15.2379C5.77337 15.312 6.16381 15.0417 6.2379 14.6342L4.7621 14.3658ZM4 5.75C3.58579 5.75 3.25 6.08579 3.25 6.5C3.25 6.91421 3.58579 7.25 4 7.25V5.75ZM15 7.25C15.4142 7.25 15.75 6.91421 15.75 6.5C15.75 6.08579 15.4142 5.75 15 5.75V7.25ZM3 10.75C2.58579 10.75 2.25 11.0858 2.25 11.5C2.25 11.9142 2.58579 12.25 3 12.25V10.75ZM14 12.25C14.4142 12.25 14.75 11.9142 14.75 11.5C14.75 11.0858 14.4142 10.75 14 10.75V12.25ZM11.7621 3.36584L9.7621 14.3658L11.2379 14.6342L13.2379 3.63416L11.7621 3.36584ZM6.7621 3.36584L4.7621 14.3658L6.2379 14.6342L8.2379 3.63416L6.7621 3.36584ZM4 7.25H15V5.75H4V7.25ZM3 12.25H14V10.75H3V12.25Z" ></path> </svg> <input type="text" placeholder="Number" name="FORM_MOBILE_${inputNum}[${lang}]" class="border-0" /> </div> <div class="buttons px-2"> <input type="hidden" value="0" name="FORM_MOBILE_${inputNum}[${lang}[required]]" /> <button type="button" title="Make this field required" class="required_btn" onclick="requireField(this)" data-target="build-input_${selectInputNum}"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-asterisk required_icon" viewBox="0 0 16 16" > <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" /> </svg> </button> <button type="button" title="Remove field" onclick="removeField(this)" class="removed_btn" data-type="mobile" data-target="build-input_${selectInputNum}"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3 removed_icon" viewBox="0 0 16 16" > <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" /> </svg> </button> </div>`,
    emailInput: `<input type="hidden" value="email" name="FORM_EMAIL_${inputNum}[${lang}[type]]" /><input type="hidden" class="sortable_order" value="${sortableIndex}" name="FORM_EMAIL_${inputNum}[${lang}[order]]" /> <span class="sort-btn"> <a href="#!" class="drag-handle ui-sortable-handle" > <img src="${Base_Url}/public/assets/acp/img/sort.svg" alt="sort" /> </a> </span> <div class="flex-grow-1 px-2 text-start"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16" > <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" /> </svg> <input type="text" placeholder="Email" name="FORM_EMAIL_${inputNum}[${lang}]" class="border-0" /> </div> <div class="buttons px-2"> <input type="hidden" value="0" name="FORM_EMAIL_${inputNum}[${lang}[required]]" /> <button type="button" title="Make this field required" class="required_btn" onclick="requireField(this)" data-target="build-input_${selectInputNum}"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-asterisk required_icon" viewBox="0 0 16 16" > <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" /> </svg> </button> <button type="button" title="Remove field" class="removed_btn" onclick="removeField(this)" data-type="email" data-target="build-input_${selectInputNum}"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3 removed_icon" viewBox="0 0 16 16" > <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" /> </svg> </button> </div>`,
    timeInput: `<input type="hidden" value="time" name="FORM_TIME_${inputNum}[${lang}[type]]" /><input type="hidden" class="sortable_order" value="${sortableIndex}" name="FORM_TIME_${inputNum}[${lang}[order]]" /> <span class="sort-btn"> <a href="#!" class="drag-handle ui-sortable-handle" > <img src="${Base_Url}/public/assets/acp/img/sort.svg" alt="sort" /> </a> </span> <div class="flex-grow-1 px-2 text-start"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16" > <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" /> <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" /> </svg> <input type="text" placeholder="Time" name="FORM_TIME_${inputNum}[${lang}]" class="border-0" /> </div> <div class="buttons px-2"> <input type="hidden" value="0" name="FORM_TIME_${inputNum}[${lang}[required]]" /> <button type="button" title="Make this field required" class="required_btn" onclick="requireField(this)" data-target="build-input_${selectInputNum}"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-asterisk required_icon" viewBox="0 0 16 16" > <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" /> </svg xmlns=> </button> <button type="button" title="Remove field" class="removed_btn" onclick="removeField(this)" data-type="time" data-target="build-input_${selectInputNum}"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3 removed_icon" viewBox="0 0 16 16" > <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" /> </svg> </button> </div>`,
    dateInput: `<input type="hidden" value="date" name="FORM_DATE_${inputNum}[${lang}[type]]" /><input type="hidden" class="sortable_order" value="${sortableIndex}" name="FORM_DATE_${inputNum}[${lang}[order]]" /> <span class="sort-btn"> <a href="#!" class="drag-handle ui-sortable-handle" > <img src="${Base_Url}/public/assets/acp/img/sort.svg" alt="sort" /> </a> </span> <div class="flex-grow-1 px-2 text-start"> <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" > <path d="M3 4V3.25C2.58579 3.25 2.25 3.58579 2.25 4H3ZM15 4H15.75C15.75 3.58579 15.4142 3.25 15 3.25V4ZM6.75 2.5C6.75 2.08579 6.41421 1.75 6 1.75C5.58579 1.75 5.25 2.08579 5.25 2.5H6.75ZM5.25 5C5.25 5.41421 5.58579 5.75 6 5.75C6.41421 5.75 6.75 5.41421 6.75 5H5.25ZM12.75 2.5C12.75 2.08579 12.4142 1.75 12 1.75C11.5858 1.75 11.25 2.08579 11.25 2.5H12.75ZM11.25 5C11.25 5.41421 11.5858 5.75 12 5.75C12.4142 5.75 12.75 5.41421 12.75 5H11.25ZM3 4.75H15V3.25H3V4.75ZM14.25 4V12H15.75V4H14.25ZM13 13.25H5V14.75H13V13.25ZM3.75 12V4H2.25V12H3.75ZM3 8.75H15V7.25H3V8.75ZM5.25 2.5V5H6.75V2.5H5.25ZM11.25 2.5V5H12.75V2.5H11.25ZM5 13.25C4.30964 13.25 3.75 12.6904 3.75 12H2.25C2.25 13.5188 3.48122 14.75 5 14.75V13.25ZM14.25 12C14.25 12.6904 13.6904 13.25 13 13.25V14.75C14.5188 14.75 15.75 13.5188 15.75 12H14.25Z" ></path> </svg> <input type="text" placeholder="Date" name="FORM_DATE_${inputNum}[${lang}]" class="border-0" /> </div> <div class="buttons px-2"> <input type="hidden" value="0" name="FORM_DATE_${inputNum}[${lang}[required]]" /> <button type="button" title="Make this field required" class="required_btn" onclick="requireField(this)" data-target="build-input_${selectInputNum}"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-asterisk required_icon" viewBox="0 0 16 16" > <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" /> </svg> </button> <button type="button" title="Remove field" class="removed_btn" onclick="removeField(this)" data-type="date" data-target="build-input_${selectInputNum}"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3 removed_icon" viewBox="0 0 16 16" > <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" /> </svg> </button> </div>`,
    areaInput: `<input type="hidden" value="textarea" name="FORM_CONTENT_${inputNum}[${lang}[type]]" /><input type="hidden" class="sortable_order" value="${sortableIndex}" name="FORM_CONTENT_${inputNum}[${lang}[order]]" /> <span class="sort-btn"> <a href="#!" class="drag-handle ui-sortable-handle" > <img src="${Base_Url}/public/assets/acp/img/sort.svg" alt="sort" /> </a> </span> <div class="flex-grow-1 px-2 text-start"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16" > <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" /> <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" /> </svg> <input type="text" placeholder="Paragraph" name="FORM_CONTENT_${inputNum}[${lang}]" class="border-0" /> </div> <div class="buttons px-2"> <input type="hidden" value="0" name="FORM_CONTENT_${inputNum}[${lang}[required]]" /> <button type="button" title="Make this field required" class="required_btn" onclick="requireField(this)" data-target="build-input_${selectInputNum}"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-asterisk required_icon" viewBox="0 0 16 16" > <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" /> </svg> </button> <button type="button" title="Remove field" class="removed_btn" onclick="removeField(this)"  data-type="area" data-target="build-input_${selectInputNum}"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3 removed_icon" viewBox="0 0 16 16" > <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" /> </svg> </button> </div>`,
    dropdownInput: `<div class="d-flex align-items-center w-100 border-bottom"><input type="hidden" value="dropdown" name="FORM_DROPDOWN_${inputNum}[${lang}[type]]" /> <input type="hidden" class="sortable_order" value="${sortableIndex}" name="FORM_DROPDOWN_${inputNum}[${lang}[order]]" /> <span class="sort-btn"> <a href="#!" class="drag-handle ui-sortable-handle" > <img src="${Base_Url}/public/assets/acp/img/sort.svg" alt="sort" /> </a> </span> <div class="flex-grow-1 px-2 text-start"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16" > <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" /> <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" /> </svg> <input type="text" placeholder="City" name="FORM_DROPDOWN_${inputNum}[${lang}]" class="border-0" /> </div> <div class="buttons px-2"> <input type="hidden" value="0" name="FORM_DROPDOWN_${inputNum}[${lang}[required]]" /> <button type="button" title="Make this field required" class="required_btn" onclick="requireField(this)" data-target="build-menu_${selectMenuNum}_${lang}"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-asterisk required_icon" viewBox="0 0 16 16" > <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" /> </svg> </button> <button type="button" title="Remove field" class="removed_btn" onclick="removeField(this)"  data-type="dropdown" data-target="build-menu_${selectMenuNum}_${lang}"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3 removed_icon" viewBox="0 0 16 16" > <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" /> </svg> </button> </div> </div> <div class="p-3 w-100 d-flex flex-column align-items-center justify-content-center text-end" > <div class="w-75" id="addDropdownOption"> <input type="text" placeholder="option" name="FORM_DROPDOWN_${inputNum}[${lang}[options][]]" class="border p-2 rounded w-100 mt-2" /> <input type="text" placeholder="option" name="FORM_DROPDOWN_${inputNum}[${lang}[options][]]" class="border p-2 rounded w-100 mt-2" /> </div> <div class="w-75"> <button type="button" class="mt-2 p-0" style="color: #2a4480" onclick="addOption(this)" data-type="dropdown" data-lang="${lang}" data-sib="${inputNum}" data-num="${selectMenuNum}"> add option </button> </div> </div>`,
    radioInput: `<div class="d-flex align-items-center w-100 border-bottom"><input type="hidden" value="radio" name="FORM_RADIO_${inputNum}[${lang}[type]]" /> <input type="hidden" class="sortable_order" value="${sortableIndex}" name="FORM_RADIO_${inputNum}[${lang}[order]]" />  <span class="sort-btn"> <a href="#!" class="drag-handle ui-sortable-handle" > <img src="${Base_Url}/public/assets/acp/img/sort.svg" alt="sort" /> </a> </span> <div class="flex-grow-1 px-2 text-start"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 512 512" > <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" /> </svg> <input type="text" placeholder="Gender" name="FORM_RADIO_${inputNum}[${lang}]" class="border-0" /> </div> <div class="buttons px-2"> <input type="hidden" value="0" name="FORM_RADIO_${inputNum}[${lang}[required]]" /> <button type="button" title="Make this field required" class="required_btn" onclick="requireField(this)" data-target="build-menu_${selectMenuNum}_${lang}"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-asterisk required_icon" viewBox="0 0 16 16" > <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" /> </svg> </button> <button type="button" title="Remove field" class="removed_btn" onclick="removeField(this)"  data-type="radio" data-target="build-menu_${selectMenuNum}_${lang}"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3 removed_icon" viewBox="0 0 16 16" > <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/> </svg> </button> </div> </div> <div class="p-3 w-100 d-flex flex-column align-items-center justify-content-center text-end" > <div class="w-75" id="addRadioOption"> <input type="text" placeholder="option" name="FORM_RADIO_${inputNum}[${lang}[options][]]" class="border p-2 rounded w-100 mt-2" /> <input type="text" placeholder="option" name="FORM_RADIO_${inputNum}[${lang}[options][]]" class="border p-2 rounded w-100 mt-2" /> </div> <div class="w-75"> <button type="button" class="mt-2 p-0" style="color: #2a4480" onclick="addOption(this)" data-type="radio" data-lang="${lang}" data-sib="${inputNum}" data-num="${selectMenuNum}"> add option </button> </div> </div>`,
  };

  const createInputDiv = document.createElement("div");
  createInputDiv.setAttribute("id", "BuildFormInput");
  createInputDiv.setAttribute("data-id", type + inputNum); // Set the data-id
  createInputDiv.setAttribute(
    "class",
    `build-input_${selectInputNum} border rounded d-flex align-items-center w-100`
  );
  const createMenuDiv = document.createElement("div");
  createMenuDiv.setAttribute("id", "BuildFormInput");
  createInputDiv.setAttribute("data-id", type + inputNum); // Set the data-id

  type == "dropdown" || type == "radio"
    ? createMenuDiv.setAttribute(
        "class",
        `build-menu_${selectMenuNum}_${lang} border rounded d-flex flex-column align-items-center w-100`
      )
    : createMenuDiv.setAttribute(
        "class",
        `build-menu_${selectMenuNum} border rounded d-flex flex-column align-items-center w-100`
      );
  type == "input"
    ? ((createInputDiv.innerHTML = ""),
      (createInputDiv.innerHTML = inputContent[content]),
      parent.appendChild(createInputDiv))
    : ((createMenuDiv.innerHTML = ""),
      (createMenuDiv.innerHTML = inputContent[content]),
      parent.appendChild(createMenuDiv));
}

function createInput(inputType) {
  switch (inputType) {
    case "text":
      BuildForms.forEach((item) => {
        const lang = item.dataset.lang;
        appendChild(item, "textInput", "input", lang);
      });
      inputNum++;
      selectInputNum++;
      break;
    case "mobile":
      BuildForms.forEach((item) => {
        const lang = item.dataset.lang;
        appendChild(item, "mobileInput", "input", lang);
      });
      inputNum++;
      selectInputNum++;
      break;
    case "email":
      BuildForms.forEach((item) => {
        const lang = item.dataset.lang;
        appendChild(item, "emailInput", "input", lang);
      });
      inputNum++;
      selectInputNum++;
      break;
    case "time":
      BuildForms.forEach((item) => {
        const lang = item.dataset.lang;
        appendChild(item, "timeInput", "input", lang);
      });
      inputNum++;
      selectInputNum++;
      break;
    case "date":
      BuildForms.forEach((item) => {
        const lang = item.dataset.lang;
        appendChild(item, "dateInput", "input", lang);
      });
      inputNum++;
      selectInputNum++;
      break;
    case "textarea":
      BuildForms.forEach((item) => {
        const lang = item.dataset.lang;
        appendChild(item, "areaInput", "input", lang);
      });
      inputNum++;
      selectInputNum++;
      break;
    case "dropdown":
      BuildForms.forEach((item) => {
        const lang = item.dataset.lang;
        appendChild(item, "dropdownInput", "dropdown", lang);
      });
      inputNum++;
      selectMenuNum++;
      break;
    case "radio":
      BuildForms.forEach((item) => {
        const lang = item.dataset.lang;
        appendChild(item, "radioInput", "radio", lang);
      });
      inputNum++;
      selectMenuNum++;
      break;
    default:
      console.log("Create input failed");
  }
}

function removeField(btn) {
  btn.classList.toggle("active");
  const targetType = btn.dataset.type;
  const targetTarget = btn.dataset.target;
  const removedItems = document.querySelectorAll(`.${targetTarget}`);

  removedItems.forEach((item) => {
    item.remove();
  });
}

function requireField(btn) {
  const targetElement = btn.dataset.target;
  const targetInputs = document.querySelectorAll(
    `.${targetElement} .required_btn`
  );
  targetInputs.forEach((item) => {
    item.classList.toggle("active");
    item.classList.contains("active")
      ? (item.previousElementSibling.value = "1")
      : (item.previousElementSibling.value = "0");
  });
}

function createOption(
  inputType,
  inputLang,
  targetParent,
  inputOptionNum,
  menuNum
) {
  // Create div as container
  const divElement = document.createElement("div");
  divElement.setAttribute(
    "class",
    `build-option_${selectOptionNum} d-flex align-items-center mt-2`
  );

  // Create input
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeholder", "option");
  inputElement.setAttribute(
    "name",
    `FORM_${inputType.toUpperCase()}_${inputOptionNum}[${inputLang}[options][]]`
  );
  inputElement.setAttribute("class", "border p-2 rounded");
  // Create button
  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("type", "button");
  buttonElement.setAttribute("title", "Remove option");
  buttonElement.setAttribute("class", "removed_btn");
  buttonElement.setAttribute("data-type", "option");
  buttonElement.setAttribute("data-target", `build-option_${selectOptionNum}`);
  buttonElement.setAttribute("onclick", "removeField(this)");
  buttonElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3 removed_icon" viewBox="0 0 16 16"> <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path> </svg>`;
  // Append children
  divElement.appendChild(inputElement);
  divElement.appendChild(buttonElement);
  targetParent.appendChild(divElement);
}

function addOption(btn) {
  const inputType = btn.dataset.type;
  const inputTypeUpper = inputType[0].toUpperCase() + inputType.slice(1);
  const inputLangs = ["ar", "en"];
  const inputNum = btn.dataset.sib;
  const menuNum = btn.dataset.num;

  inputLangs.forEach((inputLang) => {
    // Get the target parent with the First Letter of a String Uppercase.
    const targetParent = document.querySelectorAll(
      `.build-menu_${menuNum}_${inputLang}`
    );
    targetParent.forEach((item, i) => {
      const targetMenuParent = item.querySelector(
        `#add${inputTypeUpper}Option`
      );
      createOption(inputType, inputLang, targetMenuParent, inputNum, menuNum);
    });
  });
  selectOptionNum++;
}

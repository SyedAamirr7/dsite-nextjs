$(function () {
  $(".menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
  $(window).resize(function (e) {
    window_width();
  });
  function window_width() {
    if ($(window).width() > 1024) {
      $("#wrapper").addClass("toggled");
      $(".main-navbar .head .menu-toggle").addClass("d-none");
    } else {
      $("#wrapper").removeClass("toggled");
      $(".main-navbar .head .menu-toggle").removeClass("d-none");
    }
  }
  window_width();
});
$(".scroll-to-top").click(function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
(function () {
  var html_dir = $("html").data("dir");
  ("use strict");
  window.addEventListener(
    "load",
    function () {
      var forms = document.getElementsByClassName("needs-validation");
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
  $("body").on("click", function (e) {
    $('[data-toggle="popover"]').each(function () {
      if (
        !$(this).is(e.target) &&
        $(this).has(e.target).length === 0 &&
        $(".popover").has(e.target).length === 0
      ) {
        $(this).popover("hide");
      }
    });
  });
  $(".tagsinput").tagsinput({ confirmKeys: [13, 188] });
  $(".bootstrap-tagsinput input").keydown(function (event) {
    if (event.which == 13) {
      $(this).blur();
      $(this).focus();
      return false;
    }
  });
  $("select").selectpicker();
  if (html_dir == "rtl") {
    var language = "ar";
  } else {
    var language = "en";
  }
  $(".date-picker").datepicker({
    format: "yyyy-mm-dd",
    language: language,
    autoclose: true,
  });
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-left",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  $(document).ready(function () {
    if (html_dir == "rtl") {
      var url = "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Arabic.json";
    } else {
      var url = "";
    }
    $("#table").DataTable({
      searching: true,
      info: false,
      orderd: false,
      responsive: true,
      oLanguage: { sUrl: url },
    });
  });
  const websiteColors = [
    color11,
    color22,
    color33,
    color44,
    color55,
    color66,
    color77,
    color88,
  ];
  ClassicEditor.create(document.querySelector(".textarea-editor-ar"), {
    language: "ar",
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "fontColor",
        "|",
        "bold",
        "italic",
        "removeFormat",
        "bulletedList",
        "numberedList",
        "alignment",
        "|",
        "|",
        "uploadImage",
        "link",
        "insertTable",
        "mediaEmbed",
      ],
      shouldNotGroupWhenFull: true,
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableProperties",
        "TableCellProperties",
        "tableRow",
        "mergeTableCells",
      ],
    },
    mediaEmbed: { previewsInData: true },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    ckfinder: { uploadUrl: ckuploadPath + "/acp/acp/ckeditorUpload" },
    fontColor: { colors: websiteColors, columns: 4, colorPicker: false },
  })
    .then((editor) => {
      window.editor = editor;
    })
    .catch((err) => {
      console.error(err.stack);
    });
  ClassicEditor.create(document.querySelector(".textarea-editor-en"), {
    language: "en",
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "fontColor",
        "|",
        "bold",
        "italic",
        "removeFormat",
        "bulletedList",
        "numberedList",
        "alignment",
        "|",
        "|",
        "uploadImage",
        "link",
        "insertTable",
        "mediaEmbed",
      ],
      shouldNotGroupWhenFull: true,
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableProperties",
        "TableCellProperties",
        "tableRow",
        "mergeTableCells",
      ],
    },
    mediaEmbed: { previewsInData: true },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    ckfinder: { uploadUrl: ckuploadPath + "/acp/acp/ckeditorUpload" },
    fontColor: { colors: websiteColors, columns: 4, colorPicker: false },
  })
    .then((editor) => {
      window.editor = editor;
    })
    .catch((err) => {
      console.error(err.stack);
    });
  ClassicEditor.create(document.querySelector(".Basic-textarea-editor-ar"), {
    language: "ar",
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "bold",
        "italic",
        "removeFormat",
        "bulletedList",
        "numberedList",
        "alignment",
        "|",
        "|",
        "uploadImage",
        "link",
        "insertTable",
        "mediaEmbed",
      ],
      shouldNotGroupWhenFull: true,
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableProperties",
        "TableCellProperties",
        "tableRow",
        "mergeTableCells",
      ],
    },
    mediaEmbed: { previewsInData: true },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    ckfinder: { uploadUrl: ckuploadPath + "/acp/acp/ckeditorUpload" },
    fontColor: { colors: websiteColors, columns: 4, colorPicker: false },
  })
    .then((editor) => {
      window.editor = editor;
    })
    .catch((err) => {
      console.error(err.stack);
    });
  ClassicEditor.create(document.querySelector(".Basic-textarea-editor-en"), {
    language: "en",
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "bold",
        "italic",
        "removeFormat",
        "bulletedList",
        "numberedList",
        "alignment",
        "|",
        "|",
        "uploadImage",
        "link",
        "insertTable",
        "mediaEmbed",
      ],
      shouldNotGroupWhenFull: true,
    },
    mediaEmbed: { previewsInData: true },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableProperties",
        "TableCellProperties",
        "tableRow",
        "mergeTableCells",
      ],
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    ckfinder: { uploadUrl: ckuploadPath + "/acp/acp/ckeditorUpload" },
    fontColor: { colors: websiteColors, columns: 4, colorPicker: false },
  })
    .then((editor) => {
      window.editor = editor;
    })
    .catch((err) => {
      console.error(err.stack);
    });
})();
function readURL(input, class_box) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("." + class_box)
        .attr("src", e.target.result)
        .addClass("img-fluid");
    };
    reader.readAsDataURL(input.files[0]);
  }
}
function getLanguageFromUrl(url) {
  const parts = url.split("/");
  if (parts.length >= 2) {
    const languageCode = parts[3];
    return languageCode || "en";
  }
  return "en";
}
const websiteColorsforTiny = [
  color11,
  color22,
  color33,
  color44,
  color55,
  color66,
  color77,
  color88,
];
tinymce.init({
  selector: "#About_Detail_en",
  language: "en",
  plugins: [
    "accordion",
    "autosave",
    "code",
    "directionality",
    "insertdatetime",
    "pagebreak",
    "quickbars",
    "searchreplace",
    "a11ychecker",
    "visualchars",
    "save",
    "nonbreaking",
    "lists advlist",
    "importcss",
    "emoticons",
    "codesample",
    "charmap",
    "anchor",
    "advlist",
    "advcode",
    "advtable",
    "autolink",
    "checklist",
    "markdown",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "powerpaste",
    "fullscreen",
    "formatpainter",
    "insertdatetime",
    "media",
    "table",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | formatpainter casechange blocks | bold italic backcolor | " +
    "alignleft aligncenter alignright alignjustify | " +
    "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help" +
    "forecolor backcolor",
  images_upload_url: ckuploadPath + "/acp/acp/tinyeditorUpload",
  color_map: websiteColorsforTiny.flatMap((color) => [color, color]),
  file_picker_callback: function (callback, value, meta) {},
  color_picker_callback: function (callback, value) {},
});
tinymce.init({
  selector: "#About_Detail_ar",
  language: "ar",
  directionality: "rtl",
  plugins: [
    "accordion",
    "autosave",
    "code",
    "directionality",
    "insertdatetime",
    "pagebreak",
    "quickbars",
    "searchreplace",
    "a11ychecker",
    "visualchars",
    "save",
    "nonbreaking",
    "lists advlist",
    "importcss",
    "emoticons",
    "codesample",
    "charmap",
    "anchor",
    "advlist",
    "advcode",
    "advtable",
    "autolink",
    "checklist",
    "markdown",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "powerpaste",
    "fullscreen",
    "formatpainter",
    "insertdatetime",
    "media",
    "table",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | formatpainter casechange blocks | bold italic backcolor | " +
    "alignleft aligncenter alignright alignjustify | " +
    "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help" +
    "forecolor backcolor",
  images_upload_url: ckuploadPath + "/acp/acp/tinyeditorUpload",
  color_map: websiteColorsforTiny.flatMap((color) => [color, color]),
  color_picker_callback: function (callback, value) {},
});

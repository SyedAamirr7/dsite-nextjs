/**
 * CKEditor 5 - uses CDN Classic build (window.ClassicEditor).
 * Load classic/ckeditor.js script before this file.
 */
(function () {
  const htmlDir = document.querySelector("html").dir;
  const language = htmlDir === "rtl" ? "ar" : "en";

  const editorConfig = {
    toolbar: {
      items: [
        "undo", "redo", "|",
        "heading", "|",
        "bold", "italic",
        "bulletedList", "numberedList", "|",
        "link", "blockQuote", "insertTable", "mediaEmbed"
      ],
      shouldNotGroupWhenFull: true
    },
    heading: {
      options: [
        { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
        { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
        { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
        { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
        { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
        { model: "heading5", view: "h5", title: "Heading 5", class: "ck-heading_heading5" },
        { model: "heading6", view: "h6", title: "Heading 6", class: "ck-heading_heading6" }
      ]
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://"
    },
    language: { ui: "en", content: language },
    placeholder: ""
  };

  function initEditors() {
    if (typeof window.ClassicEditor === "undefined") {
      setTimeout(initEditors, 100);
      return;
    }
    const editorEn = document.querySelector("#editor-en");
    const editorAr = document.querySelector("#editor-ar");
    if (editorEn) {
      window.ClassicEditor.create(editorEn, { ...editorConfig, language: { ui: "en", content: "en" } })
        .then(function (editor) { window.__aboutEditorEn = editor; })
        .catch(function (err) { console.error(err.stack); });
    }
    if (editorAr) {
      window.ClassicEditor.create(editorAr, { ...editorConfig, language: { ui: "en", content: "ar" } })
        .then(function (editor) { window.__aboutEditorAr = editor; })
        .catch(function (err) { console.error(err.stack); });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEditors);
  } else {
    initEditors();
  }
})();

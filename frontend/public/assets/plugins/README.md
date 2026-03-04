# Plugins (public assets)

This folder holds editor and utility plugins used by the app. Paths are centralized in **`src/config/plugins.ts`**.

## Structure

| Folder | Purpose |
|--------|---------|
| `ckeditor5/` | CKEditor 5 – main script: `ckeditor.js` (used by About and rich-text pages) |
| `tinymce_7.1.2/` | TinyMCE 7.1.2 – path: `tinymce/js/tinymce/tinymce.min.js` |
| `ckfinder_php_3.7.0/ckfinder/` | CKFinder – file manager, e.g. for CKEditor uploads |

## Config

- **Config file:** `src/config/plugins.ts`
- **CKEditor 5:** Import map and script URL point to `ckeditor5/ckeditor.js`.
- **TinyMCE:** Use `pluginsConfig.tinymce.script` when loading TinyMCE on a page.
- **CKFinder:** Use `pluginsConfig.ckfinder.script` when integrating file picker.

Do not change plugin folder names without updating `src/config/plugins.ts`.

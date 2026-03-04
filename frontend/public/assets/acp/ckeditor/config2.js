/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */



var style_set = CKEDITOR.stylesSet.add( 'my_styles2', [
    // Block-level styles.
    { name: 'Heading 1', element: 'h1'},
    { name: 'Heading 2', element: 'h2'},
    { name: 'Heading 3', element: 'h3'},
    { name: 'Heading 4', element: 'h4'},
    { name: 'Heading 5', element: 'h5'},
    { name: 'Heading 6', element: 'h6'},
    { name: 'Paragraph p', element: 'p'},
]);



CKEDITOR.editorConfig = function( config2 ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

	// For inline style definition.
config2.stylesSet = 'my_styles2';

// For a definition in an external file.
config2.stylesSet = style_set;

};



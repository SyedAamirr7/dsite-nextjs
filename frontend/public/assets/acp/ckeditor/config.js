/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */



var style_sets = CKEDITOR.stylesSet.add( 'my_styles', [
    // Block-level styles.
    { name: 'Heading 1', element: 'h1'},
    { name: 'Heading 2', element: 'h2'},
    { name: 'Heading 3', element: 'h3'},
    { name: 'Heading 4', element: 'h4'},
    { name: 'Heading 5', element: 'h5'},
    { name: 'Heading 6', element: 'h6'},
    { name: 'Paragraph p', element: 'p'},
]);



CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

	// For inline style definition.
config.stylesSet = 'my_styles';

// For a definition in an external file.
config.stylesSet = style_sets;
config.colorButton_colors = '800000,fff,41464b,ffff';

};



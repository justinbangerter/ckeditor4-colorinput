# Color Input for CKEditor 4

This is a new color input element that can be defined in the dialog definition.

*  Use getValue, setValue, setup, commit, just like you would with a text input.
*  Three layouts: expanded, compact, or minimal.
*  All layouts use and depend on the color dialog plugin.
*  Extract to your plugins directory and add the 'colorinput' plugin.
*  Add type: "color" elements to your dialogs. Example:

    CKEDITOR.dialog.add('colorinputdialog', function(editor) {
        return {
            title: 'Color Input View',
            contents: [{
                id: 'info',
                label: 'Info',
                elements: [{
                    id: 'color',
                    type: 'color',
                    'default': 'red', //optional
                    layout: 'expanded', // optional: 'expanded' (default), 'compact', or 'minimal'
                    label: 'Background Color'
                }]
            }]
        }
    });
# Color Input for CKEditor 4

This is a new color input element that can be defined in the dialog definition.

*  Launches the color selection dialog from the colordialog plugin
*  Use getValue, setValue, setup, commit, just like you would with a text input.
*  Three layouts: expanded, compact, or minimal.
*  All layouts use and depend on the color dialog plugin.
*  Extract to your plugins directory and add the 'colorinput' plugin.
*  Add type: "color" elements to your dialogs. Example:

```javascript
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
```

## API Documentation

### Package / Class

* CKEDITOR.dialog.definition.color
* CKEDITOR.ui.dialog.color

### Hierarchy

- [uiElement](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_dialog_definition_uiElement.html)
  - [labeledElement](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_dialog_definition_labeledElement.html)

### Properties

* id (String): ID of the ui element (needed for CKEditor to call setup/commit)
* setup (function): Executes whenever parent dialog's setupContent method is called. Receives arguments passed to setupContent.
* commit (function): Executes whenever parent dialog's commitContent method is called. Receives arguments passed to setupContent.
* default (String): Optional. When the parent dialog is loaded, this element will be set with this String.
* type (String): Required. Must be 'color'
* layout (String): Optional. 'expanded' (the default value), 'compact', 'minimal'
* label (String): Human readable label used for this input.

Other properties from inherited classes may work, but have not been thoroughly tested.

### Methods

* getValue(): returns the contents of the text input
* setValue(String): sets the contents of the text input

## Testing and Contributing

* Clone this repository
* Clone CKEditor 4 into this repository
* run ln -s ckeditor/plugins/colorinput colorinput
* Setup a [CKEditor testing environment](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_tests.html)
* When Bender is running, go to localhost:1030 and search for colorinput
* Remove the "is:unit" tag to see manual tests
* Tests go into the colorinput/tests folder
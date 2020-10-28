CKEDITOR.plugins.add( 'colorinput', {
    requires: 'dialog,colordialog',
    lang: 'en',
    init: function(editor) {
        var lang = editor.lang.colorinput;
        CKEDITOR.dialog.addUIElement('color', {
            build: function(dialog, elementDefinition, htmlList) {
                function colorinput(dialog, elementDefinition, htmlList) {
                    this._ = {
                        domId : CKEDITOR.tools.getNextId() + '_colorInput',
                        textId : CKEDITOR.tools.getNextId() + '_colorTxt',
                        chooseId : CKEDITOR.tools.getNextId() + '_colorChoose',
                        previewId : CKEDITOR.tools.getNextId() + '_colorPreview'
                    };

                    if ( elementDefinition.validate )
                        this.validate = elementDefinition.validate;

                    this.layout = elementDefinition.layout || 'expanded';

                    if ( this.layout == 'expanded' || this.layout == 'compact' ) {
                        dialog.on('load', function() {
                            if ( this._['default'] ) {
                                this.textField().setValue(this._['default']);
                                this.previewField().$ && this.previewField().setStyle('background-color', this._['default']);
                            }
                            this.textField().on('input', function() {
                                this.previewField().$ && this.previewField().setStyle('background-color', this.textField().getValue());
                            }, this);
                            this.initClick(this.chooseField());
                        }, this);
                    }
                    else if ( this.layout == 'minimal' ) {
                        dialog.on('load', function() {
                            if ( this._['default'] ) {
                                this.textField().setValue(this._['default']);
                            }
                            this.initClick(this.textField());
                        }, this);
                    }
                    else {
                        throw 'Unknown color input layout: ' + this.layout;
                    }

                    var innerHTML = function() {
                        function wrapperDiv() {
                            var html = [];
                            html.push('<div id="' + this._.domId + '" class="cke_dialog_ui_input_text" role="presentation">');
                            for ( var i = 0; i < arguments.length; i++ )
                                html.push(arguments[i]);
                            html.push('</div>');
                            return html.join('');
                        }
                        wrapperDiv = wrapperDiv.bind(this);

                        function textInput() {
                            var attributes = {
                                'class': 'cke_dialog_ui_input_text',
                                style: 'width:100px;margin-right:8px;',
                                id: this._.textId,
                                type: 'text'
                            };
                            attributes[ 'aria-labelledby' ] = this._.labelId;
                            this._.required && ( attributes[ 'aria-required' ] = this._.required );

                            var html = [];
                            html.push('<input ' );
                            for ( var i in attributes )
                                html.push( i + '="' + attributes[ i ] + '" ' );
                            html.push(' />');
                            return html.join('');
                        }
                        textInput = textInput.bind(this);

                        function button(innerHtml) {
                            return [
                                '<a id="'+this._.chooseId+'" href="javascript:void(0)" title="button" hidefocus="true" class="cke_dialog_ui_button" role="button" aria-labelledby="'+this._.labelid+'">',
                                innerHtml,
                                '</a>'
                            ].join('');
                        }
                        button = button.bind(this);

                        function buttonText() {
                            return '<span class="cke_dialog_ui_button">'+lang.chooseColor+'</span>'
                        }
                        buttonText = buttonText.bind(this);

                        function preview() {
                            return '<div id="'+this._.previewId+'" style="margin:3px;display:inline-block;width:16px;height:16px;border:solid 1px black;margin:auto 8px;">&nbsp;</div>';
                        }
                        preview = preview.bind(this);

                        if ( this.layout == 'expanded' ) {
                            return wrapperDiv(
                                textInput(),
                                button(
                                    buttonText()
                                ),
                                preview()
                            );
                        }
                        else if ( this.layout == 'compact' ) {
                            return wrapperDiv(
                                textInput(),
                                button(
                                    preview()
                                )
                            );
                        }
                        else if ( this.layout == 'minimal' ) {
                            return wrapperDiv(
                                textInput()
                            );
                        }
                        else {
                            throw 'Unhandled layout: ' + this.layout;
                        }
                    };
                    CKEDITOR.ui.dialog.labeledElement.call( this, dialog, elementDefinition, htmlList, innerHTML );
                };
                colorinput.prototype = CKEDITOR.tools.extend( new CKEDITOR.ui.dialog.labeledElement(), {
                    getEl: function(id) { return new CKEDITOR.dom.element(document.getElementById(id)); },
                    textField: function() { return this.getEl(this._.textId); },
                    chooseField: function() { return this.getEl(this._.chooseId); },
                    previewField: function() { return this.getEl(this._.previewId); },
                    domField: function() { return this.getEl(this._.domId); }
                });
                colorinput.prototype.initClick = function(field) {
                    field.on('click', function() {
                        editor.getColorFromDialog(function(color) {
                            if ( color != null )
                                this.textField().setValue(color).fire('input');
                        }, this, {
                            selectionColor: this.getValue()
                        });
                    }, this);
                };
                colorinput.prototype.getValue = function() {return this.textField().getValue(); };
                colorinput.prototype.setValue = function(v) {
                    this.textField().setValue(v).fire('input');
                    return this;
                };
                return new colorinput(dialog, elementDefinition, htmlList);
            }
        });
    }
});

define(['middleware', 'jquery', 'jquery.ui'], function(middleware, $) {

/* Example:

dialog.setTitle('Howdy!')
      .setMessage('Just wanted to stop in and say hello.')
      .setButtons(['confirm', 'decline'])
      .show();

*/
    var dialog = (function(){

        var title = middleware.Common_Variables.errorModalTitle,
            message = middleware.Common_Variables.errorGeneralMsg,
            modalWidth = '70%',
            buttonsAll =  {
                confirm: {
                    text: 'OK',
                    class: 'button-orange',
                    className: 'button--orange',
                    click: function(){ confirmCallback(); }
                },
                decline: {
                    text: "No",
                    class: 'button--red',
                    className: 'button-red',
                    click: function(){ declineCallback(); }
                },
                cancel: {
                    text: 'Cancel',
                    class: 'button--grey',
                    className: 'button-grey',
                    click: function(){ cancelCallback(); }
                }
            },
            buttons = [],
            elementID = 'dialogModal',
            element = {},
            getElement = function(){
                if (! $('#' + elementID).length ) {
                    $('body').append("<div id='" + elementID + "' class='modal'></div>");
                    element = $('#' + elementID);
                }
                element = $('#' + elementID);
                element.html(message);
                return element;
            },
            confirmCallback = function(){
                getElement().dialog('destroy');
                console.log('confirm dialog');
            },
            cancelCallback = function(){
                getElement().dialog('destroy');
                console.log('cancel dialog');
            },
            declineCallback = function(){
                getElement().dialog('destroy');
                console.log('decline dialog');
            },
            openCallback = function() {
                console.log('dialog opened');
            },
            closeCallback = function() {
                getElement().dialog('destroy');
                console.log('dialog closed');
            }
        ;

        // set default buttons
        buttons.push(buttonsAll.confirm);

        return {
            show: function(){

                getElement().dialog({

                    // customizable options with `set` functions
                    title: title,
                    // message: message,
                    buttons: buttons,
                    width: modalWidth,
                    open: openCallback,
                    close: closeCallback,

                    // hard coded defaults
                    modal: true,
                    closeOnEscape: false,
                    draggable: false
                });
            },
            close: function(){ getElement().dialog('close'); },
            setTitle: function(_title){
                title = _title;
                return this;
            },
            setMessage: function(_message){
                message = _message;
                return this;
            },
            setConfirmCallback: function(_callback){
                confirmCallback = _callback;
                return this;
            },
            setCancelCallback: function(_callback){
                cancelCallback = _callback;
                return this;
            },
            setButtons: function(_array){
                buttons = [];
                // if array of strings, set buttons based on name
                for(var i=0, len=_array.length; i < len; i++) {
                    buttons.push(buttonsAll[_array[i]]);
                }
                // if array of objects use as buttons ** NOT IMPLEMENTED
                return this;
            }
        };
    }());
    middleware.dialog = dialog;
    return dialog;
});

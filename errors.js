// Errors model

define(['middleware'], function(middleware){

    var number=0;

    var error = function(){
        return {
            number: ++number,
            code: '',
            message: ''
        }
    }

    var errorCollection = [];

    var add = function(data){
        var _error = new error()
        _error.code = data.code;
        _error.message = data.message;
        errorCollection.push(_error);
    }

    var clear = function() {
        errorCollection = [];
        return errorCollection;
    }

    var get = function(format){
        if(format == 'html') {
            var error_messages = "";
            for (var i = 0, len = errorCollection.length; i < len; ++i){
              error_messages += "<p>" + errorCollection[i].message + "<strong>" + errorCollection[i].code + "</strong></p>";
            }
            return error_messages;
        } else {
            return errorCollection;
        }
    }

    // initialize
    if(middleware.errors.length) {
        var _errors = middleware.errors;

        // we massage each error string (as received from the backend via the `middleware`) into an object
        for (var i = 0, len = _errors.length; i < len; ++i){

            // this regex matches the message text in brackets (the `error code`)
            try {
                var _code = _errors[i].match(/\[.*\]/)[0];
            } catch(e) {
                var _code = null;
            }

            // this regex matches the beginning of the message, to the first bracket, then defines the bracket
            // as a non-capturing group, so we just have the message itself
            try {
                var _message = _errors[i].match(/(^.*)(?:\[)/)[1]
            } catch(e) {
                var _message = null;
            }

            /* TEMP fix for QA */
            if (_message === null) {
                _message = "(WARNING: NO ERROR CODE) " + _errors[i];
            }

            if (_code === null) {
                _code = " [NO ERROR CODE]"
            }

            console.log(nike.ocp.errors);
            /* End TEMP fix for QA */

            // If code or message is null, get the heck out.
            if (_code !== null && _message !== null) {
                // then let's clean up the repeated single apostrophes we get from the backend
                _message = _message.replace("''", "'");

                // now create the error objects and add them to the errors collection
                add({code: _code, message: _message });

                // clean up the global middle-ware object
                delete middleware.errors;
            }
        }
    }
    // console.log(get('html'));
    return {
        add: add,
        get: get,
        clear: clear
    }
});


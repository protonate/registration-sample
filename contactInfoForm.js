define(['middleware', 'jquery'], function(middleware, $){

    // DATA
    var context = nike.ocp.context;

    // UI Elements
    var $contactInfoContainer = $('#contactInfoContainer');

    // Listeners
    $contactInfoContainer.on('paymentOptions:load', paymentOptionsChanged);
    $contactInfoContainer.on('paymentOptions:change', paymentOptionsChanged);

    // Handlers
    function optionChanged(event) {
        if(     context === 'context1' 
                || event.message === 'paytype1' 
                || event.message === 'paytype2' 
                || event.message === 'paytype3' 
                || (event.message === 'paytype4' && middleware.currentPage !== 'page1')) {
            $contactInfoContainer.show();
        } else {
            $contactInfoContainer.hide();
        }
    }

    /*

    REDACTED 

    function someRedactedFunction () {
        // do privileged stuff
        return publicData;
    }

    */

    (function init(){
        $contactInfoContainer.hide();
    }());

    return {
        'someRedactedFunction': someRedactedFunction
    };

});
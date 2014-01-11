define(['middleware','jquery', 'validation'], function(middleware, $, validation) {

    // DATA (Model)
    var
        shippingAddress = middleware.order.shippingAddress,
        context         = middleware.features.storedPayment.context
    ;

    // FORM ELEMENTS (Model)
    var
        $formContainer      = $('#addressFormContainer'),
        $addressForm        = $('#addressForm'),
        $firstName          = $('#firstName'),
        $lastName           = $('#lastName'),
        $altFirstName       = $('#altFirstName'),
        $altLastName        = $('#altLastName'),
        $address1           = $('#address1'),
        $address2           = $('#address2'),
        $address3           = $('#address3'),
        $city               = $('#city'),
        $state              = $('#state'),
        $postalCode         = $('#postalCode'),
        $country            = $('#country'),
        $creditCardCountry  = $('#creditCardCountry'),
        $phoneNumber        = $('#phoneNumber'),
        $faxNumber          = $('#faxNumber'),
        $email              = $('#email')
    ;

    // UI ELEMENTS (View)
    var
        $formTitle              = $('#billingAddressTitle'),
        $sameAddressCheckbox    = $('#sameAddressCheckbox'),
        $sameAddressContainer   = $('#sameAddressContainer')
    ;

    // LISTENERS (Controller)
    $formContainer.on('options:load', optionsChanged);
    $formContainer.on('options:change', optionsChanged);
    $sameAddressCheckbox.on('change', sameAddressClick);

    // HANDLERS (Controller)
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

    function sameAddressClick(event) {
        if($(event.target).attr('checked') == 'checked'){
            $addressForm.hide();
            $sameAddressContainer.show();
            $firstName.val(shippingAddress.firstName);
            $lastName.val(shippingAddress.lastName);
            $altFirstName.val(shippingAddress.altFirstName);
            $altLastName.val(shippingAddress.altLastName);
            $address1.val(shippingAddress.address1);
            $address2.val(shippingAddress.address2);
            $address3.val(shippingAddress.address3);
            $city.val(shippingAddress.city);
            $state.val(shippingAddress.state);
            $postalCode.val(shippingAddress.postalCode);
            $creditCardCountry.val(shippingAddress.country);
            $country.val(shippingAddress.country);
            $phoneNumber.val(shippingAddress.phoneNumber);
            $faxNumber.val(shippingAddress.faxNumber);
            $email.val(shippingAddress.email);

        } else {
            $addressForm.show();
            $sameAddressContainer.hide();
            // restore values to current stored card, if any
        }
    }

    // REDACTED

    (function init() {
        $formContainer.show();
        $addressForm.show();
        $sameAddressContainer.hide();
    }());


    return {
        'someRedactedFunction': someRedactedFunction
    };

});

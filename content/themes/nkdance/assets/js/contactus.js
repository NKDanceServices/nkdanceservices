/**
 * Contact Us JS
 * @desc Submits contact us form and sends email to admin
 */

var nk = nk || {};

/**
 * @class ContactUs
 */
nk.ContactUs = function($) {

    var errors = [
        {"id":"name", "empty": false, "valid": true},
        {"id":"email", "empty": false, "valid": true},
        {"id":"phone", "empty": false, "valid": true},
        {"id":"message", "empty": false, "valid": true},
        {"id":"captcha", "empty": false, "valid": true}
    ],
    borderClass = "errorBorder",
    empty = ".empty.",
    valid = ".valid.",
    input = "input#",
    url = window.location['origin'] + "/ghost/api/v0.1/custom/submit",
    subject = "NK Dance Services Contact ";

	function isNumber (number) {
        var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return regex.test(number);
    }

    function isEmail (email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function validateInput(msg) {
        return (_.isEmpty(msg) || _.isUndefined(msg) || _.isNull(msg));
    }

    function defineFormErrors(formArray) {
        var name = formArray[0],
            email = formArray[1],
            phone = formArray[2],
            message = formArray[3],
            captcha = formArray[4];

        if(validateInput(name.value)) {
            errors[0]["empty"] = true;
        }

        if(validateInput(email.value)) {
            errors[1]["empty"] = true;
        }

        if(!isEmail(email.value)) {
            errors[1]["valid"] = false;
        }

        if(validateInput(phone.value)) {
            errors[2]["empty"] = true;
        }

        if(!isNumber(phone.value)) {
            errors[2]["valid"] = false;
        }

        if(validateInput(message.value)) {
            errors[3]["empty"] = true;
        }

        if(validateInput(captcha.value)) {
            errors[4]["empty"] = true;
        }

        return errors;
    }

	return {
        validateForm: function(formArray) {
            var errorArray = defineFormErrors(formArray),
                errorCheck = [];

            _.each(errorArray, function(value, idx){
                if(value.empty){
                    $(empty+value.id).show();
                    $(input+value.id).css("border-color","red");
                    errorCheck.push(value.id);
                } else {
                    $(input+value.id).css("border-color","inherit");
                    $(empty+value.id).hide();
                }

                if(!value.empty && !value.valid) {
                    $(valid+value.id).show();
                    $(input+value.id).css("border-color","red");
                    errorCheck.push(value.id);
                } else {
                    $(input+value.id).css("border-color","inherit");
                    $(valid+value.id).hide();
                }
            });

            return (errorCheck.length > 0) ? false : true;
        },

        submitForm: function(formArray, event) {
            var data = {
                from: formArray[1].value,
                subject: subject + formArray[0].value,
                html: formArray[0].value+"<br/>"+formArray[1].value+"<br/>"+formArray[2].value+"<br/>"+formArray[3].value,
            };

            $.ajax({
                method: "POST",
                url: url,
                data: data
            }).done(function(response) {
                $(".alert.alert-success").removeClass('hidden');
                $(event.target)[0].reset();
                grecaptcha.reset();
            });
        }
	}
};

(function($){
    $('#contactus').submit(function(event) {
        event.preventDefault();

        var formArray = $(event.target).serializeArray(),
            contactForm = new nk.ContactUs($);

        if(contactForm.validateForm(formArray)){
            contactForm.submitForm(formArray, event);
        }
    });
})(jQuery);
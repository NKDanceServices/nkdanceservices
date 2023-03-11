/**
 * Custom mail send
 */

var Promise		= require('bluebird'),
    Mailgun 	= require('mailgun-js'),
    https		= require('https'),
    config 		= require('../config/mail_config');

/**
 * @desc get mailgun client token
 * @function
 * @private
 */
 function getClientAPIKey(){
 	return (process.env.Mailgun_APIKey) ? process.env.Mailgun_APIKey : config.mail.apikey;
 }

/**
 * @desc get mailgun client domain
 * @function
 * @private
 */
 function getClientDomain(){
 	return (process.env.Mailgun_Domain) ? process.env.Mailgun_Domain : config.mail.domain;
 }

/**
 * @desc get mailgun client domain
 * @function
 * @private
 */
 function getClientEmail(){
 	return config.mail.clientEmail;
 }

/**
 * @desc prepare email data for sending
 * @public
 * @method
 */
function prepareMail(object) {
	var data;

	data = {
		from: object.from,
		to: getClientEmail(),
		subject: object.subject,
		html: object.html
	}

	return data;
}

// Custom API methods
custom = {

	/**
	 * @desc send email to mailgun
	 * @public
	 * @method
	 */
	submitMail: function(object) {

		var mailgun  = new Mailgun({apiKey: getClientAPIKey(), domain: getClientDomain()}),
			deferred = Promise.pending(),
			self	 = this;

		mailgun.messages().send(prepareMail(object), function (err, body) {
        	
	        if (err) {
	            deferred.reject(err);
	        }
	        else {
	            deferred.resolve(body);
	        }
    	});

		return deferred.promise;
	}
};

module.exports = custom;
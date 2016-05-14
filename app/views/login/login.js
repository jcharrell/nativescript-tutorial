var frameModule = require('ui/frame');
var viewModule = require('ui/core/view');
var email;

exports.loaded = function(args) {
	var page = args.object;
	email = viewModule.getViewById(page, 'email');
};

exports.signIn = function() {
	console.log(email.text);
};

exports.register = function() {
	var topmost = frameModule.topmost();
	topmost.navigate('views/register/register');
};
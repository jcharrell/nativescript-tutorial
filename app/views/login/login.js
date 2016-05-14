var frameModule = require('ui/frame');

exports.signIn = function() {
	alert('Signing In');
};

exports.register = function() {
	var topmost = frameModule.topmost();
	topmost.navigate('views/register/register');
};
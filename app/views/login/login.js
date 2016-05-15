var frameModule = require('ui/frame');
var Observable = require('data/observable').Observable;

var user = new Observable({
	email: "user@domain.com",
	password: "password"
});

exports.loaded = function(args) {
	var page = args.object;
	page.bindingContext = user;
};

exports.signIn = function() {
	console.log(user.email);
};

exports.register = function() {
	var topmost = frameModule.topmost();
	topmost.navigate('views/register/register');
};
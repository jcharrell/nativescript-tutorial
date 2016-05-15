var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModule = require("ui/core/view");
var page;

var pageData = new Observable({
    groceryList: new ObservableArray([
        { name: "eggs" },
        { name: "bread" },
        { name: "cereal" }
    ])
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
};
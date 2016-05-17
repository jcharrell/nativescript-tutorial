var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModule = require("ui/core/view");
var page;

var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
var groceryList = new GroceryListViewModel([]);
var pageData = new Observable({
    grocery: "",
    groceryList: groceryList
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    groceryList.empty();
    groceryList.load();
};

exports.add = function() {
    // Check for empty submissions
    if(pageData.get("grocery").trim() === "") {
        dialogsModule.alert({
            message: "Enter a grocery item",
            okButtonText: "OK"
        });
        return;
    }

    // Dismiss the keyboard
    page.getViewById("grocery").dismissSoftInput();
    groceryList.add(pageData.get("grocery"))
        .catch(function() {
            dialogsModule.alert({
                message: "An error occured while adding an item to your list",
                okButtonText: "OK"
            });
        });

    // Empty the input field
    pageData.set("grocery", "");
};
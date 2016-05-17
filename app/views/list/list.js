var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var socialShare = require("nativescript-social-share");
var page;

var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
var groceryList = new GroceryListViewModel([]);
var pageData = new Observable({
    isLoading: false,
    grocery: "",
    groceryList: groceryList
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    var listView = page.getViewById("groceryList");

    groceryList.empty();

    pageData.set("isLoading", true);
    groceryList.load().then(function() {
        pageData.set("isLoading", false);
        listView.animate({
            opacity: 1,
            duration: 1000
        })
    });
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

exports.delete = function(args) {
    var item = args.view.bindingContext;
    var index = groceryList.indexOf(item);
    groceryList.delete(index);
};

exports.share = function() {
    var list = [];
    for (var i = 0; i < groceryList.length; i++) {
        list.push(groceryList.getItem(i).name);
    }
    var listString = list.join(", ").trim();
    socialShare.shareText(listString);
}
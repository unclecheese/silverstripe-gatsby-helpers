"use strict";
exports.__esModule = true;
var isSiteTree_1 = require("./isSiteTree");
var useHierarchy_1 = require("./useHierarchy");
var nav;
var useNavigation = function () {
    if (nav) {
        return nav;
    }
    nav = useHierarchy_1["default"]().filter(function (n) { return isSiteTree_1["default"](n) && n.SilverStripeSiteTree.showInMenus; });
    return nav;
};
exports["default"] = useNavigation;

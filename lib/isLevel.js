"use strict";
exports.__esModule = true;
var useHierarchy_1 = require("./useHierarchy");
var findParent_1 = require("./findParent");
var isLevel = function (currentPage, level) {
    if (level === void 0) { level = 1; }
    var parent = currentPage;
    if (!parent) {
        return false;
    }
    var hierarchy = useHierarchy_1["default"]();
    var stack = [];
    stack.push(parent);
    while ((parent = hierarchy.find(findParent_1["default"](parent)))
        && parent.silverstripe_id) {
        stack.unshift(parent);
    }
    return typeof stack[level - 1] !== 'undefined';
};
exports["default"] = isLevel;

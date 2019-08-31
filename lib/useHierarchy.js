"use strict";
exports.__esModule = true;
// @ts-ignore
var useHierarchy_1 = require("../queries/useHierarchy");
var hierarchy;
var useHierarchy = function () {
    if (hierarchy) {
        return hierarchy;
    }
    var result = useHierarchy_1["default"]();
    hierarchy = result.allSilverStripeDataObject.nodes;
    return hierarchy;
};
exports["default"] = useHierarchy;

"use strict";
exports.__esModule = true;
// @ts-ignore
var hierarchy_1 = require("../queries/hierarchy");
var gatsby_1 = require("gatsby");
var hierarchy;
var useHierarchy = function () {
    if (hierarchy) {
        return hierarchy;
    }
    var result = gatsby_1.useStaticQuery(hierarchy_1["default"]);
    hierarchy = result.allSilverStripeDataObject.nodes;
    return hierarchy;
};
exports["default"] = useHierarchy;

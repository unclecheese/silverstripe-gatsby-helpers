"use strict";
exports.__esModule = true;
var useHierarchy_1 = require("./useHierarchy");
var path;
var currentNode;
var useCurrentNode = function () {
    // Lame. @react/router doesn't provide hooks yet.
    var browserPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (!path || path !== browserPath) {
        var nodes = useHierarchy_1["default"]();
        path = browserPath;
        currentNode = nodes.find(function (node) { return node.link === path; });
    }
    return currentNode || null;
};
exports["default"] = useCurrentNode;

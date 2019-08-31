"use strict";
exports.__esModule = true;
var isFile = function (node) { return node.ancestry.includes('SilverStripe\\Assets\\File'); };
exports["default"] = isFile;

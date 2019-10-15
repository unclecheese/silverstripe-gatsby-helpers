exports.__esModule = true;
var findParent = function (node) { return function (n) { return n.uuid === node.parentUUID; }; };
exports["default"] = findParent;

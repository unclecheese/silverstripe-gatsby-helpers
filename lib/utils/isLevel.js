var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var useHierarchy_1 = __importDefault(require("../hooks/useHierarchy"));
var findParent_1 = __importDefault(require("./findParent"));
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

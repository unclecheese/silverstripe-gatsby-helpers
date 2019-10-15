var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var useHierarchy_1 = __importDefault(require("./useHierarchy"));
var nodeCache = new Map();
var useCurrentNode = function () {
    var browserPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (!nodeCache.has(browserPath)) {
        var nodes = useHierarchy_1["default"]();
        var currentNode = nodes.find(function (node) { return node.link === browserPath; }) || null;
        nodeCache.set(browserPath, currentNode);
    }
    return nodeCache.get(browserPath);
};
exports["default"] = useCurrentNode;

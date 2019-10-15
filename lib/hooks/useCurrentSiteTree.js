var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var useHierarchy_1 = __importDefault(require("./useHierarchy"));
var isSiteTree_1 = __importDefault(require("../utils/isSiteTree"));
var useCurrentNode_1 = __importDefault(require("./useCurrentNode"));
var findParent_1 = __importDefault(require("../utils/findParent"));
var currentSiteTree;
var useCurrentSiteTree = function () {
    if (currentSiteTree) {
        return currentSiteTree;
    }
    var currentNode = useCurrentNode_1["default"]();
    var hierarchy = useHierarchy_1["default"]();
    if (currentNode && currentNode.parentUUID === null) {
        return null;
    }
    var finder = function (linkable) { return function (n) { return n.uuid === linkable.uuid; }; };
    if (currentNode) {
        var page = hierarchy.find(finder(currentNode)) || null;
        while (page && !isSiteTree_1["default"](page)) {
            var parentLinkable = hierarchy.find(findParent_1["default"]);
            page = parentLinkable ? hierarchy.find(finder(parentLinkable)) || null : null;
        }
        return page;
    }
    return null;
};
exports["default"] = useCurrentSiteTree;

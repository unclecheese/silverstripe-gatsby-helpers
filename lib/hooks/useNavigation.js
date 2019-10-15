var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var isSiteTree_1 = __importDefault(require("../utils/isSiteTree"));
var useHierarchy_1 = __importDefault(require("./useHierarchy"));
var nav;
var useNavigation = function () {
    if (nav) {
        return nav;
    }
    nav = useHierarchy_1["default"]().filter(function (n) { return isSiteTree_1["default"](n) && n.SilverStripeSiteTree.showInMenus; });
    return nav;
};
exports["default"] = useNavigation;

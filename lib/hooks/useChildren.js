var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var useNavigation_1 = __importDefault(require("./useNavigation"));
var useCurrentSiteTree_1 = __importDefault(require("./useCurrentSiteTree"));
var childrenCache = new Map();
var useChildren = function () {
    var nav = useNavigation_1["default"]();
    var currentPage = useCurrentSiteTree_1["default"]();
    if (!currentPage) {
        return [];
    }
    if (!childrenCache.has(currentPage.link)) {
        var navItem = nav.find(function (n) { return n.link === currentPage.link; });
        var children = navItem &&
            navItem.SilverStripeSiteTree &&
            navItem.SilverStripeSiteTree.Children
            ? navItem.SilverStripeSiteTree.Children
            : [];
        childrenCache.set(currentPage.link, children);
    }
    return childrenCache.get(currentPage.link);
};
exports["default"] = useChildren;

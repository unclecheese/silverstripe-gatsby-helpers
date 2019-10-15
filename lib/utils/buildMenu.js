var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var useNavigation_1 = __importDefault(require("../hooks/useNavigation"));
var findParent_1 = __importDefault(require("./findParent"));
var sortFn = function (a, b) { return (a.SilverStripeSiteTree.sort - b.SilverStripeSiteTree.sort); };
var buildMenu = function (currentNode, menuLevel) {
    if (menuLevel === void 0) { menuLevel = 1; }
    var siteTrees = useNavigation_1["default"]();
    if (menuLevel === 1) {
        var s = siteTrees
            .filter(function (_a) {
            var parentUUID = _a.parentUUID, showInMenus = _a.SilverStripeSiteTree.showInMenus;
            return (parentUUID === '__TOP__' && showInMenus);
        })
            .sort(sortFn);
        return s;
    }
    if (!currentNode) {
        throw new Error("Tried to build menu level " + menuLevel + " without a current node passed as a second argument");
    }
    var parent = currentNode;
    var stack = [parent];
    if (parent) {
        while ((parent = siteTrees.find(findParent_1["default"](parent)))
            && parent.silverstripe_id) {
            stack.unshift(parent);
        }
    }
    var childrenOf = stack[menuLevel - 2];
    if (childrenOf) {
        return siteTrees
            .filter(function (n) { return n.parentUUID === childrenOf.uuid; })
            .sort(sortFn);
    }
    return [];
};
exports["default"] = buildMenu;

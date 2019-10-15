var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var useCurrentSiteTree_1 = __importDefault(require("./useCurrentSiteTree"));
var buildMenu_1 = __importDefault(require("../utils/buildMenu"));
var menuCache = new Map();
var useMenu = function (level) {
    if (level === void 0) { level = 1; }
    var currentPage = useCurrentSiteTree_1["default"]();
    if (!currentPage) {
        return [];
    }
    var sku = currentPage.link + "__" + level;
    if (!menuCache.has(sku)) {
        var menu = buildMenu_1["default"](currentPage, level);
        menuCache.set(sku, menu);
    }
    return menuCache.get(sku);
};
exports["default"] = useMenu;

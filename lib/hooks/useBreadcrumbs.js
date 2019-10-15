var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var useCurrentSiteTree_1 = __importDefault(require("./useCurrentSiteTree"));
var buildBreadcrumbs_1 = __importDefault(require("../utils/buildBreadcrumbs"));
var breadcrumbCache = new Map();
var useBreadcrumbs = function (maxDepth, showHidden) {
    if (maxDepth === void 0) { maxDepth = 20; }
    if (showHidden === void 0) { showHidden = false; }
    var currentPage = useCurrentSiteTree_1["default"]();
    if (!currentPage) {
        return [];
    }
    var sku = currentPage.link + "__" + maxDepth + "__" + Number(showHidden);
    if (!breadcrumbCache.has(sku)) {
        var breadcrumbs = buildBreadcrumbs_1["default"](currentPage, maxDepth, showHidden);
        breadcrumbCache.set(sku, breadcrumbs);
    }
    return breadcrumbCache.get(sku);
};
exports["default"] = useBreadcrumbs;

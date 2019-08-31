"use strict";
exports.__esModule = true;
var findParent_1 = require("./findParent");
var useHierarchy_1 = require("./useHierarchy");
var buildBreadcrumbs = function (currentPage, maxDepth, showHidden) {
    if (maxDepth === void 0) { maxDepth = 20; }
    if (showHidden === void 0) { showHidden = false; }
    var hierarchy = useHierarchy_1["default"]();
    if (!currentPage) {
        return [];
    }
    var page = currentPage;
    var pages = [];
    while (page && (!maxDepth || pages.length < maxDepth)) {
        if (showHidden ||
            (page.SilverStripeSiteTree && page.SilverStripeSiteTree.showInMenus) ||
            (page.silverstripe_id === currentPage.silverstripe_id)) {
            pages.push(page);
        }
        page = hierarchy.find(findParent_1["default"](page));
    }
    return pages;
};
exports["default"] = buildBreadcrumbs;
import findParent from './findParent';
import getHierarchy from '../context/getHierarchy';
const buildBreadcrumbs = (currentPage, maxDepth = 20, showHidden = false) => {
    const hierarchy = getHierarchy();
    if (!currentPage) {
        return [];
    }
    let page = currentPage;
    const pages = [];
    while (page && (!maxDepth || pages.length < maxDepth)) {
        if (showHidden ||
            (page.SiteTree && page.SiteTree.showInMenus) ||
            (page.silverstripe_id === currentPage.silverstripe_id)) {
            pages.push(page);
        }
        page = hierarchy.find(findParent(page));
    }
    return pages.reverse();
};
export default buildBreadcrumbs;

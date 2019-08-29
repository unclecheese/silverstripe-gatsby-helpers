import findParent from './findParent';
import useHierarchy from './useHierarchy';

const buildBreadcrumbs = (currentPage, maxDepth = 20, showHidden = false) => {
	const hierarchy = useHierarchy();

	if (!currentPage) {
		return [];
	}
	let page = currentPage;
	const pages = [];
	while (page && (!maxDepth || pages.length < maxDepth)) {
        if (
        	showHidden ||
        	(page.SilverStripeSiteTree && page.SilverStripeSiteTree.showInMenus) ||
        	(page.silverstripe_id === currentPage.silverstripe_id)
        ) {
            pages.push(page);
        }
        page = hierarchy.find(findParent(page));
	}

	return pages;
};

export default buildBreadcrumbs;
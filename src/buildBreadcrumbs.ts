import findParent from './findParent';
import useHierarchy from './useHierarchy';
import { DataObjectNode } from './_types';

const buildBreadcrumbs = (
	currentPage: DataObjectNode,
	maxDepth:number = 20,
	showHidden:boolean = false
): DataObjectNode[] => {
	const hierarchy = useHierarchy();

	if (!currentPage) {
		return [];
	}
	let page: DataObjectNode|undefined = currentPage;
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
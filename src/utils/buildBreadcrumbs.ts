import findParent from './findParent';
import getHierarchy from '../context/getHierarchy';
import { DataObjectNode } from '../_types';

const buildBreadcrumbs = (
	currentPage: DataObjectNode,
	maxDepth:number = 20,
	showHidden:boolean = false
): DataObjectNode[] => {
	const hierarchy = getHierarchy();

	if (!currentPage) {
		return [];
	}
	let page: DataObjectNode|undefined = currentPage;
	const pages = [];
	while (page && (!maxDepth || pages.length < maxDepth)) {
        if (
        	showHidden ||
        	(page.SiteTree && page.SiteTree.showInMenus) ||
        	(page.silverstripe_id === currentPage.silverstripe_id)
        ) {
            pages.push(page);
        }
        page = hierarchy.find(findParent(page));
	}

	return pages.reverse();
};

export default buildBreadcrumbs;
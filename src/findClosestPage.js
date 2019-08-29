import useLinkable from './useLinkable';
import useHierarchy from './useHierarchy';
import isSiteTree from './isSiteTree';
import findParent from './findParent';

const findClosestPage = (currentPage) => {
	const linkable = useLinkable();
	const hierarchy = useHierarchy();

	if (currentPage.parentUUID === null) {
		return null;
	}
	const finder = linkable => n => n.id === linkable.id;
	let page = hierarchy.find(finder(currentPage));
	while (page && !isSiteTree(page)) {
		const parentLinkable = linkable.find(findParent);
		page = hierarchy.find(finder(parentLinkable));
	}

	return page;
};

export default findClosestPage;
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
	let i =0;
	while (page && !isSiteTree(page)) {
		if (i > 10) break;
		console.log(page, page.link);
		const parentLinkable = linkable.find(findParent);
		page = hierarchy.find(finder(parentLinkable));
		i++;
	}

	return page;
};

export default findClosestPage;
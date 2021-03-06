import getHierarchy from './getHierarchy';
import isSiteTree from '../utils/isSiteTree';
import getCurrentNode from './getCurrentNode';
import findParent from '../utils/findParent';
import { BaseNode, DataObjectNode } from '../_types';

let currentSiteTree: DataObjectNode|null;

const getCurrentSiteTree = (): DataObjectNode|null => {
    if (currentSiteTree) {
        return currentSiteTree;
    }
    const currentNode = getCurrentNode();
    const hierarchy = getHierarchy();

	if (currentNode && currentNode.parentUUID === null) {
		return null;
    }
    const finder = (linkable:BaseNode) => (n: BaseNode) => n.uuid === linkable.uuid;
    if (currentNode) {
        let page = hierarchy.find(finder(currentNode)) || null;
        while (page && !isSiteTree(page)) {
            const parentLinkable = hierarchy.find(findParent);
            page = parentLinkable ? hierarchy.find(finder(parentLinkable)) || null : null
        }

        return page;
    }

    return null;
};

export default getCurrentSiteTree;
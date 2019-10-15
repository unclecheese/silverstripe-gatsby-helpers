import useHierarchy from './useHierarchy';
import isSiteTree from '../utils/isSiteTree';
import useCurrentNode from './useCurrentNode';
import findParent from '../utils/findParent';
import { BaseNode, DataObjectNode } from '../_types';

let currentSiteTree: DataObjectNode|null;

const useCurrentSiteTree = (): DataObjectNode|null => {
    if (currentSiteTree) {
        return currentSiteTree;
    }
    const currentNode = useCurrentNode();
    const hierarchy = useHierarchy();

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

export default useCurrentSiteTree;
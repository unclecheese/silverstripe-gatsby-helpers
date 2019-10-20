import getHierarchy from '../context/getHierarchy';
import { DataObjectNode } from '../_types';
import findParent from './findParent';

const findAncestors = (node: DataObjectNode): DataObjectNode[] => {
    const hierarchy = getHierarchy();
    let parent: DataObjectNode|undefined = node;
    const parents = [];    
    parent = hierarchy.find(findParent(parent))
    while (parent) {
        parents.push(parent);
        parent = hierarchy.find(findParent(parent))
    }

    return parents;
};

export default findAncestors;
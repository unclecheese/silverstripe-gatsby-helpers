import getHierarchy from '../context/getHierarchy';
import findParent from './findParent';
const findAncestors = (node) => {
    const hierarchy = getHierarchy();
    let parent = node;
    const parents = [];
    parent = hierarchy.find(findParent(parent));
    while (parent) {
        parents.push(parent);
        parent = hierarchy.find(findParent(parent));
    }
    return parents;
};
export default findAncestors;

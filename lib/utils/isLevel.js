import getHierarchy from '../context/getHierarchy';
import findParent from './findParent';
const isLevel = (currentPage, level = 1) => {
    let parent = currentPage;
    if (!parent) {
        return false;
    }
    const hierarchy = getHierarchy();
    const stack = [];
    stack.push(parent);
    parent = hierarchy.find(findParent(parent));
    while (parent) {
        stack.unshift(parent);
        parent = hierarchy.find(findParent(parent));
    }
    return typeof stack[level - 1] !== 'undefined';
};
export default isLevel;

import getNavigation from '../context/getNavigation';
import findParent from './findParent';
const sortFn = (a, b) => (a.SiteTree.sort - b.SiteTree.sort);
const buildMenu = (currentNode, menuLevel = 1) => {
    const siteTrees = getNavigation();
    if (menuLevel === 1) {
        const s = siteTrees
            .filter(({ parentUUID, SiteTree: { showInMenus } }) => (parentUUID === '__TOP__' && showInMenus))
            .sort(sortFn);
        return s;
    }
    if (!currentNode) {
        throw new Error(`Tried to build menu level ${menuLevel} without a current node passed as a second argument`);
    }
    let parent = currentNode;
    const stack = [parent];
    if (parent) {
        parent = siteTrees.find(findParent(parent));
        while (parent) {
            stack.unshift(parent);
            parent = siteTrees.find(findParent(parent));
        }
    }
    const childrenOf = stack[menuLevel - 2];
    if (childrenOf) {
        return siteTrees
            .filter(n => n.parentUUID === childrenOf.uuid)
            .sort(sortFn);
    }
    return [];
};
export default buildMenu;

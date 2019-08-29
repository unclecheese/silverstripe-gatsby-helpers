import useNavigation from './useNavigation';
import findParent from './findParent';
const sortFn = (a, b) => (
	a.SilverStripeSiteTree.sort - b.SilverStripeSiteTree.sort
);

const buildMenu = (menuLevel = 1, currentNode) => {
	const siteTrees = useNavigation();
    if (menuLevel === 1) {
        return siteTrees
        	.filter(
            	({ parentUUID, SilverStripeSiteTree: { showInMenus }}) => (
            		!parentUUID && showInMenus
            	)
        	)
        	.sort(sortFn)
    }
    if (!currentNode) {
    	throw new Error(`Tried to build menu level ${menuLevel} without a current node passed as a second argument`)
    }
    let parent = currentNode;
    const stack = [parent];
    if (parent) {
        while (
            (parent = siteTrees.find(findParent(parent)))
            && parent.silverstripe_id
        ) {
            stack.unshift(parent);
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
import useNavigation from './useNavigation';
import findParent from './findParent';
import { DataObjectNode } from './_types';
const sortFn = (a: DataObjectNode, b: DataObjectNode): number => (
	a.SilverStripeSiteTree.sort - b.SilverStripeSiteTree.sort
);

const buildMenu = (currentNode: DataObjectNode, menuLevel:number = 1): DataObjectNode[] => {
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
    let parent: DataObjectNode|undefined = currentNode;
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
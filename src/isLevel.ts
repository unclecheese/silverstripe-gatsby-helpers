import useHierarchy from './useHierarchy';
import findParent from './findParent';
import { BaseNode } from './_types';

const isLevel = (currentPage:BaseNode, level:number = 1): boolean => {
	let parent:BaseNode|undefined = currentPage;
	if (!parent) {
		return false;
	}
	const hierarchy = useHierarchy();
	const stack = [];
	stack.push(parent);
    while (
        (parent = hierarchy.find(findParent(parent)))
        && parent.silverstripe_id
    ) {
        stack.unshift(parent);
    }

    return typeof stack[level-1] !== 'undefined';
}

export default isLevel;
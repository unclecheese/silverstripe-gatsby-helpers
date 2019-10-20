import getHierarchy from '../context/getHierarchy';
import findParent from './findParent';
import { BaseNode } from '../_types';

const isLevel = (currentPage:BaseNode, level:number = 1): boolean => {
	let parent:BaseNode|undefined = currentPage;
	if (!parent) {
		return false;
	}
	const hierarchy = getHierarchy();
	const stack = [];
    stack.push(parent);
    parent = hierarchy.find(findParent(parent))
    while (parent) {
		stack.unshift(parent);
		parent = hierarchy.find(findParent(parent));
    }

    return typeof stack[level-1] !== 'undefined';
}

export default isLevel;
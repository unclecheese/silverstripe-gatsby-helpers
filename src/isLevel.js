import useHierarchy from './useHierarchy';
import findParent from './findParent';
const isLevel = (currentPage, level = 1) => {
	let parent = currentPage;
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
import useHierarchy from './useHierarchy';
import { BaseNode } from './_types';

let path: string;
let currentNode: BaseNode | undefined;

const useCurrentNode = (): BaseNode|null => {
	// Lame. @react/router doesn't provide hooks yet.
    const browserPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (!path || path !== browserPath) {
        const nodes = useHierarchy();
        path = browserPath;
        currentNode = nodes.find(node => node.link === path);
    }
    return currentNode || null;
};

export default useCurrentNode;
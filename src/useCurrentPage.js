import useLinkable from './useLinkable';

let path;
let currentNode;

const useCurrentPage = () => {
	// Lame. @react/router doesn't provide hooks yet.
    const browserPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (!path || path !== browserPath) {
        const nodes = useLinkable();
        path = browserPath;
        currentNode = nodes.find(node => node.link === path);
    }
    return currentNode || null;
};

export default useCurrentPage;
import getHierarchy from './getHierarchy';
const nodeCache = new Map();
const getCurrentNode = () => {
    const browserPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (!nodeCache.has(browserPath)) {
        const nodes = getHierarchy();
        const currentNode = nodes.find(node => node.link === browserPath) || null;
        nodeCache.set(browserPath, currentNode);
    }
    return nodeCache.get(browserPath);
};
export default getCurrentNode;

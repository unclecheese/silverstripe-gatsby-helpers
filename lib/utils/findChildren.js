import getNavigation from '../context/getNavigation';
import isSiteTree from './isSiteTree';
const childrenCache = new Map();
const findChildren = (parentNode) => {
    if (!parentNode || !isSiteTree(parentNode)) {
        return [];
    }
    const nav = getNavigation();
    if (!childrenCache.has(parentNode.link)) {
        const children = nav.filter((item) => {
            return item.parentUUID === parentNode.uuid;
        });
        childrenCache.set(parentNode.link, children);
    }
    return childrenCache.get(parentNode.link);
};
export default findChildren;

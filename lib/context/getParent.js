import findParent from '../utils/findParent';
import getCurrentSiteTree from './getCurrentSiteTree';
import getHierarchy from './getHierarchy';
const getParent = () => {
    const page = getCurrentSiteTree();
    if (page) {
        return getHierarchy().find(findParent(page));
    }
    return undefined;
};
export default getParent;

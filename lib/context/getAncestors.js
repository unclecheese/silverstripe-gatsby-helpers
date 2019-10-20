import findAncestors from '../utils/findAncestors';
import getCurrentSiteTree from './getCurrentSiteTree';
const getAncestors = () => {
    const page = getCurrentSiteTree();
    if (page) {
        return findAncestors(page);
    }
    return [];
};
export default getAncestors;

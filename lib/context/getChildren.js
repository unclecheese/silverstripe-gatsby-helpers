import findChildren from '../utils/findChildren';
import getCurrentSiteTree from './getCurrentSiteTree';
const getChildren = () => {
    const page = getCurrentSiteTree();
    if (page) {
        return findChildren(page);
    }
    return [];
};
export default getChildren;

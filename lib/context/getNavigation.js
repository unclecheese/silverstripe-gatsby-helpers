import isSiteTree from '../utils/isSiteTree';
import getHierarchy from './getHierarchy';
let nav;
const getNavigation = () => {
    if (nav) {
        return nav;
    }
    nav = getHierarchy().filter(n => isSiteTree(n) && n.SiteTree.showInMenus);
    return nav;
};
export default getNavigation;

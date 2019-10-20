import isSiteTree from '../utils/isSiteTree';
import { DataObjectNode } from '../_types';
import getHierarchy from './getHierarchy';

let nav: DataObjectNode[];

const getNavigation = () => {
    if(nav) {
        return nav;
    }

    nav = getHierarchy().filter(n => isSiteTree(n) && n.SilverStripeSiteTree.showInMenus);

    return nav;
}

export default getNavigation;
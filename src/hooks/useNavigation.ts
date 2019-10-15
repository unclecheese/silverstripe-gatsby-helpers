import isSiteTree from '../utils/isSiteTree';
import { DataObjectNode } from '../_types';
import useHierarchy from './useHierarchy';

let nav: DataObjectNode[];

const useNavigation = () => {
    if(nav) {
        return nav;
    }

    nav = useHierarchy().filter(n => isSiteTree(n) && n.SilverStripeSiteTree.showInMenus);

    return nav;
}

export default useNavigation;
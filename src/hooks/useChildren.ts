import useNavigation from './useNavigation';
import useCurrentSiteTree from './useCurrentSiteTree';
import { DataObjectNode } from '../_types';

const childrenCache = new Map();

const useChildren = (): DataObjectNode[] => {
    const nav = useNavigation();
    const currentPage = useCurrentSiteTree();
    if (!currentPage) {
        return [];
    }
    if (!childrenCache.has(currentPage.link)) {
        const navItem = nav.find(n => n.link === currentPage.link);
        const children = navItem && 
          navItem.SilverStripeSiteTree &&
          navItem.SilverStripeSiteTree.Children 
          ? navItem.SilverStripeSiteTree.Children
          : [];

        childrenCache.set(currentPage.link, children);
    }
    
    return childrenCache.get(currentPage.link);
};

export default useChildren;
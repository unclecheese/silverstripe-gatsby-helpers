import useCurrentSiteTree from './useCurrentSiteTree';
import buildMenu from './buildMenu';
import { DataObjectNode } from './_types';

const menuCache = new Map();

const useMenu = (level: number = 1): DataObjectNode[] => {
    const currentPage = useCurrentSiteTree();
    
    if (!currentPage) {
        return [];
    }
    const sku = `${currentPage.link}__${level}`;
    if (!menuCache.has(sku)) {
        const menu = buildMenu(currentPage, level);
        console.log('build menu', menu);
        menuCache.set(sku, menu);
    }
    
    return menuCache.get(sku);
};

export default useMenu;
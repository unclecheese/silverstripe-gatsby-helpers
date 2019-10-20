import { DataObjectNode } from '../_types';
import getCurrentSiteTree from './getCurrentSiteTree';
import buildMenu from '../utils/buildMenu';
import getAncestors from './getAncestors';

const menuCache = new Map();
const getMenu = (level: number = 1): DataObjectNode[] => {
    const currentPage = getCurrentSiteTree();
    if (!currentPage) {
        return [];
    }
    const ancestry = getAncestors();

    const sku = `${currentPage.link}__${level}`;
    if (!menuCache.has(sku)) {
        const menu = buildMenu(currentPage, level);
            menuCache.set(sku, menu);
    }
    
    const items = menuCache.get(sku);

    return items.map((item: DataObjectNode) => {
        const isCurrent = currentPage.uuid === item.uuid;
        const isSection = ancestry.map(i => i.uuid).includes(item.uuid);
        return {
            ...item,
            linkingMode: isCurrent ? 'current' : (isSection ? 'section' : 'link'),
            isCurrent,
            isSection,
        }
    });
};

export default getMenu;
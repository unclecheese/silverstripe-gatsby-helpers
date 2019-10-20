import getCurrentSiteTree from './getCurrentSiteTree';
import buildMenu from '../utils/buildMenu';
import getAncestors from './getAncestors';
const menuCache = new Map();
const getMenu = (level = 1) => {
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
    return items.map((item) => {
        const isCurrent = currentPage.uuid === item.uuid;
        const isSection = ancestry.map(i => i.uuid).includes(item.uuid);
        return Object.assign(Object.assign({}, item), { linkingMode: isCurrent ? 'current' : (isSection ? 'section' : 'link'), isCurrent,
            isSection });
    });
};
export default getMenu;

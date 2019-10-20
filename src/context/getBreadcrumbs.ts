import getCurrentSiteTree from './getCurrentSiteTree';
import buildBreadcrumbs from '../utils/buildBreadcrumbs';
import { DataObjectNode } from '../_types';

const breadcrumbCache = new Map();

const getBreadcrumbs = (maxDepth: number = 20, showHidden: boolean = false): DataObjectNode[] => {
    const currentPage = getCurrentSiteTree();
    if (!currentPage) {
        return [];
    }
    const sku = `${currentPage.link}__${maxDepth}__${Number(showHidden)}`;
    if (!breadcrumbCache.has(sku)) {
        const breadcrumbs = buildBreadcrumbs(currentPage, maxDepth, showHidden);
        breadcrumbCache.set(sku, breadcrumbs);
    }

    return breadcrumbCache.get(sku);
};

export default getBreadcrumbs;
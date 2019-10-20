import findChildren from '../utils/findChildren';
import getCurrentSiteTree from './getCurrentSiteTree';
import { DataObjectNode } from '../_types';

const getChildren = (): DataObjectNode[] => {
    const page = getCurrentSiteTree();
    if (page) {
        return findChildren(page);
    }

    return [];
};

export default getChildren;
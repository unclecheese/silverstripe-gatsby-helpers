import findAncestors from '../utils/findAncestors';
import getCurrentSiteTree from './getCurrentSiteTree';
import { DataObjectNode } from '../_types';

const getAncestors = (): DataObjectNode[] => {
    const page = getCurrentSiteTree();

    if (page) {
        return findAncestors(page);
    }

    return [];
};

export default getAncestors;
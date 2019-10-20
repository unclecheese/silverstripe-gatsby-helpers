import findParent from '../utils/findParent';
import getCurrentSiteTree from './getCurrentSiteTree';
import getHierarchy from './getHierarchy';
import { DataObjectNode } from '../_types';

const getParent = (): DataObjectNode|undefined => {
    const page = getCurrentSiteTree();
    if (page) {
        return getHierarchy().find(findParent(page));
    }

    return undefined;
};

export default getParent;
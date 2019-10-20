import computeIsLevel from '../utils/isLevel';
import getCurrentSiteTree from './getCurrentSiteTree';

const isLevel = (level: number): boolean => {
    const currentPage = getCurrentSiteTree();

    return currentPage ? computeIsLevel(currentPage, level) : false;
};

export default isLevel;
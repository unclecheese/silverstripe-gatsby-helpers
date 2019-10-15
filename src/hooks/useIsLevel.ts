import isLevel from '../utils/isLevel';
import useCurrentSiteTree from './useCurrentSiteTree';

const useIsLevel = (level: number): boolean => {
    const currentPage = useCurrentSiteTree();

    return currentPage ? isLevel(currentPage, level) : false;
};

export default useIsLevel;
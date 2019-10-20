// @ts-ignore
import executeHierarchyQuery from '../../queries/hierarchy';
import { DataObjectNode, AllDataObjectQuery } from '../_types';
let hierarchy: DataObjectNode[];

const initHierarchy = (result:AllDataObjectQuery) => {
    hierarchy = result.allSilverStripeDataObject.nodes;
};

const getHierarchy = (): DataObjectNode[] => {
    if (!hierarchy) {
        throw new Error(
            `Called getHierarchy before initHierarchy(). Are you using this function outside of the useSilverstripe() hook?`
        );
    }

    return hierarchy;
}

export default getHierarchy;

export {
    initHierarchy
};
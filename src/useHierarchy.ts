// @ts-ignore
import hierarchyQuery from '../queries/useHierarchy';
import { DataObjectNode, AllDataObjectQuery } from './_types';
let hierarchy: DataObjectNode[];

const useHierarchy = (): DataObjectNode[] => {
    if(hierarchy) {
        return hierarchy;
    }

    const result:AllDataObjectQuery = hierarchyQuery();
    hierarchy = result.allSilverStripeDataObject.nodes;

    return hierarchy;
}

export default useHierarchy;
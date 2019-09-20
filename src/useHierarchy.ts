// @ts-ignore
import useHierarchyQuery from '../queries/hierarchy';
import { DataObjectNode, AllDataObjectQuery } from './_types';
let hierarchy: DataObjectNode[];

const useHierarchy = (): DataObjectNode[] => {
    if(hierarchy) {
        return hierarchy;
    }

    const result:AllDataObjectQuery = useHierarchyQuery();
    hierarchy = result.allSilverStripeDataObject.nodes;

    return hierarchy;
}

export default useHierarchy;
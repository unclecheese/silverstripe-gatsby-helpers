// @ts-ignore
import hierarchyQuery from '../queries/hierarchy';
import { useStaticQuery } from 'gatsby';
import { DataObjectNode, AllDataObjectQuery } from './_types';
let hierarchy: DataObjectNode[];

const useHierarchy = (): DataObjectNode[] => {
    if(hierarchy) {
        return hierarchy;
    }

    const result:AllDataObjectQuery = useStaticQuery(hierarchyQuery);
    hierarchy = result.allSilverStripeDataObject.nodes;

    return hierarchy;
}

export default useHierarchy;
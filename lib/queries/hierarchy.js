// @ts-ignore
import { graphql, useStaticQuery } from 'gatsby';
const useHierarchyQuery = () => {
    const result = useStaticQuery(graphql `{allSsDataObject {nodes {id}}}`);
    return result;
};
export default useHierarchyQuery;

// @ts-ignore
import { graphql, useStaticQuery } from 'gatsby';

const useHierarchyQuery = () => {
   const result =  useStaticQuery(graphql`{allSilverStripeDataObject {nodes {id}}}`);

   return result;
};

export default useHierarchyQuery;
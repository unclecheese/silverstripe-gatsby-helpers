import { graphql, useStaticQuery } from 'gatsby';

const useHierarchyQuery = () => (
    useStaticQuery(graphql`{allFile{nodes{id}}}`
    )
);

export default useHierarchyQuery;
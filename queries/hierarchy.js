import { graphql, useStaticQuery } from 'gatsby';

const useHierarchyQuery = () => (
    useStaticQuery(graphql`
        {
            allSilverStripeDataObject {
                nodes {
                    ...CoreFields
                    SilverStripeSiteTree {
                        ...SilverStripeSiteTreeFields
                        Children {
                            ...CoreFields
                        	SilverStripeSiteTree {
                                ...SilverStripeSiteTreeFields
                        	}
                        }
                    }
                }
            }
        }
    `
    )
);

export default useHierarchyQuery;
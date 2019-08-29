import { graphql, useStaticQuery } from 'gatsby';

let hierarchy

const useHierarchy = () => {
    if(hierarchy) {
        return hierarchy;
    }

    const result = useStaticQuery(graphql`
        {
            allSilverStripeDataObject {
                nodes {
                    id
                    uuid
                    silverstripe_id
                    parentUUID
                    link
                    ancestry
                    SilverStripeSiteTree {
                        title
                        Children {
                        	link
                        	id
                        	SilverStripeSiteTree {
                        		title
                        		menuTitle
                        		sort
                        	}
                        }
                    }
                }
            }
        }
    `);
    hierarchy = result.allSilverStripeDataObject.nodes;

    return hierarchy;
}

export default useHierarchy;
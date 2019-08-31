import { graphql, useStaticQuery } from 'gatsby';

const hierarchyQuery = () => {
    useStaticQuery(graphql`
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
    `
    )
};

export default hierarchyQuery;
import { graphql, useStaticQuery } from 'gatsby';
import isSiteTree from './isSiteTree';

let nav;

const useNavigation = () => {
    if(nav) {
        return nav;
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
                        menuTitle
                        showInMenus
                        sort
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
    nav = result.allSilverStripeDataObject.nodes
    	.filter(isSiteTree);

    return nav;
}

export default useNavigation;
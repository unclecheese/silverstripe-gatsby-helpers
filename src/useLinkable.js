import { graphql, useStaticQuery } from 'gatsby';

let linkable

const useLinkable = () => {
    if(linkable) {
        return linkable;
    }

    const result = useStaticQuery(graphql`
        {
            allSilverStripeDataObject {
                nodes {
                    id
                    uuid
                    silverstripe_id
                    link
                    parentUUID
                    ancestry
                }
            }
        }
    `);
    linkable = result.allSilverStripeDataObject.nodes;

    return linkable;
}

export default useLinkable;
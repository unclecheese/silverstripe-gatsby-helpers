// @ts-ignore
import { useStaticQuery, graphql } from 'gatsby';
import { initHierarchy } from '../context/getHierarchy';
import getBreadcrumbs from '../context/getBreadcrumbs';
import getChildren from '../context/getChildren';
import getCurrentNode from '../context/getCurrentNode';
import getCurrentSiteTree from '../context/getCurrentSiteTree';
import getHierarchy from '../context/getHierarchy';
import getMenu from '../context/getMenu';
import getNavigation from '../context/getNavigation';
import isLevel from '../context/isLevel';

const useSiteTreeContext = () => {
    const hierarchy = useStaticQuery(graphql`
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
    `);
    initHierarchy(hierarchy);


    return {
        getBreadcrumbs,
        getCurrentNode,
        getCurrentSiteTree,
        getChildren,
        getHierarchy,
        getMenu,
        getNavigation,
        isLevel,
    };
};

export default useSiteTreeContext;
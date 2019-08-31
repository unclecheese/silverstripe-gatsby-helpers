import { BaseNode } from './_types';

const isSiteTree = (node:BaseNode): boolean => (
	node.ancestry.includes('SilverStripe\\CMS\\Model\\SiteTree')
);

export default isSiteTree;
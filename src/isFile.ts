import { BaseNode } from "./_types";

const isFile = (node:BaseNode): boolean => node.ancestry.includes(
	'SilverStripe\\Assets\\File'
);

export default isFile;

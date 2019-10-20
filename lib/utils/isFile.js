const isFile = (node) => node.ancestry.includes('SilverStripe\\Assets\\File');
export default isFile;

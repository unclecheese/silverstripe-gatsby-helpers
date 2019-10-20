let hierarchy;
const initHierarchy = (result) => {
    hierarchy = result.allSilverStripeDataObject.nodes;
};
const getHierarchy = () => {
    if (!hierarchy) {
        throw new Error(`Called getHierarchy before initHierarchy(). Are you using this function outside of the useSilverstripe() hook?`);
    }
    return hierarchy;
};
export default getHierarchy;
export { initHierarchy };

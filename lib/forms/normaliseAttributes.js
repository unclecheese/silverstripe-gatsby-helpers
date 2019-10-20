const normaliseAttributes = (attributes) => {
    const normalised = attributes.reduce((atts, { name, value }) => {
        if (name === 'class') {
            return atts;
        }
        atts[name] = value;
        return atts;
    }, {});
    return normalised;
};
export default normaliseAttributes;

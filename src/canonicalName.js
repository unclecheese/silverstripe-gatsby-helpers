const canonicalName = (className) => (
    className.substr(className.lastIndexOf('\\') + 1)
);

export default canonicalName;
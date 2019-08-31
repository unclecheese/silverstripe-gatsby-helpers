const canonicalName = (className: string): string => (
    className.substr(className.lastIndexOf('\\') + 1)
);

export default canonicalName;
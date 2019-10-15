exports.__esModule = true;
var normaliseAttributes = function (attributes) {
    var normalised = attributes.reduce(function (atts, _a) {
        var name = _a.name, value = _a.value;
        if (name === 'class') {
            return atts;
        }
        atts[name] = value;
        return atts;
    }, {});
    return normalised;
};
exports["default"] = normaliseAttributes;

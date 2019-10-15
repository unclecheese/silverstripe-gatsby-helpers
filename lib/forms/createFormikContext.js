exports.__esModule = true;
var react_1 = require("react");
var createFormikContext = function (formik) { return function (Field) { return (react_1.cloneElement(Field, {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    value: formik.values[Field.props.name]
}, Field.props.children)); }; };
exports["default"] = createFormikContext;

import { cloneElement } from "react";
const createFormikContext = (formik) => (Field) => (cloneElement(Field, {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    value: formik.values[Field.props.name]
}, Field.props.children));
export default createFormikContext;

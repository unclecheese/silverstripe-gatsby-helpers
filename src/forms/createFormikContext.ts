import { ReactElement, cloneElement } from "react";
import { FormikStub } from "../_types";

const createFormikContext = (formik: FormikStub) => (Field: ReactElement) => (
    cloneElement(
        Field,
        {
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            value: formik.values[Field.props.name]
        },
        Field.props.children
    )
);

export default createFormikContext;
import { RawFieldNode, FormData, SilverStripeForm, FormHash, NormalisedFieldNode } from "../_types";
import normaliseAttributes from './normaliseAttributes';
import createFieldComponent from "./createFieldComponent";


const fieldMap = (fieldNode: RawFieldNode): NormalisedFieldNode => {
    const normalised: NormalisedFieldNode = {
        ...fieldNode,
        attributes: normaliseAttributes(fieldNode.attributes),
        data: JSON.parse(fieldNode.data),
        childFields: fieldNode.childFields ? fieldNode.childFields.map(fieldMap) : [],
        Component: null,
    };
    const Component = createFieldComponent(normalised);
    normalised.Component = Component;
    return normalised;
}

const extractFormData = (form: SilverStripeForm): FormData => {
    ['formFields', 'formActions', 'attributes'].forEach(k => {
        // @ts-ignore
        if (!form[k]) {
            throw new Error(
                `extractFormData expects a form object with a ${k} node. Maybe you need to
                add this field to your GraphQL query?`
            );
        }
    });
    const { formFields, formActions, attributes: rawAttributes } = form;

    const addValue = (values: FormHash, fieldNode: RawFieldNode): FormHash => {
        const { name, value } = fieldNode;
        values[name] = value;
        if (fieldNode.childFields) {
            fieldNode.childFields.forEach(childNode => {
                addValue(values, childNode);
            })
        }
        return values;
    }
    const initialValues = formFields.reduce(addValue, {});
    const validator = (values: FormHash): FormHash => {
        const errors: FormHash = {};
        Object.entries(values).forEach(([name, val]) => {
            const field = formFields.find(f => f.name === name);
            if (field) {
                const { validation } = field;
                if (
                    validation &&
                    validation.includes('required') &&
                    typeof val === 'string' &&
                    val.trim().length === 0
                ) {
                    errors[name] = field.customValidationMessage || `${name} is required`;
                }
            }
        });

        return errors;
    };

    const fields = formFields.map(fieldMap);
    const actions = formActions.map(fieldMap);
    const attributes = normaliseAttributes(rawAttributes);

    return {
        fields,
        actions,
        attributes,
        initialValues,
        validator,
    }  
};

export default extractFormData;



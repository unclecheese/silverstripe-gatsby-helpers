import React from 'react';
import { SchemaType } from '../_types';
// @ts-ignore
import classnames from 'classnames';
const createInputCreator = (field) => (type, className = null) => (props) => {
    const inputClass = className || type;
    const classes = {
        [field.extraClass]: true,
        [inputClass]: true
    };
    return (React.createElement("input", Object.assign({ type: type, name: field.name }, field.attributes, { className: classnames(classes) }, props)));
};
const createFieldComponent = (field) => {
    const createInput = createInputCreator(field);
    switch (field.schemaType) {
        case SchemaType.Integer:
        case SchemaType.Decimal:
            return createInput('number', 'numeric');
        case SchemaType.String:
        case SchemaType.Text:
            const isMultiLine = (field.data.rows && field.data.rows > 1);
            return isMultiLine
                ? props => React.createElement("textarea", Object.assign({ name: field.name }, field.attributes, { className: classnames({
                        [field.extraClass]: true,
                        textarea: true
                    }) }, props))
                : createInput('text');
        case SchemaType.Date:
            return createInput('date');
        case SchemaType.Time:
            return createInput('time');
        case SchemaType.Datetime:
            return createInput('datetime');
        case SchemaType.Hidden:
            return createInput('hidden');
        case SchemaType.SingleSelect:
            return props => (React.createElement("select", Object.assign({ name: field.name }, field.attributes, { className: classnames({
                    [field.extraClass]: true,
                    dropdown: true
                }) }, props), field.source.map(({ name, value }) => (React.createElement("option", { key: name, value: name }, value)))));
        case SchemaType.Structural:
            return props => (React.createElement("div", Object.assign({ className: 'composite' }, props), field.childFields.map(createFieldComponent)));
        case SchemaType.Boolean:
            return createInput('checkbox');
        case SchemaType.MultiSelect:
            return props => (React.createElement("ul", Object.assign({}, field.attributes),
                field.source.length > 0 && field.source.map(option => {
                    const id = `${field.name}__${option.name}`;
                    return (React.createElement("li", { key: id },
                        React.createElement("input", Object.assign({ id: id, className: "checkbox", name: `${field.name}[]`, value: option.name, checked: field.value.includes(option.name) }, props)),
                        React.createElement("label", { htmlFor: id }, option.value)));
                }),
                field.source.length === 0 &&
                    React.createElement("li", null, "No options available")));
        default:
            return null;
    }
};
export default createFieldComponent;

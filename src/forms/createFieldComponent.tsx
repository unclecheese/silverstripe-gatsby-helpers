import React, { ReactElement, StatelessComponent } from 'react';
import { NormalisedFieldNode, SchemaType } from '../_types';
// @ts-ignore
import classnames from 'classnames';

const createInputCreator = 
(field: NormalisedFieldNode) =>
(type: string, className: string|null = null): StatelessComponent =>
(props): ReactElement => {
    const inputClass = className || type;
    const classes = {
        [field.extraClass]: true,
        [inputClass]: true
    };
    return (
        <input type={type} name={field.name} {...field.attributes} className={classnames(classes)} {...props} />
    );
};

const createFieldComponent = (field: NormalisedFieldNode): StatelessComponent|null => {
    const createInput = createInputCreator(field);
    switch (field.schemaType) {
        case SchemaType.Integer:
        case SchemaType.Decimal:
            return createInput('number', 'numeric');
        case SchemaType.String:
        case SchemaType.Text:
            const isMultiLine = (field.data.rows && field.data.rows > 1);
            return isMultiLine
                ? props => <textarea name={field.name} {...field.attributes} className={classnames({
                    [field.extraClass]: true,
                    textarea: true
                })} {...props} />
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
            return props => (
                <select name={field.name} {...field.attributes} className={classnames({
                    [field.extraClass]: true,
                    dropdown: true
                })} {...props}>
                    {field.source.map(({ name, value }) => (
                        <option key={name} value={name}>{value}</option>
                    ))}
                </select>
            );
        case SchemaType.Structural:
            return props => (
                <div className='composite' {...props}>
                    {field.childFields.map(createFieldComponent)}
                </div>
            );
        case SchemaType.Boolean:
            return createInput('checkbox');
        case SchemaType.MultiSelect:
            return props => (
                <ul {...field.attributes}>
                    {field.source.length > 0 && field.source.map(option => {
                        const id = `${field.name}__${option.name}`;
                        return (
                            <li key={id}>
                                <input
                                    id={id}
                                    className="checkbox"
                                    name={`${field.name}[]`}
                                    value={option.name}
                                    checked={field.value.includes(option.name)}
                                    {...props}
                                />
                                <label htmlFor={id}>{option.value}</label>
                            </li> 
                       );
                    })}
                    {field.source.length === 0 &&
                        <li>No options available</li>
                    }
                </ul>
            );
        default:
            return null;
      
    }
}

export default createFieldComponent;
import React, { ReactElement } from 'react';
import { NormalisedFieldNode, SchemaType } from '../_types';
// @ts-ignore
import classnames from 'classnames';

const createInputCreator = (field: NormalisedFieldNode) => (type: string, className: string|null = null): ReactElement => {
    const inputClass = className || type;
    const classes = {
        [field.extraClass]: true,
        [inputClass]: true
    };
    return (
        <input type={type} name={field.name} {...field.attributes} className={classnames(classes)} />
    );
};

const createFieldComponent = (field: NormalisedFieldNode): ReactElement|null => {
    const createInput = createInputCreator(field);
    switch (field.schemaType) {
        case SchemaType.Integer:
        case SchemaType.Decimal:
            return createInput('number', 'numeric');
        case SchemaType.String:
        case SchemaType.Text:
            const isMultiLine = (field.data.rows && field.data.rows > 1);
            return isMultiLine
                ? <textarea name={field.name} {...field.attributes} className={classnames({
                    [field.extraClass]: true,
                    textarea: true
                })} />
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
            return (
                <select name={field.name} {...field.attributes} className={classnames({
                    [field.extraClass]: true,
                    dropdown: true
                })}>
                    {field.source.map(({ name, value }) => (
                        <option key={name} value={name}>{value}</option>
                    ))}
                </select>
            );
            break;
        case SchemaType.Structural:
            return (
                <div className='composite'>
                    {field.childFields.map(createFieldComponent)}
                </div>
            );
            break;
        case SchemaType.Boolean:
            return createInput('checkbox');
            break;
        case SchemaType.MultiSelect:
            return (
                <ul {...field.attributes}>
                    {field.source.length > 0 && field.source.map(option => {
                        const id = `${field.name}__${option.name}`;
                        return (
                            <li key={id}>
                                <input
                                    id={id}
                                    className="checkbox"
                                    name={field.name}
                                    value={option.name}
                                    checked={field.value.includes(option.name)}
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
            break;
        default:
            return null;
      
    }
}

export default createFieldComponent;
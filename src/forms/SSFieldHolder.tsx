import { NormalisedFieldNode } from '../_types';
import React, { ReactElement, StatelessComponent } from 'react';

interface FieldHolderProps {
    fieldNode: NormalisedFieldNode
    error?: string
}
const SSFieldHolder: StatelessComponent<FieldHolderProps> = ({
    fieldNode: {
        formFieldID,
        extraClass,
        title,
        rightTitle,
        description,
    },
    error,
    children
}): ReactElement => {
    return (
        <div key={formFieldID} id={formFieldID} className={`field ${extraClass}`}>
            {title && <label className="left" htmlFor={formFieldID}>{title}</label>}
            <div className="middleColumn">
                {children}
            </div>
            {rightTitle && <label className="right" htmlFor={formFieldID}>{rightTitle}</label>}
            {error && <span className="message bad">{error}</span>}
            {description && <span className="description">{description}</span>}
        </div>
    );
};

export default SSFieldHolder;
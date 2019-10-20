import React from 'react';
const SSFieldHolder = ({ fieldNode: { formFieldID, extraClass, title, rightTitle, description, }, error, children }) => {
    return (React.createElement("div", { key: formFieldID, id: formFieldID, className: `field ${extraClass}` },
        title && React.createElement("label", { className: "left", htmlFor: formFieldID }, title),
        React.createElement("div", { className: "middleColumn" }, children),
        rightTitle && React.createElement("label", { className: "right", htmlFor: formFieldID }, rightTitle),
        error && React.createElement("span", { className: "message bad" }, error),
        description && React.createElement("span", { className: "description" }, description)));
};
export default SSFieldHolder;

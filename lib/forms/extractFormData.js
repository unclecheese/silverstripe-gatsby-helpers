var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var normaliseAttributes_1 = __importDefault(require("./normaliseAttributes"));
var createFieldComponent_1 = __importDefault(require("./createFieldComponent"));
var fieldMap = function (fieldNode) {
    var normalised = __assign(__assign({}, fieldNode), { attributes: normaliseAttributes_1["default"](fieldNode.attributes), data: JSON.parse(fieldNode.data), childFields: fieldNode.childFields ? fieldNode.childFields.map(fieldMap) : [], Component: null });
    var Component = createFieldComponent_1["default"](normalised);
    normalised.Component = Component;
    return normalised;
};
var extractFormData = function (form) {
    ['formFields', 'formActions', 'attributes'].forEach(function (k) {
        // @ts-ignore
        if (!form[k]) {
            throw new Error("extractFormData expects a form object with a " + k + " node. Maybe you need to\n                add this field to your GraphQL query?");
        }
    });
    var formFields = form.formFields, formActions = form.formActions, rawAttributes = form.attributes;
    var addValue = function (values, fieldNode) {
        var name = fieldNode.name, value = fieldNode.value;
        values[name] = value;
        if (fieldNode.childFields) {
            fieldNode.childFields.forEach(function (childNode) {
                addValue(values, childNode);
            });
        }
        return values;
    };
    var initialValues = formFields.reduce(addValue, {});
    var validator = function (values) {
        var errors = {};
        Object.entries(values).forEach(function (_a) {
            var name = _a[0], val = _a[1];
            var field = formFields.find(function (f) { return f.name === name; });
            if (field) {
                var validation = field.validation;
                if (validation &&
                    validation.includes('required') &&
                    typeof val === 'string' &&
                    val.trim().length === 0) {
                    errors[name] = field.customValidationMessage || name + " is required";
                }
            }
        });
        return errors;
    };
    var fields = formFields.map(fieldMap);
    var actions = formActions.map(fieldMap);
    var attributes = normaliseAttributes_1["default"](rawAttributes);
    return {
        fields: fields,
        actions: actions,
        attributes: attributes,
        initialValues: initialValues,
        validator: validator
    };
};
exports["default"] = extractFormData;

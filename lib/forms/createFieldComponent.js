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
var react_1 = __importDefault(require("react"));
var _types_1 = require("../_types");
// @ts-ignore
var classnames_1 = __importDefault(require("classnames"));
var createInputCreator = function (field) {
    return function (type, className) {
        if (className === void 0) { className = null; }
        return function (props) {
            var _a;
            var inputClass = className || type;
            var classes = (_a = {},
                _a[field.extraClass] = true,
                _a[inputClass] = true,
                _a);
            return (react_1["default"].createElement("input", __assign({ type: type, name: field.name }, field.attributes, { className: classnames_1["default"](classes) }, props)));
        };
    };
};
var createFieldComponent = function (field) {
    var createInput = createInputCreator(field);
    switch (field.schemaType) {
        case _types_1.SchemaType.Integer:
        case _types_1.SchemaType.Decimal:
            return createInput('number', 'numeric');
        case _types_1.SchemaType.String:
        case _types_1.SchemaType.Text:
            var isMultiLine = (field.data.rows && field.data.rows > 1);
            return isMultiLine
                ? function (props) {
                    var _a;
                    return react_1["default"].createElement("textarea", __assign({ name: field.name }, field.attributes, { className: classnames_1["default"]((_a = {},
                            _a[field.extraClass] = true,
                            _a.textarea = true,
                            _a)) }, props));
                }
                : createInput('text');
        case _types_1.SchemaType.Date:
            return createInput('date');
        case _types_1.SchemaType.Time:
            return createInput('time');
        case _types_1.SchemaType.Datetime:
            return createInput('datetime');
        case _types_1.SchemaType.Hidden:
            return createInput('hidden');
        case _types_1.SchemaType.SingleSelect:
            return function (props) {
                var _a;
                return (react_1["default"].createElement("select", __assign({ name: field.name }, field.attributes, { className: classnames_1["default"]((_a = {},
                        _a[field.extraClass] = true,
                        _a.dropdown = true,
                        _a)) }, props), field.source.map(function (_a) {
                    var name = _a.name, value = _a.value;
                    return (react_1["default"].createElement("option", { key: name, value: name }, value));
                })));
            };
        case _types_1.SchemaType.Structural:
            return function (props) { return (react_1["default"].createElement("div", __assign({ className: 'composite' }, props), field.childFields.map(createFieldComponent))); };
        case _types_1.SchemaType.Boolean:
            return createInput('checkbox');
        case _types_1.SchemaType.MultiSelect:
            return function (props) { return (react_1["default"].createElement("ul", __assign({}, field.attributes),
                field.source.length > 0 && field.source.map(function (option) {
                    var id = field.name + "__" + option.name;
                    return (react_1["default"].createElement("li", { key: id },
                        react_1["default"].createElement("input", __assign({ id: id, className: "checkbox", name: field.name + "[]", value: option.name, checked: field.value.includes(option.name) }, props)),
                        react_1["default"].createElement("label", { htmlFor: id }, option.value)));
                }),
                field.source.length === 0 &&
                    react_1["default"].createElement("li", null, "No options available"))); };
        default:
            return null;
    }
};
exports["default"] = createFieldComponent;

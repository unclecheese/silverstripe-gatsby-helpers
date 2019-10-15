var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var SSFieldHolder = function (_a) {
    var _b = _a.fieldNode, formFieldID = _b.formFieldID, extraClass = _b.extraClass, title = _b.title, rightTitle = _b.rightTitle, description = _b.description, error = _a.error, children = _a.children;
    return (react_1["default"].createElement("div", { key: formFieldID, id: formFieldID, className: "field " + extraClass },
        title && react_1["default"].createElement("label", { className: "left", htmlFor: formFieldID }, title),
        react_1["default"].createElement("div", { className: "middleColumn" }, children),
        rightTitle && react_1["default"].createElement("label", { className: "right", htmlFor: formFieldID }, rightTitle),
        error && react_1["default"].createElement("span", { className: "message bad" }, error),
        description && react_1["default"].createElement("span", { className: "description" }, description)));
};
exports["default"] = SSFieldHolder;

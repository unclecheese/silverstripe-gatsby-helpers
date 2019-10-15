var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// @ts-ignore
var hierarchy_1 = __importDefault(require("../../queries/hierarchy"));
var hierarchy;
var useHierarchy = function () {
    if (hierarchy) {
        return hierarchy;
    }
    var result = hierarchy_1["default"]();
    hierarchy = result.allSilverStripeDataObject.nodes;
    return hierarchy;
};
exports["default"] = useHierarchy;

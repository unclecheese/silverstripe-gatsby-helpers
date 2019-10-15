var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var isLevel_1 = __importDefault(require("../utils/isLevel"));
var useCurrentSiteTree_1 = __importDefault(require("./useCurrentSiteTree"));
var useIsLevel = function (level) {
    var currentPage = useCurrentSiteTree_1["default"]();
    return currentPage ? isLevel_1["default"](currentPage, level) : false;
};
exports["default"] = useIsLevel;

"use strict";
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
exports.__esModule = true;
var react_1 = require("react");
var Theme_context_1 = require("./contexts/Theme/Theme.context");
var Content_component_1 = require("./components/UIComponents/Content/Content.component");
var Footer_component_1 = require("./components/UIComponents/Footer/Footer.component");
var bg_shapes_svg_1 = require("./assets/images/bg_shapes.svg");
function App() {
    var theme = Theme_context_1.useTheme().theme;
    return (react_1["default"].createElement("div", { className: "App", style: __assign({}, theme) },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: 'app__main' },
                react_1["default"].createElement(Content_component_1.Content, null),
                react_1["default"].createElement(Footer_component_1.Footer, null)),
            react_1["default"].createElement("div", { className: 'app__bg' },
                react_1["default"].createElement("img", { src: bg_shapes_svg_1["default"], alt: 'bg' })))));
}
exports["default"] = App;

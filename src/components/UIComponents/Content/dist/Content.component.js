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
exports.Content = void 0;
var react_1 = require("react");
var Button_component_1 = require("../Button/Button.component");
var Theme_context_1 = require("../../../contexts/Theme/Theme.context");
require("./Content.style.scss");
var react_i18next_1 = require("react-i18next");
var i18n_constants_1 = require("../../../i18n/i18n.constants");
exports.Content = function () {
    var _a = Theme_context_1.useTheme(), theme = _a.theme, setCurrentTheme = _a.setCurrentTheme;
    var _b = react_i18next_1.useTranslation(i18n_constants_1.namespaces.pages.simple), t = _b.t, i18n = _b.i18n;
    var changeLanguage = function (language) { return function () {
        i18n.changeLanguage(language);
    }; };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: 'content', style: __assign({}, theme) },
            react_1["default"].createElement("h1", { className: 'content__title' },
                react_1["default"].createElement("span", { className: 'content__title--colored' },
                    t("themes"),
                    " "),
                t("content1")),
            react_1["default"].createElement("p", { className: 'content__paragraph' },
                t("content2"),
                " ",
                react_1["default"].createElement("b", null, t("content3")),
                t("para")),
            react_1["default"].createElement("p", { className: 'content__paragraph' },
                t("para1"),
                " ",
                react_1["default"].createElement("b", null, t("para1")),
                " ,",
                react_1["default"].createElement("b", null, t("para2")),
                " ",
                react_1["default"].createElement("b", null, t("para3")),
                " ",
                react_1["default"].createElement("b", null, t("para4"))),
            react_1["default"].createElement("div", { className: 'content__buttons' },
                react_1["default"].createElement(Button_component_1.Button, { type: 'primary', theme: theme, onClick: function () { return setCurrentTheme('USA'); } }, t("ustheme")),
                react_1["default"].createElement(Button_component_1.Button, { type: 'secondary', theme: theme, onClick: function () { return setCurrentTheme('UK'); } }, t("uktheme")))),
        react_1["default"].createElement("div", { className: 'content__buttons1' },
            react_1["default"].createElement(Button_component_1.Button, { type: 'primary', theme: theme, onClick: changeLanguage("en") }, t("english")),
            react_1["default"].createElement(Button_component_1.Button, { type: 'primary', theme: theme, onClick: changeLanguage("es") }, t("spanish")),
            react_1["default"].createElement(Button_component_1.Button, { type: 'primary', theme: theme, onClick: changeLanguage("fr") }, t("french")))));
};

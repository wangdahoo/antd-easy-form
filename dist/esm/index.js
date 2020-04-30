import React, { useState } from 'react';
import { Empty, Divider, Button, Input, InputNumber, Radio, Checkbox, Select } from 'antd';
import classnames from 'classnames';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".ef-form {\n  min-height: 100%;\n  background-color: #fff;\n}\n.ef-form .ef-form-item {\n  display: flex;\n  margin: 0 0 4px 0;\n}\n.ef-form .ef-form-item.label-standalone {\n  flex-direction: column;\n}\n.ef-form .ef-form-item.label-standalone .ef-form-item-label {\n  flex: 1;\n  text-align: left;\n}\n.ef-form .ef-form-item-label {\n  font-size: 14px;\n  line-height: 32px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.ef-form .ef-form-item-label:after {\n  content: '：';\n}\n.ef-form .ef-form-item-content {\n  flex: 1;\n}\n.ef-form .ef-form-item-content > .ant-checkbox-group {\n  line-height: 32px;\n}\n.ef-form .ef-form-item.ef-form-item-text {\n  display: block;\n}\n.ef-form .ef-form-item .ef-err-msg {\n  padding: 0;\n  height: 20px;\n  font-size: 13px;\n  line-height: 20px;\n  color: #f5222d;\n}\n.ef-form .ef-divider {\n  margin: 0 0 18px 0;\n}\n";
styleInject(css_248z);

var FormItemType;
(function (FormItemType) {
    FormItemType["INPUT"] = "input";
    FormItemType["PASSWORD"] = "password";
    FormItemType["NUMBER"] = "number";
    FormItemType["TEXTAREA"] = "textarea";
    FormItemType["CHECKBOX"] = "checkbox";
    FormItemType["RADIO"] = "radio";
    FormItemType["SELECT"] = "select";
})(FormItemType || (FormItemType = {}));

var createFormValues = function (items) {
    var values = items.reduce(function (values, item) {
        var _a;
        if ([
            FormItemType.INPUT,
            FormItemType.PASSWORD,
            FormItemType.NUMBER,
            FormItemType.TEXTAREA,
            FormItemType.RADIO,
            FormItemType.CHECKBOX,
            FormItemType.SELECT
        ].indexOf(item.itemType) > -1) {
            return __assign(__assign({}, values), (_a = {}, _a[item.name] = item.defaultValue, _a));
        }
        return values;
    }, {});
    return values;
};
var shouldValidateRequired = function (item) { return [
    FormItemType.INPUT,
    FormItemType.PASSWORD,
    FormItemType.TEXTAREA,
    FormItemType.CHECKBOX,
    FormItemType.RADIO
].indexOf(item.itemType) > -1; };
var shouldValidateRegExp = function (item) { return [
    FormItemType.INPUT,
    FormItemType.PASSWORD,
    FormItemType.TEXTAREA
].indexOf(item.itemType) > -1; };
function Form(props) {
    var _a = props.items, items = _a === void 0 ? [] : _a, _b = props.formWidth, formWidth = _b === void 0 ? 100 : _b, _c = props.formWidthUnit, formWidthUnit = _c === void 0 ? '%' : _c, _d = props.labelAlign, labelAlign = _d === void 0 ? 'left' : _d, _e = props.labelWidth, labelWidth = _e === void 0 ? 100 : _e;
    var _f = useState(createFormValues(items)), formValues = _f[0], setFormValues = _f[1];
    var _g = useState({ result: false, errors: {} }), validationResult = _g[0], setValidationResult = _g[1];
    var _h = useState(0), validateCount = _h[0], setValidateCount = _h[1];
    function onSubmit() {
        // console.log(items, formValues)
        var newValidationResult = validate(items, formValues);
        console.log(newValidationResult);
        if (newValidationResult.result) {
            if (props.onSubmit)
                props.onSubmit(formValues);
            setFormValues(createFormValues(items));
        }
        setValidationResult(newValidationResult);
        setValidateCount(validateCount + 1);
    }
    function validate(items, formValues) {
        return items.reduce(function (_a, item) {
            var result = _a.result, errors = _a.errors;
            var _b = item, name = _b.name, labelText = _b.labelText;
            var value = formValues[name];
            // 校验必填项
            if (shouldValidateRequired(item) && item.required) {
                if (
                // 空字符串
                (typeof value === 'string' && value === '') ||
                    // 空数组
                    (Object.prototype.toString.call(value) === '[object Array]' && value.length === 0)) {
                    errors[name] = labelText + "\u4E3A\u5FC5\u586B\u9879";
                    result = false;
                }
            }
            // 有正则表达式的话，校验正则表单时
            if (shouldValidateRegExp(item) && item.re && item.re instanceof RegExp && typeof value === 'string') {
                var re = item.re;
                if (!re.test(value) && !errors[name]) {
                    errors[name] = labelText + "\u683C\u5F0F\u4E0D\u6B63\u786E";
                    result = false;
                }
            }
            return {
                result: result,
                errors: errors
            };
        }, {
            result: true,
            errors: {}
        });
    }
    var renderFormItem = function (item) {
        var itemType = item.itemType;
        switch (itemType) {
            case FormItemType.SELECT:
                var selectItem_1 = item;
                return (React.createElement(Select, { value: formValues[selectItem_1.name], onChange: function (value) {
                        var _a;
                        setFormValues(__assign(__assign({}, formValues), (_a = {}, _a[selectItem_1.name] = value, _a)));
                    }, style: { width: '100%' } }, selectItem_1.options.map(function (option, optionIndex) { return (React.createElement(Select.Option, { key: optionIndex, value: option.value }, option.text)); })));
            case FormItemType.CHECKBOX:
                var checkboxItem_1 = item;
                return (React.createElement(Checkbox.Group, { value: formValues[checkboxItem_1.name], onChange: function (value) {
                        var _a;
                        setFormValues(__assign(__assign({}, formValues), (_a = {}, _a[checkboxItem_1.name] = value, _a)));
                    } }, checkboxItem_1.options.map(function (option, optionIndex) { return (React.createElement(Checkbox, { key: optionIndex, value: option.value }, option.text)); })));
            case FormItemType.RADIO:
                var radioItem_1 = item;
                return (React.createElement(Radio.Group, { value: formValues[radioItem_1.name], onChange: function (e) {
                        var _a;
                        setFormValues(__assign(__assign({}, formValues), (_a = {}, _a[radioItem_1.name] = e.target.value, _a)));
                    }, buttonStyle: radioItem_1.buttonStyle }, radioItem_1.options.map(function (option, optionIndex) { return (React.createElement(Radio.Button, { key: optionIndex, value: option.value }, option.text)); })));
            case FormItemType.TEXTAREA:
                var textareaItem_1 = item;
                return (React.createElement(Input.TextArea, { value: formValues[textareaItem_1.name], onChange: function (e) {
                        var _a;
                        setFormValues(__assign(__assign({}, formValues), (_a = {}, _a[textareaItem_1.name] = e.target.value, _a)));
                    }, placeholder: textareaItem_1.placeholder }));
            case FormItemType.NUMBER:
                var numberItem_1 = item;
                return (React.createElement(InputNumber, { style: { width: '100%' }, value: formValues[numberItem_1.name], onChange: function (value) {
                        var _a;
                        value = value || numberItem_1.min;
                        setFormValues(__assign(__assign({}, formValues), (_a = {}, _a[numberItem_1.name] = value, _a)));
                    }, min: numberItem_1.min, max: numberItem_1.max, formatter: function (value) {
                        if (!value)
                            return numberItem_1.min + " " + numberItem_1.unit;
                        return value + " " + numberItem_1.unit;
                    }, parser: function (value) {
                        if (!value)
                            return Number(numberItem_1.min);
                        return Number(value.replace(" " + numberItem_1.unit, ''));
                    } }));
            case FormItemType.PASSWORD:
                var passwordItem_1 = item;
                return (React.createElement(Input.Password, { value: formValues[passwordItem_1.name], onChange: function (e) {
                        var _a;
                        setFormValues(__assign(__assign({}, formValues), (_a = {}, _a[passwordItem_1.name] = e.target.value, _a)));
                    }, placeholder: passwordItem_1.placeholder }));
            default:
                var inputItem_1 = item;
                return (React.createElement(Input, { value: formValues[inputItem_1.name], onChange: function (e) {
                        var _a;
                        setFormValues(__assign(__assign({}, formValues), (_a = {}, _a[inputItem_1.name] = e.target.value, _a)));
                    }, placeholder: inputItem_1.placeholder }));
        }
    };
    if (items.length === 0)
        return React.createElement(Empty, null);
    return (React.createElement("div", { className: "ef-form", style: {
            width: "" + formWidth + formWidthUnit
        } },
        items.map(function (item, index) {
            var itemType = item.itemType;
            if ([
                FormItemType.INPUT,
                FormItemType.PASSWORD,
                FormItemType.NUMBER,
                FormItemType.TEXTAREA,
                FormItemType.RADIO,
                FormItemType.CHECKBOX,
                FormItemType.SELECT
            ].indexOf(itemType) > -1) {
                var errMsg = validationResult.errors[item.name];
                return (React.createElement("div", { className: "ef-form-item", key: index },
                    React.createElement("div", { className: classnames('ef-form-item-label', labelAlign === 'top' ? 'label-standalone' : ''), style: __assign({ width: labelWidth }, (labelAlign !== 'top' ? {
                            textAlign: labelAlign
                        } : {})) }, item.labelText),
                    React.createElement("div", { className: 'ef-form-item-content' },
                        renderFormItem(item),
                        React.createElement("div", { className: "ef-err-msg" }, errMsg))));
            }
            return null;
        }),
        React.createElement(Divider, { className: 'ef-divider' }),
        React.createElement("div", { style: { paddingLeft: labelWidth } },
            React.createElement(Button, { type: "primary", onClick: onSubmit, style: { width: 90, marginRight: 16 } }, "\u63D0 \u4EA4"),
            React.createElement(Button, { type: "default", onClick: function () { return setFormValues(createFormValues(items)); }, style: { width: 90 } }, "\u91CD \u7F6E"))));
}

export { Form, FormItemType };

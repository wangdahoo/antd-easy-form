import 'antd/es/button/style';
import _Button from 'antd/es/button';
import 'antd/es/divider/style';
import _Divider from 'antd/es/divider';
import 'antd/es/empty/style';
import _Empty from 'antd/es/empty';
import 'antd/es/input-number/style';
import _InputNumber from 'antd/es/input-number';
import 'antd/es/input/style';
import _Input from 'antd/es/input';
import 'antd/es/radio/style';
import _Radio from 'antd/es/radio';
import 'antd/es/checkbox/style';
import _Checkbox from 'antd/es/checkbox';
import 'antd/es/select/style';
import _Select from 'antd/es/select';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

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

var css_248z = ".ef-form {\n  min-height: 100%;\n  background-color: #fff;\n  padding: 16px;\n}\n.ef-form .ef-form-item {\n  display: flex;\n  margin: 0 0 4px 0;\n}\n.ef-form .ef-form-item.label-standalone {\n  flex-direction: column;\n}\n.ef-form .ef-form-item.label-standalone .ef-form-item-label {\n  flex: 1;\n  text-align: left;\n}\n.ef-form .ef-form-item-label {\n  font-size: 14px;\n  line-height: 32px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.ef-form .ef-form-item-label:after {\n  content: '：';\n}\n.ef-form .ef-form-item-content {\n  flex: 1;\n}\n.ef-form .ef-form-item-content > .ant-checkbox-group {\n  line-height: 32px;\n}\n.ef-form .ef-form-item.ef-form-item-text {\n  display: block;\n}\n.ef-form .ef-form-item .ef-err-msg {\n  padding: 0;\n  height: 20px;\n  font-size: 13px;\n  line-height: 20px;\n  color: #f5222d;\n}\n.ef-form .ef-divider {\n  margin: 0 0 18px 0;\n}\n";
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
  FormItemType["CUSTOM"] = "custom";
})(FormItemType || (FormItemType = {}));

// utilities
function isObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]';
}

function isArray(target) {
  return Object.prototype.toString.call(target) === '[object Array]';
}

function isDate(target) {
  return Object.prototype.toString.call(target) === '[object Date]';
}

function isRegExp(target) {
  return Object.prototype.toString.call(target) === '[object RegExp]';
}
/**
 * DeepClone 算法
 */


function clone(source) {
  if (typeof source === 'function') throw new TypeError('source should not be a function.');

  if (!isObject(source)) {
    // 如果是 number/string/boolean/null/undefined 的话，直接返回就好
    return source;
  }

  var target = {};

  for (var i in source) {
    if (source.hasOwnProperty(i)) {
      if (isDate(source[i])) {
        target[i] = new Date(source[i].getTime());
      } else if (isRegExp(source[i])) {
        var flags = [];

        if (source[i].global) {
          flags.push('g');
        }

        if (source[i].ignoreCase) {
          flags.push('i');
        }

        if (source[i].multiline) {
          flags.push('m');
        }

        target[i] = new RegExp(source[i].source, flags.join(''));
      } else if (isArray(source[i])) {
        target[i] = source[i].map(function (j) {
          return clone(j);
        });
      } else if (isObject(source[i])) {
        target[i] = clone(source[i]);
      } else {
        target[i] = source[i];
      }
    }
  }

  return target;
}

var determineDefaultValue = function determineDefaultValue(item) {
  switch (item.itemType) {
    case FormItemType.NUMBER:
      return item.defaultValue || item.min || 0;

    case FormItemType.RADIO:
      return item.defaultValue || item.options[0] && item.options[0].value || '';

    case FormItemType.CHECKBOX:
      return item.defaultValue || [];

    case FormItemType.SELECT:
      return item.defaultValue || item.options[0] && item.options[0].value || '';

    default:
      // FormItemType.INPUT, FormItemType.PASSWORD, FormItemType.TEXTAREA, FormItemType.RADIO, FormItemType.CUSTOM
      return item.defaultValue || '';
  }
};

var createFormValues = function createFormValues(items) {
  var values = items.reduce(function (values, item) {
    if ([FormItemType.INPUT, FormItemType.PASSWORD, FormItemType.NUMBER, FormItemType.TEXTAREA, FormItemType.RADIO, FormItemType.CHECKBOX, FormItemType.SELECT, FormItemType.CUSTOM].indexOf(item.itemType) > -1) {
      return _objectSpread2(_objectSpread2({}, values), {}, _defineProperty({}, item.name, determineDefaultValue(item)));
    }

    return values;
  }, {});
  return values;
};

var shouldValidateRequired = function shouldValidateRequired(item) {
  return [FormItemType.INPUT, FormItemType.PASSWORD, FormItemType.TEXTAREA, FormItemType.CHECKBOX, FormItemType.RADIO].indexOf(item.itemType) > -1;
};

var shouldValidateRegExp = function shouldValidateRegExp(item) {
  return [FormItemType.INPUT, FormItemType.PASSWORD, FormItemType.TEXTAREA].indexOf(item.itemType) > -1;
};

function Form(props) {
  var _props$items = props.items,
      items = _props$items === void 0 ? [] : _props$items,
      _props$formWidth = props.formWidth,
      formWidth = _props$formWidth === void 0 ? 100 : _props$formWidth,
      _props$formWidthUnit = props.formWidthUnit,
      formWidthUnit = _props$formWidthUnit === void 0 ? '%' : _props$formWidthUnit,
      _props$labelAlign = props.labelAlign,
      labelAlign = _props$labelAlign === void 0 ? 'left' : _props$labelAlign,
      _props$labelWidth = props.labelWidth,
      labelWidth = _props$labelWidth === void 0 ? 100 : _props$labelWidth,
      _props$submitText = props.submitText,
      submitText = _props$submitText === void 0 ? '提交' : _props$submitText,
      _props$resetText = props.resetText,
      resetText = _props$resetText === void 0 ? '重置' : _props$resetText;

  var _useState = useState(createFormValues(items)),
      _useState2 = _slicedToArray(_useState, 2),
      formValues = _useState2[0],
      setFormValues = _useState2[1];

  var _useState3 = useState({
    result: false,
    errors: {}
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      validationResult = _useState4[0],
      setValidationResult = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      validateCount = _useState6[0],
      setValidateCount = _useState6[1];

  var customItemStates = items.filter(function (item) {
    return item.itemType === FormItemType.CUSTOM;
  }).reduce(function (states, item) {
    states[item.name] = Object.create(null);
    Object.defineProperty(states[item.name], 'value', {
      get: function get() {
        return clone(formValues[item.name]);
      },
      set: function set(value) {
        formValues[item.name] = value;
      }
    });
    return states;
  }, Object.create(null));
  useEffect(function () {
    setFormValues(createFormValues(items));
    setValidationResult({
      result: false,
      errors: {}
    });
    setValidateCount(0);
  }, [items]);

  function onSubmit() {
    // console.log(items, formValues)
    var newValidationResult = validate(items, formValues); // console.log(newValidationResult)

    if (newValidationResult.result) {
      if (props.onSubmit) props.onSubmit(formValues);
      setFormValues(createFormValues(items));
    }

    setValidationResult(newValidationResult);
    setValidateCount(validateCount + 1);
  }

  function validate(items, formValues) {
    return items.reduce(function (_ref, item) {
      var result = _ref.result,
          errors = _ref.errors;
      var _ref2 = item,
          name = _ref2.name,
          labelText = _ref2.labelText;
      var value = formValues[name]; // 校验必填项

      if (shouldValidateRequired(item) && item.required) {
        if ( // 空字符串
        typeof value === 'string' && value === '' || // 空数组
        Object.prototype.toString.call(value) === '[object Array]' && value.length === 0) {
          errors[name] = "".concat(labelText, "\u4E3A\u5FC5\u586B\u9879");
          result = false;
        }
      } // 有正则表达式的话，校验正则表单时


      if (shouldValidateRegExp(item) && item.re && item.re instanceof RegExp && typeof value === 'string') {
        var re = item.re;

        if (!re.test(value) && !errors[name]) {
          errors[name] = "".concat(labelText, "\u683C\u5F0F\u4E0D\u6B63\u786E");
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

  var renderFormItem = function renderFormItem(item) {
    var itemType = item.itemType;

    switch (itemType) {
      case FormItemType.CUSTOM:
        var customItem = item;
        return customItem.render(customItem, customItemStates[customItem.name]);

      case FormItemType.SELECT:
        var selectItem = item;
        return /*#__PURE__*/React.createElement(_Select, {
          value: formValues[selectItem.name],
          onChange: function onChange(value) {
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, selectItem.name, value)));
          },
          style: {
            width: '100%'
          }
        }, selectItem.options.map(function (option, optionIndex) {
          return /*#__PURE__*/React.createElement(_Select.Option, {
            key: optionIndex,
            value: option.value
          }, option.text);
        }));

      case FormItemType.CHECKBOX:
        var checkboxItem = item;
        return /*#__PURE__*/React.createElement(_Checkbox.Group, {
          value: formValues[checkboxItem.name],
          onChange: function onChange(value) {
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, checkboxItem.name, value)));
          }
        }, checkboxItem.options.map(function (option, optionIndex) {
          return /*#__PURE__*/React.createElement(_Checkbox, {
            key: optionIndex,
            value: option.value
          }, option.text);
        }));

      case FormItemType.RADIO:
        var radioItem = item;
        return /*#__PURE__*/React.createElement(_Radio.Group, {
          value: formValues[radioItem.name],
          onChange: function onChange(e) {
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, radioItem.name, e.target.value)));
          },
          buttonStyle: radioItem.buttonStyle
        }, radioItem.options.map(function (option, optionIndex) {
          return /*#__PURE__*/React.createElement(_Radio.Button, {
            key: optionIndex,
            value: option.value
          }, option.text);
        }));

      case FormItemType.TEXTAREA:
        var textareaItem = item;
        return /*#__PURE__*/React.createElement(_Input.TextArea, {
          value: formValues[textareaItem.name],
          onChange: function onChange(e) {
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, textareaItem.name, e.target.value)));
          },
          placeholder: textareaItem.placeholder || "\u8BF7\u8F93\u5165".concat(textareaItem.labelText)
        });

      case FormItemType.NUMBER:
        var numberItem = item;
        var _numberItem$min = numberItem.min,
            min = _numberItem$min === void 0 ? 0 : _numberItem$min,
            _numberItem$max = numberItem.max,
            max = _numberItem$max === void 0 ? 100 : _numberItem$max,
            _numberItem$unit = numberItem.unit,
            unit = _numberItem$unit === void 0 ? '' : _numberItem$unit;
        return /*#__PURE__*/React.createElement(_InputNumber, {
          style: {
            width: '100%'
          },
          value: formValues[numberItem.name],
          onChange: function onChange(value) {
            value = value || min;
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, numberItem.name, value)));
          },
          min: min,
          max: max,
          formatter: function formatter(value) {
            if (!value) return "".concat(min, " ").concat(unit);
            return "".concat(value, " ").concat(unit);
          },
          parser: function parser(value) {
            if (!value) return Number(min);
            return Number(value.replace(" ".concat(unit), ''));
          }
        });

      case FormItemType.PASSWORD:
        var passwordItem = item;
        return /*#__PURE__*/React.createElement(_Input.Password, {
          prefix: passwordItem.prefix || null,
          value: formValues[passwordItem.name],
          onChange: function onChange(e) {
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, passwordItem.name, e.target.value)));
          },
          placeholder: passwordItem.placeholder || "\u8BF7\u8F93\u5165".concat(passwordItem.labelText)
        });

      default:
        var inputItem = item;
        return /*#__PURE__*/React.createElement(_Input, {
          prefix: inputItem.prefix || null,
          value: formValues[inputItem.name],
          onChange: function onChange(e) {
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, inputItem.name, e.target.value)));
          },
          placeholder: inputItem.placeholder || "\u8BF7\u8F93\u5165".concat(inputItem.labelText)
        });
    }
  };

  if (items.length === 0) return /*#__PURE__*/React.createElement(_Empty, null);
  return /*#__PURE__*/React.createElement("div", {
    className: classnames(props.className || '', 'ef-form'),
    style: _objectSpread2(_objectSpread2({}, props.style || {}), {}, {
      width: "".concat(formWidth).concat(formWidthUnit)
    })
  }, items.map(function (item, index) {
    var itemType = item.itemType;

    if ([FormItemType.INPUT, FormItemType.PASSWORD, FormItemType.NUMBER, FormItemType.TEXTAREA, FormItemType.RADIO, FormItemType.CHECKBOX, FormItemType.SELECT, FormItemType.CUSTOM].indexOf(itemType) > -1) {
      var errMsg = validationResult.errors[item.name];
      return /*#__PURE__*/React.createElement("div", {
        className: "ef-form-item",
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        className: classnames('ef-form-item-label', labelAlign === 'top' ? 'label-standalone' : ''),
        style: _objectSpread2({
          width: labelWidth
        }, labelAlign !== 'top' ? {
          textAlign: labelAlign
        } : {})
      }, item.labelText), /*#__PURE__*/React.createElement("div", {
        className: "ef-form-item-content"
      }, renderFormItem(item), /*#__PURE__*/React.createElement("div", {
        className: "ef-err-msg"
      }, errMsg)));
    }

    return null;
  }), /*#__PURE__*/React.createElement(_Divider, {
    className: "ef-divider"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: labelWidth
    }
  }, /*#__PURE__*/React.createElement(_Button, {
    type: "primary",
    onClick: onSubmit,
    style: {
      width: 90,
      marginRight: 16
    }
  }, submitText), /*#__PURE__*/React.createElement(_Button, {
    type: "default",
    onClick: function onClick() {
      return setFormValues(createFormValues(items));
    },
    style: {
      width: 90
    }
  }, resetText)));
}

export { Form, FormItemType };

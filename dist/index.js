import React, { useState, useEffect } from 'react';
import { Empty, Divider, Button, Input, InputNumber, Radio, Checkbox, Select, DatePicker } from 'antd';
import classnames from 'classnames';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

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

var FormItemType;

(function (FormItemType) {
  FormItemType["INPUT"] = "input";
  FormItemType["PASSWORD"] = "password";
  FormItemType["NUMBER"] = "number";
  FormItemType["TEXTAREA"] = "textarea";
  FormItemType["CHECKBOX"] = "checkbox";
  FormItemType["RADIO"] = "radio";
  FormItemType["SELECT"] = "select";
  FormItemType["DATEPICKER"] = "datepicker";
  FormItemType["RANGEPICKER"] = "rangepicker";
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

var isArray$1 = function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

var determineDefaultValue = function determineDefaultValue(item) {
  var isValid = function isValid(defaultValue) {
    return defaultValue !== null && defaultValue !== undefined;
  };

  switch (item.itemType) {
    case FormItemType.NUMBER:
      return isValid(item.defaultValue) ? item.defaultValue : item.min || 0;

    case FormItemType.RADIO:
      return isValid(item.defaultValue) ? item.defaultValue : item.options[0] && item.options[0].value || '';

    case FormItemType.CHECKBOX:
      return item.defaultValue || [];

    case FormItemType.SELECT:
      return isValid(item.defaultValue) ? item.defaultValue : item.options[0] && item.options[0].value || '';

    case FormItemType.DATEPICKER:
      return null;

    case FormItemType.RANGEPICKER:
      return [null, null];

    default:
      // FormItemType.INPUT, FormItemType.PASSWORD, FormItemType.TEXTAREA, FormItemType.RADIO, FormItemType.CUSTOM
      return item.defaultValue || '';
  }
};

var createFormValues = function createFormValues(items) {
  var values = items.reduce(function (values, item) {
    if ([FormItemType.INPUT, FormItemType.PASSWORD, FormItemType.NUMBER, FormItemType.TEXTAREA, FormItemType.RADIO, FormItemType.CHECKBOX, FormItemType.SELECT, FormItemType.DATEPICKER, FormItemType.RANGEPICKER, FormItemType.CUSTOM].indexOf(item.itemType) > -1) {
      return _objectSpread2(_objectSpread2({}, values), {}, _defineProperty({}, item.name, determineDefaultValue(item)));
    }

    return values;
  }, {}); // console.log('createFormValues', values)

  return values;
};

var shouldValidateRequired = function shouldValidateRequired(item) {
  return [FormItemType.INPUT, FormItemType.PASSWORD, FormItemType.TEXTAREA, FormItemType.CHECKBOX, FormItemType.RADIO, FormItemType.DATEPICKER, FormItemType.RANGEPICKER].indexOf(item.itemType) > -1;
};

var shouldValidateRegExp = function shouldValidateRegExp(item) {
  return [FormItemType.INPUT, FormItemType.PASSWORD, FormItemType.TEXTAREA].indexOf(item.itemType) > -1;
};

function Form(props) {
  var items = (props.items || []).map(function (i) {
    return _objectSpread2(_objectSpread2({}, i), {}, {
      disabled: props.disabled || i.disabled
    });
  });
  var _props$formWidth = props.formWidth,
      formWidth = _props$formWidth === void 0 ? 100 : _props$formWidth,
      _props$formWidthUnit = props.formWidthUnit,
      formWidthUnit = _props$formWidthUnit === void 0 ? '%' : _props$formWidthUnit,
      _props$labelAlign = props.labelAlign,
      labelAlign = _props$labelAlign === void 0 ? 'right' : _props$labelAlign,
      _props$labelWidth = props.labelWidth,
      labelWidth = _props$labelWidth === void 0 ? 100 : _props$labelWidth,
      _props$submitText = props.submitText,
      submitText = _props$submitText === void 0 ? '提交' : _props$submitText,
      _props$resetText = props.resetText,
      resetText = _props$resetText === void 0 ? '重置' : _props$resetText,
      _props$resetAfterSubm = props.resetAfterSubmit,
      resetAfterSubmit = _props$resetAfterSubm === void 0 ? false : _props$resetAfterSubm,
      _props$hideResetButto = props.hideResetButton,
      hideResetButton = _props$hideResetButto === void 0 ? false : _props$hideResetButto;

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
    onReset();
  }, [props]);

  function resolveOptions() {
    return _resolveOptions.apply(this, arguments);
  }

  function _resolveOptions() {
    _resolveOptions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var i, item;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              i = 0;

            case 1:
              if (!(i < items.length)) {
                _context.next = 10;
                break;
              }

              item = items[i];

              if (!(item.itemType === FormItemType.SELECT && item.getOptions)) {
                _context.next = 7;
                break;
              }

              _context.next = 6;
              return item.getOptions();

            case 6:
              item.options = _context.sent;

            case 7:
              i++;
              _context.next = 1;
              break;

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _resolveOptions.apply(this, arguments);
  }

  function onReset() {
    return _onReset.apply(this, arguments);
  }

  function _onReset() {
    _onReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return resolveOptions();

            case 2:
              setFormValues(createFormValues(items));
              setValidationResult({
                result: false,
                errors: {}
              });
              setValidateCount(0);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _onReset.apply(this, arguments);
  }

  function onSubmit() {
    // console.log(items, formValues)
    var newValidationResult = validate(items, formValues); // console.log(newValidationResult)

    if (newValidationResult.result) {
      if (props.onSubmit) props.onSubmit(formValues);
      if (resetAfterSubmit) setFormValues(createFormValues(items));
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
        if (value == null || value === undefined || // 空字符串
        typeof value === 'string' && value === '' || // 空数组
        Object.prototype.toString.call(value) === '[object Array]' && value.length === 0 || // 校验 range picker
        item.itemType === FormItemType.RANGEPICKER && (isArray$1(value) && value[0] === null && value[1] === null || !isArray$1(value))) {
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

      case FormItemType.RANGEPICKER:
        var rangepickerItem = item;
        return /*#__PURE__*/React.createElement(DatePicker.RangePicker, {
          disabled: rangepickerItem.disabled,
          style: {
            width: '100%'
          },
          value: formValues[rangepickerItem.name],
          onChange: function onChange(dates) {
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, rangepickerItem.name, dates)));
          }
        });

      case FormItemType.DATEPICKER:
        var datepickerItem = item;
        return /*#__PURE__*/React.createElement(DatePicker, {
          disabled: datepickerItem.disabled,
          style: {
            width: '100%'
          },
          value: formValues[datepickerItem.name],
          onChange: function onChange(date) {
            if (date !== null) {
              setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, datepickerItem.name, date)));
            }
          }
        });

      case FormItemType.SELECT:
        var selectItem = item;
        return /*#__PURE__*/React.createElement(Select, {
          disabled: selectItem.disabled,
          value: formValues[selectItem.name],
          onChange: function onChange(value) {
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, selectItem.name, value)));
          },
          style: {
            width: '100%'
          }
        }, selectItem.options.map(function (option, optionIndex) {
          return /*#__PURE__*/React.createElement(Select.Option, {
            key: optionIndex,
            value: option.value
          }, option.text);
        }));

      case FormItemType.CHECKBOX:
        var checkboxItem = item;
        return /*#__PURE__*/React.createElement(Checkbox.Group, {
          disabled: checkboxItem.disabled,
          value: formValues[checkboxItem.name],
          onChange: function onChange(value) {
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, checkboxItem.name, value)));
          }
        }, checkboxItem.options.map(function (option, optionIndex) {
          return /*#__PURE__*/React.createElement(Checkbox, {
            key: optionIndex,
            value: option.value
          }, option.text);
        }));

      case FormItemType.RADIO:
        var radioItem = item;
        return /*#__PURE__*/React.createElement(Radio.Group, {
          disabled: radioItem.disabled,
          value: formValues[radioItem.name],
          onChange: function onChange(e) {
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, radioItem.name, e.target.value)));
          },
          buttonStyle: radioItem.buttonStyle
        }, radioItem.options.map(function (option, optionIndex) {
          return /*#__PURE__*/React.createElement(Radio.Button, {
            key: optionIndex,
            value: option.value
          }, option.text);
        }));

      case FormItemType.TEXTAREA:
        var textareaItem = item;
        return /*#__PURE__*/React.createElement(Input.TextArea, {
          disabled: textareaItem.disabled,
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
            _numberItem$step = numberItem.step,
            step = _numberItem$step === void 0 ? 1 : _numberItem$step,
            _numberItem$unit = numberItem.unit,
            unit = _numberItem$unit === void 0 ? '' : _numberItem$unit;
        return /*#__PURE__*/React.createElement(InputNumber, {
          disabled: numberItem.disabled,
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
          step: step,
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
        return /*#__PURE__*/React.createElement(Input.Password, {
          disabled: passwordItem.disabled,
          prefix: passwordItem.prefix || null,
          value: formValues[passwordItem.name],
          onChange: function onChange(e) {
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, passwordItem.name, e.target.value)));
          },
          placeholder: passwordItem.placeholder || "\u8BF7\u8F93\u5165".concat(passwordItem.labelText)
        });

      default:
        var inputItem = item;
        return /*#__PURE__*/React.createElement(Input, {
          disabled: inputItem.disabled,
          prefix: inputItem.prefix || null,
          value: formValues[inputItem.name],
          onChange: function onChange(e) {
            setFormValues(_objectSpread2(_objectSpread2({}, formValues), {}, _defineProperty({}, inputItem.name, e.target.value)));
          },
          placeholder: inputItem.placeholder || "\u8BF7\u8F93\u5165".concat(inputItem.labelText)
        });
    }
  };

  if (items.length === 0) return /*#__PURE__*/React.createElement(Empty, null);
  return /*#__PURE__*/React.createElement("div", {
    className: classnames(props.className || '', 'ef-form'),
    style: _objectSpread2(_objectSpread2({}, props.style || {}), {}, {
      width: "".concat(formWidth).concat(formWidthUnit)
    })
  }, items.filter(function (item) {
    return !item.hidden;
  }).map(function (item, index) {
    var itemType = item.itemType;

    if ([FormItemType.INPUT, FormItemType.PASSWORD, FormItemType.NUMBER, FormItemType.TEXTAREA, FormItemType.RADIO, FormItemType.CHECKBOX, FormItemType.SELECT, FormItemType.DATEPICKER, FormItemType.RANGEPICKER, FormItemType.CUSTOM].indexOf(itemType) > -1) {
      var errMsg = validationResult.errors[item.name];
      return /*#__PURE__*/React.createElement("div", {
        className: "ef-form-item",
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        className: classnames('ef-form-item-label', labelAlign === 'top' ? 'label-standalone' : '', {
          'required': shouldValidateRequired(item) && item.required
        }),
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
  }), props.disabled ? null : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Divider, {
    className: "ef-divider"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: labelWidth
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: onSubmit,
    style: {
      width: 90,
      marginRight: 16
    }
  }, submitText), hideResetButton ? null : /*#__PURE__*/React.createElement(Button, {
    type: "default",
    onClick: onReset,
    style: {
      width: 90
    }
  }, resetText))));
}

export { Form, FormItemType };

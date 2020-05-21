!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react"),require("antd"),require("classnames")):"function"==typeof define&&define.amd?define(["exports","react","antd","classnames"],t):t((e=e||self).AntdEasyForm={},e.React,e.antd,e.classNames)}(this,(function(e,t,r,n){"use strict";var a,o="default"in t?t.default:t;function i(e,t,r,n,a,o,i){try{var u=e[o](i),l=u.value}catch(e){return void r(e)}u.done?t(l):Promise.resolve(l).then(n,a)}function u(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function u(e){i(o,n,a,u,l,"next",e)}function l(e){i(o,n,a,u,l,"throw",e)}u(void 0)}))}}function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==u.return||u.return()}finally{if(a)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function f(e){return"[object Object]"===Object.prototype.toString.call(e)}function d(e){return"[object Array]"===Object.prototype.toString.call(e)}function y(e){return"[object Date]"===Object.prototype.toString.call(e)}function T(e){return"[object RegExp]"===Object.prototype.toString.call(e)}n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n,(a=e.FormItemType||(e.FormItemType={})).INPUT="input",a.PASSWORD="password",a.NUMBER="number",a.TEXTAREA="textarea",a.CHECKBOX="checkbox",a.RADIO="radio",a.SELECT="select",a.DATEPICKER="datepicker",a.RANGEPICKER="rangepicker",a.CUSTOM="custom";var b=function(e){return"[object Array]"===Object.prototype.toString.call(e)},E=function(t){return t.reduce((function(t,r){return[e.FormItemType.INPUT,e.FormItemType.PASSWORD,e.FormItemType.NUMBER,e.FormItemType.TEXTAREA,e.FormItemType.RADIO,e.FormItemType.CHECKBOX,e.FormItemType.SELECT,e.FormItemType.DATEPICKER,e.FormItemType.RANGEPICKER,e.FormItemType.CUSTOM].indexOf(r.itemType)>-1?m(m({},t),{},l({},r.name,function(t){var r=function(e){return null!=e};switch(t.itemType){case e.FormItemType.NUMBER:return r(t.defaultValue)?t.defaultValue:t.min||0;case e.FormItemType.RADIO:return r(t.defaultValue)?t.defaultValue:t.options[0]&&t.options[0].value||"";case e.FormItemType.CHECKBOX:return t.defaultValue||[];case e.FormItemType.SELECT:return r(t.defaultValue)?t.defaultValue:t.options[0]&&t.options[0].value||"";case e.FormItemType.DATEPICKER:return null;case e.FormItemType.RANGEPICKER:return[null,null];default:return t.defaultValue||""}}(r))):t}),{})},v=function(t){return[e.FormItemType.INPUT,e.FormItemType.PASSWORD,e.FormItemType.TEXTAREA,e.FormItemType.CHECKBOX,e.FormItemType.RADIO,e.FormItemType.DATEPICKER,e.FormItemType.RANGEPICKER].indexOf(t.itemType)>-1};e.Form=function(a){var i=(a.items||[]).map((function(e){return m(m({},e),{},{disabled:a.disabled})})),c=a.formWidth,p=void 0===c?100:c,I=a.formWidthUnit,h=void 0===I?"%":I,O=a.labelAlign,g=void 0===O?"right":O,R=a.labelWidth,F=void 0===R?100:R,A=a.submitText,C=void 0===A?"提交":A,S=a.resetText,P=void 0===S?"重置":S,x=a.resetAfterSubmit,j=void 0!==x&&x,w=a.hideResetButton,D=void 0!==w&&w,N=s(t.useState(E(i)),2),k=N[0],K=N[1],U=s(t.useState({result:!1,errors:{}}),2),B=U[0],M=U[1],X=s(t.useState(0),2),G=X[0],W=X[1],V=i.filter((function(t){return t.itemType===e.FormItemType.CUSTOM})).reduce((function(e,t){return e[t.name]=Object.create(null),Object.defineProperty(e[t.name],"value",{get:function(){return function e(t){if("function"==typeof t)throw new TypeError("source should not be a function.");if(!f(t))return t;var r={};for(var n in t)if(t.hasOwnProperty(n))if(y(t[n]))r[n]=new Date(t[n].getTime());else if(T(t[n])){var a=[];t[n].global&&a.push("g"),t[n].ignoreCase&&a.push("i"),t[n].multiline&&a.push("m"),r[n]=new RegExp(t[n].source,a.join(""))}else d(t[n])?r[n]=t[n].map((function(t){return e(t)})):f(t[n])?r[n]=e(t[n]):r[n]=t[n];return r}(k[t.name])},set:function(e){k[t.name]=e}}),e}),Object.create(null));function L(){return q.apply(this,arguments)}function q(){return(q=u(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=0;case 1:if(!(r<i.length)){t.next=10;break}if((n=i[r]).itemType!==e.FormItemType.SELECT||!n.getOptions){t.next=7;break}return t.next=6,n.getOptions();case 6:n.options=t.sent;case 7:r++,t.next=1;break;case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function H(){return _.apply(this,arguments)}function _(){return(_=u(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L();case 2:K(E(i)),M({result:!1,errors:{}}),W(0);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return t.useEffect((function(){H()}),[a]),0===i.length?o.createElement(r.Empty,null):o.createElement("div",{className:n(a.className||"","ef-form"),style:m(m({},a.style||{}),{},{width:"".concat(p).concat(h)})},i.filter((function(e){return!e.hidden})).map((function(t,a){var i=t.itemType;if([e.FormItemType.INPUT,e.FormItemType.PASSWORD,e.FormItemType.NUMBER,e.FormItemType.TEXTAREA,e.FormItemType.RADIO,e.FormItemType.CHECKBOX,e.FormItemType.SELECT,e.FormItemType.DATEPICKER,e.FormItemType.RANGEPICKER,e.FormItemType.CUSTOM].indexOf(i)>-1){var u=B.errors[t.name];return o.createElement("div",{className:"ef-form-item",key:a},o.createElement("div",{className:n("ef-form-item-label","top"===g?"label-standalone":"",{required:v(t)&&t.required}),style:m({width:F},"top"!==g?{textAlign:g}:{})},t.labelText),o.createElement("div",{className:"ef-form-item-content"},function(t){switch(t.itemType){case e.FormItemType.CUSTOM:var n=t;return n.render(n,V[n.name]);case e.FormItemType.RANGEPICKER:var a=t;return o.createElement(r.DatePicker.RangePicker,{disabled:a.disabled,style:{width:"100%"},value:k[a.name],onChange:function(e){K(m(m({},k),{},l({},a.name,e)))}});case e.FormItemType.DATEPICKER:var i=t;return o.createElement(r.DatePicker,{disabled:i.disabled,style:{width:"100%"},value:k[i.name],onChange:function(e){null!==e&&K(m(m({},k),{},l({},i.name,e)))}});case e.FormItemType.SELECT:var u=t;return o.createElement(r.Select,{disabled:u.disabled,value:k[u.name],onChange:function(e){K(m(m({},k),{},l({},u.name,e)))},style:{width:"100%"}},u.options.map((function(e,t){return o.createElement(r.Select.Option,{key:t,value:e.value},e.text)})));case e.FormItemType.CHECKBOX:var c=t;return o.createElement(r.Checkbox.Group,{disabled:c.disabled,value:k[c.name],onChange:function(e){K(m(m({},k),{},l({},c.name,e)))}},c.options.map((function(e,t){return o.createElement(r.Checkbox,{key:t,value:e.value},e.text)})));case e.FormItemType.RADIO:var s=t;return o.createElement(r.Radio.Group,{disabled:s.disabled,value:k[s.name],onChange:function(e){K(m(m({},k),{},l({},s.name,e.target.value)))},buttonStyle:s.buttonStyle},s.options.map((function(e,t){return o.createElement(r.Radio.Button,{key:t,value:e.value},e.text)})));case e.FormItemType.TEXTAREA:var p=t;return o.createElement(r.Input.TextArea,{disabled:p.disabled,value:k[p.name],onChange:function(e){K(m(m({},k),{},l({},p.name,e.target.value)))},placeholder:p.placeholder||"请输入".concat(p.labelText)});case e.FormItemType.NUMBER:var f=t,d=f.min,y=void 0===d?0:d,T=f.max,b=void 0===T?100:T,E=f.step,v=void 0===E?1:E,I=f.unit,h=void 0===I?"":I;return o.createElement(r.InputNumber,{disabled:f.disabled,style:{width:"100%"},value:k[f.name],onChange:function(e){e=e||y,K(m(m({},k),{},l({},f.name,e)))},min:y,max:b,step:v,formatter:function(e){return e?"".concat(e," ").concat(h):"".concat(y," ").concat(h)},parser:function(e){return Number(e?e.replace(" ".concat(h),""):y)}});case e.FormItemType.PASSWORD:var O=t;return o.createElement(r.Input.Password,{disabled:O.disabled,prefix:O.prefix||null,value:k[O.name],onChange:function(e){K(m(m({},k),{},l({},O.name,e.target.value)))},placeholder:O.placeholder||"请输入".concat(O.labelText)});default:var g=t;return o.createElement(r.Input,{disabled:g.disabled,prefix:g.prefix||null,value:k[g.name],onChange:function(e){K(m(m({},k),{},l({},g.name,e.target.value)))},placeholder:g.placeholder||"请输入".concat(g.labelText)})}}(t),o.createElement("div",{className:"ef-err-msg"},u)))}return null})),o.createElement(r.Divider,{className:"ef-divider"}),o.createElement("div",{style:{paddingLeft:F}},o.createElement(r.Button,{type:"primary",onClick:function(){var t=function(t,r){return t.reduce((function(t,n){var a=t.result,o=t.errors,i=n,u=i.name,l=i.labelText,c=r[u];(v(n)&&n.required&&(null==c||void 0===c||"string"==typeof c&&""===c||"[object Array]"===Object.prototype.toString.call(c)&&0===c.length||n.itemType===e.FormItemType.RANGEPICKER&&(b(c)&&null===c[0]&&null===c[1]||!b(c)))&&(o[u]="".concat(l,"为必填项"),a=!1),function(t){return[e.FormItemType.INPUT,e.FormItemType.PASSWORD,e.FormItemType.TEXTAREA].indexOf(t.itemType)>-1}(n)&&n.re&&n.re instanceof RegExp&&"string"==typeof c)&&(n.re.test(c)||o[u]||(o[u]="".concat(l,"格式不正确"),a=!1));return{result:a,errors:o}}),{result:!0,errors:{}})}(i,k);t.result&&(a.onSubmit&&a.onSubmit(k),j&&K(E(i))),M(t),W(G+1)},style:{width:90,marginRight:16}},C),D?null:o.createElement(r.Button,{type:"default",onClick:H,style:{width:90}},P)))},Object.defineProperty(e,"__esModule",{value:!0})}));

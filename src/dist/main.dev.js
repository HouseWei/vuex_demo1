"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _antDesignVue = _interopRequireDefault(require("ant-design-vue"));

require("ant-design-vue/dist/antd.css");

var _index = _interopRequireDefault(require("./store/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 1. 导入 ant-design-vue 组件库
// 2. 导入组件库的样式表
_vue["default"].config.productionTip = false; // 3. 安装组件库

_vue["default"].use(_antDesignVue["default"]);

new _vue["default"]({
  store: _index["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');
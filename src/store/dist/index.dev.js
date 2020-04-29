"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框的内容
    inputValue: 'aaa',
    // 下一个 id
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList: function initList(state, list) {
      state.list = list;
    },
    // 为store中的 inputValue赋值
    setInputValue: function setInputValue(state, val) {
      state.inputValue = val;
    },
    // 添加列表项
    addItem: function addItem(state) {
      var obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      };
      state.list.push(obj);
      state.nextId++;
      state.inputValue = '';
    },
    // 根据 id删除对应的任务对象
    removeId: function removeId(state, id) {
      // 根据id查找对应项的索引
      var i = state.list.findIndex(function (x) {
        return x.id === id;
      }); // 根据索引,删除对应的元素

      if (i !== -1) {
        state.list.splice(i, 1);
      }
    },
    // 修改列表项的选中状态
    changeStatus: function changeStatus(state, param) {
      var i = state.list.findIndex(function (x) {
        return x.id === param.id;
      });

      if (i !== -1) {
        state.list[i].done = param.status;
      }
    },
    // 清除已完成的任务
    cleanDone: function cleanDone(state) {
      state.list = state.list.filter(function (x) {
        return x.done === false;
      });
    },
    // 修改视图的关键字
    changeViewKey: function changeViewKey(state, key) {
      state.viewKey = key;
    }
  },
  actions: {
    getList: function getList(context) {
      _axios["default"].get('/list.json').then(function (_ref) {
        var data = _ref.data;
        // console.log(data)
        context.commit('initList', data);
      });
    }
  },
  getters: {
    // 统计未完成任务条数
    unDoneLength: function unDoneLength(state) {
      return state.list.filter(function (x) {
        return x.done === false;
      }).length;
    },
    //
    infoList: function infoList(state) {
      if (state.viewKey === 'all') {
        return state.list;
      }

      if (state.viewKey === 'unDone') {
        return state.list.filter(function (x) {
          return !x.done;
        });
      }

      if (state.viewKey === 'done') {
        return state.list.filter(function (x) {
          return x.done;
        });
      }

      return state.list;
    }
  }
});

exports["default"] = _default;
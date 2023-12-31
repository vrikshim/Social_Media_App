"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = menuReducer;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _useList = require("../useList");
function menuReducer(state, action) {
  if (action.type === _useList.ListActionTypes.itemHover) {
    return state;
  }
  const newState = (0, _useList.listReducer)(state, action);

  // make sure an item is always highlighted
  if (newState.highlightedValue === null && action.context.items.length > 0) {
    return (0, _extends2.default)({}, newState, {
      highlightedValue: action.context.items[0]
    });
  }
  if (action.type === _useList.ListActionTypes.keyDown) {
    if (action.event.key === 'Escape') {
      return (0, _extends2.default)({}, newState, {
        open: false
      });
    }
  }
  if (action.type === _useList.ListActionTypes.blur) {
    var _action$context$listb;
    if (!((_action$context$listb = action.context.listboxRef.current) != null && _action$context$listb.contains(action.event.relatedTarget))) {
      return (0, _extends2.default)({}, newState, {
        open: false,
        highlightedValue: action.context.items[0]
      });
    }
  }
  return newState;
}
import _extends from "@babel/runtime/helpers/esm/extends";
import { ListActionTypes, listReducer } from '../useList';
export default function menuReducer(state, action) {
  if (action.type === ListActionTypes.itemHover) {
    return state;
  }
  const newState = listReducer(state, action);

  // make sure an item is always highlighted
  if (newState.highlightedValue === null && action.context.items.length > 0) {
    return _extends({}, newState, {
      highlightedValue: action.context.items[0]
    });
  }
  if (action.type === ListActionTypes.keyDown) {
    if (action.event.key === 'Escape') {
      return _extends({}, newState, {
        open: false
      });
    }
  }
  if (action.type === ListActionTypes.blur) {
    var _action$context$listb;
    if (!((_action$context$listb = action.context.listboxRef.current) != null && _action$context$listb.contains(action.event.relatedTarget))) {
      return _extends({}, newState, {
        open: false,
        highlightedValue: action.context.items[0]
      });
    }
  }
  return newState;
}
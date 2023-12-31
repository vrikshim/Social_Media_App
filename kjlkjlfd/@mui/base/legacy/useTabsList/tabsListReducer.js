import _extends from "@babel/runtime/helpers/esm/extends";
import { listReducer, ListActionTypes, moveHighlight } from '../useList';
import { TabsListActionTypes } from './useTabsList.types';
export default function tabsListReducer(state, action) {
  if (action.type === TabsListActionTypes.valueChange) {
    return _extends({}, state, {
      highlightedValue: action.value
    });
  }
  var newState = listReducer(state, action);
  var selectionFollowsFocus = action.context.selectionFollowsFocus;
  if (action.type === ListActionTypes.itemsChange) {
    if (newState.selectedValues.length > 0) {
      return _extends({}, newState, {
        highlightedValue: newState.selectedValues[0]
      });
    }
    moveHighlight(null, 'reset', action.context);
  }
  if (selectionFollowsFocus && newState.highlightedValue != null) {
    return _extends({}, newState, {
      selectedValues: [newState.highlightedValue]
    });
  }
  return newState;
}
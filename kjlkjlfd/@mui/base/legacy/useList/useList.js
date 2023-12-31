import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { ListActionTypes } from './listActions.types';
import defaultReducer from './listReducer';
import useListChangeNotifiers from './useListChangeNotifiers';
import useControllableReducer from '../utils/useControllableReducer';
import areArraysEqual from '../utils/areArraysEqual';
import useLatest from '../utils/useLatest';
import useTextNavigation from '../utils/useTextNavigation';
var EMPTY_OBJECT = {};
var NOOP = function NOOP() {};
var defaultItemComparer = function defaultItemComparer(optionA, optionB) {
  return optionA === optionB;
};
var defaultIsItemDisabled = function defaultIsItemDisabled() {
  return false;
};
var defaultItemStringifier = function defaultItemStringifier(item) {
  return typeof item === 'string' ? item : String(item);
};
var defaultGetInitialState = function defaultGetInitialState() {
  return {
    highlightedValue: null,
    selectedValues: []
  };
};

/**
 * The useList is a lower-level utility that is used to build list-like components.
 * It's used to manage the state of the list and its items.
 *
 * Supports highlighting a single item and selecting an arbitrary number of items.
 *
 * The state of the list is managed by a controllable reducer - that is a reducer that can have its state
 * controlled from outside.
 *
 * By default, the state consists of `selectedValues` and `highlightedValue` but can be extended by the caller of the hook.
 * Also the actions that can be dispatched and the reducer function can be defined externally.
 *
 * @template ItemValue The type of the item values.
 * @template State The type of the list state. This should be a subtype of `ListState<ItemValue>`.
 * @template CustomAction The type of the actions that can be dispatched (besides the standard ListAction).
 * @template CustomActionContext The shape of additional properties that will be added to actions when dispatched.
 *
 * @ignore - internal hook.
 */
function useList(params) {
  var _params$controlledPro = params.controlledProps,
    controlledProps = _params$controlledPro === void 0 ? EMPTY_OBJECT : _params$controlledPro,
    _params$disabledItems = params.disabledItemsFocusable,
    disabledItemsFocusable = _params$disabledItems === void 0 ? false : _params$disabledItems,
    _params$disableListWr = params.disableListWrap,
    disableListWrap = _params$disableListWr === void 0 ? false : _params$disableListWr,
    _params$focusManageme = params.focusManagement,
    focusManagement = _params$focusManageme === void 0 ? 'activeDescendant' : _params$focusManageme,
    _params$getInitialSta = params.getInitialState,
    getInitialState = _params$getInitialSta === void 0 ? defaultGetInitialState : _params$getInitialSta,
    getItemDomElement = params.getItemDomElement,
    getItemId = params.getItemId,
    _params$isItemDisable = params.isItemDisabled,
    isItemDisabled = _params$isItemDisable === void 0 ? defaultIsItemDisabled : _params$isItemDisable,
    externalListRef = params.rootRef,
    _params$onStateChange = params.onStateChange,
    onStateChange = _params$onStateChange === void 0 ? NOOP : _params$onStateChange,
    items = params.items,
    _params$itemComparer = params.itemComparer,
    itemComparer = _params$itemComparer === void 0 ? defaultItemComparer : _params$itemComparer,
    _params$getItemAsStri = params.getItemAsString,
    getItemAsString = _params$getItemAsStri === void 0 ? defaultItemStringifier : _params$getItemAsStri,
    onChange = params.onChange,
    onHighlightChange = params.onHighlightChange,
    _params$orientation = params.orientation,
    orientation = _params$orientation === void 0 ? 'vertical' : _params$orientation,
    _params$pageSize = params.pageSize,
    pageSize = _params$pageSize === void 0 ? 5 : _params$pageSize,
    _params$reducerAction = params.reducerActionContext,
    reducerActionContext = _params$reducerAction === void 0 ? EMPTY_OBJECT : _params$reducerAction,
    _params$selectionMode = params.selectionMode,
    selectionMode = _params$selectionMode === void 0 ? 'single' : _params$selectionMode,
    externalReducer = params.stateReducer;
  if (process.env.NODE_ENV !== 'production') {
    if (focusManagement === 'DOM' && getItemDomElement == null) {
      throw new Error('useList: The `getItemDomElement` prop is required when using the `DOM` focus management.');
    }
    if (focusManagement === 'activeDescendant' && getItemId == null) {
      throw new Error('useList: The `getItemId` prop is required when using the `activeDescendant` focus management.');
    }
  }
  var listRef = React.useRef(null);
  var handleRef = useForkRef(externalListRef, listRef);
  var handleHighlightChange = React.useCallback(function (event, value, reason) {
    onHighlightChange == null ? void 0 : onHighlightChange(event, value, reason);
    if (focusManagement === 'DOM' && value != null && (reason === ListActionTypes.itemClick || reason === ListActionTypes.keyDown || reason === ListActionTypes.textNavigation)) {
      var _getItemDomElement;
      getItemDomElement == null ? void 0 : (_getItemDomElement = getItemDomElement(value)) == null ? void 0 : _getItemDomElement.focus();
    }
  }, [getItemDomElement, onHighlightChange, focusManagement]);
  var stateComparers = React.useMemo(function () {
    return {
      highlightedValue: itemComparer,
      selectedValues: function selectedValues(valuesArray1, valuesArray2) {
        return areArraysEqual(valuesArray1, valuesArray2, itemComparer);
      }
    };
  }, [itemComparer]);

  // This gets called whenever a reducer changes the state.
  var handleStateChange = React.useCallback(function (event, field, value, reason, state) {
    onStateChange == null ? void 0 : onStateChange(event, field, value, reason, state);
    switch (field) {
      case 'highlightedValue':
        handleHighlightChange(event, value, reason);
        break;
      case 'selectedValues':
        onChange == null ? void 0 : onChange(event, value, reason);
        break;
      default:
        break;
    }
  }, [handleHighlightChange, onChange, onStateChange]);

  // The following object is added to each action when it's dispatched.
  // It's accessible in the reducer via the `action.context` field.
  var listActionContext = React.useMemo(function () {
    return {
      disabledItemsFocusable: disabledItemsFocusable,
      disableListWrap: disableListWrap,
      focusManagement: focusManagement,
      isItemDisabled: isItemDisabled,
      itemComparer: itemComparer,
      items: items,
      getItemAsString: getItemAsString,
      onHighlightChange: handleHighlightChange,
      orientation: orientation,
      pageSize: pageSize,
      selectionMode: selectionMode,
      stateComparers: stateComparers
    };
  }, [disabledItemsFocusable, disableListWrap, focusManagement, isItemDisabled, itemComparer, items, getItemAsString, handleHighlightChange, orientation, pageSize, selectionMode, stateComparers]);
  var initialState = getInitialState();
  var reducer = externalReducer != null ? externalReducer : defaultReducer;
  var actionContext = React.useMemo(function () {
    return _extends({}, reducerActionContext, listActionContext);
  }, [reducerActionContext, listActionContext]);
  var _useControllableReduc = useControllableReducer({
      reducer: reducer,
      actionContext: actionContext,
      initialState: initialState,
      controlledProps: controlledProps,
      stateComparers: stateComparers,
      onStateChange: handleStateChange
    }),
    _useControllableReduc2 = _slicedToArray(_useControllableReduc, 2),
    state = _useControllableReduc2[0],
    dispatch = _useControllableReduc2[1];
  var highlightedValue = state.highlightedValue,
    selectedValues = state.selectedValues;
  var handleTextNavigation = useTextNavigation(function (searchString, event) {
    return dispatch({
      type: ListActionTypes.textNavigation,
      event: event,
      searchString: searchString
    });
  });

  // introducing refs to avoid recreating the getItemState function on each change.
  var latestSelectedValues = useLatest(selectedValues);
  var latestHighlightedValue = useLatest(highlightedValue);
  var previousItems = React.useRef([]);
  React.useEffect(function () {
    // Whenever the `items` object changes, we need to determine if the actual items changed.
    // If they did, we need to dispatch an `itemsChange` action, so the selected/highlighted state is updated.
    if (areArraysEqual(previousItems.current, items, itemComparer)) {
      return;
    }
    dispatch({
      type: ListActionTypes.itemsChange,
      event: null,
      items: items,
      previousItems: previousItems.current
    });
    previousItems.current = items;
  }, [items, itemComparer, dispatch]);

  // Subitems are notified of changes to the highlighted and selected values.
  // This is not done via context because we don't want to trigger a re-render of all the subitems each time any of them changes state.
  // Instead, we use a custom message bus to publish messages about changes.
  // On the child component, we use a custom hook to subscribe to these messages and re-render only when the value they care about changes.
  var _useListChangeNotifie = useListChangeNotifiers(),
    notifySelectionChanged = _useListChangeNotifie.notifySelectionChanged,
    notifyHighlightChanged = _useListChangeNotifie.notifyHighlightChanged,
    registerHighlightChangeHandler = _useListChangeNotifie.registerHighlightChangeHandler,
    registerSelectionChangeHandler = _useListChangeNotifie.registerSelectionChangeHandler;
  React.useEffect(function () {
    notifySelectionChanged(selectedValues);
  }, [selectedValues, notifySelectionChanged]);
  React.useEffect(function () {
    notifyHighlightChanged(highlightedValue);
  }, [highlightedValue, notifyHighlightChanged]);
  var createHandleKeyDown = function createHandleKeyDown(other) {
    return function (event) {
      var _other$onKeyDown;
      (_other$onKeyDown = other.onKeyDown) == null ? void 0 : _other$onKeyDown.call(other, event);
      if (event.defaultMuiPrevented) {
        return;
      }
      var keysToPreventDefault = ['Home', 'End', 'PageUp', 'PageDown'];
      if (orientation === 'vertical') {
        keysToPreventDefault.push('ArrowUp', 'ArrowDown');
      } else {
        keysToPreventDefault.push('ArrowLeft', 'ArrowRight');
      }
      if (focusManagement === 'activeDescendant') {
        // When the child element is focused using the activeDescendant attribute,
        // the list handles keyboard events on its behalf.
        // We have to `preventDefault()` is this case to prevent the browser from
        // scrolling the view when space is pressed or submitting forms when enter is pressed.
        keysToPreventDefault.push(' ', 'Enter');
      }
      if (keysToPreventDefault.includes(event.key)) {
        event.preventDefault();
      }
      dispatch({
        type: ListActionTypes.keyDown,
        key: event.key,
        event: event
      });
      handleTextNavigation(event);
    };
  };
  var createHandleBlur = function createHandleBlur(other) {
    return function (event) {
      var _other$onBlur, _listRef$current;
      (_other$onBlur = other.onBlur) == null ? void 0 : _other$onBlur.call(other, event);
      if (event.defaultMuiPrevented) {
        return;
      }
      if ((_listRef$current = listRef.current) != null && _listRef$current.contains(event.relatedTarget)) {
        // focus remains within the list
        return;
      }
      dispatch({
        type: ListActionTypes.blur,
        event: event
      });
    };
  };
  var getRootProps = function getRootProps() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({}, otherHandlers, {
      'aria-activedescendant': focusManagement === 'activeDescendant' && highlightedValue != null ? getItemId(highlightedValue) : undefined,
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers),
      tabIndex: focusManagement === 'DOM' ? -1 : 0,
      ref: handleRef
    });
  };
  var getItemState = React.useCallback(function (item) {
    var _latestSelectedValues;
    var index = items.findIndex(function (i) {
      return itemComparer(i, item);
    });
    var selected = ((_latestSelectedValues = latestSelectedValues.current) != null ? _latestSelectedValues : []).some(function (value) {
      return value != null && itemComparer(item, value);
    });
    var disabled = isItemDisabled(item, index);
    var highlighted = latestHighlightedValue.current != null && itemComparer(item, latestHighlightedValue.current);
    var focusable = focusManagement === 'DOM';
    return {
      disabled: disabled,
      focusable: focusable,
      highlighted: highlighted,
      index: index,
      selected: selected
    };
  }, [items, isItemDisabled, itemComparer, latestSelectedValues, latestHighlightedValue, focusManagement]);
  var contextValue = React.useMemo(function () {
    return {
      dispatch: dispatch,
      getItemState: getItemState,
      registerHighlightChangeHandler: registerHighlightChangeHandler,
      registerSelectionChangeHandler: registerSelectionChangeHandler
    };
  }, [dispatch, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler]);
  React.useDebugValue({
    state: state
  });
  return {
    contextValue: contextValue,
    dispatch: dispatch,
    getRootProps: getRootProps,
    rootRef: handleRef,
    state: state
  };
}
export default useList;
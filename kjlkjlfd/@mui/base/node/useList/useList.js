"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _listActions = require("./listActions.types");
var _listReducer = _interopRequireDefault(require("./listReducer"));
var _useListChangeNotifiers = _interopRequireDefault(require("./useListChangeNotifiers"));
var _useControllableReducer = _interopRequireDefault(require("../utils/useControllableReducer"));
var _areArraysEqual = _interopRequireDefault(require("../utils/areArraysEqual"));
var _useLatest = _interopRequireDefault(require("../utils/useLatest"));
var _useTextNavigation = _interopRequireDefault(require("../utils/useTextNavigation"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const EMPTY_OBJECT = {};
const NOOP = () => {};
const defaultItemComparer = (optionA, optionB) => optionA === optionB;
const defaultIsItemDisabled = () => false;
const defaultItemStringifier = item => typeof item === 'string' ? item : String(item);
const defaultGetInitialState = () => ({
  highlightedValue: null,
  selectedValues: []
});

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
  const {
    controlledProps = EMPTY_OBJECT,
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = 'activeDescendant',
    getInitialState = defaultGetInitialState,
    getItemDomElement,
    getItemId,
    isItemDisabled = defaultIsItemDisabled,
    rootRef: externalListRef,
    onStateChange = NOOP,
    items,
    itemComparer = defaultItemComparer,
    getItemAsString = defaultItemStringifier,
    onChange,
    onHighlightChange,
    orientation = 'vertical',
    pageSize = 5,
    reducerActionContext = EMPTY_OBJECT,
    selectionMode = 'single',
    stateReducer: externalReducer
  } = params;
  if (process.env.NODE_ENV !== 'production') {
    if (focusManagement === 'DOM' && getItemDomElement == null) {
      throw new Error('useList: The `getItemDomElement` prop is required when using the `DOM` focus management.');
    }
    if (focusManagement === 'activeDescendant' && getItemId == null) {
      throw new Error('useList: The `getItemId` prop is required when using the `activeDescendant` focus management.');
    }
  }
  const listRef = React.useRef(null);
  const handleRef = (0, _utils.unstable_useForkRef)(externalListRef, listRef);
  const handleHighlightChange = React.useCallback((event, value, reason) => {
    onHighlightChange == null ? void 0 : onHighlightChange(event, value, reason);
    if (focusManagement === 'DOM' && value != null && (reason === _listActions.ListActionTypes.itemClick || reason === _listActions.ListActionTypes.keyDown || reason === _listActions.ListActionTypes.textNavigation)) {
      var _getItemDomElement;
      getItemDomElement == null ? void 0 : (_getItemDomElement = getItemDomElement(value)) == null ? void 0 : _getItemDomElement.focus();
    }
  }, [getItemDomElement, onHighlightChange, focusManagement]);
  const stateComparers = React.useMemo(() => ({
    highlightedValue: itemComparer,
    selectedValues: (valuesArray1, valuesArray2) => (0, _areArraysEqual.default)(valuesArray1, valuesArray2, itemComparer)
  }), [itemComparer]);

  // This gets called whenever a reducer changes the state.
  const handleStateChange = React.useCallback((event, field, value, reason, state) => {
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
  const listActionContext = React.useMemo(() => {
    return {
      disabledItemsFocusable,
      disableListWrap,
      focusManagement,
      isItemDisabled,
      itemComparer,
      items,
      getItemAsString,
      onHighlightChange: handleHighlightChange,
      orientation,
      pageSize,
      selectionMode,
      stateComparers
    };
  }, [disabledItemsFocusable, disableListWrap, focusManagement, isItemDisabled, itemComparer, items, getItemAsString, handleHighlightChange, orientation, pageSize, selectionMode, stateComparers]);
  const initialState = getInitialState();
  const reducer = externalReducer != null ? externalReducer : _listReducer.default;
  const actionContext = React.useMemo(() => (0, _extends2.default)({}, reducerActionContext, listActionContext), [reducerActionContext, listActionContext]);
  const [state, dispatch] = (0, _useControllableReducer.default)({
    reducer,
    actionContext,
    initialState: initialState,
    controlledProps,
    stateComparers,
    onStateChange: handleStateChange
  });
  const {
    highlightedValue,
    selectedValues
  } = state;
  const handleTextNavigation = (0, _useTextNavigation.default)((searchString, event) => dispatch({
    type: _listActions.ListActionTypes.textNavigation,
    event,
    searchString
  }));

  // introducing refs to avoid recreating the getItemState function on each change.
  const latestSelectedValues = (0, _useLatest.default)(selectedValues);
  const latestHighlightedValue = (0, _useLatest.default)(highlightedValue);
  const previousItems = React.useRef([]);
  React.useEffect(() => {
    // Whenever the `items` object changes, we need to determine if the actual items changed.
    // If they did, we need to dispatch an `itemsChange` action, so the selected/highlighted state is updated.
    if ((0, _areArraysEqual.default)(previousItems.current, items, itemComparer)) {
      return;
    }
    dispatch({
      type: _listActions.ListActionTypes.itemsChange,
      event: null,
      items,
      previousItems: previousItems.current
    });
    previousItems.current = items;
  }, [items, itemComparer, dispatch]);

  // Subitems are notified of changes to the highlighted and selected values.
  // This is not done via context because we don't want to trigger a re-render of all the subitems each time any of them changes state.
  // Instead, we use a custom message bus to publish messages about changes.
  // On the child component, we use a custom hook to subscribe to these messages and re-render only when the value they care about changes.
  const {
    notifySelectionChanged,
    notifyHighlightChanged,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  } = (0, _useListChangeNotifiers.default)();
  React.useEffect(() => {
    notifySelectionChanged(selectedValues);
  }, [selectedValues, notifySelectionChanged]);
  React.useEffect(() => {
    notifyHighlightChanged(highlightedValue);
  }, [highlightedValue, notifyHighlightChanged]);
  const createHandleKeyDown = other => event => {
    var _other$onKeyDown;
    (_other$onKeyDown = other.onKeyDown) == null ? void 0 : _other$onKeyDown.call(other, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    const keysToPreventDefault = ['Home', 'End', 'PageUp', 'PageDown'];
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
      type: _listActions.ListActionTypes.keyDown,
      key: event.key,
      event
    });
    handleTextNavigation(event);
  };
  const createHandleBlur = other => event => {
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
      type: _listActions.ListActionTypes.blur,
      event
    });
  };
  const getRootProps = (otherHandlers = {}) => {
    return (0, _extends2.default)({}, otherHandlers, {
      'aria-activedescendant': focusManagement === 'activeDescendant' && highlightedValue != null ? getItemId(highlightedValue) : undefined,
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers),
      tabIndex: focusManagement === 'DOM' ? -1 : 0,
      ref: handleRef
    });
  };
  const getItemState = React.useCallback(item => {
    var _latestSelectedValues;
    const index = items.findIndex(i => itemComparer(i, item));
    const selected = ((_latestSelectedValues = latestSelectedValues.current) != null ? _latestSelectedValues : []).some(value => value != null && itemComparer(item, value));
    const disabled = isItemDisabled(item, index);
    const highlighted = latestHighlightedValue.current != null && itemComparer(item, latestHighlightedValue.current);
    const focusable = focusManagement === 'DOM';
    return {
      disabled,
      focusable,
      highlighted,
      index,
      selected
    };
  }, [items, isItemDisabled, itemComparer, latestSelectedValues, latestHighlightedValue, focusManagement]);
  const contextValue = React.useMemo(() => ({
    dispatch,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  }), [dispatch, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler]);
  React.useDebugValue({
    state
  });
  return {
    contextValue,
    dispatch,
    getRootProps,
    rootRef: handleRef,
    state
  };
}
var _default = useList;
exports.default = _default;
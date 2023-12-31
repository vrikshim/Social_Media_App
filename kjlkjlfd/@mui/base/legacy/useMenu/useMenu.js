import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import useList from '../useList';
import { useCompoundParent } from '../utils/useCompound';
import menuReducer from './menuReducer';

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenu API](https://mui.com/base/react-menu/hooks-api/#use-menu)
 */
export default function useMenu() {
  var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultOpen = parameters.defaultOpen,
    listboxRefProp = parameters.listboxRef,
    openProp = parameters.open,
    onOpenChange = parameters.onOpenChange;
  var listboxRef = React.useRef(null);
  var handleRef = useForkRef(listboxRef, listboxRefProp);
  var _useCompoundParent = useCompoundParent(),
    subitems = _useCompoundParent.subitems,
    compoundComponentContextValue = _useCompoundParent.contextValue;
  var subitemKeys = React.useMemo(function () {
    return Array.from(subitems.keys());
  }, [subitems]);
  var getItemDomElement = React.useCallback(function (itemId) {
    var _subitems$get$ref$cur, _subitems$get;
    if (itemId == null) {
      return null;
    }
    return (_subitems$get$ref$cur = (_subitems$get = subitems.get(itemId)) == null ? void 0 : _subitems$get.ref.current) != null ? _subitems$get$ref$cur : null;
  }, [subitems]);
  var controlledProps = React.useMemo(function () {
    return {
      open: openProp
    };
  }, [openProp]);
  var stateChangeHandler = React.useCallback(function (event, field, fieldValue, reason, state) {
    if (field === 'open') {
      onOpenChange == null ? void 0 : onOpenChange(fieldValue);
      if (fieldValue === true && state.highlightedValue !== null) {
        var _subitems$get2, _subitems$get2$ref$cu;
        (_subitems$get2 = subitems.get(state.highlightedValue)) == null ? void 0 : (_subitems$get2$ref$cu = _subitems$get2.ref.current) == null ? void 0 : _subitems$get2$ref$cu.focus();
      }
    }
  }, [onOpenChange, subitems]);
  var _useList = useList({
      controlledProps: controlledProps,
      disabledItemsFocusable: true,
      focusManagement: 'DOM',
      getItemDomElement: getItemDomElement,
      getInitialState: function getInitialState() {
        return {
          selectedValues: [],
          highlightedValue: null,
          open: defaultOpen != null ? defaultOpen : false
        };
      },
      isItemDisabled: function isItemDisabled(id) {
        var _subitems$get3;
        return (subitems == null ? void 0 : (_subitems$get3 = subitems.get(id)) == null ? void 0 : _subitems$get3.disabled) || false;
      },
      items: subitemKeys,
      getItemAsString: function getItemAsString(id) {
        var _subitems$get4, _subitems$get5, _subitems$get5$ref$cu;
        return ((_subitems$get4 = subitems.get(id)) == null ? void 0 : _subitems$get4.label) || ((_subitems$get5 = subitems.get(id)) == null ? void 0 : (_subitems$get5$ref$cu = _subitems$get5.ref.current) == null ? void 0 : _subitems$get5$ref$cu.innerText);
      },
      rootRef: handleRef,
      onStateChange: stateChangeHandler,
      reducerActionContext: {
        listboxRef: listboxRef
      },
      selectionMode: 'none',
      stateReducer: menuReducer
    }),
    dispatch = _useList.dispatch,
    getRootProps = _useList.getRootProps,
    listContextValue = _useList.contextValue,
    _useList$state = _useList.state,
    open = _useList$state.open,
    highlightedValue = _useList$state.highlightedValue,
    mergedListRef = _useList.rootRef;
  React.useEffect(function () {
    if (open && highlightedValue === subitemKeys[0]) {
      var _subitems$get6, _subitems$get6$ref, _subitems$get6$ref$cu;
      (_subitems$get6 = subitems.get(subitemKeys[0])) == null ? void 0 : (_subitems$get6$ref = _subitems$get6.ref) == null ? void 0 : (_subitems$get6$ref$cu = _subitems$get6$ref.current) == null ? void 0 : _subitems$get6$ref$cu.focus();
    }
  }, [open, highlightedValue, subitems, subitemKeys]);
  React.useEffect(function () {
    var _listboxRef$current;
    // set focus to the highlighted item (but prevent stealing focus from other elements on the page)
    if ((_listboxRef$current = listboxRef.current) != null && _listboxRef$current.contains(document.activeElement) && highlightedValue !== null) {
      var _subitems$get7, _subitems$get7$ref$cu;
      subitems == null ? void 0 : (_subitems$get7 = subitems.get(highlightedValue)) == null ? void 0 : (_subitems$get7$ref$cu = _subitems$get7.ref.current) == null ? void 0 : _subitems$get7$ref$cu.focus();
    }
  }, [highlightedValue, subitems]);
  var getListboxProps = function getListboxProps() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var rootProps = getRootProps(otherHandlers);
    return _extends({}, otherHandlers, rootProps, {
      role: 'menu'
    });
  };
  React.useDebugValue({
    subitems: subitems,
    highlightedValue: highlightedValue
  });
  return {
    contextValue: _extends({}, compoundComponentContextValue, listContextValue),
    dispatch: dispatch,
    getListboxProps: getListboxProps,
    highlightedValue: highlightedValue,
    listboxRef: mergedListRef,
    menuItems: subitems,
    open: open
  };
}
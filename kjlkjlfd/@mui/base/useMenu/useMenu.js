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
export default function useMenu(parameters = {}) {
  const {
    defaultOpen,
    listboxRef: listboxRefProp,
    open: openProp,
    onOpenChange
  } = parameters;
  const listboxRef = React.useRef(null);
  const handleRef = useForkRef(listboxRef, listboxRefProp);
  const {
    subitems,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const subitemKeys = React.useMemo(() => Array.from(subitems.keys()), [subitems]);
  const getItemDomElement = React.useCallback(itemId => {
    var _subitems$get$ref$cur, _subitems$get;
    if (itemId == null) {
      return null;
    }
    return (_subitems$get$ref$cur = (_subitems$get = subitems.get(itemId)) == null ? void 0 : _subitems$get.ref.current) != null ? _subitems$get$ref$cur : null;
  }, [subitems]);
  const controlledProps = React.useMemo(() => ({
    open: openProp
  }), [openProp]);
  const stateChangeHandler = React.useCallback((event, field, fieldValue, reason, state) => {
    if (field === 'open') {
      onOpenChange == null ? void 0 : onOpenChange(fieldValue);
      if (fieldValue === true && state.highlightedValue !== null) {
        var _subitems$get2, _subitems$get2$ref$cu;
        (_subitems$get2 = subitems.get(state.highlightedValue)) == null ? void 0 : (_subitems$get2$ref$cu = _subitems$get2.ref.current) == null ? void 0 : _subitems$get2$ref$cu.focus();
      }
    }
  }, [onOpenChange, subitems]);
  const {
    dispatch,
    getRootProps,
    contextValue: listContextValue,
    state: {
      open,
      highlightedValue
    },
    rootRef: mergedListRef
  } = useList({
    controlledProps,
    disabledItemsFocusable: true,
    focusManagement: 'DOM',
    getItemDomElement,
    getInitialState: () => ({
      selectedValues: [],
      highlightedValue: null,
      open: defaultOpen != null ? defaultOpen : false
    }),
    isItemDisabled: id => {
      var _subitems$get3;
      return (subitems == null ? void 0 : (_subitems$get3 = subitems.get(id)) == null ? void 0 : _subitems$get3.disabled) || false;
    },
    items: subitemKeys,
    getItemAsString: id => {
      var _subitems$get4, _subitems$get5, _subitems$get5$ref$cu;
      return ((_subitems$get4 = subitems.get(id)) == null ? void 0 : _subitems$get4.label) || ((_subitems$get5 = subitems.get(id)) == null ? void 0 : (_subitems$get5$ref$cu = _subitems$get5.ref.current) == null ? void 0 : _subitems$get5$ref$cu.innerText);
    },
    rootRef: handleRef,
    onStateChange: stateChangeHandler,
    reducerActionContext: {
      listboxRef
    },
    selectionMode: 'none',
    stateReducer: menuReducer
  });
  React.useEffect(() => {
    if (open && highlightedValue === subitemKeys[0]) {
      var _subitems$get6, _subitems$get6$ref, _subitems$get6$ref$cu;
      (_subitems$get6 = subitems.get(subitemKeys[0])) == null ? void 0 : (_subitems$get6$ref = _subitems$get6.ref) == null ? void 0 : (_subitems$get6$ref$cu = _subitems$get6$ref.current) == null ? void 0 : _subitems$get6$ref$cu.focus();
    }
  }, [open, highlightedValue, subitems, subitemKeys]);
  React.useEffect(() => {
    var _listboxRef$current;
    // set focus to the highlighted item (but prevent stealing focus from other elements on the page)
    if ((_listboxRef$current = listboxRef.current) != null && _listboxRef$current.contains(document.activeElement) && highlightedValue !== null) {
      var _subitems$get7, _subitems$get7$ref$cu;
      subitems == null ? void 0 : (_subitems$get7 = subitems.get(highlightedValue)) == null ? void 0 : (_subitems$get7$ref$cu = _subitems$get7.ref.current) == null ? void 0 : _subitems$get7$ref$cu.focus();
    }
  }, [highlightedValue, subitems]);
  const getListboxProps = (otherHandlers = {}) => {
    const rootProps = getRootProps(otherHandlers);
    return _extends({}, otherHandlers, rootProps, {
      role: 'menu'
    });
  };
  React.useDebugValue({
    subitems,
    highlightedValue
  });
  return {
    contextValue: _extends({}, compoundComponentContextValue, listContextValue),
    dispatch,
    getListboxProps,
    highlightedValue,
    listboxRef: mergedListRef,
    menuItems: subitems,
    open
  };
}
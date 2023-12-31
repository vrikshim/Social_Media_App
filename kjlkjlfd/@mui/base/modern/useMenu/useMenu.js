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
    if (itemId == null) {
      return null;
    }
    return subitems.get(itemId)?.ref.current ?? null;
  }, [subitems]);
  const controlledProps = React.useMemo(() => ({
    open: openProp
  }), [openProp]);
  const stateChangeHandler = React.useCallback((event, field, fieldValue, reason, state) => {
    if (field === 'open') {
      onOpenChange?.(fieldValue);
      if (fieldValue === true && state.highlightedValue !== null) {
        subitems.get(state.highlightedValue)?.ref.current?.focus();
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
      open: defaultOpen ?? false
    }),
    isItemDisabled: id => subitems?.get(id)?.disabled || false,
    items: subitemKeys,
    getItemAsString: id => subitems.get(id)?.label || subitems.get(id)?.ref.current?.innerText,
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
      subitems.get(subitemKeys[0])?.ref?.current?.focus();
    }
  }, [open, highlightedValue, subitems, subitemKeys]);
  React.useEffect(() => {
    // set focus to the highlighted item (but prevent stealing focus from other elements on the page)
    if (listboxRef.current?.contains(document.activeElement) && highlightedValue !== null) {
      subitems?.get(highlightedValue)?.ref.current?.focus();
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
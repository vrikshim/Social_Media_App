import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import useForcedRerendering from '../utils/useForcedRerendering';
import { ListActionTypes } from './listActions.types';
import { ListContext } from './ListContext';

/**
 * Contains the logic for an item of a list-like component (e.g. Select, Menu, etc.).
 * It provides information about the item's state (selected, highlighted) and
 * handles the item's mouse events.
 *
 * @template ItemValue The type of the item's value. This should be consistent with the type of useList's `items` parameter.
 * @ignore - internal hook.
 */
export default function useListItem(parameters) {
  var _parameters$handlePoi = parameters.handlePointerOverEvents,
    handlePointerOverEvents = _parameters$handlePoi === void 0 ? false : _parameters$handlePoi,
    item = parameters.item,
    externalRef = parameters.rootRef;
  var itemRef = React.useRef(null);
  var handleRef = useForkRef(itemRef, externalRef);
  var listContext = React.useContext(ListContext);
  if (!listContext) {
    throw new Error('useListItem must be used within a ListProvider');
  }
  var dispatch = listContext.dispatch,
    getItemState = listContext.getItemState,
    registerHighlightChangeHandler = listContext.registerHighlightChangeHandler,
    registerSelectionChangeHandler = listContext.registerSelectionChangeHandler;
  var _getItemState = getItemState(item),
    highlighted = _getItemState.highlighted,
    selected = _getItemState.selected,
    focusable = _getItemState.focusable;
  var rerender = useForcedRerendering();
  useEnhancedEffect(function () {
    function updateHighlightedState(highlightedItem) {
      if (highlightedItem === item && !highlighted) {
        rerender();
      } else if (highlightedItem !== item && highlighted) {
        rerender();
      }
    }
    return registerHighlightChangeHandler(updateHighlightedState);
  });
  useEnhancedEffect(function () {
    function updateSelectedState(selectedItems) {
      if (!selected) {
        if (selectedItems.includes(item)) {
          rerender();
        }
      } else if (!selectedItems.includes(item)) {
        rerender();
      }
    }
    return registerSelectionChangeHandler(updateSelectedState);
  }, [registerSelectionChangeHandler, rerender, selected, item]);
  var createHandleClick = React.useCallback(function (other) {
    return function (event) {
      var _other$onClick;
      (_other$onClick = other.onClick) == null ? void 0 : _other$onClick.call(other, event);
      if (event.defaultPrevented) {
        return;
      }
      dispatch({
        type: ListActionTypes.itemClick,
        item: item,
        event: event
      });
    };
  }, [dispatch, item]);
  var createHandlePointerOver = React.useCallback(function (other) {
    return function (event) {
      var _other$onMouseOver;
      (_other$onMouseOver = other.onMouseOver) == null ? void 0 : _other$onMouseOver.call(other, event);
      if (event.defaultPrevented) {
        return;
      }
      dispatch({
        type: ListActionTypes.itemHover,
        item: item,
        event: event
      });
    };
  }, [dispatch, item]);
  var tabIndex;
  if (focusable) {
    tabIndex = highlighted ? 0 : -1;
  }
  var getRootProps = function getRootProps() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({}, otherHandlers, {
      onClick: createHandleClick(otherHandlers),
      onPointerOver: handlePointerOverEvents ? createHandlePointerOver(otherHandlers) : undefined,
      ref: handleRef,
      tabIndex: tabIndex
    });
  };
  return {
    getRootProps: getRootProps,
    highlighted: highlighted,
    rootRef: handleRef,
    selected: selected
  };
}
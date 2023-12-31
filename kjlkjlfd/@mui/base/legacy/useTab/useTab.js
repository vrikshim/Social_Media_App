import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useTabsContext } from '../Tabs';
import { useCompoundItem } from '../utils/useCompoundItem';
import { useListItem } from '../useList';
import useButton from '../useButton';
function tabValueGenerator(otherTabValues) {
  return otherTabValues.size;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTab API](https://mui.com/base/react-tabs/hooks-api/#use-tab)
 */
function useTab(parameters) {
  var valueParam = parameters.value,
    externalRef = parameters.rootRef,
    _parameters$disabled = parameters.disabled,
    disabled = _parameters$disabled === void 0 ? false : _parameters$disabled,
    idParam = parameters.id;
  var tabRef = React.useRef(null);
  var id = useId(idParam);
  var _useTabsContext = useTabsContext(),
    selectedValue = _useTabsContext.value,
    selectionFollowsFocus = _useTabsContext.selectionFollowsFocus,
    getTabPanelId = _useTabsContext.getTabPanelId;
  var tabMetadata = React.useMemo(function () {
    return {
      disabled: disabled,
      ref: tabRef,
      id: id
    };
  }, [disabled, tabRef, id]);
  var _useCompoundItem = useCompoundItem(valueParam != null ? valueParam : tabValueGenerator, tabMetadata),
    value = _useCompoundItem.id,
    index = _useCompoundItem.index,
    totalTabsCount = _useCompoundItem.totalItemCount;
  var _useListItem = useListItem({
      item: value
    }),
    getTabProps = _useListItem.getRootProps,
    listItemRefHandler = _useListItem.rootRef,
    highlighted = _useListItem.highlighted,
    selected = _useListItem.selected;
  var _useButton = useButton({
      disabled: disabled,
      focusableWhenDisabled: !selectionFollowsFocus,
      type: 'button'
    }),
    getButtonProps = _useButton.getRootProps,
    buttonRefHandler = _useButton.rootRef,
    active = _useButton.active,
    focusVisible = _useButton.focusVisible,
    setFocusVisible = _useButton.setFocusVisible;
  var handleRef = useForkRef(tabRef, externalRef, listItemRefHandler, buttonRefHandler);
  var tabPanelId = value !== undefined ? getTabPanelId(value) : undefined;
  var getRootProps = function getRootProps() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var resolvedTabProps = _extends({}, otherHandlers, getTabProps(otherHandlers));
    var resolvedButtonProps = _extends({}, resolvedTabProps, getButtonProps(resolvedTabProps));
    return _extends({}, resolvedButtonProps, {
      role: 'tab',
      'aria-controls': tabPanelId,
      'aria-selected': selected,
      id: id,
      ref: handleRef
    });
  };
  return {
    getRootProps: getRootProps,
    active: active,
    focusVisible: focusVisible,
    highlighted: highlighted,
    index: index,
    rootRef: handleRef,
    // the `selected` state isn't set on the server (it relies on effects to be calculated),
    // so we fall back to checking the `value` prop with the selectedValue from the TabsContext
    selected: selected || value === selectedValue,
    setFocusVisible: setFocusVisible,
    totalTabsCount: totalTabsCount
  };
}
export default useTab;
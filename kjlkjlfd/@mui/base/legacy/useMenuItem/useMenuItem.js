import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import useButton from '../useButton';
import { useListItem } from '../useList';
import { useCompoundItem } from '../utils/useCompoundItem';
function idGenerator(existingKeys) {
  return "menu-item-".concat(existingKeys.size);
}

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenuItem API](https://mui.com/base/react-menu/hooks-api/#use-menu-item)
 */
export default function useMenuItem(params) {
  var _params$disabled = params.disabled,
    disabled = _params$disabled === void 0 ? false : _params$disabled,
    idParam = params.id,
    externalRef = params.rootRef,
    label = params.label;
  var id = useId(idParam);
  var itemRef = React.useRef(null);
  var itemMetadata = React.useMemo(function () {
    return {
      disabled: disabled,
      id: id != null ? id : '',
      label: label,
      ref: itemRef
    };
  }, [disabled, id, label]);
  var _useListItem = useListItem({
      item: id
    }),
    getListRootProps = _useListItem.getRootProps,
    highlighted = _useListItem.highlighted,
    listItemRefHandler = _useListItem.rootRef;
  var _useCompoundItem = useCompoundItem(id != null ? id : idGenerator, itemMetadata),
    index = _useCompoundItem.index,
    totalItemCount = _useCompoundItem.totalItemCount;
  var _useButton = useButton({
      disabled: disabled,
      focusableWhenDisabled: true
    }),
    getButtonProps = _useButton.getRootProps,
    focusVisible = _useButton.focusVisible,
    buttonRefHandler = _useButton.rootRef;
  var handleRef = useForkRef(listItemRefHandler, buttonRefHandler, externalRef, itemRef);
  React.useDebugValue({
    id: id,
    highlighted: highlighted,
    disabled: disabled,
    label: label
  });

  // If `id` is undefined (during SSR in React < 18), we fall back to rendering a simplified menu item
  // which does not have access to infortmation about its position or highlighted state.
  if (id === undefined) {
    return {
      getRootProps: function getRootProps() {
        var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _extends({}, otherHandlers, getButtonProps(otherHandlers), {
          role: 'menuitem'
        });
      },
      disabled: false,
      focusVisible: focusVisible,
      highlighted: false,
      index: -1,
      totalItemCount: 0,
      rootRef: handleRef
    };
  }
  var getRootProps = function getRootProps() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var resolvedButtonProps = _extends({}, otherHandlers, getButtonProps(otherHandlers));
    var resolvedMenuItemProps = _extends({}, resolvedButtonProps, getListRootProps(resolvedButtonProps));
    return _extends({}, otherHandlers, resolvedButtonProps, resolvedMenuItemProps, {
      role: 'menuitem',
      ref: handleRef
    });
  };
  return {
    getRootProps: getRootProps,
    disabled: disabled,
    focusVisible: focusVisible,
    highlighted: highlighted,
    index: index,
    totalItemCount: totalItemCount,
    rootRef: handleRef
  };
}
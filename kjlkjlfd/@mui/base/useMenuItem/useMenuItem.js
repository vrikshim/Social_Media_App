import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import useButton from '../useButton';
import { useListItem } from '../useList';
import { useCompoundItem } from '../utils/useCompoundItem';
function idGenerator(existingKeys) {
  return `menu-item-${existingKeys.size}`;
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
  const {
    disabled = false,
    id: idParam,
    rootRef: externalRef,
    label
  } = params;
  const id = useId(idParam);
  const itemRef = React.useRef(null);
  const itemMetadata = React.useMemo(() => ({
    disabled,
    id: id != null ? id : '',
    label,
    ref: itemRef
  }), [disabled, id, label]);
  const {
    getRootProps: getListRootProps,
    highlighted,
    rootRef: listItemRefHandler
  } = useListItem({
    item: id
  });
  const {
    index,
    totalItemCount
  } = useCompoundItem(id != null ? id : idGenerator, itemMetadata);
  const {
    getRootProps: getButtonProps,
    focusVisible,
    rootRef: buttonRefHandler
  } = useButton({
    disabled,
    focusableWhenDisabled: true
  });
  const handleRef = useForkRef(listItemRefHandler, buttonRefHandler, externalRef, itemRef);
  React.useDebugValue({
    id,
    highlighted,
    disabled,
    label
  });

  // If `id` is undefined (during SSR in React < 18), we fall back to rendering a simplified menu item
  // which does not have access to infortmation about its position or highlighted state.
  if (id === undefined) {
    return {
      getRootProps: (otherHandlers = {}) => _extends({}, otherHandlers, getButtonProps(otherHandlers), {
        role: 'menuitem'
      }),
      disabled: false,
      focusVisible,
      highlighted: false,
      index: -1,
      totalItemCount: 0,
      rootRef: handleRef
    };
  }
  const getRootProps = (otherHandlers = {}) => {
    const resolvedButtonProps = _extends({}, otherHandlers, getButtonProps(otherHandlers));
    const resolvedMenuItemProps = _extends({}, resolvedButtonProps, getListRootProps(resolvedButtonProps));
    return _extends({}, otherHandlers, resolvedButtonProps, resolvedMenuItemProps, {
      role: 'menuitem',
      ref: handleRef
    });
  };
  return {
    getRootProps,
    disabled,
    focusVisible,
    highlighted,
    index,
    totalItemCount,
    rootRef: handleRef
  };
}
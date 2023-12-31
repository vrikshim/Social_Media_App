"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMenuItem;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _useButton = _interopRequireDefault(require("../useButton"));
var _useList = require("../useList");
var _useCompoundItem = require("../utils/useCompoundItem");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
function useMenuItem(params) {
  const {
    disabled = false,
    id: idParam,
    rootRef: externalRef,
    label
  } = params;
  const id = (0, _utils.unstable_useId)(idParam);
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
  } = (0, _useList.useListItem)({
    item: id
  });
  const {
    index,
    totalItemCount
  } = (0, _useCompoundItem.useCompoundItem)(id != null ? id : idGenerator, itemMetadata);
  const {
    getRootProps: getButtonProps,
    focusVisible,
    rootRef: buttonRefHandler
  } = (0, _useButton.default)({
    disabled,
    focusableWhenDisabled: true
  });
  const handleRef = (0, _utils.unstable_useForkRef)(listItemRefHandler, buttonRefHandler, externalRef, itemRef);
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
      getRootProps: (otherHandlers = {}) => (0, _extends2.default)({}, otherHandlers, getButtonProps(otherHandlers), {
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
    const resolvedButtonProps = (0, _extends2.default)({}, otherHandlers, getButtonProps(otherHandlers));
    const resolvedMenuItemProps = (0, _extends2.default)({}, resolvedButtonProps, getListRootProps(resolvedButtonProps));
    return (0, _extends2.default)({}, otherHandlers, resolvedButtonProps, resolvedMenuItemProps, {
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
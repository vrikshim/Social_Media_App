"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _menuClasses = require("./menuClasses");
var _useMenu = _interopRequireDefault(require("../useMenu"));
var _composeClasses = _interopRequireDefault(require("../composeClasses"));
var _Popper = _interopRequireDefault(require("../Popper"));
var _useSlotProps = _interopRequireDefault(require("../utils/useSlotProps"));
var _ClassNameConfigurator = require("../utils/ClassNameConfigurator");
var _MenuProvider = _interopRequireDefault(require("../useMenu/MenuProvider"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["actions", "anchorEl", "children", "defaultOpen", "listboxId", "onOpenChange", "open", "slotProps", "slots"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useUtilityClasses(ownerState) {
  const {
    open
  } = ownerState;
  const slots = {
    root: ['root', open && 'expanded'],
    listbox: ['listbox', open && 'expanded']
  };
  return (0, _composeClasses.default)(slots, (0, _ClassNameConfigurator.useClassNamesOverride)(_menuClasses.getMenuUtilityClass));
}
/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base/react-menu/)
 *
 * API:
 *
 * - [Menu API](https://mui.com/base/react-menu/components-api/#menu)
 */
const Menu = /*#__PURE__*/React.forwardRef(function Menu(props, forwardedRef) {
  var _slots$root, _slots$listbox;
  const {
      actions,
      anchorEl,
      children,
      defaultOpen,
      listboxId,
      onOpenChange,
      open: openProp,
      slotProps = {},
      slots = {}
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    contextValue,
    getListboxProps,
    dispatch,
    open
  } = (0, _useMenu.default)({
    defaultOpen,
    open: openProp,
    onOpenChange,
    listboxId
  });
  React.useImperativeHandle(actions, () => ({
    dispatch
  }), [dispatch]);
  const ownerState = (0, _extends2.default)({}, props, {
    open
  });
  const classes = useUtilityClasses(ownerState);
  const Root = (_slots$root = slots.root) != null ? _slots$root : _Popper.default;
  const rootProps = (0, _useSlotProps.default)({
    elementType: Root,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      anchorEl,
      open,
      keepMounted: true,
      role: undefined,
      ref: forwardedRef
    },
    className: classes.root,
    ownerState
  });
  const Listbox = (_slots$listbox = slots.listbox) != null ? _slots$listbox : 'ul';
  const listboxProps = (0, _useSlotProps.default)({
    elementType: Listbox,
    getSlotProps: getListboxProps,
    externalSlotProps: slotProps.listbox,
    ownerState,
    className: classes.listbox
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Root, (0, _extends2.default)({}, rootProps, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Listbox, (0, _extends2.default)({}, listboxProps, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuProvider.default, {
        value: contextValue,
        children: children
      })
    }))
  }));
});
process.env.NODE_ENV !== "production" ? Menu.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref with imperative actions.
   * It allows to select the first or last menu item.
   */
  actions: _utils.refType,
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   */
  anchorEl: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_utils.HTMLElementType, _propTypes.default.object, _propTypes.default.func]),
  /**
   * @ignore
   */
  children: _propTypes.default.node,
  /**
   * @ignore
   */
  defaultOpen: _propTypes.default.bool,
  /**
   * @ignore
   */
  listboxId: _propTypes.default.string,
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onOpenChange: _propTypes.default.func,
  /**
   * Controls whether the menu is displayed.
   * @default false
   */
  open: _propTypes.default.bool,
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
  slotProps: _propTypes.default /* @typescript-to-proptypes-ignore */.shape({
    listbox: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside the Menu.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: _propTypes.default.shape({
    listbox: _propTypes.default.elementType,
    root: _propTypes.default.elementType
  })
} : void 0;
var _default = Menu;
exports.default = _default;
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["actions", "anchorEl", "children", "defaultOpen", "listboxId", "onOpenChange", "open", "slotProps", "slots"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementType, refType } from '@mui/utils';
import { getMenuUtilityClass } from './menuClasses';
import useMenu from '../useMenu';
import composeClasses from '../composeClasses';
import Popper from '../Popper';
import useSlotProps from '../utils/useSlotProps';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import MenuProvider from '../useMenu/MenuProvider';
import { jsx as _jsx } from "react/jsx-runtime";
function useUtilityClasses(ownerState) {
  const {
    open
  } = ownerState;
  const slots = {
    root: ['root', open && 'expanded'],
    listbox: ['listbox', open && 'expanded']
  };
  return composeClasses(slots, useClassNamesOverride(getMenuUtilityClass));
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
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    contextValue,
    getListboxProps,
    dispatch,
    open
  } = useMenu({
    defaultOpen,
    open: openProp,
    onOpenChange,
    listboxId
  });
  React.useImperativeHandle(actions, () => ({
    dispatch
  }), [dispatch]);
  const ownerState = _extends({}, props, {
    open
  });
  const classes = useUtilityClasses(ownerState);
  const Root = slots.root ?? Popper;
  const rootProps = useSlotProps({
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
  const Listbox = slots.listbox ?? 'ul';
  const listboxProps = useSlotProps({
    elementType: Listbox,
    getSlotProps: getListboxProps,
    externalSlotProps: slotProps.listbox,
    ownerState,
    className: classes.listbox
  });
  return /*#__PURE__*/_jsx(Root, _extends({}, rootProps, {
    children: /*#__PURE__*/_jsx(Listbox, _extends({}, listboxProps, {
      children: /*#__PURE__*/_jsx(MenuProvider, {
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
  actions: refType,
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   */
  anchorEl: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([HTMLElementType, PropTypes.object, PropTypes.func]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  defaultOpen: PropTypes.bool,
  /**
   * @ignore
   */
  listboxId: PropTypes.string,
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onOpenChange: PropTypes.func,
  /**
   * Controls whether the menu is displayed.
   * @default false
   */
  open: PropTypes.bool,
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
  slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Menu.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    root: PropTypes.elementType
  })
} : void 0;
export default Menu;
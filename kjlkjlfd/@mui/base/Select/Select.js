import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["autoFocus", "children", "defaultValue", "defaultListboxOpen", "disabled", "getSerializedValue", "listboxId", "listboxOpen", "multiple", "name", "onChange", "onListboxOpenChange", "getOptionAsString", "renderValue", "slotProps", "slots", "value"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import useSelect from '../useSelect';
import { useSlotProps } from '../utils';
import Popper from '../Popper';
import composeClasses from '../composeClasses';
import { getSelectUtilityClass } from './selectClasses';
import defaultOptionStringifier from '../useSelect/defaultOptionStringifier';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import SelectProvider from '../useSelect/SelectProvider';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function defaultRenderValue(selectedOptions) {
  var _selectedOptions$labe;
  if (Array.isArray(selectedOptions)) {
    return /*#__PURE__*/_jsx(React.Fragment, {
      children: selectedOptions.map(o => o.label).join(', ')
    });
  }
  return (_selectedOptions$labe = selectedOptions == null ? void 0 : selectedOptions.label) != null ? _selectedOptions$labe : '';
}
function defaultFormValueProvider(selectedOption) {
  if (Array.isArray(selectedOption)) {
    if (selectedOption.length === 0) {
      return '';
    }
    if (selectedOption.every(o => typeof o.value === 'string' || typeof o.value === 'number' || typeof o.value === 'boolean')) {
      return selectedOption.map(o => String(o.value));
    }
    return JSON.stringify(selectedOption.map(o => o.value));
  }
  if ((selectedOption == null ? void 0 : selectedOption.value) == null) {
    return '';
  }
  if (typeof selectedOption.value === 'string' || typeof selectedOption.value === 'number') {
    return selectedOption.value;
  }
  return JSON.stringify(selectedOption.value);
}
function useUtilityClasses(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible', active && 'active', open && 'expanded'],
    listbox: ['listbox', disabled && 'disabled'],
    popper: ['popper']
  };
  return composeClasses(slots, useClassNamesOverride(getSelectUtilityClass));
}

/**
 * The foundation for building custom-styled select components.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base/react-select/)
 *
 * API:
 *
 * - [Select API](https://mui.com/base/react-select/components-api/#select)
 */
const Select = /*#__PURE__*/React.forwardRef(function Select(props, forwardedRef) {
  var _slots$root, _slots$listbox, _slots$popper;
  const {
      autoFocus,
      children,
      defaultValue,
      defaultListboxOpen = false,
      disabled: disabledProp,
      getSerializedValue = defaultFormValueProvider,
      listboxId,
      listboxOpen: listboxOpenProp,
      multiple = false,
      name,
      onChange,
      onListboxOpenChange,
      getOptionAsString = defaultOptionStringifier,
      renderValue: renderValueProp,
      slotProps = {},
      slots = {},
      value: valueProp
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const renderValue = renderValueProp != null ? renderValueProp : defaultRenderValue;
  const [buttonDefined, setButtonDefined] = React.useState(false);
  const buttonRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const Button = (_slots$root = slots.root) != null ? _slots$root : 'button';
  const ListboxRoot = (_slots$listbox = slots.listbox) != null ? _slots$listbox : 'ul';
  const PopperComponent = (_slots$popper = slots.popper) != null ? _slots$popper : Popper;
  const handleButtonRefChange = React.useCallback(element => {
    setButtonDefined(element != null);
  }, []);
  const handleButtonRef = useForkRef(forwardedRef, buttonRef, handleButtonRefChange);
  React.useEffect(() => {
    if (autoFocus) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);
  const {
    buttonActive,
    buttonFocusVisible,
    contextValue,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionMetadata,
    value,
    open
  } = useSelect({
    buttonRef: handleButtonRef,
    defaultOpen: defaultListboxOpen,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    multiple,
    open: listboxOpenProp,
    onChange,
    onOpenChange: onListboxOpenChange,
    getOptionAsString,
    value: valueProp
  });
  const ownerState = _extends({}, props, {
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open,
    multiple,
    renderValue,
    value
  });
  const classes = useUtilityClasses(ownerState);
  const buttonProps = useSlotProps({
    elementType: Button,
    getSlotProps: getButtonProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root
  });
  const listboxProps = useSlotProps({
    elementType: ListboxRoot,
    getSlotProps: getListboxProps,
    externalSlotProps: slotProps.listbox,
    additionalProps: {
      ref: listboxRef
    },
    ownerState,
    className: classes.listbox
  });
  const popperProps = useSlotProps({
    elementType: PopperComponent,
    externalSlotProps: slotProps.popper,
    additionalProps: {
      anchorEl: buttonRef.current,
      keepMounted: true,
      open,
      placement: 'bottom-start',
      role: undefined
    },
    ownerState,
    className: classes.popper
  });
  let selectedOptionsMetadata;
  if (multiple) {
    selectedOptionsMetadata = value.map(v => getOptionMetadata(v)).filter(o => o !== undefined);
  } else {
    var _getOptionMetadata;
    selectedOptionsMetadata = (_getOptionMetadata = getOptionMetadata(value)) != null ? _getOptionMetadata : null;
  }
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(Button, _extends({}, buttonProps, {
      children: renderValue(selectedOptionsMetadata)
    })), buttonDefined && /*#__PURE__*/_jsx(PopperComponent, _extends({}, popperProps, {
      children: /*#__PURE__*/_jsx(ListboxRoot, _extends({}, listboxProps, {
        children: /*#__PURE__*/_jsx(SelectProvider, {
          value: contextValue,
          children: children
        })
      }))
    })), name && /*#__PURE__*/_jsx("input", {
      type: "hidden",
      name: name,
      value: getSerializedValue(selectedOptionsMetadata)
    })]
  });
});
process.env.NODE_ENV !== "production" ? Select.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: PropTypes.bool,
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * A function used to convert the option label to a string.
   * It's useful when labels are elements and need to be converted to plain text
   * to enable navigation using character keys on a keyboard.
   *
   * @default defaultOptionStringifier
   */
  getOptionAsString: PropTypes.func,
  /**
   * A function to convert the currently selected value to a string.
   * Used to set a value of a hidden input associated with the select,
   * so that the selected value can be posted with a form.
   */
  getSerializedValue: PropTypes.func,
  /**
   * `id` attribute of the listbox element.
   */
  listboxId: PropTypes.string,
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen: PropTypes.bool,
  /**
   * If `true`, selecting multiple values is allowed.
   * This affects the type of the `value`, `defaultValue`, and `onChange` props.
   *
   * @default false
   */
  multiple: PropTypes.bool,
  /**
   * Name of the element. For example used by the server to identify the fields in form submits.
   * If the name is provided, the component will render a hidden input element that can be submitted to a server.
   */
  name: PropTypes.string,
  /**
   * Callback fired when an option is selected.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: PropTypes.func,
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue: PropTypes.func,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    listbox: PropTypes.elementType,
    popper: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes.any
} : void 0;
export default Select;
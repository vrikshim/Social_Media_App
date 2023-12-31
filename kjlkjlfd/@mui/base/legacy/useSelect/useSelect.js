import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import useButton from '../useButton';
import { SelectActionTypes } from './useSelect.types';
import useList from '../useList';
import defaultOptionStringifier from './defaultOptionStringifier';
import { useCompoundParent } from '../utils/useCompound';
import selectReducer from './selectReducer';
import combineHooksSlotProps from '../utils/combineHooksSlotProps';
function preventDefault(event) {
  event.preventDefault();
}

/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/base/react-select/#hooks)
 *
 * API:
 *
 * - [useSelect API](https://mui.com/base/react-select/hooks-api/#use-select)
 */
function useSelect(props) {
  var buttonRefProp = props.buttonRef,
    _props$defaultOpen = props.defaultOpen,
    defaultOpen = _props$defaultOpen === void 0 ? false : _props$defaultOpen,
    defaultValueProp = props.defaultValue,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    listboxIdProp = props.listboxId,
    listboxRefProp = props.listboxRef,
    _props$multiple = props.multiple,
    multiple = _props$multiple === void 0 ? false : _props$multiple,
    onChange = props.onChange,
    onHighlightChange = props.onHighlightChange,
    onOpenChange = props.onOpenChange,
    openProp = props.open,
    optionsParam = props.options,
    _props$getOptionAsStr = props.getOptionAsString,
    getOptionAsString = _props$getOptionAsStr === void 0 ? defaultOptionStringifier : _props$getOptionAsStr,
    valueProp = props.value;
  var buttonRef = React.useRef(null);
  var handleButtonRef = useForkRef(buttonRefProp, buttonRef);
  var listboxRef = React.useRef(null);
  var listboxId = useId(listboxIdProp);
  var defaultValue;
  if (valueProp === undefined && defaultValueProp === undefined) {
    defaultValue = [];
  } else if (defaultValueProp !== undefined) {
    if (multiple) {
      defaultValue = defaultValueProp;
    } else {
      defaultValue = defaultValueProp == null ? [] : [defaultValueProp];
    }
  }
  var value = React.useMemo(function () {
    if (valueProp !== undefined) {
      if (multiple) {
        return valueProp;
      }
      return valueProp == null ? [] : [valueProp];
    }
    return undefined;
  }, [valueProp, multiple]);
  var _useCompoundParent = useCompoundParent(),
    subitems = _useCompoundParent.subitems,
    compoundComponentContextValue = _useCompoundParent.contextValue;
  var options = React.useMemo(function () {
    if (optionsParam != null) {
      return new Map(optionsParam.map(function (option, index) {
        return [option.value, {
          value: option.value,
          label: option.label,
          disabled: option.disabled,
          ref: /*#__PURE__*/React.createRef(),
          id: "".concat(listboxId, "_").concat(index)
        }];
      }));
    }
    return subitems;
  }, [optionsParam, subitems, listboxId]);
  var handleListboxRef = useForkRef(listboxRefProp, listboxRef);
  var _useButton = useButton({
      disabled: disabled,
      rootRef: handleButtonRef
    }),
    getButtonRootProps = _useButton.getRootProps,
    buttonActive = _useButton.active,
    buttonFocusVisible = _useButton.focusVisible,
    mergedButtonRef = _useButton.rootRef;
  var optionValues = React.useMemo(function () {
    return Array.from(options.keys());
  }, [options]);
  var isItemDisabled = React.useCallback(function (valueToCheck) {
    var _option$disabled;
    var option = options.get(valueToCheck);
    return (_option$disabled = option == null ? void 0 : option.disabled) != null ? _option$disabled : false;
  }, [options]);
  var stringifyOption = React.useCallback(function (valueToCheck) {
    var option = options.get(valueToCheck);
    if (!option) {
      return '';
    }
    return getOptionAsString(option);
  }, [options, getOptionAsString]);
  var controlledState = React.useMemo(function () {
    return {
      selectedValues: value,
      open: openProp
    };
  }, [value, openProp]);
  var getItemId = React.useCallback(function (itemValue) {
    var _options$get;
    return (_options$get = options.get(itemValue)) == null ? void 0 : _options$get.id;
  }, [options]);
  var handleSelectionChange = React.useCallback(function (event, newValues) {
    if (multiple) {
      onChange == null ? void 0 : onChange(event, newValues);
    } else {
      var _newValues$;
      onChange == null ? void 0 : onChange(event, (_newValues$ = newValues[0]) != null ? _newValues$ : null);
    }
  }, [multiple, onChange]);
  var handleHighlightChange = React.useCallback(function (event, newValue) {
    onHighlightChange == null ? void 0 : onHighlightChange(event, newValue != null ? newValue : null);
  }, [onHighlightChange]);
  var handleStateChange = React.useCallback(function (event, field, fieldValue) {
    if (field === 'open') {
      onOpenChange == null ? void 0 : onOpenChange(fieldValue);
      if (fieldValue === false && (event == null ? void 0 : event.type) !== 'blur') {
        var _buttonRef$current;
        (_buttonRef$current = buttonRef.current) == null ? void 0 : _buttonRef$current.focus();
      }
    }
  }, [onOpenChange]);
  var useListParameters = {
    getInitialState: function getInitialState() {
      var _defaultValue;
      return {
        highlightedValue: null,
        selectedValues: (_defaultValue = defaultValue) != null ? _defaultValue : [],
        open: defaultOpen
      };
    },
    getItemId: getItemId,
    controlledProps: controlledState,
    isItemDisabled: isItemDisabled,
    rootRef: mergedButtonRef,
    onChange: handleSelectionChange,
    onHighlightChange: handleHighlightChange,
    onStateChange: handleStateChange,
    reducerActionContext: React.useMemo(function () {
      return {
        multiple: multiple
      };
    }, [multiple]),
    items: optionValues,
    getItemAsString: stringifyOption,
    selectionMode: multiple ? 'multiple' : 'single',
    stateReducer: selectReducer
  };
  var _useList = useList(useListParameters),
    dispatch = _useList.dispatch,
    getListboxRootProps = _useList.getRootProps,
    listContextValue = _useList.contextValue,
    _useList$state = _useList.state,
    open = _useList$state.open,
    highlightedOption = _useList$state.highlightedValue,
    selectedOptions = _useList$state.selectedValues,
    mergedListRootRef = _useList.rootRef;
  var createHandleButtonClick = function createHandleButtonClick(otherHandlers) {
    return function (event) {
      var _otherHandlers$onClic;
      otherHandlers == null ? void 0 : (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
      if (!event.defaultMuiPrevented) {
        var action = {
          type: SelectActionTypes.buttonClick,
          event: event
        };
        dispatch(action);
      }
    };
  };
  useEnhancedEffect(function () {
    // Scroll to the currently highlighted option.
    if (highlightedOption != null) {
      var _options$get2;
      var optionRef = (_options$get2 = options.get(highlightedOption)) == null ? void 0 : _options$get2.ref;
      if (!listboxRef.current || !(optionRef != null && optionRef.current)) {
        return;
      }
      var listboxClientRect = listboxRef.current.getBoundingClientRect();
      var optionClientRect = optionRef.current.getBoundingClientRect();
      if (optionClientRect.top < listboxClientRect.top) {
        listboxRef.current.scrollTop -= listboxClientRect.top - optionClientRect.top;
      } else if (optionClientRect.bottom > listboxClientRect.bottom) {
        listboxRef.current.scrollTop += optionClientRect.bottom - listboxClientRect.bottom;
      }
    }
  }, [highlightedOption, options]);
  var getOptionMetadata = React.useCallback(function (optionValue) {
    return options.get(optionValue);
  }, [options]);
  var getSelectTriggerProps = function getSelectTriggerProps() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({}, otherHandlers, {
      onClick: createHandleButtonClick(otherHandlers),
      ref: mergedListRootRef,
      role: 'combobox',
      'aria-expanded': open,
      'aria-controls': listboxId
    });
  };
  var getButtonProps = function getButtonProps() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var listboxAndButtonProps = combineHooksSlotProps(getButtonRootProps, getListboxRootProps);
    var combinedProps = combineHooksSlotProps(listboxAndButtonProps, getSelectTriggerProps);
    return combinedProps(otherHandlers);
  };
  var getListboxProps = function getListboxProps() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({}, otherHandlers, {
      id: listboxId,
      role: 'listbox',
      'aria-multiselectable': multiple ? 'true' : undefined,
      ref: handleListboxRef,
      onMouseDown: preventDefault // to prevent the button from losing focus when interacting with the listbox
    });
  };

  React.useDebugValue({
    selectedOptions: selectedOptions,
    highlightedOption: highlightedOption,
    open: open
  });
  var contextValue = React.useMemo(function () {
    return _extends({}, listContextValue, compoundComponentContextValue);
  }, [listContextValue, compoundComponentContextValue]);
  var selectValue;
  if (props.multiple) {
    selectValue = selectedOptions;
  } else {
    selectValue = selectedOptions.length > 0 ? selectedOptions[0] : null;
  }
  return {
    buttonActive: buttonActive,
    buttonFocusVisible: buttonFocusVisible,
    buttonRef: mergedButtonRef,
    contextValue: contextValue,
    disabled: disabled,
    dispatch: dispatch,
    getButtonProps: getButtonProps,
    getListboxProps: getListboxProps,
    getOptionMetadata: getOptionMetadata,
    listboxRef: mergedListRootRef,
    open: open,
    options: optionValues,
    value: selectValue,
    highlightedOption: highlightedOption
  };
}
export default useSelect;
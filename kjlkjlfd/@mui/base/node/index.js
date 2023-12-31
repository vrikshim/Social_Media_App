/**
 * @mui/base v5.0.0-beta.4
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Badge: true,
  Button: true,
  ClickAwayListener: true,
  unstable_composeClasses: true,
  FocusTrap: true,
  FormControl: true,
  Input: true,
  Menu: true,
  MenuItem: true,
  Modal: true,
  NoSsr: true,
  OptionGroup: true,
  Option: true,
  Popper: true,
  Portal: true,
  Select: true,
  Slider: true,
  Snackbar: true,
  Switch: true,
  TablePagination: true,
  TabPanel: true,
  TabsList: true,
  Tabs: true,
  Tab: true,
  TextareaAutosize: true,
  useAutocomplete: true,
  useBadge: true,
  useButton: true,
  useInput: true,
  useMenu: true,
  useMenuItem: true,
  useOption: true,
  useSelect: true,
  useSlider: true,
  useSnackbar: true,
  useSwitch: true,
  useTab: true,
  useTabPanel: true,
  useTabs: true,
  useTabsList: true
};
Object.defineProperty(exports, "Badge", {
  enumerable: true,
  get: function () {
    return _Badge.default;
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function () {
    return _Button.default;
  }
});
Object.defineProperty(exports, "ClickAwayListener", {
  enumerable: true,
  get: function () {
    return _ClickAwayListener.default;
  }
});
Object.defineProperty(exports, "FocusTrap", {
  enumerable: true,
  get: function () {
    return _FocusTrap.default;
  }
});
Object.defineProperty(exports, "FormControl", {
  enumerable: true,
  get: function () {
    return _FormControl.default;
  }
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function () {
    return _Input.default;
  }
});
Object.defineProperty(exports, "Menu", {
  enumerable: true,
  get: function () {
    return _Menu.default;
  }
});
Object.defineProperty(exports, "MenuItem", {
  enumerable: true,
  get: function () {
    return _MenuItem.default;
  }
});
Object.defineProperty(exports, "Modal", {
  enumerable: true,
  get: function () {
    return _Modal.default;
  }
});
Object.defineProperty(exports, "NoSsr", {
  enumerable: true,
  get: function () {
    return _NoSsr.default;
  }
});
Object.defineProperty(exports, "Option", {
  enumerable: true,
  get: function () {
    return _Option.default;
  }
});
Object.defineProperty(exports, "OptionGroup", {
  enumerable: true,
  get: function () {
    return _OptionGroup.default;
  }
});
Object.defineProperty(exports, "Popper", {
  enumerable: true,
  get: function () {
    return _Popper.default;
  }
});
Object.defineProperty(exports, "Portal", {
  enumerable: true,
  get: function () {
    return _Portal.default;
  }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function () {
    return _Select.default;
  }
});
Object.defineProperty(exports, "Slider", {
  enumerable: true,
  get: function () {
    return _Slider.default;
  }
});
Object.defineProperty(exports, "Snackbar", {
  enumerable: true,
  get: function () {
    return _Snackbar.default;
  }
});
Object.defineProperty(exports, "Switch", {
  enumerable: true,
  get: function () {
    return _Switch.default;
  }
});
Object.defineProperty(exports, "Tab", {
  enumerable: true,
  get: function () {
    return _Tab.default;
  }
});
Object.defineProperty(exports, "TabPanel", {
  enumerable: true,
  get: function () {
    return _TabPanel.default;
  }
});
Object.defineProperty(exports, "TablePagination", {
  enumerable: true,
  get: function () {
    return _TablePagination.default;
  }
});
Object.defineProperty(exports, "Tabs", {
  enumerable: true,
  get: function () {
    return _Tabs.default;
  }
});
Object.defineProperty(exports, "TabsList", {
  enumerable: true,
  get: function () {
    return _TabsList.default;
  }
});
Object.defineProperty(exports, "TextareaAutosize", {
  enumerable: true,
  get: function () {
    return _TextareaAutosize.default;
  }
});
Object.defineProperty(exports, "unstable_composeClasses", {
  enumerable: true,
  get: function () {
    return _composeClasses.default;
  }
});
Object.defineProperty(exports, "useAutocomplete", {
  enumerable: true,
  get: function () {
    return _useAutocomplete.default;
  }
});
Object.defineProperty(exports, "useBadge", {
  enumerable: true,
  get: function () {
    return _useBadge.default;
  }
});
Object.defineProperty(exports, "useButton", {
  enumerable: true,
  get: function () {
    return _useButton.default;
  }
});
Object.defineProperty(exports, "useInput", {
  enumerable: true,
  get: function () {
    return _useInput.default;
  }
});
Object.defineProperty(exports, "useMenu", {
  enumerable: true,
  get: function () {
    return _useMenu.default;
  }
});
Object.defineProperty(exports, "useMenuItem", {
  enumerable: true,
  get: function () {
    return _useMenuItem.default;
  }
});
Object.defineProperty(exports, "useOption", {
  enumerable: true,
  get: function () {
    return _useOption.default;
  }
});
Object.defineProperty(exports, "useSelect", {
  enumerable: true,
  get: function () {
    return _useSelect.default;
  }
});
Object.defineProperty(exports, "useSlider", {
  enumerable: true,
  get: function () {
    return _useSlider.default;
  }
});
Object.defineProperty(exports, "useSnackbar", {
  enumerable: true,
  get: function () {
    return _useSnackbar.default;
  }
});
Object.defineProperty(exports, "useSwitch", {
  enumerable: true,
  get: function () {
    return _useSwitch.default;
  }
});
Object.defineProperty(exports, "useTab", {
  enumerable: true,
  get: function () {
    return _useTab.default;
  }
});
Object.defineProperty(exports, "useTabPanel", {
  enumerable: true,
  get: function () {
    return _useTabPanel.default;
  }
});
Object.defineProperty(exports, "useTabs", {
  enumerable: true,
  get: function () {
    return _useTabs.default;
  }
});
Object.defineProperty(exports, "useTabsList", {
  enumerable: true,
  get: function () {
    return _useTabsList.default;
  }
});
var _utils = require("./utils");
Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});
var _Badge = _interopRequireWildcard(require("./Badge"));
Object.keys(_Badge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Badge[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Badge[key];
    }
  });
});
var _Button = _interopRequireWildcard(require("./Button"));
Object.keys(_Button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Button[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Button[key];
    }
  });
});
var _ClickAwayListener = _interopRequireDefault(require("./ClickAwayListener"));
var _composeClasses = _interopRequireDefault(require("./composeClasses"));
var _FocusTrap = _interopRequireDefault(require("./FocusTrap"));
var _FormControl = _interopRequireWildcard(require("./FormControl"));
Object.keys(_FormControl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _FormControl[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _FormControl[key];
    }
  });
});
var _Input = _interopRequireWildcard(require("./Input"));
Object.keys(_Input).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Input[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Input[key];
    }
  });
});
var _Menu = _interopRequireWildcard(require("./Menu"));
Object.keys(_Menu).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Menu[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Menu[key];
    }
  });
});
var _MenuItem = _interopRequireWildcard(require("./MenuItem"));
Object.keys(_MenuItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _MenuItem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MenuItem[key];
    }
  });
});
var _Modal = _interopRequireWildcard(require("./Modal"));
Object.keys(_Modal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Modal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Modal[key];
    }
  });
});
var _NoSsr = _interopRequireDefault(require("./NoSsr"));
var _OptionGroup = _interopRequireWildcard(require("./OptionGroup"));
Object.keys(_OptionGroup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _OptionGroup[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _OptionGroup[key];
    }
  });
});
var _Option = _interopRequireWildcard(require("./Option"));
Object.keys(_Option).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Option[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Option[key];
    }
  });
});
var _Popper = _interopRequireDefault(require("./Popper"));
var _Portal = _interopRequireDefault(require("./Portal"));
var _Select = _interopRequireWildcard(require("./Select"));
Object.keys(_Select).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Select[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Select[key];
    }
  });
});
var _Slider = _interopRequireWildcard(require("./Slider"));
Object.keys(_Slider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Slider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Slider[key];
    }
  });
});
var _Snackbar = _interopRequireWildcard(require("./Snackbar"));
Object.keys(_Snackbar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Snackbar[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Snackbar[key];
    }
  });
});
var _Switch = _interopRequireWildcard(require("./Switch"));
Object.keys(_Switch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Switch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Switch[key];
    }
  });
});
var _TablePagination = _interopRequireWildcard(require("./TablePagination"));
Object.keys(_TablePagination).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TablePagination[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TablePagination[key];
    }
  });
});
var _TabPanel = _interopRequireWildcard(require("./TabPanel"));
Object.keys(_TabPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TabPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TabPanel[key];
    }
  });
});
var _TabsList = _interopRequireWildcard(require("./TabsList"));
Object.keys(_TabsList).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TabsList[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TabsList[key];
    }
  });
});
var _Tabs = _interopRequireWildcard(require("./Tabs"));
Object.keys(_Tabs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Tabs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Tabs[key];
    }
  });
});
var _Tab = _interopRequireWildcard(require("./Tab"));
Object.keys(_Tab).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Tab[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Tab[key];
    }
  });
});
var _TextareaAutosize = _interopRequireDefault(require("./TextareaAutosize"));
var _useAutocomplete = _interopRequireWildcard(require("./useAutocomplete"));
Object.keys(_useAutocomplete).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useAutocomplete[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useAutocomplete[key];
    }
  });
});
var _useBadge = _interopRequireWildcard(require("./useBadge"));
Object.keys(_useBadge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useBadge[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useBadge[key];
    }
  });
});
var _useButton = _interopRequireWildcard(require("./useButton"));
Object.keys(_useButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useButton[key];
    }
  });
});
var _useInput = _interopRequireWildcard(require("./useInput"));
Object.keys(_useInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useInput[key];
    }
  });
});
var _useMenu = _interopRequireWildcard(require("./useMenu"));
Object.keys(_useMenu).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useMenu[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useMenu[key];
    }
  });
});
var _useMenuItem = _interopRequireWildcard(require("./useMenuItem"));
Object.keys(_useMenuItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useMenuItem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useMenuItem[key];
    }
  });
});
var _useOption = _interopRequireWildcard(require("./useOption"));
Object.keys(_useOption).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useOption[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useOption[key];
    }
  });
});
var _useSelect = _interopRequireWildcard(require("./useSelect"));
Object.keys(_useSelect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useSelect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useSelect[key];
    }
  });
});
var _useSlider = _interopRequireWildcard(require("./useSlider"));
Object.keys(_useSlider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useSlider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useSlider[key];
    }
  });
});
var _useSnackbar = _interopRequireWildcard(require("./useSnackbar"));
Object.keys(_useSnackbar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useSnackbar[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useSnackbar[key];
    }
  });
});
var _useSwitch = _interopRequireWildcard(require("./useSwitch"));
Object.keys(_useSwitch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useSwitch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useSwitch[key];
    }
  });
});
var _useTab = _interopRequireWildcard(require("./useTab"));
Object.keys(_useTab).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useTab[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useTab[key];
    }
  });
});
var _useTabPanel = _interopRequireWildcard(require("./useTabPanel"));
Object.keys(_useTabPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useTabPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useTabPanel[key];
    }
  });
});
var _useTabs = _interopRequireWildcard(require("./useTabs"));
Object.keys(_useTabs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useTabs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useTabs[key];
    }
  });
});
var _useTabsList = _interopRequireWildcard(require("./useTabsList"));
Object.keys(_useTabsList).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useTabsList[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useTabsList[key];
    }
  });
});
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
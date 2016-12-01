/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = React;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';

// import 'semantic-ui-css/semantic.css';

// import { Button } from 'semantic-ui-react/src';

// const style = {
//     margin: 12
// };

// class NewButton extends React.Component {
//     render() {
//         return (
//             // <MuiThemeProvider>
//                 // <RaisedButton label="Click Me" style={style} />
//             // </MuiThemeProvider>

//             <Button>
//                 Click Me
//             </Button>

//         );
//     }
// }

// function NewButton() {
//     return (
//         <Button>
//             Click Me
//         </Button>
//     );
// }

var NewButton = function NewButton() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { className: 'ui button' },
        'Click Me'
    );
};

/* harmony default export */ exports["a"] = NewButton;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Hello_scss__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Hello_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Hello_scss__);




// class Hello extends React.Component { // eslint-disable-line
//     render() {
//         return (
//             <h1 className={`${blueColor} ${whiteBackgroundColor}`}>
//                 Hello from sqwa and sqWaa!
//             </h1>
//         );
//     }
// }

function Hello(_ref) {
    var compiler = _ref.compiler,
        framework = _ref.framework;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h1',
        { className: __WEBPACK_IMPORTED_MODULE_1__Hello_scss__["blueColor"] + ' ' + __WEBPACK_IMPORTED_MODULE_1__Hello_scss__["whiteBackgroundColor"] },
        'Hello from ',
        compiler,
        ' and ',
        framework,
        '!'
    );
}

Hello.propTypes = {
    compiler: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
    framework: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string
};

Hello.defaultProps = {
    compiler: '',
    framework: ''
};

/* harmony default export */ exports["a"] = Hello;

/***/ },
/* 3 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = ReactDOM;

/***/ },
/* 6 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"blueColor":"Hello__blueColor___3nt0r","whiteBackgroundColor":"Hello__whiteBackgroundColor___1QyXu"};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_semantic_ui_css_semantic_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_semantic_ui_css_semantic_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_css_semantic_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Hello__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Button__ = __webpack_require__(1);



// import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();




// Components



// Styles
// import './main.css';

function App() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_Hello__["a" /* default */], null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_Button__["a" /* default */], null)
    );
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(App, null), document.getElementById('root'));

/***/ }
/******/ ]);
//# sourceMappingURL=src.32214db257d0fbcd0446.js.map
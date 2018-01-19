/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

Window.prototype.$l = function (arg) {


  if (arg instanceof NodeList) {

    const arrayOfNodes = Array.from(arg);
    return new DOMNodeCollection(arrayOfNodes);
  } else {
    const arrayOfNodes = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(arrayOfNodes);
  }
  //in case of css selectors do nothing!

};


//
// const $l = function (arg) {
//   // return Array.from(document.querySelectorAll(arg));
// };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(sInput) {
    if (sInput === undefined) {
      return this.nodes[0].innerHTML;
    } else {
       this.nodes.forEach((node) => {
        node.innerHTML = sInput;
      });
    }
  }

  empty() {
    this.html("");
  }

  append(input) {
    if (typeof input === 'string') {
      this.nodes.forEach((node) => {
       node.innerHTML = node.innerHTML + input;
     });
   } else if(input instanceof HTMLElement){
     this.nodes.forEach((node) => {
       node.innerHTML = node.innerHTML + input.outerHTML;
     });
   } else if(input instanceof DOMNodeCollection) {
     this.nodes.forEach((node) => {
       node.innerHTML = node.innerHTML + input.nodes[0].outerHTML;
     });
   }
  }

  attr(name, val) {
    if (val === undefined) {
      // console.log(this.nodes[0].attributes);
      return this.nodes[0].getAttribute(name);

    } else {
      this.nodes[0].setAttribute(name, val);
      return this.nodes;
    }
  }

  children(){
    let children = [];
    this.nodes.forEach((node) => {
      children = children.concat(Array.from(node.children));
    });

    const domChildren = new DOMNodeCollection(children);
    return domChildren;
  }
}

module.exports = DOMNodeCollection;


//So: our core function can receive either a single HTMLElement or a
//string with a CSS selector and in either case the return value will be a DOMNodeCollection.

// All the methods we implement will be applied to every node in the internal array.


/***/ })
/******/ ]);
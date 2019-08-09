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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var aelf_sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aelf-sdk */ "./node_modules/aelf-sdk/dist/aelf.umd.js");
/* harmony import */ var aelf_sdk__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(aelf_sdk__WEBPACK_IMPORTED_MODULE_2__);



/**
 * @file index.js
 * @author zmh3788
 * @description none
*/

var sha256 = aelf_sdk__WEBPACK_IMPORTED_MODULE_2___default.a.utils.sha256;
var defaultPrivateKey = 'a59c14882c023d63e84e5faf36558fdc8dbf1063eed45ce7e507f1cd9bcde1d9';
var wallet = aelf_sdk__WEBPACK_IMPORTED_MODULE_2___default.a.wallet.getWalletByPrivateKey(defaultPrivateKey);
var aelf = new aelf_sdk__WEBPACK_IMPORTED_MODULE_2___default.a(new aelf_sdk__WEBPACK_IMPORTED_MODULE_2___default.a.providers.HttpProvider('http://127.0.0.1:1235/chain'));

if (!aelf.isConnected()) {
  alert('Blockchain Node is not running.');
}

function init() {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var _ref, GenesisContractAddress, zeroC, multiTokenAddress, bingoGameAddress, multiTokenContract, bingoGameContract;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return aelf.chain.getChainStatus();

          case 2:
            _ref = _context.sent;
            GenesisContractAddress = _ref.GenesisContractAddress;
            _context.next = 6;
            return aelf.chain.contractAt(GenesisContractAddress, wallet);

          case 6:
            zeroC = _context.sent;
            _context.next = 9;
            return zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Token'));

          case 9:
            multiTokenAddress = _context.sent;
            _context.next = 12;
            return zeroC.GetContractAddressByName.call(sha256('BingoGameContract'));

          case 12:
            bingoGameAddress = _context.sent;
            _context.next = 15;
            return aelf.chain.contractAt(multiTokenAddress, wallet);

          case 15:
            multiTokenContract = _context.sent;
            _context.next = 18;
            return aelf.chain.contractAt(bingoGameAddress, wallet);

          case 18:
            bingoGameContract = _context.sent;
            return _context.abrupt("return", {
              multiTokenContract: multiTokenContract,
              bingoGameContract: bingoGameContract
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _init.apply(this, arguments);
}

init().then(function (res) {
  var multiTokenContract = res.multiTokenContract,
      bingoGameContract = res.bingoGameContract;
  var register = document.getElementById('register');
  var balance = document.getElementById('balance');
  var siteBody = document.getElementById('site-body');
  var play = document.getElementById('play');
  var bingo = document.getElementById('bingo');
  var button = document.getElementsByClassName('button');
  var balanceInput = document.getElementById('balance-input');
  var loader = document.getElementById('loader');
  var itemBalance = 0;
  var txId = 0;

  function getBalance() {
    var payload = {
      symbol: 'CARD',
      owner: wallet.address
    };
    multiTokenContract.GetBalance.call(payload, function (error, result) {
      if (result) {
        itemBalance = result.balance;
        balance.innerHTML = itemBalance;
      }
    });
  }

  register.onclick = function () {
    bingoGameContract.Register(function (error, result) {
      alert('恭喜你注册成功！');
      siteBody.style.display = 'block';
      register.style.display = 'none';
      getBalance();
    });
  };

  button[0].onclick = function () {
    balanceInput.value = 3000;
  };

  button[1].onclick = function () {
    balanceInput.value = 5000;
  };

  button[2].onclick = function () {
    balanceInput.value = parseInt(itemBalance / 2, 10);
  };

  button[3].onclick = function () {
    balanceInput.value = parseInt(itemBalance, 10);
  };

  play.onclick = function () {
    var reg = /^[1-9]\d*$/;
    var value = balanceInput.value;

    if (reg.test(parseInt(value, 10))) {
      bingoGameContract.Play({
        Value: value
      }, function (error, result) {
        if (result) {
          console.log(result);
          play.style.display = 'none';
          loader.style.display = 'inline-block';
          txId = result.TransactionId;
          setTimeout(function () {
            bingo.style.display = 'inline-block';
            loader.style.display = 'none';
          }, 20000);
          alert('耐心等待20s，出现Bingo按钮后点击查看开奖结果！');
        }
      });
    } else {
      alert('请输入大于0的正整数！');
    }
  };

  bingo.onclick = function () {
    bingoGameContract.Bingo(txId, function (error, result) {
      if (result) {
        setTimeout(function () {
          getBalance();
          play.style.display = 'inline-block';
          bingo.style.display = 'none';
        }, 4000);
        alert('等待4s, 查看余额变化！');
      }
    });
  };

  getBalance();
});

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/aelf-sdk/dist/aelf.umd.js":
/*!************************************************!*\
  !*** ./node_modules/aelf-sdk/dist/aelf.umd.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * aelf-sdk.js v3.2.4 
 * (c) 2019-2019 AElf 
 * Released under MIT License
 */
!function(e,t){ true?module.exports=t(__webpack_require__(/*! xmlhttprequest */ "./node_modules/xmlhttprequest/lib/XMLHttpRequest.js")):undefined}(window,function(__WEBPACK_EXTERNAL_MODULE__137__){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=265)}([function(e,t,r){var n=r(2),i=n.Buffer;function o(e,t){for(var r in e)t[r]=e[r]}function s(e,t,r){return i(e,t,r)}i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?e.exports=n:(o(n,t),t.Buffer=s),o(i,s),s.from=function(e,t,r){if("number"==typeof e)throw new TypeError("Argument must not be a number");return i(e,t,r)},s.alloc=function(e,t,r){if("number"!=typeof e)throw new TypeError("Argument must be a number");var n=i(e);return void 0!==t?"string"==typeof r?n.fill(t,r):n.fill(t):n.fill(0),n},s.allocUnsafe=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return i(e)},s.allocUnsafeSlow=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return n.SlowBuffer(e)}},function(e,t){"function"==typeof Object.create?e.exports=function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}))}:e.exports=function(e,t){if(t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}}},function(e,t,r){"use strict";(function(e){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var n=r(146),i=r(147),o=r(82);function s(){return f.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function a(e,t){if(s()<t)throw new RangeError("Invalid typed array length");return f.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t)).__proto__=f.prototype:(null===e&&(e=new f(t)),e.length=t),e}function f(e,t,r){if(!(f.TYPED_ARRAY_SUPPORT||this instanceof f))return new f(e,t,r);if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return h(this,e)}return c(this,e,t,r)}function c(e,t,r,n){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?function(e,t,r,n){if(t.byteLength,r<0||t.byteLength<r)throw new RangeError("'offset' is out of bounds");if(t.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");t=void 0===r&&void 0===n?new Uint8Array(t):void 0===n?new Uint8Array(t,r):new Uint8Array(t,r,n);f.TYPED_ARRAY_SUPPORT?(e=t).__proto__=f.prototype:e=d(e,t);return e}(e,t,r,n):"string"==typeof t?function(e,t,r){"string"==typeof r&&""!==r||(r="utf8");if(!f.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');var n=0|p(t,r),i=(e=a(e,n)).write(t,r);i!==n&&(e=e.slice(0,i));return e}(e,t,r):function(e,t){if(f.isBuffer(t)){var r=0|l(t.length);return 0===(e=a(e,r)).length?e:(t.copy(e,0,0,r),e)}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||(n=t.length)!=n?a(e,0):d(e,t);if("Buffer"===t.type&&o(t.data))return d(e,t.data)}var n;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e,t)}function u(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function h(e,t){if(u(t),e=a(e,t<0?0:0|l(t)),!f.TYPED_ARRAY_SUPPORT)for(var r=0;r<t;++r)e[r]=0;return e}function d(e,t){var r=t.length<0?0:0|l(t.length);e=a(e,r);for(var n=0;n<r;n+=1)e[n]=255&t[n];return e}function l(e){if(e>=s())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s().toString(16)+" bytes");return 0|e}function p(e,t){if(f.isBuffer(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var r=e.length;if(0===r)return 0;for(var n=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return U(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return F(e).length;default:if(n)return U(e).length;t=(""+t).toLowerCase(),n=!0}}function b(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function y(e,t,r,n,i){if(0===e.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=i?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(i)return-1;r=e.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof t&&(t=f.from(t,n)),f.isBuffer(t))return 0===t.length?-1:m(e,t,r,n,i);if("number"==typeof t)return t&=255,f.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):m(e,[t],r,n,i);throw new TypeError("val must be string, number or Buffer")}function m(e,t,r,n,i){var o,s=1,a=e.length,f=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return-1;s=2,a/=2,f/=2,r/=2}function c(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}if(i){var u=-1;for(o=r;o<a;o++)if(c(e,o)===c(t,-1===u?0:o-u)){if(-1===u&&(u=o),o-u+1===f)return u*s}else-1!==u&&(o-=o-u),u=-1}else for(r+f>a&&(r=a-f),o=r;o>=0;o--){for(var h=!0,d=0;d<f;d++)if(c(e,o+d)!==c(t,d)){h=!1;break}if(h)return o}return-1}function g(e,t,r,n){r=Number(r)||0;var i=e.length-r;n?(n=Number(n))>i&&(n=i):n=i;var o=t.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var s=0;s<n;++s){var a=parseInt(t.substr(2*s,2),16);if(isNaN(a))return s;e[r+s]=a}return s}function v(e,t,r,n){return q(U(t,e.length-r),e,r,n)}function _(e,t,r,n){return q(function(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}(t),e,r,n)}function w(e,t,r,n){return _(e,t,r,n)}function E(e,t,r,n){return q(F(t),e,r,n)}function S(e,t,r,n){return q(function(e,t){for(var r,n,i,o=[],s=0;s<e.length&&!((t-=2)<0);++s)r=e.charCodeAt(s),n=r>>8,i=r%256,o.push(i),o.push(n);return o}(t,e.length-r),e,r,n)}function A(e,t,r){return 0===t&&r===e.length?n.fromByteArray(e):n.fromByteArray(e.slice(t,r))}function k(e,t,r){r=Math.min(e.length,r);for(var n=[],i=t;i<r;){var o,s,a,f,c=e[i],u=null,h=c>239?4:c>223?3:c>191?2:1;if(i+h<=r)switch(h){case 1:c<128&&(u=c);break;case 2:128==(192&(o=e[i+1]))&&(f=(31&c)<<6|63&o)>127&&(u=f);break;case 3:o=e[i+1],s=e[i+2],128==(192&o)&&128==(192&s)&&(f=(15&c)<<12|(63&o)<<6|63&s)>2047&&(f<55296||f>57343)&&(u=f);break;case 4:o=e[i+1],s=e[i+2],a=e[i+3],128==(192&o)&&128==(192&s)&&128==(192&a)&&(f=(15&c)<<18|(63&o)<<12|(63&s)<<6|63&a)>65535&&f<1114112&&(u=f)}null===u?(u=65533,h=1):u>65535&&(u-=65536,n.push(u>>>10&1023|55296),u=56320|1023&u),n.push(u),i+=h}return function(e){var t=e.length;if(t<=x)return String.fromCharCode.apply(String,e);var r="",n=0;for(;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=x));return r}(n)}t.Buffer=f,t.SlowBuffer=function(e){+e!=e&&(e=0);return f.alloc(+e)},t.INSPECT_MAX_BYTES=50,f.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT?e.TYPED_ARRAY_SUPPORT:function(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(e){return!1}}(),t.kMaxLength=s(),f.poolSize=8192,f._augment=function(e){return e.__proto__=f.prototype,e},f.from=function(e,t,r){return c(null,e,t,r)},f.TYPED_ARRAY_SUPPORT&&(f.prototype.__proto__=Uint8Array.prototype,f.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&f[Symbol.species]===f&&Object.defineProperty(f,Symbol.species,{value:null,configurable:!0})),f.alloc=function(e,t,r){return function(e,t,r,n){return u(t),t<=0?a(e,t):void 0!==r?"string"==typeof n?a(e,t).fill(r,n):a(e,t).fill(r):a(e,t)}(null,e,t,r)},f.allocUnsafe=function(e){return h(null,e)},f.allocUnsafeSlow=function(e){return h(null,e)},f.isBuffer=function(e){return!(null==e||!e._isBuffer)},f.compare=function(e,t){if(!f.isBuffer(e)||!f.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var r=e.length,n=t.length,i=0,o=Math.min(r,n);i<o;++i)if(e[i]!==t[i]){r=e[i],n=t[i];break}return r<n?-1:n<r?1:0},f.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},f.concat=function(e,t){if(!o(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return f.alloc(0);var r;if(void 0===t)for(t=0,r=0;r<e.length;++r)t+=e[r].length;var n=f.allocUnsafe(t),i=0;for(r=0;r<e.length;++r){var s=e[r];if(!f.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(n,i),i+=s.length}return n},f.byteLength=p,f.prototype._isBuffer=!0,f.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)b(this,t,t+1);return this},f.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)b(this,t,t+3),b(this,t+1,t+2);return this},f.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)b(this,t,t+7),b(this,t+1,t+6),b(this,t+2,t+5),b(this,t+3,t+4);return this},f.prototype.toString=function(){var e=0|this.length;return 0===e?"":0===arguments.length?k(this,0,e):function(e,t,r){var n=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return M(this,t,r);case"utf8":case"utf-8":return k(this,t,r);case"ascii":return I(this,t,r);case"latin1":case"binary":return T(this,t,r);case"base64":return A(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return O(this,t,r);default:if(n)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),n=!0}}.apply(this,arguments)},f.prototype.equals=function(e){if(!f.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===f.compare(this,e)},f.prototype.inspect=function(){var e="",r=t.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(e+=" ... ")),"<Buffer "+e+">"},f.prototype.compare=function(e,t,r,n,i){if(!f.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),t<0||r>e.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&t>=r)return 0;if(n>=i)return-1;if(t>=r)return 1;if(this===e)return 0;for(var o=(i>>>=0)-(n>>>=0),s=(r>>>=0)-(t>>>=0),a=Math.min(o,s),c=this.slice(n,i),u=e.slice(t,r),h=0;h<a;++h)if(c[h]!==u[h]){o=c[h],s=u[h];break}return o<s?-1:s<o?1:0},f.prototype.includes=function(e,t,r){return-1!==this.indexOf(e,t,r)},f.prototype.indexOf=function(e,t,r){return y(this,e,t,r,!0)},f.prototype.lastIndexOf=function(e,t,r){return y(this,e,t,r,!1)},f.prototype.write=function(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0,isFinite(r)?(r|=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var i=this.length-t;if((void 0===r||r>i)&&(r=i),e.length>0&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return g(this,e,t,r);case"utf8":case"utf-8":return v(this,e,t,r);case"ascii":return _(this,e,t,r);case"latin1":case"binary":return w(this,e,t,r);case"base64":return E(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return S(this,e,t,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},f.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var x=4096;function I(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;i<r;++i)n+=String.fromCharCode(127&e[i]);return n}function T(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;i<r;++i)n+=String.fromCharCode(e[i]);return n}function M(e,t,r){var n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);for(var i="",o=t;o<r;++o)i+=H(e[o]);return i}function O(e,t,r){for(var n=e.slice(t,r),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function R(e,t,r){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>r)throw new RangeError("Trying to access beyond buffer length")}function B(e,t,r,n,i,o){if(!f.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<o)throw new RangeError('"value" argument is out of bounds');if(r+n>e.length)throw new RangeError("Index out of range")}function C(e,t,r,n){t<0&&(t=65535+t+1);for(var i=0,o=Math.min(e.length-r,2);i<o;++i)e[r+i]=(t&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function P(e,t,r,n){t<0&&(t=4294967295+t+1);for(var i=0,o=Math.min(e.length-r,4);i<o;++i)e[r+i]=t>>>8*(n?i:3-i)&255}function N(e,t,r,n,i,o){if(r+n>e.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function D(e,t,r,n,o){return o||N(e,0,r,4),i.write(e,t,r,n,23,4),r+4}function j(e,t,r,n,o){return o||N(e,0,r,8),i.write(e,t,r,n,52,8),r+8}f.prototype.slice=function(e,t){var r,n=this.length;if((e=~~e)<0?(e+=n)<0&&(e=0):e>n&&(e=n),(t=void 0===t?n:~~t)<0?(t+=n)<0&&(t=0):t>n&&(t=n),t<e&&(t=e),f.TYPED_ARRAY_SUPPORT)(r=this.subarray(e,t)).__proto__=f.prototype;else{var i=t-e;r=new f(i,void 0);for(var o=0;o<i;++o)r[o]=this[o+e]}return r},f.prototype.readUIntLE=function(e,t,r){e|=0,t|=0,r||R(e,t,this.length);for(var n=this[e],i=1,o=0;++o<t&&(i*=256);)n+=this[e+o]*i;return n},f.prototype.readUIntBE=function(e,t,r){e|=0,t|=0,r||R(e,t,this.length);for(var n=this[e+--t],i=1;t>0&&(i*=256);)n+=this[e+--t]*i;return n},f.prototype.readUInt8=function(e,t){return t||R(e,1,this.length),this[e]},f.prototype.readUInt16LE=function(e,t){return t||R(e,2,this.length),this[e]|this[e+1]<<8},f.prototype.readUInt16BE=function(e,t){return t||R(e,2,this.length),this[e]<<8|this[e+1]},f.prototype.readUInt32LE=function(e,t){return t||R(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},f.prototype.readUInt32BE=function(e,t){return t||R(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},f.prototype.readIntLE=function(e,t,r){e|=0,t|=0,r||R(e,t,this.length);for(var n=this[e],i=1,o=0;++o<t&&(i*=256);)n+=this[e+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*t)),n},f.prototype.readIntBE=function(e,t,r){e|=0,t|=0,r||R(e,t,this.length);for(var n=t,i=1,o=this[e+--n];n>0&&(i*=256);)o+=this[e+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*t)),o},f.prototype.readInt8=function(e,t){return t||R(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},f.prototype.readInt16LE=function(e,t){t||R(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},f.prototype.readInt16BE=function(e,t){t||R(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},f.prototype.readInt32LE=function(e,t){return t||R(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},f.prototype.readInt32BE=function(e,t){return t||R(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},f.prototype.readFloatLE=function(e,t){return t||R(e,4,this.length),i.read(this,e,!0,23,4)},f.prototype.readFloatBE=function(e,t){return t||R(e,4,this.length),i.read(this,e,!1,23,4)},f.prototype.readDoubleLE=function(e,t){return t||R(e,8,this.length),i.read(this,e,!0,52,8)},f.prototype.readDoubleBE=function(e,t){return t||R(e,8,this.length),i.read(this,e,!1,52,8)},f.prototype.writeUIntLE=function(e,t,r,n){(e=+e,t|=0,r|=0,n)||B(this,e,t,r,Math.pow(2,8*r)-1,0);var i=1,o=0;for(this[t]=255&e;++o<r&&(i*=256);)this[t+o]=e/i&255;return t+r},f.prototype.writeUIntBE=function(e,t,r,n){(e=+e,t|=0,r|=0,n)||B(this,e,t,r,Math.pow(2,8*r)-1,0);var i=r-1,o=1;for(this[t+i]=255&e;--i>=0&&(o*=256);)this[t+i]=e/o&255;return t+r},f.prototype.writeUInt8=function(e,t,r){return e=+e,t|=0,r||B(this,e,t,1,255,0),f.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},f.prototype.writeUInt16LE=function(e,t,r){return e=+e,t|=0,r||B(this,e,t,2,65535,0),f.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):C(this,e,t,!0),t+2},f.prototype.writeUInt16BE=function(e,t,r){return e=+e,t|=0,r||B(this,e,t,2,65535,0),f.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):C(this,e,t,!1),t+2},f.prototype.writeUInt32LE=function(e,t,r){return e=+e,t|=0,r||B(this,e,t,4,4294967295,0),f.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):P(this,e,t,!0),t+4},f.prototype.writeUInt32BE=function(e,t,r){return e=+e,t|=0,r||B(this,e,t,4,4294967295,0),f.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):P(this,e,t,!1),t+4},f.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t|=0,!n){var i=Math.pow(2,8*r-1);B(this,e,t,r,i-1,-i)}var o=0,s=1,a=0;for(this[t]=255&e;++o<r&&(s*=256);)e<0&&0===a&&0!==this[t+o-1]&&(a=1),this[t+o]=(e/s>>0)-a&255;return t+r},f.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t|=0,!n){var i=Math.pow(2,8*r-1);B(this,e,t,r,i-1,-i)}var o=r-1,s=1,a=0;for(this[t+o]=255&e;--o>=0&&(s*=256);)e<0&&0===a&&0!==this[t+o+1]&&(a=1),this[t+o]=(e/s>>0)-a&255;return t+r},f.prototype.writeInt8=function(e,t,r){return e=+e,t|=0,r||B(this,e,t,1,127,-128),f.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},f.prototype.writeInt16LE=function(e,t,r){return e=+e,t|=0,r||B(this,e,t,2,32767,-32768),f.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):C(this,e,t,!0),t+2},f.prototype.writeInt16BE=function(e,t,r){return e=+e,t|=0,r||B(this,e,t,2,32767,-32768),f.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):C(this,e,t,!1),t+2},f.prototype.writeInt32LE=function(e,t,r){return e=+e,t|=0,r||B(this,e,t,4,2147483647,-2147483648),f.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):P(this,e,t,!0),t+4},f.prototype.writeInt32BE=function(e,t,r){return e=+e,t|=0,r||B(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),f.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):P(this,e,t,!1),t+4},f.prototype.writeFloatLE=function(e,t,r){return D(this,e,t,!0,r)},f.prototype.writeFloatBE=function(e,t,r){return D(this,e,t,!1,r)},f.prototype.writeDoubleLE=function(e,t,r){return j(this,e,t,!0,r)},f.prototype.writeDoubleBE=function(e,t,r){return j(this,e,t,!1,r)},f.prototype.copy=function(e,t,r,n){if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var i,o=n-r;if(this===e&&r<t&&t<n)for(i=o-1;i>=0;--i)e[i+t]=this[i+r];else if(o<1e3||!f.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)e[i+t]=this[i+r];else Uint8Array.prototype.set.call(e,this.subarray(r,r+o),t);return o},f.prototype.fill=function(e,t,r,n){if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===e.length){var i=e.charCodeAt(0);i<256&&(e=i)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!f.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;var o;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(o=t;o<r;++o)this[o]=e;else{var s=f.isBuffer(e)?e:U(new f(e,n).toString()),a=s.length;for(o=0;o<r-t;++o)this[o+t]=s[o%a]}return this};var L=/[^+\/0-9A-Za-z-_]/g;function H(e){return e<16?"0"+e.toString(16):e.toString(16)}function U(e,t){var r;t=t||1/0;for(var n=e.length,i=null,o=[],s=0;s<n;++s){if((r=e.charCodeAt(s))>55295&&r<57344){if(!i){if(r>56319){(t-=3)>-1&&o.push(239,191,189);continue}if(s+1===n){(t-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(t-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(t-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((t-=1)<0)break;o.push(r)}else if(r<2048){if((t-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function F(e){return n.toByteArray(function(e){if((e=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}(e).replace(L,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function q(e,t,r,n){for(var i=0;i<n&&!(i+r>=t.length||i>=e.length);++i)t[i+r]=e[i];return i}}).call(this,r(11))},function(e,t,r){"use strict";r.r(t),function(e){r.d(t,"base58",function(){return l}),r.d(t,"padLeft",function(){return p}),r.d(t,"padRight",function(){return b}),r.d(t,"decodeAddressRep",function(){return y}),r.d(t,"encodeAddressRep",function(){return m}),r.d(t,"isBigNumber",function(){return g}),r.d(t,"isString",function(){return v}),r.d(t,"isFunction",function(){return _}),r.d(t,"isObject",function(){return w}),r.d(t,"isBoolean",function(){return E}),r.d(t,"isJson",function(){return S}),r.d(t,"toBigNumber",function(){return A}),r.d(t,"getValueOfUnit",function(){return k}),r.d(t,"fromWei",function(){return x}),r.d(t,"toWei",function(){return I}),r.d(t,"toTwosComplement",function(){return T}),r.d(t,"uint8ArrayToHex",function(){return M}),r.d(t,"noop",function(){return O}),r.d(t,"setPath",function(){return R});var n=r(129),i=r.n(n),o=r(31),s=r.n(o),a=r(23),f=r.n(a),c=r(48),u=r.n(c),h=r(5),d=f.a.sha256,l={encode:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"hex",n=t;if("string"==typeof t&&(n=e.from(t,r)),!(n instanceof e))throw new TypeError('"data" argument must be an Array of Buffers');var i=n;return i=e.from(d(n),"hex"),i=e.from(d(i),"hex"),i=e.from(n.toString("hex")+i.slice(0,4).toString("hex"),"hex"),u.a.encode(i)},decode:function(t,r){var n=e.from(u.a.decode(t)),i=n.slice(0,-4),o=i;return o=e.from(d(o),"hex"),o=e.from(d(o),"hex"),n.slice(-4).forEach(function(e,t){if(e!==o[t])throw new Error("Invalid checksum")}),r&&(i=i.toString(r)),i}},p=function(e,t,r){var n=t-e.length+1;return new Array(n<0?0:n).join(r||"0")+e},b=function(e,t,r){var n=t-e.length+1;return e+new Array(n<0?0:n).join(r||"0")},y=function(e){if(e.indexOf("_")>-1){var t=e.split("_")[1];return l.decode(t,"hex")}return l.decode(e,"hex")},m=function(t){var r=e.from(t.replace("0x",""),"hex");return l.encode(r,"hex")},g=function(e){return e instanceof s.a||e&&e.constructor&&"BigNumber"===e.constructor.name},v=function(e){return"string"==typeof e||e&&e.constructor&&"String"===e.constructor.name},_=function(e){return"function"==typeof e},w=function(e){return null!==e&&!Array.isArray(e)&&"object"===i()(e)},E=function(e){return"boolean"==typeof e},S=function(e){try{return!!JSON.parse(e)}catch(e){return!1}},A=function(e){var t=e||0;return g(t)?t:!v(t)||0!==t.indexOf("0x")&&0!==t.indexOf("-0x")?new s.a(t.toString(10),10):new s.a(t.replace("0x",""),16)},k=function(e){var t=h.d[e?e.toLowerCase():"ether"];if(void 0===t)throw new Error("This unit doesn't exists, please use the one of the following units ".concat(JSON.stringify(h.d,null,2)));return new s.a(t,10)},x=function(e,t){var r=A(e).dividedBy(k(t));return g(e)?r:r.toString(10)},I=function(e,t){var r=A(e).times(k(t));return g(e)?r:r.toString(10)},T=function(e){var t=A(e).round();return t.lessThan(0)?new s.a(h.e,16).plus(t).plus(1):t},M=function(e){var t="";return e.forEach(function(e){var r=e.toString(16);r.length<=1&&(r="0".concat(r)),t+=r}),t},O=function(){},R=function(e,t,r){var n=t.split(".");n.reduce(function(e,t,i){return i===n.length-1?(e[t]=r,e):(e[t]={},e[t])},e)}}.call(this,r(2).Buffer)},function(e,t,r){(function(e){!function(e,t){"use strict";function n(e,t){if(!e)throw new Error(t||"Assertion failed")}function i(e,t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}function o(e,t,r){if(o.isBN(e))return e;this.negative=0,this.words=null,this.length=0,this.red=null,null!==e&&("le"!==t&&"be"!==t||(r=t,t=10),this._init(e||0,t||10,r||"be"))}var s;"object"==typeof e?e.exports=o:t.BN=o,o.BN=o,o.wordSize=26;try{s=r(164).Buffer}catch(e){}function a(e,t,r){for(var n=0,i=Math.min(e.length,r),o=t;o<i;o++){var s=e.charCodeAt(o)-48;n<<=4,n|=s>=49&&s<=54?s-49+10:s>=17&&s<=22?s-17+10:15&s}return n}function f(e,t,r,n){for(var i=0,o=Math.min(e.length,r),s=t;s<o;s++){var a=e.charCodeAt(s)-48;i*=n,i+=a>=49?a-49+10:a>=17?a-17+10:a}return i}o.isBN=function(e){return e instanceof o||null!==e&&"object"==typeof e&&e.constructor.wordSize===o.wordSize&&Array.isArray(e.words)},o.max=function(e,t){return e.cmp(t)>0?e:t},o.min=function(e,t){return e.cmp(t)<0?e:t},o.prototype._init=function(e,t,r){if("number"==typeof e)return this._initNumber(e,t,r);if("object"==typeof e)return this._initArray(e,t,r);"hex"===t&&(t=16),n(t===(0|t)&&t>=2&&t<=36);var i=0;"-"===(e=e.toString().replace(/\s+/g,""))[0]&&i++,16===t?this._parseHex(e,i):this._parseBase(e,t,i),"-"===e[0]&&(this.negative=1),this.strip(),"le"===r&&this._initArray(this.toArray(),t,r)},o.prototype._initNumber=function(e,t,r){e<0&&(this.negative=1,e=-e),e<67108864?(this.words=[67108863&e],this.length=1):e<4503599627370496?(this.words=[67108863&e,e/67108864&67108863],this.length=2):(n(e<9007199254740992),this.words=[67108863&e,e/67108864&67108863,1],this.length=3),"le"===r&&this._initArray(this.toArray(),t,r)},o.prototype._initArray=function(e,t,r){if(n("number"==typeof e.length),e.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(e.length/3),this.words=new Array(this.length);for(var i=0;i<this.length;i++)this.words[i]=0;var o,s,a=0;if("be"===r)for(i=e.length-1,o=0;i>=0;i-=3)s=e[i]|e[i-1]<<8|e[i-2]<<16,this.words[o]|=s<<a&67108863,this.words[o+1]=s>>>26-a&67108863,(a+=24)>=26&&(a-=26,o++);else if("le"===r)for(i=0,o=0;i<e.length;i+=3)s=e[i]|e[i+1]<<8|e[i+2]<<16,this.words[o]|=s<<a&67108863,this.words[o+1]=s>>>26-a&67108863,(a+=24)>=26&&(a-=26,o++);return this.strip()},o.prototype._parseHex=function(e,t){this.length=Math.ceil((e.length-t)/6),this.words=new Array(this.length);for(var r=0;r<this.length;r++)this.words[r]=0;var n,i,o=0;for(r=e.length-6,n=0;r>=t;r-=6)i=a(e,r,r+6),this.words[n]|=i<<o&67108863,this.words[n+1]|=i>>>26-o&4194303,(o+=24)>=26&&(o-=26,n++);r+6!==t&&(i=a(e,t,r+6),this.words[n]|=i<<o&67108863,this.words[n+1]|=i>>>26-o&4194303),this.strip()},o.prototype._parseBase=function(e,t,r){this.words=[0],this.length=1;for(var n=0,i=1;i<=67108863;i*=t)n++;n--,i=i/t|0;for(var o=e.length-r,s=o%n,a=Math.min(o,o-s)+r,c=0,u=r;u<a;u+=n)c=f(e,u,u+n,t),this.imuln(i),this.words[0]+c<67108864?this.words[0]+=c:this._iaddn(c);if(0!==s){var h=1;for(c=f(e,u,e.length,t),u=0;u<s;u++)h*=t;this.imuln(h),this.words[0]+c<67108864?this.words[0]+=c:this._iaddn(c)}},o.prototype.copy=function(e){e.words=new Array(this.length);for(var t=0;t<this.length;t++)e.words[t]=this.words[t];e.length=this.length,e.negative=this.negative,e.red=this.red},o.prototype.clone=function(){var e=new o(null);return this.copy(e),e},o.prototype._expand=function(e){for(;this.length<e;)this.words[this.length++]=0;return this},o.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},o.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},o.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var c=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],u=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],h=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];function d(e,t,r){r.negative=t.negative^e.negative;var n=e.length+t.length|0;r.length=n,n=n-1|0;var i=0|e.words[0],o=0|t.words[0],s=i*o,a=67108863&s,f=s/67108864|0;r.words[0]=a;for(var c=1;c<n;c++){for(var u=f>>>26,h=67108863&f,d=Math.min(c,t.length-1),l=Math.max(0,c-e.length+1);l<=d;l++){var p=c-l|0;u+=(s=(i=0|e.words[p])*(o=0|t.words[l])+h)/67108864|0,h=67108863&s}r.words[c]=0|h,f=0|u}return 0!==f?r.words[c]=0|f:r.length--,r.strip()}o.prototype.toString=function(e,t){var r;if(t=0|t||1,16===(e=e||10)||"hex"===e){r="";for(var i=0,o=0,s=0;s<this.length;s++){var a=this.words[s],f=(16777215&(a<<i|o)).toString(16);r=0!==(o=a>>>24-i&16777215)||s!==this.length-1?c[6-f.length]+f+r:f+r,(i+=2)>=26&&(i-=26,s--)}for(0!==o&&(r=o.toString(16)+r);r.length%t!=0;)r="0"+r;return 0!==this.negative&&(r="-"+r),r}if(e===(0|e)&&e>=2&&e<=36){var d=u[e],l=h[e];r="";var p=this.clone();for(p.negative=0;!p.isZero();){var b=p.modn(l).toString(e);r=(p=p.idivn(l)).isZero()?b+r:c[d-b.length]+b+r}for(this.isZero()&&(r="0"+r);r.length%t!=0;)r="0"+r;return 0!==this.negative&&(r="-"+r),r}n(!1,"Base should be between 2 and 36")},o.prototype.toNumber=function(){var e=this.words[0];return 2===this.length?e+=67108864*this.words[1]:3===this.length&&1===this.words[2]?e+=4503599627370496+67108864*this.words[1]:this.length>2&&n(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-e:e},o.prototype.toJSON=function(){return this.toString(16)},o.prototype.toBuffer=function(e,t){return n(void 0!==s),this.toArrayLike(s,e,t)},o.prototype.toArray=function(e,t){return this.toArrayLike(Array,e,t)},o.prototype.toArrayLike=function(e,t,r){var i=this.byteLength(),o=r||Math.max(1,i);n(i<=o,"byte array longer than desired length"),n(o>0,"Requested array length <= 0"),this.strip();var s,a,f="le"===t,c=new e(o),u=this.clone();if(f){for(a=0;!u.isZero();a++)s=u.andln(255),u.iushrn(8),c[a]=s;for(;a<o;a++)c[a]=0}else{for(a=0;a<o-i;a++)c[a]=0;for(a=0;!u.isZero();a++)s=u.andln(255),u.iushrn(8),c[o-a-1]=s}return c},Math.clz32?o.prototype._countBits=function(e){return 32-Math.clz32(e)}:o.prototype._countBits=function(e){var t=e,r=0;return t>=4096&&(r+=13,t>>>=13),t>=64&&(r+=7,t>>>=7),t>=8&&(r+=4,t>>>=4),t>=2&&(r+=2,t>>>=2),r+t},o.prototype._zeroBits=function(e){if(0===e)return 26;var t=e,r=0;return 0==(8191&t)&&(r+=13,t>>>=13),0==(127&t)&&(r+=7,t>>>=7),0==(15&t)&&(r+=4,t>>>=4),0==(3&t)&&(r+=2,t>>>=2),0==(1&t)&&r++,r},o.prototype.bitLength=function(){var e=this.words[this.length-1],t=this._countBits(e);return 26*(this.length-1)+t},o.prototype.zeroBits=function(){if(this.isZero())return 0;for(var e=0,t=0;t<this.length;t++){var r=this._zeroBits(this.words[t]);if(e+=r,26!==r)break}return e},o.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},o.prototype.toTwos=function(e){return 0!==this.negative?this.abs().inotn(e).iaddn(1):this.clone()},o.prototype.fromTwos=function(e){return this.testn(e-1)?this.notn(e).iaddn(1).ineg():this.clone()},o.prototype.isNeg=function(){return 0!==this.negative},o.prototype.neg=function(){return this.clone().ineg()},o.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},o.prototype.iuor=function(e){for(;this.length<e.length;)this.words[this.length++]=0;for(var t=0;t<e.length;t++)this.words[t]=this.words[t]|e.words[t];return this.strip()},o.prototype.ior=function(e){return n(0==(this.negative|e.negative)),this.iuor(e)},o.prototype.or=function(e){return this.length>e.length?this.clone().ior(e):e.clone().ior(this)},o.prototype.uor=function(e){return this.length>e.length?this.clone().iuor(e):e.clone().iuor(this)},o.prototype.iuand=function(e){var t;t=this.length>e.length?e:this;for(var r=0;r<t.length;r++)this.words[r]=this.words[r]&e.words[r];return this.length=t.length,this.strip()},o.prototype.iand=function(e){return n(0==(this.negative|e.negative)),this.iuand(e)},o.prototype.and=function(e){return this.length>e.length?this.clone().iand(e):e.clone().iand(this)},o.prototype.uand=function(e){return this.length>e.length?this.clone().iuand(e):e.clone().iuand(this)},o.prototype.iuxor=function(e){var t,r;this.length>e.length?(t=this,r=e):(t=e,r=this);for(var n=0;n<r.length;n++)this.words[n]=t.words[n]^r.words[n];if(this!==t)for(;n<t.length;n++)this.words[n]=t.words[n];return this.length=t.length,this.strip()},o.prototype.ixor=function(e){return n(0==(this.negative|e.negative)),this.iuxor(e)},o.prototype.xor=function(e){return this.length>e.length?this.clone().ixor(e):e.clone().ixor(this)},o.prototype.uxor=function(e){return this.length>e.length?this.clone().iuxor(e):e.clone().iuxor(this)},o.prototype.inotn=function(e){n("number"==typeof e&&e>=0);var t=0|Math.ceil(e/26),r=e%26;this._expand(t),r>0&&t--;for(var i=0;i<t;i++)this.words[i]=67108863&~this.words[i];return r>0&&(this.words[i]=~this.words[i]&67108863>>26-r),this.strip()},o.prototype.notn=function(e){return this.clone().inotn(e)},o.prototype.setn=function(e,t){n("number"==typeof e&&e>=0);var r=e/26|0,i=e%26;return this._expand(r+1),this.words[r]=t?this.words[r]|1<<i:this.words[r]&~(1<<i),this.strip()},o.prototype.iadd=function(e){var t,r,n;if(0!==this.negative&&0===e.negative)return this.negative=0,t=this.isub(e),this.negative^=1,this._normSign();if(0===this.negative&&0!==e.negative)return e.negative=0,t=this.isub(e),e.negative=1,t._normSign();this.length>e.length?(r=this,n=e):(r=e,n=this);for(var i=0,o=0;o<n.length;o++)t=(0|r.words[o])+(0|n.words[o])+i,this.words[o]=67108863&t,i=t>>>26;for(;0!==i&&o<r.length;o++)t=(0|r.words[o])+i,this.words[o]=67108863&t,i=t>>>26;if(this.length=r.length,0!==i)this.words[this.length]=i,this.length++;else if(r!==this)for(;o<r.length;o++)this.words[o]=r.words[o];return this},o.prototype.add=function(e){var t;return 0!==e.negative&&0===this.negative?(e.negative=0,t=this.sub(e),e.negative^=1,t):0===e.negative&&0!==this.negative?(this.negative=0,t=e.sub(this),this.negative=1,t):this.length>e.length?this.clone().iadd(e):e.clone().iadd(this)},o.prototype.isub=function(e){if(0!==e.negative){e.negative=0;var t=this.iadd(e);return e.negative=1,t._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(e),this.negative=1,this._normSign();var r,n,i=this.cmp(e);if(0===i)return this.negative=0,this.length=1,this.words[0]=0,this;i>0?(r=this,n=e):(r=e,n=this);for(var o=0,s=0;s<n.length;s++)o=(t=(0|r.words[s])-(0|n.words[s])+o)>>26,this.words[s]=67108863&t;for(;0!==o&&s<r.length;s++)o=(t=(0|r.words[s])+o)>>26,this.words[s]=67108863&t;if(0===o&&s<r.length&&r!==this)for(;s<r.length;s++)this.words[s]=r.words[s];return this.length=Math.max(this.length,s),r!==this&&(this.negative=1),this.strip()},o.prototype.sub=function(e){return this.clone().isub(e)};var l=function(e,t,r){var n,i,o,s=e.words,a=t.words,f=r.words,c=0,u=0|s[0],h=8191&u,d=u>>>13,l=0|s[1],p=8191&l,b=l>>>13,y=0|s[2],m=8191&y,g=y>>>13,v=0|s[3],_=8191&v,w=v>>>13,E=0|s[4],S=8191&E,A=E>>>13,k=0|s[5],x=8191&k,I=k>>>13,T=0|s[6],M=8191&T,O=T>>>13,R=0|s[7],B=8191&R,C=R>>>13,P=0|s[8],N=8191&P,D=P>>>13,j=0|s[9],L=8191&j,H=j>>>13,U=0|a[0],F=8191&U,q=U>>>13,z=0|a[1],K=8191&z,V=z>>>13,Y=0|a[2],G=8191&Y,W=Y>>>13,X=0|a[3],J=8191&X,$=X>>>13,Z=0|a[4],Q=8191&Z,ee=Z>>>13,te=0|a[5],re=8191&te,ne=te>>>13,ie=0|a[6],oe=8191&ie,se=ie>>>13,ae=0|a[7],fe=8191&ae,ce=ae>>>13,ue=0|a[8],he=8191&ue,de=ue>>>13,le=0|a[9],pe=8191&le,be=le>>>13;r.negative=e.negative^t.negative,r.length=19;var ye=(c+(n=Math.imul(h,F))|0)+((8191&(i=(i=Math.imul(h,q))+Math.imul(d,F)|0))<<13)|0;c=((o=Math.imul(d,q))+(i>>>13)|0)+(ye>>>26)|0,ye&=67108863,n=Math.imul(p,F),i=(i=Math.imul(p,q))+Math.imul(b,F)|0,o=Math.imul(b,q);var me=(c+(n=n+Math.imul(h,K)|0)|0)+((8191&(i=(i=i+Math.imul(h,V)|0)+Math.imul(d,K)|0))<<13)|0;c=((o=o+Math.imul(d,V)|0)+(i>>>13)|0)+(me>>>26)|0,me&=67108863,n=Math.imul(m,F),i=(i=Math.imul(m,q))+Math.imul(g,F)|0,o=Math.imul(g,q),n=n+Math.imul(p,K)|0,i=(i=i+Math.imul(p,V)|0)+Math.imul(b,K)|0,o=o+Math.imul(b,V)|0;var ge=(c+(n=n+Math.imul(h,G)|0)|0)+((8191&(i=(i=i+Math.imul(h,W)|0)+Math.imul(d,G)|0))<<13)|0;c=((o=o+Math.imul(d,W)|0)+(i>>>13)|0)+(ge>>>26)|0,ge&=67108863,n=Math.imul(_,F),i=(i=Math.imul(_,q))+Math.imul(w,F)|0,o=Math.imul(w,q),n=n+Math.imul(m,K)|0,i=(i=i+Math.imul(m,V)|0)+Math.imul(g,K)|0,o=o+Math.imul(g,V)|0,n=n+Math.imul(p,G)|0,i=(i=i+Math.imul(p,W)|0)+Math.imul(b,G)|0,o=o+Math.imul(b,W)|0;var ve=(c+(n=n+Math.imul(h,J)|0)|0)+((8191&(i=(i=i+Math.imul(h,$)|0)+Math.imul(d,J)|0))<<13)|0;c=((o=o+Math.imul(d,$)|0)+(i>>>13)|0)+(ve>>>26)|0,ve&=67108863,n=Math.imul(S,F),i=(i=Math.imul(S,q))+Math.imul(A,F)|0,o=Math.imul(A,q),n=n+Math.imul(_,K)|0,i=(i=i+Math.imul(_,V)|0)+Math.imul(w,K)|0,o=o+Math.imul(w,V)|0,n=n+Math.imul(m,G)|0,i=(i=i+Math.imul(m,W)|0)+Math.imul(g,G)|0,o=o+Math.imul(g,W)|0,n=n+Math.imul(p,J)|0,i=(i=i+Math.imul(p,$)|0)+Math.imul(b,J)|0,o=o+Math.imul(b,$)|0;var _e=(c+(n=n+Math.imul(h,Q)|0)|0)+((8191&(i=(i=i+Math.imul(h,ee)|0)+Math.imul(d,Q)|0))<<13)|0;c=((o=o+Math.imul(d,ee)|0)+(i>>>13)|0)+(_e>>>26)|0,_e&=67108863,n=Math.imul(x,F),i=(i=Math.imul(x,q))+Math.imul(I,F)|0,o=Math.imul(I,q),n=n+Math.imul(S,K)|0,i=(i=i+Math.imul(S,V)|0)+Math.imul(A,K)|0,o=o+Math.imul(A,V)|0,n=n+Math.imul(_,G)|0,i=(i=i+Math.imul(_,W)|0)+Math.imul(w,G)|0,o=o+Math.imul(w,W)|0,n=n+Math.imul(m,J)|0,i=(i=i+Math.imul(m,$)|0)+Math.imul(g,J)|0,o=o+Math.imul(g,$)|0,n=n+Math.imul(p,Q)|0,i=(i=i+Math.imul(p,ee)|0)+Math.imul(b,Q)|0,o=o+Math.imul(b,ee)|0;var we=(c+(n=n+Math.imul(h,re)|0)|0)+((8191&(i=(i=i+Math.imul(h,ne)|0)+Math.imul(d,re)|0))<<13)|0;c=((o=o+Math.imul(d,ne)|0)+(i>>>13)|0)+(we>>>26)|0,we&=67108863,n=Math.imul(M,F),i=(i=Math.imul(M,q))+Math.imul(O,F)|0,o=Math.imul(O,q),n=n+Math.imul(x,K)|0,i=(i=i+Math.imul(x,V)|0)+Math.imul(I,K)|0,o=o+Math.imul(I,V)|0,n=n+Math.imul(S,G)|0,i=(i=i+Math.imul(S,W)|0)+Math.imul(A,G)|0,o=o+Math.imul(A,W)|0,n=n+Math.imul(_,J)|0,i=(i=i+Math.imul(_,$)|0)+Math.imul(w,J)|0,o=o+Math.imul(w,$)|0,n=n+Math.imul(m,Q)|0,i=(i=i+Math.imul(m,ee)|0)+Math.imul(g,Q)|0,o=o+Math.imul(g,ee)|0,n=n+Math.imul(p,re)|0,i=(i=i+Math.imul(p,ne)|0)+Math.imul(b,re)|0,o=o+Math.imul(b,ne)|0;var Ee=(c+(n=n+Math.imul(h,oe)|0)|0)+((8191&(i=(i=i+Math.imul(h,se)|0)+Math.imul(d,oe)|0))<<13)|0;c=((o=o+Math.imul(d,se)|0)+(i>>>13)|0)+(Ee>>>26)|0,Ee&=67108863,n=Math.imul(B,F),i=(i=Math.imul(B,q))+Math.imul(C,F)|0,o=Math.imul(C,q),n=n+Math.imul(M,K)|0,i=(i=i+Math.imul(M,V)|0)+Math.imul(O,K)|0,o=o+Math.imul(O,V)|0,n=n+Math.imul(x,G)|0,i=(i=i+Math.imul(x,W)|0)+Math.imul(I,G)|0,o=o+Math.imul(I,W)|0,n=n+Math.imul(S,J)|0,i=(i=i+Math.imul(S,$)|0)+Math.imul(A,J)|0,o=o+Math.imul(A,$)|0,n=n+Math.imul(_,Q)|0,i=(i=i+Math.imul(_,ee)|0)+Math.imul(w,Q)|0,o=o+Math.imul(w,ee)|0,n=n+Math.imul(m,re)|0,i=(i=i+Math.imul(m,ne)|0)+Math.imul(g,re)|0,o=o+Math.imul(g,ne)|0,n=n+Math.imul(p,oe)|0,i=(i=i+Math.imul(p,se)|0)+Math.imul(b,oe)|0,o=o+Math.imul(b,se)|0;var Se=(c+(n=n+Math.imul(h,fe)|0)|0)+((8191&(i=(i=i+Math.imul(h,ce)|0)+Math.imul(d,fe)|0))<<13)|0;c=((o=o+Math.imul(d,ce)|0)+(i>>>13)|0)+(Se>>>26)|0,Se&=67108863,n=Math.imul(N,F),i=(i=Math.imul(N,q))+Math.imul(D,F)|0,o=Math.imul(D,q),n=n+Math.imul(B,K)|0,i=(i=i+Math.imul(B,V)|0)+Math.imul(C,K)|0,o=o+Math.imul(C,V)|0,n=n+Math.imul(M,G)|0,i=(i=i+Math.imul(M,W)|0)+Math.imul(O,G)|0,o=o+Math.imul(O,W)|0,n=n+Math.imul(x,J)|0,i=(i=i+Math.imul(x,$)|0)+Math.imul(I,J)|0,o=o+Math.imul(I,$)|0,n=n+Math.imul(S,Q)|0,i=(i=i+Math.imul(S,ee)|0)+Math.imul(A,Q)|0,o=o+Math.imul(A,ee)|0,n=n+Math.imul(_,re)|0,i=(i=i+Math.imul(_,ne)|0)+Math.imul(w,re)|0,o=o+Math.imul(w,ne)|0,n=n+Math.imul(m,oe)|0,i=(i=i+Math.imul(m,se)|0)+Math.imul(g,oe)|0,o=o+Math.imul(g,se)|0,n=n+Math.imul(p,fe)|0,i=(i=i+Math.imul(p,ce)|0)+Math.imul(b,fe)|0,o=o+Math.imul(b,ce)|0;var Ae=(c+(n=n+Math.imul(h,he)|0)|0)+((8191&(i=(i=i+Math.imul(h,de)|0)+Math.imul(d,he)|0))<<13)|0;c=((o=o+Math.imul(d,de)|0)+(i>>>13)|0)+(Ae>>>26)|0,Ae&=67108863,n=Math.imul(L,F),i=(i=Math.imul(L,q))+Math.imul(H,F)|0,o=Math.imul(H,q),n=n+Math.imul(N,K)|0,i=(i=i+Math.imul(N,V)|0)+Math.imul(D,K)|0,o=o+Math.imul(D,V)|0,n=n+Math.imul(B,G)|0,i=(i=i+Math.imul(B,W)|0)+Math.imul(C,G)|0,o=o+Math.imul(C,W)|0,n=n+Math.imul(M,J)|0,i=(i=i+Math.imul(M,$)|0)+Math.imul(O,J)|0,o=o+Math.imul(O,$)|0,n=n+Math.imul(x,Q)|0,i=(i=i+Math.imul(x,ee)|0)+Math.imul(I,Q)|0,o=o+Math.imul(I,ee)|0,n=n+Math.imul(S,re)|0,i=(i=i+Math.imul(S,ne)|0)+Math.imul(A,re)|0,o=o+Math.imul(A,ne)|0,n=n+Math.imul(_,oe)|0,i=(i=i+Math.imul(_,se)|0)+Math.imul(w,oe)|0,o=o+Math.imul(w,se)|0,n=n+Math.imul(m,fe)|0,i=(i=i+Math.imul(m,ce)|0)+Math.imul(g,fe)|0,o=o+Math.imul(g,ce)|0,n=n+Math.imul(p,he)|0,i=(i=i+Math.imul(p,de)|0)+Math.imul(b,he)|0,o=o+Math.imul(b,de)|0;var ke=(c+(n=n+Math.imul(h,pe)|0)|0)+((8191&(i=(i=i+Math.imul(h,be)|0)+Math.imul(d,pe)|0))<<13)|0;c=((o=o+Math.imul(d,be)|0)+(i>>>13)|0)+(ke>>>26)|0,ke&=67108863,n=Math.imul(L,K),i=(i=Math.imul(L,V))+Math.imul(H,K)|0,o=Math.imul(H,V),n=n+Math.imul(N,G)|0,i=(i=i+Math.imul(N,W)|0)+Math.imul(D,G)|0,o=o+Math.imul(D,W)|0,n=n+Math.imul(B,J)|0,i=(i=i+Math.imul(B,$)|0)+Math.imul(C,J)|0,o=o+Math.imul(C,$)|0,n=n+Math.imul(M,Q)|0,i=(i=i+Math.imul(M,ee)|0)+Math.imul(O,Q)|0,o=o+Math.imul(O,ee)|0,n=n+Math.imul(x,re)|0,i=(i=i+Math.imul(x,ne)|0)+Math.imul(I,re)|0,o=o+Math.imul(I,ne)|0,n=n+Math.imul(S,oe)|0,i=(i=i+Math.imul(S,se)|0)+Math.imul(A,oe)|0,o=o+Math.imul(A,se)|0,n=n+Math.imul(_,fe)|0,i=(i=i+Math.imul(_,ce)|0)+Math.imul(w,fe)|0,o=o+Math.imul(w,ce)|0,n=n+Math.imul(m,he)|0,i=(i=i+Math.imul(m,de)|0)+Math.imul(g,he)|0,o=o+Math.imul(g,de)|0;var xe=(c+(n=n+Math.imul(p,pe)|0)|0)+((8191&(i=(i=i+Math.imul(p,be)|0)+Math.imul(b,pe)|0))<<13)|0;c=((o=o+Math.imul(b,be)|0)+(i>>>13)|0)+(xe>>>26)|0,xe&=67108863,n=Math.imul(L,G),i=(i=Math.imul(L,W))+Math.imul(H,G)|0,o=Math.imul(H,W),n=n+Math.imul(N,J)|0,i=(i=i+Math.imul(N,$)|0)+Math.imul(D,J)|0,o=o+Math.imul(D,$)|0,n=n+Math.imul(B,Q)|0,i=(i=i+Math.imul(B,ee)|0)+Math.imul(C,Q)|0,o=o+Math.imul(C,ee)|0,n=n+Math.imul(M,re)|0,i=(i=i+Math.imul(M,ne)|0)+Math.imul(O,re)|0,o=o+Math.imul(O,ne)|0,n=n+Math.imul(x,oe)|0,i=(i=i+Math.imul(x,se)|0)+Math.imul(I,oe)|0,o=o+Math.imul(I,se)|0,n=n+Math.imul(S,fe)|0,i=(i=i+Math.imul(S,ce)|0)+Math.imul(A,fe)|0,o=o+Math.imul(A,ce)|0,n=n+Math.imul(_,he)|0,i=(i=i+Math.imul(_,de)|0)+Math.imul(w,he)|0,o=o+Math.imul(w,de)|0;var Ie=(c+(n=n+Math.imul(m,pe)|0)|0)+((8191&(i=(i=i+Math.imul(m,be)|0)+Math.imul(g,pe)|0))<<13)|0;c=((o=o+Math.imul(g,be)|0)+(i>>>13)|0)+(Ie>>>26)|0,Ie&=67108863,n=Math.imul(L,J),i=(i=Math.imul(L,$))+Math.imul(H,J)|0,o=Math.imul(H,$),n=n+Math.imul(N,Q)|0,i=(i=i+Math.imul(N,ee)|0)+Math.imul(D,Q)|0,o=o+Math.imul(D,ee)|0,n=n+Math.imul(B,re)|0,i=(i=i+Math.imul(B,ne)|0)+Math.imul(C,re)|0,o=o+Math.imul(C,ne)|0,n=n+Math.imul(M,oe)|0,i=(i=i+Math.imul(M,se)|0)+Math.imul(O,oe)|0,o=o+Math.imul(O,se)|0,n=n+Math.imul(x,fe)|0,i=(i=i+Math.imul(x,ce)|0)+Math.imul(I,fe)|0,o=o+Math.imul(I,ce)|0,n=n+Math.imul(S,he)|0,i=(i=i+Math.imul(S,de)|0)+Math.imul(A,he)|0,o=o+Math.imul(A,de)|0;var Te=(c+(n=n+Math.imul(_,pe)|0)|0)+((8191&(i=(i=i+Math.imul(_,be)|0)+Math.imul(w,pe)|0))<<13)|0;c=((o=o+Math.imul(w,be)|0)+(i>>>13)|0)+(Te>>>26)|0,Te&=67108863,n=Math.imul(L,Q),i=(i=Math.imul(L,ee))+Math.imul(H,Q)|0,o=Math.imul(H,ee),n=n+Math.imul(N,re)|0,i=(i=i+Math.imul(N,ne)|0)+Math.imul(D,re)|0,o=o+Math.imul(D,ne)|0,n=n+Math.imul(B,oe)|0,i=(i=i+Math.imul(B,se)|0)+Math.imul(C,oe)|0,o=o+Math.imul(C,se)|0,n=n+Math.imul(M,fe)|0,i=(i=i+Math.imul(M,ce)|0)+Math.imul(O,fe)|0,o=o+Math.imul(O,ce)|0,n=n+Math.imul(x,he)|0,i=(i=i+Math.imul(x,de)|0)+Math.imul(I,he)|0,o=o+Math.imul(I,de)|0;var Me=(c+(n=n+Math.imul(S,pe)|0)|0)+((8191&(i=(i=i+Math.imul(S,be)|0)+Math.imul(A,pe)|0))<<13)|0;c=((o=o+Math.imul(A,be)|0)+(i>>>13)|0)+(Me>>>26)|0,Me&=67108863,n=Math.imul(L,re),i=(i=Math.imul(L,ne))+Math.imul(H,re)|0,o=Math.imul(H,ne),n=n+Math.imul(N,oe)|0,i=(i=i+Math.imul(N,se)|0)+Math.imul(D,oe)|0,o=o+Math.imul(D,se)|0,n=n+Math.imul(B,fe)|0,i=(i=i+Math.imul(B,ce)|0)+Math.imul(C,fe)|0,o=o+Math.imul(C,ce)|0,n=n+Math.imul(M,he)|0,i=(i=i+Math.imul(M,de)|0)+Math.imul(O,he)|0,o=o+Math.imul(O,de)|0;var Oe=(c+(n=n+Math.imul(x,pe)|0)|0)+((8191&(i=(i=i+Math.imul(x,be)|0)+Math.imul(I,pe)|0))<<13)|0;c=((o=o+Math.imul(I,be)|0)+(i>>>13)|0)+(Oe>>>26)|0,Oe&=67108863,n=Math.imul(L,oe),i=(i=Math.imul(L,se))+Math.imul(H,oe)|0,o=Math.imul(H,se),n=n+Math.imul(N,fe)|0,i=(i=i+Math.imul(N,ce)|0)+Math.imul(D,fe)|0,o=o+Math.imul(D,ce)|0,n=n+Math.imul(B,he)|0,i=(i=i+Math.imul(B,de)|0)+Math.imul(C,he)|0,o=o+Math.imul(C,de)|0;var Re=(c+(n=n+Math.imul(M,pe)|0)|0)+((8191&(i=(i=i+Math.imul(M,be)|0)+Math.imul(O,pe)|0))<<13)|0;c=((o=o+Math.imul(O,be)|0)+(i>>>13)|0)+(Re>>>26)|0,Re&=67108863,n=Math.imul(L,fe),i=(i=Math.imul(L,ce))+Math.imul(H,fe)|0,o=Math.imul(H,ce),n=n+Math.imul(N,he)|0,i=(i=i+Math.imul(N,de)|0)+Math.imul(D,he)|0,o=o+Math.imul(D,de)|0;var Be=(c+(n=n+Math.imul(B,pe)|0)|0)+((8191&(i=(i=i+Math.imul(B,be)|0)+Math.imul(C,pe)|0))<<13)|0;c=((o=o+Math.imul(C,be)|0)+(i>>>13)|0)+(Be>>>26)|0,Be&=67108863,n=Math.imul(L,he),i=(i=Math.imul(L,de))+Math.imul(H,he)|0,o=Math.imul(H,de);var Ce=(c+(n=n+Math.imul(N,pe)|0)|0)+((8191&(i=(i=i+Math.imul(N,be)|0)+Math.imul(D,pe)|0))<<13)|0;c=((o=o+Math.imul(D,be)|0)+(i>>>13)|0)+(Ce>>>26)|0,Ce&=67108863;var Pe=(c+(n=Math.imul(L,pe))|0)+((8191&(i=(i=Math.imul(L,be))+Math.imul(H,pe)|0))<<13)|0;return c=((o=Math.imul(H,be))+(i>>>13)|0)+(Pe>>>26)|0,Pe&=67108863,f[0]=ye,f[1]=me,f[2]=ge,f[3]=ve,f[4]=_e,f[5]=we,f[6]=Ee,f[7]=Se,f[8]=Ae,f[9]=ke,f[10]=xe,f[11]=Ie,f[12]=Te,f[13]=Me,f[14]=Oe,f[15]=Re,f[16]=Be,f[17]=Ce,f[18]=Pe,0!==c&&(f[19]=c,r.length++),r};function p(e,t,r){return(new b).mulp(e,t,r)}function b(e,t){this.x=e,this.y=t}Math.imul||(l=d),o.prototype.mulTo=function(e,t){var r=this.length+e.length;return 10===this.length&&10===e.length?l(this,e,t):r<63?d(this,e,t):r<1024?function(e,t,r){r.negative=t.negative^e.negative,r.length=e.length+t.length;for(var n=0,i=0,o=0;o<r.length-1;o++){var s=i;i=0;for(var a=67108863&n,f=Math.min(o,t.length-1),c=Math.max(0,o-e.length+1);c<=f;c++){var u=o-c,h=(0|e.words[u])*(0|t.words[c]),d=67108863&h;a=67108863&(d=d+a|0),i+=(s=(s=s+(h/67108864|0)|0)+(d>>>26)|0)>>>26,s&=67108863}r.words[o]=a,n=s,s=i}return 0!==n?r.words[o]=n:r.length--,r.strip()}(this,e,t):p(this,e,t)},b.prototype.makeRBT=function(e){for(var t=new Array(e),r=o.prototype._countBits(e)-1,n=0;n<e;n++)t[n]=this.revBin(n,r,e);return t},b.prototype.revBin=function(e,t,r){if(0===e||e===r-1)return e;for(var n=0,i=0;i<t;i++)n|=(1&e)<<t-i-1,e>>=1;return n},b.prototype.permute=function(e,t,r,n,i,o){for(var s=0;s<o;s++)n[s]=t[e[s]],i[s]=r[e[s]]},b.prototype.transform=function(e,t,r,n,i,o){this.permute(o,e,t,r,n,i);for(var s=1;s<i;s<<=1)for(var a=s<<1,f=Math.cos(2*Math.PI/a),c=Math.sin(2*Math.PI/a),u=0;u<i;u+=a)for(var h=f,d=c,l=0;l<s;l++){var p=r[u+l],b=n[u+l],y=r[u+l+s],m=n[u+l+s],g=h*y-d*m;m=h*m+d*y,y=g,r[u+l]=p+y,n[u+l]=b+m,r[u+l+s]=p-y,n[u+l+s]=b-m,l!==a&&(g=f*h-c*d,d=f*d+c*h,h=g)}},b.prototype.guessLen13b=function(e,t){var r=1|Math.max(t,e),n=1&r,i=0;for(r=r/2|0;r;r>>>=1)i++;return 1<<i+1+n},b.prototype.conjugate=function(e,t,r){if(!(r<=1))for(var n=0;n<r/2;n++){var i=e[n];e[n]=e[r-n-1],e[r-n-1]=i,i=t[n],t[n]=-t[r-n-1],t[r-n-1]=-i}},b.prototype.normalize13b=function(e,t){for(var r=0,n=0;n<t/2;n++){var i=8192*Math.round(e[2*n+1]/t)+Math.round(e[2*n]/t)+r;e[n]=67108863&i,r=i<67108864?0:i/67108864|0}return e},b.prototype.convert13b=function(e,t,r,i){for(var o=0,s=0;s<t;s++)o+=0|e[s],r[2*s]=8191&o,o>>>=13,r[2*s+1]=8191&o,o>>>=13;for(s=2*t;s<i;++s)r[s]=0;n(0===o),n(0==(-8192&o))},b.prototype.stub=function(e){for(var t=new Array(e),r=0;r<e;r++)t[r]=0;return t},b.prototype.mulp=function(e,t,r){var n=2*this.guessLen13b(e.length,t.length),i=this.makeRBT(n),o=this.stub(n),s=new Array(n),a=new Array(n),f=new Array(n),c=new Array(n),u=new Array(n),h=new Array(n),d=r.words;d.length=n,this.convert13b(e.words,e.length,s,n),this.convert13b(t.words,t.length,c,n),this.transform(s,o,a,f,n,i),this.transform(c,o,u,h,n,i);for(var l=0;l<n;l++){var p=a[l]*u[l]-f[l]*h[l];f[l]=a[l]*h[l]+f[l]*u[l],a[l]=p}return this.conjugate(a,f,n),this.transform(a,f,d,o,n,i),this.conjugate(d,o,n),this.normalize13b(d,n),r.negative=e.negative^t.negative,r.length=e.length+t.length,r.strip()},o.prototype.mul=function(e){var t=new o(null);return t.words=new Array(this.length+e.length),this.mulTo(e,t)},o.prototype.mulf=function(e){var t=new o(null);return t.words=new Array(this.length+e.length),p(this,e,t)},o.prototype.imul=function(e){return this.clone().mulTo(e,this)},o.prototype.imuln=function(e){n("number"==typeof e),n(e<67108864);for(var t=0,r=0;r<this.length;r++){var i=(0|this.words[r])*e,o=(67108863&i)+(67108863&t);t>>=26,t+=i/67108864|0,t+=o>>>26,this.words[r]=67108863&o}return 0!==t&&(this.words[r]=t,this.length++),this},o.prototype.muln=function(e){return this.clone().imuln(e)},o.prototype.sqr=function(){return this.mul(this)},o.prototype.isqr=function(){return this.imul(this.clone())},o.prototype.pow=function(e){var t=function(e){for(var t=new Array(e.bitLength()),r=0;r<t.length;r++){var n=r/26|0,i=r%26;t[r]=(e.words[n]&1<<i)>>>i}return t}(e);if(0===t.length)return new o(1);for(var r=this,n=0;n<t.length&&0===t[n];n++,r=r.sqr());if(++n<t.length)for(var i=r.sqr();n<t.length;n++,i=i.sqr())0!==t[n]&&(r=r.mul(i));return r},o.prototype.iushln=function(e){n("number"==typeof e&&e>=0);var t,r=e%26,i=(e-r)/26,o=67108863>>>26-r<<26-r;if(0!==r){var s=0;for(t=0;t<this.length;t++){var a=this.words[t]&o,f=(0|this.words[t])-a<<r;this.words[t]=f|s,s=a>>>26-r}s&&(this.words[t]=s,this.length++)}if(0!==i){for(t=this.length-1;t>=0;t--)this.words[t+i]=this.words[t];for(t=0;t<i;t++)this.words[t]=0;this.length+=i}return this.strip()},o.prototype.ishln=function(e){return n(0===this.negative),this.iushln(e)},o.prototype.iushrn=function(e,t,r){var i;n("number"==typeof e&&e>=0),i=t?(t-t%26)/26:0;var o=e%26,s=Math.min((e-o)/26,this.length),a=67108863^67108863>>>o<<o,f=r;if(i-=s,i=Math.max(0,i),f){for(var c=0;c<s;c++)f.words[c]=this.words[c];f.length=s}if(0===s);else if(this.length>s)for(this.length-=s,c=0;c<this.length;c++)this.words[c]=this.words[c+s];else this.words[0]=0,this.length=1;var u=0;for(c=this.length-1;c>=0&&(0!==u||c>=i);c--){var h=0|this.words[c];this.words[c]=u<<26-o|h>>>o,u=h&a}return f&&0!==u&&(f.words[f.length++]=u),0===this.length&&(this.words[0]=0,this.length=1),this.strip()},o.prototype.ishrn=function(e,t,r){return n(0===this.negative),this.iushrn(e,t,r)},o.prototype.shln=function(e){return this.clone().ishln(e)},o.prototype.ushln=function(e){return this.clone().iushln(e)},o.prototype.shrn=function(e){return this.clone().ishrn(e)},o.prototype.ushrn=function(e){return this.clone().iushrn(e)},o.prototype.testn=function(e){n("number"==typeof e&&e>=0);var t=e%26,r=(e-t)/26,i=1<<t;return!(this.length<=r)&&!!(this.words[r]&i)},o.prototype.imaskn=function(e){n("number"==typeof e&&e>=0);var t=e%26,r=(e-t)/26;if(n(0===this.negative,"imaskn works only with positive numbers"),this.length<=r)return this;if(0!==t&&r++,this.length=Math.min(r,this.length),0!==t){var i=67108863^67108863>>>t<<t;this.words[this.length-1]&=i}return this.strip()},o.prototype.maskn=function(e){return this.clone().imaskn(e)},o.prototype.iaddn=function(e){return n("number"==typeof e),n(e<67108864),e<0?this.isubn(-e):0!==this.negative?1===this.length&&(0|this.words[0])<e?(this.words[0]=e-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(e),this.negative=1,this):this._iaddn(e)},o.prototype._iaddn=function(e){this.words[0]+=e;for(var t=0;t<this.length&&this.words[t]>=67108864;t++)this.words[t]-=67108864,t===this.length-1?this.words[t+1]=1:this.words[t+1]++;return this.length=Math.max(this.length,t+1),this},o.prototype.isubn=function(e){if(n("number"==typeof e),n(e<67108864),e<0)return this.iaddn(-e);if(0!==this.negative)return this.negative=0,this.iaddn(e),this.negative=1,this;if(this.words[0]-=e,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var t=0;t<this.length&&this.words[t]<0;t++)this.words[t]+=67108864,this.words[t+1]-=1;return this.strip()},o.prototype.addn=function(e){return this.clone().iaddn(e)},o.prototype.subn=function(e){return this.clone().isubn(e)},o.prototype.iabs=function(){return this.negative=0,this},o.prototype.abs=function(){return this.clone().iabs()},o.prototype._ishlnsubmul=function(e,t,r){var i,o,s=e.length+r;this._expand(s);var a=0;for(i=0;i<e.length;i++){o=(0|this.words[i+r])+a;var f=(0|e.words[i])*t;a=((o-=67108863&f)>>26)-(f/67108864|0),this.words[i+r]=67108863&o}for(;i<this.length-r;i++)a=(o=(0|this.words[i+r])+a)>>26,this.words[i+r]=67108863&o;if(0===a)return this.strip();for(n(-1===a),a=0,i=0;i<this.length;i++)a=(o=-(0|this.words[i])+a)>>26,this.words[i]=67108863&o;return this.negative=1,this.strip()},o.prototype._wordDiv=function(e,t){var r=(this.length,e.length),n=this.clone(),i=e,s=0|i.words[i.length-1];0!==(r=26-this._countBits(s))&&(i=i.ushln(r),n.iushln(r),s=0|i.words[i.length-1]);var a,f=n.length-i.length;if("mod"!==t){(a=new o(null)).length=f+1,a.words=new Array(a.length);for(var c=0;c<a.length;c++)a.words[c]=0}var u=n.clone()._ishlnsubmul(i,1,f);0===u.negative&&(n=u,a&&(a.words[f]=1));for(var h=f-1;h>=0;h--){var d=67108864*(0|n.words[i.length+h])+(0|n.words[i.length+h-1]);for(d=Math.min(d/s|0,67108863),n._ishlnsubmul(i,d,h);0!==n.negative;)d--,n.negative=0,n._ishlnsubmul(i,1,h),n.isZero()||(n.negative^=1);a&&(a.words[h]=d)}return a&&a.strip(),n.strip(),"div"!==t&&0!==r&&n.iushrn(r),{div:a||null,mod:n}},o.prototype.divmod=function(e,t,r){return n(!e.isZero()),this.isZero()?{div:new o(0),mod:new o(0)}:0!==this.negative&&0===e.negative?(a=this.neg().divmod(e,t),"mod"!==t&&(i=a.div.neg()),"div"!==t&&(s=a.mod.neg(),r&&0!==s.negative&&s.iadd(e)),{div:i,mod:s}):0===this.negative&&0!==e.negative?(a=this.divmod(e.neg(),t),"mod"!==t&&(i=a.div.neg()),{div:i,mod:a.mod}):0!=(this.negative&e.negative)?(a=this.neg().divmod(e.neg(),t),"div"!==t&&(s=a.mod.neg(),r&&0!==s.negative&&s.isub(e)),{div:a.div,mod:s}):e.length>this.length||this.cmp(e)<0?{div:new o(0),mod:this}:1===e.length?"div"===t?{div:this.divn(e.words[0]),mod:null}:"mod"===t?{div:null,mod:new o(this.modn(e.words[0]))}:{div:this.divn(e.words[0]),mod:new o(this.modn(e.words[0]))}:this._wordDiv(e,t);var i,s,a},o.prototype.div=function(e){return this.divmod(e,"div",!1).div},o.prototype.mod=function(e){return this.divmod(e,"mod",!1).mod},o.prototype.umod=function(e){return this.divmod(e,"mod",!0).mod},o.prototype.divRound=function(e){var t=this.divmod(e);if(t.mod.isZero())return t.div;var r=0!==t.div.negative?t.mod.isub(e):t.mod,n=e.ushrn(1),i=e.andln(1),o=r.cmp(n);return o<0||1===i&&0===o?t.div:0!==t.div.negative?t.div.isubn(1):t.div.iaddn(1)},o.prototype.modn=function(e){n(e<=67108863);for(var t=(1<<26)%e,r=0,i=this.length-1;i>=0;i--)r=(t*r+(0|this.words[i]))%e;return r},o.prototype.idivn=function(e){n(e<=67108863);for(var t=0,r=this.length-1;r>=0;r--){var i=(0|this.words[r])+67108864*t;this.words[r]=i/e|0,t=i%e}return this.strip()},o.prototype.divn=function(e){return this.clone().idivn(e)},o.prototype.egcd=function(e){n(0===e.negative),n(!e.isZero());var t=this,r=e.clone();t=0!==t.negative?t.umod(e):t.clone();for(var i=new o(1),s=new o(0),a=new o(0),f=new o(1),c=0;t.isEven()&&r.isEven();)t.iushrn(1),r.iushrn(1),++c;for(var u=r.clone(),h=t.clone();!t.isZero();){for(var d=0,l=1;0==(t.words[0]&l)&&d<26;++d,l<<=1);if(d>0)for(t.iushrn(d);d-- >0;)(i.isOdd()||s.isOdd())&&(i.iadd(u),s.isub(h)),i.iushrn(1),s.iushrn(1);for(var p=0,b=1;0==(r.words[0]&b)&&p<26;++p,b<<=1);if(p>0)for(r.iushrn(p);p-- >0;)(a.isOdd()||f.isOdd())&&(a.iadd(u),f.isub(h)),a.iushrn(1),f.iushrn(1);t.cmp(r)>=0?(t.isub(r),i.isub(a),s.isub(f)):(r.isub(t),a.isub(i),f.isub(s))}return{a:a,b:f,gcd:r.iushln(c)}},o.prototype._invmp=function(e){n(0===e.negative),n(!e.isZero());var t=this,r=e.clone();t=0!==t.negative?t.umod(e):t.clone();for(var i,s=new o(1),a=new o(0),f=r.clone();t.cmpn(1)>0&&r.cmpn(1)>0;){for(var c=0,u=1;0==(t.words[0]&u)&&c<26;++c,u<<=1);if(c>0)for(t.iushrn(c);c-- >0;)s.isOdd()&&s.iadd(f),s.iushrn(1);for(var h=0,d=1;0==(r.words[0]&d)&&h<26;++h,d<<=1);if(h>0)for(r.iushrn(h);h-- >0;)a.isOdd()&&a.iadd(f),a.iushrn(1);t.cmp(r)>=0?(t.isub(r),s.isub(a)):(r.isub(t),a.isub(s))}return(i=0===t.cmpn(1)?s:a).cmpn(0)<0&&i.iadd(e),i},o.prototype.gcd=function(e){if(this.isZero())return e.abs();if(e.isZero())return this.abs();var t=this.clone(),r=e.clone();t.negative=0,r.negative=0;for(var n=0;t.isEven()&&r.isEven();n++)t.iushrn(1),r.iushrn(1);for(;;){for(;t.isEven();)t.iushrn(1);for(;r.isEven();)r.iushrn(1);var i=t.cmp(r);if(i<0){var o=t;t=r,r=o}else if(0===i||0===r.cmpn(1))break;t.isub(r)}return r.iushln(n)},o.prototype.invm=function(e){return this.egcd(e).a.umod(e)},o.prototype.isEven=function(){return 0==(1&this.words[0])},o.prototype.isOdd=function(){return 1==(1&this.words[0])},o.prototype.andln=function(e){return this.words[0]&e},o.prototype.bincn=function(e){n("number"==typeof e);var t=e%26,r=(e-t)/26,i=1<<t;if(this.length<=r)return this._expand(r+1),this.words[r]|=i,this;for(var o=i,s=r;0!==o&&s<this.length;s++){var a=0|this.words[s];o=(a+=o)>>>26,a&=67108863,this.words[s]=a}return 0!==o&&(this.words[s]=o,this.length++),this},o.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},o.prototype.cmpn=function(e){var t,r=e<0;if(0!==this.negative&&!r)return-1;if(0===this.negative&&r)return 1;if(this.strip(),this.length>1)t=1;else{r&&(e=-e),n(e<=67108863,"Number is too big");var i=0|this.words[0];t=i===e?0:i<e?-1:1}return 0!==this.negative?0|-t:t},o.prototype.cmp=function(e){if(0!==this.negative&&0===e.negative)return-1;if(0===this.negative&&0!==e.negative)return 1;var t=this.ucmp(e);return 0!==this.negative?0|-t:t},o.prototype.ucmp=function(e){if(this.length>e.length)return 1;if(this.length<e.length)return-1;for(var t=0,r=this.length-1;r>=0;r--){var n=0|this.words[r],i=0|e.words[r];if(n!==i){n<i?t=-1:n>i&&(t=1);break}}return t},o.prototype.gtn=function(e){return 1===this.cmpn(e)},o.prototype.gt=function(e){return 1===this.cmp(e)},o.prototype.gten=function(e){return this.cmpn(e)>=0},o.prototype.gte=function(e){return this.cmp(e)>=0},o.prototype.ltn=function(e){return-1===this.cmpn(e)},o.prototype.lt=function(e){return-1===this.cmp(e)},o.prototype.lten=function(e){return this.cmpn(e)<=0},o.prototype.lte=function(e){return this.cmp(e)<=0},o.prototype.eqn=function(e){return 0===this.cmpn(e)},o.prototype.eq=function(e){return 0===this.cmp(e)},o.red=function(e){return new E(e)},o.prototype.toRed=function(e){return n(!this.red,"Already a number in reduction context"),n(0===this.negative,"red works only with positives"),e.convertTo(this)._forceRed(e)},o.prototype.fromRed=function(){return n(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},o.prototype._forceRed=function(e){return this.red=e,this},o.prototype.forceRed=function(e){return n(!this.red,"Already a number in reduction context"),this._forceRed(e)},o.prototype.redAdd=function(e){return n(this.red,"redAdd works only with red numbers"),this.red.add(this,e)},o.prototype.redIAdd=function(e){return n(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,e)},o.prototype.redSub=function(e){return n(this.red,"redSub works only with red numbers"),this.red.sub(this,e)},o.prototype.redISub=function(e){return n(this.red,"redISub works only with red numbers"),this.red.isub(this,e)},o.prototype.redShl=function(e){return n(this.red,"redShl works only with red numbers"),this.red.shl(this,e)},o.prototype.redMul=function(e){return n(this.red,"redMul works only with red numbers"),this.red._verify2(this,e),this.red.mul(this,e)},o.prototype.redIMul=function(e){return n(this.red,"redMul works only with red numbers"),this.red._verify2(this,e),this.red.imul(this,e)},o.prototype.redSqr=function(){return n(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},o.prototype.redISqr=function(){return n(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},o.prototype.redSqrt=function(){return n(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},o.prototype.redInvm=function(){return n(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},o.prototype.redNeg=function(){return n(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},o.prototype.redPow=function(e){return n(this.red&&!e.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,e)};var y={k256:null,p224:null,p192:null,p25519:null};function m(e,t){this.name=e,this.p=new o(t,16),this.n=this.p.bitLength(),this.k=new o(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function g(){m.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function v(){m.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function _(){m.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function w(){m.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function E(e){if("string"==typeof e){var t=o._prime(e);this.m=t.p,this.prime=t}else n(e.gtn(1),"modulus must be greater than 1"),this.m=e,this.prime=null}function S(e){E.call(this,e),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new o(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}m.prototype._tmp=function(){var e=new o(null);return e.words=new Array(Math.ceil(this.n/13)),e},m.prototype.ireduce=function(e){var t,r=e;do{this.split(r,this.tmp),t=(r=(r=this.imulK(r)).iadd(this.tmp)).bitLength()}while(t>this.n);var n=t<this.n?-1:r.ucmp(this.p);return 0===n?(r.words[0]=0,r.length=1):n>0?r.isub(this.p):r.strip(),r},m.prototype.split=function(e,t){e.iushrn(this.n,0,t)},m.prototype.imulK=function(e){return e.imul(this.k)},i(g,m),g.prototype.split=function(e,t){for(var r=Math.min(e.length,9),n=0;n<r;n++)t.words[n]=e.words[n];if(t.length=r,e.length<=9)return e.words[0]=0,void(e.length=1);var i=e.words[9];for(t.words[t.length++]=4194303&i,n=10;n<e.length;n++){var o=0|e.words[n];e.words[n-10]=(4194303&o)<<4|i>>>22,i=o}i>>>=22,e.words[n-10]=i,0===i&&e.length>10?e.length-=10:e.length-=9},g.prototype.imulK=function(e){e.words[e.length]=0,e.words[e.length+1]=0,e.length+=2;for(var t=0,r=0;r<e.length;r++){var n=0|e.words[r];t+=977*n,e.words[r]=67108863&t,t=64*n+(t/67108864|0)}return 0===e.words[e.length-1]&&(e.length--,0===e.words[e.length-1]&&e.length--),e},i(v,m),i(_,m),i(w,m),w.prototype.imulK=function(e){for(var t=0,r=0;r<e.length;r++){var n=19*(0|e.words[r])+t,i=67108863&n;n>>>=26,e.words[r]=i,t=n}return 0!==t&&(e.words[e.length++]=t),e},o._prime=function(e){if(y[e])return y[e];var t;if("k256"===e)t=new g;else if("p224"===e)t=new v;else if("p192"===e)t=new _;else{if("p25519"!==e)throw new Error("Unknown prime "+e);t=new w}return y[e]=t,t},E.prototype._verify1=function(e){n(0===e.negative,"red works only with positives"),n(e.red,"red works only with red numbers")},E.prototype._verify2=function(e,t){n(0==(e.negative|t.negative),"red works only with positives"),n(e.red&&e.red===t.red,"red works only with red numbers")},E.prototype.imod=function(e){return this.prime?this.prime.ireduce(e)._forceRed(this):e.umod(this.m)._forceRed(this)},E.prototype.neg=function(e){return e.isZero()?e.clone():this.m.sub(e)._forceRed(this)},E.prototype.add=function(e,t){this._verify2(e,t);var r=e.add(t);return r.cmp(this.m)>=0&&r.isub(this.m),r._forceRed(this)},E.prototype.iadd=function(e,t){this._verify2(e,t);var r=e.iadd(t);return r.cmp(this.m)>=0&&r.isub(this.m),r},E.prototype.sub=function(e,t){this._verify2(e,t);var r=e.sub(t);return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)},E.prototype.isub=function(e,t){this._verify2(e,t);var r=e.isub(t);return r.cmpn(0)<0&&r.iadd(this.m),r},E.prototype.shl=function(e,t){return this._verify1(e),this.imod(e.ushln(t))},E.prototype.imul=function(e,t){return this._verify2(e,t),this.imod(e.imul(t))},E.prototype.mul=function(e,t){return this._verify2(e,t),this.imod(e.mul(t))},E.prototype.isqr=function(e){return this.imul(e,e.clone())},E.prototype.sqr=function(e){return this.mul(e,e)},E.prototype.sqrt=function(e){if(e.isZero())return e.clone();var t=this.m.andln(3);if(n(t%2==1),3===t){var r=this.m.add(new o(1)).iushrn(2);return this.pow(e,r)}for(var i=this.m.subn(1),s=0;!i.isZero()&&0===i.andln(1);)s++,i.iushrn(1);n(!i.isZero());var a=new o(1).toRed(this),f=a.redNeg(),c=this.m.subn(1).iushrn(1),u=this.m.bitLength();for(u=new o(2*u*u).toRed(this);0!==this.pow(u,c).cmp(f);)u.redIAdd(f);for(var h=this.pow(u,i),d=this.pow(e,i.addn(1).iushrn(1)),l=this.pow(e,i),p=s;0!==l.cmp(a);){for(var b=l,y=0;0!==b.cmp(a);y++)b=b.redSqr();n(y<p);var m=this.pow(h,new o(1).iushln(p-y-1));d=d.redMul(m),h=m.redSqr(),l=l.redMul(h),p=y}return d},E.prototype.invm=function(e){var t=e._invmp(this.m);return 0!==t.negative?(t.negative=0,this.imod(t).redNeg()):this.imod(t)},E.prototype.pow=function(e,t){if(t.isZero())return new o(1).toRed(this);if(0===t.cmpn(1))return e.clone();var r=new Array(16);r[0]=new o(1).toRed(this),r[1]=e;for(var n=2;n<r.length;n++)r[n]=this.mul(r[n-1],e);var i=r[0],s=0,a=0,f=t.bitLength()%26;for(0===f&&(f=26),n=t.length-1;n>=0;n--){for(var c=t.words[n],u=f-1;u>=0;u--){var h=c>>u&1;i!==r[0]&&(i=this.sqr(i)),0!==h||0!==s?(s<<=1,s|=h,(4===++a||0===n&&0===u)&&(i=this.mul(i,r[s]),a=0,s=0)):a=0}f=26}return i},E.prototype.convertTo=function(e){var t=e.umod(this.m);return t===e?t.clone():t},E.prototype.convertFrom=function(e){var t=e.clone();return t.red=null,t},o.mont=function(e){return new S(e)},i(S,E),S.prototype.convertTo=function(e){return this.imod(e.ushln(this.shift))},S.prototype.convertFrom=function(e){var t=this.imod(e.mul(this.rinv));return t.red=null,t},S.prototype.imul=function(e,t){if(e.isZero()||t.isZero())return e.words[0]=0,e.length=1,e;var r=e.imul(t),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),i=r.isub(n).iushrn(this.shift),o=i;return i.cmp(this.m)>=0?o=i.isub(this.m):i.cmpn(0)<0&&(o=i.iadd(this.m)),o._forceRed(this)},S.prototype.mul=function(e,t){if(e.isZero()||t.isZero())return new o(0)._forceRed(this);var r=e.mul(t),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),i=r.isub(n).iushrn(this.shift),s=i;return i.cmp(this.m)>=0?s=i.isub(this.m):i.cmpn(0)<0&&(s=i.iadd(this.m)),s._forceRed(this)},S.prototype.invm=function(e){return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this)}}(e,this)}).call(this,r(163)(e))},function(e,t,r){"use strict";r.d(t,"e",function(){return i}),r.d(t,"a",function(){return o}),r.d(t,"d",function(){return s}),r.d(t,"b",function(){return a}),r.d(t,"c",function(){return f});var n=r(75),i="ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",o={getChainStatus:{name:"getChainStatus",call:"blockChain/chainStatus",method:"GET",params:[]},getChainState:{name:"getChainState",call:"blockChain/blockState",method:"GET",params:["blockHash"]},getContractFileDescriptorSet:{name:"getContractFileDescriptorSet",call:"blockChain/contractFileDescriptorSet",method:"GET",params:["address"],inputFormatter:[n.a],outputFormatter:n.b},getBlockHeight:{name:"getBlockHeight",call:"blockChain/blockHeight",method:"GET",params:[],inputFormatter:[]},getBlock:{name:"getBlock",call:"blockChain/block",method:"GET",params:["blockHash","includeTransactions"]},getBlockByHeight:{name:"getBlockByHeight",call:"blockChain/blockByHeight",method:"GET",params:["blockHeight","includeTransactions"]},getTxResult:{name:"getTxResult",call:"blockChain/transactionResult",method:"GET",params:["transactionId"],inputFormatter:[]},getTxResults:{name:"getTxResults",call:"blockChain/transactionResults",method:"GET",params:["blockHash","offset","limit"]},getTransactionPoolStatus:{name:"getTransactionPoolStatus",call:"blockChain/transactionPoolStatus",method:"GET",params:[]},sendTransaction:{name:"sendTransaction",call:"blockChain/sendTransaction",method:"POST",params:["rawTransaction"],inputFormatter:[]},sendTransactions:{name:"sendTransactions",call:"blockChain/sendTransactions",method:"POST",params:["rawTransaction"],inputFormatter:[]},callReadOnly:{name:"callReadOnly",call:"blockChain/executeTransaction",method:"POST",params:["rawTransaction"],inputFormatter:[]},getPeers:{name:"getPeers",call:"net/peers",method:"GET",params:[]},addPeer:{name:"addPeer",call:"net/peers",method:"POST",params:["address"],inputFormatter:[]},removePeer:{name:"removePeer",call:"net/peers",method:"DELETE",params:["address"],inputFormatter:[]}},s={noether:"0",wei:"1",kwei:"1000",Kwei:"1000",babbage:"1000",femtoether:"1000",mwei:"1000000",Mwei:"1000000",lovelace:"1000000",picoether:"1000000",gwei:"1000000000",Gwei:"1000000000",shannon:"1000000000",nanoether:"1000000000",nano:"1000000000",szabo:"1000000000000",microether:"1000000000000",micro:"1000000000000",finney:"1000000000000000",milliether:"1000000000000000",milli:"1000000000000000",ether:"1000000000000000000",kether:"1000000000000000000000",grand:"1000000000000000000000",mether:"1000000000000000000000000",gether:"1000000000000000000000000000",tether:"1000000000000000000000000000000"},a="utf8",f={INVALID_PASSWORD:{error:200001,errorMessage:"Password Error"},NOT_AELF_KEY_STORE:{error:200002,errorMessage:"Not a aelf key store"},WRONG_VERSION:{error:200004,errorMessage:"The version is incorrect"},WRONG_KEY_STORE_VERSION:{error:200005,errorMessage:"Not a V1 key store"}}},function(e,t,r){"use strict";var n,i,o=e.exports=r(20),s=r(84);o.codegen=r(151),o.fetch=r(152),o.path=r(153),o.fs=o.inquire("fs"),o.toArray=function(e){if(e){for(var t=Object.keys(e),r=new Array(t.length),n=0;n<t.length;)r[n]=e[t[n++]];return r}return[]},o.toObject=function(e){for(var t={},r=0;r<e.length;){var n=e[r++],i=e[r++];void 0!==i&&(t[n]=i)}return t};var a=/\\/g,f=/"/g;o.isReserved=function(e){return/^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(e)},o.safeProp=function(e){return!/^[$\w_]+$/.test(e)||o.isReserved(e)?'["'+e.replace(a,"\\\\").replace(f,'\\"')+'"]':"."+e},o.ucFirst=function(e){return e.charAt(0).toUpperCase()+e.substring(1)};var c=/_([a-z])/g;o.camelCase=function(e){return e.substring(0,1)+e.substring(1).replace(c,function(e,t){return t.toUpperCase()})},o.compareFieldsById=function(e,t){return e.id-t.id},o.decorateType=function(e,t){if(e.$type)return t&&e.$type.name!==t&&(o.decorateRoot.remove(e.$type),e.$type.name=t,o.decorateRoot.add(e.$type)),e.$type;n||(n=r(56));var i=new n(t||e.name);return o.decorateRoot.add(i),i.ctor=e,Object.defineProperty(e,"$type",{value:i,enumerable:!1}),Object.defineProperty(e.prototype,"$type",{value:i,enumerable:!1}),i};var u=0;o.decorateEnum=function(e){if(e.$type)return e.$type;i||(i=r(18));var t=new i("Enum"+u++,e);return o.decorateRoot.add(t),Object.defineProperty(e,"$type",{value:t,enumerable:!1}),t},Object.defineProperty(o,"decorateRoot",{get:function(){return s.decorated||(s.decorated=new(r(61)))}})},function(e,t,r){"use strict";var n=t;n.version=r(161).version,n.utils=r(162),n.rand=r(92),n.curve=r(42),n.curves=r(170),n.ec=r(178),n.eddsa=r(182)},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t,r){var n=r(17);e.exports=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},i=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),i.forEach(function(t){n(e,t,r[t])})}return e}},function(e,t){function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.exports=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t){function r(e,t){if(!e)throw new Error(t||"Assertion failed")}e.exports=r,r.equal=function(e,t,r){if(e!=t)throw new Error(r||"Assertion failed: "+e+" != "+t)}},function(e,t,r){var n;e.exports=(n=n||function(e,t){var r=Object.create||function(){function e(){}return function(t){var r;return e.prototype=t,r=new e,e.prototype=null,r}}(),n={},i=n.lib={},o=i.Base={extend:function(e){var t=r(this);return e&&t.mixIn(e),t.hasOwnProperty("init")&&this.init!==t.init||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},s=i.WordArray=o.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=null!=t?t:4*e.length},toString:function(e){return(e||f).stringify(this)},concat:function(e){var t=this.words,r=e.words,n=this.sigBytes,i=e.sigBytes;if(this.clamp(),n%4)for(var o=0;o<i;o++){var s=r[o>>>2]>>>24-o%4*8&255;t[n+o>>>2]|=s<<24-(n+o)%4*8}else for(var o=0;o<i;o+=4)t[n+o>>>2]=r[o>>>2];return this.sigBytes+=i,this},clamp:function(){var t=this.words,r=this.sigBytes;t[r>>>2]&=4294967295<<32-r%4*8,t.length=e.ceil(r/4)},clone:function(){var e=o.clone.call(this);return e.words=this.words.slice(0),e},random:function(t){for(var r,n=[],i=function(t){var t=t,r=987654321,n=4294967295;return function(){var i=((r=36969*(65535&r)+(r>>16)&n)<<16)+(t=18e3*(65535&t)+(t>>16)&n)&n;return i/=4294967296,(i+=.5)*(e.random()>.5?1:-1)}},o=0;o<t;o+=4){var a=i(4294967296*(r||e.random()));r=987654071*a(),n.push(4294967296*a()|0)}return new s.init(n,t)}}),a=n.enc={},f=a.Hex={stringify:function(e){for(var t=e.words,r=e.sigBytes,n=[],i=0;i<r;i++){var o=t[i>>>2]>>>24-i%4*8&255;n.push((o>>>4).toString(16)),n.push((15&o).toString(16))}return n.join("")},parse:function(e){for(var t=e.length,r=[],n=0;n<t;n+=2)r[n>>>3]|=parseInt(e.substr(n,2),16)<<24-n%8*4;return new s.init(r,t/2)}},c=a.Latin1={stringify:function(e){for(var t=e.words,r=e.sigBytes,n=[],i=0;i<r;i++){var o=t[i>>>2]>>>24-i%4*8&255;n.push(String.fromCharCode(o))}return n.join("")},parse:function(e){for(var t=e.length,r=[],n=0;n<t;n++)r[n>>>2]|=(255&e.charCodeAt(n))<<24-n%4*8;return new s.init(r,t)}},u=a.Utf8={stringify:function(e){try{return decodeURIComponent(escape(c.stringify(e)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(e){return c.parse(unescape(encodeURIComponent(e)))}},h=i.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=new s.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=u.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var r=this._data,n=r.words,i=r.sigBytes,o=this.blockSize,a=4*o,f=i/a,c=(f=t?e.ceil(f):e.max((0|f)-this._minBufferSize,0))*o,u=e.min(4*c,i);if(c){for(var h=0;h<c;h+=o)this._doProcessBlock(n,h);var d=n.splice(0,c);r.sigBytes-=u}return new s.init(d,u)},clone:function(){var e=o.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0}),d=(i.Hasher=h.extend({cfg:o.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){h.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){e&&this._append(e);var t=this._doFinalize();return t},blockSize:16,_createHelper:function(e){return function(t,r){return new e.init(r).finalize(t)}},_createHmacHelper:function(e){return function(t,r){return new d.HMAC.init(e,r).finalize(t)}}}),n.algo={});return n}(Math),n)},function(e,t,r){"use strict";r.r(t),function(e){r.d(t,"kernelRootProto",function(){return f}),r.d(t,"authProto",function(){return c}),r.d(t,"crossChainProto",function(){return u}),r.d(t,"Transaction",function(){return h}),r.d(t,"Hash",function(){return d}),r.d(t,"Address",function(){return l}),r.d(t,"Approval",function(){return p}),r.d(t,"Authorization",function(){return b}),r.d(t,"Proposal",function(){return y}),r.d(t,"ProposalStatus",function(){return m}),r.d(t,"SideChainInfo",function(){return g}),r.d(t,"SideChainStatus",function(){return v}),r.d(t,"ResourceTypeBalancePair",function(){return _}),r.d(t,"arrayBufferToHex",function(){return w}),r.d(t,"getRepForAddress",function(){return E}),r.d(t,"getAddressFromRep",function(){return S}),r.d(t,"getAddressObjectFromRep",function(){return A}),r.d(t,"getRepForHash",function(){return k}),r.d(t,"getHashFromHex",function(){return x}),r.d(t,"getHashObjectFromHex",function(){return I}),r.d(t,"encodeTransaction",function(){return T}),r.d(t,"getTransaction",function(){return M}),r.d(t,"getMsigTransaction",function(){return O});var n=r(16),i=r(133),o=r(134),s=r(135),a=r(3),f=n.Root.fromJSON(i),c=n.Root.fromJSON(o),u=n.Root.fromJSON(s),h=f.Transaction,d=f.Hash,l=f.Address,p=c.Approval,b=c.Authorization,y=c.Proposal,m=c.ProposalStatus,g=u.SideChainInfo,v=u.SideChainStatus,_=u.ResourceTypeBalancePair,w=function(e){return Array.prototype.map.call(new Uint8Array(e),function(e){return"0".concat(e.toString(16)).slice(-2)}).join("")},E=function(t){var r=f.Address.fromObject(t),n="";return n=r.value instanceof e?r.value.toString("hex"):w(r.value),a.encodeAddressRep(n)},S=function(t){var r=a.decodeAddressRep(t);return f.Address.create({value:e.from(r.replace("0x",""),"hex")})},A=function(e){return f.Address.toObject(S(e))},k=function(t){var r=f.Address.fromObject(t);return r.value instanceof e?r.value.toString("hex"):w(r.value)},x=function(t){return f.Hash.create({value:e.from(t.replace("0x",""),"hex")})},I=function(e){return f.Hash.toObject(x(e))},T=function(e){return f.Transaction.encode(e).finish()},M=function(e,t,r,n){var i={from:S(e),to:S(t),methodName:r,params:n};return f.Transaction.create(i)},O=function(e,t,r,n){var i={from:S(e),to:S(t),methodName:r,params:n,type:f.TransactionType.MsigTransaction};return f.Transaction.create(i)}}.call(this,r(2).Buffer)},function(e,t){var r,n,i=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(r===setTimeout)return setTimeout(e,0);if((r===o||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:o}catch(e){r=o}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(e){n=s}}();var f,c=[],u=!1,h=-1;function d(){u&&f&&(u=!1,f.length?c=f.concat(c):h=-1,c.length&&l())}function l(){if(!u){var e=a(d);u=!0;for(var t=c.length;t;){for(f=c,c=[];++h<t;)f&&f[h].run();h=-1,t=c.length}f=null,u=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function b(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];c.push(new p(e,t)),1!==c.length||u||a(l)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=b,i.addListener=b,i.once=b,i.off=b,i.removeListener=b,i.removeAllListeners=b,i.emit=b,i.prependListener=b,i.prependOnceListener=b,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(e,t,r){"use strict";e.exports=r(79)},function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},function(e,t,r){"use strict";e.exports=s;var n=r(28);((s.prototype=Object.create(n.prototype)).constructor=s).className="Enum";var i=r(33),o=r(6);function s(e,t,r,i,o){if(n.call(this,e,r),t&&"object"!=typeof t)throw TypeError("values must be an object");if(this.valuesById={},this.values=Object.create(this.valuesById),this.comment=i,this.comments=o||{},this.reserved=void 0,t)for(var s=Object.keys(t),a=0;a<s.length;++a)"number"==typeof t[s[a]]&&(this.valuesById[this.values[s[a]]=t[s[a]]]=s[a])}s.fromJSON=function(e,t){var r=new s(e,t.values,t.options,t.comment,t.comments);return r.reserved=t.reserved,r},s.prototype.toJSON=function(e){var t=!!e&&Boolean(e.keepComments);return o.toObject(["options",this.options,"values",this.values,"reserved",this.reserved&&this.reserved.length?this.reserved:void 0,"comment",t?this.comment:void 0,"comments",t?this.comments:void 0])},s.prototype.add=function(e,t,r){if(!o.isString(e))throw TypeError("name must be a string");if(!o.isInteger(t))throw TypeError("id must be an integer");if(void 0!==this.values[e])throw Error("duplicate name '"+e+"' in "+this);if(this.isReservedId(t))throw Error("id "+t+" is reserved in "+this);if(this.isReservedName(e))throw Error("name '"+e+"' is reserved in "+this);if(void 0!==this.valuesById[t]){if(!this.options||!this.options.allow_alias)throw Error("duplicate id "+t+" in "+this);this.values[e]=t}else this.valuesById[this.values[e]=t]=e;return this.comments[e]=r||null,this},s.prototype.remove=function(e){if(!o.isString(e))throw TypeError("name must be a string");var t=this.values[e];if(null==t)throw Error("name '"+e+"' does not exist in "+this);return delete this.valuesById[t],delete this.values[e],delete this.comments[e],this},s.prototype.isReservedId=function(e){return i.isReservedId(this.reserved,e)},s.prototype.isReservedName=function(e){return i.isReservedName(this.reserved,e)}},function(e,t,r){"use strict";var n=r(12),i=r(1);function o(e,t){return 55296==(64512&e.charCodeAt(t))&&(!(t<0||t+1>=e.length)&&56320==(64512&e.charCodeAt(t+1)))}function s(e){return(e>>>24|e>>>8&65280|e<<8&16711680|(255&e)<<24)>>>0}function a(e){return 1===e.length?"0"+e:e}function f(e){return 7===e.length?"0"+e:6===e.length?"00"+e:5===e.length?"000"+e:4===e.length?"0000"+e:3===e.length?"00000"+e:2===e.length?"000000"+e:1===e.length?"0000000"+e:e}t.inherits=i,t.toArray=function(e,t){if(Array.isArray(e))return e.slice();if(!e)return[];var r=[];if("string"==typeof e)if(t){if("hex"===t)for((e=e.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(e="0"+e),i=0;i<e.length;i+=2)r.push(parseInt(e[i]+e[i+1],16))}else for(var n=0,i=0;i<e.length;i++){var s=e.charCodeAt(i);s<128?r[n++]=s:s<2048?(r[n++]=s>>6|192,r[n++]=63&s|128):o(e,i)?(s=65536+((1023&s)<<10)+(1023&e.charCodeAt(++i)),r[n++]=s>>18|240,r[n++]=s>>12&63|128,r[n++]=s>>6&63|128,r[n++]=63&s|128):(r[n++]=s>>12|224,r[n++]=s>>6&63|128,r[n++]=63&s|128)}else for(i=0;i<e.length;i++)r[i]=0|e[i];return r},t.toHex=function(e){for(var t="",r=0;r<e.length;r++)t+=a(e[r].toString(16));return t},t.htonl=s,t.toHex32=function(e,t){for(var r="",n=0;n<e.length;n++){var i=e[n];"little"===t&&(i=s(i)),r+=f(i.toString(16))}return r},t.zero2=a,t.zero8=f,t.join32=function(e,t,r,i){var o=r-t;n(o%4==0);for(var s=new Array(o/4),a=0,f=t;a<s.length;a++,f+=4){var c;c="big"===i?e[f]<<24|e[f+1]<<16|e[f+2]<<8|e[f+3]:e[f+3]<<24|e[f+2]<<16|e[f+1]<<8|e[f],s[a]=c>>>0}return s},t.split32=function(e,t){for(var r=new Array(4*e.length),n=0,i=0;n<e.length;n++,i+=4){var o=e[n];"big"===t?(r[i]=o>>>24,r[i+1]=o>>>16&255,r[i+2]=o>>>8&255,r[i+3]=255&o):(r[i+3]=o>>>24,r[i+2]=o>>>16&255,r[i+1]=o>>>8&255,r[i]=255&o)}return r},t.rotr32=function(e,t){return e>>>t|e<<32-t},t.rotl32=function(e,t){return e<<t|e>>>32-t},t.sum32=function(e,t){return e+t>>>0},t.sum32_3=function(e,t,r){return e+t+r>>>0},t.sum32_4=function(e,t,r,n){return e+t+r+n>>>0},t.sum32_5=function(e,t,r,n,i){return e+t+r+n+i>>>0},t.sum64=function(e,t,r,n){var i=e[t],o=n+e[t+1]>>>0,s=(o<n?1:0)+r+i;e[t]=s>>>0,e[t+1]=o},t.sum64_hi=function(e,t,r,n){return(t+n>>>0<t?1:0)+e+r>>>0},t.sum64_lo=function(e,t,r,n){return t+n>>>0},t.sum64_4_hi=function(e,t,r,n,i,o,s,a){var f=0,c=t;return f+=(c=c+n>>>0)<t?1:0,f+=(c=c+o>>>0)<o?1:0,e+r+i+s+(f+=(c=c+a>>>0)<a?1:0)>>>0},t.sum64_4_lo=function(e,t,r,n,i,o,s,a){return t+n+o+a>>>0},t.sum64_5_hi=function(e,t,r,n,i,o,s,a,f,c){var u=0,h=t;return u+=(h=h+n>>>0)<t?1:0,u+=(h=h+o>>>0)<o?1:0,u+=(h=h+a>>>0)<a?1:0,e+r+i+s+f+(u+=(h=h+c>>>0)<c?1:0)>>>0},t.sum64_5_lo=function(e,t,r,n,i,o,s,a,f,c){return t+n+o+a+c>>>0},t.rotr64_hi=function(e,t,r){return(t<<32-r|e>>>r)>>>0},t.rotr64_lo=function(e,t,r){return(e<<32-r|t>>>r)>>>0},t.shr64_hi=function(e,t,r){return e>>>r},t.shr64_lo=function(e,t,r){return(e<<32-r|t>>>r)>>>0}},function(e,t,r){"use strict";(function(e){var n=t;function i(e,t,r){for(var n=Object.keys(t),i=0;i<n.length;++i)void 0!==e[n[i]]&&r||(e[n[i]]=t[n[i]]);return e}function o(e){function t(e,r){if(!(this instanceof t))return new t(e,r);Object.defineProperty(this,"message",{get:function(){return e}}),Error.captureStackTrace?Error.captureStackTrace(this,t):Object.defineProperty(this,"stack",{value:(new Error).stack||""}),r&&i(this,r)}return(t.prototype=Object.create(Error.prototype)).constructor=t,Object.defineProperty(t.prototype,"name",{get:function(){return e}}),t.prototype.toString=function(){return this.name+": "+this.message},t}n.asPromise=r(80),n.base64=r(140),n.EventEmitter=r(141),n.float=r(142),n.inquire=r(81),n.utf8=r(143),n.pool=r(144),n.LongBits=r(145),n.global="undefined"!=typeof window&&window||void 0!==e&&e||"undefined"!=typeof self&&self||this,n.emptyArray=Object.freeze?Object.freeze([]):[],n.emptyObject=Object.freeze?Object.freeze({}):{},n.isNode=Boolean(n.global.process&&n.global.process.versions&&n.global.process.versions.node),n.isInteger=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},n.isString=function(e){return"string"==typeof e||e instanceof String},n.isObject=function(e){return e&&"object"==typeof e},n.isset=n.isSet=function(e,t){var r=e[t];return!(null==r||!e.hasOwnProperty(t))&&("object"!=typeof r||(Array.isArray(r)?r.length:Object.keys(r).length)>0)},n.BufferTemp=r(2).Buffer,n.Buffer=function(){try{var e=n.inquire("buffer").Buffer;return e.prototype.utf8Write?e:null}catch(e){return null}}(),n._Buffer_from=null,n._Buffer_allocUnsafe=null,n.newBuffer=function(e){return"number"==typeof e?n.Buffer?n._Buffer_allocUnsafe(e):new n.Array(e):n.Buffer?n._Buffer_from(e):"undefined"==typeof Uint8Array?e:new Uint8Array(e)},n.Array="undefined"!=typeof Uint8Array?Uint8Array:Array,n.Long=n.global.dcodeIO&&n.global.dcodeIO.Long||n.global.Long||n.inquire("long"),n.key2Re=/^true|false|0|1$/,n.key32Re=/^-?(?:0|[1-9][0-9]*)$/,n.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,n.longToHash=function(e){return e?n.LongBits.from(e).toHash():n.LongBits.zeroHash},n.longFromHash=function(e,t){var r=n.LongBits.fromHash(e);return n.Long?n.Long.fromBits(r.lo,r.hi,t):r.toNumber(Boolean(t))},n.merge=i,n.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)},n.newError=o,n.ProtocolError=o("ProtocolError"),n.oneOfGetter=function(e){for(var t={},r=0;r<e.length;++r)t[e[r]]=1;return function(){for(var e=Object.keys(this),r=e.length-1;r>-1;--r)if(1===t[e[r]]&&void 0!==this[e[r]]&&null!==this[e[r]])return e[r]}},n.oneOfSetter=function(e){return function(t){for(var r=0;r<e.length;++r)e[r]!==t&&delete this[e[r]]}},n.toJSONOptions={longs:String,enums:String,bytes:String,json:!0},n._configure=function(){var e=n.Buffer;if(!e)return n._Buffer_from=null,void(n._Buffer_allocUnsafe=function(e){return new n.BufferTemp(e)});n._Buffer_from=e.from!==Uint8Array.from&&e.from||function(t,r){return new e(t,r)},n._Buffer_allocUnsafe=e.allocUnsafe||function(t){return new e(t)}}}).call(this,r(11))},function(e,t,r){"use strict";var n=r(1),i=r(63),o=r(69),s=r(70),a=r(22);function f(e){a.call(this,"digest"),this._hash=e}n(f,a),f.prototype._update=function(e){this._hash.update(e)},f.prototype._final=function(){return this._hash.digest()},e.exports=function(e){return"md5"===(e=e.toLowerCase())?new i:"rmd160"===e||"ripemd160"===e?new o:new f(s(e))}},function(e,t,r){var n=r(0).Buffer,i=r(64).Transform,o=r(68).StringDecoder;function s(e){i.call(this),this.hashMode="string"==typeof e,this.hashMode?this[e]=this._finalOrDigest:this.final=this._finalOrDigest,this._final&&(this.__final=this._final,this._final=null),this._decoder=null,this._encoding=null}r(1)(s,i),s.prototype.update=function(e,t,r){"string"==typeof e&&(e=n.from(e,t));var i=this._update(e);return this.hashMode?this:(r&&(i=this._toString(i,r)),i)},s.prototype.setAutoPadding=function(){},s.prototype.getAuthTag=function(){throw new Error("trying to get auth tag in unsupported state")},s.prototype.setAuthTag=function(){throw new Error("trying to set auth tag in unsupported state")},s.prototype.setAAD=function(){throw new Error("trying to set aad in unsupported state")},s.prototype._transform=function(e,t,r){var n;try{this.hashMode?this._update(e):this.push(this._update(e))}catch(e){n=e}finally{r(n)}},s.prototype._flush=function(e){var t;try{this.push(this.__final())}catch(e){t=e}e(t)},s.prototype._finalOrDigest=function(e){var t=this.__final()||n.alloc(0);return e&&(t=this._toString(t,e,!0)),t},s.prototype._toString=function(e,t,r){if(this._decoder||(this._decoder=new o(t),this._encoding=t),this._encoding!==t)throw new Error("can't switch encodings");var n=this._decoder.write(e);return r&&(n+=this._decoder.end()),n},e.exports=s},function(module,exports,__webpack_require__){(function(process,global){var __WEBPACK_AMD_DEFINE_RESULT__;
/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";var ERROR="input is invalid type",WINDOW="object"==typeof window,root=WINDOW?window:{};root.JS_SHA256_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"==typeof self,NODE_JS=!root.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS?root=global:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_SHA256_NO_COMMON_JS&&"object"==typeof module&&module.exports,AMD=__webpack_require__(154),ARRAY_BUFFER=!root.JS_SHA256_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[-2147483648,8388608,32768,128],SHIFT=[24,16,8,0],K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],OUTPUT_TYPES=["hex","array","digest","arrayBuffer"],blocks=[];!root.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),!ARRAY_BUFFER||!root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(e){return"object"==typeof e&&e.buffer&&e.buffer.constructor===ArrayBuffer});var createOutputMethod=function(e,t){return function(r){return new Sha256(t,!0).update(r)[e]()}},createMethod=function(e){var t=createOutputMethod("hex",e);NODE_JS&&(t=nodeWrap(t,e)),t.create=function(){return new Sha256(e)},t.update=function(e){return t.create().update(e)};for(var r=0;r<OUTPUT_TYPES.length;++r){var n=OUTPUT_TYPES[r];t[n]=createOutputMethod(n,e)}return t},nodeWrap=function(method,is224){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),algorithm=is224?"sha224":"sha256",nodeMethod=function(e){if("string"==typeof e)return crypto.createHash(algorithm).update(e,"utf8").digest("hex");if(null==e)throw new Error(ERROR);return e.constructor===ArrayBuffer&&(e=new Uint8Array(e)),Array.isArray(e)||ArrayBuffer.isView(e)||e.constructor===Buffer?crypto.createHash(algorithm).update(new Buffer(e)).digest("hex"):method(e)};return nodeMethod},createHmacOutputMethod=function(e,t){return function(r,n){return new HmacSha256(r,t,!0).update(n)[e]()}},createHmacMethod=function(e){var t=createHmacOutputMethod("hex",e);t.create=function(t){return new HmacSha256(t,e)},t.update=function(e,r){return t.create(e).update(r)};for(var r=0;r<OUTPUT_TYPES.length;++r){var n=OUTPUT_TYPES[r];t[n]=createHmacOutputMethod(n,e)}return t};function Sha256(e,t){t?(blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],e?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=e}function HmacSha256(e,t,r){var n,i=typeof e;if("string"===i){var o,s=[],a=e.length,f=0;for(n=0;n<a;++n)(o=e.charCodeAt(n))<128?s[f++]=o:o<2048?(s[f++]=192|o>>6,s[f++]=128|63&o):o<55296||o>=57344?(s[f++]=224|o>>12,s[f++]=128|o>>6&63,s[f++]=128|63&o):(o=65536+((1023&o)<<10|1023&e.charCodeAt(++n)),s[f++]=240|o>>18,s[f++]=128|o>>12&63,s[f++]=128|o>>6&63,s[f++]=128|63&o);e=s}else{if("object"!==i)throw new Error(ERROR);if(null===e)throw new Error(ERROR);if(ARRAY_BUFFER&&e.constructor===ArrayBuffer)e=new Uint8Array(e);else if(!(Array.isArray(e)||ARRAY_BUFFER&&ArrayBuffer.isView(e)))throw new Error(ERROR)}e.length>64&&(e=new Sha256(t,!0).update(e).array());var c=[],u=[];for(n=0;n<64;++n){var h=e[n]||0;c[n]=92^h,u[n]=54^h}Sha256.call(this,t,r),this.update(u),this.oKeyPad=c,this.inner=!0,this.sharedMemory=r}Sha256.prototype.update=function(e){if(!this.finalized){var t,r=typeof e;if("string"!==r){if("object"!==r)throw new Error(ERROR);if(null===e)throw new Error(ERROR);if(ARRAY_BUFFER&&e.constructor===ArrayBuffer)e=new Uint8Array(e);else if(!(Array.isArray(e)||ARRAY_BUFFER&&ArrayBuffer.isView(e)))throw new Error(ERROR);t=!0}for(var n,i,o=0,s=e.length,a=this.blocks;o<s;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),t)for(i=this.start;o<s&&i<64;++o)a[i>>2]|=e[o]<<SHIFT[3&i++];else for(i=this.start;o<s&&i<64;++o)(n=e.charCodeAt(o))<128?a[i>>2]|=n<<SHIFT[3&i++]:n<2048?(a[i>>2]|=(192|n>>6)<<SHIFT[3&i++],a[i>>2]|=(128|63&n)<<SHIFT[3&i++]):n<55296||n>=57344?(a[i>>2]|=(224|n>>12)<<SHIFT[3&i++],a[i>>2]|=(128|n>>6&63)<<SHIFT[3&i++],a[i>>2]|=(128|63&n)<<SHIFT[3&i++]):(n=65536+((1023&n)<<10|1023&e.charCodeAt(++o)),a[i>>2]|=(240|n>>18)<<SHIFT[3&i++],a[i>>2]|=(128|n>>12&63)<<SHIFT[3&i++],a[i>>2]|=(128|n>>6&63)<<SHIFT[3&i++],a[i>>2]|=(128|63&n)<<SHIFT[3&i++]);this.lastByteIndex=i,this.bytes+=i-this.start,i>=64?(this.block=a[16],this.start=i-64,this.hash(),this.hashed=!0):this.start=i}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Sha256.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var e=this.blocks,t=this.lastByteIndex;e[16]=this.block,e[t>>2]|=EXTRA[3&t],this.block=e[16],t>=56&&(this.hashed||this.hash(),e[0]=this.block,e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0),e[14]=this.hBytes<<3|this.bytes>>>29,e[15]=this.bytes<<3,this.hash()}},Sha256.prototype.hash=function(){var e,t,r,n,i,o,s,a,f,c=this.h0,u=this.h1,h=this.h2,d=this.h3,l=this.h4,p=this.h5,b=this.h6,y=this.h7,m=this.blocks;for(e=16;e<64;++e)t=((i=m[e-15])>>>7|i<<25)^(i>>>18|i<<14)^i>>>3,r=((i=m[e-2])>>>17|i<<15)^(i>>>19|i<<13)^i>>>10,m[e]=m[e-16]+t+m[e-7]+r<<0;for(f=u&h,e=0;e<64;e+=4)this.first?(this.is224?(o=300032,y=(i=m[0]-1413257819)-150054599<<0,d=i+24177077<<0):(o=704751109,y=(i=m[0]-210244248)-1521486534<<0,d=i+143694565<<0),this.first=!1):(t=(c>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10),n=(o=c&u)^c&h^f,y=d+(i=y+(r=(l>>>6|l<<26)^(l>>>11|l<<21)^(l>>>25|l<<7))+(l&p^~l&b)+K[e]+m[e])<<0,d=i+(t+n)<<0),t=(d>>>2|d<<30)^(d>>>13|d<<19)^(d>>>22|d<<10),n=(s=d&c)^d&u^o,b=h+(i=b+(r=(y>>>6|y<<26)^(y>>>11|y<<21)^(y>>>25|y<<7))+(y&l^~y&p)+K[e+1]+m[e+1])<<0,t=((h=i+(t+n)<<0)>>>2|h<<30)^(h>>>13|h<<19)^(h>>>22|h<<10),n=(a=h&d)^h&c^s,p=u+(i=p+(r=(b>>>6|b<<26)^(b>>>11|b<<21)^(b>>>25|b<<7))+(b&y^~b&l)+K[e+2]+m[e+2])<<0,t=((u=i+(t+n)<<0)>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10),n=(f=u&h)^u&d^a,l=c+(i=l+(r=(p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+(p&b^~p&y)+K[e+3]+m[e+3])<<0,c=i+(t+n)<<0;this.h0=this.h0+c<<0,this.h1=this.h1+u<<0,this.h2=this.h2+h<<0,this.h3=this.h3+d<<0,this.h4=this.h4+l<<0,this.h5=this.h5+p<<0,this.h6=this.h6+b<<0,this.h7=this.h7+y<<0},Sha256.prototype.hex=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,n=this.h3,i=this.h4,o=this.h5,s=this.h6,a=this.h7,f=HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[n>>28&15]+HEX_CHARS[n>>24&15]+HEX_CHARS[n>>20&15]+HEX_CHARS[n>>16&15]+HEX_CHARS[n>>12&15]+HEX_CHARS[n>>8&15]+HEX_CHARS[n>>4&15]+HEX_CHARS[15&n]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]+HEX_CHARS[o>>28&15]+HEX_CHARS[o>>24&15]+HEX_CHARS[o>>20&15]+HEX_CHARS[o>>16&15]+HEX_CHARS[o>>12&15]+HEX_CHARS[o>>8&15]+HEX_CHARS[o>>4&15]+HEX_CHARS[15&o]+HEX_CHARS[s>>28&15]+HEX_CHARS[s>>24&15]+HEX_CHARS[s>>20&15]+HEX_CHARS[s>>16&15]+HEX_CHARS[s>>12&15]+HEX_CHARS[s>>8&15]+HEX_CHARS[s>>4&15]+HEX_CHARS[15&s];return this.is224||(f+=HEX_CHARS[a>>28&15]+HEX_CHARS[a>>24&15]+HEX_CHARS[a>>20&15]+HEX_CHARS[a>>16&15]+HEX_CHARS[a>>12&15]+HEX_CHARS[a>>8&15]+HEX_CHARS[a>>4&15]+HEX_CHARS[15&a]),f},Sha256.prototype.toString=Sha256.prototype.hex,Sha256.prototype.digest=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,n=this.h3,i=this.h4,o=this.h5,s=this.h6,a=this.h7,f=[e>>24&255,e>>16&255,e>>8&255,255&e,t>>24&255,t>>16&255,t>>8&255,255&t,r>>24&255,r>>16&255,r>>8&255,255&r,n>>24&255,n>>16&255,n>>8&255,255&n,i>>24&255,i>>16&255,i>>8&255,255&i,o>>24&255,o>>16&255,o>>8&255,255&o,s>>24&255,s>>16&255,s>>8&255,255&s];return this.is224||f.push(a>>24&255,a>>16&255,a>>8&255,255&a),f},Sha256.prototype.array=Sha256.prototype.digest,Sha256.prototype.arrayBuffer=function(){this.finalize();var e=new ArrayBuffer(this.is224?28:32),t=new DataView(e);return t.setUint32(0,this.h0),t.setUint32(4,this.h1),t.setUint32(8,this.h2),t.setUint32(12,this.h3),t.setUint32(16,this.h4),t.setUint32(20,this.h5),t.setUint32(24,this.h6),this.is224||t.setUint32(28,this.h7),e},HmacSha256.prototype=new Sha256,HmacSha256.prototype.finalize=function(){if(Sha256.prototype.finalize.call(this),this.inner){this.inner=!1;var e=this.array();Sha256.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(e),Sha256.prototype.finalize.call(this)}};var exports=createMethod();exports.sha256=exports,exports.sha224=createMethod(!0),exports.sha256.hmac=createHmacMethod(),exports.sha224.hmac=createHmacMethod(!0),COMMON_JS?module.exports=exports:(root.sha256=exports.sha256,root.sha224=exports.sha224,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))}()}).call(this,__webpack_require__(15),__webpack_require__(11))},function(e,t,r){var n;e.exports=(n=r(13),r(256),r(257),r(127),r(260),function(){var e=n,t=e.lib.BlockCipher,r=e.algo,i=[],o=[],s=[],a=[],f=[],c=[],u=[],h=[],d=[],l=[];!function(){for(var e=[],t=0;t<256;t++)e[t]=t<128?t<<1:t<<1^283;var r=0,n=0;for(t=0;t<256;t++){var p=n^n<<1^n<<2^n<<3^n<<4;p=p>>>8^255&p^99,i[r]=p,o[p]=r;var b=e[r],y=e[b],m=e[y],g=257*e[p]^16843008*p;s[r]=g<<24|g>>>8,a[r]=g<<16|g>>>16,f[r]=g<<8|g>>>24,c[r]=g,g=16843009*m^65537*y^257*b^16843008*r,u[p]=g<<24|g>>>8,h[p]=g<<16|g>>>16,d[p]=g<<8|g>>>24,l[p]=g,r?(r=b^e[e[e[m^b]]],n^=e[e[n]]):r=n=1}}();var p=[0,1,2,4,8,16,32,64,128,27,54],b=r.AES=t.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var e=this._keyPriorReset=this._key,t=e.words,r=e.sigBytes/4,n=4*((this._nRounds=r+6)+1),o=this._keySchedule=[],s=0;s<n;s++)if(s<r)o[s]=t[s];else{var a=o[s-1];s%r?r>6&&s%r==4&&(a=i[a>>>24]<<24|i[a>>>16&255]<<16|i[a>>>8&255]<<8|i[255&a]):(a=i[(a=a<<8|a>>>24)>>>24]<<24|i[a>>>16&255]<<16|i[a>>>8&255]<<8|i[255&a],a^=p[s/r|0]<<24),o[s]=o[s-r]^a}for(var f=this._invKeySchedule=[],c=0;c<n;c++)s=n-c,a=c%4?o[s]:o[s-4],f[c]=c<4||s<=4?a:u[i[a>>>24]]^h[i[a>>>16&255]]^d[i[a>>>8&255]]^l[i[255&a]]}},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._keySchedule,s,a,f,c,i)},decryptBlock:function(e,t){var r=e[t+1];e[t+1]=e[t+3],e[t+3]=r,this._doCryptBlock(e,t,this._invKeySchedule,u,h,d,l,o),r=e[t+1],e[t+1]=e[t+3],e[t+3]=r},_doCryptBlock:function(e,t,r,n,i,o,s,a){for(var f=this._nRounds,c=e[t]^r[0],u=e[t+1]^r[1],h=e[t+2]^r[2],d=e[t+3]^r[3],l=4,p=1;p<f;p++){var b=n[c>>>24]^i[u>>>16&255]^o[h>>>8&255]^s[255&d]^r[l++],y=n[u>>>24]^i[h>>>16&255]^o[d>>>8&255]^s[255&c]^r[l++],m=n[h>>>24]^i[d>>>16&255]^o[c>>>8&255]^s[255&u]^r[l++],g=n[d>>>24]^i[c>>>16&255]^o[u>>>8&255]^s[255&h]^r[l++];c=b,u=y,h=m,d=g}b=(a[c>>>24]<<24|a[u>>>16&255]<<16|a[h>>>8&255]<<8|a[255&d])^r[l++],y=(a[u>>>24]<<24|a[h>>>16&255]<<16|a[d>>>8&255]<<8|a[255&c])^r[l++],m=(a[h>>>24]<<24|a[d>>>16&255]<<16|a[c>>>8&255]<<8|a[255&u])^r[l++],g=(a[d>>>24]<<24|a[c>>>16&255]<<16|a[u>>>8&255]<<8|a[255&h])^r[l++],e[t]=b,e[t+1]=y,e[t+2]=m,e[t+3]=g},keySize:8});e.AES=t._createHelper(b)}(),n.AES)},function(e,t,r){"use strict";e.exports=c;var n=r(28);((c.prototype=Object.create(n.prototype)).constructor=c).className="Field";var i,o=r(18),s=r(29),a=r(6),f=/^required|optional|repeated$/;function c(e,t,r,i,o,c,u){if(a.isObject(i)?(u=o,c=i,i=o=void 0):a.isObject(o)&&(u=c,c=o,o=void 0),n.call(this,e,c),!a.isInteger(t)||t<0)throw TypeError("id must be a non-negative integer");if(!a.isString(r))throw TypeError("type must be a string");if(void 0!==i&&!f.test(i=i.toString().toLowerCase()))throw TypeError("rule must be a string rule");if(void 0!==o&&!a.isString(o))throw TypeError("extend must be a string");this.rule=i&&"optional"!==i?i:void 0,this.type=r,this.id=t,this.extend=o||void 0,this.required="required"===i,this.optional=!this.required,this.repeated="repeated"===i,this.map=!1,this.message=null,this.partOf=null,this.typeDefault=null,this.defaultValue=null,this.long=!!a.Long&&void 0!==s.long[r],this.bytes="bytes"===r,this.resolvedType=null,this.extensionField=null,this.declaringField=null,this._packed=null,this.comment=u}c.fromJSON=function(e,t){return new c(e,t.id,t.type,t.rule,t.extend,t.options,t.comment)},Object.defineProperty(c.prototype,"packed",{get:function(){return null===this._packed&&(this._packed=!1!==this.getOption("packed")),this._packed}}),c.prototype.setOption=function(e,t,r){return"packed"===e&&(this._packed=null),n.prototype.setOption.call(this,e,t,r)},c.prototype.toJSON=function(e){var t=!!e&&Boolean(e.keepComments);return a.toObject(["rule","optional"!==this.rule&&this.rule||void 0,"type",this.type,"id",this.id,"extend",this.extend,"options",this.options,"comment",t?this.comment:void 0])},c.prototype.resolve=function(){if(this.resolved)return this;if(void 0===(this.typeDefault=s.defaults[this.type])&&(this.resolvedType=(this.declaringField?this.declaringField.parent:this.parent).lookupTypeOrEnum(this.type),this.resolvedType instanceof i?this.typeDefault=null:this.typeDefault=this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]),this.options&&null!=this.options.default&&(this.typeDefault=this.options.default,this.resolvedType instanceof o&&"string"==typeof this.typeDefault&&(this.typeDefault=this.resolvedType.values[this.typeDefault])),this.options&&(!0!==this.options.packed&&(void 0===this.options.packed||!this.resolvedType||this.resolvedType instanceof o)||delete this.options.packed,Object.keys(this.options).length||(this.options=void 0)),this.long)this.typeDefault=a.Long.fromNumber(this.typeDefault,"u"===this.type.charAt(0)),Object.freeze&&Object.freeze(this.typeDefault);else if(this.bytes&&"string"==typeof this.typeDefault){var e;a.base64.test(this.typeDefault)?a.base64.decode(this.typeDefault,e=a.newBuffer(a.base64.length(this.typeDefault)),0):a.utf8.write(this.typeDefault,e=a.newBuffer(a.utf8.length(this.typeDefault)),0),this.typeDefault=e}return this.map?this.defaultValue=a.emptyObject:this.repeated?this.defaultValue=a.emptyArray:this.defaultValue=this.typeDefault,this.parent instanceof i&&(this.parent.ctor.prototype[this.name]=this.defaultValue),n.prototype.resolve.call(this)},c.d=function(e,t,r,n){return"function"==typeof t?t=a.decorateType(t).name:t&&"object"==typeof t&&(t=a.decorateEnum(t).name),function(i,o){a.decorateType(i.constructor).add(new c(o,e,t,r,{default:n}))}},c._configure=function(e){i=e}},function(e,t,r){"use strict";var n=r(43),i=Object.keys||function(e){var t=[];for(var r in e)t.push(r);return t};e.exports=h;var o=r(35);o.inherits=r(1);var s=r(97),a=r(67);o.inherits(h,s);for(var f=i(a.prototype),c=0;c<f.length;c++){var u=f[c];h.prototype[u]||(h.prototype[u]=a.prototype[u])}function h(e){if(!(this instanceof h))return new h(e);s.call(this,e),a.call(this,e),e&&!1===e.readable&&(this.readable=!1),e&&!1===e.writable&&(this.writable=!1),this.allowHalfOpen=!0,e&&!1===e.allowHalfOpen&&(this.allowHalfOpen=!1),this.once("end",d)}function d(){this.allowHalfOpen||this._writableState.ended||n.nextTick(l,this)}function l(e){e.end()}Object.defineProperty(h.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Object.defineProperty(h.prototype,"destroyed",{get:function(){return void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed&&this._writableState.destroyed)},set:function(e){void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed=e,this._writableState.destroyed=e)}}),h.prototype._destroy=function(e,t){this.push(null),this.end(),n.nextTick(t,e)}},function(e,t,r){"use strict";(function(t,n){var i=65536,o=4294967295;var s=r(0).Buffer,a=t.crypto||t.msCrypto;a&&a.getRandomValues?e.exports=function(e,t){if(e>o)throw new RangeError("requested too many random bytes");var r=s.allocUnsafe(e);if(e>0)if(e>i)for(var f=0;f<e;f+=i)a.getRandomValues(r.slice(f,f+i));else a.getRandomValues(r);if("function"==typeof t)return n.nextTick(function(){t(null,r)});return r}:e.exports=function(){throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")}}).call(this,r(11),r(15))},function(e,t,r){"use strict";e.exports=o,o.className="ReflectionObject";var n,i=r(6);function o(e,t){if(!i.isString(e))throw TypeError("name must be a string");if(t&&!i.isObject(t))throw TypeError("options must be an object");this.options=t,this.name=e,this.parent=null,this.resolved=!1,this.comment=null,this.filename=null}Object.defineProperties(o.prototype,{root:{get:function(){for(var e=this;null!==e.parent;)e=e.parent;return e}},fullName:{get:function(){for(var e=[this.name],t=this.parent;t;)e.unshift(t.name),t=t.parent;return e.join(".")}}}),o.prototype.toJSON=function(){throw Error()},o.prototype.onAdd=function(e){this.parent&&this.parent!==e&&this.parent.remove(this),this.parent=e,this.resolved=!1;var t=e.root;t instanceof n&&t._handleAdd(this)},o.prototype.onRemove=function(e){var t=e.root;t instanceof n&&t._handleRemove(this),this.parent=null,this.resolved=!1},o.prototype.resolve=function(){return this.resolved?this:(this.root instanceof n&&(this.resolved=!0),this)},o.prototype.getOption=function(e){if(this.options)return this.options[e]},o.prototype.setOption=function(e,t,r){return r&&this.options&&void 0!==this.options[e]||((this.options||(this.options={}))[e]=t),this},o.prototype.setOptions=function(e,t){if(e)for(var r=Object.keys(e),n=0;n<r.length;++n)this.setOption(r[n],e[r[n]],t);return this},o.prototype.toString=function(){var e=this.constructor.className,t=this.fullName;return t.length?e+" "+t:e},o._configure=function(e){n=e}},function(e,t,r){"use strict";var n=t,i=r(6),o=["double","float","int32","uint32","sint32","fixed32","sfixed32","int64","uint64","sint64","fixed64","sfixed64","bool","string","bytes"];function s(e,t){var r=0,n={};for(t|=0;r<e.length;)n[o[r+t]]=e[r++];return n}n.basic=s([1,5,0,0,0,5,5,0,0,0,1,1,0,2,2]),n.defaults=s([0,0,0,0,0,0,0,0,0,0,0,0,!1,"",i.emptyArray,null]),n.long=s([0,0,0,1,1],7),n.mapKey=s([0,0,0,5,5,0,0,0,1,1,0,2],2),n.packed=s([1,5,0,0,0,5,5,0,0,0,1,1,0])},function(e,t,r){var n=r(0).Buffer;function i(e,t){this._block=n.alloc(e),this._finalSize=t,this._blockSize=e,this._len=0}i.prototype.update=function(e,t){"string"==typeof e&&(t=t||"utf8",e=n.from(e,t));for(var r=this._block,i=this._blockSize,o=e.length,s=this._len,a=0;a<o;){for(var f=s%i,c=Math.min(o-a,i-f),u=0;u<c;u++)r[f+u]=e[a+u];a+=c,(s+=c)%i==0&&this._update(r)}return this._len+=o,this},i.prototype.digest=function(e){var t=this._len%this._blockSize;this._block[t]=128,this._block.fill(0,t+1),t>=this._finalSize&&(this._update(this._block),this._block.fill(0));var r=8*this._len;if(r<=4294967295)this._block.writeUInt32BE(r,this._blockSize-4);else{var n=(4294967295&r)>>>0,i=(r-n)/4294967296;this._block.writeUInt32BE(i,this._blockSize-8),this._block.writeUInt32BE(n,this._blockSize-4)}this._update(this._block);var o=this._hash();return e?o.toString(e):o},i.prototype._update=function(){throw new Error("_update must be implemented by subclass")},e.exports=i},function(e,t,r){var n;!function(i){"use strict";var o,s=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,a=Math.ceil,f=Math.floor,c="[BigNumber Error] ",u=c+"Number primitive has more than 15 significant digits: ",h=1e14,d=14,l=9007199254740991,p=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],b=1e7,y=1e9;function m(e){var t=0|e;return e>0||e===t?t:t-1}function g(e){for(var t,r,n=1,i=e.length,o=e[0]+"";n<i;){for(t=e[n++]+"",r=d-t.length;r--;t="0"+t);o+=t}for(i=o.length;48===o.charCodeAt(--i););return o.slice(0,i+1||1)}function v(e,t){var r,n,i=e.c,o=t.c,s=e.s,a=t.s,f=e.e,c=t.e;if(!s||!a)return null;if(r=i&&!i[0],n=o&&!o[0],r||n)return r?n?0:-a:s;if(s!=a)return s;if(r=s<0,n=f==c,!i||!o)return n?0:!i^r?1:-1;if(!n)return f>c^r?1:-1;for(a=(f=i.length)<(c=o.length)?f:c,s=0;s<a;s++)if(i[s]!=o[s])return i[s]>o[s]^r?1:-1;return f==c?0:f>c^r?1:-1}function _(e,t,r,n){if(e<t||e>r||e!==f(e))throw Error(c+(n||"Argument")+("number"==typeof e?e<t||e>r?" out of range: ":" not an integer: ":" not a primitive number: ")+String(e))}function w(e){var t=e.c.length-1;return m(e.e/d)==t&&e.c[t]%2!=0}function E(e,t){return(e.length>1?e.charAt(0)+"."+e.slice(1):e)+(t<0?"e":"e+")+t}function S(e,t,r){var n,i;if(t<0){for(i=r+".";++t;i+=r);e=i+e}else if(++t>(n=e.length)){for(i=r,t-=n;--t;i+=r);e+=i}else t<n&&(e=e.slice(0,t)+"."+e.slice(t));return e}(o=function e(t){var r,n,i,o,A,k,x,I,T,M=q.prototype={constructor:q,toString:null,valueOf:null},O=new q(1),R=20,B=4,C=-7,P=21,N=-1e7,D=1e7,j=!1,L=1,H=0,U={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},F="0123456789abcdefghijklmnopqrstuvwxyz";function q(e,t){var r,o,a,c,h,p,b,y,m=this;if(!(m instanceof q))return new q(e,t);if(null==t){if(e&&!0===e._isBigNumber)return m.s=e.s,void(!e.c||e.e>D?m.c=m.e=null:e.e<N?m.c=[m.e=0]:(m.e=e.e,m.c=e.c.slice()));if((p="number"==typeof e)&&0*e==0){if(m.s=1/e<0?(e=-e,-1):1,e===~~e){for(c=0,h=e;h>=10;h/=10,c++);return void(c>D?m.c=m.e=null:(m.e=c,m.c=[e]))}y=String(e)}else{if(!s.test(y=String(e)))return i(m,y,p);m.s=45==y.charCodeAt(0)?(y=y.slice(1),-1):1}(c=y.indexOf("."))>-1&&(y=y.replace(".","")),(h=y.search(/e/i))>0?(c<0&&(c=h),c+=+y.slice(h+1),y=y.substring(0,h)):c<0&&(c=y.length)}else{if(_(t,2,F.length,"Base"),10==t)return Y(m=new q(e),R+m.e+1,B);if(y=String(e),p="number"==typeof e){if(0*e!=0)return i(m,y,p,t);if(m.s=1/e<0?(y=y.slice(1),-1):1,q.DEBUG&&y.replace(/^0\.0*|\./,"").length>15)throw Error(u+e)}else m.s=45===y.charCodeAt(0)?(y=y.slice(1),-1):1;for(r=F.slice(0,t),c=h=0,b=y.length;h<b;h++)if(r.indexOf(o=y.charAt(h))<0){if("."==o){if(h>c){c=b;continue}}else if(!a&&(y==y.toUpperCase()&&(y=y.toLowerCase())||y==y.toLowerCase()&&(y=y.toUpperCase()))){a=!0,h=-1,c=0;continue}return i(m,String(e),p,t)}p=!1,(c=(y=n(y,t,10,m.s)).indexOf("."))>-1?y=y.replace(".",""):c=y.length}for(h=0;48===y.charCodeAt(h);h++);for(b=y.length;48===y.charCodeAt(--b););if(y=y.slice(h,++b)){if(b-=h,p&&q.DEBUG&&b>15&&(e>l||e!==f(e)))throw Error(u+m.s*e);if((c=c-h-1)>D)m.c=m.e=null;else if(c<N)m.c=[m.e=0];else{if(m.e=c,m.c=[],h=(c+1)%d,c<0&&(h+=d),h<b){for(h&&m.c.push(+y.slice(0,h)),b-=d;h<b;)m.c.push(+y.slice(h,h+=d));h=d-(y=y.slice(h)).length}else h-=b;for(;h--;y+="0");m.c.push(+y)}}else m.c=[m.e=0]}function z(e,t,r,n){var i,o,s,a,f;if(null==r?r=B:_(r,0,8),!e.c)return e.toString();if(i=e.c[0],s=e.e,null==t)f=g(e.c),f=1==n||2==n&&(s<=C||s>=P)?E(f,s):S(f,s,"0");else if(o=(e=Y(new q(e),t,r)).e,a=(f=g(e.c)).length,1==n||2==n&&(t<=o||o<=C)){for(;a<t;f+="0",a++);f=E(f,o)}else if(t-=s,f=S(f,o,"0"),o+1>a){if(--t>0)for(f+=".";t--;f+="0");}else if((t+=o-a)>0)for(o+1==a&&(f+=".");t--;f+="0");return e.s<0&&i?"-"+f:f}function K(e,t){for(var r,n=1,i=new q(e[0]);n<e.length;n++){if(!(r=new q(e[n])).s){i=r;break}t.call(i,r)&&(i=r)}return i}function V(e,t,r){for(var n=1,i=t.length;!t[--i];t.pop());for(i=t[0];i>=10;i/=10,n++);return(r=n+r*d-1)>D?e.c=e.e=null:r<N?e.c=[e.e=0]:(e.e=r,e.c=t),e}function Y(e,t,r,n){var i,o,s,c,u,l,b,y=e.c,m=p;if(y){e:{for(i=1,c=y[0];c>=10;c/=10,i++);if((o=t-i)<0)o+=d,s=t,b=(u=y[l=0])/m[i-s-1]%10|0;else if((l=a((o+1)/d))>=y.length){if(!n)break e;for(;y.length<=l;y.push(0));u=b=0,i=1,s=(o%=d)-d+1}else{for(u=c=y[l],i=1;c>=10;c/=10,i++);b=(s=(o%=d)-d+i)<0?0:u/m[i-s-1]%10|0}if(n=n||t<0||null!=y[l+1]||(s<0?u:u%m[i-s-1]),n=r<4?(b||n)&&(0==r||r==(e.s<0?3:2)):b>5||5==b&&(4==r||n||6==r&&(o>0?s>0?u/m[i-s]:0:y[l-1])%10&1||r==(e.s<0?8:7)),t<1||!y[0])return y.length=0,n?(t-=e.e+1,y[0]=m[(d-t%d)%d],e.e=-t||0):y[0]=e.e=0,e;if(0==o?(y.length=l,c=1,l--):(y.length=l+1,c=m[d-o],y[l]=s>0?f(u/m[i-s]%m[s])*c:0),n)for(;;){if(0==l){for(o=1,s=y[0];s>=10;s/=10,o++);for(s=y[0]+=c,c=1;s>=10;s/=10,c++);o!=c&&(e.e++,y[0]==h&&(y[0]=1));break}if(y[l]+=c,y[l]!=h)break;y[l--]=0,c=1}for(o=y.length;0===y[--o];y.pop());}e.e>D?e.c=e.e=null:e.e<N&&(e.c=[e.e=0])}return e}function G(e){var t,r=e.e;return null===r?e.toString():(t=g(e.c),t=r<=C||r>=P?E(t,r):S(t,r,"0"),e.s<0?"-"+t:t)}return q.clone=e,q.ROUND_UP=0,q.ROUND_DOWN=1,q.ROUND_CEIL=2,q.ROUND_FLOOR=3,q.ROUND_HALF_UP=4,q.ROUND_HALF_DOWN=5,q.ROUND_HALF_EVEN=6,q.ROUND_HALF_CEIL=7,q.ROUND_HALF_FLOOR=8,q.EUCLID=9,q.config=q.set=function(e){var t,r;if(null!=e){if("object"!=typeof e)throw Error(c+"Object expected: "+e);if(e.hasOwnProperty(t="DECIMAL_PLACES")&&(_(r=e[t],0,y,t),R=r),e.hasOwnProperty(t="ROUNDING_MODE")&&(_(r=e[t],0,8,t),B=r),e.hasOwnProperty(t="EXPONENTIAL_AT")&&((r=e[t])&&r.pop?(_(r[0],-y,0,t),_(r[1],0,y,t),C=r[0],P=r[1]):(_(r,-y,y,t),C=-(P=r<0?-r:r))),e.hasOwnProperty(t="RANGE"))if((r=e[t])&&r.pop)_(r[0],-y,-1,t),_(r[1],1,y,t),N=r[0],D=r[1];else{if(_(r,-y,y,t),!r)throw Error(c+t+" cannot be zero: "+r);N=-(D=r<0?-r:r)}if(e.hasOwnProperty(t="CRYPTO")){if((r=e[t])!==!!r)throw Error(c+t+" not true or false: "+r);if(r){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw j=!r,Error(c+"crypto unavailable");j=r}else j=r}if(e.hasOwnProperty(t="MODULO_MODE")&&(_(r=e[t],0,9,t),L=r),e.hasOwnProperty(t="POW_PRECISION")&&(_(r=e[t],0,y,t),H=r),e.hasOwnProperty(t="FORMAT")){if("object"!=typeof(r=e[t]))throw Error(c+t+" not an object: "+r);U=r}if(e.hasOwnProperty(t="ALPHABET")){if("string"!=typeof(r=e[t])||/^.$|[+-.\s]|(.).*\1/.test(r))throw Error(c+t+" invalid: "+r);F=r}}return{DECIMAL_PLACES:R,ROUNDING_MODE:B,EXPONENTIAL_AT:[C,P],RANGE:[N,D],CRYPTO:j,MODULO_MODE:L,POW_PRECISION:H,FORMAT:U,ALPHABET:F}},q.isBigNumber=function(e){if(!e||!0!==e._isBigNumber)return!1;if(!q.DEBUG)return!0;var t,r,n=e.c,i=e.e,o=e.s;e:if("[object Array]"=={}.toString.call(n)){if((1===o||-1===o)&&i>=-y&&i<=y&&i===f(i)){if(0===n[0]){if(0===i&&1===n.length)return!0;break e}if((t=(i+1)%d)<1&&(t+=d),String(n[0]).length==t){for(t=0;t<n.length;t++)if((r=n[t])<0||r>=h||r!==f(r))break e;if(0!==r)return!0}}}else if(null===n&&null===i&&(null===o||1===o||-1===o))return!0;throw Error(c+"Invalid BigNumber: "+e)},q.maximum=q.max=function(){return K(arguments,M.lt)},q.minimum=q.min=function(){return K(arguments,M.gt)},q.random=(o=9007199254740992*Math.random()&2097151?function(){return f(9007199254740992*Math.random())}:function(){return 8388608*(1073741824*Math.random()|0)+(8388608*Math.random()|0)},function(e){var t,r,n,i,s,u=0,h=[],l=new q(O);if(null==e?e=R:_(e,0,y),i=a(e/d),j)if(crypto.getRandomValues){for(t=crypto.getRandomValues(new Uint32Array(i*=2));u<i;)(s=131072*t[u]+(t[u+1]>>>11))>=9e15?(r=crypto.getRandomValues(new Uint32Array(2)),t[u]=r[0],t[u+1]=r[1]):(h.push(s%1e14),u+=2);u=i/2}else{if(!crypto.randomBytes)throw j=!1,Error(c+"crypto unavailable");for(t=crypto.randomBytes(i*=7);u<i;)(s=281474976710656*(31&t[u])+1099511627776*t[u+1]+4294967296*t[u+2]+16777216*t[u+3]+(t[u+4]<<16)+(t[u+5]<<8)+t[u+6])>=9e15?crypto.randomBytes(7).copy(t,u):(h.push(s%1e14),u+=7);u=i/7}if(!j)for(;u<i;)(s=o())<9e15&&(h[u++]=s%1e14);for(i=h[--u],e%=d,i&&e&&(s=p[d-e],h[u]=f(i/s)*s);0===h[u];h.pop(),u--);if(u<0)h=[n=0];else{for(n=-1;0===h[0];h.splice(0,1),n-=d);for(u=1,s=h[0];s>=10;s/=10,u++);u<d&&(n-=d-u)}return l.e=n,l.c=h,l}),q.sum=function(){for(var e=1,t=arguments,r=new q(t[0]);e<t.length;)r=r.plus(t[e++]);return r},n=function(){function e(e,t,r,n){for(var i,o,s=[0],a=0,f=e.length;a<f;){for(o=s.length;o--;s[o]*=t);for(s[0]+=n.indexOf(e.charAt(a++)),i=0;i<s.length;i++)s[i]>r-1&&(null==s[i+1]&&(s[i+1]=0),s[i+1]+=s[i]/r|0,s[i]%=r)}return s.reverse()}return function(t,n,i,o,s){var a,f,c,u,h,d,l,p,b=t.indexOf("."),y=R,m=B;for(b>=0&&(u=H,H=0,t=t.replace(".",""),d=(p=new q(n)).pow(t.length-b),H=u,p.c=e(S(g(d.c),d.e,"0"),10,i,"0123456789"),p.e=p.c.length),c=u=(l=e(t,n,i,s?(a=F,"0123456789"):(a="0123456789",F))).length;0==l[--u];l.pop());if(!l[0])return a.charAt(0);if(b<0?--c:(d.c=l,d.e=c,d.s=o,l=(d=r(d,p,y,m,i)).c,h=d.r,c=d.e),b=l[f=c+y+1],u=i/2,h=h||f<0||null!=l[f+1],h=m<4?(null!=b||h)&&(0==m||m==(d.s<0?3:2)):b>u||b==u&&(4==m||h||6==m&&1&l[f-1]||m==(d.s<0?8:7)),f<1||!l[0])t=h?S(a.charAt(1),-y,a.charAt(0)):a.charAt(0);else{if(l.length=f,h)for(--i;++l[--f]>i;)l[f]=0,f||(++c,l=[1].concat(l));for(u=l.length;!l[--u];);for(b=0,t="";b<=u;t+=a.charAt(l[b++]));t=S(t,c,a.charAt(0))}return t}}(),r=function(){function e(e,t,r){var n,i,o,s,a=0,f=e.length,c=t%b,u=t/b|0;for(e=e.slice();f--;)a=((i=c*(o=e[f]%b)+(n=u*o+(s=e[f]/b|0)*c)%b*b+a)/r|0)+(n/b|0)+u*s,e[f]=i%r;return a&&(e=[a].concat(e)),e}function t(e,t,r,n){var i,o;if(r!=n)o=r>n?1:-1;else for(i=o=0;i<r;i++)if(e[i]!=t[i]){o=e[i]>t[i]?1:-1;break}return o}function r(e,t,r,n){for(var i=0;r--;)e[r]-=i,i=e[r]<t[r]?1:0,e[r]=i*n+e[r]-t[r];for(;!e[0]&&e.length>1;e.splice(0,1));}return function(n,i,o,s,a){var c,u,l,p,b,y,g,v,_,w,E,S,A,k,x,I,T,M=n.s==i.s?1:-1,O=n.c,R=i.c;if(!(O&&O[0]&&R&&R[0]))return new q(n.s&&i.s&&(O?!R||O[0]!=R[0]:R)?O&&0==O[0]||!R?0*M:M/0:NaN);for(_=(v=new q(M)).c=[],M=o+(u=n.e-i.e)+1,a||(a=h,u=m(n.e/d)-m(i.e/d),M=M/d|0),l=0;R[l]==(O[l]||0);l++);if(R[l]>(O[l]||0)&&u--,M<0)_.push(1),p=!0;else{for(k=O.length,I=R.length,l=0,M+=2,(b=f(a/(R[0]+1)))>1&&(R=e(R,b,a),O=e(O,b,a),I=R.length,k=O.length),A=I,E=(w=O.slice(0,I)).length;E<I;w[E++]=0);T=R.slice(),T=[0].concat(T),x=R[0],R[1]>=a/2&&x++;do{if(b=0,(c=t(R,w,I,E))<0){if(S=w[0],I!=E&&(S=S*a+(w[1]||0)),(b=f(S/x))>1)for(b>=a&&(b=a-1),g=(y=e(R,b,a)).length,E=w.length;1==t(y,w,g,E);)b--,r(y,I<g?T:R,g,a),g=y.length,c=1;else 0==b&&(c=b=1),g=(y=R.slice()).length;if(g<E&&(y=[0].concat(y)),r(w,y,E,a),E=w.length,-1==c)for(;t(R,w,I,E)<1;)b++,r(w,I<E?T:R,E,a),E=w.length}else 0===c&&(b++,w=[0]);_[l++]=b,w[0]?w[E++]=O[A]||0:(w=[O[A]],E=1)}while((A++<k||null!=w[0])&&M--);p=null!=w[0],_[0]||_.splice(0,1)}if(a==h){for(l=1,M=_[0];M>=10;M/=10,l++);Y(v,o+(v.e=l+u*d-1)+1,s,p)}else v.e=u,v.r=+p;return v}}(),A=/^(-?)0([xbo])(?=\w[\w.]*$)/i,k=/^([^.]+)\.$/,x=/^\.([^.]+)$/,I=/^-?(Infinity|NaN)$/,T=/^\s*\+(?=[\w.])|^\s+|\s+$/g,i=function(e,t,r,n){var i,o=r?t:t.replace(T,"");if(I.test(o))e.s=isNaN(o)?null:o<0?-1:1;else{if(!r&&(o=o.replace(A,function(e,t,r){return i="x"==(r=r.toLowerCase())?16:"b"==r?2:8,n&&n!=i?e:t}),n&&(i=n,o=o.replace(k,"$1").replace(x,"0.$1")),t!=o))return new q(o,i);if(q.DEBUG)throw Error(c+"Not a"+(n?" base "+n:"")+" number: "+t);e.s=null}e.c=e.e=null},M.absoluteValue=M.abs=function(){var e=new q(this);return e.s<0&&(e.s=1),e},M.comparedTo=function(e,t){return v(this,new q(e,t))},M.decimalPlaces=M.dp=function(e,t){var r,n,i,o=this;if(null!=e)return _(e,0,y),null==t?t=B:_(t,0,8),Y(new q(o),e+o.e+1,t);if(!(r=o.c))return null;if(n=((i=r.length-1)-m(this.e/d))*d,i=r[i])for(;i%10==0;i/=10,n--);return n<0&&(n=0),n},M.dividedBy=M.div=function(e,t){return r(this,new q(e,t),R,B)},M.dividedToIntegerBy=M.idiv=function(e,t){return r(this,new q(e,t),0,1)},M.exponentiatedBy=M.pow=function(e,t){var r,n,i,o,s,u,h,l,p=this;if((e=new q(e)).c&&!e.isInteger())throw Error(c+"Exponent not an integer: "+G(e));if(null!=t&&(t=new q(t)),s=e.e>14,!p.c||!p.c[0]||1==p.c[0]&&!p.e&&1==p.c.length||!e.c||!e.c[0])return l=new q(Math.pow(+G(p),s?2-w(e):+G(e))),t?l.mod(t):l;if(u=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new q(NaN);(n=!u&&p.isInteger()&&t.isInteger())&&(p=p.mod(t))}else{if(e.e>9&&(p.e>0||p.e<-1||(0==p.e?p.c[0]>1||s&&p.c[1]>=24e7:p.c[0]<8e13||s&&p.c[0]<=9999975e7)))return o=p.s<0&&w(e)?-0:0,p.e>-1&&(o=1/o),new q(u?1/o:o);H&&(o=a(H/d+2))}for(s?(r=new q(.5),u&&(e.s=1),h=w(e)):h=(i=Math.abs(+G(e)))%2,l=new q(O);;){if(h){if(!(l=l.times(p)).c)break;o?l.c.length>o&&(l.c.length=o):n&&(l=l.mod(t))}if(i){if(0===(i=f(i/2)))break;h=i%2}else if(Y(e=e.times(r),e.e+1,1),e.e>14)h=w(e);else{if(0==(i=+G(e)))break;h=i%2}p=p.times(p),o?p.c&&p.c.length>o&&(p.c.length=o):n&&(p=p.mod(t))}return n?l:(u&&(l=O.div(l)),t?l.mod(t):o?Y(l,H,B,void 0):l)},M.integerValue=function(e){var t=new q(this);return null==e?e=B:_(e,0,8),Y(t,t.e+1,e)},M.isEqualTo=M.eq=function(e,t){return 0===v(this,new q(e,t))},M.isFinite=function(){return!!this.c},M.isGreaterThan=M.gt=function(e,t){return v(this,new q(e,t))>0},M.isGreaterThanOrEqualTo=M.gte=function(e,t){return 1===(t=v(this,new q(e,t)))||0===t},M.isInteger=function(){return!!this.c&&m(this.e/d)>this.c.length-2},M.isLessThan=M.lt=function(e,t){return v(this,new q(e,t))<0},M.isLessThanOrEqualTo=M.lte=function(e,t){return-1===(t=v(this,new q(e,t)))||0===t},M.isNaN=function(){return!this.s},M.isNegative=function(){return this.s<0},M.isPositive=function(){return this.s>0},M.isZero=function(){return!!this.c&&0==this.c[0]},M.minus=function(e,t){var r,n,i,o,s=this,a=s.s;if(t=(e=new q(e,t)).s,!a||!t)return new q(NaN);if(a!=t)return e.s=-t,s.plus(e);var f=s.e/d,c=e.e/d,u=s.c,l=e.c;if(!f||!c){if(!u||!l)return u?(e.s=-t,e):new q(l?s:NaN);if(!u[0]||!l[0])return l[0]?(e.s=-t,e):new q(u[0]?s:3==B?-0:0)}if(f=m(f),c=m(c),u=u.slice(),a=f-c){for((o=a<0)?(a=-a,i=u):(c=f,i=l),i.reverse(),t=a;t--;i.push(0));i.reverse()}else for(n=(o=(a=u.length)<(t=l.length))?a:t,a=t=0;t<n;t++)if(u[t]!=l[t]){o=u[t]<l[t];break}if(o&&(i=u,u=l,l=i,e.s=-e.s),(t=(n=l.length)-(r=u.length))>0)for(;t--;u[r++]=0);for(t=h-1;n>a;){if(u[--n]<l[n]){for(r=n;r&&!u[--r];u[r]=t);--u[r],u[n]+=h}u[n]-=l[n]}for(;0==u[0];u.splice(0,1),--c);return u[0]?V(e,u,c):(e.s=3==B?-1:1,e.c=[e.e=0],e)},M.modulo=M.mod=function(e,t){var n,i,o=this;return e=new q(e,t),!o.c||!e.s||e.c&&!e.c[0]?new q(NaN):!e.c||o.c&&!o.c[0]?new q(o):(9==L?(i=e.s,e.s=1,n=r(o,e,0,3),e.s=i,n.s*=i):n=r(o,e,0,L),(e=o.minus(n.times(e))).c[0]||1!=L||(e.s=o.s),e)},M.multipliedBy=M.times=function(e,t){var r,n,i,o,s,a,f,c,u,l,p,y,g,v,_,w=this,E=w.c,S=(e=new q(e,t)).c;if(!(E&&S&&E[0]&&S[0]))return!w.s||!e.s||E&&!E[0]&&!S||S&&!S[0]&&!E?e.c=e.e=e.s=null:(e.s*=w.s,E&&S?(e.c=[0],e.e=0):e.c=e.e=null),e;for(n=m(w.e/d)+m(e.e/d),e.s*=w.s,(f=E.length)<(l=S.length)&&(g=E,E=S,S=g,i=f,f=l,l=i),i=f+l,g=[];i--;g.push(0));for(v=h,_=b,i=l;--i>=0;){for(r=0,p=S[i]%_,y=S[i]/_|0,o=i+(s=f);o>i;)r=((c=p*(c=E[--s]%_)+(a=y*c+(u=E[s]/_|0)*p)%_*_+g[o]+r)/v|0)+(a/_|0)+y*u,g[o--]=c%v;g[o]=r}return r?++n:g.splice(0,1),V(e,g,n)},M.negated=function(){var e=new q(this);return e.s=-e.s||null,e},M.plus=function(e,t){var r,n=this,i=n.s;if(t=(e=new q(e,t)).s,!i||!t)return new q(NaN);if(i!=t)return e.s=-t,n.minus(e);var o=n.e/d,s=e.e/d,a=n.c,f=e.c;if(!o||!s){if(!a||!f)return new q(i/0);if(!a[0]||!f[0])return f[0]?e:new q(a[0]?n:0*i)}if(o=m(o),s=m(s),a=a.slice(),i=o-s){for(i>0?(s=o,r=f):(i=-i,r=a),r.reverse();i--;r.push(0));r.reverse()}for((i=a.length)-(t=f.length)<0&&(r=f,f=a,a=r,t=i),i=0;t;)i=(a[--t]=a[t]+f[t]+i)/h|0,a[t]=h===a[t]?0:a[t]%h;return i&&(a=[i].concat(a),++s),V(e,a,s)},M.precision=M.sd=function(e,t){var r,n,i,o=this;if(null!=e&&e!==!!e)return _(e,1,y),null==t?t=B:_(t,0,8),Y(new q(o),e,t);if(!(r=o.c))return null;if(n=(i=r.length-1)*d+1,i=r[i]){for(;i%10==0;i/=10,n--);for(i=r[0];i>=10;i/=10,n++);}return e&&o.e+1>n&&(n=o.e+1),n},M.shiftedBy=function(e){return _(e,-l,l),this.times("1e"+e)},M.squareRoot=M.sqrt=function(){var e,t,n,i,o,s=this,a=s.c,f=s.s,c=s.e,u=R+4,h=new q("0.5");if(1!==f||!a||!a[0])return new q(!f||f<0&&(!a||a[0])?NaN:a?s:1/0);if(0==(f=Math.sqrt(+G(s)))||f==1/0?(((t=g(a)).length+c)%2==0&&(t+="0"),f=Math.sqrt(+t),c=m((c+1)/2)-(c<0||c%2),n=new q(t=f==1/0?"1e"+c:(t=f.toExponential()).slice(0,t.indexOf("e")+1)+c)):n=new q(f+""),n.c[0])for((f=(c=n.e)+u)<3&&(f=0);;)if(o=n,n=h.times(o.plus(r(s,o,u,1))),g(o.c).slice(0,f)===(t=g(n.c)).slice(0,f)){if(n.e<c&&--f,"9999"!=(t=t.slice(f-3,f+1))&&(i||"4999"!=t)){+t&&(+t.slice(1)||"5"!=t.charAt(0))||(Y(n,n.e+R+2,1),e=!n.times(n).eq(s));break}if(!i&&(Y(o,o.e+R+2,0),o.times(o).eq(s))){n=o;break}u+=4,f+=4,i=1}return Y(n,n.e+R+1,B,e)},M.toExponential=function(e,t){return null!=e&&(_(e,0,y),e++),z(this,e,t,1)},M.toFixed=function(e,t){return null!=e&&(_(e,0,y),e=e+this.e+1),z(this,e,t)},M.toFormat=function(e,t,r){var n,i=this;if(null==r)null!=e&&t&&"object"==typeof t?(r=t,t=null):e&&"object"==typeof e?(r=e,e=t=null):r=U;else if("object"!=typeof r)throw Error(c+"Argument not an object: "+r);if(n=i.toFixed(e,t),i.c){var o,s=n.split("."),a=+r.groupSize,f=+r.secondaryGroupSize,u=r.groupSeparator||"",h=s[0],d=s[1],l=i.s<0,p=l?h.slice(1):h,b=p.length;if(f&&(o=a,a=f,f=o,b-=o),a>0&&b>0){for(o=b%a||a,h=p.substr(0,o);o<b;o+=a)h+=u+p.substr(o,a);f>0&&(h+=u+p.slice(o)),l&&(h="-"+h)}n=d?h+(r.decimalSeparator||"")+((f=+r.fractionGroupSize)?d.replace(new RegExp("\\d{"+f+"}\\B","g"),"$&"+(r.fractionGroupSeparator||"")):d):h}return(r.prefix||"")+n+(r.suffix||"")},M.toFraction=function(e){var t,n,i,o,s,a,f,u,h,l,b,y,m=this,v=m.c;if(null!=e&&(!(f=new q(e)).isInteger()&&(f.c||1!==f.s)||f.lt(O)))throw Error(c+"Argument "+(f.isInteger()?"out of range: ":"not an integer: ")+G(f));if(!v)return new q(m);for(t=new q(O),h=n=new q(O),i=u=new q(O),y=g(v),s=t.e=y.length-m.e-1,t.c[0]=p[(a=s%d)<0?d+a:a],e=!e||f.comparedTo(t)>0?s>0?t:h:f,a=D,D=1/0,f=new q(y),u.c[0]=0;l=r(f,t,0,1),1!=(o=n.plus(l.times(i))).comparedTo(e);)n=i,i=o,h=u.plus(l.times(o=h)),u=o,t=f.minus(l.times(o=t)),f=o;return o=r(e.minus(n),i,0,1),u=u.plus(o.times(h)),n=n.plus(o.times(i)),u.s=h.s=m.s,b=r(h,i,s*=2,B).minus(m).abs().comparedTo(r(u,n,s,B).minus(m).abs())<1?[h,i]:[u,n],D=a,b},M.toNumber=function(){return+G(this)},M.toPrecision=function(e,t){return null!=e&&_(e,1,y),z(this,e,t,2)},M.toString=function(e){var t,r=this,i=r.s,o=r.e;return null===o?i?(t="Infinity",i<0&&(t="-"+t)):t="NaN":(null==e?t=o<=C||o>=P?E(g(r.c),o):S(g(r.c),o,"0"):10===e?t=S(g((r=Y(new q(r),R+o+1,B)).c),r.e,"0"):(_(e,2,F.length,"Base"),t=n(S(g(r.c),o,"0"),10,e,i,!0)),i<0&&r.c[0]&&(t="-"+t)),t},M.valueOf=M.toJSON=function(){return G(this)},M._isBigNumber=!0,null!=t&&q.set(t),q}()).default=o.BigNumber=o,void 0===(n=function(){return o}.call(t,r,t,e))||(e.exports=n)}()},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});const n=r(21),i=r(44),o=r(27),s=r(107);let a=s._default;const f="Invalid mnemonic",c="Invalid entropy",u="Invalid mnemonic checksum",h="A wordlist is required but a default could not be found.\nPlease explicitly pass a 2048 word array explicitly.";function d(e,t,r){for(;e.length<r;)e=t+e;return e}function l(e){return parseInt(e,2)}function p(e){return e.map(e=>d(e.toString(2),"0",8)).join("")}function b(e){const t=8*e.length/32;return p([...n("sha256").update(e).digest()]).slice(0,t)}function y(e){return"mnemonic"+(e||"")}function m(t,r){if(!(r=r||a))throw new Error(h);const n=(t||"").normalize("NFKD").split(" ");if(n.length%3!=0)throw new Error(f);const i=n.map(e=>{const t=r.indexOf(e);if(-1===t)throw new Error(f);return d(t.toString(2),"0",11)}).join(""),o=32*Math.floor(i.length/33),s=i.slice(0,o),p=i.slice(o),y=s.match(/(.{1,8})/g).map(l);if(y.length<16)throw new Error(c);if(y.length>32)throw new Error(c);if(y.length%4!=0)throw new Error(c);const m=e.from(y);if(b(m)!==p)throw new Error(u);return m.toString("hex")}function g(t,r){if(e.isBuffer(t)||(t=e.from(t,"hex")),!(r=r||a))throw new Error(h);if(t.length<16)throw new TypeError(c);if(t.length>32)throw new TypeError(c);if(t.length%4!=0)throw new TypeError(c);const n=(p([...t])+b(t)).match(/(.{1,11})/g).map(e=>{const t=l(e);return r[t]});return"あいこくしん"===r[0]?n.join("　"):n.join(" ")}t.mnemonicToSeedSync=function(t,r){const n=e.from((t||"").normalize("NFKD"),"utf8"),o=e.from(y((r||"").normalize("NFKD")),"utf8");return i.pbkdf2Sync(n,o,2048,64,"sha512")},t.mnemonicToSeed=function(t,r){return new Promise((n,o)=>{try{const s=e.from((t||"").normalize("NFKD"),"utf8"),a=e.from(y((r||"").normalize("NFKD")),"utf8");i.pbkdf2(s,a,2048,64,"sha512",(e,t)=>e?o(e):n(t))}catch(e){return o(e)}})},t.mnemonicToEntropy=m,t.entropyToMnemonic=g,t.generateMnemonic=function(e,t,r){if((e=e||128)%32!=0)throw new TypeError(c);return g((t=t||o)(e/8),r)},t.validateMnemonic=function(e,t){try{m(e,t)}catch(e){return!1}return!0},t.setDefaultWordlist=function(e){const t=s.wordlists[e];if(!t)throw new Error('Could not find wordlist for language "'+e+'"');a=t},t.getDefaultWordlist=function(){if(!a)throw new Error("No Default Wordlist set");return Object.keys(s.wordlists).filter(e=>"JA"!==e&&"EN"!==e&&s.wordlists[e].every((e,t)=>e===a[t]))[0]};var v=r(107);t.wordlists=v.wordlists}).call(this,r(2).Buffer)},function(e,t,r){"use strict";e.exports=u;var n=r(28);((u.prototype=Object.create(n.prototype)).constructor=u).className="Namespace";var i,o,s,a=r(25),f=r(6);function c(e,t){if(e&&e.length){for(var r={},n=0;n<e.length;++n)r[e[n].name]=e[n].toJSON(t);return r}}function u(e,t){n.call(this,e,t),this.nested=void 0,this._nestedArray=null}function h(e){return e._nestedArray=null,e}u.fromJSON=function(e,t){return new u(e,t.options).addJSON(t.nested)},u.arrayToJSON=c,u.isReservedId=function(e,t){if(e)for(var r=0;r<e.length;++r)if("string"!=typeof e[r]&&e[r][0]<=t&&e[r][1]>=t)return!0;return!1},u.isReservedName=function(e,t){if(e)for(var r=0;r<e.length;++r)if(e[r]===t)return!0;return!1},Object.defineProperty(u.prototype,"nestedArray",{get:function(){return this._nestedArray||(this._nestedArray=f.toArray(this.nested))}}),u.prototype.toJSON=function(e){return f.toObject(["options",this.options,"nested",c(this.nestedArray,e)])},u.prototype.addJSON=function(e){if(e)for(var t,r=Object.keys(e),n=0;n<r.length;++n)t=e[r[n]],this.add((void 0!==t.fields?i.fromJSON:void 0!==t.values?s.fromJSON:void 0!==t.methods?o.fromJSON:void 0!==t.id?a.fromJSON:u.fromJSON)(r[n],t));return this},u.prototype.get=function(e){return this.nested&&this.nested[e]||null},u.prototype.getEnum=function(e){if(this.nested&&this.nested[e]instanceof s)return this.nested[e].values;throw Error("no such enum: "+e)},u.prototype.add=function(e){if(!(e instanceof a&&void 0!==e.extend||e instanceof i||e instanceof s||e instanceof o||e instanceof u))throw TypeError("object must be a valid nested object");if(this.nested){var t=this.get(e.name);if(t){if(!(t instanceof u&&e instanceof u)||t instanceof i||t instanceof o)throw Error("duplicate name '"+e.name+"' in "+this);for(var r=t.nestedArray,n=0;n<r.length;++n)e.add(r[n]);this.remove(t),this.nested||(this.nested={}),e.setOptions(t.options,!0)}}else this.nested={};return this.nested[e.name]=e,e.onAdd(this),h(this)},u.prototype.remove=function(e){if(!(e instanceof n))throw TypeError("object must be a ReflectionObject");if(e.parent!==this)throw Error(e+" is not a member of "+this);return delete this.nested[e.name],Object.keys(this.nested).length||(this.nested=void 0),e.onRemove(this),h(this)},u.prototype.define=function(e,t){if(f.isString(e))e=e.split(".");else if(!Array.isArray(e))throw TypeError("illegal path");if(e&&e.length&&""===e[0])throw Error("path must be relative");for(var r=this;e.length>0;){var n=e.shift();if(r.nested&&r.nested[n]){if(!((r=r.nested[n])instanceof u))throw Error("path conflicts with non-namespace objects")}else r.add(r=new u(n))}return t&&r.addJSON(t),r},u.prototype.resolveAll=function(){for(var e=this.nestedArray,t=0;t<e.length;)e[t]instanceof u?e[t++].resolveAll():e[t++].resolve();return this.resolve()},u.prototype.lookup=function(e,t,r){if("boolean"==typeof t?(r=t,t=void 0):t&&!Array.isArray(t)&&(t=[t]),f.isString(e)&&e.length){if("."===e)return this.root;e=e.split(".")}else if(!e.length)return this;if(""===e[0])return this.root.lookup(e.slice(1),t);var n=this.get(e[0]);if(n){if(1===e.length){if(!t||t.indexOf(n.constructor)>-1)return n}else if(n instanceof u&&(n=n.lookup(e.slice(1),t,!0)))return n}else for(var i=0;i<this.nestedArray.length;++i)if(this._nestedArray[i]instanceof u&&(n=this._nestedArray[i].lookup(e,t,!0)))return n;return null===this.parent||r?null:this.parent.lookup(e,t)},u.prototype.lookupType=function(e){var t=this.lookup(e,[i]);if(!t)throw Error("no such type: "+e);return t},u.prototype.lookupEnum=function(e){var t=this.lookup(e,[s]);if(!t)throw Error("no such Enum '"+e+"' in "+this);return t},u.prototype.lookupTypeOrEnum=function(e){var t=this.lookup(e,[i,s]);if(!t)throw Error("no such Type or Enum '"+e+"' in "+this);return t},u.prototype.lookupService=function(e){var t=this.lookup(e,[o]);if(!t)throw Error("no such Service '"+e+"' in "+this);return t},u._configure=function(e,t,r){i=e,o=t,s=r}},function(e,t,r){"use strict";var n=r(19),i=r(12);function o(){this.pending=null,this.pendingTotal=0,this.blockSize=this.constructor.blockSize,this.outSize=this.constructor.outSize,this.hmacStrength=this.constructor.hmacStrength,this.padLength=this.constructor.padLength/8,this.endian="big",this._delta8=this.blockSize/8,this._delta32=this.blockSize/32}t.BlockHash=o,o.prototype.update=function(e,t){if(e=n.toArray(e,t),this.pending?this.pending=this.pending.concat(e):this.pending=e,this.pendingTotal+=e.length,this.pending.length>=this._delta8){var r=(e=this.pending).length%this._delta8;this.pending=e.slice(e.length-r,e.length),0===this.pending.length&&(this.pending=null),e=n.join32(e,0,e.length-r,this.endian);for(var i=0;i<e.length;i+=this._delta32)this._update(e,i,i+this._delta32)}return this},o.prototype.digest=function(e){return this.update(this._pad()),i(null===this.pending),this._digest(e)},o.prototype._pad=function(){var e=this.pendingTotal,t=this._delta8,r=t-(e+this.padLength)%t,n=new Array(r+this.padLength);n[0]=128;for(var i=1;i<r;i++)n[i]=0;if(e<<=3,"big"===this.endian){for(var o=8;o<this.padLength;o++)n[i++]=0;n[i++]=0,n[i++]=0,n[i++]=0,n[i++]=0,n[i++]=e>>>24&255,n[i++]=e>>>16&255,n[i++]=e>>>8&255,n[i++]=255&e}else for(n[i++]=255&e,n[i++]=e>>>8&255,n[i++]=e>>>16&255,n[i++]=e>>>24&255,n[i++]=0,n[i++]=0,n[i++]=0,n[i++]=0,o=8;o<this.padLength;o++)n[i++]=0;return n}},function(e,t,r){(function(e){function r(e){return Object.prototype.toString.call(e)}t.isArray=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===r(e)},t.isBoolean=function(e){return"boolean"==typeof e},t.isNull=function(e){return null===e},t.isNullOrUndefined=function(e){return null==e},t.isNumber=function(e){return"number"==typeof e},t.isString=function(e){return"string"==typeof e},t.isSymbol=function(e){return"symbol"==typeof e},t.isUndefined=function(e){return void 0===e},t.isRegExp=function(e){return"[object RegExp]"===r(e)},t.isObject=function(e){return"object"==typeof e&&null!==e},t.isDate=function(e){return"[object Date]"===r(e)},t.isError=function(e){return"[object Error]"===r(e)||e instanceof Error},t.isFunction=function(e){return"function"==typeof e},t.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},t.isBuffer=e.isBuffer}).call(this,r(2).Buffer)},function(e,t,r){(function(t){e.exports=function(e,r){for(var n=Math.min(e.length,r.length),i=new t(n),o=0;o<n;++o)i[o]=e[o]^r[o];return i}}).call(this,r(2).Buffer)},function(e,t,r){var n=t;n.bignum=r(4),n.define=r(231).define,n.base=r(38),n.constants=r(119),n.decoders=r(236),n.encoders=r(238)},function(e,t,r){var n=t;n.Reporter=r(233).Reporter,n.DecoderBuffer=r(118).DecoderBuffer,n.EncoderBuffer=r(118).EncoderBuffer,n.Node=r(234)},function(e,t,r){var n;e.exports=(n=r(13),n.enc.Utf8)},function(e,t,r){"use strict";(function(e){r.d(t,"a",function(){return a}),r.d(t,"b",function(){return f});var n=r(23),i=r.n(n).a.sha256,o=function(t){if(2!==t.length)throw new TypeError("Wrong data size.");e.compare(t[0],t[1])>0&&t.reverse();var r=e.concat(t);return r=e.from(i(r),"hex")},s=function(e){if(0===e.length)return null;e.length%2==1&&e.push(e[e.length-1]);for(var t=e.length/2,r=0,n=0;n<e.length-1;){var i=e[n++],s=e[n++];e.push(o([i,s])),++r===t&&(t%2==1&&1!==t&&(t++,e.push(e[e.length-1])),t/=2,r=0)}return e},a=function(e,t){return function(e,t,r){var n=e;if(0===r.length||n>=t)return null;for(var i=0,o=t,s=[];n<r.length-1;){var a=n%2==0?n+1:n-1;s.push(r[a]),o=o%2==0?o:o+1;var f=Math.floor((n-i)/2);n=(i+=o)+f,o/=2}return s}(e,t.length,s(t))},f=function(t){return e.from(i(t),"hex")}}).call(this,r(2).Buffer)},function(e,t,r){"use strict";e.exports=s;var n=r(28);((s.prototype=Object.create(n.prototype)).constructor=s).className="OneOf";var i=r(25),o=r(6);function s(e,t,r,i){if(Array.isArray(t)||(r=t,t=void 0),n.call(this,e,r),void 0!==t&&!Array.isArray(t))throw TypeError("fieldNames must be an Array");this.oneof=t||[],this.fieldsArray=[],this.comment=i}function a(e){if(e.parent)for(var t=0;t<e.fieldsArray.length;++t)e.fieldsArray[t].parent||e.parent.add(e.fieldsArray[t])}s.fromJSON=function(e,t){return new s(e,t.oneof,t.options,t.comment)},s.prototype.toJSON=function(e){var t=!!e&&Boolean(e.keepComments);return o.toObject(["options",this.options,"oneof",this.oneof,"comment",t?this.comment:void 0])},s.prototype.add=function(e){if(!(e instanceof i))throw TypeError("field must be a Field");return e.parent&&e.parent!==this.parent&&e.parent.remove(e),this.oneof.push(e.name),this.fieldsArray.push(e),e.partOf=this,a(this),this},s.prototype.remove=function(e){if(!(e instanceof i))throw TypeError("field must be a Field");var t=this.fieldsArray.indexOf(e);if(t<0)throw Error(e+" is not a member of "+this);return this.fieldsArray.splice(t,1),(t=this.oneof.indexOf(e.name))>-1&&this.oneof.splice(t,1),e.partOf=null,this},s.prototype.onAdd=function(e){n.prototype.onAdd.call(this,e);for(var t=0;t<this.oneof.length;++t){var r=e.get(this.oneof[t]);r&&!r.partOf&&(r.partOf=this,this.fieldsArray.push(r))}a(this)},s.prototype.onRemove=function(e){for(var t,r=0;r<this.fieldsArray.length;++r)(t=this.fieldsArray[r]).parent&&t.parent.remove(t);n.prototype.onRemove.call(this,e)},s.d=function(){for(var e=new Array(arguments.length),t=0;t<arguments.length;)e[t]=arguments[t++];return function(t,r){o.decorateType(t.constructor).add(new s(r,e)),Object.defineProperty(t,r,{get:o.oneOfGetter(e),set:o.oneOfSetter(e)})}}},function(e,t,r){"use strict";var n=t;n.base=r(166),n.short=r(167),n.mont=r(168),n.edwards=r(169)},function(e,t,r){"use strict";(function(t){void 0===t||!t.version||0===t.version.indexOf("v0.")||0===t.version.indexOf("v1.")&&0!==t.version.indexOf("v1.8.")?e.exports={nextTick:function(e,r,n,i){if("function"!=typeof e)throw new TypeError('"callback" argument must be a function');var o,s,a=arguments.length;switch(a){case 0:case 1:return t.nextTick(e);case 2:return t.nextTick(function(){e.call(null,r)});case 3:return t.nextTick(function(){e.call(null,r,n)});case 4:return t.nextTick(function(){e.call(null,r,n,i)});default:for(o=new Array(a-1),s=0;s<o.length;)o[s++]=arguments[s];return t.nextTick(function(){e.apply(null,o)})}}}:e.exports=t}).call(this,r(15))},function(e,t,r){t.pbkdf2=r(200),t.pbkdf2Sync=r(105)},function(e,t,r){var n=r(0).Buffer;function i(e){n.isBuffer(e)||(e=n.from(e));for(var t=e.length/4|0,r=new Array(t),i=0;i<t;i++)r[i]=e.readUInt32BE(4*i);return r}function o(e){for(;0<e.length;e++)e[0]=0}function s(e,t,r,n,i){for(var o,s,a,f,c=r[0],u=r[1],h=r[2],d=r[3],l=e[0]^t[0],p=e[1]^t[1],b=e[2]^t[2],y=e[3]^t[3],m=4,g=1;g<i;g++)o=c[l>>>24]^u[p>>>16&255]^h[b>>>8&255]^d[255&y]^t[m++],s=c[p>>>24]^u[b>>>16&255]^h[y>>>8&255]^d[255&l]^t[m++],a=c[b>>>24]^u[y>>>16&255]^h[l>>>8&255]^d[255&p]^t[m++],f=c[y>>>24]^u[l>>>16&255]^h[p>>>8&255]^d[255&b]^t[m++],l=o,p=s,b=a,y=f;return o=(n[l>>>24]<<24|n[p>>>16&255]<<16|n[b>>>8&255]<<8|n[255&y])^t[m++],s=(n[p>>>24]<<24|n[b>>>16&255]<<16|n[y>>>8&255]<<8|n[255&l])^t[m++],a=(n[b>>>24]<<24|n[y>>>16&255]<<16|n[l>>>8&255]<<8|n[255&p])^t[m++],f=(n[y>>>24]<<24|n[l>>>16&255]<<16|n[p>>>8&255]<<8|n[255&b])^t[m++],[o>>>=0,s>>>=0,a>>>=0,f>>>=0]}var a=[0,1,2,4,8,16,32,64,128,27,54],f=function(){for(var e=new Array(256),t=0;t<256;t++)e[t]=t<128?t<<1:t<<1^283;for(var r=[],n=[],i=[[],[],[],[]],o=[[],[],[],[]],s=0,a=0,f=0;f<256;++f){var c=a^a<<1^a<<2^a<<3^a<<4;c=c>>>8^255&c^99,r[s]=c,n[c]=s;var u=e[s],h=e[u],d=e[h],l=257*e[c]^16843008*c;i[0][s]=l<<24|l>>>8,i[1][s]=l<<16|l>>>16,i[2][s]=l<<8|l>>>24,i[3][s]=l,l=16843009*d^65537*h^257*u^16843008*s,o[0][c]=l<<24|l>>>8,o[1][c]=l<<16|l>>>16,o[2][c]=l<<8|l>>>24,o[3][c]=l,0===s?s=a=1:(s=u^e[e[e[d^u]]],a^=e[e[a]])}return{SBOX:r,INV_SBOX:n,SUB_MIX:i,INV_SUB_MIX:o}}();function c(e){this._key=i(e),this._reset()}c.blockSize=16,c.keySize=32,c.prototype.blockSize=c.blockSize,c.prototype.keySize=c.keySize,c.prototype._reset=function(){for(var e=this._key,t=e.length,r=t+6,n=4*(r+1),i=[],o=0;o<t;o++)i[o]=e[o];for(o=t;o<n;o++){var s=i[o-1];o%t==0?(s=s<<8|s>>>24,s=f.SBOX[s>>>24]<<24|f.SBOX[s>>>16&255]<<16|f.SBOX[s>>>8&255]<<8|f.SBOX[255&s],s^=a[o/t|0]<<24):t>6&&o%t==4&&(s=f.SBOX[s>>>24]<<24|f.SBOX[s>>>16&255]<<16|f.SBOX[s>>>8&255]<<8|f.SBOX[255&s]),i[o]=i[o-t]^s}for(var c=[],u=0;u<n;u++){var h=n-u,d=i[h-(u%4?0:4)];c[u]=u<4||h<=4?d:f.INV_SUB_MIX[0][f.SBOX[d>>>24]]^f.INV_SUB_MIX[1][f.SBOX[d>>>16&255]]^f.INV_SUB_MIX[2][f.SBOX[d>>>8&255]]^f.INV_SUB_MIX[3][f.SBOX[255&d]]}this._nRounds=r,this._keySchedule=i,this._invKeySchedule=c},c.prototype.encryptBlockRaw=function(e){return s(e=i(e),this._keySchedule,f.SUB_MIX,f.SBOX,this._nRounds)},c.prototype.encryptBlock=function(e){var t=this.encryptBlockRaw(e),r=n.allocUnsafe(16);return r.writeUInt32BE(t[0],0),r.writeUInt32BE(t[1],4),r.writeUInt32BE(t[2],8),r.writeUInt32BE(t[3],12),r},c.prototype.decryptBlock=function(e){var t=(e=i(e))[1];e[1]=e[3],e[3]=t;var r=s(e,this._invKeySchedule,f.INV_SUB_MIX,f.INV_SBOX,this._nRounds),o=n.allocUnsafe(16);return o.writeUInt32BE(r[0],0),o.writeUInt32BE(r[3],4),o.writeUInt32BE(r[2],8),o.writeUInt32BE(r[1],12),o},c.prototype.scrub=function(){o(this._keySchedule),o(this._invKeySchedule),o(this._key)},e.exports.AES=c},function(e,t,r){var n=r(0).Buffer,i=r(63);e.exports=function(e,t,r,o){if(n.isBuffer(e)||(e=n.from(e,"binary")),t&&(n.isBuffer(t)||(t=n.from(t,"binary")),8!==t.length))throw new RangeError("salt should be Buffer with 8 byte length");for(var s=r/8,a=n.alloc(s),f=n.alloc(o||0),c=n.alloc(0);s>0||o>0;){var u=new i;u.update(c),u.update(e),t&&u.update(t),c=u.digest();var h=0;if(s>0){var d=a.length-s;h=Math.min(s,c.length),c.copy(a,d,0,h),s-=h}if(h<c.length&&o>0){var l=f.length-o,p=Math.min(o,c.length-h);c.copy(f,l,h,h+p),o-=p}}return c.fill(0),{key:a,iv:f}}},function(e,t,r){var n=r(230),i=r(241),o=r(242),s=r(72),a=r(44),f=r(0).Buffer;function c(e){var t;"object"!=typeof e||f.isBuffer(e)||(t=e.passphrase,e=e.key),"string"==typeof e&&(e=f.from(e));var r,c,u=o(e,t),h=u.tag,d=u.data;switch(h){case"CERTIFICATE":c=n.certificate.decode(d,"der").tbsCertificate.subjectPublicKeyInfo;case"PUBLIC KEY":switch(c||(c=n.PublicKey.decode(d,"der")),r=c.algorithm.algorithm.join(".")){case"1.2.840.113549.1.1.1":return n.RSAPublicKey.decode(c.subjectPublicKey.data,"der");case"1.2.840.10045.2.1":return c.subjectPrivateKey=c.subjectPublicKey,{type:"ec",data:c};case"1.2.840.10040.4.1":return c.algorithm.params.pub_key=n.DSAparam.decode(c.subjectPublicKey.data,"der"),{type:"dsa",data:c.algorithm.params};default:throw new Error("unknown key id "+r)}throw new Error("unknown key type "+h);case"ENCRYPTED PRIVATE KEY":d=function(e,t){var r=e.algorithm.decrypt.kde.kdeparams.salt,n=parseInt(e.algorithm.decrypt.kde.kdeparams.iters.toString(),10),o=i[e.algorithm.decrypt.cipher.algo.join(".")],c=e.algorithm.decrypt.cipher.iv,u=e.subjectPrivateKey,h=parseInt(o.split("-")[1],10)/8,d=a.pbkdf2Sync(t,r,n,h,"sha1"),l=s.createDecipheriv(o,d,c),p=[];return p.push(l.update(u)),p.push(l.final()),f.concat(p)}(d=n.EncryptedPrivateKey.decode(d,"der"),t);case"PRIVATE KEY":switch(r=(c=n.PrivateKey.decode(d,"der")).algorithm.algorithm.join(".")){case"1.2.840.113549.1.1.1":return n.RSAPrivateKey.decode(c.subjectPrivateKey,"der");case"1.2.840.10045.2.1":return{curve:c.algorithm.curve,privateKey:n.ECPrivateKey.decode(c.subjectPrivateKey,"der").privateKey};case"1.2.840.10040.4.1":return c.algorithm.params.priv_key=n.DSAparam.decode(c.subjectPrivateKey,"der"),{type:"dsa",params:c.algorithm.params};default:throw new Error("unknown key id "+r)}throw new Error("unknown key type "+h);case"RSA PUBLIC KEY":return n.RSAPublicKey.decode(d,"der");case"RSA PRIVATE KEY":return n.RSAPrivateKey.decode(d,"der");case"DSA PRIVATE KEY":return{type:"dsa",params:n.DSAPrivateKey.decode(d,"der")};case"EC PRIVATE KEY":return{curve:(d=n.ECPrivateKey.decode(d,"der")).parameters.value,privateKey:d.privateKey};default:throw new Error("unknown key type "+h)}}e.exports=c,c.signature=n.signature},function(e,t,r){var n=r(155);e.exports=n("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")},function(e,t,r){"use strict";(function(e){var n=r(9),i=r.n(n),o=r(7),s=r.n(o),a=r(32),f=r(50),c=r.n(f),u=r(23),h=r.n(u),d=r(24),l=r.n(d),p=r(39),b=r.n(p),y=r(136),m=r(3),g=r(14),v=h.a.sha256,_=new s.a.ec("secp256k1"),w=function(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"m/44'/1616'/0'/0/0",i="",o="",s="",f="";switch(t){case"createNewWallet":i=a.generateMnemonic(),o=a.mnemonicToSeedSync(i).toString("hex"),s=c.a.fromMasterSeed(o).derive(n),f=_.keyFromPrivate(s.privateKey);break;case"getWalletByMnemonic":i=r,o=a.mnemonicToSeedSync(i).toString("hex"),s=c.a.fromMasterSeed(o).derive(n),f=_.keyFromPrivate(s.privateKey);break;case"getWalletByPrivateKey":f=_.keyFromPrivate(r);break;default:throw new Error("not a valid method")}var u,h,d,l=f.getPrivate("hex"),p=f.getPublic();return{mnemonic:i,BIP44Path:n,childWallet:s,keyPair:f,privateKey:l,address:(u=p.encode(),h=e.from(v(u),"hex"),d=v(h).slice(0,64),Object(m.encodeAddressRep)(d))}},E=function(t,r){var n=r.getPrivate("hex"),i=v(t),o=_.sign(e.from(i,"hex"),n,"hex",{canonical:!0}),s=[o.r.toString("hex",32),o.s.toString("hex",32),"0".concat(o.recoveryParam.toString())].join("");return e.from(s,"hex")};t.a={hdkey:c.a,bip39:a,sign:function(t,r){var n=e.from(t.replace("0x",""),"hex");return E(n,r)},signTransaction:function(e,t){var r=e.params;0===r.length&&(r=null);var n=g.Transaction.encode(e).finish(),o=E(n,t);return i()({},e,{params:r,signature:o})},createNewWallet:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"m/44'/1616'/0'/0/0";return w("createNewWallet","",e)},getWalletByMnemonic:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"m/44'/1616'/0'/0/0";return!!a.validateMnemonic(e)&&w("getWalletByMnemonic",e,t)},getWalletByPrivateKey:function(e){return 64===e.length&&w("getWalletByPrivateKey",e)},AESEncrypt:function(e,t){return l.a.encrypt(e,t).toString()},AESDecrypt:function(e,t){return l.a.decrypt(e,t).toString(b.a)},keyStore:y}}).call(this,r(2).Buffer)},function(e,t,r){var n=r(202),i=r(0).Buffer,o=r(205),s=r(249),a=r(250),f=i.from("Bitcoin seed","utf8"),c=78,u={private:76066276,public:76067358};function h(e){this.versions=e||u,this.depth=0,this.index=0,this._privateKey=null,this._publicKey=null,this.chainCode=null,this._fingerprint=0,this.parentFingerprint=0}function d(e,t,r){var n=i.allocUnsafe(c);n.writeUInt32BE(t,0),n.writeUInt8(e.depth,4);var o=e.depth?e.parentFingerprint:0;return n.writeUInt32BE(o,5),n.writeUInt32BE(e.index,9),e.chainCode.copy(n,13),r.copy(n,45),n}function l(e){var t=o.createHash("sha256").update(e).digest();return o.createHash("ripemd160").update(t).digest()}Object.defineProperty(h.prototype,"fingerprint",{get:function(){return this._fingerprint}}),Object.defineProperty(h.prototype,"identifier",{get:function(){return this._identifier}}),Object.defineProperty(h.prototype,"pubKeyHash",{get:function(){return this.identifier}}),Object.defineProperty(h.prototype,"privateKey",{get:function(){return this._privateKey},set:function(e){n.equal(e.length,32,"Private key must be 32 bytes."),n(!0===a.privateKeyVerify(e),"Invalid private key"),this._privateKey=e,this._publicKey=a.publicKeyCreate(e,!0),this._identifier=l(this.publicKey),this._fingerprint=this._identifier.slice(0,4).readUInt32BE(0)}}),Object.defineProperty(h.prototype,"publicKey",{get:function(){return this._publicKey},set:function(e){n(33===e.length||65===e.length,"Public key must be 33 or 65 bytes."),n(!0===a.publicKeyVerify(e),"Invalid public key"),this._publicKey=a.publicKeyConvert(e,!0),this._identifier=l(this.publicKey),this._fingerprint=this._identifier.slice(0,4).readUInt32BE(0),this._privateKey=null}}),Object.defineProperty(h.prototype,"privateExtendedKey",{get:function(){return this._privateKey?s.encode(d(this,this.versions.private,i.concat([i.alloc(1,0),this.privateKey]))):null}}),Object.defineProperty(h.prototype,"publicExtendedKey",{get:function(){return s.encode(d(this,this.versions.public,this.publicKey))}}),h.prototype.derive=function(e){if("m"===e||"M"===e||"m'"===e||"M'"===e)return this;var t=e.split("/"),r=this;return t.forEach(function(e,t){if(0!==t){var i=e.length>1&&"'"===e[e.length-1],o=parseInt(e,10);n(o<2147483648,"Invalid index"),i&&(o+=2147483648),r=r.deriveChild(o)}else n(/^[mM]{1}/.test(e),'Path must start with "m" or "M"')}),r},h.prototype.deriveChild=function(e){var t,r=e>=2147483648,s=i.allocUnsafe(4);if(s.writeUInt32BE(e,0),r){n(this.privateKey,"Could not derive hardened child key");var f=this.privateKey,c=i.alloc(1,0);f=i.concat([c,f]),t=i.concat([f,s])}else t=i.concat([this.publicKey,s]);var u=o.createHmac("sha512",this.chainCode).update(t).digest(),d=u.slice(0,32),l=u.slice(32),p=new h(this.versions);if(this.privateKey)try{p.privateKey=a.privateKeyTweakAdd(this.privateKey,d)}catch(t){return this.derive(e+1)}else try{p.publicKey=a.publicKeyTweakAdd(this.publicKey,d,!0)}catch(t){return this.derive(e+1,r)}return p.chainCode=l,p.depth=this.depth+1,p.parentFingerprint=this.fingerprint,p.index=e,p},h.prototype.sign=function(e){return a.sign(e,this.privateKey).signature},h.prototype.verify=function(e,t){return a.verify(e,t,this.publicKey)},h.prototype.wipePrivateData=function(){return this._privateKey&&o.randomBytes(this._privateKey.length).copy(this._privateKey),this._privateKey=null,this},h.prototype.toJSON=function(){return{xpriv:this.privateExtendedKey,xpub:this.publicExtendedKey}},h.fromMasterSeed=function(e,t){var r=o.createHmac("sha512",f).update(e).digest(),n=r.slice(0,32),i=r.slice(32),s=new h(t);return s.chainCode=i,s.privateKey=n,s},h.fromExtendedKey=function(e,t){var r=new h(t=t||u),i=s.decode(e),o=i.readUInt32BE(0);n(o===t.private||o===t.public,"Version mismatch: does not match private or public"),r.depth=i.readUInt8(4),r.parentFingerprint=i.readUInt32BE(5),r.index=i.readUInt32BE(9),r.chainCode=i.slice(13,45);var a=i.slice(45);return 0===a.readUInt8(0)?(n(o===t.private,"Version mismatch: version does not match private"),r.privateKey=a.slice(1)):(n(o===t.public,"Version mismatch: version does not match public"),r.publicKey=a),r},h.fromJSON=function(e){return h.fromExtendedKey(e.xpriv)},h.HARDENED_OFFSET=2147483648,e.exports=h},function(e,t,r){e.exports=r(261)},function(e,t,r){var n;e.exports=(n=r(13),r(262),function(e){var t=n,r=t.lib,i=r.WordArray,o=r.Hasher,s=t.x64.Word,a=t.algo,f=[],c=[],u=[];!function(){for(var e=1,t=0,r=0;r<24;r++){f[e+5*t]=(r+1)*(r+2)/2%64;var n=(2*e+3*t)%5;e=t%5,t=n}for(e=0;e<5;e++)for(t=0;t<5;t++)c[e+5*t]=t+(2*e+3*t)%5*5;for(var i=1,o=0;o<24;o++){for(var a=0,h=0,d=0;d<7;d++){if(1&i){var l=(1<<d)-1;l<32?h^=1<<l:a^=1<<l-32}128&i?i=i<<1^113:i<<=1}u[o]=s.create(a,h)}}();var h=[];!function(){for(var e=0;e<25;e++)h[e]=s.create()}();var d=a.SHA3=o.extend({cfg:o.cfg.extend({outputLength:512}),_doReset:function(){for(var e=this._state=[],t=0;t<25;t++)e[t]=new s.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(e,t){for(var r=this._state,n=this.blockSize/2,i=0;i<n;i++){var o=e[t+2*i],s=e[t+2*i+1];o=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),s=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),(T=r[i]).high^=s,T.low^=o}for(var a=0;a<24;a++){for(var d=0;d<5;d++){for(var l=0,p=0,b=0;b<5;b++)l^=(T=r[d+5*b]).high,p^=T.low;var y=h[d];y.high=l,y.low=p}for(d=0;d<5;d++){var m=h[(d+4)%5],g=h[(d+1)%5],v=g.high,_=g.low;for(l=m.high^(v<<1|_>>>31),p=m.low^(_<<1|v>>>31),b=0;b<5;b++)(T=r[d+5*b]).high^=l,T.low^=p}for(var w=1;w<25;w++){var E=(T=r[w]).high,S=T.low,A=f[w];A<32?(l=E<<A|S>>>32-A,p=S<<A|E>>>32-A):(l=S<<A-32|E>>>64-A,p=E<<A-32|S>>>64-A);var k=h[c[w]];k.high=l,k.low=p}var x=h[0],I=r[0];for(x.high=I.high,x.low=I.low,d=0;d<5;d++)for(b=0;b<5;b++){var T=r[w=d+5*b],M=h[w],O=h[(d+1)%5+5*b],R=h[(d+2)%5+5*b];T.high=M.high^~O.high&R.high,T.low=M.low^~O.low&R.low}T=r[0];var B=u[a];T.high^=B.high,T.low^=B.low}},_doFinalize:function(){var t=this._data,r=t.words,n=(this._nDataBytes,8*t.sigBytes),o=32*this.blockSize;r[n>>>5]|=1<<24-n%32,r[(e.ceil((n+1)/o)*o>>>5)-1]|=128,t.sigBytes=4*r.length,this._process();for(var s=this._state,a=this.cfg.outputLength/8,f=a/8,c=[],u=0;u<f;u++){var h=s[u],d=h.high,l=h.low;d=16711935&(d<<8|d>>>24)|4278255360&(d<<24|d>>>8),l=16711935&(l<<8|l>>>24)|4278255360&(l<<24|l>>>8),c.push(l),c.push(d)}return new i.init(c,a)},clone:function(){for(var e=o.clone.call(this),t=e._state=this._state.slice(0),r=0;r<25;r++)t[r]=t[r].clone();return e}});t.SHA3=o._createHelper(d),t.HmacSHA3=o._createHmacHelper(d)}(Math),n.SHA3)},function(e,t,r){var n;e.exports=(n=r(13),n.enc.Hex)},function(e,t,r){"use strict";e.exports=h;var n,i=r(20),o=i.LongBits,s=i.base64,a=i.utf8;function f(e,t,r){this.fn=e,this.len=t,this.next=void 0,this.val=r}function c(){}function u(e){this.head=e.head,this.tail=e.tail,this.len=e.len,this.next=e.states}function h(){this.len=0,this.head=new f(c,0,0),this.tail=this.head,this.states=null}function d(e,t,r){t[r]=255&e}function l(e,t){this.len=e,this.next=void 0,this.val=t}function p(e,t,r){for(;e.hi;)t[r++]=127&e.lo|128,e.lo=(e.lo>>>7|e.hi<<25)>>>0,e.hi>>>=7;for(;e.lo>127;)t[r++]=127&e.lo|128,e.lo=e.lo>>>7;t[r++]=e.lo}function b(e,t,r){t[r]=255&e,t[r+1]=e>>>8&255,t[r+2]=e>>>16&255,t[r+3]=e>>>24}h.create=i.Buffer?function(){return(h.create=function(){return new n})()}:function(){return new h},h.alloc=function(e){return new i.Array(e)},i.Array!==Array&&(h.alloc=i.pool(h.alloc,i.Array.prototype.subarray)),h.prototype._push=function(e,t,r){return this.tail=this.tail.next=new f(e,t,r),this.len+=t,this},l.prototype=Object.create(f.prototype),l.prototype.fn=function(e,t,r){for(;e>127;)t[r++]=127&e|128,e>>>=7;t[r]=e},h.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new l((e>>>=0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this},h.prototype.int32=function(e){return e<0?this._push(p,10,o.fromNumber(e)):this.uint32(e)},h.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)},h.prototype.uint64=function(e){var t=o.from(e);return this._push(p,t.length(),t)},h.prototype.int64=h.prototype.uint64,h.prototype.sint64=function(e){var t=o.from(e).zzEncode();return this._push(p,t.length(),t)},h.prototype.bool=function(e){return this._push(d,1,e?1:0)},h.prototype.fixed32=function(e){return this._push(b,4,e>>>0)},h.prototype.sfixed32=h.prototype.fixed32,h.prototype.fixed64=function(e){var t=o.from(e);return this._push(b,4,t.lo)._push(b,4,t.hi)},h.prototype.sfixed64=h.prototype.fixed64,h.prototype.float=function(e){return this._push(i.float.writeFloatLE,4,e)},h.prototype.double=function(e){return this._push(i.float.writeDoubleLE,8,e)};var y=i.Array.prototype.set?function(e,t,r){t.set(e,r)}:function(e,t,r){for(var n=0;n<e.length;++n)t[r+n]=e[n]};h.prototype.bytes=function(e){var t=e.length>>>0;if(!t)return this._push(d,1,0);if(i.isString(e)){var r=h.alloc(t=s.length(e));s.decode(e,r,0),e=r}return this.uint32(t)._push(y,t,e)},h.prototype.string=function(e){var t=a.length(e);return t?this.uint32(t)._push(a.write,t,e):this._push(d,1,0)},h.prototype.fork=function(){return this.states=new u(this),this.head=this.tail=new f(c,0,0),this.len=0,this},h.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new f(c,0,0),this.len=0),this},h.prototype.ldelim=function(){var e=this.head,t=this.tail,r=this.len;return this.reset().uint32(r),r&&(this.tail.next=e.next,this.tail=t,this.len+=r),this},h.prototype.finish=function(){for(var e=this.head.next,t=this.constructor.alloc(this.len),r=0;e;)e.fn(e.val,t,r),r+=e.len,e=e.next;return t},h._configure=function(e){n=e}},function(e,t,r){"use strict";e.exports=f;var n,i=r(20),o=i.LongBits,s=i.utf8;function a(e,t){return RangeError("index out of range: "+e.pos+" + "+(t||1)+" > "+e.len)}function f(e){this.buf=e,this.pos=0,this.len=e.length}var c,u="undefined"!=typeof Uint8Array?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new f(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new f(e);throw Error("illegal buffer")};function h(){var e=new o(0,0),t=0;if(!(this.len-this.pos>4)){for(;t<3;++t){if(this.pos>=this.len)throw a(this);if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e}return e.lo=(e.lo|(127&this.buf[this.pos++])<<7*t)>>>0,e}for(;t<4;++t)if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e;if(e.lo=(e.lo|(127&this.buf[this.pos])<<28)>>>0,e.hi=(e.hi|(127&this.buf[this.pos])>>4)>>>0,this.buf[this.pos++]<128)return e;if(t=0,this.len-this.pos>4){for(;t<5;++t)if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}else for(;t<5;++t){if(this.pos>=this.len)throw a(this);if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}throw Error("invalid varint encoding")}function d(e,t){return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0}function l(){if(this.pos+8>this.len)throw a(this,8);return new o(d(this.buf,this.pos+=4),d(this.buf,this.pos+=4))}f.create=i.Buffer?function(e){return(f.create=function(e){return i.Buffer.isBuffer(e)?new n(e):u(e)})(e)}:u,f.prototype._slice=i.Array.prototype.subarray||i.Array.prototype.slice,f.prototype.uint32=(c=4294967295,function(){if(c=(127&this.buf[this.pos])>>>0,this.buf[this.pos++]<128)return c;if(c=(c|(127&this.buf[this.pos])<<7)>>>0,this.buf[this.pos++]<128)return c;if(c=(c|(127&this.buf[this.pos])<<14)>>>0,this.buf[this.pos++]<128)return c;if(c=(c|(127&this.buf[this.pos])<<21)>>>0,this.buf[this.pos++]<128)return c;if(c=(c|(15&this.buf[this.pos])<<28)>>>0,this.buf[this.pos++]<128)return c;if((this.pos+=5)>this.len)throw this.pos=this.len,a(this,10);return c}),f.prototype.int32=function(){return 0|this.uint32()},f.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(1&e)|0},f.prototype.bool=function(){return 0!==this.uint32()},f.prototype.fixed32=function(){if(this.pos+4>this.len)throw a(this,4);return d(this.buf,this.pos+=4)},f.prototype.sfixed32=function(){if(this.pos+4>this.len)throw a(this,4);return 0|d(this.buf,this.pos+=4)},f.prototype.float=function(){if(this.pos+4>this.len)throw a(this,4);var e=i.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e},f.prototype.double=function(){if(this.pos+8>this.len)throw a(this,4);var e=i.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e},f.prototype.bytes=function(){var e=this.uint32(),t=this.pos,r=this.pos+e;if(r>this.len)throw a(this,e);return this.pos+=e,Array.isArray(this.buf)?this.buf.slice(t,r):t===r?new this.buf.constructor(0):this._slice.call(this.buf,t,r)},f.prototype.string=function(){var e=this.bytes();return s.read(e,0,e.length)},f.prototype.skip=function(e){if("number"==typeof e){if(this.pos+e>this.len)throw a(this,e);this.pos+=e}else do{if(this.pos>=this.len)throw a(this)}while(128&this.buf[this.pos++]);return this},f.prototype.skipType=function(e){switch(e){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;4!=(e=7&this.uint32());)this.skipType(e);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+e+" at offset "+this.pos)}return this},f._configure=function(e){n=e;var t=i.Long?"toLong":"toNumber";i.merge(f.prototype,{int64:function(){return h.call(this)[t](!1)},uint64:function(){return h.call(this)[t](!0)},sint64:function(){return h.call(this).zzDecode()[t](!1)},fixed64:function(){return l.call(this)[t](!0)},sfixed64:function(){return l.call(this)[t](!1)}})}},function(e,t,r){"use strict";e.exports=g;var n=r(33);((g.prototype=Object.create(n.prototype)).constructor=g).className="Type";var i=r(18),o=r(41),s=r(25),a=r(57),f=r(58),c=r(60),u=r(55),h=r(54),d=r(6),l=r(85),p=r(86),b=r(87),y=r(88),m=r(89);function g(e,t){n.call(this,e,t),this.fields={},this.oneofs=void 0,this.extensions=void 0,this.reserved=void 0,this.group=void 0,this._fieldsById=null,this._fieldsArray=null,this._oneofsArray=null,this._ctor=null}function v(e){return e._fieldsById=e._fieldsArray=e._oneofsArray=null,delete e.encode,delete e.decode,delete e.verify,e}Object.defineProperties(g.prototype,{fieldsById:{get:function(){if(this._fieldsById)return this._fieldsById;this._fieldsById={};for(var e=Object.keys(this.fields),t=0;t<e.length;++t){var r=this.fields[e[t]],n=r.id;if(this._fieldsById[n])throw Error("duplicate id "+n+" in "+this);this._fieldsById[n]=r}return this._fieldsById}},fieldsArray:{get:function(){return this._fieldsArray||(this._fieldsArray=d.toArray(this.fields))}},oneofsArray:{get:function(){return this._oneofsArray||(this._oneofsArray=d.toArray(this.oneofs))}},ctor:{get:function(){return this._ctor||(this.ctor=g.generateConstructor(this)())},set:function(e){var t=e.prototype;t instanceof c||((e.prototype=new c).constructor=e,d.merge(e.prototype,t)),e.$type=e.prototype.$type=this,d.merge(e,c,!0),this._ctor=e;for(var r=0;r<this.fieldsArray.length;++r)this._fieldsArray[r].resolve();var n={};for(r=0;r<this.oneofsArray.length;++r)n[this._oneofsArray[r].resolve().name]={get:d.oneOfGetter(this._oneofsArray[r].oneof),set:d.oneOfSetter(this._oneofsArray[r].oneof)};r&&Object.defineProperties(e.prototype,n)}}}),g.generateConstructor=function(e){for(var t,r=d.codegen(["p"],e.name),n=0;n<e.fieldsArray.length;++n)(t=e._fieldsArray[n]).map?r("this%s={}",d.safeProp(t.name)):t.repeated&&r("this%s=[]",d.safeProp(t.name));return r("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]")},g.fromJSON=function(e,t){var r=new g(e,t.options);r.extensions=t.extensions,r.reserved=t.reserved;for(var c=Object.keys(t.fields),u=0;u<c.length;++u)r.add((void 0!==t.fields[c[u]].keyType?a.fromJSON:s.fromJSON)(c[u],t.fields[c[u]]));if(t.oneofs)for(c=Object.keys(t.oneofs),u=0;u<c.length;++u)r.add(o.fromJSON(c[u],t.oneofs[c[u]]));if(t.nested)for(c=Object.keys(t.nested),u=0;u<c.length;++u){var h=t.nested[c[u]];r.add((void 0!==h.id?s.fromJSON:void 0!==h.fields?g.fromJSON:void 0!==h.values?i.fromJSON:void 0!==h.methods?f.fromJSON:n.fromJSON)(c[u],h))}return t.extensions&&t.extensions.length&&(r.extensions=t.extensions),t.reserved&&t.reserved.length&&(r.reserved=t.reserved),t.group&&(r.group=!0),t.comment&&(r.comment=t.comment),r},g.prototype.toJSON=function(e){var t=n.prototype.toJSON.call(this,e),r=!!e&&Boolean(e.keepComments);return d.toObject(["options",t&&t.options||void 0,"oneofs",n.arrayToJSON(this.oneofsArray,e),"fields",n.arrayToJSON(this.fieldsArray.filter(function(e){return!e.declaringField}),e)||{},"extensions",this.extensions&&this.extensions.length?this.extensions:void 0,"reserved",this.reserved&&this.reserved.length?this.reserved:void 0,"group",this.group||void 0,"nested",t&&t.nested||void 0,"comment",r?this.comment:void 0])},g.prototype.resolveAll=function(){for(var e=this.fieldsArray,t=0;t<e.length;)e[t++].resolve();var r=this.oneofsArray;for(t=0;t<r.length;)r[t++].resolve();return n.prototype.resolveAll.call(this)},g.prototype.get=function(e){return this.fields[e]||this.oneofs&&this.oneofs[e]||this.nested&&this.nested[e]||null},g.prototype.add=function(e){if(this.get(e.name))throw Error("duplicate name '"+e.name+"' in "+this);if(e instanceof s&&void 0===e.extend){if(this._fieldsById?this._fieldsById[e.id]:this.fieldsById[e.id])throw Error("duplicate id "+e.id+" in "+this);if(this.isReservedId(e.id))throw Error("id "+e.id+" is reserved in "+this);if(this.isReservedName(e.name))throw Error("name '"+e.name+"' is reserved in "+this);return e.parent&&e.parent.remove(e),this.fields[e.name]=e,e.message=this,e.onAdd(this),v(this)}return e instanceof o?(this.oneofs||(this.oneofs={}),this.oneofs[e.name]=e,e.onAdd(this),v(this)):n.prototype.add.call(this,e)},g.prototype.remove=function(e){if(e instanceof s&&void 0===e.extend){if(!this.fields||this.fields[e.name]!==e)throw Error(e+" is not a member of "+this);return delete this.fields[e.name],e.parent=null,e.onRemove(this),v(this)}if(e instanceof o){if(!this.oneofs||this.oneofs[e.name]!==e)throw Error(e+" is not a member of "+this);return delete this.oneofs[e.name],e.parent=null,e.onRemove(this),v(this)}return n.prototype.remove.call(this,e)},g.prototype.isReservedId=function(e){return n.isReservedId(this.reserved,e)},g.prototype.isReservedName=function(e){return n.isReservedName(this.reserved,e)},g.prototype.create=function(e){return new this.ctor(e)},g.prototype.setup=function(){for(var e=this.fullName,t=[],r=0;r<this.fieldsArray.length;++r)t.push(this._fieldsArray[r].resolve().resolvedType);this.encode=l(this)({Writer:h,types:t,util:d}),this.decode=p(this)({Reader:u,types:t,util:d}),this.verify=b(this)({types:t,util:d}),this.fromObject=y.fromObject(this)({types:t,util:d}),this.toObject=y.toObject(this)({types:t,util:d});var n=m[e];if(n){var i=Object.create(this);i.fromObject=this.fromObject,this.fromObject=n.fromObject.bind(i),i.toObject=this.toObject,this.toObject=n.toObject.bind(i)}return this},g.prototype.encode=function(e,t){return this.setup().encode(e,t)},g.prototype.encodeDelimited=function(e,t){return this.encode(e,t&&t.len?t.fork():t).ldelim()},g.prototype.decode=function(e,t){return this.setup().decode(e,t)},g.prototype.decodeDelimited=function(e){return e instanceof u||(e=u.create(e)),this.decode(e,e.uint32())},g.prototype.verify=function(e){return this.setup().verify(e)},g.prototype.fromObject=function(e){return this.setup().fromObject(e)},g.prototype.toObject=function(e,t){return this.setup().toObject(e,t)},g.d=function(e){return function(t){d.decorateType(t,e)}}},function(e,t,r){"use strict";e.exports=s;var n=r(25);((s.prototype=Object.create(n.prototype)).constructor=s).className="MapField";var i=r(29),o=r(6);function s(e,t,r,i,s,a){if(n.call(this,e,t,i,void 0,void 0,s,a),!o.isString(r))throw TypeError("keyType must be a string");this.keyType=r,this.resolvedKeyType=null,this.map=!0}s.fromJSON=function(e,t){return new s(e,t.id,t.keyType,t.type,t.options,t.comment)},s.prototype.toJSON=function(e){var t=!!e&&Boolean(e.keepComments);return o.toObject(["keyType",this.keyType,"type",this.type,"id",this.id,"extend",this.extend,"options",this.options,"comment",t?this.comment:void 0])},s.prototype.resolve=function(){if(this.resolved)return this;if(void 0===i.mapKey[this.keyType])throw Error("invalid key type: "+this.keyType);return n.prototype.resolve.call(this)},s.d=function(e,t,r){return"function"==typeof r?r=o.decorateType(r).name:r&&"object"==typeof r&&(r=o.decorateEnum(r).name),function(n,i){o.decorateType(n.constructor).add(new s(i,e,t,r))}}},function(e,t,r){"use strict";e.exports=a;var n=r(33);((a.prototype=Object.create(n.prototype)).constructor=a).className="Service";var i=r(59),o=r(6),s=r(83);function a(e,t){n.call(this,e,t),this.methods={},this._methodsArray=null}function f(e){return e._methodsArray=null,e}a.fromJSON=function(e,t){var r=new a(e,t.options);if(t.methods)for(var n=Object.keys(t.methods),o=0;o<n.length;++o)r.add(i.fromJSON(n[o],t.methods[n[o]]));return t.nested&&r.addJSON(t.nested),r.comment=t.comment,r},a.prototype.toJSON=function(e){var t=n.prototype.toJSON.call(this,e),r=!!e&&Boolean(e.keepComments);return o.toObject(["options",t&&t.options||void 0,"methods",n.arrayToJSON(this.methodsArray,e)||{},"nested",t&&t.nested||void 0,"comment",r?this.comment:void 0])},Object.defineProperty(a.prototype,"methodsArray",{get:function(){return this._methodsArray||(this._methodsArray=o.toArray(this.methods))}}),a.prototype.get=function(e){return this.methods[e]||n.prototype.get.call(this,e)},a.prototype.resolveAll=function(){for(var e=this.methodsArray,t=0;t<e.length;++t)e[t].resolve();return n.prototype.resolve.call(this)},a.prototype.add=function(e){if(this.get(e.name))throw Error("duplicate name '"+e.name+"' in "+this);return e instanceof i?(this.methods[e.name]=e,e.parent=this,f(this)):n.prototype.add.call(this,e)},a.prototype.remove=function(e){if(e instanceof i){if(this.methods[e.name]!==e)throw Error(e+" is not a member of "+this);return delete this.methods[e.name],e.parent=null,f(this)}return n.prototype.remove.call(this,e)},a.prototype.create=function(e,t,r){for(var n,i=new s.Service(e,t,r),a=0;a<this.methodsArray.length;++a){var f=o.lcFirst((n=this._methodsArray[a]).resolve().name).replace(/[^$\w_]/g,"");i[f]=o.codegen(["r","c"],o.isReserved(f)?f+"_":f)("return this.rpcCall(m,q,s,r,c)")({m:n,q:n.resolvedRequestType.ctor,s:n.resolvedResponseType.ctor})}return i}},function(e,t,r){"use strict";e.exports=o;var n=r(28);((o.prototype=Object.create(n.prototype)).constructor=o).className="Method";var i=r(6);function o(e,t,r,o,s,a,f,c){if(i.isObject(s)?(f=s,s=a=void 0):i.isObject(a)&&(f=a,a=void 0),void 0!==t&&!i.isString(t))throw TypeError("type must be a string");if(!i.isString(r))throw TypeError("requestType must be a string");if(!i.isString(o))throw TypeError("responseType must be a string");n.call(this,e,f),this.type=t||"rpc",this.requestType=r,this.requestStream=!!s||void 0,this.responseType=o,this.responseStream=!!a||void 0,this.resolvedRequestType=null,this.resolvedResponseType=null,this.comment=c}o.fromJSON=function(e,t){return new o(e,t.type,t.requestType,t.responseType,t.requestStream,t.responseStream,t.options,t.comment)},o.prototype.toJSON=function(e){var t=!!e&&Boolean(e.keepComments);return i.toObject(["type","rpc"!==this.type&&this.type||void 0,"requestType",this.requestType,"requestStream",this.requestStream,"responseType",this.responseType,"responseStream",this.responseStream,"options",this.options,"comment",t?this.comment:void 0])},o.prototype.resolve=function(){return this.resolved?this:(this.resolvedRequestType=this.parent.lookupType(this.requestType),this.resolvedResponseType=this.parent.lookupType(this.responseType),n.prototype.resolve.call(this))}},function(e,t,r){"use strict";e.exports=i;var n=r(20);function i(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)this[t[r]]=e[t[r]]}i.create=function(e){return this.$type.create(e)},i.encode=function(e,t){return this.$type.encode(e,t)},i.encodeDelimited=function(e,t){return this.$type.encodeDelimited(e,t)},i.decode=function(e){return this.$type.decode(e)},i.decodeDelimited=function(e){return this.$type.decodeDelimited(e)},i.verify=function(e){return this.$type.verify(e)},i.fromObject=function(e){return this.$type.fromObject(e)},i.toObject=function(e,t){return this.$type.toObject(e,t)},i.prototype.toJSON=function(){return this.$type.toObject(this,n.toJSONOptions)}},function(e,t,r){"use strict";e.exports=h;var n=r(33);((h.prototype=Object.create(n.prototype)).constructor=h).className="Root";var i,o,s,a=r(25),f=r(18),c=r(41),u=r(6);function h(e){n.call(this,"",e),this.deferred=[],this.files=[]}function d(){}h.fromJSON=function(e,t){return t||(t=new h),e.options&&t.setOptions(e.options),t.addJSON(e.nested)},h.prototype.resolvePath=u.path.resolve,h.prototype.load=function e(t,r,n){"function"==typeof r&&(n=r,r=void 0);var i=this;if(!n)return u.asPromise(e,i,t,r);var a=n===d;function f(e,t){if(n){var r=n;if(n=null,a)throw e;r(e,t)}}function c(e,t){try{if(u.isString(t)&&"{"===t.charAt(0)&&(t=JSON.parse(t)),u.isString(t)){o.filename=e;var n,s=o(t,i,r),c=0;if(s.imports)for(;c<s.imports.length;++c)(n=i.resolvePath(e,s.imports[c]))&&h(n);if(s.weakImports)for(c=0;c<s.weakImports.length;++c)(n=i.resolvePath(e,s.weakImports[c]))&&h(n,!0)}else i.setOptions(t.options).addJSON(t.nested)}catch(e){f(e)}a||l||f(null,i)}function h(e,t){var r=e.lastIndexOf("google/protobuf/");if(r>-1){var o=e.substring(r);o in s&&(e=o)}if(!(i.files.indexOf(e)>-1))if(i.files.push(e),e in s)a?c(e,s[e]):(++l,setTimeout(function(){--l,c(e,s[e])}));else if(a){var h;try{h=u.fs.readFileSync(e).toString("utf8")}catch(e){return void(t||f(e))}c(e,h)}else++l,u.fetch(e,function(r,o){--l,n&&(r?t?l||f(null,i):f(r):c(e,o))})}var l=0;u.isString(t)&&(t=[t]);for(var p,b=0;b<t.length;++b)(p=i.resolvePath("",t[b]))&&h(p);if(a)return i;l||f(null,i)},h.prototype.loadSync=function(e,t){if(!u.isNode)throw Error("not supported");return this.load(e,t,d)},h.prototype.resolveAll=function(){if(this.deferred.length)throw Error("unresolvable extensions: "+this.deferred.map(function(e){return"'extend "+e.extend+"' in "+e.parent.fullName}).join(", "));return n.prototype.resolveAll.call(this)};var l=/^[A-Z]/;function p(e,t){var r=t.parent.lookup(t.extend);if(r){var n=new a(t.fullName,t.id,t.type,t.rule,void 0,t.options);return n.declaringField=t,t.extensionField=n,r.add(n),!0}return!1}h.prototype._handleAdd=function(e){if(e instanceof a)void 0===e.extend||e.extensionField||p(0,e)||this.deferred.push(e);else if(e instanceof f)l.test(e.name)&&(e.parent[e.name]=e.values);else if(!(e instanceof c)){if(e instanceof i)for(var t=0;t<this.deferred.length;)p(0,this.deferred[t])?this.deferred.splice(t,1):++t;for(var r=0;r<e.nestedArray.length;++r)this._handleAdd(e._nestedArray[r]);l.test(e.name)&&(e.parent[e.name]=e)}},h.prototype._handleRemove=function(e){if(e instanceof a){if(void 0!==e.extend)if(e.extensionField)e.extensionField.parent.remove(e.extensionField),e.extensionField=null;else{var t=this.deferred.indexOf(e);t>-1&&this.deferred.splice(t,1)}}else if(e instanceof f)l.test(e.name)&&delete e.parent[e.name];else if(e instanceof n){for(var r=0;r<e.nestedArray.length;++r)this._handleRemove(e._nestedArray[r]);l.test(e.name)&&delete e.parent[e.name]}},h._configure=function(e,t,r){i=e,o=t,s=r}},function(e,t,r){var n=t;n.utils=r(19),n.common=r(34),n.sha=r(171),n.ripemd=r(175),n.hmac=r(176),n.sha1=n.sha.sha1,n.sha256=n.sha.sha256,n.sha224=n.sha.sha224,n.sha384=n.sha.sha384,n.sha512=n.sha.sha512,n.ripemd160=n.ripemd.ripemd160},function(e,t,r){"use strict";var n=r(1),i=r(96),o=r(0).Buffer,s=new Array(16);function a(){i.call(this,64),this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878}function f(e,t){return e<<t|e>>>32-t}function c(e,t,r,n,i,o,s){return f(e+(t&r|~t&n)+i+o|0,s)+t|0}function u(e,t,r,n,i,o,s){return f(e+(t&n|r&~n)+i+o|0,s)+t|0}function h(e,t,r,n,i,o,s){return f(e+(t^r^n)+i+o|0,s)+t|0}function d(e,t,r,n,i,o,s){return f(e+(r^(t|~n))+i+o|0,s)+t|0}n(a,i),a.prototype._update=function(){for(var e=s,t=0;t<16;++t)e[t]=this._block.readInt32LE(4*t);var r=this._a,n=this._b,i=this._c,o=this._d;r=c(r,n,i,o,e[0],3614090360,7),o=c(o,r,n,i,e[1],3905402710,12),i=c(i,o,r,n,e[2],606105819,17),n=c(n,i,o,r,e[3],3250441966,22),r=c(r,n,i,o,e[4],4118548399,7),o=c(o,r,n,i,e[5],1200080426,12),i=c(i,o,r,n,e[6],2821735955,17),n=c(n,i,o,r,e[7],4249261313,22),r=c(r,n,i,o,e[8],1770035416,7),o=c(o,r,n,i,e[9],2336552879,12),i=c(i,o,r,n,e[10],4294925233,17),n=c(n,i,o,r,e[11],2304563134,22),r=c(r,n,i,o,e[12],1804603682,7),o=c(o,r,n,i,e[13],4254626195,12),i=c(i,o,r,n,e[14],2792965006,17),r=u(r,n=c(n,i,o,r,e[15],1236535329,22),i,o,e[1],4129170786,5),o=u(o,r,n,i,e[6],3225465664,9),i=u(i,o,r,n,e[11],643717713,14),n=u(n,i,o,r,e[0],3921069994,20),r=u(r,n,i,o,e[5],3593408605,5),o=u(o,r,n,i,e[10],38016083,9),i=u(i,o,r,n,e[15],3634488961,14),n=u(n,i,o,r,e[4],3889429448,20),r=u(r,n,i,o,e[9],568446438,5),o=u(o,r,n,i,e[14],3275163606,9),i=u(i,o,r,n,e[3],4107603335,14),n=u(n,i,o,r,e[8],1163531501,20),r=u(r,n,i,o,e[13],2850285829,5),o=u(o,r,n,i,e[2],4243563512,9),i=u(i,o,r,n,e[7],1735328473,14),r=h(r,n=u(n,i,o,r,e[12],2368359562,20),i,o,e[5],4294588738,4),o=h(o,r,n,i,e[8],2272392833,11),i=h(i,o,r,n,e[11],1839030562,16),n=h(n,i,o,r,e[14],4259657740,23),r=h(r,n,i,o,e[1],2763975236,4),o=h(o,r,n,i,e[4],1272893353,11),i=h(i,o,r,n,e[7],4139469664,16),n=h(n,i,o,r,e[10],3200236656,23),r=h(r,n,i,o,e[13],681279174,4),o=h(o,r,n,i,e[0],3936430074,11),i=h(i,o,r,n,e[3],3572445317,16),n=h(n,i,o,r,e[6],76029189,23),r=h(r,n,i,o,e[9],3654602809,4),o=h(o,r,n,i,e[12],3873151461,11),i=h(i,o,r,n,e[15],530742520,16),r=d(r,n=h(n,i,o,r,e[2],3299628645,23),i,o,e[0],4096336452,6),o=d(o,r,n,i,e[7],1126891415,10),i=d(i,o,r,n,e[14],2878612391,15),n=d(n,i,o,r,e[5],4237533241,21),r=d(r,n,i,o,e[12],1700485571,6),o=d(o,r,n,i,e[3],2399980690,10),i=d(i,o,r,n,e[10],4293915773,15),n=d(n,i,o,r,e[1],2240044497,21),r=d(r,n,i,o,e[8],1873313359,6),o=d(o,r,n,i,e[15],4264355552,10),i=d(i,o,r,n,e[6],2734768916,15),n=d(n,i,o,r,e[13],1309151649,21),r=d(r,n,i,o,e[4],4149444226,6),o=d(o,r,n,i,e[11],3174756917,10),i=d(i,o,r,n,e[2],718787259,15),n=d(n,i,o,r,e[9],3951481745,21),this._a=this._a+r|0,this._b=this._b+n|0,this._c=this._c+i|0,this._d=this._d+o|0},a.prototype._digest=function(){this._block[this._blockOffset++]=128,this._blockOffset>56&&(this._block.fill(0,this._blockOffset,64),this._update(),this._blockOffset=0),this._block.fill(0,this._blockOffset,56),this._block.writeUInt32LE(this._length[0],56),this._block.writeUInt32LE(this._length[1],60),this._update();var e=o.allocUnsafe(16);return e.writeInt32LE(this._a,0),e.writeInt32LE(this._b,4),e.writeInt32LE(this._c,8),e.writeInt32LE(this._d,12),e},e.exports=a},function(e,t,r){e.exports=i;var n=r(65).EventEmitter;function i(){n.call(this)}r(1)(i,n),i.Readable=r(66),i.Writable=r(192),i.Duplex=r(193),i.Transform=r(194),i.PassThrough=r(195),i.Stream=i,i.prototype.pipe=function(e,t){var r=this;function i(t){e.writable&&!1===e.write(t)&&r.pause&&r.pause()}function o(){r.readable&&r.resume&&r.resume()}r.on("data",i),e.on("drain",o),e._isStdio||t&&!1===t.end||(r.on("end",a),r.on("close",f));var s=!1;function a(){s||(s=!0,e.end())}function f(){s||(s=!0,"function"==typeof e.destroy&&e.destroy())}function c(e){if(u(),0===n.listenerCount(this,"error"))throw e}function u(){r.removeListener("data",i),e.removeListener("drain",o),r.removeListener("end",a),r.removeListener("close",f),r.removeListener("error",c),e.removeListener("error",c),r.removeListener("end",u),r.removeListener("close",u),e.removeListener("close",u)}return r.on("error",c),e.on("error",c),r.on("end",u),r.on("close",u),e.on("close",u),e.emit("pipe",r),e}},function(e,t,r){"use strict";var n,i="object"==typeof Reflect?Reflect:null,o=i&&"function"==typeof i.apply?i.apply:function(e,t,r){return Function.prototype.apply.call(e,t,r)};n=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var s=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var f=10;function c(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function u(e,t,r,n){var i,o,s,a;if("function"!=typeof r)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof r);if(void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,r.listener?r.listener:r),o=e._events),s=o[t]),void 0===s)s=o[t]=r,++e._eventsCount;else if("function"==typeof s?s=o[t]=n?[r,s]:[s,r]:n?s.unshift(r):s.push(r),(i=c(e))>0&&s.length>i&&!s.warned){s.warned=!0;var f=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");f.name="MaxListenersExceededWarning",f.emitter=e,f.type=t,f.count=s.length,a=f,console&&console.warn&&console.warn(a)}return e}function h(e,t,r){var n={fired:!1,wrapFn:void 0,target:e,type:t,listener:r},i=function(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);this.fired||(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,o(this.listener,this.target,e))}.bind(n);return i.listener=r,n.wrapFn=i,i}function d(e,t,r){var n=e._events;if(void 0===n)return[];var i=n[t];return void 0===i?[]:"function"==typeof i?r?[i.listener||i]:[i]:r?function(e){for(var t=new Array(e.length),r=0;r<t.length;++r)t[r]=e[r].listener||e[r];return t}(i):p(i,i.length)}function l(e){var t=this._events;if(void 0!==t){var r=t[e];if("function"==typeof r)return 1;if(void 0!==r)return r.length}return 0}function p(e,t){for(var r=new Array(t),n=0;n<t;++n)r[n]=e[n];return r}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return f},set:function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");f=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return c(this)},a.prototype.emit=function(e){for(var t=[],r=1;r<arguments.length;r++)t.push(arguments[r]);var n="error"===e,i=this._events;if(void 0!==i)n=n&&void 0===i.error;else if(!n)return!1;if(n){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var f=i[e];if(void 0===f)return!1;if("function"==typeof f)o(f,this,t);else{var c=f.length,u=p(f,c);for(r=0;r<c;++r)o(u[r],this,t)}return!0},a.prototype.addListener=function(e,t){return u(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return u(this,e,t,!0)},a.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.on(e,h(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.prependListener(e,h(this,e,t)),this},a.prototype.removeListener=function(e,t){var r,n,i,o,s;if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);if(void 0===(n=this._events))return this;if(void 0===(r=n[e]))return this;if(r===t||r.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete n[e],n.removeListener&&this.emit("removeListener",e,r.listener||t));else if("function"!=typeof r){for(i=-1,o=r.length-1;o>=0;o--)if(r[o]===t||r[o].listener===t){s=r[o].listener,i=o;break}if(i<0)return this;0===i?r.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(r,i),1===r.length&&(n[e]=r[0]),void 0!==n.removeListener&&this.emit("removeListener",e,s||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,r,n;if(void 0===(r=this._events))return this;if(void 0===r.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==r[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete r[e]),this;if(0===arguments.length){var i,o=Object.keys(r);for(n=0;n<o.length;++n)"removeListener"!==(i=o[n])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=r[e]))this.removeListener(e,t);else if(void 0!==t)for(n=t.length-1;n>=0;n--)this.removeListener(e,t[n]);return this},a.prototype.listeners=function(e){return d(this,e,!0)},a.prototype.rawListeners=function(e){return d(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):l.call(e,t)},a.prototype.listenerCount=l,a.prototype.eventNames=function(){return this._eventsCount>0?n(this._events):[]}},function(e,t,r){(t=e.exports=r(97)).Stream=t,t.Readable=t,t.Writable=r(67),t.Duplex=r(26),t.Transform=r(100),t.PassThrough=r(191)},function(e,t,r){"use strict";(function(t,n,i){var o=r(43);function s(e){var t=this;this.next=null,this.entry=null,this.finish=function(){!function(e,t,r){var n=e.entry;e.entry=null;for(;n;){var i=n.callback;t.pendingcb--,i(r),n=n.next}t.corkedRequestsFree?t.corkedRequestsFree.next=e:t.corkedRequestsFree=e}(t,e)}}e.exports=g;var a,f=!t.browser&&["v0.10","v0.9."].indexOf(t.version.slice(0,5))>-1?n:o.nextTick;g.WritableState=m;var c=r(35);c.inherits=r(1);var u={deprecate:r(190)},h=r(98),d=r(0).Buffer,l=i.Uint8Array||function(){};var p,b=r(99);function y(){}function m(e,t){a=a||r(26),e=e||{};var n=t instanceof a;this.objectMode=!!e.objectMode,n&&(this.objectMode=this.objectMode||!!e.writableObjectMode);var i=e.highWaterMark,c=e.writableHighWaterMark,u=this.objectMode?16:16384;this.highWaterMark=i||0===i?i:n&&(c||0===c)?c:u,this.highWaterMark=Math.floor(this.highWaterMark),this.finalCalled=!1,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1,this.destroyed=!1;var h=!1===e.decodeStrings;this.decodeStrings=!h,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){!function(e,t){var r=e._writableState,n=r.sync,i=r.writecb;if(function(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}(r),t)!function(e,t,r,n,i){--t.pendingcb,r?(o.nextTick(i,n),o.nextTick(A,e,t),e._writableState.errorEmitted=!0,e.emit("error",n)):(i(n),e._writableState.errorEmitted=!0,e.emit("error",n),A(e,t))}(e,r,n,t,i);else{var s=E(r);s||r.corked||r.bufferProcessing||!r.bufferedRequest||w(e,r),n?f(_,e,r,s,i):_(e,r,s,i)}}(t,e)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new s(this)}function g(e){if(a=a||r(26),!(p.call(g,this)||this instanceof a))return new g(e);this._writableState=new m(e,this),this.writable=!0,e&&("function"==typeof e.write&&(this._write=e.write),"function"==typeof e.writev&&(this._writev=e.writev),"function"==typeof e.destroy&&(this._destroy=e.destroy),"function"==typeof e.final&&(this._final=e.final)),h.call(this)}function v(e,t,r,n,i,o,s){t.writelen=n,t.writecb=s,t.writing=!0,t.sync=!0,r?e._writev(i,t.onwrite):e._write(i,o,t.onwrite),t.sync=!1}function _(e,t,r,n){r||function(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}(e,t),t.pendingcb--,n(),A(e,t)}function w(e,t){t.bufferProcessing=!0;var r=t.bufferedRequest;if(e._writev&&r&&r.next){var n=t.bufferedRequestCount,i=new Array(n),o=t.corkedRequestsFree;o.entry=r;for(var a=0,f=!0;r;)i[a]=r,r.isBuf||(f=!1),r=r.next,a+=1;i.allBuffers=f,v(e,t,!0,t.length,i,"",o.finish),t.pendingcb++,t.lastBufferedRequest=null,o.next?(t.corkedRequestsFree=o.next,o.next=null):t.corkedRequestsFree=new s(t),t.bufferedRequestCount=0}else{for(;r;){var c=r.chunk,u=r.encoding,h=r.callback;if(v(e,t,!1,t.objectMode?1:c.length,c,u,h),r=r.next,t.bufferedRequestCount--,t.writing)break}null===r&&(t.lastBufferedRequest=null)}t.bufferedRequest=r,t.bufferProcessing=!1}function E(e){return e.ending&&0===e.length&&null===e.bufferedRequest&&!e.finished&&!e.writing}function S(e,t){e._final(function(r){t.pendingcb--,r&&e.emit("error",r),t.prefinished=!0,e.emit("prefinish"),A(e,t)})}function A(e,t){var r=E(t);return r&&(!function(e,t){t.prefinished||t.finalCalled||("function"==typeof e._final?(t.pendingcb++,t.finalCalled=!0,o.nextTick(S,e,t)):(t.prefinished=!0,e.emit("prefinish")))}(e,t),0===t.pendingcb&&(t.finished=!0,e.emit("finish"))),r}c.inherits(g,h),m.prototype.getBuffer=function(){for(var e=this.bufferedRequest,t=[];e;)t.push(e),e=e.next;return t},function(){try{Object.defineProperty(m.prototype,"buffer",{get:u.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.","DEP0003")})}catch(e){}}(),"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(p=Function.prototype[Symbol.hasInstance],Object.defineProperty(g,Symbol.hasInstance,{value:function(e){return!!p.call(this,e)||this===g&&(e&&e._writableState instanceof m)}})):p=function(e){return e instanceof this},g.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))},g.prototype.write=function(e,t,r){var n,i=this._writableState,s=!1,a=!i.objectMode&&(n=e,d.isBuffer(n)||n instanceof l);return a&&!d.isBuffer(e)&&(e=function(e){return d.from(e)}(e)),"function"==typeof t&&(r=t,t=null),a?t="buffer":t||(t=i.defaultEncoding),"function"!=typeof r&&(r=y),i.ended?function(e,t){var r=new Error("write after end");e.emit("error",r),o.nextTick(t,r)}(this,r):(a||function(e,t,r,n){var i=!0,s=!1;return null===r?s=new TypeError("May not write null values to stream"):"string"==typeof r||void 0===r||t.objectMode||(s=new TypeError("Invalid non-string/buffer chunk")),s&&(e.emit("error",s),o.nextTick(n,s),i=!1),i}(this,i,e,r))&&(i.pendingcb++,s=function(e,t,r,n,i,o){if(!r){var s=function(e,t,r){e.objectMode||!1===e.decodeStrings||"string"!=typeof t||(t=d.from(t,r));return t}(t,n,i);n!==s&&(r=!0,i="buffer",n=s)}var a=t.objectMode?1:n.length;t.length+=a;var f=t.length<t.highWaterMark;f||(t.needDrain=!0);if(t.writing||t.corked){var c=t.lastBufferedRequest;t.lastBufferedRequest={chunk:n,encoding:i,isBuf:r,callback:o,next:null},c?c.next=t.lastBufferedRequest:t.bufferedRequest=t.lastBufferedRequest,t.bufferedRequestCount+=1}else v(e,t,!1,a,n,i,o);return f}(this,i,a,e,t,r)),s},g.prototype.cork=function(){this._writableState.corked++},g.prototype.uncork=function(){var e=this._writableState;e.corked&&(e.corked--,e.writing||e.corked||e.finished||e.bufferProcessing||!e.bufferedRequest||w(this,e))},g.prototype.setDefaultEncoding=function(e){if("string"==typeof e&&(e=e.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+e);return this._writableState.defaultEncoding=e,this},Object.defineProperty(g.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),g.prototype._write=function(e,t,r){r(new Error("_write() is not implemented"))},g.prototype._writev=null,g.prototype.end=function(e,t,r){var n=this._writableState;"function"==typeof e?(r=e,e=null,t=null):"function"==typeof t&&(r=t,t=null),null!=e&&this.write(e,t),n.corked&&(n.corked=1,this.uncork()),n.ending||n.finished||function(e,t,r){t.ending=!0,A(e,t),r&&(t.finished?o.nextTick(r):e.once("finish",r));t.ended=!0,e.writable=!1}(this,n,r)},Object.defineProperty(g.prototype,"destroyed",{get:function(){return void 0!==this._writableState&&this._writableState.destroyed},set:function(e){this._writableState&&(this._writableState.destroyed=e)}}),g.prototype.destroy=b.destroy,g.prototype._undestroy=b.undestroy,g.prototype._destroy=function(e,t){this.end(),t(e)}}).call(this,r(15),r(188).setImmediate,r(11))},function(e,t,r){"use strict";var n=r(0).Buffer,i=n.isEncoding||function(e){switch((e=""+e)&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}};function o(e){var t;switch(this.encoding=function(e){var t=function(e){if(!e)return"utf8";for(var t;;)switch(e){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return e;default:if(t)return;e=(""+e).toLowerCase(),t=!0}}(e);if("string"!=typeof t&&(n.isEncoding===i||!i(e)))throw new Error("Unknown encoding: "+e);return t||e}(e),this.encoding){case"utf16le":this.text=f,this.end=c,t=4;break;case"utf8":this.fillLast=a,t=4;break;case"base64":this.text=u,this.end=h,t=3;break;default:return this.write=d,void(this.end=l)}this.lastNeed=0,this.lastTotal=0,this.lastChar=n.allocUnsafe(t)}function s(e){return e<=127?0:e>>5==6?2:e>>4==14?3:e>>3==30?4:e>>6==2?-1:-2}function a(e){var t=this.lastTotal-this.lastNeed,r=function(e,t,r){if(128!=(192&t[0]))return e.lastNeed=0,"�";if(e.lastNeed>1&&t.length>1){if(128!=(192&t[1]))return e.lastNeed=1,"�";if(e.lastNeed>2&&t.length>2&&128!=(192&t[2]))return e.lastNeed=2,"�"}}(this,e);return void 0!==r?r:this.lastNeed<=e.length?(e.copy(this.lastChar,t,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(e.copy(this.lastChar,t,0,e.length),void(this.lastNeed-=e.length))}function f(e,t){if((e.length-t)%2==0){var r=e.toString("utf16le",t);if(r){var n=r.charCodeAt(r.length-1);if(n>=55296&&n<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=e[e.length-2],this.lastChar[1]=e[e.length-1],r.slice(0,-1)}return r}return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=e[e.length-1],e.toString("utf16le",t,e.length-1)}function c(e){var t=e&&e.length?this.write(e):"";if(this.lastNeed){var r=this.lastTotal-this.lastNeed;return t+this.lastChar.toString("utf16le",0,r)}return t}function u(e,t){var r=(e.length-t)%3;return 0===r?e.toString("base64",t):(this.lastNeed=3-r,this.lastTotal=3,1===r?this.lastChar[0]=e[e.length-1]:(this.lastChar[0]=e[e.length-2],this.lastChar[1]=e[e.length-1]),e.toString("base64",t,e.length-r))}function h(e){var t=e&&e.length?this.write(e):"";return this.lastNeed?t+this.lastChar.toString("base64",0,3-this.lastNeed):t}function d(e){return e.toString(this.encoding)}function l(e){return e&&e.length?this.write(e):""}t.StringDecoder=o,o.prototype.write=function(e){if(0===e.length)return"";var t,r;if(this.lastNeed){if(void 0===(t=this.fillLast(e)))return"";r=this.lastNeed,this.lastNeed=0}else r=0;return r<e.length?t?t+this.text(e,r):this.text(e,r):t||""},o.prototype.end=function(e){var t=e&&e.length?this.write(e):"";return this.lastNeed?t+"�":t},o.prototype.text=function(e,t){var r=function(e,t,r){var n=t.length-1;if(n<r)return 0;var i=s(t[n]);if(i>=0)return i>0&&(e.lastNeed=i-1),i;if(--n<r||-2===i)return 0;if((i=s(t[n]))>=0)return i>0&&(e.lastNeed=i-2),i;if(--n<r||-2===i)return 0;if((i=s(t[n]))>=0)return i>0&&(2===i?i=0:e.lastNeed=i-3),i;return 0}(this,e,t);if(!this.lastNeed)return e.toString("utf8",t);this.lastTotal=r;var n=e.length-(r-this.lastNeed);return e.copy(this.lastChar,0,n),e.toString("utf8",t,n)},o.prototype.fillLast=function(e){if(this.lastNeed<=e.length)return e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal);e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,e.length),this.lastNeed-=e.length}},function(e,t,r){"use strict";var n=r(2).Buffer,i=r(1),o=r(96),s=new Array(16),a=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],f=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],c=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],u=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11],h=[0,1518500249,1859775393,2400959708,2840853838],d=[1352829926,1548603684,1836072691,2053994217,0];function l(){o.call(this,64),this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520}function p(e,t){return e<<t|e>>>32-t}function b(e,t,r,n,i,o,s,a){return p(e+(t^r^n)+o+s|0,a)+i|0}function y(e,t,r,n,i,o,s,a){return p(e+(t&r|~t&n)+o+s|0,a)+i|0}function m(e,t,r,n,i,o,s,a){return p(e+((t|~r)^n)+o+s|0,a)+i|0}function g(e,t,r,n,i,o,s,a){return p(e+(t&n|r&~n)+o+s|0,a)+i|0}function v(e,t,r,n,i,o,s,a){return p(e+(t^(r|~n))+o+s|0,a)+i|0}i(l,o),l.prototype._update=function(){for(var e=s,t=0;t<16;++t)e[t]=this._block.readInt32LE(4*t);for(var r=0|this._a,n=0|this._b,i=0|this._c,o=0|this._d,l=0|this._e,_=0|this._a,w=0|this._b,E=0|this._c,S=0|this._d,A=0|this._e,k=0;k<80;k+=1){var x,I;k<16?(x=b(r,n,i,o,l,e[a[k]],h[0],c[k]),I=v(_,w,E,S,A,e[f[k]],d[0],u[k])):k<32?(x=y(r,n,i,o,l,e[a[k]],h[1],c[k]),I=g(_,w,E,S,A,e[f[k]],d[1],u[k])):k<48?(x=m(r,n,i,o,l,e[a[k]],h[2],c[k]),I=m(_,w,E,S,A,e[f[k]],d[2],u[k])):k<64?(x=g(r,n,i,o,l,e[a[k]],h[3],c[k]),I=y(_,w,E,S,A,e[f[k]],d[3],u[k])):(x=v(r,n,i,o,l,e[a[k]],h[4],c[k]),I=b(_,w,E,S,A,e[f[k]],d[4],u[k])),r=l,l=o,o=p(i,10),i=n,n=x,_=A,A=S,S=p(E,10),E=w,w=I}var T=this._b+i+S|0;this._b=this._c+o+A|0,this._c=this._d+l+_|0,this._d=this._e+r+w|0,this._e=this._a+n+E|0,this._a=T},l.prototype._digest=function(){this._block[this._blockOffset++]=128,this._blockOffset>56&&(this._block.fill(0,this._blockOffset,64),this._update(),this._blockOffset=0),this._block.fill(0,this._blockOffset,56),this._block.writeUInt32LE(this._length[0],56),this._block.writeUInt32LE(this._length[1],60),this._update();var e=n.alloc?n.alloc(20):new n(20);return e.writeInt32LE(this._a,0),e.writeInt32LE(this._b,4),e.writeInt32LE(this._c,8),e.writeInt32LE(this._d,12),e.writeInt32LE(this._e,16),e},e.exports=l},function(e,t,r){(t=e.exports=function(e){e=e.toLowerCase();var r=t[e];if(!r)throw new Error(e+" is not supported (we accept pull requests)");return new r}).sha=r(196),t.sha1=r(197),t.sha224=r(198),t.sha256=r(101),t.sha384=r(199),t.sha512=r(102)},function(e,t,r){"use strict";t.utils=r(210),t.Cipher=r(211),t.DES=r(212),t.CBC=r(213),t.EDE=r(214)},function(e,t,r){var n=r(215),i=r(223),o=r(113);t.createCipher=t.Cipher=n.createCipher,t.createCipheriv=t.Cipheriv=n.createCipheriv,t.createDecipher=t.Decipher=i.createDecipher,t.createDecipheriv=t.Decipheriv=i.createDecipheriv,t.listCiphers=t.getCiphers=function(){return Object.keys(o)}},function(e,t,r){var n={ECB:r(216),CBC:r(217),CFB:r(218),CFB8:r(219),CFB1:r(220),OFB:r(221),CTR:r(111),GCM:r(111)},i=r(113);for(var o in i)i[o].module=n[i[o].mode];e.exports=i},function(e,t,r){(function(t){var n=r(4),i=r(27);function o(e,r){var i=function(e){var t=s(e);return{blinder:t.toRed(n.mont(e.modulus)).redPow(new n(e.publicExponent)).fromRed(),unblinder:t.invm(e.modulus)}}(r),o=r.modulus.byteLength(),a=(n.mont(r.modulus),new n(e).mul(i.blinder).umod(r.modulus)),f=a.toRed(n.mont(r.prime1)),c=a.toRed(n.mont(r.prime2)),u=r.coefficient,h=r.prime1,d=r.prime2,l=f.redPow(r.exponent1),p=c.redPow(r.exponent2);l=l.fromRed(),p=p.fromRed();var b=l.isub(p).imul(u).umod(h);return b.imul(d),p.iadd(b),new t(p.imul(i.unblinder).umod(r.modulus).toArray(!1,o))}function s(e){for(var t=e.modulus.byteLength(),r=new n(i(t));r.cmp(e.modulus)>=0||!r.umod(e.prime1)||!r.umod(e.prime2);)r=new n(i(t));return r}e.exports=o,o.getr=s}).call(this,r(2).Buffer)},function(e,t,r){"use strict";(function(e){r.d(t,"a",function(){return o}),r.d(t,"b",function(){return s});var n=r(130),i=r.n(n),o=function(e){return e},s=function(t){var r=e.from(t,"base64");return i.a.FileDescriptorSet.decode(r)}}).call(this,r(2).Buffer)},function(e,t,r){"use strict";r.d(t,"a",function(){return d});var n=r(10),i=r.n(n),o=r(8),s=r.n(o),a=r(16),f=r(132),c=r(3),u=function(e){var t=a.Root.fromDescriptor(e);return e.file.filter(function(e){return e.service.length>0}).map(function(e){var r=e.service[0].name,n=e.package?"".concat(e.package,".").concat(r):r;return t.lookupService(n)})},h=function e(t,r,n){s()(this,e),this._chain=t,this.transactionHash=null,this.address=n,this.services=r},d=function(){function e(t,r,n){s()(this,e),this.chain=t,this.services=u(r),this.wallet=n}return i()(e,[{key:"at",value:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c.noop,n=new h(this.chain,this.services,t);return e.bindMethodsToContract(n,this.wallet),r(null,n),n}}],[{key:"bindMethodsToContract",value:function(e,t){e.services.forEach(function(r){Object.keys(r.methods).forEach(function(n){var i=r.methods[n].resolve();new f.a(e._chain,i,e.address,t).bindMethodToContract(e)})})}}]),e}()},function(e,t,r){var n;e.exports=(n=r(13),function(){if("function"==typeof ArrayBuffer){var e=n.lib.WordArray,t=e.init;(e.init=function(e){if(e instanceof ArrayBuffer&&(e=new Uint8Array(e)),(e instanceof Int8Array||"undefined"!=typeof Uint8ClampedArray&&e instanceof Uint8ClampedArray||e instanceof Int16Array||e instanceof Uint16Array||e instanceof Int32Array||e instanceof Uint32Array||e instanceof Float32Array||e instanceof Float64Array)&&(e=new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),e instanceof Uint8Array){for(var r=e.byteLength,n=[],i=0;i<r;i++)n[i>>>2]|=e[i]<<24-i%4*8;t.call(this,n,r)}else t.apply(this,arguments)}).prototype=e}}(),n.lib.WordArray)},function(e,t,r){"use strict";(function(e){r.d(t,"a",function(){return l});var n=r(9),i=r.n(n),o=r(8),s=r.n(o),a=r(10),f=r.n(a),c=r(137),u=r(138),h={Accept:"text/plain;v=1.0","Content-Type":"application/json"},d={};"undefined"!=typeof window&&void 0!==window.XMLHttpRequest?d=window.XMLHttpRequest:void 0!==e&&"[object process]"===Object.prototype.toString.call(e)&&(d=c.XMLHttpRequest);var l=function(){function e(){var t=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"http://localhost:8545",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2?arguments[2]:void 0,a=arguments.length>3?arguments[3]:void 0,f=arguments.length>4&&void 0!==arguments[4]?arguments[4]:h;s()(this,e),this.host=r,this.timeout=n,this.user=o,this.password=a,this.headers={},Array.isArray(f)?(f.forEach(function(e){var r=e.name,n=e.value;t.headers[r]=n}),this.headers=i()({},h,this.headers)):this.headers=i()({},h,f)}return f()(e,[{key:"requestSend",value:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.request=new d,this.request.withCredentials=!1,this.request.timeout=this.timeout;var n=e.url,i=e.method,o=void 0===i?"POST":i,s=e.params,a=void 0===s?{}:s,f="/api/".concat(n).replace(/\/\//g,"/"),c="".concat(this.host).concat(f).replace();"GET"===o.toUpperCase()&&(c=Object.keys(a).length>0?"".concat(c,"?").concat(Object(u.stringify)(a)):c),this.request.open(o.toUpperCase(),c,r),Object.keys(this.headers).forEach(function(e){t.request.setRequestHeader(e,t.headers[e])});try{"GET"===o.toUpperCase()?this.request.send():this.request.send(JSON.stringify(a))}catch(e){throw e}}},{key:"send",value:function(t){this.requestSend(t);var r=this.request.responseText;if((r=e.formatResponse(r)).Error)throw r;return r}},{key:"sendAsync",value:function(t){var r=this;return this.requestSend(t,!0),new Promise(function(t,n){r.request.onreadystatechange=function(){if(4===r.request.readyState&&1!==r.request.timeout){var i=r.request.responseText;try{(i=e.formatResponse(i)).Error?n(i):t(i)}catch(e){n(e)}}},r.request.onerror=function(e){n(e)},r.request.ontimeout=function(e){n(e)}})}},{key:"isConnected",value:function(){try{return this.send({method:"GET",url:"blockChain/chainStatus"}),!0}catch(e){return!1}}}],[{key:"formatResponse",value:function(e){var t;try{t=JSON.parse(e)}catch(r){t=e}return t}}]),e}()}).call(this,r(15))},function(e,t,r){"use strict";var n=e.exports=r(139);n.build="light",n.load=function(e,t,r){return"function"==typeof t?(r=t,t=new n.Root):t||(t=new n.Root),t.load(e,r)},n.loadSync=function(e,t){return t||(t=new n.Root),t.loadSync(e)},n.encoder=r(85),n.decoder=r(86),n.verifier=r(87),n.converter=r(88),n.ReflectionObject=r(28),n.Namespace=r(33),n.Root=r(61),n.Enum=r(18),n.Type=r(56),n.Field=r(25),n.OneOf=r(41),n.MapField=r(57),n.Service=r(58),n.Method=r(59),n.Message=r(60),n.wrappers=r(89),n.types=r(29),n.util=r(6),n.ReflectionObject._configure(n.Root),n.Namespace._configure(n.Type,n.Service,n.Enum),n.Root._configure(n.Type),n.Field._configure(n.Type)},function(e,t,r){"use strict";e.exports=function(e,t){var r=new Array(arguments.length-1),n=0,i=2,o=!0;for(;i<arguments.length;)r[n++]=arguments[i++];return new Promise(function(i,s){r[n]=function(e){if(o)if(o=!1,e)s(e);else{for(var t=new Array(arguments.length-1),r=0;r<t.length;)t[r++]=arguments[r];i.apply(null,t)}};try{e.apply(t||null,r)}catch(e){o&&(o=!1,s(e))}})}},function(module,exports,__webpack_require__){"use strict";function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(e){}return null}module.exports=inquire},function(e,t){var r={}.toString;e.exports=Array.isArray||function(e){return"[object Array]"==r.call(e)}},function(e,t,r){"use strict";t.Service=r(150)},function(e,t,r){"use strict";e.exports={}},function(e,t,r){"use strict";e.exports=function(e){for(var t,r=o.codegen(["m","w"],e.name+"$encode")("if(!w)")("w=Writer.create()"),a=e.fieldsArray.slice().sort(o.compareFieldsById),f=0;f<a.length;++f){var c=a[f].resolve(),u=e._fieldsArray.indexOf(c),h=c.resolvedType instanceof n?"int32":c.type,d=i.basic[h];t="m"+o.safeProp(c.name),c.map?(r("if(%s!=null&&m.hasOwnProperty(%j)){",t,c.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){",t)("w.uint32(%i).fork().uint32(%i).%s(ks[i])",(c.id<<3|2)>>>0,8|i.mapKey[c.keyType],c.keyType),void 0===d?r("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()",u,t):r(".uint32(%i).%s(%s[ks[i]]).ldelim()",16|d,h,t),r("}")("}")):c.repeated?(r("if(%s!=null&&%s.length){",t,t),c.packed&&void 0!==i.packed[h]?r("w.uint32(%i).fork()",(c.id<<3|2)>>>0)("for(var i=0;i<%s.length;++i)",t)("w.%s(%s[i])",h,t)("w.ldelim()"):(r("for(var i=0;i<%s.length;++i)",t),void 0===d?s(r,c,u,t+"[i]"):r("w.uint32(%i).%s(%s[i])",(c.id<<3|d)>>>0,h,t)),r("}")):(c.optional&&r("if(%s!=null&&m.hasOwnProperty(%j))",t,c.name),void 0===d?s(r,c,u,t):r("w.uint32(%i).%s(%s)",(c.id<<3|d)>>>0,h,t))}return r("return w")};var n=r(18),i=r(29),o=r(6);function s(e,t,r,n){return t.resolvedType.group?e("types[%i].encode(%s,w.uint32(%i)).uint32(%i)",r,n,(t.id<<3|3)>>>0,(t.id<<3|4)>>>0):e("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()",r,n,(t.id<<3|2)>>>0)}},function(e,t,r){"use strict";e.exports=function(e){var t=o.codegen(["r","l"],e.name+"$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor"+(e.fieldsArray.filter(function(e){return e.map}).length?",k":""))("while(r.pos<c){")("var t=r.uint32()");e.group&&t("if((t&7)===4)")("break");t("switch(t>>>3){");for(var r=0;r<e.fieldsArray.length;++r){var a=e._fieldsArray[r].resolve(),f=a.resolvedType instanceof n?"int32":a.type,c="m"+o.safeProp(a.name);t("case %i:",a.id),a.map?(t("r.skip().pos++")("if(%s===util.emptyObject)",c)("%s={}",c)("k=r.%s()",a.keyType)("r.pos++"),void 0!==i.long[a.keyType]?void 0===i.basic[f]?t('%s[typeof k==="object"?util.longToHash(k):k]=types[%i].decode(r,r.uint32())',c,r):t('%s[typeof k==="object"?util.longToHash(k):k]=r.%s()',c,f):void 0===i.basic[f]?t("%s[k]=types[%i].decode(r,r.uint32())",c,r):t("%s[k]=r.%s()",c,f)):a.repeated?(t("if(!(%s&&%s.length))",c,c)("%s=[]",c),void 0!==i.packed[f]&&t("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())",c,f)("}else"),void 0===i.basic[f]?t(a.resolvedType.group?"%s.push(types[%i].decode(r))":"%s.push(types[%i].decode(r,r.uint32()))",c,r):t("%s.push(r.%s())",c,f)):void 0===i.basic[f]?t(a.resolvedType.group?"%s=types[%i].decode(r)":"%s=types[%i].decode(r,r.uint32())",c,r):t("%s=r.%s()",c,f),t("break")}for(t("default:")("r.skipType(t&7)")("break")("}")("}"),r=0;r<e._fieldsArray.length;++r){var u=e._fieldsArray[r];u.required&&t("if(!m.hasOwnProperty(%j))",u.name)("throw util.ProtocolError(%j,{instance:m})",s(u))}return t("return m")};var n=r(18),i=r(29),o=r(6);function s(e){return"missing required '"+e.name+"'"}},function(e,t,r){"use strict";e.exports=function(e){var t=i.codegen(["m"],e.name+"$verify")('if(typeof m!=="object"||m===null)')("return%j","object expected"),r=e.oneofsArray,n={};r.length&&t("var p={}");for(var f=0;f<e.fieldsArray.length;++f){var c=e._fieldsArray[f].resolve(),u="m"+i.safeProp(c.name);if(c.optional&&t("if(%s!=null&&m.hasOwnProperty(%j)){",u,c.name),c.map)t("if(!util.isObject(%s))",u)("return%j",o(c,"object"))("var k=Object.keys(%s)",u)("for(var i=0;i<k.length;++i){"),a(t,c,"k[i]"),s(t,c,f,u+"[k[i]]")("}");else if(c.repeated)t("if(!Array.isArray(%s))",u)("return%j",o(c,"array"))("for(var i=0;i<%s.length;++i){",u),s(t,c,f,u+"[i]")("}");else{if(c.partOf){var h=i.safeProp(c.partOf.name);1===n[c.partOf.name]&&t("if(p%s===1)",h)("return%j",c.partOf.name+": multiple values"),n[c.partOf.name]=1,t("p%s=1",h)}s(t,c,f,u)}c.optional&&t("}")}return t("return null")};var n=r(18),i=r(6);function o(e,t){return e.name+": "+t+(e.repeated&&"array"!==t?"[]":e.map&&"object"!==t?"{k:"+e.keyType+"}":"")+" expected"}function s(e,t,r,i){if(t.resolvedType)if(t.resolvedType instanceof n){e("switch(%s){",i)("default:")("return%j",o(t,"enum value"));for(var s=Object.keys(t.resolvedType.values),a=0;a<s.length;++a)e("case %i:",t.resolvedType.values[s[a]]);e("break")("}")}else e("{")("var e=types[%i].verify(%s);",r,i)("if(e)")("return%j+e",t.name+".")("}");else switch(t.type){case"int32":case"uint32":case"sint32":case"fixed32":case"sfixed32":e("if(!util.isInteger(%s))",i)("return%j",o(t,"integer"));break;case"int64":case"uint64":case"sint64":case"fixed64":case"sfixed64":e("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))",i,i,i,i)("return%j",o(t,"integer|Long"));break;case"float":case"double":e('if(typeof %s!=="number")',i)("return%j",o(t,"number"));break;case"bool":e('if(typeof %s!=="boolean")',i)("return%j",o(t,"boolean"));break;case"string":e("if(!util.isString(%s))",i)("return%j",o(t,"string"));break;case"bytes":e('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))',i,i,i)("return%j",o(t,"buffer"))}return e}function a(e,t,r){switch(t.keyType){case"int32":case"uint32":case"sint32":case"fixed32":case"sfixed32":e("if(!util.key32Re.test(%s))",r)("return%j",o(t,"integer key"));break;case"int64":case"uint64":case"sint64":case"fixed64":case"sfixed64":e("if(!util.key64Re.test(%s))",r)("return%j",o(t,"integer|Long key"));break;case"bool":e("if(!util.key2Re.test(%s))",r)("return%j",o(t,"boolean key"))}return e}},function(e,t,r){"use strict";var n=t,i=r(18),o=r(6);function s(e,t,r,n){if(t.resolvedType)if(t.resolvedType instanceof i){e("switch(d%s){",n);for(var o=t.resolvedType.values,s=Object.keys(o),a=0;a<s.length;++a)t.repeated&&o[s[a]]===t.typeDefault&&e("default:"),e("case%j:",s[a])("case %i:",o[s[a]])("m%s=%j",n,o[s[a]])("break");e("}")}else e('if(typeof d%s!=="object")',n)("throw TypeError(%j)",t.fullName+": object expected")("m%s=types[%i].fromObject(d%s)",n,r,n);else{var f=!1;switch(t.type){case"double":case"float":e("m%s=Number(d%s)",n,n);break;case"uint32":case"fixed32":e("m%s=d%s>>>0",n,n);break;case"int32":case"sint32":case"sfixed32":e("m%s=d%s|0",n,n);break;case"uint64":f=!0;case"int64":case"sint64":case"fixed64":case"sfixed64":e("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j",n,n,f)('else if(typeof d%s==="string")',n)("m%s=parseInt(d%s,10)",n,n)('else if(typeof d%s==="number")',n)("m%s=d%s",n,n)('else if(typeof d%s==="object")',n)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)",n,n,n,f?"true":"");break;case"bytes":e('if(typeof d%s==="string")',n)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)",n,n,n)("else if(d%s.length)",n)("m%s=d%s",n,n);break;case"string":e("m%s=String(d%s)",n,n);break;case"bool":e("m%s=Boolean(d%s)",n,n)}}return e}function a(e,t,r,n){if(t.resolvedType)t.resolvedType instanceof i?e("d%s=o.enums===String?types[%i].values[m%s]:m%s",n,r,n,n):e("d%s=types[%i].toObject(m%s,o)",n,r,n);else{var o=!1;switch(t.type){case"double":case"float":e("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s",n,n,n,n);break;case"uint64":o=!0;case"int64":case"sint64":case"fixed64":case"sfixed64":e('if(typeof m%s==="number")',n)("d%s=o.longs===String?String(m%s):m%s",n,n,n)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s",n,n,n,n,o?"true":"",n);break;case"bytes":e("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s",n,n,n,n,n);break;default:e("d%s=m%s",n,n)}}return e}n.fromObject=function(e){var t=e.fieldsArray,r=o.codegen(["d"],e.name+"$fromObject")("if(d instanceof this.ctor)")("return d");if(!t.length)return r("return new this.ctor");r("var m=new this.ctor");for(var n=0;n<t.length;++n){var a=t[n].resolve(),f=o.safeProp(a.name);a.map?(r("if(d%s){",f)('if(typeof d%s!=="object")',f)("throw TypeError(%j)",a.fullName+": object expected")("m%s={}",f)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){",f),s(r,a,n,f+"[ks[i]]")("}")("}")):a.repeated?(r("if(d%s){",f)("if(!Array.isArray(d%s))",f)("throw TypeError(%j)",a.fullName+": array expected")("m%s=[]",f)("for(var i=0;i<d%s.length;++i){",f),s(r,a,n,f+"[i]")("}")("}")):(a.resolvedType instanceof i||r("if(d%s!=null){",f),s(r,a,n,f),a.resolvedType instanceof i||r("}"))}return r("return m")},n.toObject=function(e){var t=e.fieldsArray.slice().sort(o.compareFieldsById);if(!t.length)return o.codegen()("return {}");for(var r=o.codegen(["m","o"],e.name+"$toObject")("if(!o)")("o={}")("var d={}"),n=[],s=[],f=[],c=0;c<t.length;++c)t[c].partOf||(t[c].resolve().repeated?n:t[c].map?s:f).push(t[c]);if(n.length){for(r("if(o.arrays||o.defaults){"),c=0;c<n.length;++c)r("d%s=[]",o.safeProp(n[c].name));r("}")}if(s.length){for(r("if(o.objects||o.defaults){"),c=0;c<s.length;++c)r("d%s={}",o.safeProp(s[c].name));r("}")}if(f.length){for(r("if(o.defaults){"),c=0;c<f.length;++c){var u=f[c],h=o.safeProp(u.name);if(u.resolvedType instanceof i)r("d%s=o.enums===String?%j:%j",h,u.resolvedType.valuesById[u.typeDefault],u.typeDefault);else if(u.long)r("if(util.Long){")("var n=new util.Long(%i,%i,%j)",u.typeDefault.low,u.typeDefault.high,u.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n",h)("}else")("d%s=o.longs===String?%j:%i",h,u.typeDefault.toString(),u.typeDefault.toNumber());else if(u.bytes){var d="["+Array.prototype.slice.call(u.typeDefault).join(",")+"]";r("if(o.bytes===String)d%s=%j",h,String.fromCharCode.apply(String,u.typeDefault))("else{")("d%s=%s",h,d)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)",h,h)("}")}else r("d%s=%j",h,u.typeDefault)}r("}")}var l=!1;for(c=0;c<t.length;++c){u=t[c];var p=e._fieldsArray.indexOf(u);h=o.safeProp(u.name);u.map?(l||(l=!0,r("var ks2")),r("if(m%s&&(ks2=Object.keys(m%s)).length){",h,h)("d%s={}",h)("for(var j=0;j<ks2.length;++j){"),a(r,u,p,h+"[ks2[j]]")("}")):u.repeated?(r("if(m%s&&m%s.length){",h,h)("d%s=[]",h)("for(var j=0;j<m%s.length;++j){",h),a(r,u,p,h+"[j]")("}")):(r("if(m%s!=null&&m.hasOwnProperty(%j)){",h,u.name),a(r,u,p,h),u.partOf&&r("if(o.oneofs)")("d%s=%j",o.safeProp(u.partOf.name),u.name)),r("}")}return r("return d")}},function(e,t,r){"use strict";var n=t,i=r(60);n[".google.protobuf.Any"]={fromObject:function(e){if(e&&e["@type"]){var t=this.lookup(e["@type"]);if(t){var r="."===e["@type"].charAt(0)?e["@type"].substr(1):e["@type"];return this.create({type_url:"/"+r,value:t.encode(t.fromObject(e)).finish()})}}return this.fromObject(e)},toObject:function(e,t){if(t&&t.json&&e.type_url&&e.value){var r=e.type_url.substring(e.type_url.lastIndexOf("/")+1),n=this.lookup(r);n&&(e=n.decode(e.value))}if(!(e instanceof this.ctor)&&e instanceof i){var o=e.$type.toObject(e,t);return o["@type"]=e.$type.fullName,o}return this.toObject(e,t)}}},function(e,t,r){"use strict";e.exports=l;var n=/[\s{}=;:[\],'"()<>]/g,i=/(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,o=/(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,s=/^ *[*\/]+ */,a=/^\s*\*?\/*/,f=/\n/g,c=/\s/,u=/\\(.?)/g,h={0:"\0",r:"\r",n:"\n",t:"\t"};function d(e){return e.replace(u,function(e,t){switch(t){case"\\":case"":return t;default:return h[t]||""}})}function l(e,t){e=e.toString();var r=0,u=e.length,h=1,l=null,p=null,b=0,y=!1,m=[],g=null;function v(e){return Error("illegal "+e+" (line "+h+")")}function _(t){return e.charAt(t)}function w(r,n){l=e.charAt(r++),b=h,y=!1;var i,o=r-(t?2:3);do{if(--o<0||"\n"===(i=e.charAt(o))){y=!0;break}}while(" "===i||"\t"===i);for(var c=e.substring(r,n).split(f),u=0;u<c.length;++u)c[u]=c[u].replace(t?a:s,"").trim();p=c.join("\n").trim()}function E(t){var r=S(t),n=e.substring(t,r);return/^\s*\/{1,2}/.test(n)}function S(e){for(var t=e;t<u&&"\n"!==_(t);)t++;return t}function A(){if(m.length>0)return m.shift();if(g)return function(){var t="'"===g?o:i;t.lastIndex=r-1;var n=t.exec(e);if(!n)throw v("string");return r=t.lastIndex,k(g),g=null,d(n[1])}();var s,a,f,l,p;do{if(r===u)return null;for(s=!1;c.test(f=_(r));)if("\n"===f&&++h,++r===u)return null;if("/"===_(r)){if(++r===u)throw v("comment");if("/"===_(r))if(t){if(l=r,p=!1,E(r)){p=!0;do{if((r=S(r))===u)break;r++}while(E(r))}else r=Math.min(u,S(r)+1);p&&w(l,r),h++,s=!0}else{for(p="/"===_(l=r+1);"\n"!==_(++r);)if(r===u)return null;++r,p&&w(l,r-1),++h,s=!0}else{if("*"!==(f=_(r)))return"/";l=r+1,p=t||"*"===_(l);do{if("\n"===f&&++h,++r===u)throw v("comment");a=f,f=_(r)}while("*"!==a||"/"!==f);++r,p&&w(l,r-2),s=!0}}}while(s);var b=r;if(n.lastIndex=0,!n.test(_(b++)))for(;b<u&&!n.test(_(b));)++b;var y=e.substring(r,r=b);return'"'!==y&&"'"!==y||(g=y),y}function k(e){m.push(e)}function x(){if(!m.length){var e=A();if(null===e)return null;k(e)}return m[0]}return Object.defineProperty({next:A,peek:x,push:k,skip:function(e,t){var r=x();if(r===e)return A(),!0;if(!t)throw v("token '"+r+"', '"+e+"' expected");return!1},cmnt:function(e){var r=null;return void 0===e?b===h-1&&(t||"*"===l||y)&&(r=p):(b<e&&x(),b!==e||y||!t&&"/"!==l||(r=p)),r}},"line",{get:function(){return h}})}l.unescape=d},function(e,t,r){"use strict";var n=t;function i(e){return 1===e.length?"0"+e:e}function o(e){for(var t="",r=0;r<e.length;r++)t+=i(e[r].toString(16));return t}n.toArray=function(e,t){if(Array.isArray(e))return e.slice();if(!e)return[];var r=[];if("string"!=typeof e){for(var n=0;n<e.length;n++)r[n]=0|e[n];return r}if("hex"===t)for((e=e.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(e="0"+e),n=0;n<e.length;n+=2)r.push(parseInt(e[n]+e[n+1],16));else for(n=0;n<e.length;n++){var i=e.charCodeAt(n),o=i>>8,s=255&i;o?r.push(o,s):r.push(s)}return r},n.zero2=i,n.toHex=o,n.encode=function(e,t){return"hex"===t?o(e):e}},function(e,t,r){var n;function i(e){this.rand=e}if(e.exports=function(e){return n||(n=new i(null)),n.generate(e)},e.exports.Rand=i,i.prototype.generate=function(e){return this._rand(e)},i.prototype._rand=function(e){if(this.rand.getBytes)return this.rand.getBytes(e);for(var t=new Uint8Array(e),r=0;r<t.length;r++)t[r]=this.rand.getByte();return t},"object"==typeof self)self.crypto&&self.crypto.getRandomValues?i.prototype._rand=function(e){var t=new Uint8Array(e);return self.crypto.getRandomValues(t),t}:self.msCrypto&&self.msCrypto.getRandomValues?i.prototype._rand=function(e){var t=new Uint8Array(e);return self.msCrypto.getRandomValues(t),t}:"object"==typeof window&&(i.prototype._rand=function(){throw new Error("Not implemented yet")});else try{var o=r(165);if("function"!=typeof o.randomBytes)throw new Error("Not supported");i.prototype._rand=function(e){return o.randomBytes(e)}}catch(e){}},function(e,t,r){"use strict";var n=r(19).rotr32;function i(e,t,r){return e&t^~e&r}function o(e,t,r){return e&t^e&r^t&r}function s(e,t,r){return e^t^r}t.ft_1=function(e,t,r,n){return 0===e?i(t,r,n):1===e||3===e?s(t,r,n):2===e?o(t,r,n):void 0},t.ch32=i,t.maj32=o,t.p32=s,t.s0_256=function(e){return n(e,2)^n(e,13)^n(e,22)},t.s1_256=function(e){return n(e,6)^n(e,11)^n(e,25)},t.g0_256=function(e){return n(e,7)^n(e,18)^e>>>3},t.g1_256=function(e){return n(e,17)^n(e,19)^e>>>10}},function(e,t,r){"use strict";var n=r(19),i=r(34),o=r(93),s=r(12),a=n.sum32,f=n.sum32_4,c=n.sum32_5,u=o.ch32,h=o.maj32,d=o.s0_256,l=o.s1_256,p=o.g0_256,b=o.g1_256,y=i.BlockHash,m=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];function g(){if(!(this instanceof g))return new g;y.call(this),this.h=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],this.k=m,this.W=new Array(64)}n.inherits(g,y),e.exports=g,g.blockSize=512,g.outSize=256,g.hmacStrength=192,g.padLength=64,g.prototype._update=function(e,t){for(var r=this.W,n=0;n<16;n++)r[n]=e[t+n];for(;n<r.length;n++)r[n]=f(b(r[n-2]),r[n-7],p(r[n-15]),r[n-16]);var i=this.h[0],o=this.h[1],y=this.h[2],m=this.h[3],g=this.h[4],v=this.h[5],_=this.h[6],w=this.h[7];for(s(this.k.length===r.length),n=0;n<r.length;n++){var E=c(w,l(g),u(g,v,_),this.k[n],r[n]),S=a(d(i),h(i,o,y));w=_,_=v,v=g,g=a(m,E),m=y,y=o,o=i,i=a(E,S)}this.h[0]=a(this.h[0],i),this.h[1]=a(this.h[1],o),this.h[2]=a(this.h[2],y),this.h[3]=a(this.h[3],m),this.h[4]=a(this.h[4],g),this.h[5]=a(this.h[5],v),this.h[6]=a(this.h[6],_),this.h[7]=a(this.h[7],w)},g.prototype._digest=function(e){return"hex"===e?n.toHex32(this.h,"big"):n.split32(this.h,"big")}},function(e,t,r){"use strict";var n=r(19),i=r(34),o=r(12),s=n.rotr64_hi,a=n.rotr64_lo,f=n.shr64_hi,c=n.shr64_lo,u=n.sum64,h=n.sum64_hi,d=n.sum64_lo,l=n.sum64_4_hi,p=n.sum64_4_lo,b=n.sum64_5_hi,y=n.sum64_5_lo,m=i.BlockHash,g=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function v(){if(!(this instanceof v))return new v;m.call(this),this.h=[1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209],this.k=g,this.W=new Array(160)}function _(e,t,r,n,i){var o=e&r^~e&i;return o<0&&(o+=4294967296),o}function w(e,t,r,n,i,o){var s=t&n^~t&o;return s<0&&(s+=4294967296),s}function E(e,t,r,n,i){var o=e&r^e&i^r&i;return o<0&&(o+=4294967296),o}function S(e,t,r,n,i,o){var s=t&n^t&o^n&o;return s<0&&(s+=4294967296),s}function A(e,t){var r=s(e,t,28)^s(t,e,2)^s(t,e,7);return r<0&&(r+=4294967296),r}function k(e,t){var r=a(e,t,28)^a(t,e,2)^a(t,e,7);return r<0&&(r+=4294967296),r}function x(e,t){var r=s(e,t,14)^s(e,t,18)^s(t,e,9);return r<0&&(r+=4294967296),r}function I(e,t){var r=a(e,t,14)^a(e,t,18)^a(t,e,9);return r<0&&(r+=4294967296),r}function T(e,t){var r=s(e,t,1)^s(e,t,8)^f(e,t,7);return r<0&&(r+=4294967296),r}function M(e,t){var r=a(e,t,1)^a(e,t,8)^c(e,t,7);return r<0&&(r+=4294967296),r}function O(e,t){var r=s(e,t,19)^s(t,e,29)^f(e,t,6);return r<0&&(r+=4294967296),r}function R(e,t){var r=a(e,t,19)^a(t,e,29)^c(e,t,6);return r<0&&(r+=4294967296),r}n.inherits(v,m),e.exports=v,v.blockSize=1024,v.outSize=512,v.hmacStrength=192,v.padLength=128,v.prototype._prepareBlock=function(e,t){for(var r=this.W,n=0;n<32;n++)r[n]=e[t+n];for(;n<r.length;n+=2){var i=O(r[n-4],r[n-3]),o=R(r[n-4],r[n-3]),s=r[n-14],a=r[n-13],f=T(r[n-30],r[n-29]),c=M(r[n-30],r[n-29]),u=r[n-32],h=r[n-31];r[n]=l(i,o,s,a,f,c,u,h),r[n+1]=p(i,o,s,a,f,c,u,h)}},v.prototype._update=function(e,t){this._prepareBlock(e,t);var r=this.W,n=this.h[0],i=this.h[1],s=this.h[2],a=this.h[3],f=this.h[4],c=this.h[5],l=this.h[6],p=this.h[7],m=this.h[8],g=this.h[9],v=this.h[10],T=this.h[11],M=this.h[12],O=this.h[13],R=this.h[14],B=this.h[15];o(this.k.length===r.length);for(var C=0;C<r.length;C+=2){var P=R,N=B,D=x(m,g),j=I(m,g),L=_(m,g,v,T,M),H=w(m,g,v,T,M,O),U=this.k[C],F=this.k[C+1],q=r[C],z=r[C+1],K=b(P,N,D,j,L,H,U,F,q,z),V=y(P,N,D,j,L,H,U,F,q,z);P=A(n,i),N=k(n,i),D=E(n,i,s,a,f),j=S(n,i,s,a,f,c);var Y=h(P,N,D,j),G=d(P,N,D,j);R=M,B=O,M=v,O=T,v=m,T=g,m=h(l,p,K,V),g=d(p,p,K,V),l=f,p=c,f=s,c=a,s=n,a=i,n=h(K,V,Y,G),i=d(K,V,Y,G)}u(this.h,0,n,i),u(this.h,2,s,a),u(this.h,4,f,c),u(this.h,6,l,p),u(this.h,8,m,g),u(this.h,10,v,T),u(this.h,12,M,O),u(this.h,14,R,B)},v.prototype._digest=function(e){return"hex"===e?n.toHex32(this.h,"big"):n.split32(this.h,"big")}},function(e,t,r){"use strict";var n=r(0).Buffer,i=r(64).Transform;function o(e){i.call(this),this._block=n.allocUnsafe(e),this._blockSize=e,this._blockOffset=0,this._length=[0,0,0,0],this._finalized=!1}r(1)(o,i),o.prototype._transform=function(e,t,r){var n=null;try{this.update(e,t)}catch(e){n=e}r(n)},o.prototype._flush=function(e){var t=null;try{this.push(this.digest())}catch(e){t=e}e(t)},o.prototype.update=function(e,t){if(function(e,t){if(!n.isBuffer(e)&&"string"!=typeof e)throw new TypeError(t+" must be a string or a buffer")}(e,"Data"),this._finalized)throw new Error("Digest already called");n.isBuffer(e)||(e=n.from(e,t));for(var r=this._block,i=0;this._blockOffset+e.length-i>=this._blockSize;){for(var o=this._blockOffset;o<this._blockSize;)r[o++]=e[i++];this._update(),this._blockOffset=0}for(;i<e.length;)r[this._blockOffset++]=e[i++];for(var s=0,a=8*e.length;a>0;++s)this._length[s]+=a,(a=this._length[s]/4294967296|0)>0&&(this._length[s]-=4294967296*a);return this},o.prototype._update=function(){throw new Error("_update is not implemented")},o.prototype.digest=function(e){if(this._finalized)throw new Error("Digest already called");this._finalized=!0;var t=this._digest();void 0!==e&&(t=t.toString(e)),this._block.fill(0),this._blockOffset=0;for(var r=0;r<4;++r)this._length[r]=0;return t},o.prototype._digest=function(){throw new Error("_digest is not implemented")},e.exports=o},function(e,t,r){"use strict";(function(t,n){var i=r(43);e.exports=v;var o,s=r(82);v.ReadableState=g;r(65).EventEmitter;var a=function(e,t){return e.listeners(t).length},f=r(98),c=r(0).Buffer,u=t.Uint8Array||function(){};var h=r(35);h.inherits=r(1);var d=r(185),l=void 0;l=d&&d.debuglog?d.debuglog("stream"):function(){};var p,b=r(186),y=r(99);h.inherits(v,f);var m=["error","close","destroy","pause","resume"];function g(e,t){e=e||{};var n=t instanceof(o=o||r(26));this.objectMode=!!e.objectMode,n&&(this.objectMode=this.objectMode||!!e.readableObjectMode);var i=e.highWaterMark,s=e.readableHighWaterMark,a=this.objectMode?16:16384;this.highWaterMark=i||0===i?i:n&&(s||0===s)?s:a,this.highWaterMark=Math.floor(this.highWaterMark),this.buffer=new b,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.destroyed=!1,this.defaultEncoding=e.defaultEncoding||"utf8",this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(p||(p=r(68).StringDecoder),this.decoder=new p(e.encoding),this.encoding=e.encoding)}function v(e){if(o=o||r(26),!(this instanceof v))return new v(e);this._readableState=new g(e,this),this.readable=!0,e&&("function"==typeof e.read&&(this._read=e.read),"function"==typeof e.destroy&&(this._destroy=e.destroy)),f.call(this)}function _(e,t,r,n,i){var o,s=e._readableState;null===t?(s.reading=!1,function(e,t){if(t.ended)return;if(t.decoder){var r=t.decoder.end();r&&r.length&&(t.buffer.push(r),t.length+=t.objectMode?1:r.length)}t.ended=!0,A(e)}(e,s)):(i||(o=function(e,t){var r;n=t,c.isBuffer(n)||n instanceof u||"string"==typeof t||void 0===t||e.objectMode||(r=new TypeError("Invalid non-string/buffer chunk"));var n;return r}(s,t)),o?e.emit("error",o):s.objectMode||t&&t.length>0?("string"==typeof t||s.objectMode||Object.getPrototypeOf(t)===c.prototype||(t=function(e){return c.from(e)}(t)),n?s.endEmitted?e.emit("error",new Error("stream.unshift() after end event")):w(e,s,t,!0):s.ended?e.emit("error",new Error("stream.push() after EOF")):(s.reading=!1,s.decoder&&!r?(t=s.decoder.write(t),s.objectMode||0!==t.length?w(e,s,t,!1):x(e,s)):w(e,s,t,!1))):n||(s.reading=!1));return function(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}(s)}function w(e,t,r,n){t.flowing&&0===t.length&&!t.sync?(e.emit("data",r),e.read(0)):(t.length+=t.objectMode?1:r.length,n?t.buffer.unshift(r):t.buffer.push(r),t.needReadable&&A(e)),x(e,t)}Object.defineProperty(v.prototype,"destroyed",{get:function(){return void 0!==this._readableState&&this._readableState.destroyed},set:function(e){this._readableState&&(this._readableState.destroyed=e)}}),v.prototype.destroy=y.destroy,v.prototype._undestroy=y.undestroy,v.prototype._destroy=function(e,t){this.push(null),t(e)},v.prototype.push=function(e,t){var r,n=this._readableState;return n.objectMode?r=!0:"string"==typeof e&&((t=t||n.defaultEncoding)!==n.encoding&&(e=c.from(e,t),t=""),r=!0),_(this,e,t,!1,r)},v.prototype.unshift=function(e){return _(this,e,null,!0,!1)},v.prototype.isPaused=function(){return!1===this._readableState.flowing},v.prototype.setEncoding=function(e){return p||(p=r(68).StringDecoder),this._readableState.decoder=new p(e),this._readableState.encoding=e,this};var E=8388608;function S(e,t){return e<=0||0===t.length&&t.ended?0:t.objectMode?1:e!=e?t.flowing&&t.length?t.buffer.head.data.length:t.length:(e>t.highWaterMark&&(t.highWaterMark=function(e){return e>=E?e=E:(e--,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e++),e}(e)),e<=t.length?e:t.ended?t.length:(t.needReadable=!0,0))}function A(e){var t=e._readableState;t.needReadable=!1,t.emittedReadable||(l("emitReadable",t.flowing),t.emittedReadable=!0,t.sync?i.nextTick(k,e):k(e))}function k(e){l("emit readable"),e.emit("readable"),O(e)}function x(e,t){t.readingMore||(t.readingMore=!0,i.nextTick(I,e,t))}function I(e,t){for(var r=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(l("maybeReadMore read 0"),e.read(0),r!==t.length);)r=t.length;t.readingMore=!1}function T(e){l("readable nexttick read 0"),e.read(0)}function M(e,t){t.reading||(l("resume read 0"),e.read(0)),t.resumeScheduled=!1,t.awaitDrain=0,e.emit("resume"),O(e),t.flowing&&!t.reading&&e.read(0)}function O(e){var t=e._readableState;for(l("flow",t.flowing);t.flowing&&null!==e.read(););}function R(e,t){return 0===t.length?null:(t.objectMode?r=t.buffer.shift():!e||e>=t.length?(r=t.decoder?t.buffer.join(""):1===t.buffer.length?t.buffer.head.data:t.buffer.concat(t.length),t.buffer.clear()):r=function(e,t,r){var n;e<t.head.data.length?(n=t.head.data.slice(0,e),t.head.data=t.head.data.slice(e)):n=e===t.head.data.length?t.shift():r?function(e,t){var r=t.head,n=1,i=r.data;e-=i.length;for(;r=r.next;){var o=r.data,s=e>o.length?o.length:e;if(s===o.length?i+=o:i+=o.slice(0,e),0===(e-=s)){s===o.length?(++n,r.next?t.head=r.next:t.head=t.tail=null):(t.head=r,r.data=o.slice(s));break}++n}return t.length-=n,i}(e,t):function(e,t){var r=c.allocUnsafe(e),n=t.head,i=1;n.data.copy(r),e-=n.data.length;for(;n=n.next;){var o=n.data,s=e>o.length?o.length:e;if(o.copy(r,r.length-e,0,s),0===(e-=s)){s===o.length?(++i,n.next?t.head=n.next:t.head=t.tail=null):(t.head=n,n.data=o.slice(s));break}++i}return t.length-=i,r}(e,t);return n}(e,t.buffer,t.decoder),r);var r}function B(e){var t=e._readableState;if(t.length>0)throw new Error('"endReadable()" called on non-empty stream');t.endEmitted||(t.ended=!0,i.nextTick(C,t,e))}function C(e,t){e.endEmitted||0!==e.length||(e.endEmitted=!0,t.readable=!1,t.emit("end"))}function P(e,t){for(var r=0,n=e.length;r<n;r++)if(e[r]===t)return r;return-1}v.prototype.read=function(e){l("read",e),e=parseInt(e,10);var t=this._readableState,r=e;if(0!==e&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return l("read: emitReadable",t.length,t.ended),0===t.length&&t.ended?B(this):A(this),null;if(0===(e=S(e,t))&&t.ended)return 0===t.length&&B(this),null;var n,i=t.needReadable;return l("need readable",i),(0===t.length||t.length-e<t.highWaterMark)&&l("length less than watermark",i=!0),t.ended||t.reading?l("reading or ended",i=!1):i&&(l("do read"),t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1,t.reading||(e=S(r,t))),null===(n=e>0?R(e,t):null)?(t.needReadable=!0,e=0):t.length-=e,0===t.length&&(t.ended||(t.needReadable=!0),r!==e&&t.ended&&B(this)),null!==n&&this.emit("data",n),n},v.prototype._read=function(e){this.emit("error",new Error("_read() is not implemented"))},v.prototype.pipe=function(e,t){var r=this,o=this._readableState;switch(o.pipesCount){case 0:o.pipes=e;break;case 1:o.pipes=[o.pipes,e];break;default:o.pipes.push(e)}o.pipesCount+=1,l("pipe count=%d opts=%j",o.pipesCount,t);var f=(!t||!1!==t.end)&&e!==n.stdout&&e!==n.stderr?u:v;function c(t,n){l("onunpipe"),t===r&&n&&!1===n.hasUnpiped&&(n.hasUnpiped=!0,l("cleanup"),e.removeListener("close",m),e.removeListener("finish",g),e.removeListener("drain",h),e.removeListener("error",y),e.removeListener("unpipe",c),r.removeListener("end",u),r.removeListener("end",v),r.removeListener("data",b),d=!0,!o.awaitDrain||e._writableState&&!e._writableState.needDrain||h())}function u(){l("onend"),e.end()}o.endEmitted?i.nextTick(f):r.once("end",f),e.on("unpipe",c);var h=function(e){return function(){var t=e._readableState;l("pipeOnDrain",t.awaitDrain),t.awaitDrain&&t.awaitDrain--,0===t.awaitDrain&&a(e,"data")&&(t.flowing=!0,O(e))}}(r);e.on("drain",h);var d=!1;var p=!1;function b(t){l("ondata"),p=!1,!1!==e.write(t)||p||((1===o.pipesCount&&o.pipes===e||o.pipesCount>1&&-1!==P(o.pipes,e))&&!d&&(l("false write response, pause",r._readableState.awaitDrain),r._readableState.awaitDrain++,p=!0),r.pause())}function y(t){l("onerror",t),v(),e.removeListener("error",y),0===a(e,"error")&&e.emit("error",t)}function m(){e.removeListener("finish",g),v()}function g(){l("onfinish"),e.removeListener("close",m),v()}function v(){l("unpipe"),r.unpipe(e)}return r.on("data",b),function(e,t,r){if("function"==typeof e.prependListener)return e.prependListener(t,r);e._events&&e._events[t]?s(e._events[t])?e._events[t].unshift(r):e._events[t]=[r,e._events[t]]:e.on(t,r)}(e,"error",y),e.once("close",m),e.once("finish",g),e.emit("pipe",r),o.flowing||(l("pipe resume"),r.resume()),e},v.prototype.unpipe=function(e){var t=this._readableState,r={hasUnpiped:!1};if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,t.flowing=!1,e&&e.emit("unpipe",this,r),this);if(!e){var n=t.pipes,i=t.pipesCount;t.pipes=null,t.pipesCount=0,t.flowing=!1;for(var o=0;o<i;o++)n[o].emit("unpipe",this,r);return this}var s=P(t.pipes,e);return-1===s?this:(t.pipes.splice(s,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this,r),this)},v.prototype.on=function(e,t){var r=f.prototype.on.call(this,e,t);if("data"===e)!1!==this._readableState.flowing&&this.resume();else if("readable"===e){var n=this._readableState;n.endEmitted||n.readableListening||(n.readableListening=n.needReadable=!0,n.emittedReadable=!1,n.reading?n.length&&A(this):i.nextTick(T,this))}return r},v.prototype.addListener=v.prototype.on,v.prototype.resume=function(){var e=this._readableState;return e.flowing||(l("resume"),e.flowing=!0,function(e,t){t.resumeScheduled||(t.resumeScheduled=!0,i.nextTick(M,e,t))}(this,e)),this},v.prototype.pause=function(){return l("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(l("pause"),this._readableState.flowing=!1,this.emit("pause")),this},v.prototype.wrap=function(e){var t=this,r=this._readableState,n=!1;for(var i in e.on("end",function(){if(l("wrapped end"),r.decoder&&!r.ended){var e=r.decoder.end();e&&e.length&&t.push(e)}t.push(null)}),e.on("data",function(i){(l("wrapped data"),r.decoder&&(i=r.decoder.write(i)),r.objectMode&&null==i)||(r.objectMode||i&&i.length)&&(t.push(i)||(n=!0,e.pause()))}),e)void 0===this[i]&&"function"==typeof e[i]&&(this[i]=function(t){return function(){return e[t].apply(e,arguments)}}(i));for(var o=0;o<m.length;o++)e.on(m[o],this.emit.bind(this,m[o]));return this._read=function(t){l("wrapped _read",t),n&&(n=!1,e.resume())},this},Object.defineProperty(v.prototype,"readableHighWaterMark",{enumerable:!1,get:function(){return this._readableState.highWaterMark}}),v._fromList=R}).call(this,r(11),r(15))},function(e,t,r){e.exports=r(65).EventEmitter},function(e,t,r){"use strict";var n=r(43);function i(e,t){e.emit("error",t)}e.exports={destroy:function(e,t){var r=this,o=this._readableState&&this._readableState.destroyed,s=this._writableState&&this._writableState.destroyed;return o||s?(t?t(e):!e||this._writableState&&this._writableState.errorEmitted||n.nextTick(i,this,e),this):(this._readableState&&(this._readableState.destroyed=!0),this._writableState&&(this._writableState.destroyed=!0),this._destroy(e||null,function(e){!t&&e?(n.nextTick(i,r,e),r._writableState&&(r._writableState.errorEmitted=!0)):t&&t(e)}),this)},undestroy:function(){this._readableState&&(this._readableState.destroyed=!1,this._readableState.reading=!1,this._readableState.ended=!1,this._readableState.endEmitted=!1),this._writableState&&(this._writableState.destroyed=!1,this._writableState.ended=!1,this._writableState.ending=!1,this._writableState.finished=!1,this._writableState.errorEmitted=!1)}}},function(e,t,r){"use strict";e.exports=s;var n=r(26),i=r(35);function o(e,t){var r=this._transformState;r.transforming=!1;var n=r.writecb;if(!n)return this.emit("error",new Error("write callback called multiple times"));r.writechunk=null,r.writecb=null,null!=t&&this.push(t),n(e);var i=this._readableState;i.reading=!1,(i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}function s(e){if(!(this instanceof s))return new s(e);n.call(this,e),this._transformState={afterTransform:o.bind(this),needTransform:!1,transforming:!1,writecb:null,writechunk:null,writeencoding:null},this._readableState.needReadable=!0,this._readableState.sync=!1,e&&("function"==typeof e.transform&&(this._transform=e.transform),"function"==typeof e.flush&&(this._flush=e.flush)),this.on("prefinish",a)}function a(){var e=this;"function"==typeof this._flush?this._flush(function(t,r){f(e,t,r)}):f(this,null,null)}function f(e,t,r){if(t)return e.emit("error",t);if(null!=r&&e.push(r),e._writableState.length)throw new Error("Calling transform done when ws.length != 0");if(e._transformState.transforming)throw new Error("Calling transform done when still transforming");return e.push(null)}i.inherits=r(1),i.inherits(s,n),s.prototype.push=function(e,t){return this._transformState.needTransform=!1,n.prototype.push.call(this,e,t)},s.prototype._transform=function(e,t,r){throw new Error("_transform() is not implemented")},s.prototype._write=function(e,t,r){var n=this._transformState;if(n.writecb=r,n.writechunk=e,n.writeencoding=t,!n.transforming){var i=this._readableState;(n.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},s.prototype._read=function(e){var t=this._transformState;null!==t.writechunk&&t.writecb&&!t.transforming?(t.transforming=!0,this._transform(t.writechunk,t.writeencoding,t.afterTransform)):t.needTransform=!0},s.prototype._destroy=function(e,t){var r=this;n.prototype._destroy.call(this,e,function(e){t(e),r.emit("close")})}},function(e,t,r){var n=r(1),i=r(30),o=r(0).Buffer,s=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],a=new Array(64);function f(){this.init(),this._w=a,i.call(this,64,56)}function c(e,t,r){return r^e&(t^r)}function u(e,t,r){return e&t|r&(e|t)}function h(e){return(e>>>2|e<<30)^(e>>>13|e<<19)^(e>>>22|e<<10)}function d(e){return(e>>>6|e<<26)^(e>>>11|e<<21)^(e>>>25|e<<7)}function l(e){return(e>>>7|e<<25)^(e>>>18|e<<14)^e>>>3}n(f,i),f.prototype.init=function(){return this._a=1779033703,this._b=3144134277,this._c=1013904242,this._d=2773480762,this._e=1359893119,this._f=2600822924,this._g=528734635,this._h=1541459225,this},f.prototype._update=function(e){for(var t,r=this._w,n=0|this._a,i=0|this._b,o=0|this._c,a=0|this._d,f=0|this._e,p=0|this._f,b=0|this._g,y=0|this._h,m=0;m<16;++m)r[m]=e.readInt32BE(4*m);for(;m<64;++m)r[m]=0|(((t=r[m-2])>>>17|t<<15)^(t>>>19|t<<13)^t>>>10)+r[m-7]+l(r[m-15])+r[m-16];for(var g=0;g<64;++g){var v=y+d(f)+c(f,p,b)+s[g]+r[g]|0,_=h(n)+u(n,i,o)|0;y=b,b=p,p=f,f=a+v|0,a=o,o=i,i=n,n=v+_|0}this._a=n+this._a|0,this._b=i+this._b|0,this._c=o+this._c|0,this._d=a+this._d|0,this._e=f+this._e|0,this._f=p+this._f|0,this._g=b+this._g|0,this._h=y+this._h|0},f.prototype._hash=function(){var e=o.allocUnsafe(32);return e.writeInt32BE(this._a,0),e.writeInt32BE(this._b,4),e.writeInt32BE(this._c,8),e.writeInt32BE(this._d,12),e.writeInt32BE(this._e,16),e.writeInt32BE(this._f,20),e.writeInt32BE(this._g,24),e.writeInt32BE(this._h,28),e},e.exports=f},function(e,t,r){var n=r(1),i=r(30),o=r(0).Buffer,s=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],a=new Array(160);function f(){this.init(),this._w=a,i.call(this,128,112)}function c(e,t,r){return r^e&(t^r)}function u(e,t,r){return e&t|r&(e|t)}function h(e,t){return(e>>>28|t<<4)^(t>>>2|e<<30)^(t>>>7|e<<25)}function d(e,t){return(e>>>14|t<<18)^(e>>>18|t<<14)^(t>>>9|e<<23)}function l(e,t){return(e>>>1|t<<31)^(e>>>8|t<<24)^e>>>7}function p(e,t){return(e>>>1|t<<31)^(e>>>8|t<<24)^(e>>>7|t<<25)}function b(e,t){return(e>>>19|t<<13)^(t>>>29|e<<3)^e>>>6}function y(e,t){return(e>>>19|t<<13)^(t>>>29|e<<3)^(e>>>6|t<<26)}function m(e,t){return e>>>0<t>>>0?1:0}n(f,i),f.prototype.init=function(){return this._ah=1779033703,this._bh=3144134277,this._ch=1013904242,this._dh=2773480762,this._eh=1359893119,this._fh=2600822924,this._gh=528734635,this._hh=1541459225,this._al=4089235720,this._bl=2227873595,this._cl=4271175723,this._dl=1595750129,this._el=2917565137,this._fl=725511199,this._gl=4215389547,this._hl=327033209,this},f.prototype._update=function(e){for(var t=this._w,r=0|this._ah,n=0|this._bh,i=0|this._ch,o=0|this._dh,a=0|this._eh,f=0|this._fh,g=0|this._gh,v=0|this._hh,_=0|this._al,w=0|this._bl,E=0|this._cl,S=0|this._dl,A=0|this._el,k=0|this._fl,x=0|this._gl,I=0|this._hl,T=0;T<32;T+=2)t[T]=e.readInt32BE(4*T),t[T+1]=e.readInt32BE(4*T+4);for(;T<160;T+=2){var M=t[T-30],O=t[T-30+1],R=l(M,O),B=p(O,M),C=b(M=t[T-4],O=t[T-4+1]),P=y(O,M),N=t[T-14],D=t[T-14+1],j=t[T-32],L=t[T-32+1],H=B+D|0,U=R+N+m(H,B)|0;U=(U=U+C+m(H=H+P|0,P)|0)+j+m(H=H+L|0,L)|0,t[T]=U,t[T+1]=H}for(var F=0;F<160;F+=2){U=t[F],H=t[F+1];var q=u(r,n,i),z=u(_,w,E),K=h(r,_),V=h(_,r),Y=d(a,A),G=d(A,a),W=s[F],X=s[F+1],J=c(a,f,g),$=c(A,k,x),Z=I+G|0,Q=v+Y+m(Z,I)|0;Q=(Q=(Q=Q+J+m(Z=Z+$|0,$)|0)+W+m(Z=Z+X|0,X)|0)+U+m(Z=Z+H|0,H)|0;var ee=V+z|0,te=K+q+m(ee,V)|0;v=g,I=x,g=f,x=k,f=a,k=A,a=o+Q+m(A=S+Z|0,S)|0,o=i,S=E,i=n,E=w,n=r,w=_,r=Q+te+m(_=Z+ee|0,Z)|0}this._al=this._al+_|0,this._bl=this._bl+w|0,this._cl=this._cl+E|0,this._dl=this._dl+S|0,this._el=this._el+A|0,this._fl=this._fl+k|0,this._gl=this._gl+x|0,this._hl=this._hl+I|0,this._ah=this._ah+r+m(this._al,_)|0,this._bh=this._bh+n+m(this._bl,w)|0,this._ch=this._ch+i+m(this._cl,E)|0,this._dh=this._dh+o+m(this._dl,S)|0,this._eh=this._eh+a+m(this._el,A)|0,this._fh=this._fh+f+m(this._fl,k)|0,this._gh=this._gh+g+m(this._gl,x)|0,this._hh=this._hh+v+m(this._hl,I)|0},f.prototype._hash=function(){var e=o.allocUnsafe(64);function t(t,r,n){e.writeInt32BE(t,n),e.writeInt32BE(r,n+4)}return t(this._ah,this._al,0),t(this._bh,this._bl,8),t(this._ch,this._cl,16),t(this._dh,this._dl,24),t(this._eh,this._el,32),t(this._fh,this._fl,40),t(this._gh,this._gl,48),t(this._hh,this._hl,56),e},e.exports=f},function(e,t,r){(function(t){var r=Math.pow(2,30)-1;function n(e,r){if("string"!=typeof e&&!t.isBuffer(e))throw new TypeError(r+" must be a buffer or string")}e.exports=function(e,t,i,o){if(n(e,"Password"),n(t,"Salt"),"number"!=typeof i)throw new TypeError("Iterations not a number");if(i<0)throw new TypeError("Bad iterations");if("number"!=typeof o)throw new TypeError("Key length not a number");if(o<0||o>r||o!=o)throw new TypeError("Bad key length")}}).call(this,r(2).Buffer)},function(e,t,r){(function(t){var r;t.browser?r="utf-8":r=parseInt(t.version.split(".")[0].slice(1),10)>=6?"utf-8":"binary";e.exports=r}).call(this,r(15))},function(e,t,r){var n=r(106),i=r(69),o=r(70),s=r(103),a=r(104),f=r(0).Buffer,c=f.alloc(128),u={md5:16,sha1:20,sha224:28,sha256:32,sha384:48,sha512:64,rmd160:20,ripemd160:20};function h(e,t,r){var s=function(e){return"rmd160"===e||"ripemd160"===e?function(e){return(new i).update(e).digest()}:"md5"===e?n:function(t){return o(e).update(t).digest()}}(e),a="sha512"===e||"sha384"===e?128:64;t.length>a?t=s(t):t.length<a&&(t=f.concat([t,c],a));for(var h=f.allocUnsafe(a+u[e]),d=f.allocUnsafe(a+u[e]),l=0;l<a;l++)h[l]=54^t[l],d[l]=92^t[l];var p=f.allocUnsafe(a+r+4);h.copy(p,0,0,a),this.ipad1=p,this.ipad2=h,this.opad=d,this.alg=e,this.blocksize=a,this.hash=s,this.size=u[e]}h.prototype.run=function(e,t){return e.copy(t,this.blocksize),this.hash(t).copy(this.opad,this.blocksize),this.hash(this.opad)},e.exports=function(e,t,r,n,i){s(e,t,r,n),f.isBuffer(e)||(e=f.from(e,a)),f.isBuffer(t)||(t=f.from(t,a));var o=new h(i=i||"sha1",e,t.length),c=f.allocUnsafe(n),d=f.allocUnsafe(t.length+4);t.copy(d,0,0,t.length);for(var l=0,p=u[i],b=Math.ceil(n/p),y=1;y<=b;y++){d.writeUInt32BE(y,t.length);for(var m=o.run(d,o.ipad1),g=m,v=1;v<r;v++){g=o.run(g,o.ipad2);for(var _=0;_<p;_++)m[_]^=g[_]}m.copy(c,l),l+=p}return c}},function(e,t,r){var n=r(63);e.exports=function(e){return(new n).update(e).digest()}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n={};let i;t.wordlists=n,t._default=i;try{t._default=i=r(!function(){var e=new Error("Cannot find module './wordlists/chinese_simplified.json'");throw e.code="MODULE_NOT_FOUND",e}()),n.chinese_simplified=i}catch(e){}try{t._default=i=r(!function(){var e=new Error("Cannot find module './wordlists/chinese_traditional.json'");throw e.code="MODULE_NOT_FOUND",e}()),n.chinese_traditional=i}catch(e){}try{t._default=i=r(!function(){var e=new Error("Cannot find module './wordlists/korean.json'");throw e.code="MODULE_NOT_FOUND",e}()),n.korean=i}catch(e){}try{t._default=i=r(!function(){var e=new Error("Cannot find module './wordlists/french.json'");throw e.code="MODULE_NOT_FOUND",e}()),n.french=i}catch(e){}try{t._default=i=r(!function(){var e=new Error("Cannot find module './wordlists/italian.json'");throw e.code="MODULE_NOT_FOUND",e}()),n.italian=i}catch(e){}try{t._default=i=r(!function(){var e=new Error("Cannot find module './wordlists/spanish.json'");throw e.code="MODULE_NOT_FOUND",e}()),n.spanish=i}catch(e){}try{t._default=i=r(!function(){var e=new Error("Cannot find module './wordlists/japanese.json'");throw e.code="MODULE_NOT_FOUND",e}()),n.japanese=i,n.JA=i}catch(e){}try{t._default=i=r(201),n.english=i,n.EN=i}catch(e){}},function(e,t,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(e){n[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var r,s,a=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),f=1;f<arguments.length;f++){for(var c in r=Object(arguments[f]))i.call(r,c)&&(a[c]=r[c]);if(n){s=n(r);for(var u=0;u<s.length;u++)o.call(r,s[u])&&(a[s[u]]=r[s[u]])}}return a}},function(e,t,r){"use strict";var n=r(1),i=r(206),o=r(22),s=r(0).Buffer,a=r(106),f=r(69),c=r(70),u=s.alloc(128);function h(e,t){o.call(this,"digest"),"string"==typeof t&&(t=s.from(t));var r="sha512"===e||"sha384"===e?128:64;(this._alg=e,this._key=t,t.length>r)?t=("rmd160"===e?new f:c(e)).update(t).digest():t.length<r&&(t=s.concat([t,u],r));for(var n=this._ipad=s.allocUnsafe(r),i=this._opad=s.allocUnsafe(r),a=0;a<r;a++)n[a]=54^t[a],i[a]=92^t[a];this._hash="rmd160"===e?new f:c(e),this._hash.update(n)}n(h,o),h.prototype._update=function(e){this._hash.update(e)},h.prototype._final=function(){var e=this._hash.digest();return("rmd160"===this._alg?new f:c(this._alg)).update(this._opad).update(e).digest()},e.exports=function(e,t){return"rmd160"===(e=e.toLowerCase())||"ripemd160"===e?new h("rmd160",t):"md5"===e?new i(a,t):new h(e,t)}},function(e){e.exports={sha224WithRSAEncryption:{sign:"rsa",hash:"sha224",id:"302d300d06096086480165030402040500041c"},"RSA-SHA224":{sign:"ecdsa/rsa",hash:"sha224",id:"302d300d06096086480165030402040500041c"},sha256WithRSAEncryption:{sign:"rsa",hash:"sha256",id:"3031300d060960864801650304020105000420"},"RSA-SHA256":{sign:"ecdsa/rsa",hash:"sha256",id:"3031300d060960864801650304020105000420"},sha384WithRSAEncryption:{sign:"rsa",hash:"sha384",id:"3041300d060960864801650304020205000430"},"RSA-SHA384":{sign:"ecdsa/rsa",hash:"sha384",id:"3041300d060960864801650304020205000430"},sha512WithRSAEncryption:{sign:"rsa",hash:"sha512",id:"3051300d060960864801650304020305000440"},"RSA-SHA512":{sign:"ecdsa/rsa",hash:"sha512",id:"3051300d060960864801650304020305000440"},"RSA-SHA1":{sign:"rsa",hash:"sha1",id:"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{sign:"ecdsa",hash:"sha1",id:""},sha256:{sign:"ecdsa",hash:"sha256",id:""},sha224:{sign:"ecdsa",hash:"sha224",id:""},sha384:{sign:"ecdsa",hash:"sha384",id:""},sha512:{sign:"ecdsa",hash:"sha512",id:""},"DSA-SHA":{sign:"dsa",hash:"sha1",id:""},"DSA-SHA1":{sign:"dsa",hash:"sha1",id:""},DSA:{sign:"dsa",hash:"sha1",id:""},"DSA-WITH-SHA224":{sign:"dsa",hash:"sha224",id:""},"DSA-SHA224":{sign:"dsa",hash:"sha224",id:""},"DSA-WITH-SHA256":{sign:"dsa",hash:"sha256",id:""},"DSA-SHA256":{sign:"dsa",hash:"sha256",id:""},"DSA-WITH-SHA384":{sign:"dsa",hash:"sha384",id:""},"DSA-SHA384":{sign:"dsa",hash:"sha384",id:""},"DSA-WITH-SHA512":{sign:"dsa",hash:"sha512",id:""},"DSA-SHA512":{sign:"dsa",hash:"sha512",id:""},"DSA-RIPEMD160":{sign:"dsa",hash:"rmd160",id:""},ripemd160WithRSA:{sign:"rsa",hash:"rmd160",id:"3021300906052b2403020105000414"},"RSA-RIPEMD160":{sign:"rsa",hash:"rmd160",id:"3021300906052b2403020105000414"},md5WithRSAEncryption:{sign:"rsa",hash:"md5",id:"3020300c06082a864886f70d020505000410"},"RSA-MD5":{sign:"rsa",hash:"md5",id:"3020300c06082a864886f70d020505000410"}}},function(e,t,r){var n=r(36),i=r(0).Buffer,o=r(112);function s(e){var t=e._cipher.encryptBlockRaw(e._prev);return o(e._prev),t}t.encrypt=function(e,t){var r=Math.ceil(t.length/16),o=e._cache.length;e._cache=i.concat([e._cache,i.allocUnsafe(16*r)]);for(var a=0;a<r;a++){var f=s(e),c=o+16*a;e._cache.writeUInt32BE(f[0],c+0),e._cache.writeUInt32BE(f[1],c+4),e._cache.writeUInt32BE(f[2],c+8),e._cache.writeUInt32BE(f[3],c+12)}var u=e._cache.slice(0,t.length);return e._cache=e._cache.slice(t.length),n(t,u)}},function(e,t){e.exports=function(e){for(var t,r=e.length;r--;){if(255!==(t=e.readUInt8(r))){t++,e.writeUInt8(t,r);break}e.writeUInt8(0,r)}}},function(e){e.exports={"aes-128-ecb":{cipher:"AES",key:128,iv:0,mode:"ECB",type:"block"},"aes-192-ecb":{cipher:"AES",key:192,iv:0,mode:"ECB",type:"block"},"aes-256-ecb":{cipher:"AES",key:256,iv:0,mode:"ECB",type:"block"},"aes-128-cbc":{cipher:"AES",key:128,iv:16,mode:"CBC",type:"block"},"aes-192-cbc":{cipher:"AES",key:192,iv:16,mode:"CBC",type:"block"},"aes-256-cbc":{cipher:"AES",key:256,iv:16,mode:"CBC",type:"block"},aes128:{cipher:"AES",key:128,iv:16,mode:"CBC",type:"block"},aes192:{cipher:"AES",key:192,iv:16,mode:"CBC",type:"block"},aes256:{cipher:"AES",key:256,iv:16,mode:"CBC",type:"block"},"aes-128-cfb":{cipher:"AES",key:128,iv:16,mode:"CFB",type:"stream"},"aes-192-cfb":{cipher:"AES",key:192,iv:16,mode:"CFB",type:"stream"},"aes-256-cfb":{cipher:"AES",key:256,iv:16,mode:"CFB",type:"stream"},"aes-128-cfb8":{cipher:"AES",key:128,iv:16,mode:"CFB8",type:"stream"},"aes-192-cfb8":{cipher:"AES",key:192,iv:16,mode:"CFB8",type:"stream"},"aes-256-cfb8":{cipher:"AES",key:256,iv:16,mode:"CFB8",type:"stream"},"aes-128-cfb1":{cipher:"AES",key:128,iv:16,mode:"CFB1",type:"stream"},"aes-192-cfb1":{cipher:"AES",key:192,iv:16,mode:"CFB1",type:"stream"},"aes-256-cfb1":{cipher:"AES",key:256,iv:16,mode:"CFB1",type:"stream"},"aes-128-ofb":{cipher:"AES",key:128,iv:16,mode:"OFB",type:"stream"},"aes-192-ofb":{cipher:"AES",key:192,iv:16,mode:"OFB",type:"stream"},"aes-256-ofb":{cipher:"AES",key:256,iv:16,mode:"OFB",type:"stream"},"aes-128-ctr":{cipher:"AES",key:128,iv:16,mode:"CTR",type:"stream"},"aes-192-ctr":{cipher:"AES",key:192,iv:16,mode:"CTR",type:"stream"},"aes-256-ctr":{cipher:"AES",key:256,iv:16,mode:"CTR",type:"stream"},"aes-128-gcm":{cipher:"AES",key:128,iv:12,mode:"GCM",type:"auth"},"aes-192-gcm":{cipher:"AES",key:192,iv:12,mode:"GCM",type:"auth"},"aes-256-gcm":{cipher:"AES",key:256,iv:12,mode:"GCM",type:"auth"}}},function(e,t,r){var n=r(45),i=r(0).Buffer,o=r(22),s=r(1),a=r(222),f=r(36),c=r(112);function u(e,t,r,s){o.call(this);var f=i.alloc(4,0);this._cipher=new n.AES(t);var u=this._cipher.encryptBlock(f);this._ghash=new a(u),r=function(e,t,r){if(12===t.length)return e._finID=i.concat([t,i.from([0,0,0,1])]),i.concat([t,i.from([0,0,0,2])]);var n=new a(r),o=t.length,s=o%16;n.update(t),s&&(s=16-s,n.update(i.alloc(s,0))),n.update(i.alloc(8,0));var f=8*o,u=i.alloc(8);u.writeUIntBE(f,0,8),n.update(u),e._finID=n.state;var h=i.from(e._finID);return c(h),h}(this,r,u),this._prev=i.from(r),this._cache=i.allocUnsafe(0),this._secCache=i.allocUnsafe(0),this._decrypt=s,this._alen=0,this._len=0,this._mode=e,this._authTag=null,this._called=!1}s(u,o),u.prototype._update=function(e){if(!this._called&&this._alen){var t=16-this._alen%16;t<16&&(t=i.alloc(t,0),this._ghash.update(t))}this._called=!0;var r=this._mode.encrypt(this,e);return this._decrypt?this._ghash.update(e):this._ghash.update(r),this._len+=e.length,r},u.prototype._final=function(){if(this._decrypt&&!this._authTag)throw new Error("Unsupported state or unable to authenticate data");var e=f(this._ghash.final(8*this._alen,8*this._len),this._cipher.encryptBlock(this._finID));if(this._decrypt&&function(e,t){var r=0;e.length!==t.length&&r++;for(var n=Math.min(e.length,t.length),i=0;i<n;++i)r+=e[i]^t[i];return r}(e,this._authTag))throw new Error("Unsupported state or unable to authenticate data");this._authTag=e,this._cipher.scrub()},u.prototype.getAuthTag=function(){if(this._decrypt||!i.isBuffer(this._authTag))throw new Error("Attempting to get auth tag in unsupported state");return this._authTag},u.prototype.setAuthTag=function(e){if(!this._decrypt)throw new Error("Attempting to set auth tag in unsupported state");this._authTag=e},u.prototype.setAAD=function(e){if(this._called)throw new Error("Attempting to set AAD in unsupported state");this._ghash.update(e),this._alen+=e.length},e.exports=u},function(e,t,r){var n=r(45),i=r(0).Buffer,o=r(22);function s(e,t,r,s){o.call(this),this._cipher=new n.AES(t),this._prev=i.from(r),this._cache=i.allocUnsafe(0),this._secCache=i.allocUnsafe(0),this._decrypt=s,this._mode=e}r(1)(s,o),s.prototype._update=function(e){return this._mode.encrypt(this,e,this._decrypt)},s.prototype._final=function(){this._cipher.scrub()},e.exports=s},function(e,t,r){var n=r(27);e.exports=g,g.simpleSieve=y,g.fermatTest=m;var i=r(4),o=new i(24),s=new(r(117)),a=new i(1),f=new i(2),c=new i(5),u=(new i(16),new i(8),new i(10)),h=new i(3),d=(new i(7),new i(11)),l=new i(4),p=(new i(12),null);function b(){if(null!==p)return p;var e=[];e[0]=2;for(var t=1,r=3;r<1048576;r+=2){for(var n=Math.ceil(Math.sqrt(r)),i=0;i<t&&e[i]<=n&&r%e[i]!=0;i++);t!==i&&e[i]<=n||(e[t++]=r)}return p=e,e}function y(e){for(var t=b(),r=0;r<t.length;r++)if(0===e.modn(t[r]))return 0===e.cmpn(t[r]);return!0}function m(e){var t=i.mont(e);return 0===f.toRed(t).redPow(e.subn(1)).fromRed().cmpn(1)}function g(e,t){if(e<16)return new i(2===t||5===t?[140,123]:[140,39]);var r,p;for(t=new i(t);;){for(r=new i(n(Math.ceil(e/8)));r.bitLength()>e;)r.ishrn(1);if(r.isEven()&&r.iadd(a),r.testn(1)||r.iadd(f),t.cmp(f)){if(!t.cmp(c))for(;r.mod(u).cmp(h);)r.iadd(l)}else for(;r.mod(o).cmp(d);)r.iadd(l);if(y(p=r.shrn(1))&&y(r)&&m(p)&&m(r)&&s.test(p)&&s.test(r))return r}}},function(e,t,r){var n=r(4),i=r(92);function o(e){this.rand=e||new i.Rand}e.exports=o,o.create=function(e){return new o(e)},o.prototype._randbelow=function(e){var t=e.bitLength(),r=Math.ceil(t/8);do{var i=new n(this.rand.generate(r))}while(i.cmp(e)>=0);return i},o.prototype._randrange=function(e,t){var r=t.sub(e);return e.add(this._randbelow(r))},o.prototype.test=function(e,t,r){var i=e.bitLength(),o=n.mont(e),s=new n(1).toRed(o);t||(t=Math.max(1,i/48|0));for(var a=e.subn(1),f=0;!a.testn(f);f++);for(var c=e.shrn(f),u=a.toRed(o);t>0;t--){var h=this._randrange(new n(2),a);r&&r(h);var d=h.toRed(o).redPow(c);if(0!==d.cmp(s)&&0!==d.cmp(u)){for(var l=1;l<f;l++){if(0===(d=d.redSqr()).cmp(s))return!1;if(0===d.cmp(u))break}if(l===f)return!1}}return!0},o.prototype.getDivisor=function(e,t){var r=e.bitLength(),i=n.mont(e),o=new n(1).toRed(i);t||(t=Math.max(1,r/48|0));for(var s=e.subn(1),a=0;!s.testn(a);a++);for(var f=e.shrn(a),c=s.toRed(i);t>0;t--){var u=this._randrange(new n(2),s),h=e.gcd(u);if(0!==h.cmpn(1))return h;var d=u.toRed(i).redPow(f);if(0!==d.cmp(o)&&0!==d.cmp(c)){for(var l=1;l<a;l++){if(0===(d=d.redSqr()).cmp(o))return d.fromRed().subn(1).gcd(e);if(0===d.cmp(c))break}if(l===a)return(d=d.redSqr()).fromRed().subn(1).gcd(e)}}return!1}},function(e,t,r){var n=r(1),i=r(38).Reporter,o=r(2).Buffer;function s(e,t){i.call(this,t),o.isBuffer(e)?(this.base=e,this.offset=0,this.length=e.length):this.error("Input not Buffer")}function a(e,t){if(Array.isArray(e))this.length=0,this.value=e.map(function(e){return e instanceof a||(e=new a(e,t)),this.length+=e.length,e},this);else if("number"==typeof e){if(!(0<=e&&e<=255))return t.error("non-byte EncoderBuffer value");this.value=e,this.length=1}else if("string"==typeof e)this.value=e,this.length=o.byteLength(e);else{if(!o.isBuffer(e))return t.error("Unsupported type: "+typeof e);this.value=e,this.length=e.length}}n(s,i),t.DecoderBuffer=s,s.prototype.save=function(){return{offset:this.offset,reporter:i.prototype.save.call(this)}},s.prototype.restore=function(e){var t=new s(this.base);return t.offset=e.offset,t.length=this.offset,this.offset=e.offset,i.prototype.restore.call(this,e.reporter),t},s.prototype.isEmpty=function(){return this.offset===this.length},s.prototype.readUInt8=function(e){return this.offset+1<=this.length?this.base.readUInt8(this.offset++,!0):this.error(e||"DecoderBuffer overrun")},s.prototype.skip=function(e,t){if(!(this.offset+e<=this.length))return this.error(t||"DecoderBuffer overrun");var r=new s(this.base);return r._reporterState=this._reporterState,r.offset=this.offset,r.length=this.offset+e,this.offset+=e,r},s.prototype.raw=function(e){return this.base.slice(e?e.offset:this.offset,this.length)},t.EncoderBuffer=a,a.prototype.join=function(e,t){return e||(e=new o(this.length)),t||(t=0),0===this.length?e:(Array.isArray(this.value)?this.value.forEach(function(r){r.join(e,t),t+=r.length}):("number"==typeof this.value?e[t]=this.value:"string"==typeof this.value?e.write(this.value,t):o.isBuffer(this.value)&&this.value.copy(e,t),t+=this.length),e)}},function(e,t,r){var n=t;n._reverse=function(e){var t={};return Object.keys(e).forEach(function(r){(0|r)==r&&(r|=0);var n=e[r];t[n]=r}),t},n.der=r(235)},function(e,t,r){var n=r(1),i=r(37),o=i.base,s=i.bignum,a=i.constants.der;function f(e){this.enc="der",this.name=e.name,this.entity=e,this.tree=new c,this.tree._init(e.body)}function c(e){o.Node.call(this,"der",e)}function u(e,t){var r=e.readUInt8(t);if(e.isError(r))return r;var n=a.tagClass[r>>6],i=0==(32&r);if(31==(31&r)){var o=r;for(r=0;128==(128&o);){if(o=e.readUInt8(t),e.isError(o))return o;r<<=7,r|=127&o}}else r&=31;return{cls:n,primitive:i,tag:r,tagStr:a.tag[r]}}function h(e,t,r){var n=e.readUInt8(r);if(e.isError(n))return n;if(!t&&128===n)return null;if(0==(128&n))return n;var i=127&n;if(i>4)return e.error("length octect is too long");n=0;for(var o=0;o<i;o++){n<<=8;var s=e.readUInt8(r);if(e.isError(s))return s;n|=s}return n}e.exports=f,f.prototype.decode=function(e,t){return e instanceof o.DecoderBuffer||(e=new o.DecoderBuffer(e,t)),this.tree._decode(e,t)},n(c,o.Node),c.prototype._peekTag=function(e,t,r){if(e.isEmpty())return!1;var n=e.save(),i=u(e,'Failed to peek tag: "'+t+'"');return e.isError(i)?i:(e.restore(n),i.tag===t||i.tagStr===t||i.tagStr+"of"===t||r)},c.prototype._decodeTag=function(e,t,r){var n=u(e,'Failed to decode tag of "'+t+'"');if(e.isError(n))return n;var i=h(e,n.primitive,'Failed to get length of "'+t+'"');if(e.isError(i))return i;if(!r&&n.tag!==t&&n.tagStr!==t&&n.tagStr+"of"!==t)return e.error('Failed to match tag: "'+t+'"');if(n.primitive||null!==i)return e.skip(i,'Failed to match body of: "'+t+'"');var o=e.save(),s=this._skipUntilEnd(e,'Failed to skip indefinite length body: "'+this.tag+'"');return e.isError(s)?s:(i=e.offset-o.offset,e.restore(o),e.skip(i,'Failed to match body of: "'+t+'"'))},c.prototype._skipUntilEnd=function(e,t){for(;;){var r=u(e,t);if(e.isError(r))return r;var n,i=h(e,r.primitive,t);if(e.isError(i))return i;if(n=r.primitive||null!==i?e.skip(i):this._skipUntilEnd(e,t),e.isError(n))return n;if("end"===r.tagStr)break}},c.prototype._decodeList=function(e,t,r,n){for(var i=[];!e.isEmpty();){var o=this._peekTag(e,"end");if(e.isError(o))return o;var s=r.decode(e,"der",n);if(e.isError(s)&&o)break;i.push(s)}return i},c.prototype._decodeStr=function(e,t){if("bitstr"===t){var r=e.readUInt8();return e.isError(r)?r:{unused:r,data:e.raw()}}if("bmpstr"===t){var n=e.raw();if(n.length%2==1)return e.error("Decoding of string type: bmpstr length mismatch");for(var i="",o=0;o<n.length/2;o++)i+=String.fromCharCode(n.readUInt16BE(2*o));return i}if("numstr"===t){var s=e.raw().toString("ascii");return this._isNumstr(s)?s:e.error("Decoding of string type: numstr unsupported characters")}if("octstr"===t)return e.raw();if("objDesc"===t)return e.raw();if("printstr"===t){var a=e.raw().toString("ascii");return this._isPrintstr(a)?a:e.error("Decoding of string type: printstr unsupported characters")}return/str$/.test(t)?e.raw().toString():e.error("Decoding of string type: "+t+" unsupported")},c.prototype._decodeObjid=function(e,t,r){for(var n,i=[],o=0;!e.isEmpty();){var s=e.readUInt8();o<<=7,o|=127&s,0==(128&s)&&(i.push(o),o=0)}128&s&&i.push(o);var a=i[0]/40|0,f=i[0]%40;if(n=r?i:[a,f].concat(i.slice(1)),t){var c=t[n.join(" ")];void 0===c&&(c=t[n.join(".")]),void 0!==c&&(n=c)}return n},c.prototype._decodeTime=function(e,t){var r=e.raw().toString();if("gentime"===t)var n=0|r.slice(0,4),i=0|r.slice(4,6),o=0|r.slice(6,8),s=0|r.slice(8,10),a=0|r.slice(10,12),f=0|r.slice(12,14);else{if("utctime"!==t)return e.error("Decoding "+t+" time is not supported yet");n=0|r.slice(0,2),i=0|r.slice(2,4),o=0|r.slice(4,6),s=0|r.slice(6,8),a=0|r.slice(8,10),f=0|r.slice(10,12);n=n<70?2e3+n:1900+n}return Date.UTC(n,i-1,o,s,a,f,0)},c.prototype._decodeNull=function(e){return null},c.prototype._decodeBool=function(e){var t=e.readUInt8();return e.isError(t)?t:0!==t},c.prototype._decodeInt=function(e,t){var r=e.raw(),n=new s(r);return t&&(n=t[n.toString(10)]||n),n},c.prototype._use=function(e,t){return"function"==typeof e&&(e=e(t)),e._getDecoder("der").tree}},function(e,t,r){var n=r(1),i=r(2).Buffer,o=r(37),s=o.base,a=o.constants.der;function f(e){this.enc="der",this.name=e.name,this.entity=e,this.tree=new c,this.tree._init(e.body)}function c(e){s.Node.call(this,"der",e)}function u(e){return e<10?"0"+e:e}e.exports=f,f.prototype.encode=function(e,t){return this.tree._encode(e,t).join()},n(c,s.Node),c.prototype._encodeComposite=function(e,t,r,n){var o,s=function(e,t,r,n){var i;"seqof"===e?e="seq":"setof"===e&&(e="set");if(a.tagByName.hasOwnProperty(e))i=a.tagByName[e];else{if("number"!=typeof e||(0|e)!==e)return n.error("Unknown tag: "+e);i=e}if(i>=31)return n.error("Multi-octet tag encoding unsupported");t||(i|=32);return i|=a.tagClassByName[r||"universal"]<<6}(e,t,r,this.reporter);if(n.length<128)return(o=new i(2))[0]=s,o[1]=n.length,this._createEncoderBuffer([o,n]);for(var f=1,c=n.length;c>=256;c>>=8)f++;(o=new i(2+f))[0]=s,o[1]=128|f;c=1+f;for(var u=n.length;u>0;c--,u>>=8)o[c]=255&u;return this._createEncoderBuffer([o,n])},c.prototype._encodeStr=function(e,t){if("bitstr"===t)return this._createEncoderBuffer([0|e.unused,e.data]);if("bmpstr"===t){for(var r=new i(2*e.length),n=0;n<e.length;n++)r.writeUInt16BE(e.charCodeAt(n),2*n);return this._createEncoderBuffer(r)}return"numstr"===t?this._isNumstr(e)?this._createEncoderBuffer(e):this.reporter.error("Encoding of string type: numstr supports only digits and space"):"printstr"===t?this._isPrintstr(e)?this._createEncoderBuffer(e):this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark"):/str$/.test(t)?this._createEncoderBuffer(e):"objDesc"===t?this._createEncoderBuffer(e):this.reporter.error("Encoding of string type: "+t+" unsupported")},c.prototype._encodeObjid=function(e,t,r){if("string"==typeof e){if(!t)return this.reporter.error("string objid given, but no values map found");if(!t.hasOwnProperty(e))return this.reporter.error("objid not found in values map");e=t[e].split(/[\s\.]+/g);for(var n=0;n<e.length;n++)e[n]|=0}else if(Array.isArray(e)){e=e.slice();for(n=0;n<e.length;n++)e[n]|=0}if(!Array.isArray(e))return this.reporter.error("objid() should be either array or string, got: "+JSON.stringify(e));if(!r){if(e[1]>=40)return this.reporter.error("Second objid identifier OOB");e.splice(0,2,40*e[0]+e[1])}var o=0;for(n=0;n<e.length;n++){var s=e[n];for(o++;s>=128;s>>=7)o++}var a=new i(o),f=a.length-1;for(n=e.length-1;n>=0;n--){s=e[n];for(a[f--]=127&s;(s>>=7)>0;)a[f--]=128|127&s}return this._createEncoderBuffer(a)},c.prototype._encodeTime=function(e,t){var r,n=new Date(e);return"gentime"===t?r=[u(n.getFullYear()),u(n.getUTCMonth()+1),u(n.getUTCDate()),u(n.getUTCHours()),u(n.getUTCMinutes()),u(n.getUTCSeconds()),"Z"].join(""):"utctime"===t?r=[u(n.getFullYear()%100),u(n.getUTCMonth()+1),u(n.getUTCDate()),u(n.getUTCHours()),u(n.getUTCMinutes()),u(n.getUTCSeconds()),"Z"].join(""):this.reporter.error("Encoding "+t+" time is not supported yet"),this._encodeStr(r,"octstr")},c.prototype._encodeNull=function(){return this._createEncoderBuffer("")},c.prototype._encodeInt=function(e,t){if("string"==typeof e){if(!t)return this.reporter.error("String int or enum given, but no values map");if(!t.hasOwnProperty(e))return this.reporter.error("Values map doesn't contain: "+JSON.stringify(e));e=t[e]}if("number"!=typeof e&&!i.isBuffer(e)){var r=e.toArray();!e.sign&&128&r[0]&&r.unshift(0),e=new i(r)}if(i.isBuffer(e)){var n=e.length;0===e.length&&n++;var o=new i(n);return e.copy(o),0===e.length&&(o[0]=0),this._createEncoderBuffer(o)}if(e<128)return this._createEncoderBuffer(e);if(e<256)return this._createEncoderBuffer([0,e]);n=1;for(var s=e;s>=256;s>>=8)n++;for(s=(o=new Array(n)).length-1;s>=0;s--)o[s]=255&e,e>>=8;return 128&o[0]&&o.unshift(0),this._createEncoderBuffer(new i(o))},c.prototype._encodeBool=function(e){return this._createEncoderBuffer(e?255:0)},c.prototype._use=function(e,t){return"function"==typeof e&&(e=e(t)),e._getEncoder("der").tree},c.prototype._skipDefault=function(e,t,r){var n,i=this._baseState;if(null===i.default)return!1;var o=e.join();if(void 0===i.defaultBuffer&&(i.defaultBuffer=this._encodeValue(i.default,t,r).join()),o.length!==i.defaultBuffer.length)return!1;for(n=0;n<o.length;n++)if(o[n]!==i.defaultBuffer[n])return!1;return!0}},function(e){e.exports={"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"}},function(e,t,r){var n=r(21),i=r(0).Buffer;function o(e){var t=i.allocUnsafe(4);return t.writeUInt32BE(e,0),t}e.exports=function(e,t){for(var r,s=i.alloc(0),a=0;s.length<t;)r=o(a++),s=i.concat([s,n("sha1").update(e).update(r).digest()]);return s.slice(0,t)}},function(e,t){e.exports=function(e,t){for(var r=e.length,n=-1;++n<r;)e[n]^=t[n];return e}},function(e,t,r){var n=r(4),i=r(0).Buffer;e.exports=function(e,t){return i.from(e.toRed(n.mont(t.modulus)).redPow(new n(t.publicExponent)).fromRed().toArray())}},function(e){e.exports={COMPRESSED_TYPE_INVALID:"compressed should be a boolean",EC_PRIVATE_KEY_TYPE_INVALID:"private key should be a Buffer",EC_PRIVATE_KEY_LENGTH_INVALID:"private key length is invalid",EC_PRIVATE_KEY_RANGE_INVALID:"private key range is invalid",EC_PRIVATE_KEY_TWEAK_ADD_FAIL:"tweak out of range or resulting private key is invalid",EC_PRIVATE_KEY_TWEAK_MUL_FAIL:"tweak out of range",EC_PRIVATE_KEY_EXPORT_DER_FAIL:"couldn't export to DER format",EC_PRIVATE_KEY_IMPORT_DER_FAIL:"couldn't import from DER format",EC_PUBLIC_KEYS_TYPE_INVALID:"public keys should be an Array",EC_PUBLIC_KEYS_LENGTH_INVALID:"public keys Array should have at least 1 element",EC_PUBLIC_KEY_TYPE_INVALID:"public key should be a Buffer",EC_PUBLIC_KEY_LENGTH_INVALID:"public key length is invalid",EC_PUBLIC_KEY_PARSE_FAIL:"the public key could not be parsed or is invalid",EC_PUBLIC_KEY_CREATE_FAIL:"private was invalid, try again",EC_PUBLIC_KEY_TWEAK_ADD_FAIL:"tweak out of range or resulting public key is invalid",EC_PUBLIC_KEY_TWEAK_MUL_FAIL:"tweak out of range",EC_PUBLIC_KEY_COMBINE_FAIL:"the sum of the public keys is not valid",ECDH_FAIL:"scalar was invalid (zero or overflow)",ECDSA_SIGNATURE_TYPE_INVALID:"signature should be a Buffer",ECDSA_SIGNATURE_LENGTH_INVALID:"signature length is invalid",ECDSA_SIGNATURE_PARSE_FAIL:"couldn't parse signature",ECDSA_SIGNATURE_PARSE_DER_FAIL:"couldn't parse DER signature",ECDSA_SIGNATURE_SERIALIZE_DER_FAIL:"couldn't serialize signature to DER format",ECDSA_SIGN_FAIL:"nonce generation function failed or private key is invalid",ECDSA_RECOVER_FAIL:"couldn't recover public key from signature",MSG32_TYPE_INVALID:"message should be a Buffer",MSG32_LENGTH_INVALID:"message length is invalid",OPTIONS_TYPE_INVALID:"options should be an Object",OPTIONS_DATA_TYPE_INVALID:"options.data should be a Buffer",OPTIONS_DATA_LENGTH_INVALID:"options.data length is invalid",OPTIONS_NONCEFN_TYPE_INVALID:"options.noncefn should be a Function",RECOVERY_ID_TYPE_INVALID:"recovery should be a Number",RECOVERY_ID_VALUE_INVALID:"recovery should have value between -1 and 4",TWEAK_TYPE_INVALID:"tweak should be a Buffer",TWEAK_LENGTH_INVALID:"tweak length is invalid"}},function(e,t,r){var n,i,o,s,a,f,c,u;e.exports=(n=r(13),r(258),r(259),o=(i=n).lib,s=o.Base,a=o.WordArray,f=i.algo,c=f.MD5,u=f.EvpKDF=s.extend({cfg:s.extend({keySize:4,hasher:c,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var r=this.cfg,n=r.hasher.create(),i=a.create(),o=i.words,s=r.keySize,f=r.iterations;o.length<s;){c&&n.update(c);var c=n.update(e).finalize(t);n.reset();for(var u=1;u<f;u++)c=n.finalize(c),n.reset();i.concat(c)}return i.sigBytes=4*s,i}}),i.EvpKDF=function(e,t,r){return u.create(r).compute(e,t)},n.EvpKDF)},function(e,t,r){"use strict";(function(e){r.d(t,"a",function(){return d});var n=r(8),i=r.n(n),o=r(10),s=r.n(o),a=r(3),f=r(5),c=r(131),u=r(40),h=r(76),d=function(){function t(e){var r=this;i()(this,t),Object.keys(f.a).forEach(function(t){var n=f.a[t],i=n.name,o=new c.a(n);o.setRequestManager(e),Object(a.setPath)(r,i,o.run)})}return s()(t,[{key:"extractArgumentsIntoObject",value:function(e){var t={callback:a.noop,isSync:!1};return 0===e.length?t:(Object(a.isFunction)(e[e.length-1])&&(t.callback=e[e.length-1]),e.forEach(function(e){Object(a.isBoolean)(e.sync)&&(t.isSync=e.sync)}),t)}},{key:"contractAt",value:function(e,t){for(var r=this,n=arguments.length,i=new Array(n>2?n-2:0),o=2;o<n;o++)i[o-2]=arguments[o];var s=this.extractArgumentsIntoObject(i),a=s.callback;if(s.isSync){var f=this.getContractFileDescriptorSet(e,{sync:!0});if(f&&f.file&&f.file.length>0)return new h.a(this,f,t).at(e);throw new Error("no such contract")}return this.getContractFileDescriptorSet(e).then(function(n){if(n&&n.file&&n.file.length>0){var i=new h.a(r,n,t).at(e);return a(null,i),i}if(a(new Error("no such contract")),a.length>0)throw new Error("no such contract")})}},{key:"getMerklePath",value:function(t,r){for(var n=this,i=arguments.length,o=new Array(i>2?i-2:0),s=2;s<i;s++)o[s-2]=arguments[s];if(this.extractArgumentsIntoObject(o).isSync){var a=this.getBlockByHeight(r,!0,{sync:!0}),f=a.BlockHash,c=a.Body.Transactions,h=c.findIndex(function(e){return e===t});if(-1===h)throw new Error("txId ".concat(t," has no correspond transaction in the block with height ").concat(r));var d=this.getTxResult(f,0,c.length).map(function(t,r){var n=c[r],i=t.Status,o=e.concat([e.from(n.replace("0x",""),"hex"),e.from(i,"utf8")]);return u.b(o)});return u.a(h,d)}return this.getBlockByHeight(r,!0).then(function(i){var o=i.BlockHash,s=i.Body.Transactions,a=s.findIndex(function(e){return e===t});if(-1===a)throw new Error("txId ".concat(t," has no correspond transaction in the block with height ").concat(r));return n.getTxResults(o,0,s.length).then(function(t){var r=t.map(function(t,r){var n=s[r],i=t.Status,o=e.concat([e.from(n.replace("0x",""),"hex"),e.from(i,"utf8")]);return u.b(o)});return u.a(a,r)})})}}]),t}()}).call(this,r(2).Buffer)},function(e,t){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(t){return"function"==typeof Symbol&&"symbol"===r(Symbol.iterator)?e.exports=n=function(e){return r(e)}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":r(e)},n(t)}e.exports=n},function(e,t,r){"use strict";var n=r(156);e.exports=t=n.descriptor=n.Root.fromJSON(r(160)).lookup(".google.protobuf");var i=n.Namespace,o=n.Root,s=n.Enum,a=n.Type,f=n.Field,c=n.MapField,u=n.OneOf,h=n.Service,d=n.Method;o.fromDescriptor=function(e){"number"==typeof e.length&&(e=t.FileDescriptorSet.decode(e));var r=new o;if(e.file)for(var n,i,c,u=0;u<e.file.length;++u){if(i=r,(n=e.file[u]).package&&n.package.length&&(i=r.define(n.package)),n.name&&n.name.length&&r.files.push(i.filename=n.name),n.messageType)for(c=0;c<n.messageType.length;++c)i.add(a.fromDescriptor(n.messageType[c],n.syntax));if(n.enumType)for(c=0;c<n.enumType.length;++c)i.add(s.fromDescriptor(n.enumType[c]));if(n.extension)for(c=0;c<n.extension.length;++c)i.add(f.fromDescriptor(n.extension[c]));if(n.service)for(c=0;c<n.service.length;++c)i.add(h.fromDescriptor(n.service[c]));var d=_(n.options,t.FileOptions);if(d){var l=Object.keys(d);for(c=0;c<l.length;++c)i.setOption(l[c],d[l[c]])}}return r},o.prototype.toDescriptor=function(e){var r=t.FileDescriptorSet.create();return function e(r,n,c){var u=t.FileDescriptorProto.create({name:r.filename||(r.fullName.substring(1).replace(/\./g,"_")||"root")+".proto"});c&&(u.syntax=c);r instanceof o||(u.package=r.fullName.substring(1));for(var d,l=0;l<r.nestedArray.length;++l)(d=r._nestedArray[l])instanceof a?u.messageType.push(d.toDescriptor(c)):d instanceof s?u.enumType.push(d.toDescriptor()):d instanceof f?u.extension.push(d.toDescriptor(c)):d instanceof h?u.service.push(d.toDescriptor()):d instanceof i&&e(d,n,c);u.options=w(r.options,t.FileOptions);u.messageType.length+u.enumType.length+u.extension.length+u.service.length&&n.push(u)}(this,r.file,e),r};var l=0;a.fromDescriptor=function(e,r){"number"==typeof e.length&&(e=t.DescriptorProto.decode(e));var n,i=new a(e.name.length?e.name:"Type"+l++,_(e.options,t.MessageOptions));if(e.oneofDecl)for(n=0;n<e.oneofDecl.length;++n)i.add(u.fromDescriptor(e.oneofDecl[n]));if(e.field)for(n=0;n<e.field.length;++n){var o=f.fromDescriptor(e.field[n],r);i.add(o),e.field[n].hasOwnProperty("oneofIndex")&&i.oneofsArray[e.field[n].oneofIndex].add(o)}if(e.extension)for(n=0;n<e.extension.length;++n)i.add(f.fromDescriptor(e.extension[n],r));if(e.nestedType)for(n=0;n<e.nestedType.length;++n)i.add(a.fromDescriptor(e.nestedType[n],r)),e.nestedType[n].options&&e.nestedType[n].options.mapEntry&&i.setOption("map_entry",!0);if(e.enumType)for(n=0;n<e.enumType.length;++n)i.add(s.fromDescriptor(e.enumType[n]));if(e.extensionRange&&e.extensionRange.length)for(i.extensions=[],n=0;n<e.extensionRange.length;++n)i.extensions.push([e.extensionRange[n].start,e.extensionRange[n].end]);if(e.reservedRange&&e.reservedRange.length||e.reservedName&&e.reservedName.length){if(i.reserved=[],e.reservedRange)for(n=0;n<e.reservedRange.length;++n)i.reserved.push([e.reservedRange[n].start,e.reservedRange[n].end]);if(e.reservedName)for(n=0;n<e.reservedName.length;++n)i.reserved.push(e.reservedName[n])}return i},a.prototype.toDescriptor=function(e){var r,n=t.DescriptorProto.create({name:this.name});for(r=0;r<this.fieldsArray.length;++r){var i;if(n.field.push(i=this._fieldsArray[r].toDescriptor(e)),this._fieldsArray[r]instanceof c){var o=v(this._fieldsArray[r].keyType,this._fieldsArray[r].resolvedKeyType),u=v(this._fieldsArray[r].type,this._fieldsArray[r].resolvedType),h=11===u||14===u?this._fieldsArray[r].resolvedType&&E(this.parent,this._fieldsArray[r].resolvedType)||this._fieldsArray[r].type:void 0;n.nestedType.push(t.DescriptorProto.create({name:i.typeName,field:[t.FieldDescriptorProto.create({name:"key",number:1,label:1,type:o}),t.FieldDescriptorProto.create({name:"value",number:2,label:1,type:u,typeName:h})],options:t.MessageOptions.create({mapEntry:!0})}))}}for(r=0;r<this.oneofsArray.length;++r)n.oneofDecl.push(this._oneofsArray[r].toDescriptor());for(r=0;r<this.nestedArray.length;++r)this._nestedArray[r]instanceof f?n.field.push(this._nestedArray[r].toDescriptor(e)):this._nestedArray[r]instanceof a?n.nestedType.push(this._nestedArray[r].toDescriptor(e)):this._nestedArray[r]instanceof s&&n.enumType.push(this._nestedArray[r].toDescriptor());if(this.extensions)for(r=0;r<this.extensions.length;++r)n.extensionRange.push(t.DescriptorProto.ExtensionRange.create({start:this.extensions[r][0],end:this.extensions[r][1]}));if(this.reserved)for(r=0;r<this.reserved.length;++r)"string"==typeof this.reserved[r]?n.reservedName.push(this.reserved[r]):n.reservedRange.push(t.DescriptorProto.ReservedRange.create({start:this.reserved[r][0],end:this.reserved[r][1]}));return n.options=w(this.options,t.MessageOptions),n};var p=/^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/;f.fromDescriptor=function(e,r){if("number"==typeof e.length&&(e=t.DescriptorProto.decode(e)),"number"!=typeof e.number)throw Error("missing field id");var i,o;switch(i=e.typeName&&e.typeName.length?e.typeName:function(e){switch(e){case 1:return"double";case 2:return"float";case 3:return"int64";case 4:return"uint64";case 5:return"int32";case 6:return"fixed64";case 7:return"fixed32";case 8:return"bool";case 9:return"string";case 12:return"bytes";case 13:return"uint32";case 15:return"sfixed32";case 16:return"sfixed64";case 17:return"sint32";case 18:return"sint64"}throw Error("illegal type: "+e)}(e.type),e.label){case 1:o=void 0;break;case 2:o="required";break;case 3:o="repeated";break;default:throw Error("illegal label: "+e.label)}var s=e.extendee;void 0!==e.extendee&&(s=s.length?s:void 0);var a=new f(n.util.camelCase(e.name.length?e.name:"field"+e.number),e.number,i,o,s);if(a.options=_(e.options,t.FieldOptions),e.defaultValue&&e.defaultValue.length){var c=e.defaultValue;switch(c){case"true":case"TRUE":c=!0;break;case"false":case"FALSE":c=!1;break;default:p.exec(c)&&(c=parseInt(c))}a.setOption("default",c)}return function(e){switch(e){case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 13:case 14:case 15:case 16:case 17:case 18:return!0}return!1}(e.type)&&("proto3"===r?e.options&&!e.options.packed&&a.setOption("packed",!1):e.options&&e.options.packed||a.setOption("packed",!1)),a},f.prototype.toDescriptor=function(e){var r=t.FieldDescriptorProto.create({name:this.name,number:this.id});if(this.map)r.type=11,r.typeName=n.util.ucFirst(this.name),r.label=3;else{switch(r.type=v(this.type,this.resolve().resolvedType)){case 10:case 11:case 14:r.typeName=this.resolvedType?E(this.parent,this.resolvedType):this.type}switch(this.rule){case"repeated":r.label=3;break;case"required":r.label=2;break;default:r.label=1}}if(r.extendee=this.extensionField?this.extensionField.parent.fullName:this.extend,this.partOf&&(r.oneofIndex=this.parent.oneofsArray.indexOf(this.partOf))<0)throw Error("missing oneof");return this.options&&(r.options=w(this.options,t.FieldOptions),null!=this.options.default&&(r.defaultValue=String(this.options.default))),"proto3"===e?this.packed||((r.options||(r.options=t.FieldOptions.create())).packed=!1):this.packed&&((r.options||(r.options=t.FieldOptions.create())).packed=!0),r};var b=0;s.fromDescriptor=function(e){"number"==typeof e.length&&(e=t.EnumDescriptorProto.decode(e));var r={};if(e.value)for(var n=0;n<e.value.length;++n){var i=e.value[n].name,o=e.value[n].number||0;r[i&&i.length?i:"NAME"+o]=o}return new s(e.name&&e.name.length?e.name:"Enum"+b++,r,_(e.options,t.EnumOptions))},s.prototype.toDescriptor=function(){for(var e=[],r=0,n=Object.keys(this.values);r<n.length;++r)e.push(t.EnumValueDescriptorProto.create({name:n[r],number:this.values[n[r]]}));return t.EnumDescriptorProto.create({name:this.name,value:e,options:w(this.options,t.EnumOptions)})};var y=0;u.fromDescriptor=function(e){return"number"==typeof e.length&&(e=t.OneofDescriptorProto.decode(e)),new u(e.name&&e.name.length?e.name:"oneof"+y++)},u.prototype.toDescriptor=function(){return t.OneofDescriptorProto.create({name:this.name})};var m=0;h.fromDescriptor=function(e){"number"==typeof e.length&&(e=t.ServiceDescriptorProto.decode(e));var r=new h(e.name&&e.name.length?e.name:"Service"+m++,_(e.options,t.ServiceOptions));if(e.method)for(var n=0;n<e.method.length;++n)r.add(d.fromDescriptor(e.method[n]));return r},h.prototype.toDescriptor=function(){for(var e=[],r=0;r<this.methodsArray;++r)e.push(this._methodsArray[r].toDescriptor());return t.ServiceDescriptorProto.create({name:this.name,methods:e,options:w(this.options,t.ServiceOptions)})};var g=0;function v(e,t){switch(e){case"double":return 1;case"float":return 2;case"int64":return 3;case"uint64":return 4;case"int32":return 5;case"fixed64":return 6;case"fixed32":return 7;case"bool":return 8;case"string":return 9;case"bytes":return 12;case"uint32":return 13;case"sfixed32":return 15;case"sfixed64":return 16;case"sint32":return 17;case"sint64":return 18}if(t instanceof s)return 14;if(t instanceof a)return t.group?10:11;throw Error("illegal type: "+e)}function _(e,t){if(e){for(var r,i,o,a,f=[],c=0;c<t.fieldsArray.length;++c)"uninterpretedOption"!==(i=(r=t._fieldsArray[c]).name)&&e.hasOwnProperty(i)&&(o=e[i],r.resolvedType instanceof s&&"number"==typeof o&&void 0!==r.resolvedType.valuesById[o]&&(o=r.resolvedType.valuesById[o]),f.push((a=i).substring(0,1)+a.substring(1).replace(/([A-Z])(?=[a-z]|$)/g,function(e,t){return"_"+t.toLowerCase()}),o));return f.length?n.util.toObject(f):void 0}}function w(e,t){if(e){for(var r,i,o=[],s=0,a=Object.keys(e);s<a.length;++s)if(i=e[r=a[s]],"default"!==r){var f=t.fields[r];(f||(f=t.fields[r=n.util.camelCase(r)]))&&o.push(r,i)}return o.length?t.fromObject(n.util.toObject(o)):void 0}}function E(e,t){var r=e.fullName.split("."),n=t.fullName.split("."),s=0,a=0,f=n.length-1;if(!(e instanceof o)&&t instanceof i)for(;s<r.length&&a<f&&r[s]===n[a];){var c=t.lookup(r[s++],!0);if(null!==c&&c!==t)break;++a}else for(;s<r.length&&a<f&&r[s]===n[a];++s,++a);return n.slice(a).join(".")}d.fromDescriptor=function(e){return"number"==typeof e.length&&(e=t.MethodDescriptorProto.decode(e)),new d(e.name&&e.name.length?e.name:"Method"+g++,"rpc",e.inputType,e.outputType,Boolean(e.clientStreaming),Boolean(e.serverStreaming),_(e.options,t.MethodOptions))},d.prototype.toDescriptor=function(){return t.MethodDescriptorProto.create({name:this.name,inputType:this.resolvedRequestType?this.resolvedRequestType.fullName:this.requestType,outputType:this.resolvedResponseType?this.resolvedResponseType.fullName:this.responseType,clientStreaming:this.requestStream,serverStreaming:this.responseStream,options:w(this.options,t.MethodOptions)})}},function(e,t,r){"use strict";r.d(t,"a",function(){return f});var n=r(8),i=r.n(n),o=r(10),s=r.n(o),a=r(3),f=function(){function e(t){var r=t.name,n=t.call,o=t.method,s=void 0===o?"GET":o,a=t.params,f=void 0===a?[]:a,c=t.inputFormatter,u=void 0===c?[]:c,h=t.outputFormatter,d=void 0===h?null:h;i()(this,e),this.name=r,this.call=n,this.requestMethod=s,this.params=f,this.inputFormatter=u,this.outputFormatter=d,this.requestManager=null,this.run=this.run.bind(this)}return s()(e,[{key:"formatInput",value:function(e){var t=this;return this.inputFormatter&&0!==this.inputFormatter.length?e.map(function(e,r){var n=t.inputFormatter[r];return n?n(e):e}):e}},{key:"setRequestManager",value:function(e){this.requestManager=e}},{key:"formatOutput",value:function(e){return this.outputFormatter&&e?this.outputFormatter(e):e}},{key:"extractArgumentsIntoObject",value:function(e){var t=this;if(e.length<this.params.length)throw new Error("should supply enough parameters for ".concat(this.call));var r={method:this.call,requestMethod:this.requestMethod,isSync:!1,callback:a.noop,params:{}};return this.formatInput(e).forEach(function(e,n){n>t.params.length-1?(Object(a.isFunction)(e)&&(r.callback=e,r.isSync=!1),Object(a.isBoolean)(e.sync)&&(r.isSync=e.sync)):r.params[t.params[n]]=e}),r}},{key:"run",value:function(){for(var e=this,t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];var i=this.extractArgumentsIntoObject(r);return i.isSync?this.formatOutput(this.requestManager.send(i)):this.requestManager.sendAsync(i).then(function(t){return i.callback(null,e.formatOutput(t)),e.formatOutput(t)}).catch(function(e){throw i.callback(e),e})}}]),e}()},function(e,t,r){"use strict";(function(e){r.d(t,"a",function(){return m});var n=r(8),i=r.n(n),o=r(10),s=r.n(o),a=r(14),f=r(3),c=r(49),u=function(e,t){return!(!e.name||e.name!==t)&&(!(!e.fieldsArray||1!==e.fieldsArray.length)&&"bytes"===e.fieldsArray[0].type)};function h(e,t,r){if(!t)return[];if(e(t))return[r];var n=[];return t.resolve(),t.fieldsArray?(t.fieldsArray.forEach(function(t){n.push(h(e,t.resolve().resolvedType,r.concat([t.name])))}),n):n}var d=function(e,t,r,n){return t?n(e):r&&0!==r.length?(r.forEach(function(t){for(var r=e,i=0;i<t.length-1&&(r=r[t[i]]);i++);if(r){var o=t[t.length-1],s=r[o];s&&(r[o]=n(s))}}),e):e},l=function(e){return u(e,"Address")},p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return h(l,e,t)},b=function(e){return u(e,"Hash")},y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return h(b,e,t)},m=function(){function t(e,r,n,o){i()(this,t),this._chain=e,this._method=r;var s=r.resolvedRequestType,a=r.resolvedResponseType;this._inputType=s,this._outputType=a,this._inputTypeAddressFieldPaths=p(this._inputType),this._outputTypeAddressFieldPaths=p(this._outputType),this._inputTypeHashFieldPaths=y(this._inputType),this._outputTypeHashFieldPaths=y(this._outputType),this._isInputTypeAddress=l(this._inputType),this._isInputTypeHash=b(this._inputType),this._isOutputTypeAddress=l(this._outputType),this._isOutputTypeHash=b(this._outputType),this._name=r.name,this._contractAddress=n,this._wallet=o,this.sendTransaction=this.sendTransaction.bind(this),this.unpackOutput=this.unpackOutput.bind(this),this.bindMethodToContract=this.bindMethodToContract.bind(this),this.run=this.run.bind(this),this.request=this.request.bind(this),this.callReadOnly=this.callReadOnly.bind(this),this.getData=this.getData.bind(this)}return s()(t,[{key:"packInput",value:function(e){if(!e)throw new Error("should provide an input");var t,r,n,i=(t=e,r=this._isInputTypeAddress,n=this._inputTypeAddressFieldPaths,d(t,r,n,function(e){return"string"==typeof e?Object(a.getAddressObjectFromRep)(e):e}));i=function(e,t,r){return d(e,t,r,function(e){return"string"==typeof e?Object(a.getHashObjectFromHex)(e):Array.isArray(e)?e.map(function(e){return Object(a.getHashObjectFromHex)(e)}):e})}(i,this._isInputTypeHash,this._inputTypeHashFieldPaths);var o=this._inputType.fromObject(i);return this._inputType.encode(o).finish()}},{key:"unpackOutput",value:function(t){if(!t)throw new Error("there is no output");var r,n,i,o=e.from(t,"hex"),s=this._outputType.decode(o),f=this._outputType.toObject(s,{enums:String,longs:String,bytes:String,defaults:!0,arrays:!0,objects:!0,oneofs:!0});return r=f,n=this._isOutputTypeAddress,i=this._outputTypeAddressFieldPaths,function(e,t,r){return d(e,t,r,function(e){return"string"!=typeof e?Object(a.getRepForHash)(e):e})}(f=d(r,n,i,function(e){return"string"!=typeof e?Object(a.getRepForAddress)(e):e}),this._isOutputTypeHash,this._outputTypeHashFieldPaths)}},{key:"handleTransaction",value:function(t,r,n){var i=Object(a.getTransaction)(this._wallet.address,this._contractAddress,this._name,n);i.refBlockNumber=t;var o=r.match(/^0x/)?r.substring(2):r;i.refBlockPrefix=e.from(o,"hex").slice(0,4);var s=c.a.signTransaction(i,this._wallet.keyPair);return(s=a.Transaction.encode(s).finish())instanceof e?s.toString("hex"):Object(f.uint8ArrayToHex)(s)}},{key:"prepareParametersAsync",value:function(e){var t=this,r=this.packInput(e[0]);return this._chain.getChainStatus().then(function(e){var n=e.BestChainHeight,i=e.BestChainHash;return t.handleTransaction(n,i,r)})}},{key:"prepareParameters",value:function(e){var t=this.packInput(e[0]),r=this._chain.getChainStatus({sync:!0}),n=r.BestChainHeight,i=r.BestChainHash;return this.handleTransaction(n,i,t)}},{key:"sendTransaction",value:function(){for(var e=this,t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];var i=this.extractArgumentsIntoObject(r);if(i.isSync){var o=this.prepareParameters(r);return this._chain.sendTransaction(o,{sync:!0})}return this.prepareParametersAsync(r).then(function(t){return e._chain.sendTransaction(t,i.callback)})}},{key:"callReadOnly",value:function(){for(var e=this,t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];var i=this.extractArgumentsIntoObject(r);if(i.isSync){var o=this.prepareParameters(r);return this.unpackOutput(this._chain.callReadOnly(o,{sync:!0}))}return this.prepareParametersAsync(r).then(function(t){return e._chain.callReadOnly(t,function(t,r){i.callback(t,e.unpackOutput(r))}).then(e.unpackOutput)})}},{key:"extractArgumentsIntoObject",value:function(e){var t={callback:f.noop,isSync:!1};return 0===e.length?t:(Object(f.isFunction)(e[e.length-1])&&(t.callback=e[e.length-1]),e.forEach(function(e){Object(f.isBoolean)(e.sync)&&(t.isSync=e.sync)}),t)}},{key:"getData",value:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return this.prepareParameters(t).Params}},{key:"request",value:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return{method:"broadcast_tx",callback:this.extractArgumentsIntoObject(t).callback,params:this.prepareParameters(t),format:this.unpackOutput}}},{key:"run",value:function(){return this.sendTransaction.apply(this,arguments)}},{key:"bindMethodToContract",value:function(e){var t=this.run;t.request=this.request,t.call=this.callReadOnly,t.inputTypeInfo=this._inputType.toJSON(),t.outputTypeInfo=this._outputType.toJSON(),t.sendTransaction=this.sendTransaction,t.getData=this.getData,e[this._name]=t}}]),t}()}).call(this,r(2).Buffer)},function(e){e.exports={options:{csharp_namespace:"AElf.Kernel"},nested:{TransactionStatus:{values:{UNKNOWN_TRANSACTION_STATUS:0,TRANSACTION_EXECUTING:1,TRANSACTION_EXECUTED:2}},RefBlockStatus:{values:{UNKNOWN_REF_BLOCK_STATUS:0,REF_BLOCK_VALID:1,REF_BLOCK_INVALID:-1,REF_BLOCK_EXPIRED:-2,FUTURE_REF_BLOCK:-3}},TransactionReceipt:{fields:{transactionId:{type:"Hash",id:1},transaction:{type:"Transaction",id:2},refBlockStatus:{type:"RefBlockStatus",id:3},transactionStatus:{type:"TransactionStatus",id:4},isSystemTxn:{type:"bool",id:5},executedBlockNumber:{type:"int64",id:6}}},StateValue:{fields:{currentValue:{type:"bytes",id:1},originalValue:{type:"bytes",id:2}}},StateChange:{fields:{statePath:{type:"StatePath",id:1},stateValue:{type:"StateValue",id:2}}},ExecutionStatus:{values:{UNDEFINED:0,EXECUTED:1,CANCELED:-1,SYSTEM_ERROR:-2,CONTRACT_ERROR:-10,EXCEEDED_MAX_CALL_DEPTH:-11,INSUFFICIENT_TRANSACTION_FEES:-12,PREFAILED:-99}},TransactionTrace:{fields:{transactionId:{type:"Hash",id:1},returnValue:{type:"bytes",id:2},error:{type:"string",id:3},preTransactions:{rule:"repeated",type:"Transaction",id:4},preTraces:{rule:"repeated",type:"TransactionTrace",id:5},inlineTransactions:{rule:"repeated",type:"Transaction",id:6},inlineTraces:{rule:"repeated",type:"TransactionTrace",id:7},logs:{rule:"repeated",type:"LogEvent",id:8},elapsed:{type:"int64",id:9},executionStatus:{type:"ExecutionStatus",id:10},stateSet:{type:"TransactionExecutingStateSet",id:11},readableReturnValue:{type:"string",id:12}}},ExecutionReturnSet:{fields:{transactionId:{type:"Hash",id:1},status:{type:"TransactionResultStatus",id:2},stateChanges:{keyType:"string",type:"bytes",id:3},StateAccesses:{keyType:"string",type:"bool",id:4},bloom:{type:"bytes",id:5},returnValue:{type:"bytes",id:6}}},BlockHeaderList:{fields:{headers:{rule:"repeated",type:"BlockHeader",id:1}}},BlockHeader:{fields:{version:{type:"int32",id:1},chainId:{type:"int32",id:2},previousBlockHash:{type:"Hash",id:3},merkleTreeRootOfTransactions:{type:"Hash",id:4},merkleTreeRootOfWorldState:{type:"Hash",id:5},bloom:{type:"bytes",id:6},height:{type:"int64",id:7},extraData:{rule:"repeated",type:"bytes",id:8},time:{type:"google.protobuf.Timestamp",id:9},merkleTreeRootOfTransactionStatus:{type:"Hash",id:10},signerPubkey:{type:"bytes",id:9999},signature:{type:"bytes",id:1e4}}},BlockBody:{fields:{blockHeader:{type:"Hash",id:1},transactions:{rule:"repeated",type:"Hash",id:2}}},Block:{fields:{header:{type:"BlockHeader",id:1},body:{type:"BlockBody",id:2}}},BinaryMerkleTree:{fields:{nodes:{rule:"repeated",type:"Hash",id:1},root:{type:"Hash",id:2},leafCount:{type:"int32",id:3}}},VersionedState:{fields:{key:{type:"string",id:1},value:{type:"bytes",id:2},blockHeight:{type:"int64",id:3},blockHash:{type:"Hash",id:4},originBlockHash:{type:"Hash",id:5}}},BlockStateSet:{fields:{blockHash:{type:"Hash",id:1},previousHash:{type:"Hash",id:2},blockHeight:{type:"int64",id:3},changes:{keyType:"string",type:"bytes",id:4}}},ChainStateMergingStatus:{values:{COMMON:0,MERGING:1,MERGED:2}},ChainStateInfo:{fields:{chainId:{type:"int32",id:1},blockHash:{type:"Hash",id:2},blockHeight:{type:"int64",id:3},mergingBlockHash:{type:"Hash",id:4},status:{type:"ChainStateMergingStatus",id:5}}},ChainBlockLinkExecutionStatus:{values:{EXECUTION_NONE:0,EXECUTION_SUCCESS:1,EXECUTION_FAILED:2}},ChainBlockLink:{fields:{blockHash:{type:"Hash",id:1},height:{type:"int64",id:2},previousBlockHash:{type:"Hash",id:3},executionStatus:{type:"ChainBlockLinkExecutionStatus",id:4},isIrreversibleBlock:{type:"bool",id:5},isLinked:{type:"bool",id:6},isLightBlock:{type:"bool",id:7}}},Chain:{fields:{id:{type:"int32",id:1},genesisBlockHash:{type:"Hash",id:2},longestChainHash:{type:"Hash",id:3},longestChainHeight:{type:"int64",id:4},branches:{keyType:"string",type:"int64",id:5},notLinkedBlocks:{keyType:"string",type:"string",id:6},lastIrreversibleBlockHash:{type:"Hash",id:7},lastIrreversibleBlockHeight:{type:"int64",id:8},bestChainHash:{type:"Hash",id:9},bestChainHeight:{type:"int64",id:10}}},ChainBlockIndex:{fields:{blockHash:{type:"Hash",id:1}}},TransactionBlockIndex:{fields:{blockHash:{type:"Hash",id:1}}},google:{nested:{protobuf:{nested:{Timestamp:{fields:{seconds:{type:"int64",id:1},nanos:{type:"int32",id:2}}}}}}},Transaction:{fields:{from:{type:"Address",id:1},to:{type:"Address",id:2},refBlockNumber:{type:"int64",id:3},refBlockPrefix:{type:"bytes",id:4},methodName:{type:"string",id:5},params:{type:"bytes",id:6},signature:{type:"bytes",id:1e4}}},StatePath:{fields:{parts:{rule:"repeated",type:"string",id:1}}},ScopedStatePath:{fields:{address:{type:"Address",id:1},path:{type:"StatePath",id:2}}},TransactionResultStatus:{values:{NOT_EXISTED:0,PENDING:1,FAILED:2,MINED:3,UNEXECUTABLE:4}},TransactionResult:{fields:{transactionId:{type:"Hash",id:1},status:{type:"TransactionResultStatus",id:2},logs:{rule:"repeated",type:"LogEvent",id:3},bloom:{type:"bytes",id:4},returnValue:{type:"bytes",id:5},blockNumber:{type:"int64",id:6},blockHash:{type:"Hash",id:7},index:{type:"int32",id:8},stateHash:{type:"Hash",id:9},Error:{type:"string",id:10},ReadableReturnValue:{type:"string",id:11}}},LogEvent:{fields:{address:{type:"Address",id:1},name:{type:"string",id:2},indexed:{rule:"repeated",type:"bytes",id:3},nonIndexed:{type:"bytes",id:4}}},SmartContractRegistration:{fields:{category:{type:"int32",id:1},code:{type:"bytes",id:2},codeHash:{type:"Hash",id:3}}},TransactionExecutingStateSet:{fields:{writes:{keyType:"string",type:"bytes",id:1},reads:{keyType:"string",type:"bool",id:2}}},Address:{fields:{value:{type:"bytes",id:1}}},Hash:{fields:{value:{type:"bytes",id:1}}},SInt32Value:{fields:{value:{type:"sint32",id:1}}},SInt64Value:{fields:{value:{type:"sint64",id:1}}}}}},function(e){e.exports={options:{csharp_namespace:"AElf"},nested:{Authorization:{fields:{MultiSigAccount:{type:"Address",id:1},ExecutionThreshold:{type:"uint32",id:2},ProposerThreshold:{type:"uint32",id:3},Reviewers:{rule:"repeated",type:"Reviewer",id:4}}},Reviewer:{fields:{PubKey:{type:"bytes",id:1},Weight:{type:"uint32",id:2}}},Proposal:{fields:{MultiSigAccount:{type:"Address",id:1},Name:{type:"string",id:2},TxnData:{type:"bytes",id:3},ExpiredTime:{type:"google.protobuf.Timestamp",id:4},Status:{type:"ProposalStatus",id:5},Proposer:{type:"Address",id:6}}},ProposalStatus:{values:{ToBeDecided:0,Decided:1,Released:2,Expired:3}},Approved:{fields:{ProposalHash:{type:"Hash",id:1},Approvals:{rule:"repeated",type:"Approval",id:5}}},Approval:{fields:{ProposalHash:{type:"Hash",id:1},Signature:{type:"bytes",id:2}}},Address:{fields:{Value:{type:"bytes",id:1}}},Hash:{fields:{Value:{type:"bytes",id:1}}},SInt32Value:{fields:{Value:{type:"sint32",id:1}}},SInt64Value:{fields:{Value:{type:"sint64",id:1}}},google:{nested:{protobuf:{nested:{Timestamp:{fields:{seconds:{type:"int64",id:1},nanos:{type:"int32",id:2}}}}}}}}}},function(e){e.exports={options:{csharp_namespace:"AElf"},nested:{SideChainBlockData:{fields:{SideChainHeight:{type:"int64",id:1},BlockHeaderHash:{type:"Hash",id:2},TransactionMerkleTreeRoot:{type:"Hash",id:3},SideChainId:{type:"int32",id:4}}},IndexedSideChainBlockDataResult:{fields:{Height:{type:"int64",id:1},Miner:{type:"Address",id:2},SideChainBlockData:{rule:"repeated",type:"SideChainBlockData",id:3}}},ParentChainBlockData:{fields:{Root:{type:"ParentChainBlockRootInfo",id:1},IndexedMerklePath:{keyType:"int64",type:"MerklePath",id:2},ExtraData:{keyType:"string",type:"bytes",id:3}}},ParentChainBlockRootInfo:{fields:{ParentChainHeight:{type:"int64",id:1},CrossChainExtraData:{type:"CrossChainExtraData",id:2},ParentChainId:{type:"int32",id:3},TransactionStatusMerkleRoot:{type:"Hash",id:4}}},CrossChainExtraData:{fields:{SideChainBlockHeadersRoot:{type:"Hash",id:2},SideChainTransactionsRoot:{type:"Hash",id:3}}},SideChainStatus:{values:{Apply:0,Review:1,Active:2,InsufficientBalance:3,Terminated:4}},SideChainIdAndHeightDict:{fields:{IdHeightDict:{keyType:"int32",type:"int64",id:1}}},CrossChainBlockData:{fields:{SideChainBlockData:{rule:"repeated",type:"SideChainBlockData",id:1},ParentChainBlockData:{rule:"repeated",type:"ParentChainBlockData",id:2},PreviousBlockHeight:{type:"int64",id:3}}},CrossChainMerkleProofContext:{fields:{BoundParentChainHeight:{type:"int64",id:1},MerklePathForParentChainRoot:{type:"MerklePath",id:2}}},ChainInitializationContext:{fields:{chainId:{type:"int32",id:1},Creator:{type:"Address",id:2},CreatedTime:{type:"google.protobuf.Timestamp",id:3},ExtraInformation:{rule:"repeated",type:"bytes",id:4},ParentChainHeightOfCreation:{type:"int64",id:5}}},Transaction:{fields:{From:{type:"Address",id:1},To:{type:"Address",id:2},RefBlockNumber:{type:"int64",id:3},RefBlockPrefix:{type:"bytes",id:4},MethodName:{type:"string",id:5},Params:{type:"bytes",id:6},Signature:{type:"bytes",id:1e4}}},StatePath:{fields:{parts:{rule:"repeated",type:"string",id:1}}},ScopedStatePath:{fields:{address:{type:"Address",id:1},path:{type:"StatePath",id:2}}},TransactionList:{fields:{Transactions:{rule:"repeated",type:"Transaction",id:1}}},TransactionResultStatus:{values:{NotExisted:0,Pending:1,Failed:2,Mined:3,Unexecutable:4}},TransactionResult:{fields:{TransactionId:{type:"Hash",id:1},Status:{type:"TransactionResultStatus",id:2},Logs:{rule:"repeated",type:"LogEvent",id:3},Bloom:{type:"bytes",id:4},ReturnValue:{type:"bytes",id:5},BlockNumber:{type:"int64",id:6},BlockHash:{type:"Hash",id:7},Index:{type:"int32",id:8},StateHash:{type:"Hash",id:9},DeferredTransactions:{rule:"repeated",type:"Transaction",id:10},DeferredTxnId:{type:"Hash",id:11},Error:{type:"string",id:12},ReadableReturnValue:{type:"string",id:13}}},LogEvent:{fields:{Address:{type:"Address",id:1},Name:{type:"string",id:2},Indexed:{rule:"repeated",type:"bytes",id:3},NonIndexed:{type:"bytes",id:4}}},SmartContractRegistration:{fields:{Category:{type:"int32",id:1},Code:{type:"bytes",id:2},CodeHash:{type:"Hash",id:3}}},MerklePath:{fields:{Path:{rule:"repeated",type:"Hash",id:1}}},StringList:{fields:{Values:{rule:"repeated",type:"string",id:1},Remark:{type:"string",id:2}}},HashList:{fields:{Values:{rule:"repeated",type:"Hash",id:1}}},LongList:{fields:{Values:{rule:"repeated",type:"int64",id:1},Remark:{type:"string",id:2}}},TransactionExecutingStateSet:{fields:{Version:{type:"int64",id:1},Writes:{keyType:"string",type:"bytes",id:2},Reads:{keyType:"string",type:"bool",id:3}}},ActionResult:{fields:{Success:{type:"bool",id:1},ErrorMessage:{type:"string",id:2}}},ContractInfo:{fields:{SerialNumber:{type:"uint64",id:1},Owner:{type:"Address",id:2},Category:{type:"int32",id:3},CodeHash:{type:"Hash",id:4}}},ContractDeploymentInput:{fields:{category:{type:"sint32",id:1},code:{type:"bytes",id:2}}},SystemContractDeploymentInput:{fields:{category:{type:"sint32",id:1},code:{type:"bytes",id:2},name:{type:"Hash",id:3},transactionMethodCallList:{type:"SystemTransactionMethodCallList",id:4}},nested:{SystemTransactionMethodCall:{fields:{MethodName:{type:"string",id:1},Params:{type:"bytes",id:2}}},SystemTransactionMethodCallList:{fields:{Value:{rule:"repeated",type:"SystemTransactionMethodCall",id:1}}}}},ContractUpdateInput:{fields:{address:{type:"Address",id:1},code:{type:"bytes",id:2}}},ChangeContractOwnerInput:{fields:{contractAddress:{type:"Address",id:1},newOwner:{type:"Address",id:2}}},ConsensusCommand:{fields:{NextBlockMiningLeftMilliseconds:{type:"int32",id:1},LimitMillisecondsOfMiningBlock:{type:"int32",id:2},Hint:{type:"bytes",id:3},ExpectedMiningTime:{type:"google.protobuf.Timestamp",id:4}}},ValidationResult:{fields:{Success:{type:"bool",id:1},Message:{type:"string",id:2}}},ConsensusInformation:{fields:{Bytes:{type:"bytes",id:1}}},google:{nested:{protobuf:{nested:{Timestamp:{fields:{seconds:{type:"int64",id:1},nanos:{type:"int32",id:2}}}}}}},Address:{fields:{Value:{type:"bytes",id:1}}},Hash:{fields:{Value:{type:"bytes",id:1}}},SInt32Value:{fields:{Value:{type:"sint32",id:1}}},SInt64Value:{fields:{Value:{type:"sint64",id:1}}}}}},function(e,t,r){"use strict";r.r(t),function(e){r.d(t,"getKeystore",function(){return v}),r.d(t,"unlockKeystore",function(){return _}),r.d(t,"checkPassword",function(){return w});var n=r(9),i=r.n(n),o=r(51),s=r.n(o),a=r(24),f=r.n(a),c=r(52),u=r.n(c),h=r(77),d=r.n(h),l=r(39),p=r.n(l),b=r(53),y=r.n(b),m=r(3),g=r(5);var v=function(t,r,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:m.noop,a=null,c=null;return 1==+(n||1)?a=function(t,r){var n=t.mnemonic,i=t.privateKey,o=t.nickName,a=void 0===o?"":o,c=t.address,h=void 0===c?"":c,l=d.a.random(16),p=d.a.random(32).toString(g.b),b=e.from(r),y=e.from(p),m=s()(b,y,262144,1,8,64),v=f.a.encrypt(n,m.toString("hex"),{iv:l}),_=f.a.encrypt(i,m.toString("hex"),{iv:l}),w=u()(m.slice(16,32)+v+_,{outputLength:256});return{error:null,result:{type:"aelf",nickName:a,address:h,crypto:{version:1,cipher:"AES256",cipherparams:{iv:l.toString(g.b)},mnemonicEncrypted:v.toString(g.b),privateKeyEncrypted:_.toString(g.b),kdf:"scrypt",kdfparams:{r:1,N:262144,p:8,dkLen:64,salt:p},mac:w.toString(g.b)}}}}(t,r):c=i()({},g.c.WRONG_VERSION),new Promise(function(e,t){o(c||a.error,a.result),c||a.error?t(c||a.error):e(a.result)})},_=function(t,r,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:m.noop,a=null,c=null;return 1===(n||1)?a=function(t,r){var n=t.crypto,o=t.type,a=t.nickName,c=void 0===a?"":a,h=t.address,d=void 0===h?"":h,l=null,b=null,m=n.kdfparams,v=n.mac,_=n.cipherparams,w=n.version,E=n.mnemonicEncrypted,S=n.privateKeyEncrypted;1!==w&&(l=i()({},g.c.WRONG_KEY_STORE_VERSION)),"aelf"!==o&&(l=i()({},g.c.NOT_AELF_KEY_STORE));var A=_.iv.toString(y.a),k=e.from(r),x=e.from(m.salt.toString()),I=s()(k,x,m.N,m.p,m.r,m.dkLen);if(u()(I.slice(16,32)+E+S,{outputLength:256}).toString(y.a)===v){var T=f.a.decrypt(E,I.toString("hex"),{iv:A}),M=f.a.decrypt(S,I.toString("hex"),{iv:A});b={nickName:c,address:d,mnemonic:T.toString(p.a),privateKey:M.toString(p.a)}}else l=i()({},g.c.WRONG_VERSION);return{error:l,result:b}}(t,r):c=i()({},g.c.WRONG_VERSION),new Promise(function(e,t){o(c||a.error,a.result),c||a.error?t(c||a.error):e(a.result)})},w=function(t,r){var n=t.crypto,o=t.type,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:m.noop,f=null,c=!1;if("aelf"!==o)f=i()({},g.c.NOT_AELF_KEY_STORE);else{var h=n.mac,d=n.mnemonicEncrypted,l=n.privateKeyEncrypted,p=n.kdfparams,b=e.from(r),v=e.from(p.salt.toString(g.b)),_=s()(b,v,p.N,p.p,p.r,p.dkLen);u()("".concat(_.slice(16,32)).concat(d).concat(l),{outputLength:256}).toString(y.a)!==h?f=i()({},g.c.INVALID_PASSWORD):c=!0}return new Promise(function(e,t){a(f,c),f?t(f):e(!0)})}}.call(this,r(2).Buffer)},function(e,t){e.exports=__WEBPACK_EXTERNAL_MODULE__137__},function(e,t,r){"use strict";var n=r(263),i=r(108),o=r(264);function s(e,t){return t.encode?t.strict?n(e):encodeURIComponent(e):e}function a(e){var t=e.indexOf("?");return-1===t?"":e.slice(t+1)}function f(e,t){var r=function(e){var t;switch(e.arrayFormat){case"index":return function(e,r,n){t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===n[e]&&(n[e]={}),n[e][t[1]]=r):n[e]=r};case"bracket":return function(e,r,n){t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==n[e]?n[e]=[].concat(n[e],r):n[e]=[r]:n[e]=r};default:return function(e,t,r){void 0!==r[e]?r[e]=[].concat(r[e],t):r[e]=t}}}(t=i({arrayFormat:"none"},t)),n=Object.create(null);return"string"!=typeof e?n:(e=e.trim().replace(/^[?#&]/,""))?(e.split("&").forEach(function(e){var t=e.replace(/\+/g," ").split("="),i=t.shift(),s=t.length>0?t.join("="):void 0;s=void 0===s?null:o(s),r(o(i),s,n)}),Object.keys(n).sort().reduce(function(e,t){var r=n[t];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?e[t]=function e(t){return Array.isArray(t)?t.sort():"object"==typeof t?e(Object.keys(t)).sort(function(e,t){return Number(e)-Number(t)}).map(function(e){return t[e]}):t}(r):e[t]=r,e},Object.create(null))):n}t.extract=a,t.parse=f,t.stringify=function(e,t){!1===(t=i({encode:!0,strict:!0,arrayFormat:"none"},t)).sort&&(t.sort=function(){});var r=function(e){switch(e.arrayFormat){case"index":return function(t,r,n){return null===r?[s(t,e),"[",n,"]"].join(""):[s(t,e),"[",s(n,e),"]=",s(r,e)].join("")};case"bracket":return function(t,r){return null===r?s(t,e):[s(t,e),"[]=",s(r,e)].join("")};default:return function(t,r){return null===r?s(t,e):[s(t,e),"=",s(r,e)].join("")}}}(t);return e?Object.keys(e).sort(t.sort).map(function(n){var i=e[n];if(void 0===i)return"";if(null===i)return s(n,t);if(Array.isArray(i)){var o=[];return i.slice().forEach(function(e){void 0!==e&&o.push(r(n,e,o.length))}),o.join("&")}return s(n,t)+"="+s(i,t)}).filter(function(e){return e.length>0}).join("&"):""},t.parseUrl=function(e,t){return{url:e.split("?")[0]||"",query:f(a(e),t)}}},function(e,t,r){"use strict";var n=t;function i(){n.Reader._configure(n.BufferReader),n.util._configure()}n.build="minimal",n.Writer=r(54),n.BufferWriter=r(148),n.Reader=r(55),n.BufferReader=r(149),n.util=r(20),n.rpc=r(83),n.roots=r(84),n.configure=i,n.Writer._configure(n.BufferWriter),i()},function(e,t,r){"use strict";var n=t;n.length=function(e){var t=e.length;if(!t)return 0;for(var r=0;--t%4>1&&"="===e.charAt(t);)++r;return Math.ceil(3*e.length)/4-r};for(var i=new Array(64),o=new Array(123),s=0;s<64;)o[i[s]=s<26?s+65:s<52?s+71:s<62?s-4:s-59|43]=s++;n.encode=function(e,t,r){for(var n,o=null,s=[],a=0,f=0;t<r;){var c=e[t++];switch(f){case 0:s[a++]=i[c>>2],n=(3&c)<<4,f=1;break;case 1:s[a++]=i[n|c>>4],n=(15&c)<<2,f=2;break;case 2:s[a++]=i[n|c>>6],s[a++]=i[63&c],f=0}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,s)),a=0)}return f&&(s[a++]=i[n],s[a++]=61,1===f&&(s[a++]=61)),o?(a&&o.push(String.fromCharCode.apply(String,s.slice(0,a))),o.join("")):String.fromCharCode.apply(String,s.slice(0,a))};n.decode=function(e,t,r){for(var n,i=r,s=0,a=0;a<e.length;){var f=e.charCodeAt(a++);if(61===f&&s>1)break;if(void 0===(f=o[f]))throw Error("invalid encoding");switch(s){case 0:n=f,s=1;break;case 1:t[r++]=n<<2|(48&f)>>4,n=f,s=2;break;case 2:t[r++]=(15&n)<<4|(60&f)>>2,n=f,s=3;break;case 3:t[r++]=(3&n)<<6|f,s=0}}if(1===s)throw Error("invalid encoding");return r-i},n.test=function(e){return/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(e)}},function(e,t,r){"use strict";function n(){this._listeners={}}e.exports=n,n.prototype.on=function(e,t,r){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:t,ctx:r||this}),this},n.prototype.off=function(e,t){if(void 0===e)this._listeners={};else if(void 0===t)this._listeners[e]=[];else for(var r=this._listeners[e],n=0;n<r.length;)r[n].fn===t?r.splice(n,1):++n;return this},n.prototype.emit=function(e){var t=this._listeners[e];if(t){for(var r=[],n=1;n<arguments.length;)r.push(arguments[n++]);for(n=0;n<t.length;)t[n].fn.apply(t[n++].ctx,r)}return this}},function(e,t,r){"use strict";function n(e){return"undefined"!=typeof Float32Array?function(){var t=new Float32Array([-0]),r=new Uint8Array(t.buffer),n=128===r[3];function i(e,n,i){t[0]=e,n[i]=r[0],n[i+1]=r[1],n[i+2]=r[2],n[i+3]=r[3]}function o(e,n,i){t[0]=e,n[i]=r[3],n[i+1]=r[2],n[i+2]=r[1],n[i+3]=r[0]}function s(e,n){return r[0]=e[n],r[1]=e[n+1],r[2]=e[n+2],r[3]=e[n+3],t[0]}function a(e,n){return r[3]=e[n],r[2]=e[n+1],r[1]=e[n+2],r[0]=e[n+3],t[0]}e.writeFloatLE=n?i:o,e.writeFloatBE=n?o:i,e.readFloatLE=n?s:a,e.readFloatBE=n?a:s}():function(){function t(e,t,r,n){var i=t<0?1:0;if(i&&(t=-t),0===t)e(1/t>0?0:2147483648,r,n);else if(isNaN(t))e(2143289344,r,n);else if(t>3.4028234663852886e38)e((i<<31|2139095040)>>>0,r,n);else if(t<1.1754943508222875e-38)e((i<<31|Math.round(t/1.401298464324817e-45))>>>0,r,n);else{var o=Math.floor(Math.log(t)/Math.LN2);e((i<<31|o+127<<23|8388607&Math.round(t*Math.pow(2,-o)*8388608))>>>0,r,n)}}function r(e,t,r){var n=e(t,r),i=2*(n>>31)+1,o=n>>>23&255,s=8388607&n;return 255===o?s?NaN:i*(1/0):0===o?1.401298464324817e-45*i*s:i*Math.pow(2,o-150)*(s+8388608)}e.writeFloatLE=t.bind(null,i),e.writeFloatBE=t.bind(null,o),e.readFloatLE=r.bind(null,s),e.readFloatBE=r.bind(null,a)}(),"undefined"!=typeof Float64Array?function(){var t=new Float64Array([-0]),r=new Uint8Array(t.buffer),n=128===r[7];function i(e,n,i){t[0]=e,n[i]=r[0],n[i+1]=r[1],n[i+2]=r[2],n[i+3]=r[3],n[i+4]=r[4],n[i+5]=r[5],n[i+6]=r[6],n[i+7]=r[7]}function o(e,n,i){t[0]=e,n[i]=r[7],n[i+1]=r[6],n[i+2]=r[5],n[i+3]=r[4],n[i+4]=r[3],n[i+5]=r[2],n[i+6]=r[1],n[i+7]=r[0]}function s(e,n){return r[0]=e[n],r[1]=e[n+1],r[2]=e[n+2],r[3]=e[n+3],r[4]=e[n+4],r[5]=e[n+5],r[6]=e[n+6],r[7]=e[n+7],t[0]}function a(e,n){return r[7]=e[n],r[6]=e[n+1],r[5]=e[n+2],r[4]=e[n+3],r[3]=e[n+4],r[2]=e[n+5],r[1]=e[n+6],r[0]=e[n+7],t[0]}e.writeDoubleLE=n?i:o,e.writeDoubleBE=n?o:i,e.readDoubleLE=n?s:a,e.readDoubleBE=n?a:s}():function(){function t(e,t,r,n,i,o){var s=n<0?1:0;if(s&&(n=-n),0===n)e(0,i,o+t),e(1/n>0?0:2147483648,i,o+r);else if(isNaN(n))e(0,i,o+t),e(2146959360,i,o+r);else if(n>1.7976931348623157e308)e(0,i,o+t),e((s<<31|2146435072)>>>0,i,o+r);else{var a;if(n<2.2250738585072014e-308)e((a=n/5e-324)>>>0,i,o+t),e((s<<31|a/4294967296)>>>0,i,o+r);else{var f=Math.floor(Math.log(n)/Math.LN2);1024===f&&(f=1023),e(4503599627370496*(a=n*Math.pow(2,-f))>>>0,i,o+t),e((s<<31|f+1023<<20|1048576*a&1048575)>>>0,i,o+r)}}}function r(e,t,r,n,i){var o=e(n,i+t),s=e(n,i+r),a=2*(s>>31)+1,f=s>>>20&2047,c=4294967296*(1048575&s)+o;return 2047===f?c?NaN:a*(1/0):0===f?5e-324*a*c:a*Math.pow(2,f-1075)*(c+4503599627370496)}e.writeDoubleLE=t.bind(null,i,0,4),e.writeDoubleBE=t.bind(null,o,4,0),e.readDoubleLE=r.bind(null,s,0,4),e.readDoubleBE=r.bind(null,a,4,0)}(),e}function i(e,t,r){t[r]=255&e,t[r+1]=e>>>8&255,t[r+2]=e>>>16&255,t[r+3]=e>>>24}function o(e,t,r){t[r]=e>>>24,t[r+1]=e>>>16&255,t[r+2]=e>>>8&255,t[r+3]=255&e}function s(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0}function a(e,t){return(e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3])>>>0}e.exports=n(n)},function(e,t,r){"use strict";var n=t;n.length=function(e){for(var t=0,r=0,n=0;n<e.length;++n)(r=e.charCodeAt(n))<128?t+=1:r<2048?t+=2:55296==(64512&r)&&56320==(64512&e.charCodeAt(n+1))?(++n,t+=4):t+=3;return t},n.read=function(e,t,r){if(r-t<1)return"";for(var n,i=null,o=[],s=0;t<r;)(n=e[t++])<128?o[s++]=n:n>191&&n<224?o[s++]=(31&n)<<6|63&e[t++]:n>239&&n<365?(n=((7&n)<<18|(63&e[t++])<<12|(63&e[t++])<<6|63&e[t++])-65536,o[s++]=55296+(n>>10),o[s++]=56320+(1023&n)):o[s++]=(15&n)<<12|(63&e[t++])<<6|63&e[t++],s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,o)),s=0);return i?(s&&i.push(String.fromCharCode.apply(String,o.slice(0,s))),i.join("")):String.fromCharCode.apply(String,o.slice(0,s))},n.write=function(e,t,r){for(var n,i,o=r,s=0;s<e.length;++s)(n=e.charCodeAt(s))<128?t[r++]=n:n<2048?(t[r++]=n>>6|192,t[r++]=63&n|128):55296==(64512&n)&&56320==(64512&(i=e.charCodeAt(s+1)))?(n=65536+((1023&n)<<10)+(1023&i),++s,t[r++]=n>>18|240,t[r++]=n>>12&63|128,t[r++]=n>>6&63|128,t[r++]=63&n|128):(t[r++]=n>>12|224,t[r++]=n>>6&63|128,t[r++]=63&n|128);return r-o}},function(e,t,r){"use strict";e.exports=function(e,t,r){var n=r||8192,i=n>>>1,o=null,s=n;return function(r){if(r<1||r>i)return e(r);s+r>n&&(o=e(n),s=0);var a=t.call(o,s,s+=r);return 7&s&&(s=1+(7|s)),a}}},function(e,t,r){"use strict";e.exports=i;var n=r(20);function i(e,t){this.lo=e>>>0,this.hi=t>>>0}var o=i.zero=new i(0,0);o.toNumber=function(){return 0},o.zzEncode=o.zzDecode=function(){return this},o.length=function(){return 1};var s=i.zeroHash="\0\0\0\0\0\0\0\0";i.fromNumber=function(e){if(0===e)return o;var t=e<0;t&&(e=-e);var r=e>>>0,n=(e-r)/4294967296>>>0;return t&&(n=~n>>>0,r=~r>>>0,++r>4294967295&&(r=0,++n>4294967295&&(n=0))),new i(r,n)},i.from=function(e){if("number"==typeof e)return i.fromNumber(e);if(n.isString(e)){if(!n.Long)return i.fromNumber(parseInt(e,10));e=n.Long.fromString(e)}return e.low||e.high?new i(e.low>>>0,e.high>>>0):o},i.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var t=1+~this.lo>>>0,r=~this.hi>>>0;return t||(r=r+1>>>0),-(t+4294967296*r)}return this.lo+4294967296*this.hi},i.prototype.toLong=function(e){return n.Long?new n.Long(0|this.lo,0|this.hi,Boolean(e)):{low:0|this.lo,high:0|this.hi,unsigned:Boolean(e)}};var a=String.prototype.charCodeAt;i.fromHash=function(e){return e===s?o:new i((a.call(e,0)|a.call(e,1)<<8|a.call(e,2)<<16|a.call(e,3)<<24)>>>0,(a.call(e,4)|a.call(e,5)<<8|a.call(e,6)<<16|a.call(e,7)<<24)>>>0)},i.prototype.toHash=function(){return String.fromCharCode(255&this.lo,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,255&this.hi,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)},i.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this},i.prototype.zzDecode=function(){var e=-(1&this.lo);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this},i.prototype.length=function(){var e=this.lo,t=(this.lo>>>28|this.hi<<4)>>>0,r=this.hi>>>24;return 0===r?0===t?e<16384?e<128?1:2:e<2097152?3:4:t<16384?t<128?5:6:t<2097152?7:8:r<128?9:10}},function(e,t,r){"use strict";t.byteLength=function(e){var t=c(e),r=t[0],n=t[1];return 3*(r+n)/4-n},t.toByteArray=function(e){for(var t,r=c(e),n=r[0],s=r[1],a=new o(function(e,t,r){return 3*(t+r)/4-r}(0,n,s)),f=0,u=s>0?n-4:n,h=0;h<u;h+=4)t=i[e.charCodeAt(h)]<<18|i[e.charCodeAt(h+1)]<<12|i[e.charCodeAt(h+2)]<<6|i[e.charCodeAt(h+3)],a[f++]=t>>16&255,a[f++]=t>>8&255,a[f++]=255&t;2===s&&(t=i[e.charCodeAt(h)]<<2|i[e.charCodeAt(h+1)]>>4,a[f++]=255&t);1===s&&(t=i[e.charCodeAt(h)]<<10|i[e.charCodeAt(h+1)]<<4|i[e.charCodeAt(h+2)]>>2,a[f++]=t>>8&255,a[f++]=255&t);return a},t.fromByteArray=function(e){for(var t,r=e.length,i=r%3,o=[],s=0,a=r-i;s<a;s+=16383)o.push(u(e,s,s+16383>a?a:s+16383));1===i?(t=e[r-1],o.push(n[t>>2]+n[t<<4&63]+"==")):2===i&&(t=(e[r-2]<<8)+e[r-1],o.push(n[t>>10]+n[t>>4&63]+n[t<<2&63]+"="));return o.join("")};for(var n=[],i=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,f=s.length;a<f;++a)n[a]=s[a],i[s.charCodeAt(a)]=a;function c(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");return-1===r&&(r=t),[r,r===t?0:4-r%4]}function u(e,t,r){for(var i,o,s=[],a=t;a<r;a+=3)i=(e[a]<<16&16711680)+(e[a+1]<<8&65280)+(255&e[a+2]),s.push(n[(o=i)>>18&63]+n[o>>12&63]+n[o>>6&63]+n[63&o]);return s.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63},function(e,t){t.read=function(e,t,r,n,i){var o,s,a=8*i-n-1,f=(1<<a)-1,c=f>>1,u=-7,h=r?i-1:0,d=r?-1:1,l=e[t+h];for(h+=d,o=l&(1<<-u)-1,l>>=-u,u+=a;u>0;o=256*o+e[t+h],h+=d,u-=8);for(s=o&(1<<-u)-1,o>>=-u,u+=n;u>0;s=256*s+e[t+h],h+=d,u-=8);if(0===o)o=1-c;else{if(o===f)return s?NaN:1/0*(l?-1:1);s+=Math.pow(2,n),o-=c}return(l?-1:1)*s*Math.pow(2,o-n)},t.write=function(e,t,r,n,i,o){var s,a,f,c=8*o-i-1,u=(1<<c)-1,h=u>>1,d=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,l=n?0:o-1,p=n?1:-1,b=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,s=u):(s=Math.floor(Math.log(t)/Math.LN2),t*(f=Math.pow(2,-s))<1&&(s--,f*=2),(t+=s+h>=1?d/f:d*Math.pow(2,1-h))*f>=2&&(s++,f/=2),s+h>=u?(a=0,s=u):s+h>=1?(a=(t*f-1)*Math.pow(2,i),s+=h):(a=t*Math.pow(2,h-1)*Math.pow(2,i),s=0));i>=8;e[r+l]=255&a,l+=p,a/=256,i-=8);for(s=s<<i|a,c+=i;c>0;e[r+l]=255&s,l+=p,s/=256,c-=8);e[r+l-p]|=128*b}},function(e,t,r){"use strict";e.exports=s;var n=r(54);(s.prototype=Object.create(n.prototype)).constructor=s;var i=r(20),o=i.Buffer;function s(){n.call(this)}s.alloc=function(e){return(s.alloc=i._Buffer_allocUnsafe)(e)};var a=o&&o.prototype instanceof Uint8Array&&"set"===o.prototype.set.name?function(e,t,r){t.set(e,r)}:function(e,t,r){if(e.copy)e.copy(t,r,0,e.length);else for(var n=0;n<e.length;)t[r++]=e[n++]};function f(e,t,r){e.length<40?i.utf8.write(e,t,r):t.utf8Write(e,r)}s.prototype.bytes=function(e){i.isString(e)&&(e=i._Buffer_from(e,"base64"));var t=e.length>>>0;return this.uint32(t),t&&this._push(a,t,e),this},s.prototype.string=function(e){var t=o.byteLength(e);return this.uint32(t),t&&this._push(f,t,e),this}},function(e,t,r){"use strict";e.exports=o;var n=r(55);(o.prototype=Object.create(n.prototype)).constructor=o;var i=r(20);function o(e){n.call(this,e)}i.Buffer&&(o.prototype._slice=i.Buffer.prototype.slice),o.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len))}},function(e,t,r){"use strict";e.exports=i;var n=r(20);function i(e,t,r){if("function"!=typeof e)throw TypeError("rpcImpl must be a function");n.EventEmitter.call(this),this.rpcImpl=e,this.requestDelimited=Boolean(t),this.responseDelimited=Boolean(r)}(i.prototype=Object.create(n.EventEmitter.prototype)).constructor=i,i.prototype.rpcCall=function e(t,r,i,o,s){if(!o)throw TypeError("request must be specified");var a=this;if(!s)return n.asPromise(e,a,t,r,i,o);if(a.rpcImpl)try{return a.rpcImpl(t,r[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(e,r){if(e)return a.emit("error",e,t),s(e);if(null!==r){if(!(r instanceof i))try{r=i[a.responseDelimited?"decodeDelimited":"decode"](r)}catch(e){return a.emit("error",e,t),s(e)}return a.emit("data",r,t),s(null,r)}a.end(!0)})}catch(e){return a.emit("error",e,t),void setTimeout(function(){s(e)},0)}else setTimeout(function(){s(Error("already ended"))},0)},i.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}},function(e,t,r){"use strict";function n(e,t){"string"==typeof e&&(t=e,e=void 0);var r=[];function i(e){if("string"!=typeof e){var t=o();if(n.verbose&&console.log("codegen: "+t),t="return "+t,e){for(var s=Object.keys(e),a=new Array(s.length+1),f=new Array(s.length),c=0;c<s.length;)a[c]=s[c],f[c]=e[s[c++]];return a[c]=t,Function.apply(null,a).apply(null,f)}return Function(t)()}for(var u=new Array(arguments.length-1),h=0;h<u.length;)u[h]=arguments[++h];if(h=0,e=e.replace(/%([%dfijs])/g,function(e,t){var r=u[h++];switch(t){case"d":case"f":return String(Number(r));case"i":return String(Math.floor(r));case"j":return JSON.stringify(r);case"s":return String(r)}return"%"}),h!==u.length)throw Error("parameter count mismatch");return r.push(e),i}function o(n){return"function "+(n||t||"")+"("+(e&&e.join(",")||"")+"){\n  "+r.join("\n  ")+"\n}"}return i.toString=o,i}e.exports=n,n.verbose=!1},function(e,t,r){"use strict";e.exports=o;var n=r(80),i=r(81)("fs");function o(e,t,r){return"function"==typeof t?(r=t,t={}):t||(t={}),r?!t.xhr&&i&&i.readFile?i.readFile(e,function(n,i){return n&&"undefined"!=typeof XMLHttpRequest?o.xhr(e,t,r):n?r(n):r(null,t.binary?i:i.toString("utf8"))}):o.xhr(e,t,r):n(o,this,e,t)}o.xhr=function(e,t,r){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===n.readyState){if(0!==n.status&&200!==n.status)return r(Error("status "+n.status));if(t.binary){var e=n.response;if(!e){e=[];for(var i=0;i<n.responseText.length;++i)e.push(255&n.responseText.charCodeAt(i))}return r(null,"undefined"!=typeof Uint8Array?new Uint8Array(e):e)}return r(null,n.responseText)}},t.binary&&("overrideMimeType"in n&&n.overrideMimeType("text/plain; charset=x-user-defined"),n.responseType="arraybuffer"),n.open("GET",e),n.send()}},function(e,t,r){"use strict";var n=t,i=n.isAbsolute=function(e){return/^(?:\/|\w+:)/.test(e)},o=n.normalize=function(e){var t=(e=e.replace(/\\/g,"/").replace(/\/{2,}/g,"/")).split("/"),r=i(e),n="";r&&(n=t.shift()+"/");for(var o=0;o<t.length;)".."===t[o]?o>0&&".."!==t[o-1]?t.splice(--o,2):r?t.splice(o,1):++o:"."===t[o]?t.splice(o,1):++o;return n+t.join("/")};n.resolve=function(e,t,r){return r||(t=o(t)),i(t)?t:(r||(e=o(e)),(e=e.replace(/(?:\/|^)[^\/]+$/,"")).length?o(e+"/"+t):t)}},function(e,t){(function(t){e.exports=t}).call(this,{})},function(e,t,r){const n=r(0).Buffer;e.exports=function(e){if(e.length>=255)throw new TypeError("Alphabet too long");const t=new Uint8Array(256);t.fill(255);for(let r=0;r<e.length;r++){const n=e.charAt(r),i=n.charCodeAt(0);if(255!==t[i])throw new TypeError(n+" is ambiguous");t[i]=r}const r=e.length,i=e.charAt(0),o=Math.log(r)/Math.log(256),s=Math.log(256)/Math.log(r);function a(e){if("string"!=typeof e)throw new TypeError("Expected String");if(0===e.length)return n.alloc(0);let s=0;if(" "===e[s])return;let a=0,f=0;for(;e[s]===i;)a++,s++;const c=(e.length-s)*o+1>>>0,u=new Uint8Array(c);for(;e[s];){let n=t[e.charCodeAt(s)];if(255===n)return;let i=0;for(let e=c-1;(0!==n||i<f)&&-1!==e;e--,i++)n+=r*u[e]>>>0,u[e]=n%256>>>0,n=n/256>>>0;if(0!==n)throw new Error("Non-zero carry");f=i,s++}if(" "===e[s])return;let h=c-f;for(;h!==c&&0===u[h];)h++;const d=n.allocUnsafe(a+(c-h));d.fill(0,0,a);let l=a;for(;h!==c;)d[l++]=u[h++];return d}return{encode:function(t){if(!n.isBuffer(t))throw new TypeError("Expected Buffer");if(0===t.length)return"";let o=0,a=0,f=0;const c=t.length;for(;f!==c&&0===t[f];)f++,o++;const u=(c-f)*s+1>>>0,h=new Uint8Array(u);for(;f!==c;){let e=t[f],n=0;for(let t=u-1;(0!==e||n<a)&&-1!==t;t--,n++)e+=256*h[t]>>>0,h[t]=e%r>>>0,e=e/r>>>0;if(0!==e)throw new Error("Non-zero carry");a=n,f++}let d=u-a;for(;d!==u&&0===h[d];)d++;let l=i.repeat(o);for(;d<u;++d)l+=e.charAt(h[d]);return l},decodeUnsafe:a,decode:function(e){const t=a(e);if(t)return t;throw new Error("Non-base"+r+" character")}}}},function(e,t,r){"use strict";e.exports=r(157)},function(e,t,r){"use strict";var n=e.exports=r(79);n.build="full",n.tokenize=r(90),n.parse=r(158),n.common=r(159),n.Root._configure(n.Type,n.parse,n.common)},function(e,t,r){"use strict";e.exports=A,A.filename=null,A.defaults={keepCase:!1};var n=r(90),i=r(61),o=r(56),s=r(25),a=r(57),f=r(41),c=r(18),u=r(58),h=r(59),d=r(29),l=r(6),p=/^[1-9][0-9]*$/,b=/^-?[1-9][0-9]*$/,y=/^0[x][0-9a-fA-F]+$/,m=/^-?0[x][0-9a-fA-F]+$/,g=/^0[0-7]+$/,v=/^-?0[0-7]+$/,_=/^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,w=/^[a-zA-Z_][a-zA-Z_0-9]*$/,E=/^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,S=/^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;function A(e,t,r){t instanceof i||(r=t,t=new i),r||(r=A.defaults);var k,x,I,T,M,O=n(e,r.alternateCommentMode||!1),R=O.next,B=O.push,C=O.peek,P=O.skip,N=O.cmnt,D=!0,j=!1,L=t,H=r.keepCase?function(e){return e}:l.camelCase;function U(e,t,r){var n=A.filename;return r||(A.filename=null),Error("illegal "+(t||"token")+" '"+e+"' ("+(n?n+", ":"")+"line "+O.line+")")}function F(){var e,t=[];do{if('"'!==(e=R())&&"'"!==e)throw U(e);t.push(R()),P(e),e=C()}while('"'===e||"'"===e);return t.join("")}function q(e){var t=R();switch(t){case"'":case'"':return B(t),F();case"true":case"TRUE":return!0;case"false":case"FALSE":return!1}try{return function(e,t){var r=1;"-"===e.charAt(0)&&(r=-1,e=e.substring(1));switch(e){case"inf":case"INF":case"Inf":return r*(1/0);case"nan":case"NAN":case"Nan":case"NaN":return NaN;case"0":return 0}if(p.test(e))return r*parseInt(e,10);if(y.test(e))return r*parseInt(e,16);if(g.test(e))return r*parseInt(e,8);if(_.test(e))return r*parseFloat(e);throw U(e,"number",t)}(t,!0)}catch(r){if(e&&E.test(t))return t;throw U(t,"value")}}function z(e,t){var r,n;do{!t||'"'!==(r=C())&&"'"!==r?e.push([n=K(R()),P("to",!0)?K(R()):n]):e.push(F())}while(P(",",!0));P(";")}function K(e,t){switch(e){case"max":case"MAX":case"Max":return 536870911;case"0":return 0}if(!t&&"-"===e.charAt(0))throw U(e,"id");if(b.test(e))return parseInt(e,10);if(m.test(e))return parseInt(e,16);if(v.test(e))return parseInt(e,8);throw U(e,"id")}function V(){if(void 0!==k)throw U("package");if(k=R(),!E.test(k))throw U(k,"name");L=L.define(k),P(";")}function Y(){var e,t=C();switch(t){case"weak":e=I||(I=[]),R();break;case"public":R();default:e=x||(x=[])}t=F(),P(";"),e.push(t)}function G(){if(P("="),T=F(),!(j="proto3"===T)&&"proto2"!==T)throw U(T,"syntax");P(";")}function W(e,t){switch(t){case"option":return $(e,t),P(";"),!0;case"message":return function(e,t){if(!w.test(t=R()))throw U(t,"type name");var r=new o(t);X(r,function(e){if(!W(r,e))switch(e){case"map":!function(e){P("<");var t=R();if(void 0===d.mapKey[t])throw U(t,"type");P(",");var r=R();if(!E.test(r))throw U(r,"type");P(">");var n=R();if(!w.test(n))throw U(n,"name");P("=");var i=new a(H(n),K(R()),t,r);X(i,function(e){if("option"!==e)throw U(e);$(i,e),P(";")},function(){ee(i)}),e.add(i)}(r);break;case"required":case"optional":case"repeated":J(r,e);break;case"oneof":!function(e,t){if(!w.test(t=R()))throw U(t,"name");var r=new f(H(t));X(r,function(e){"option"===e?($(r,e),P(";")):(B(e),J(r,"optional"))}),e.add(r)}(r,e);break;case"extensions":z(r.extensions||(r.extensions=[]));break;case"reserved":z(r.reserved||(r.reserved=[]),!0);break;default:if(!j||!E.test(e))throw U(e);B(e),J(r,"optional")}}),e.add(r)}(e,t),!0;case"enum":return function(e,t){if(!w.test(t=R()))throw U(t,"name");var r=new c(t);X(r,function(e){switch(e){case"option":$(r,e),P(";");break;case"reserved":z(r.reserved||(r.reserved=[]),!0);break;default:!function(e,t){if(!w.test(t))throw U(t,"name");P("=");var r=K(R(),!0),n={};X(n,function(e){if("option"!==e)throw U(e);$(n,e),P(";")},function(){ee(n)}),e.add(t,r,n.comment)}(r,e)}}),e.add(r)}(e,t),!0;case"service":return function(e,t){if(!w.test(t=R()))throw U(t,"service name");var r=new u(t);X(r,function(e){if(!W(r,e)){if("rpc"!==e)throw U(e);!function(e,t){var r=t;if(!w.test(t=R()))throw U(t,"name");var n,i,o,s,a=t;P("("),P("stream",!0)&&(i=!0);if(!E.test(t=R()))throw U(t);n=t,P(")"),P("returns"),P("("),P("stream",!0)&&(s=!0);if(!E.test(t=R()))throw U(t);o=t,P(")");var f=new h(a,r,n,o,i,s);X(f,function(e){if("option"!==e)throw U(e);$(f,e),P(";")}),e.add(f)}(r,e)}}),e.add(r)}(e,t),!0;case"extend":return function(e,t){if(!E.test(t=R()))throw U(t,"reference");var r=t;X(null,function(t){switch(t){case"required":case"repeated":case"optional":J(e,t,r);break;default:if(!j||!E.test(t))throw U(t);B(t),J(e,"optional",r)}})}(e,t),!0}return!1}function X(e,t,r){var n=O.line;if(e&&(e.comment=N(),e.filename=A.filename),P("{",!0)){for(var i;"}"!==(i=R());)t(i);P(";",!0)}else r&&r(),P(";"),e&&"string"!=typeof e.comment&&(e.comment=N(n))}function J(e,t,r){var n=R();if("group"!==n){if(!E.test(n))throw U(n,"type");var i=R();if(!w.test(i))throw U(i,"name");i=H(i),P("=");var a=new s(i,K(R()),n,t,r);X(a,function(e){if("option"!==e)throw U(e);$(a,e),P(";")},function(){ee(a)}),e.add(a),j||!a.repeated||void 0===d.packed[n]&&void 0!==d.basic[n]||a.setOption("packed",!1,!0)}else!function(e,t){var r=R();if(!w.test(r))throw U(r,"name");var n=l.lcFirst(r);r===n&&(r=l.ucFirst(r));P("=");var i=K(R()),a=new o(r);a.group=!0;var f=new s(n,i,r,t);f.filename=A.filename,X(a,function(e){switch(e){case"option":$(a,e),P(";");break;case"required":case"optional":case"repeated":J(a,e);break;default:throw U(e)}}),e.add(a).add(f)}(e,t)}function $(e,t){var r=P("(",!0);if(!E.test(t=R()))throw U(t,"name");var n=t;r&&(P(")"),n="("+n+")",t=C(),S.test(t)&&(n+=t,R())),P("="),Z(e,n)}function Z(e,t){if(P("{",!0))do{if(!w.test(M=R()))throw U(M,"name");"{"===C()?Z(e,t+"."+M):(P(":"),"{"===C()?Z(e,t+"."+M):Q(e,t+"."+M,q(!0))),P(",",!0)}while(!P("}",!0));else Q(e,t,q(!0))}function Q(e,t,r){e.setOption&&e.setOption(t,r)}function ee(e){if(P("[",!0)){do{$(e,"option")}while(P(",",!0));P("]")}return e}for(;null!==(M=R());)switch(M){case"package":if(!D)throw U(M);V();break;case"import":if(!D)throw U(M);Y();break;case"syntax":if(!D)throw U(M);G();break;case"option":if(!D)throw U(M);$(L,M),P(";");break;default:if(W(L,M)){D=!1;continue}throw U(M)}return A.filename=null,{package:k,imports:x,weakImports:I,syntax:T,root:t}}},function(e,t,r){"use strict";e.exports=o;var n,i=/\/|\./;function o(e,t){i.test(e)||(e="google/protobuf/"+e+".proto",t={nested:{google:{nested:{protobuf:{nested:t}}}}}),o[e]=t}o("any",{Any:{fields:{type_url:{type:"string",id:1},value:{type:"bytes",id:2}}}}),o("duration",{Duration:n={fields:{seconds:{type:"int64",id:1},nanos:{type:"int32",id:2}}}}),o("timestamp",{Timestamp:n}),o("empty",{Empty:{fields:{}}}),o("struct",{Struct:{fields:{fields:{keyType:"string",type:"Value",id:1}}},Value:{oneofs:{kind:{oneof:["nullValue","numberValue","stringValue","boolValue","structValue","listValue"]}},fields:{nullValue:{type:"NullValue",id:1},numberValue:{type:"double",id:2},stringValue:{type:"string",id:3},boolValue:{type:"bool",id:4},structValue:{type:"Struct",id:5},listValue:{type:"ListValue",id:6}}},NullValue:{values:{NULL_VALUE:0}},ListValue:{fields:{values:{rule:"repeated",type:"Value",id:1}}}}),o("wrappers",{DoubleValue:{fields:{value:{type:"double",id:1}}},FloatValue:{fields:{value:{type:"float",id:1}}},Int64Value:{fields:{value:{type:"int64",id:1}}},UInt64Value:{fields:{value:{type:"uint64",id:1}}},Int32Value:{fields:{value:{type:"int32",id:1}}},UInt32Value:{fields:{value:{type:"uint32",id:1}}},BoolValue:{fields:{value:{type:"bool",id:1}}},StringValue:{fields:{value:{type:"string",id:1}}},BytesValue:{fields:{value:{type:"bytes",id:1}}}}),o("field_mask",{FieldMask:{fields:{paths:{rule:"repeated",type:"string",id:1}}}}),o.get=function(e){return o[e]||null}},function(e){e.exports={nested:{google:{nested:{protobuf:{nested:{FileDescriptorSet:{fields:{file:{rule:"repeated",type:"FileDescriptorProto",id:1}}},FileDescriptorProto:{fields:{name:{type:"string",id:1},package:{type:"string",id:2},dependency:{rule:"repeated",type:"string",id:3},publicDependency:{rule:"repeated",type:"int32",id:10,options:{packed:!1}},weakDependency:{rule:"repeated",type:"int32",id:11,options:{packed:!1}},messageType:{rule:"repeated",type:"DescriptorProto",id:4},enumType:{rule:"repeated",type:"EnumDescriptorProto",id:5},service:{rule:"repeated",type:"ServiceDescriptorProto",id:6},extension:{rule:"repeated",type:"FieldDescriptorProto",id:7},options:{type:"FileOptions",id:8},sourceCodeInfo:{type:"SourceCodeInfo",id:9},syntax:{type:"string",id:12}}},DescriptorProto:{fields:{name:{type:"string",id:1},field:{rule:"repeated",type:"FieldDescriptorProto",id:2},extension:{rule:"repeated",type:"FieldDescriptorProto",id:6},nestedType:{rule:"repeated",type:"DescriptorProto",id:3},enumType:{rule:"repeated",type:"EnumDescriptorProto",id:4},extensionRange:{rule:"repeated",type:"ExtensionRange",id:5},oneofDecl:{rule:"repeated",type:"OneofDescriptorProto",id:8},options:{type:"MessageOptions",id:7},reservedRange:{rule:"repeated",type:"ReservedRange",id:9},reservedName:{rule:"repeated",type:"string",id:10}},nested:{ExtensionRange:{fields:{start:{type:"int32",id:1},end:{type:"int32",id:2}}},ReservedRange:{fields:{start:{type:"int32",id:1},end:{type:"int32",id:2}}}}},FieldDescriptorProto:{fields:{name:{type:"string",id:1},number:{type:"int32",id:3},label:{type:"Label",id:4},type:{type:"Type",id:5},typeName:{type:"string",id:6},extendee:{type:"string",id:2},defaultValue:{type:"string",id:7},oneofIndex:{type:"int32",id:9},jsonName:{type:"string",id:10},options:{type:"FieldOptions",id:8}},nested:{Type:{values:{TYPE_DOUBLE:1,TYPE_FLOAT:2,TYPE_INT64:3,TYPE_UINT64:4,TYPE_INT32:5,TYPE_FIXED64:6,TYPE_FIXED32:7,TYPE_BOOL:8,TYPE_STRING:9,TYPE_GROUP:10,TYPE_MESSAGE:11,TYPE_BYTES:12,TYPE_UINT32:13,TYPE_ENUM:14,TYPE_SFIXED32:15,TYPE_SFIXED64:16,TYPE_SINT32:17,TYPE_SINT64:18}},Label:{values:{LABEL_OPTIONAL:1,LABEL_REQUIRED:2,LABEL_REPEATED:3}}}},OneofDescriptorProto:{fields:{name:{type:"string",id:1},options:{type:"OneofOptions",id:2}}},EnumDescriptorProto:{fields:{name:{type:"string",id:1},value:{rule:"repeated",type:"EnumValueDescriptorProto",id:2},options:{type:"EnumOptions",id:3}}},EnumValueDescriptorProto:{fields:{name:{type:"string",id:1},number:{type:"int32",id:2},options:{type:"EnumValueOptions",id:3}}},ServiceDescriptorProto:{fields:{name:{type:"string",id:1},method:{rule:"repeated",type:"MethodDescriptorProto",id:2},options:{type:"ServiceOptions",id:3}}},MethodDescriptorProto:{fields:{name:{type:"string",id:1},inputType:{type:"string",id:2},outputType:{type:"string",id:3},options:{type:"MethodOptions",id:4},clientStreaming:{type:"bool",id:5},serverStreaming:{type:"bool",id:6}}},FileOptions:{fields:{javaPackage:{type:"string",id:1},javaOuterClassname:{type:"string",id:8},javaMultipleFiles:{type:"bool",id:10},javaGenerateEqualsAndHash:{type:"bool",id:20,options:{deprecated:!0}},javaStringCheckUtf8:{type:"bool",id:27},optimizeFor:{type:"OptimizeMode",id:9,options:{default:"SPEED"}},goPackage:{type:"string",id:11},ccGenericServices:{type:"bool",id:16},javaGenericServices:{type:"bool",id:17},pyGenericServices:{type:"bool",id:18},deprecated:{type:"bool",id:23},ccEnableArenas:{type:"bool",id:31},objcClassPrefix:{type:"string",id:36},csharpNamespace:{type:"string",id:37},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],reserved:[[38,38]],nested:{OptimizeMode:{values:{SPEED:1,CODE_SIZE:2,LITE_RUNTIME:3}}}},MessageOptions:{fields:{messageSetWireFormat:{type:"bool",id:1},noStandardDescriptorAccessor:{type:"bool",id:2},deprecated:{type:"bool",id:3},mapEntry:{type:"bool",id:7},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],reserved:[[8,8]]},FieldOptions:{fields:{ctype:{type:"CType",id:1,options:{default:"STRING"}},packed:{type:"bool",id:2},jstype:{type:"JSType",id:6,options:{default:"JS_NORMAL"}},lazy:{type:"bool",id:5},deprecated:{type:"bool",id:3},weak:{type:"bool",id:10},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],reserved:[[4,4]],nested:{CType:{values:{STRING:0,CORD:1,STRING_PIECE:2}},JSType:{values:{JS_NORMAL:0,JS_STRING:1,JS_NUMBER:2}}}},OneofOptions:{fields:{uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},EnumOptions:{fields:{allowAlias:{type:"bool",id:2},deprecated:{type:"bool",id:3},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},EnumValueOptions:{fields:{deprecated:{type:"bool",id:1},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},ServiceOptions:{fields:{deprecated:{type:"bool",id:33},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},MethodOptions:{fields:{deprecated:{type:"bool",id:33},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},UninterpretedOption:{fields:{name:{rule:"repeated",type:"NamePart",id:2},identifierValue:{type:"string",id:3},positiveIntValue:{type:"uint64",id:4},negativeIntValue:{type:"int64",id:5},doubleValue:{type:"double",id:6},stringValue:{type:"bytes",id:7},aggregateValue:{type:"string",id:8}},nested:{NamePart:{fields:{namePart:{rule:"required",type:"string",id:1},isExtension:{rule:"required",type:"bool",id:2}}}}},SourceCodeInfo:{fields:{location:{rule:"repeated",type:"Location",id:1}},nested:{Location:{fields:{path:{rule:"repeated",type:"int32",id:1},span:{rule:"repeated",type:"int32",id:2},leadingComments:{type:"string",id:3},trailingComments:{type:"string",id:4},leadingDetachedComments:{rule:"repeated",type:"string",id:6}}}}},GeneratedCodeInfo:{fields:{annotation:{rule:"repeated",type:"Annotation",id:1}},nested:{Annotation:{fields:{path:{rule:"repeated",type:"int32",id:1},sourceFile:{type:"string",id:2},begin:{type:"int32",id:3},end:{type:"int32",id:4}}}}}}}}}}}},function(e){e.exports={name:"elliptic",version:"6.4.1",description:"EC cryptography",main:"lib/elliptic.js",files:["lib"],scripts:{jscs:"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",jshint:"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",lint:"npm run jscs && npm run jshint",unit:"istanbul test _mocha --reporter=spec test/index.js",test:"npm run lint && npm run unit",version:"grunt dist && git add dist/"},repository:{type:"git",url:"git@github.com:indutny/elliptic"},keywords:["EC","Elliptic","curve","Cryptography"],author:"Fedor Indutny <fedor@indutny.com>",license:"MIT",bugs:{url:"https://github.com/indutny/elliptic/issues"},homepage:"https://github.com/indutny/elliptic",devDependencies:{brfs:"^1.4.3",coveralls:"^2.11.3",grunt:"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^8.6.2",istanbul:"^0.4.2",jscs:"^2.9.0",jshint:"^2.6.0",mocha:"^2.1.0"},dependencies:{"bn.js":"^4.4.0",brorand:"^1.0.1","hash.js":"^1.0.0","hmac-drbg":"^1.0.0",inherits:"^2.0.1","minimalistic-assert":"^1.0.0","minimalistic-crypto-utils":"^1.0.0"}}},function(e,t,r){"use strict";var n=t,i=r(4),o=r(12),s=r(91);n.assert=o,n.toArray=s.toArray,n.zero2=s.zero2,n.toHex=s.toHex,n.encode=s.encode,n.getNAF=function(e,t){for(var r=[],n=1<<t+1,i=e.clone();i.cmpn(1)>=0;){var o;if(i.isOdd()){var s=i.andln(n-1);o=s>(n>>1)-1?(n>>1)-s:s,i.isubn(o)}else o=0;r.push(o);for(var a=0!==i.cmpn(0)&&0===i.andln(n-1)?t+1:1,f=1;f<a;f++)r.push(0);i.iushrn(a)}return r},n.getJSF=function(e,t){var r=[[],[]];e=e.clone(),t=t.clone();for(var n=0,i=0;e.cmpn(-n)>0||t.cmpn(-i)>0;){var o,s,a,f=e.andln(3)+n&3,c=t.andln(3)+i&3;3===f&&(f=-1),3===c&&(c=-1),o=0==(1&f)?0:3!=(a=e.andln(7)+n&7)&&5!==a||2!==c?f:-f,r[0].push(o),s=0==(1&c)?0:3!=(a=t.andln(7)+i&7)&&5!==a||2!==f?c:-c,r[1].push(s),2*n===o+1&&(n=1-n),2*i===s+1&&(i=1-i),e.iushrn(1),t.iushrn(1)}return r},n.cachedProperty=function(e,t,r){var n="_"+t;e.prototype[t]=function(){return void 0!==this[n]?this[n]:this[n]=r.call(this)}},n.parseBytes=function(e){return"string"==typeof e?n.toArray(e,"hex"):e},n.intFromLE=function(e){return new i(e,"hex","le")}},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t){},function(e,t){},function(e,t,r){"use strict";var n=r(4),i=r(7).utils,o=i.getNAF,s=i.getJSF,a=i.assert;function f(e,t){this.type=e,this.p=new n(t.p,16),this.red=t.prime?n.red(t.prime):n.mont(this.p),this.zero=new n(0).toRed(this.red),this.one=new n(1).toRed(this.red),this.two=new n(2).toRed(this.red),this.n=t.n&&new n(t.n,16),this.g=t.g&&this.pointFromJSON(t.g,t.gRed),this._wnafT1=new Array(4),this._wnafT2=new Array(4),this._wnafT3=new Array(4),this._wnafT4=new Array(4);var r=this.n&&this.p.div(this.n);!r||r.cmpn(100)>0?this.redN=null:(this._maxwellTrick=!0,this.redN=this.n.toRed(this.red))}function c(e,t){this.curve=e,this.type=t,this.precomputed=null}e.exports=f,f.prototype.point=function(){throw new Error("Not implemented")},f.prototype.validate=function(){throw new Error("Not implemented")},f.prototype._fixedNafMul=function(e,t){a(e.precomputed);var r=e._getDoubles(),n=o(t,1),i=(1<<r.step+1)-(r.step%2==0?2:1);i/=3;for(var s=[],f=0;f<n.length;f+=r.step){var c=0;for(t=f+r.step-1;t>=f;t--)c=(c<<1)+n[t];s.push(c)}for(var u=this.jpoint(null,null,null),h=this.jpoint(null,null,null),d=i;d>0;d--){for(f=0;f<s.length;f++){(c=s[f])===d?h=h.mixedAdd(r.points[f]):c===-d&&(h=h.mixedAdd(r.points[f].neg()))}u=u.add(h)}return u.toP()},f.prototype._wnafMul=function(e,t){var r=4,n=e._getNAFPoints(r);r=n.wnd;for(var i=n.points,s=o(t,r),f=this.jpoint(null,null,null),c=s.length-1;c>=0;c--){for(t=0;c>=0&&0===s[c];c--)t++;if(c>=0&&t++,f=f.dblp(t),c<0)break;var u=s[c];a(0!==u),f="affine"===e.type?u>0?f.mixedAdd(i[u-1>>1]):f.mixedAdd(i[-u-1>>1].neg()):u>0?f.add(i[u-1>>1]):f.add(i[-u-1>>1].neg())}return"affine"===e.type?f.toP():f},f.prototype._wnafMulAdd=function(e,t,r,n,i){for(var a=this._wnafT1,f=this._wnafT2,c=this._wnafT3,u=0,h=0;h<n;h++){var d=(k=t[h])._getNAFPoints(e);a[h]=d.wnd,f[h]=d.points}for(h=n-1;h>=1;h-=2){var l=h-1,p=h;if(1===a[l]&&1===a[p]){var b=[t[l],null,null,t[p]];0===t[l].y.cmp(t[p].y)?(b[1]=t[l].add(t[p]),b[2]=t[l].toJ().mixedAdd(t[p].neg())):0===t[l].y.cmp(t[p].y.redNeg())?(b[1]=t[l].toJ().mixedAdd(t[p]),b[2]=t[l].add(t[p].neg())):(b[1]=t[l].toJ().mixedAdd(t[p]),b[2]=t[l].toJ().mixedAdd(t[p].neg()));var y=[-3,-1,-5,-7,0,7,5,1,3],m=s(r[l],r[p]);u=Math.max(m[0].length,u),c[l]=new Array(u),c[p]=new Array(u);for(var g=0;g<u;g++){var v=0|m[0][g],_=0|m[1][g];c[l][g]=y[3*(v+1)+(_+1)],c[p][g]=0,f[l]=b}}else c[l]=o(r[l],a[l]),c[p]=o(r[p],a[p]),u=Math.max(c[l].length,u),u=Math.max(c[p].length,u)}var w=this.jpoint(null,null,null),E=this._wnafT4;for(h=u;h>=0;h--){for(var S=0;h>=0;){var A=!0;for(g=0;g<n;g++)E[g]=0|c[g][h],0!==E[g]&&(A=!1);if(!A)break;S++,h--}if(h>=0&&S++,w=w.dblp(S),h<0)break;for(g=0;g<n;g++){var k,x=E[g];0!==x&&(x>0?k=f[g][x-1>>1]:x<0&&(k=f[g][-x-1>>1].neg()),w="affine"===k.type?w.mixedAdd(k):w.add(k))}}for(h=0;h<n;h++)f[h]=null;return i?w:w.toP()},f.BasePoint=c,c.prototype.eq=function(){throw new Error("Not implemented")},c.prototype.validate=function(){return this.curve.validate(this)},f.prototype.decodePoint=function(e,t){e=i.toArray(e,t);var r=this.p.byteLength();if((4===e[0]||6===e[0]||7===e[0])&&e.length-1==2*r)return 6===e[0]?a(e[e.length-1]%2==0):7===e[0]&&a(e[e.length-1]%2==1),this.point(e.slice(1,1+r),e.slice(1+r,1+2*r));if((2===e[0]||3===e[0])&&e.length-1===r)return this.pointFromX(e.slice(1,1+r),3===e[0]);throw new Error("Unknown point format")},c.prototype.encodeCompressed=function(e){return this.encode(e,!0)},c.prototype._encode=function(e){var t=this.curve.p.byteLength(),r=this.getX().toArray("be",t);return e?[this.getY().isEven()?2:3].concat(r):[4].concat(r,this.getY().toArray("be",t))},c.prototype.encode=function(e,t){return i.encode(this._encode(t),e)},c.prototype.precompute=function(e){if(this.precomputed)return this;var t={doubles:null,naf:null,beta:null};return t.naf=this._getNAFPoints(8),t.doubles=this._getDoubles(4,e),t.beta=this._getBeta(),this.precomputed=t,this},c.prototype._hasDoubles=function(e){if(!this.precomputed)return!1;var t=this.precomputed.doubles;return!!t&&t.points.length>=Math.ceil((e.bitLength()+1)/t.step)},c.prototype._getDoubles=function(e,t){if(this.precomputed&&this.precomputed.doubles)return this.precomputed.doubles;for(var r=[this],n=this,i=0;i<t;i+=e){for(var o=0;o<e;o++)n=n.dbl();r.push(n)}return{step:e,points:r}},c.prototype._getNAFPoints=function(e){if(this.precomputed&&this.precomputed.naf)return this.precomputed.naf;for(var t=[this],r=(1<<e)-1,n=1===r?null:this.dbl(),i=1;i<r;i++)t[i]=t[i-1].add(n);return{wnd:e,points:t}},c.prototype._getBeta=function(){return null},c.prototype.dblp=function(e){for(var t=this,r=0;r<e;r++)t=t.dbl();return t}},function(e,t,r){"use strict";var n=r(42),i=r(7),o=r(4),s=r(1),a=n.base,f=i.utils.assert;function c(e){a.call(this,"short",e),this.a=new o(e.a,16).toRed(this.red),this.b=new o(e.b,16).toRed(this.red),this.tinv=this.two.redInvm(),this.zeroA=0===this.a.fromRed().cmpn(0),this.threeA=0===this.a.fromRed().sub(this.p).cmpn(-3),this.endo=this._getEndomorphism(e),this._endoWnafT1=new Array(4),this._endoWnafT2=new Array(4)}function u(e,t,r,n){a.BasePoint.call(this,e,"affine"),null===t&&null===r?(this.x=null,this.y=null,this.inf=!0):(this.x=new o(t,16),this.y=new o(r,16),n&&(this.x.forceRed(this.curve.red),this.y.forceRed(this.curve.red)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.inf=!1)}function h(e,t,r,n){a.BasePoint.call(this,e,"jacobian"),null===t&&null===r&&null===n?(this.x=this.curve.one,this.y=this.curve.one,this.z=new o(0)):(this.x=new o(t,16),this.y=new o(r,16),this.z=new o(n,16)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.zOne=this.z===this.curve.one}s(c,a),e.exports=c,c.prototype._getEndomorphism=function(e){if(this.zeroA&&this.g&&this.n&&1===this.p.modn(3)){var t,r;if(e.beta)t=new o(e.beta,16).toRed(this.red);else{var n=this._getEndoRoots(this.p);t=(t=n[0].cmp(n[1])<0?n[0]:n[1]).toRed(this.red)}if(e.lambda)r=new o(e.lambda,16);else{var i=this._getEndoRoots(this.n);0===this.g.mul(i[0]).x.cmp(this.g.x.redMul(t))?r=i[0]:(r=i[1],f(0===this.g.mul(r).x.cmp(this.g.x.redMul(t))))}return{beta:t,lambda:r,basis:e.basis?e.basis.map(function(e){return{a:new o(e.a,16),b:new o(e.b,16)}}):this._getEndoBasis(r)}}},c.prototype._getEndoRoots=function(e){var t=e===this.p?this.red:o.mont(e),r=new o(2).toRed(t).redInvm(),n=r.redNeg(),i=new o(3).toRed(t).redNeg().redSqrt().redMul(r);return[n.redAdd(i).fromRed(),n.redSub(i).fromRed()]},c.prototype._getEndoBasis=function(e){for(var t,r,n,i,s,a,f,c,u,h=this.n.ushrn(Math.floor(this.n.bitLength()/2)),d=e,l=this.n.clone(),p=new o(1),b=new o(0),y=new o(0),m=new o(1),g=0;0!==d.cmpn(0);){var v=l.div(d);c=l.sub(v.mul(d)),u=y.sub(v.mul(p));var _=m.sub(v.mul(b));if(!n&&c.cmp(h)<0)t=f.neg(),r=p,n=c.neg(),i=u;else if(n&&2==++g)break;f=c,l=d,d=c,y=p,p=u,m=b,b=_}s=c.neg(),a=u;var w=n.sqr().add(i.sqr());return s.sqr().add(a.sqr()).cmp(w)>=0&&(s=t,a=r),n.negative&&(n=n.neg(),i=i.neg()),s.negative&&(s=s.neg(),a=a.neg()),[{a:n,b:i},{a:s,b:a}]},c.prototype._endoSplit=function(e){var t=this.endo.basis,r=t[0],n=t[1],i=n.b.mul(e).divRound(this.n),o=r.b.neg().mul(e).divRound(this.n),s=i.mul(r.a),a=o.mul(n.a),f=i.mul(r.b),c=o.mul(n.b);return{k1:e.sub(s).sub(a),k2:f.add(c).neg()}},c.prototype.pointFromX=function(e,t){(e=new o(e,16)).red||(e=e.toRed(this.red));var r=e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b),n=r.redSqrt();if(0!==n.redSqr().redSub(r).cmp(this.zero))throw new Error("invalid point");var i=n.fromRed().isOdd();return(t&&!i||!t&&i)&&(n=n.redNeg()),this.point(e,n)},c.prototype.validate=function(e){if(e.inf)return!0;var t=e.x,r=e.y,n=this.a.redMul(t),i=t.redSqr().redMul(t).redIAdd(n).redIAdd(this.b);return 0===r.redSqr().redISub(i).cmpn(0)},c.prototype._endoWnafMulAdd=function(e,t,r){for(var n=this._endoWnafT1,i=this._endoWnafT2,o=0;o<e.length;o++){var s=this._endoSplit(t[o]),a=e[o],f=a._getBeta();s.k1.negative&&(s.k1.ineg(),a=a.neg(!0)),s.k2.negative&&(s.k2.ineg(),f=f.neg(!0)),n[2*o]=a,n[2*o+1]=f,i[2*o]=s.k1,i[2*o+1]=s.k2}for(var c=this._wnafMulAdd(1,n,i,2*o,r),u=0;u<2*o;u++)n[u]=null,i[u]=null;return c},s(u,a.BasePoint),c.prototype.point=function(e,t,r){return new u(this,e,t,r)},c.prototype.pointFromJSON=function(e,t){return u.fromJSON(this,e,t)},u.prototype._getBeta=function(){if(this.curve.endo){var e=this.precomputed;if(e&&e.beta)return e.beta;var t=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(e){var r=this.curve,n=function(e){return r.point(e.x.redMul(r.endo.beta),e.y)};e.beta=t,t.precomputed={beta:null,naf:e.naf&&{wnd:e.naf.wnd,points:e.naf.points.map(n)},doubles:e.doubles&&{step:e.doubles.step,points:e.doubles.points.map(n)}}}return t}},u.prototype.toJSON=function(){return this.precomputed?[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}]:[this.x,this.y]},u.fromJSON=function(e,t,r){"string"==typeof t&&(t=JSON.parse(t));var n=e.point(t[0],t[1],r);if(!t[2])return n;function i(t){return e.point(t[0],t[1],r)}var o=t[2];return n.precomputed={beta:null,doubles:o.doubles&&{step:o.doubles.step,points:[n].concat(o.doubles.points.map(i))},naf:o.naf&&{wnd:o.naf.wnd,points:[n].concat(o.naf.points.map(i))}},n},u.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+">"},u.prototype.isInfinity=function(){return this.inf},u.prototype.add=function(e){if(this.inf)return e;if(e.inf)return this;if(this.eq(e))return this.dbl();if(this.neg().eq(e))return this.curve.point(null,null);if(0===this.x.cmp(e.x))return this.curve.point(null,null);var t=this.y.redSub(e.y);0!==t.cmpn(0)&&(t=t.redMul(this.x.redSub(e.x).redInvm()));var r=t.redSqr().redISub(this.x).redISub(e.x),n=t.redMul(this.x.redSub(r)).redISub(this.y);return this.curve.point(r,n)},u.prototype.dbl=function(){if(this.inf)return this;var e=this.y.redAdd(this.y);if(0===e.cmpn(0))return this.curve.point(null,null);var t=this.curve.a,r=this.x.redSqr(),n=e.redInvm(),i=r.redAdd(r).redIAdd(r).redIAdd(t).redMul(n),o=i.redSqr().redISub(this.x.redAdd(this.x)),s=i.redMul(this.x.redSub(o)).redISub(this.y);return this.curve.point(o,s)},u.prototype.getX=function(){return this.x.fromRed()},u.prototype.getY=function(){return this.y.fromRed()},u.prototype.mul=function(e){return e=new o(e,16),this._hasDoubles(e)?this.curve._fixedNafMul(this,e):this.curve.endo?this.curve._endoWnafMulAdd([this],[e]):this.curve._wnafMul(this,e)},u.prototype.mulAdd=function(e,t,r){var n=[this,t],i=[e,r];return this.curve.endo?this.curve._endoWnafMulAdd(n,i):this.curve._wnafMulAdd(1,n,i,2)},u.prototype.jmulAdd=function(e,t,r){var n=[this,t],i=[e,r];return this.curve.endo?this.curve._endoWnafMulAdd(n,i,!0):this.curve._wnafMulAdd(1,n,i,2,!0)},u.prototype.eq=function(e){return this===e||this.inf===e.inf&&(this.inf||0===this.x.cmp(e.x)&&0===this.y.cmp(e.y))},u.prototype.neg=function(e){if(this.inf)return this;var t=this.curve.point(this.x,this.y.redNeg());if(e&&this.precomputed){var r=this.precomputed,n=function(e){return e.neg()};t.precomputed={naf:r.naf&&{wnd:r.naf.wnd,points:r.naf.points.map(n)},doubles:r.doubles&&{step:r.doubles.step,points:r.doubles.points.map(n)}}}return t},u.prototype.toJ=function(){return this.inf?this.curve.jpoint(null,null,null):this.curve.jpoint(this.x,this.y,this.curve.one)},s(h,a.BasePoint),c.prototype.jpoint=function(e,t,r){return new h(this,e,t,r)},h.prototype.toP=function(){if(this.isInfinity())return this.curve.point(null,null);var e=this.z.redInvm(),t=e.redSqr(),r=this.x.redMul(t),n=this.y.redMul(t).redMul(e);return this.curve.point(r,n)},h.prototype.neg=function(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z)},h.prototype.add=function(e){if(this.isInfinity())return e;if(e.isInfinity())return this;var t=e.z.redSqr(),r=this.z.redSqr(),n=this.x.redMul(t),i=e.x.redMul(r),o=this.y.redMul(t.redMul(e.z)),s=e.y.redMul(r.redMul(this.z)),a=n.redSub(i),f=o.redSub(s);if(0===a.cmpn(0))return 0!==f.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var c=a.redSqr(),u=c.redMul(a),h=n.redMul(c),d=f.redSqr().redIAdd(u).redISub(h).redISub(h),l=f.redMul(h.redISub(d)).redISub(o.redMul(u)),p=this.z.redMul(e.z).redMul(a);return this.curve.jpoint(d,l,p)},h.prototype.mixedAdd=function(e){if(this.isInfinity())return e.toJ();if(e.isInfinity())return this;var t=this.z.redSqr(),r=this.x,n=e.x.redMul(t),i=this.y,o=e.y.redMul(t).redMul(this.z),s=r.redSub(n),a=i.redSub(o);if(0===s.cmpn(0))return 0!==a.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var f=s.redSqr(),c=f.redMul(s),u=r.redMul(f),h=a.redSqr().redIAdd(c).redISub(u).redISub(u),d=a.redMul(u.redISub(h)).redISub(i.redMul(c)),l=this.z.redMul(s);return this.curve.jpoint(h,d,l)},h.prototype.dblp=function(e){if(0===e)return this;if(this.isInfinity())return this;if(!e)return this.dbl();if(this.curve.zeroA||this.curve.threeA){for(var t=this,r=0;r<e;r++)t=t.dbl();return t}var n=this.curve.a,i=this.curve.tinv,o=this.x,s=this.y,a=this.z,f=a.redSqr().redSqr(),c=s.redAdd(s);for(r=0;r<e;r++){var u=o.redSqr(),h=c.redSqr(),d=h.redSqr(),l=u.redAdd(u).redIAdd(u).redIAdd(n.redMul(f)),p=o.redMul(h),b=l.redSqr().redISub(p.redAdd(p)),y=p.redISub(b),m=l.redMul(y);m=m.redIAdd(m).redISub(d);var g=c.redMul(a);r+1<e&&(f=f.redMul(d)),o=b,a=g,c=m}return this.curve.jpoint(o,c.redMul(i),a)},h.prototype.dbl=function(){return this.isInfinity()?this:this.curve.zeroA?this._zeroDbl():this.curve.threeA?this._threeDbl():this._dbl()},h.prototype._zeroDbl=function(){var e,t,r;if(this.zOne){var n=this.x.redSqr(),i=this.y.redSqr(),o=i.redSqr(),s=this.x.redAdd(i).redSqr().redISub(n).redISub(o);s=s.redIAdd(s);var a=n.redAdd(n).redIAdd(n),f=a.redSqr().redISub(s).redISub(s),c=o.redIAdd(o);c=(c=c.redIAdd(c)).redIAdd(c),e=f,t=a.redMul(s.redISub(f)).redISub(c),r=this.y.redAdd(this.y)}else{var u=this.x.redSqr(),h=this.y.redSqr(),d=h.redSqr(),l=this.x.redAdd(h).redSqr().redISub(u).redISub(d);l=l.redIAdd(l);var p=u.redAdd(u).redIAdd(u),b=p.redSqr(),y=d.redIAdd(d);y=(y=y.redIAdd(y)).redIAdd(y),e=b.redISub(l).redISub(l),t=p.redMul(l.redISub(e)).redISub(y),r=(r=this.y.redMul(this.z)).redIAdd(r)}return this.curve.jpoint(e,t,r)},h.prototype._threeDbl=function(){var e,t,r;if(this.zOne){var n=this.x.redSqr(),i=this.y.redSqr(),o=i.redSqr(),s=this.x.redAdd(i).redSqr().redISub(n).redISub(o);s=s.redIAdd(s);var a=n.redAdd(n).redIAdd(n).redIAdd(this.curve.a),f=a.redSqr().redISub(s).redISub(s);e=f;var c=o.redIAdd(o);c=(c=c.redIAdd(c)).redIAdd(c),t=a.redMul(s.redISub(f)).redISub(c),r=this.y.redAdd(this.y)}else{var u=this.z.redSqr(),h=this.y.redSqr(),d=this.x.redMul(h),l=this.x.redSub(u).redMul(this.x.redAdd(u));l=l.redAdd(l).redIAdd(l);var p=d.redIAdd(d),b=(p=p.redIAdd(p)).redAdd(p);e=l.redSqr().redISub(b),r=this.y.redAdd(this.z).redSqr().redISub(h).redISub(u);var y=h.redSqr();y=(y=(y=y.redIAdd(y)).redIAdd(y)).redIAdd(y),t=l.redMul(p.redISub(e)).redISub(y)}return this.curve.jpoint(e,t,r)},h.prototype._dbl=function(){var e=this.curve.a,t=this.x,r=this.y,n=this.z,i=n.redSqr().redSqr(),o=t.redSqr(),s=r.redSqr(),a=o.redAdd(o).redIAdd(o).redIAdd(e.redMul(i)),f=t.redAdd(t),c=(f=f.redIAdd(f)).redMul(s),u=a.redSqr().redISub(c.redAdd(c)),h=c.redISub(u),d=s.redSqr();d=(d=(d=d.redIAdd(d)).redIAdd(d)).redIAdd(d);var l=a.redMul(h).redISub(d),p=r.redAdd(r).redMul(n);return this.curve.jpoint(u,l,p)},h.prototype.trpl=function(){if(!this.curve.zeroA)return this.dbl().add(this);var e=this.x.redSqr(),t=this.y.redSqr(),r=this.z.redSqr(),n=t.redSqr(),i=e.redAdd(e).redIAdd(e),o=i.redSqr(),s=this.x.redAdd(t).redSqr().redISub(e).redISub(n),a=(s=(s=(s=s.redIAdd(s)).redAdd(s).redIAdd(s)).redISub(o)).redSqr(),f=n.redIAdd(n);f=(f=(f=f.redIAdd(f)).redIAdd(f)).redIAdd(f);var c=i.redIAdd(s).redSqr().redISub(o).redISub(a).redISub(f),u=t.redMul(c);u=(u=u.redIAdd(u)).redIAdd(u);var h=this.x.redMul(a).redISub(u);h=(h=h.redIAdd(h)).redIAdd(h);var d=this.y.redMul(c.redMul(f.redISub(c)).redISub(s.redMul(a)));d=(d=(d=d.redIAdd(d)).redIAdd(d)).redIAdd(d);var l=this.z.redAdd(s).redSqr().redISub(r).redISub(a);return this.curve.jpoint(h,d,l)},h.prototype.mul=function(e,t){return e=new o(e,t),this.curve._wnafMul(this,e)},h.prototype.eq=function(e){if("affine"===e.type)return this.eq(e.toJ());if(this===e)return!0;var t=this.z.redSqr(),r=e.z.redSqr();if(0!==this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0))return!1;var n=t.redMul(this.z),i=r.redMul(e.z);return 0===this.y.redMul(i).redISub(e.y.redMul(n)).cmpn(0)},h.prototype.eqXToP=function(e){var t=this.z.redSqr(),r=e.toRed(this.curve.red).redMul(t);if(0===this.x.cmp(r))return!0;for(var n=e.clone(),i=this.curve.redN.redMul(t);;){if(n.iadd(this.curve.n),n.cmp(this.curve.p)>=0)return!1;if(r.redIAdd(i),0===this.x.cmp(r))return!0}},h.prototype.inspect=function(){return this.isInfinity()?"<EC JPoint Infinity>":"<EC JPoint x: "+this.x.toString(16,2)+" y: "+this.y.toString(16,2)+" z: "+this.z.toString(16,2)+">"},h.prototype.isInfinity=function(){return 0===this.z.cmpn(0)}},function(e,t,r){"use strict";var n=r(42),i=r(4),o=r(1),s=n.base,a=r(7).utils;function f(e){s.call(this,"mont",e),this.a=new i(e.a,16).toRed(this.red),this.b=new i(e.b,16).toRed(this.red),this.i4=new i(4).toRed(this.red).redInvm(),this.two=new i(2).toRed(this.red),this.a24=this.i4.redMul(this.a.redAdd(this.two))}function c(e,t,r){s.BasePoint.call(this,e,"projective"),null===t&&null===r?(this.x=this.curve.one,this.z=this.curve.zero):(this.x=new i(t,16),this.z=new i(r,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)))}o(f,s),e.exports=f,f.prototype.validate=function(e){var t=e.normalize().x,r=t.redSqr(),n=r.redMul(t).redAdd(r.redMul(this.a)).redAdd(t);return 0===n.redSqrt().redSqr().cmp(n)},o(c,s.BasePoint),f.prototype.decodePoint=function(e,t){return this.point(a.toArray(e,t),1)},f.prototype.point=function(e,t){return new c(this,e,t)},f.prototype.pointFromJSON=function(e){return c.fromJSON(this,e)},c.prototype.precompute=function(){},c.prototype._encode=function(){return this.getX().toArray("be",this.curve.p.byteLength())},c.fromJSON=function(e,t){return new c(e,t[0],t[1]||e.one)},c.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},c.prototype.isInfinity=function(){return 0===this.z.cmpn(0)},c.prototype.dbl=function(){var e=this.x.redAdd(this.z).redSqr(),t=this.x.redSub(this.z).redSqr(),r=e.redSub(t),n=e.redMul(t),i=r.redMul(t.redAdd(this.curve.a24.redMul(r)));return this.curve.point(n,i)},c.prototype.add=function(){throw new Error("Not supported on Montgomery curve")},c.prototype.diffAdd=function(e,t){var r=this.x.redAdd(this.z),n=this.x.redSub(this.z),i=e.x.redAdd(e.z),o=e.x.redSub(e.z).redMul(r),s=i.redMul(n),a=t.z.redMul(o.redAdd(s).redSqr()),f=t.x.redMul(o.redISub(s).redSqr());return this.curve.point(a,f)},c.prototype.mul=function(e){for(var t=e.clone(),r=this,n=this.curve.point(null,null),i=[];0!==t.cmpn(0);t.iushrn(1))i.push(t.andln(1));for(var o=i.length-1;o>=0;o--)0===i[o]?(r=r.diffAdd(n,this),n=n.dbl()):(n=r.diffAdd(n,this),r=r.dbl());return n},c.prototype.mulAdd=function(){throw new Error("Not supported on Montgomery curve")},c.prototype.jumlAdd=function(){throw new Error("Not supported on Montgomery curve")},c.prototype.eq=function(e){return 0===this.getX().cmp(e.getX())},c.prototype.normalize=function(){return this.x=this.x.redMul(this.z.redInvm()),this.z=this.curve.one,this},c.prototype.getX=function(){return this.normalize(),this.x.fromRed()}},function(e,t,r){"use strict";var n=r(42),i=r(7),o=r(4),s=r(1),a=n.base,f=i.utils.assert;function c(e){this.twisted=1!=(0|e.a),this.mOneA=this.twisted&&-1==(0|e.a),this.extended=this.mOneA,a.call(this,"edwards",e),this.a=new o(e.a,16).umod(this.red.m),this.a=this.a.toRed(this.red),this.c=new o(e.c,16).toRed(this.red),this.c2=this.c.redSqr(),this.d=new o(e.d,16).toRed(this.red),this.dd=this.d.redAdd(this.d),f(!this.twisted||0===this.c.fromRed().cmpn(1)),this.oneC=1==(0|e.c)}function u(e,t,r,n,i){a.BasePoint.call(this,e,"projective"),null===t&&null===r&&null===n?(this.x=this.curve.zero,this.y=this.curve.one,this.z=this.curve.one,this.t=this.curve.zero,this.zOne=!0):(this.x=new o(t,16),this.y=new o(r,16),this.z=n?new o(n,16):this.curve.one,this.t=i&&new o(i,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.t&&!this.t.red&&(this.t=this.t.toRed(this.curve.red)),this.zOne=this.z===this.curve.one,this.curve.extended&&!this.t&&(this.t=this.x.redMul(this.y),this.zOne||(this.t=this.t.redMul(this.z.redInvm()))))}s(c,a),e.exports=c,c.prototype._mulA=function(e){return this.mOneA?e.redNeg():this.a.redMul(e)},c.prototype._mulC=function(e){return this.oneC?e:this.c.redMul(e)},c.prototype.jpoint=function(e,t,r,n){return this.point(e,t,r,n)},c.prototype.pointFromX=function(e,t){(e=new o(e,16)).red||(e=e.toRed(this.red));var r=e.redSqr(),n=this.c2.redSub(this.a.redMul(r)),i=this.one.redSub(this.c2.redMul(this.d).redMul(r)),s=n.redMul(i.redInvm()),a=s.redSqrt();if(0!==a.redSqr().redSub(s).cmp(this.zero))throw new Error("invalid point");var f=a.fromRed().isOdd();return(t&&!f||!t&&f)&&(a=a.redNeg()),this.point(e,a)},c.prototype.pointFromY=function(e,t){(e=new o(e,16)).red||(e=e.toRed(this.red));var r=e.redSqr(),n=r.redSub(this.c2),i=r.redMul(this.d).redMul(this.c2).redSub(this.a),s=n.redMul(i.redInvm());if(0===s.cmp(this.zero)){if(t)throw new Error("invalid point");return this.point(this.zero,e)}var a=s.redSqrt();if(0!==a.redSqr().redSub(s).cmp(this.zero))throw new Error("invalid point");return a.fromRed().isOdd()!==t&&(a=a.redNeg()),this.point(a,e)},c.prototype.validate=function(e){if(e.isInfinity())return!0;e.normalize();var t=e.x.redSqr(),r=e.y.redSqr(),n=t.redMul(this.a).redAdd(r),i=this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(r)));return 0===n.cmp(i)},s(u,a.BasePoint),c.prototype.pointFromJSON=function(e){return u.fromJSON(this,e)},c.prototype.point=function(e,t,r,n){return new u(this,e,t,r,n)},u.fromJSON=function(e,t){return new u(e,t[0],t[1],t[2])},u.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},u.prototype.isInfinity=function(){return 0===this.x.cmpn(0)&&(0===this.y.cmp(this.z)||this.zOne&&0===this.y.cmp(this.curve.c))},u.prototype._extDbl=function(){var e=this.x.redSqr(),t=this.y.redSqr(),r=this.z.redSqr();r=r.redIAdd(r);var n=this.curve._mulA(e),i=this.x.redAdd(this.y).redSqr().redISub(e).redISub(t),o=n.redAdd(t),s=o.redSub(r),a=n.redSub(t),f=i.redMul(s),c=o.redMul(a),u=i.redMul(a),h=s.redMul(o);return this.curve.point(f,c,h,u)},u.prototype._projDbl=function(){var e,t,r,n=this.x.redAdd(this.y).redSqr(),i=this.x.redSqr(),o=this.y.redSqr();if(this.curve.twisted){var s=(c=this.curve._mulA(i)).redAdd(o);if(this.zOne)e=n.redSub(i).redSub(o).redMul(s.redSub(this.curve.two)),t=s.redMul(c.redSub(o)),r=s.redSqr().redSub(s).redSub(s);else{var a=this.z.redSqr(),f=s.redSub(a).redISub(a);e=n.redSub(i).redISub(o).redMul(f),t=s.redMul(c.redSub(o)),r=s.redMul(f)}}else{var c=i.redAdd(o);a=this.curve._mulC(this.z).redSqr(),f=c.redSub(a).redSub(a);e=this.curve._mulC(n.redISub(c)).redMul(f),t=this.curve._mulC(c).redMul(i.redISub(o)),r=c.redMul(f)}return this.curve.point(e,t,r)},u.prototype.dbl=function(){return this.isInfinity()?this:this.curve.extended?this._extDbl():this._projDbl()},u.prototype._extAdd=function(e){var t=this.y.redSub(this.x).redMul(e.y.redSub(e.x)),r=this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)),n=this.t.redMul(this.curve.dd).redMul(e.t),i=this.z.redMul(e.z.redAdd(e.z)),o=r.redSub(t),s=i.redSub(n),a=i.redAdd(n),f=r.redAdd(t),c=o.redMul(s),u=a.redMul(f),h=o.redMul(f),d=s.redMul(a);return this.curve.point(c,u,d,h)},u.prototype._projAdd=function(e){var t,r,n=this.z.redMul(e.z),i=n.redSqr(),o=this.x.redMul(e.x),s=this.y.redMul(e.y),a=this.curve.d.redMul(o).redMul(s),f=i.redSub(a),c=i.redAdd(a),u=this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(o).redISub(s),h=n.redMul(f).redMul(u);return this.curve.twisted?(t=n.redMul(c).redMul(s.redSub(this.curve._mulA(o))),r=f.redMul(c)):(t=n.redMul(c).redMul(s.redSub(o)),r=this.curve._mulC(f).redMul(c)),this.curve.point(h,t,r)},u.prototype.add=function(e){return this.isInfinity()?e:e.isInfinity()?this:this.curve.extended?this._extAdd(e):this._projAdd(e)},u.prototype.mul=function(e){return this._hasDoubles(e)?this.curve._fixedNafMul(this,e):this.curve._wnafMul(this,e)},u.prototype.mulAdd=function(e,t,r){return this.curve._wnafMulAdd(1,[this,t],[e,r],2,!1)},u.prototype.jmulAdd=function(e,t,r){return this.curve._wnafMulAdd(1,[this,t],[e,r],2,!0)},u.prototype.normalize=function(){if(this.zOne)return this;var e=this.z.redInvm();return this.x=this.x.redMul(e),this.y=this.y.redMul(e),this.t&&(this.t=this.t.redMul(e)),this.z=this.curve.one,this.zOne=!0,this},u.prototype.neg=function(){return this.curve.point(this.x.redNeg(),this.y,this.z,this.t&&this.t.redNeg())},u.prototype.getX=function(){return this.normalize(),this.x.fromRed()},u.prototype.getY=function(){return this.normalize(),this.y.fromRed()},u.prototype.eq=function(e){return this===e||0===this.getX().cmp(e.getX())&&0===this.getY().cmp(e.getY())},u.prototype.eqXToP=function(e){var t=e.toRed(this.curve.red).redMul(this.z);if(0===this.x.cmp(t))return!0;for(var r=e.clone(),n=this.curve.redN.redMul(this.z);;){if(r.iadd(this.curve.n),r.cmp(this.curve.p)>=0)return!1;if(t.redIAdd(n),0===this.x.cmp(t))return!0}},u.prototype.toP=u.prototype.normalize,u.prototype.mixedAdd=u.prototype.add},function(e,t,r){"use strict";var n,i=t,o=r(62),s=r(7),a=s.utils.assert;function f(e){"short"===e.type?this.curve=new s.curve.short(e):"edwards"===e.type?this.curve=new s.curve.edwards(e):this.curve=new s.curve.mont(e),this.g=this.curve.g,this.n=this.curve.n,this.hash=e.hash,a(this.g.validate(),"Invalid curve"),a(this.g.mul(this.n).isInfinity(),"Invalid curve, G*N != O")}function c(e,t){Object.defineProperty(i,e,{configurable:!0,enumerable:!0,get:function(){var r=new f(t);return Object.defineProperty(i,e,{configurable:!0,enumerable:!0,value:r}),r}})}i.PresetCurve=f,c("p192",{type:"short",prime:"p192",p:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",a:"ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",b:"64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",n:"ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",hash:o.sha256,gRed:!1,g:["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012","07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]}),c("p224",{type:"short",prime:"p224",p:"ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",a:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",b:"b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",n:"ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",hash:o.sha256,gRed:!1,g:["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21","bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]}),c("p256",{type:"short",prime:null,p:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",a:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",b:"5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",n:"ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",hash:o.sha256,gRed:!1,g:["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296","4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]}),c("p384",{type:"short",prime:null,p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",a:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",b:"b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",n:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",hash:o.sha384,gRed:!1,g:["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7","3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]}),c("p521",{type:"short",prime:null,p:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",a:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",b:"00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",n:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",hash:o.sha512,gRed:!1,g:["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66","00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]}),c("curve25519",{type:"mont",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"76d06",b:"1",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:o.sha256,gRed:!1,g:["9"]}),c("ed25519",{type:"edwards",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"-1",c:"1",d:"52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:o.sha256,gRed:!1,g:["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a","6666666666666666666666666666666666666666666666666666666666666658"]});try{n=r(177)}catch(e){n=void 0}c("secp256k1",{type:"short",prime:"k256",p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",a:"0",b:"7",n:"ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",h:"1",hash:o.sha256,beta:"7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",lambda:"5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",basis:[{a:"3086d221a7d46bcde86c90e49284eb15",b:"-e4437ed6010e88286f547fa90abfe4c3"},{a:"114ca50f7a8e2f3f657c1108d9d44cfd8",b:"3086d221a7d46bcde86c90e49284eb15"}],gRed:!1,g:["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",n]})},function(e,t,r){"use strict";t.sha1=r(172),t.sha224=r(173),t.sha256=r(94),t.sha384=r(174),t.sha512=r(95)},function(e,t,r){"use strict";var n=r(19),i=r(34),o=r(93),s=n.rotl32,a=n.sum32,f=n.sum32_5,c=o.ft_1,u=i.BlockHash,h=[1518500249,1859775393,2400959708,3395469782];function d(){if(!(this instanceof d))return new d;u.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.W=new Array(80)}n.inherits(d,u),e.exports=d,d.blockSize=512,d.outSize=160,d.hmacStrength=80,d.padLength=64,d.prototype._update=function(e,t){for(var r=this.W,n=0;n<16;n++)r[n]=e[t+n];for(;n<r.length;n++)r[n]=s(r[n-3]^r[n-8]^r[n-14]^r[n-16],1);var i=this.h[0],o=this.h[1],u=this.h[2],d=this.h[3],l=this.h[4];for(n=0;n<r.length;n++){var p=~~(n/20),b=f(s(i,5),c(p,o,u,d),l,r[n],h[p]);l=d,d=u,u=s(o,30),o=i,i=b}this.h[0]=a(this.h[0],i),this.h[1]=a(this.h[1],o),this.h[2]=a(this.h[2],u),this.h[3]=a(this.h[3],d),this.h[4]=a(this.h[4],l)},d.prototype._digest=function(e){return"hex"===e?n.toHex32(this.h,"big"):n.split32(this.h,"big")}},function(e,t,r){"use strict";var n=r(19),i=r(94);function o(){if(!(this instanceof o))return new o;i.call(this),this.h=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]}n.inherits(o,i),e.exports=o,o.blockSize=512,o.outSize=224,o.hmacStrength=192,o.padLength=64,o.prototype._digest=function(e){return"hex"===e?n.toHex32(this.h.slice(0,7),"big"):n.split32(this.h.slice(0,7),"big")}},function(e,t,r){"use strict";var n=r(19),i=r(95);function o(){if(!(this instanceof o))return new o;i.call(this),this.h=[3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]}n.inherits(o,i),e.exports=o,o.blockSize=1024,o.outSize=384,o.hmacStrength=192,o.padLength=128,o.prototype._digest=function(e){return"hex"===e?n.toHex32(this.h.slice(0,12),"big"):n.split32(this.h.slice(0,12),"big")}},function(e,t,r){"use strict";var n=r(19),i=r(34),o=n.rotl32,s=n.sum32,a=n.sum32_3,f=n.sum32_4,c=i.BlockHash;function u(){if(!(this instanceof u))return new u;c.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.endian="little"}function h(e,t,r,n){return e<=15?t^r^n:e<=31?t&r|~t&n:e<=47?(t|~r)^n:e<=63?t&n|r&~n:t^(r|~n)}function d(e){return e<=15?0:e<=31?1518500249:e<=47?1859775393:e<=63?2400959708:2840853838}function l(e){return e<=15?1352829926:e<=31?1548603684:e<=47?1836072691:e<=63?2053994217:0}n.inherits(u,c),t.ripemd160=u,u.blockSize=512,u.outSize=160,u.hmacStrength=192,u.padLength=64,u.prototype._update=function(e,t){for(var r=this.h[0],n=this.h[1],i=this.h[2],c=this.h[3],u=this.h[4],g=r,v=n,_=i,w=c,E=u,S=0;S<80;S++){var A=s(o(f(r,h(S,n,i,c),e[p[S]+t],d(S)),y[S]),u);r=u,u=c,c=o(i,10),i=n,n=A,A=s(o(f(g,h(79-S,v,_,w),e[b[S]+t],l(S)),m[S]),E),g=E,E=w,w=o(_,10),_=v,v=A}A=a(this.h[1],i,w),this.h[1]=a(this.h[2],c,E),this.h[2]=a(this.h[3],u,g),this.h[3]=a(this.h[4],r,v),this.h[4]=a(this.h[0],n,_),this.h[0]=A},u.prototype._digest=function(e){return"hex"===e?n.toHex32(this.h,"little"):n.split32(this.h,"little")};var p=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],b=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],y=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],m=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]},function(e,t,r){"use strict";var n=r(19),i=r(12);function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);this.Hash=e,this.blockSize=e.blockSize/8,this.outSize=e.outSize/8,this.inner=null,this.outer=null,this._init(n.toArray(t,r))}e.exports=o,o.prototype._init=function(e){e.length>this.blockSize&&(e=(new this.Hash).update(e).digest()),i(e.length<=this.blockSize);for(var t=e.length;t<this.blockSize;t++)e.push(0);for(t=0;t<e.length;t++)e[t]^=54;for(this.inner=(new this.Hash).update(e),t=0;t<e.length;t++)e[t]^=106;this.outer=(new this.Hash).update(e)},o.prototype.update=function(e,t){return this.inner.update(e,t),this},o.prototype.digest=function(e){return this.outer.update(this.inner.digest()),this.outer.digest(e)}},function(e,t){e.exports={doubles:{step:4,points:[["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a","f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508","11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739","d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640","4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c","4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda","96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa","5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0","cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d","9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d","e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1","9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0","5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047","10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862","283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7","7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd","56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83","7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a","53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8","bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d","4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725","7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754","4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c","17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6","6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39","c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891","893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b","febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03","2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d","eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070","7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4","e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da","662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11","1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e","efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41","2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef","67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8","db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d","648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96","35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd","ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5","9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266","40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71","34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac","c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751","1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e","493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241","c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3","be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f","4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19","aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be","b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9","6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2","8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13","7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c","ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba","2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151","e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073","d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458","38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b","69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366","d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa","40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0","620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787","7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e","ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]},naf:{wnd:7,points:[["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9","388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4","d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc","6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe","cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb","d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8","ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e","581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34","4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c","85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5","321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f","2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714","73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729","a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db","2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4","e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5","b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479","2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d","80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f","1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb","d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9","eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963","758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74","958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530","e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b","5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247","cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1","cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120","4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435","91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18","673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8","59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb","3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f","55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143","efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba","e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45","f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a","744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e","c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8","e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c","30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519","e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab","100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca","ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf","8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610","68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4","f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c","d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940","edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980","a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3","66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf","9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63","4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448","fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf","5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5","8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6","8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5","5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99","f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51","f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5","42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5","204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997","4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881","73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5","39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66","d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726","ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede","6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94","60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31","3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51","b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252","ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5","cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b","6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4","322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f","6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889","2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246","b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984","998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a","b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030","bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197","6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593","c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef","21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38","60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a","49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111","5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502","7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea","be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26","8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986","39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e","62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4","25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda","ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859","cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f","f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c","6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942","fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a","1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80","5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d","438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1","cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63","c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352","6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193","ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00","9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58","ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7","d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8","c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e","67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d","cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b","299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f","f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6","462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297","62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a","7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c","ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52","4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb","bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065","bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917","603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9","cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3","553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57","712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66","ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8","9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721","9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180","4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]}}},function(e,t,r){"use strict";var n=r(4),i=r(179),o=r(7),s=o.utils.assert,a=r(180),f=r(181);function c(e){if(!(this instanceof c))return new c(e);"string"==typeof e&&(s(o.curves.hasOwnProperty(e),"Unknown curve "+e),e=o.curves[e]),e instanceof o.curves.PresetCurve&&(e={curve:e}),this.curve=e.curve.curve,this.n=this.curve.n,this.nh=this.n.ushrn(1),this.g=this.curve.g,this.g=e.curve.g,this.g.precompute(e.curve.n.bitLength()+1),this.hash=e.hash||e.curve.hash}e.exports=c,c.prototype.keyPair=function(e){return new a(this,e)},c.prototype.keyFromPrivate=function(e,t){return a.fromPrivate(this,e,t)},c.prototype.keyFromPublic=function(e,t){return a.fromPublic(this,e,t)},c.prototype.genKeyPair=function(e){e||(e={});for(var t=new i({hash:this.hash,pers:e.pers,persEnc:e.persEnc||"utf8",entropy:e.entropy||o.rand(this.hash.hmacStrength),entropyEnc:e.entropy&&e.entropyEnc||"utf8",nonce:this.n.toArray()}),r=this.n.byteLength(),s=this.n.sub(new n(2));;){var a=new n(t.generate(r));if(!(a.cmp(s)>0))return a.iaddn(1),this.keyFromPrivate(a)}},c.prototype._truncateToN=function(e,t){var r=8*e.byteLength()-this.n.bitLength();return r>0&&(e=e.ushrn(r)),!t&&e.cmp(this.n)>=0?e.sub(this.n):e},c.prototype.sign=function(e,t,r,o){"object"==typeof r&&(o=r,r=null),o||(o={}),t=this.keyFromPrivate(t,r),e=this._truncateToN(new n(e,16));for(var s=this.n.byteLength(),a=t.getPrivate().toArray("be",s),c=e.toArray("be",s),u=new i({hash:this.hash,entropy:a,nonce:c,pers:o.pers,persEnc:o.persEnc||"utf8"}),h=this.n.sub(new n(1)),d=0;;d++){var l=o.k?o.k(d):new n(u.generate(this.n.byteLength()));if(!((l=this._truncateToN(l,!0)).cmpn(1)<=0||l.cmp(h)>=0)){var p=this.g.mul(l);if(!p.isInfinity()){var b=p.getX(),y=b.umod(this.n);if(0!==y.cmpn(0)){var m=l.invm(this.n).mul(y.mul(t.getPrivate()).iadd(e));if(0!==(m=m.umod(this.n)).cmpn(0)){var g=(p.getY().isOdd()?1:0)|(0!==b.cmp(y)?2:0);return o.canonical&&m.cmp(this.nh)>0&&(m=this.n.sub(m),g^=1),new f({r:y,s:m,recoveryParam:g})}}}}}},c.prototype.verify=function(e,t,r,i){e=this._truncateToN(new n(e,16)),r=this.keyFromPublic(r,i);var o=(t=new f(t,"hex")).r,s=t.s;if(o.cmpn(1)<0||o.cmp(this.n)>=0)return!1;if(s.cmpn(1)<0||s.cmp(this.n)>=0)return!1;var a,c=s.invm(this.n),u=c.mul(e).umod(this.n),h=c.mul(o).umod(this.n);return this.curve._maxwellTrick?!(a=this.g.jmulAdd(u,r.getPublic(),h)).isInfinity()&&a.eqXToP(o):!(a=this.g.mulAdd(u,r.getPublic(),h)).isInfinity()&&0===a.getX().umod(this.n).cmp(o)},c.prototype.recoverPubKey=function(e,t,r,i){s((3&r)===r,"The recovery param is more than two bits"),t=new f(t,i);var o=this.n,a=new n(e),c=t.r,u=t.s,h=1&r,d=r>>1;if(c.cmp(this.curve.p.umod(this.curve.n))>=0&&d)throw new Error("Unable to find sencond key candinate");c=d?this.curve.pointFromX(c.add(this.curve.n),h):this.curve.pointFromX(c,h);var l=t.r.invm(o),p=o.sub(a).mul(l).umod(o),b=u.mul(l).umod(o);return this.g.mulAdd(p,c,b)},c.prototype.getKeyRecoveryParam=function(e,t,r,n){if(null!==(t=new f(t,n)).recoveryParam)return t.recoveryParam;for(var i=0;i<4;i++){var o;try{o=this.recoverPubKey(e,t,i)}catch(e){continue}if(o.eq(r))return i}throw new Error("Unable to find valid recovery factor")}},function(e,t,r){"use strict";var n=r(62),i=r(91),o=r(12);function s(e){if(!(this instanceof s))return new s(e);this.hash=e.hash,this.predResist=!!e.predResist,this.outLen=this.hash.outSize,this.minEntropy=e.minEntropy||this.hash.hmacStrength,this._reseed=null,this.reseedInterval=null,this.K=null,this.V=null;var t=i.toArray(e.entropy,e.entropyEnc||"hex"),r=i.toArray(e.nonce,e.nonceEnc||"hex"),n=i.toArray(e.pers,e.persEnc||"hex");o(t.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._init(t,r,n)}e.exports=s,s.prototype._init=function(e,t,r){var n=e.concat(t).concat(r);this.K=new Array(this.outLen/8),this.V=new Array(this.outLen/8);for(var i=0;i<this.V.length;i++)this.K[i]=0,this.V[i]=1;this._update(n),this._reseed=1,this.reseedInterval=281474976710656},s.prototype._hmac=function(){return new n.hmac(this.hash,this.K)},s.prototype._update=function(e){var t=this._hmac().update(this.V).update([0]);e&&(t=t.update(e)),this.K=t.digest(),this.V=this._hmac().update(this.V).digest(),e&&(this.K=this._hmac().update(this.V).update([1]).update(e).digest(),this.V=this._hmac().update(this.V).digest())},s.prototype.reseed=function(e,t,r,n){"string"!=typeof t&&(n=r,r=t,t=null),e=i.toArray(e,t),r=i.toArray(r,n),o(e.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._update(e.concat(r||[])),this._reseed=1},s.prototype.generate=function(e,t,r,n){if(this._reseed>this.reseedInterval)throw new Error("Reseed is required");"string"!=typeof t&&(n=r,r=t,t=null),r&&(r=i.toArray(r,n||"hex"),this._update(r));for(var o=[];o.length<e;)this.V=this._hmac().update(this.V).digest(),o=o.concat(this.V);var s=o.slice(0,e);return this._update(r),this._reseed++,i.encode(s,t)}},function(e,t,r){"use strict";var n=r(4),i=r(7).utils.assert;function o(e,t){this.ec=e,this.priv=null,this.pub=null,t.priv&&this._importPrivate(t.priv,t.privEnc),t.pub&&this._importPublic(t.pub,t.pubEnc)}e.exports=o,o.fromPublic=function(e,t,r){return t instanceof o?t:new o(e,{pub:t,pubEnc:r})},o.fromPrivate=function(e,t,r){return t instanceof o?t:new o(e,{priv:t,privEnc:r})},o.prototype.validate=function(){var e=this.getPublic();return e.isInfinity()?{result:!1,reason:"Invalid public key"}:e.validate()?e.mul(this.ec.curve.n).isInfinity()?{result:!0,reason:null}:{result:!1,reason:"Public key * N != O"}:{result:!1,reason:"Public key is not a point"}},o.prototype.getPublic=function(e,t){return"string"==typeof e&&(t=e,e=null),this.pub||(this.pub=this.ec.g.mul(this.priv)),t?this.pub.encode(t,e):this.pub},o.prototype.getPrivate=function(e){return"hex"===e?this.priv.toString(16,2):this.priv},o.prototype._importPrivate=function(e,t){this.priv=new n(e,t||16),this.priv=this.priv.umod(this.ec.curve.n)},o.prototype._importPublic=function(e,t){if(e.x||e.y)return"mont"===this.ec.curve.type?i(e.x,"Need x coordinate"):"short"!==this.ec.curve.type&&"edwards"!==this.ec.curve.type||i(e.x&&e.y,"Need both x and y coordinate"),void(this.pub=this.ec.curve.point(e.x,e.y));this.pub=this.ec.curve.decodePoint(e,t)},o.prototype.derive=function(e){return e.mul(this.priv).getX()},o.prototype.sign=function(e,t,r){return this.ec.sign(e,this,t,r)},o.prototype.verify=function(e,t){return this.ec.verify(e,t,this)},o.prototype.inspect=function(){return"<Key priv: "+(this.priv&&this.priv.toString(16,2))+" pub: "+(this.pub&&this.pub.inspect())+" >"}},function(e,t,r){"use strict";var n=r(4),i=r(7).utils,o=i.assert;function s(e,t){if(e instanceof s)return e;this._importDER(e,t)||(o(e.r&&e.s,"Signature without r or s"),this.r=new n(e.r,16),this.s=new n(e.s,16),void 0===e.recoveryParam?this.recoveryParam=null:this.recoveryParam=e.recoveryParam)}function a(){this.place=0}function f(e,t){var r=e[t.place++];if(!(128&r))return r;for(var n=15&r,i=0,o=0,s=t.place;o<n;o++,s++)i<<=8,i|=e[s];return t.place=s,i}function c(e){for(var t=0,r=e.length-1;!e[t]&&!(128&e[t+1])&&t<r;)t++;return 0===t?e:e.slice(t)}function u(e,t){if(t<128)e.push(t);else{var r=1+(Math.log(t)/Math.LN2>>>3);for(e.push(128|r);--r;)e.push(t>>>(r<<3)&255);e.push(t)}}e.exports=s,s.prototype._importDER=function(e,t){e=i.toArray(e,t);var r=new a;if(48!==e[r.place++])return!1;if(f(e,r)+r.place!==e.length)return!1;if(2!==e[r.place++])return!1;var o=f(e,r),s=e.slice(r.place,o+r.place);if(r.place+=o,2!==e[r.place++])return!1;var c=f(e,r);if(e.length!==c+r.place)return!1;var u=e.slice(r.place,c+r.place);return 0===s[0]&&128&s[1]&&(s=s.slice(1)),0===u[0]&&128&u[1]&&(u=u.slice(1)),this.r=new n(s),this.s=new n(u),this.recoveryParam=null,!0},s.prototype.toDER=function(e){var t=this.r.toArray(),r=this.s.toArray();for(128&t[0]&&(t=[0].concat(t)),128&r[0]&&(r=[0].concat(r)),t=c(t),r=c(r);!(r[0]||128&r[1]);)r=r.slice(1);var n=[2];u(n,t.length),(n=n.concat(t)).push(2),u(n,r.length);var o=n.concat(r),s=[48];return u(s,o.length),s=s.concat(o),i.encode(s,e)}},function(e,t,r){"use strict";var n=r(62),i=r(7),o=i.utils,s=o.assert,a=o.parseBytes,f=r(183),c=r(184);function u(e){if(s("ed25519"===e,"only tested with ed25519 so far"),!(this instanceof u))return new u(e);e=i.curves[e].curve;this.curve=e,this.g=e.g,this.g.precompute(e.n.bitLength()+1),this.pointClass=e.point().constructor,this.encodingLength=Math.ceil(e.n.bitLength()/8),this.hash=n.sha512}e.exports=u,u.prototype.sign=function(e,t){e=a(e);var r=this.keyFromSecret(t),n=this.hashInt(r.messagePrefix(),e),i=this.g.mul(n),o=this.encodePoint(i),s=this.hashInt(o,r.pubBytes(),e).mul(r.priv()),f=n.add(s).umod(this.curve.n);return this.makeSignature({R:i,S:f,Rencoded:o})},u.prototype.verify=function(e,t,r){e=a(e),t=this.makeSignature(t);var n=this.keyFromPublic(r),i=this.hashInt(t.Rencoded(),n.pubBytes(),e),o=this.g.mul(t.S());return t.R().add(n.pub().mul(i)).eq(o)},u.prototype.hashInt=function(){for(var e=this.hash(),t=0;t<arguments.length;t++)e.update(arguments[t]);return o.intFromLE(e.digest()).umod(this.curve.n)},u.prototype.keyFromPublic=function(e){return f.fromPublic(this,e)},u.prototype.keyFromSecret=function(e){return f.fromSecret(this,e)},u.prototype.makeSignature=function(e){return e instanceof c?e:new c(this,e)},u.prototype.encodePoint=function(e){var t=e.getY().toArray("le",this.encodingLength);return t[this.encodingLength-1]|=e.getX().isOdd()?128:0,t},u.prototype.decodePoint=function(e){var t=(e=o.parseBytes(e)).length-1,r=e.slice(0,t).concat(-129&e[t]),n=0!=(128&e[t]),i=o.intFromLE(r);return this.curve.pointFromY(i,n)},u.prototype.encodeInt=function(e){return e.toArray("le",this.encodingLength)},u.prototype.decodeInt=function(e){return o.intFromLE(e)},u.prototype.isPoint=function(e){return e instanceof this.pointClass}},function(e,t,r){"use strict";var n=r(7).utils,i=n.assert,o=n.parseBytes,s=n.cachedProperty;function a(e,t){this.eddsa=e,this._secret=o(t.secret),e.isPoint(t.pub)?this._pub=t.pub:this._pubBytes=o(t.pub)}a.fromPublic=function(e,t){return t instanceof a?t:new a(e,{pub:t})},a.fromSecret=function(e,t){return t instanceof a?t:new a(e,{secret:t})},a.prototype.secret=function(){return this._secret},s(a,"pubBytes",function(){return this.eddsa.encodePoint(this.pub())}),s(a,"pub",function(){return this._pubBytes?this.eddsa.decodePoint(this._pubBytes):this.eddsa.g.mul(this.priv())}),s(a,"privBytes",function(){var e=this.eddsa,t=this.hash(),r=e.encodingLength-1,n=t.slice(0,e.encodingLength);return n[0]&=248,n[r]&=127,n[r]|=64,n}),s(a,"priv",function(){return this.eddsa.decodeInt(this.privBytes())}),s(a,"hash",function(){return this.eddsa.hash().update(this.secret()).digest()}),s(a,"messagePrefix",function(){return this.hash().slice(this.eddsa.encodingLength)}),a.prototype.sign=function(e){return i(this._secret,"KeyPair can only verify"),this.eddsa.sign(e,this)},a.prototype.verify=function(e,t){return this.eddsa.verify(e,t,this)},a.prototype.getSecret=function(e){return i(this._secret,"KeyPair is public only"),n.encode(this.secret(),e)},a.prototype.getPublic=function(e){return n.encode(this.pubBytes(),e)},e.exports=a},function(e,t,r){"use strict";var n=r(4),i=r(7).utils,o=i.assert,s=i.cachedProperty,a=i.parseBytes;function f(e,t){this.eddsa=e,"object"!=typeof t&&(t=a(t)),Array.isArray(t)&&(t={R:t.slice(0,e.encodingLength),S:t.slice(e.encodingLength)}),o(t.R&&t.S,"Signature without R or S"),e.isPoint(t.R)&&(this._R=t.R),t.S instanceof n&&(this._S=t.S),this._Rencoded=Array.isArray(t.R)?t.R:t.Rencoded,this._Sencoded=Array.isArray(t.S)?t.S:t.Sencoded}s(f,"S",function(){return this.eddsa.decodeInt(this.Sencoded())}),s(f,"R",function(){return this.eddsa.decodePoint(this.Rencoded())}),s(f,"Rencoded",function(){return this.eddsa.encodePoint(this.R())}),s(f,"Sencoded",function(){return this.eddsa.encodeInt(this.S())}),f.prototype.toBytes=function(){return this.Rencoded().concat(this.Sencoded())},f.prototype.toHex=function(){return i.encode(this.toBytes(),"hex").toUpperCase()},e.exports=f},function(e,t){},function(e,t,r){"use strict";var n=r(0).Buffer,i=r(187);e.exports=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.head=null,this.tail=null,this.length=0}return e.prototype.push=function(e){var t={data:e,next:null};this.length>0?this.tail.next=t:this.head=t,this.tail=t,++this.length},e.prototype.unshift=function(e){var t={data:e,next:this.head};0===this.length&&(this.tail=t),this.head=t,++this.length},e.prototype.shift=function(){if(0!==this.length){var e=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,e}},e.prototype.clear=function(){this.head=this.tail=null,this.length=0},e.prototype.join=function(e){if(0===this.length)return"";for(var t=this.head,r=""+t.data;t=t.next;)r+=e+t.data;return r},e.prototype.concat=function(e){if(0===this.length)return n.alloc(0);if(1===this.length)return this.head.data;for(var t,r,i,o=n.allocUnsafe(e>>>0),s=this.head,a=0;s;)t=s.data,r=o,i=a,t.copy(r,i),a+=s.data.length,s=s.next;return o},e}(),i&&i.inspect&&i.inspect.custom&&(e.exports.prototype[i.inspect.custom]=function(){var e=i.inspect({length:this.length});return this.constructor.name+" "+e})},function(e,t){},function(e,t,r){(function(e){var n=void 0!==e&&e||"undefined"!=typeof self&&self||window,i=Function.prototype.apply;function o(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new o(i.call(setTimeout,n,arguments),clearTimeout)},t.setInterval=function(){return new o(i.call(setInterval,n,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(n,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},r(189),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,r(11))},function(e,t,r){(function(e,t){!function(e,r){"use strict";if(!e.setImmediate){var n,i,o,s,a,f=1,c={},u=!1,h=e.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(e);d=d&&d.setTimeout?d:e,"[object process]"==={}.toString.call(e.process)?n=function(e){t.nextTick(function(){p(e)})}:!function(){if(e.postMessage&&!e.importScripts){var t=!0,r=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=r,t}}()?e.MessageChannel?((o=new MessageChannel).port1.onmessage=function(e){p(e.data)},n=function(e){o.port2.postMessage(e)}):h&&"onreadystatechange"in h.createElement("script")?(i=h.documentElement,n=function(e){var t=h.createElement("script");t.onreadystatechange=function(){p(e),t.onreadystatechange=null,i.removeChild(t),t=null},i.appendChild(t)}):n=function(e){setTimeout(p,0,e)}:(s="setImmediate$"+Math.random()+"$",a=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(s)&&p(+t.data.slice(s.length))},e.addEventListener?e.addEventListener("message",a,!1):e.attachEvent("onmessage",a),n=function(t){e.postMessage(s+t,"*")}),d.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var i={callback:e,args:t};return c[f]=i,n(f),f++},d.clearImmediate=l}function l(e){delete c[e]}function p(e){if(u)setTimeout(p,0,e);else{var t=c[e];if(t){u=!0;try{!function(e){var t=e.callback,n=e.args;switch(n.length){case 0:t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1]);break;case 3:t(n[0],n[1],n[2]);break;default:t.apply(r,n)}}(t)}finally{l(e),u=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,r(11),r(15))},function(e,t,r){(function(t){function r(e){try{if(!t.localStorage)return!1}catch(e){return!1}var r=t.localStorage[e];return null!=r&&"true"===String(r).toLowerCase()}e.exports=function(e,t){if(r("noDeprecation"))return e;var n=!1;return function(){if(!n){if(r("throwDeprecation"))throw new Error(t);r("traceDeprecation")?console.trace(t):console.warn(t),n=!0}return e.apply(this,arguments)}}}).call(this,r(11))},function(e,t,r){"use strict";e.exports=o;var n=r(100),i=r(35);function o(e){if(!(this instanceof o))return new o(e);n.call(this,e)}i.inherits=r(1),i.inherits(o,n),o.prototype._transform=function(e,t,r){r(null,e)}},function(e,t,r){e.exports=r(67)},function(e,t,r){e.exports=r(26)},function(e,t,r){e.exports=r(66).Transform},function(e,t,r){e.exports=r(66).PassThrough},function(e,t,r){var n=r(1),i=r(30),o=r(0).Buffer,s=[1518500249,1859775393,-1894007588,-899497514],a=new Array(80);function f(){this.init(),this._w=a,i.call(this,64,56)}function c(e){return e<<30|e>>>2}function u(e,t,r,n){return 0===e?t&r|~t&n:2===e?t&r|t&n|r&n:t^r^n}n(f,i),f.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},f.prototype._update=function(e){for(var t,r=this._w,n=0|this._a,i=0|this._b,o=0|this._c,a=0|this._d,f=0|this._e,h=0;h<16;++h)r[h]=e.readInt32BE(4*h);for(;h<80;++h)r[h]=r[h-3]^r[h-8]^r[h-14]^r[h-16];for(var d=0;d<80;++d){var l=~~(d/20),p=0|((t=n)<<5|t>>>27)+u(l,i,o,a)+f+r[d]+s[l];f=a,a=o,o=c(i),i=n,n=p}this._a=n+this._a|0,this._b=i+this._b|0,this._c=o+this._c|0,this._d=a+this._d|0,this._e=f+this._e|0},f.prototype._hash=function(){var e=o.allocUnsafe(20);return e.writeInt32BE(0|this._a,0),e.writeInt32BE(0|this._b,4),e.writeInt32BE(0|this._c,8),e.writeInt32BE(0|this._d,12),e.writeInt32BE(0|this._e,16),e},e.exports=f},function(e,t,r){var n=r(1),i=r(30),o=r(0).Buffer,s=[1518500249,1859775393,-1894007588,-899497514],a=new Array(80);function f(){this.init(),this._w=a,i.call(this,64,56)}function c(e){return e<<5|e>>>27}function u(e){return e<<30|e>>>2}function h(e,t,r,n){return 0===e?t&r|~t&n:2===e?t&r|t&n|r&n:t^r^n}n(f,i),f.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},f.prototype._update=function(e){for(var t,r=this._w,n=0|this._a,i=0|this._b,o=0|this._c,a=0|this._d,f=0|this._e,d=0;d<16;++d)r[d]=e.readInt32BE(4*d);for(;d<80;++d)r[d]=(t=r[d-3]^r[d-8]^r[d-14]^r[d-16])<<1|t>>>31;for(var l=0;l<80;++l){var p=~~(l/20),b=c(n)+h(p,i,o,a)+f+r[l]+s[p]|0;f=a,a=o,o=u(i),i=n,n=b}this._a=n+this._a|0,this._b=i+this._b|0,this._c=o+this._c|0,this._d=a+this._d|0,this._e=f+this._e|0},f.prototype._hash=function(){var e=o.allocUnsafe(20);return e.writeInt32BE(0|this._a,0),e.writeInt32BE(0|this._b,4),e.writeInt32BE(0|this._c,8),e.writeInt32BE(0|this._d,12),e.writeInt32BE(0|this._e,16),e},e.exports=f},function(e,t,r){var n=r(1),i=r(101),o=r(30),s=r(0).Buffer,a=new Array(64);function f(){this.init(),this._w=a,o.call(this,64,56)}n(f,i),f.prototype.init=function(){return this._a=3238371032,this._b=914150663,this._c=812702999,this._d=4144912697,this._e=4290775857,this._f=1750603025,this._g=1694076839,this._h=3204075428,this},f.prototype._hash=function(){var e=s.allocUnsafe(28);return e.writeInt32BE(this._a,0),e.writeInt32BE(this._b,4),e.writeInt32BE(this._c,8),e.writeInt32BE(this._d,12),e.writeInt32BE(this._e,16),e.writeInt32BE(this._f,20),e.writeInt32BE(this._g,24),e},e.exports=f},function(e,t,r){var n=r(1),i=r(102),o=r(30),s=r(0).Buffer,a=new Array(160);function f(){this.init(),this._w=a,o.call(this,128,112)}n(f,i),f.prototype.init=function(){return this._ah=3418070365,this._bh=1654270250,this._ch=2438529370,this._dh=355462360,this._eh=1731405415,this._fh=2394180231,this._gh=3675008525,this._hh=1203062813,this._al=3238371032,this._bl=914150663,this._cl=812702999,this._dl=4144912697,this._el=4290775857,this._fl=1750603025,this._gl=1694076839,this._hl=3204075428,this},f.prototype._hash=function(){var e=s.allocUnsafe(48);function t(t,r,n){e.writeInt32BE(t,n),e.writeInt32BE(r,n+4)}return t(this._ah,this._al,0),t(this._bh,this._bl,8),t(this._ch,this._cl,16),t(this._dh,this._dl,24),t(this._eh,this._el,32),t(this._fh,this._fl,40),e},e.exports=f},function(e,t,r){(function(t,n){var i,o=r(103),s=r(104),a=r(105),f=r(0).Buffer,c=t.crypto&&t.crypto.subtle,u={sha:"SHA-1","sha-1":"SHA-1",sha1:"SHA-1",sha256:"SHA-256","sha-256":"SHA-256",sha384:"SHA-384","sha-384":"SHA-384","sha-512":"SHA-512",sha512:"SHA-512"},h=[];function d(e,t,r,n,i){return c.importKey("raw",e,{name:"PBKDF2"},!1,["deriveBits"]).then(function(e){return c.deriveBits({name:"PBKDF2",salt:t,iterations:r,hash:{name:i}},e,n<<3)}).then(function(e){return f.from(e)})}e.exports=function(e,r,l,p,b,y){"function"==typeof b&&(y=b,b=void 0);var m=u[(b=b||"sha1").toLowerCase()];if(!m||"function"!=typeof t.Promise)return n.nextTick(function(){var t;try{t=a(e,r,l,p,b)}catch(e){return y(e)}y(null,t)});if(o(e,r,l,p),"function"!=typeof y)throw new Error("No callback provided to pbkdf2");f.isBuffer(e)||(e=f.from(e,s)),f.isBuffer(r)||(r=f.from(r,s)),function(e,t){e.then(function(e){n.nextTick(function(){t(null,e)})},function(e){n.nextTick(function(){t(e)})})}(function(e){if(t.process&&!t.process.browser)return Promise.resolve(!1);if(!c||!c.importKey||!c.deriveBits)return Promise.resolve(!1);if(void 0!==h[e])return h[e];var r=d(i=i||f.alloc(8),i,10,128,e).then(function(){return!0}).catch(function(){return!1});return h[e]=r,r}(m).then(function(t){return t?d(e,r,l,p,m):a(e,r,l,p,b)}),y)}}).call(this,r(11),r(15))},function(e){e.exports=["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act","action","actor","actress","actual","adapt","add","addict","address","adjust","admit","adult","advance","advice","aerobic","affair","afford","afraid","again","age","agent","agree","ahead","aim","air","airport","aisle","alarm","album","alcohol","alert","alien","all","alley","allow","almost","alone","alpha","already","also","alter","always","amateur","amazing","among","amount","amused","analyst","anchor","ancient","anger","angle","angry","animal","ankle","announce","annual","another","answer","antenna","antique","anxiety","any","apart","apology","appear","apple","approve","april","arch","arctic","area","arena","argue","arm","armed","armor","army","around","arrange","arrest","arrive","arrow","art","artefact","artist","artwork","ask","aspect","assault","asset","assist","assume","asthma","athlete","atom","attack","attend","attitude","attract","auction","audit","august","aunt","author","auto","autumn","average","avocado","avoid","awake","aware","away","awesome","awful","awkward","axis","baby","bachelor","bacon","badge","bag","balance","balcony","ball","bamboo","banana","banner","bar","barely","bargain","barrel","base","basic","basket","battle","beach","bean","beauty","because","become","beef","before","begin","behave","behind","believe","below","belt","bench","benefit","best","betray","better","between","beyond","bicycle","bid","bike","bind","biology","bird","birth","bitter","black","blade","blame","blanket","blast","bleak","bless","blind","blood","blossom","blouse","blue","blur","blush","board","boat","body","boil","bomb","bone","bonus","book","boost","border","boring","borrow","boss","bottom","bounce","box","boy","bracket","brain","brand","brass","brave","bread","breeze","brick","bridge","brief","bright","bring","brisk","broccoli","broken","bronze","broom","brother","brown","brush","bubble","buddy","budget","buffalo","build","bulb","bulk","bullet","bundle","bunker","burden","burger","burst","bus","business","busy","butter","buyer","buzz","cabbage","cabin","cable","cactus","cage","cake","call","calm","camera","camp","can","canal","cancel","candy","cannon","canoe","canvas","canyon","capable","capital","captain","car","carbon","card","cargo","carpet","carry","cart","case","cash","casino","castle","casual","cat","catalog","catch","category","cattle","caught","cause","caution","cave","ceiling","celery","cement","census","century","cereal","certain","chair","chalk","champion","change","chaos","chapter","charge","chase","chat","cheap","check","cheese","chef","cherry","chest","chicken","chief","child","chimney","choice","choose","chronic","chuckle","chunk","churn","cigar","cinnamon","circle","citizen","city","civil","claim","clap","clarify","claw","clay","clean","clerk","clever","click","client","cliff","climb","clinic","clip","clock","clog","close","cloth","cloud","clown","club","clump","cluster","clutch","coach","coast","coconut","code","coffee","coil","coin","collect","color","column","combine","come","comfort","comic","common","company","concert","conduct","confirm","congress","connect","consider","control","convince","cook","cool","copper","copy","coral","core","corn","correct","cost","cotton","couch","country","couple","course","cousin","cover","coyote","crack","cradle","craft","cram","crane","crash","crater","crawl","crazy","cream","credit","creek","crew","cricket","crime","crisp","critic","crop","cross","crouch","crowd","crucial","cruel","cruise","crumble","crunch","crush","cry","crystal","cube","culture","cup","cupboard","curious","current","curtain","curve","cushion","custom","cute","cycle","dad","damage","damp","dance","danger","daring","dash","daughter","dawn","day","deal","debate","debris","decade","december","decide","decline","decorate","decrease","deer","defense","define","defy","degree","delay","deliver","demand","demise","denial","dentist","deny","depart","depend","deposit","depth","deputy","derive","describe","desert","design","desk","despair","destroy","detail","detect","develop","device","devote","diagram","dial","diamond","diary","dice","diesel","diet","differ","digital","dignity","dilemma","dinner","dinosaur","direct","dirt","disagree","discover","disease","dish","dismiss","disorder","display","distance","divert","divide","divorce","dizzy","doctor","document","dog","doll","dolphin","domain","donate","donkey","donor","door","dose","double","dove","draft","dragon","drama","drastic","draw","dream","dress","drift","drill","drink","drip","drive","drop","drum","dry","duck","dumb","dune","during","dust","dutch","duty","dwarf","dynamic","eager","eagle","early","earn","earth","easily","east","easy","echo","ecology","economy","edge","edit","educate","effort","egg","eight","either","elbow","elder","electric","elegant","element","elephant","elevator","elite","else","embark","embody","embrace","emerge","emotion","employ","empower","empty","enable","enact","end","endless","endorse","enemy","energy","enforce","engage","engine","enhance","enjoy","enlist","enough","enrich","enroll","ensure","enter","entire","entry","envelope","episode","equal","equip","era","erase","erode","erosion","error","erupt","escape","essay","essence","estate","eternal","ethics","evidence","evil","evoke","evolve","exact","example","excess","exchange","excite","exclude","excuse","execute","exercise","exhaust","exhibit","exile","exist","exit","exotic","expand","expect","expire","explain","expose","express","extend","extra","eye","eyebrow","fabric","face","faculty","fade","faint","faith","fall","false","fame","family","famous","fan","fancy","fantasy","farm","fashion","fat","fatal","father","fatigue","fault","favorite","feature","february","federal","fee","feed","feel","female","fence","festival","fetch","fever","few","fiber","fiction","field","figure","file","film","filter","final","find","fine","finger","finish","fire","firm","first","fiscal","fish","fit","fitness","fix","flag","flame","flash","flat","flavor","flee","flight","flip","float","flock","floor","flower","fluid","flush","fly","foam","focus","fog","foil","fold","follow","food","foot","force","forest","forget","fork","fortune","forum","forward","fossil","foster","found","fox","fragile","frame","frequent","fresh","friend","fringe","frog","front","frost","frown","frozen","fruit","fuel","fun","funny","furnace","fury","future","gadget","gain","galaxy","gallery","game","gap","garage","garbage","garden","garlic","garment","gas","gasp","gate","gather","gauge","gaze","general","genius","genre","gentle","genuine","gesture","ghost","giant","gift","giggle","ginger","giraffe","girl","give","glad","glance","glare","glass","glide","glimpse","globe","gloom","glory","glove","glow","glue","goat","goddess","gold","good","goose","gorilla","gospel","gossip","govern","gown","grab","grace","grain","grant","grape","grass","gravity","great","green","grid","grief","grit","grocery","group","grow","grunt","guard","guess","guide","guilt","guitar","gun","gym","habit","hair","half","hammer","hamster","hand","happy","harbor","hard","harsh","harvest","hat","have","hawk","hazard","head","health","heart","heavy","hedgehog","height","hello","helmet","help","hen","hero","hidden","high","hill","hint","hip","hire","history","hobby","hockey","hold","hole","holiday","hollow","home","honey","hood","hope","horn","horror","horse","hospital","host","hotel","hour","hover","hub","huge","human","humble","humor","hundred","hungry","hunt","hurdle","hurry","hurt","husband","hybrid","ice","icon","idea","identify","idle","ignore","ill","illegal","illness","image","imitate","immense","immune","impact","impose","improve","impulse","inch","include","income","increase","index","indicate","indoor","industry","infant","inflict","inform","inhale","inherit","initial","inject","injury","inmate","inner","innocent","input","inquiry","insane","insect","inside","inspire","install","intact","interest","into","invest","invite","involve","iron","island","isolate","issue","item","ivory","jacket","jaguar","jar","jazz","jealous","jeans","jelly","jewel","job","join","joke","journey","joy","judge","juice","jump","jungle","junior","junk","just","kangaroo","keen","keep","ketchup","key","kick","kid","kidney","kind","kingdom","kiss","kit","kitchen","kite","kitten","kiwi","knee","knife","knock","know","lab","label","labor","ladder","lady","lake","lamp","language","laptop","large","later","latin","laugh","laundry","lava","law","lawn","lawsuit","layer","lazy","leader","leaf","learn","leave","lecture","left","leg","legal","legend","leisure","lemon","lend","length","lens","leopard","lesson","letter","level","liar","liberty","library","license","life","lift","light","like","limb","limit","link","lion","liquid","list","little","live","lizard","load","loan","lobster","local","lock","logic","lonely","long","loop","lottery","loud","lounge","love","loyal","lucky","luggage","lumber","lunar","lunch","luxury","lyrics","machine","mad","magic","magnet","maid","mail","main","major","make","mammal","man","manage","mandate","mango","mansion","manual","maple","marble","march","margin","marine","market","marriage","mask","mass","master","match","material","math","matrix","matter","maximum","maze","meadow","mean","measure","meat","mechanic","medal","media","melody","melt","member","memory","mention","menu","mercy","merge","merit","merry","mesh","message","metal","method","middle","midnight","milk","million","mimic","mind","minimum","minor","minute","miracle","mirror","misery","miss","mistake","mix","mixed","mixture","mobile","model","modify","mom","moment","monitor","monkey","monster","month","moon","moral","more","morning","mosquito","mother","motion","motor","mountain","mouse","move","movie","much","muffin","mule","multiply","muscle","museum","mushroom","music","must","mutual","myself","mystery","myth","naive","name","napkin","narrow","nasty","nation","nature","near","neck","need","negative","neglect","neither","nephew","nerve","nest","net","network","neutral","never","news","next","nice","night","noble","noise","nominee","noodle","normal","north","nose","notable","note","nothing","notice","novel","now","nuclear","number","nurse","nut","oak","obey","object","oblige","obscure","observe","obtain","obvious","occur","ocean","october","odor","off","offer","office","often","oil","okay","old","olive","olympic","omit","once","one","onion","online","only","open","opera","opinion","oppose","option","orange","orbit","orchard","order","ordinary","organ","orient","original","orphan","ostrich","other","outdoor","outer","output","outside","oval","oven","over","own","owner","oxygen","oyster","ozone","pact","paddle","page","pair","palace","palm","panda","panel","panic","panther","paper","parade","parent","park","parrot","party","pass","patch","path","patient","patrol","pattern","pause","pave","payment","peace","peanut","pear","peasant","pelican","pen","penalty","pencil","people","pepper","perfect","permit","person","pet","phone","photo","phrase","physical","piano","picnic","picture","piece","pig","pigeon","pill","pilot","pink","pioneer","pipe","pistol","pitch","pizza","place","planet","plastic","plate","play","please","pledge","pluck","plug","plunge","poem","poet","point","polar","pole","police","pond","pony","pool","popular","portion","position","possible","post","potato","pottery","poverty","powder","power","practice","praise","predict","prefer","prepare","present","pretty","prevent","price","pride","primary","print","priority","prison","private","prize","problem","process","produce","profit","program","project","promote","proof","property","prosper","protect","proud","provide","public","pudding","pull","pulp","pulse","pumpkin","punch","pupil","puppy","purchase","purity","purpose","purse","push","put","puzzle","pyramid","quality","quantum","quarter","question","quick","quit","quiz","quote","rabbit","raccoon","race","rack","radar","radio","rail","rain","raise","rally","ramp","ranch","random","range","rapid","rare","rate","rather","raven","raw","razor","ready","real","reason","rebel","rebuild","recall","receive","recipe","record","recycle","reduce","reflect","reform","refuse","region","regret","regular","reject","relax","release","relief","rely","remain","remember","remind","remove","render","renew","rent","reopen","repair","repeat","replace","report","require","rescue","resemble","resist","resource","response","result","retire","retreat","return","reunion","reveal","review","reward","rhythm","rib","ribbon","rice","rich","ride","ridge","rifle","right","rigid","ring","riot","ripple","risk","ritual","rival","river","road","roast","robot","robust","rocket","romance","roof","rookie","room","rose","rotate","rough","round","route","royal","rubber","rude","rug","rule","run","runway","rural","sad","saddle","sadness","safe","sail","salad","salmon","salon","salt","salute","same","sample","sand","satisfy","satoshi","sauce","sausage","save","say","scale","scan","scare","scatter","scene","scheme","school","science","scissors","scorpion","scout","scrap","screen","script","scrub","sea","search","season","seat","second","secret","section","security","seed","seek","segment","select","sell","seminar","senior","sense","sentence","series","service","session","settle","setup","seven","shadow","shaft","shallow","share","shed","shell","sheriff","shield","shift","shine","ship","shiver","shock","shoe","shoot","shop","short","shoulder","shove","shrimp","shrug","shuffle","shy","sibling","sick","side","siege","sight","sign","silent","silk","silly","silver","similar","simple","since","sing","siren","sister","situate","six","size","skate","sketch","ski","skill","skin","skirt","skull","slab","slam","sleep","slender","slice","slide","slight","slim","slogan","slot","slow","slush","small","smart","smile","smoke","smooth","snack","snake","snap","sniff","snow","soap","soccer","social","sock","soda","soft","solar","soldier","solid","solution","solve","someone","song","soon","sorry","sort","soul","sound","soup","source","south","space","spare","spatial","spawn","speak","special","speed","spell","spend","sphere","spice","spider","spike","spin","spirit","split","spoil","sponsor","spoon","sport","spot","spray","spread","spring","spy","square","squeeze","squirrel","stable","stadium","staff","stage","stairs","stamp","stand","start","state","stay","steak","steel","stem","step","stereo","stick","still","sting","stock","stomach","stone","stool","story","stove","strategy","street","strike","strong","struggle","student","stuff","stumble","style","subject","submit","subway","success","such","sudden","suffer","sugar","suggest","suit","summer","sun","sunny","sunset","super","supply","supreme","sure","surface","surge","surprise","surround","survey","suspect","sustain","swallow","swamp","swap","swarm","swear","sweet","swift","swim","swing","switch","sword","symbol","symptom","syrup","system","table","tackle","tag","tail","talent","talk","tank","tape","target","task","taste","tattoo","taxi","teach","team","tell","ten","tenant","tennis","tent","term","test","text","thank","that","theme","then","theory","there","they","thing","this","thought","three","thrive","throw","thumb","thunder","ticket","tide","tiger","tilt","timber","time","tiny","tip","tired","tissue","title","toast","tobacco","today","toddler","toe","together","toilet","token","tomato","tomorrow","tone","tongue","tonight","tool","tooth","top","topic","topple","torch","tornado","tortoise","toss","total","tourist","toward","tower","town","toy","track","trade","traffic","tragic","train","transfer","trap","trash","travel","tray","treat","tree","trend","trial","tribe","trick","trigger","trim","trip","trophy","trouble","truck","true","truly","trumpet","trust","truth","try","tube","tuition","tumble","tuna","tunnel","turkey","turn","turtle","twelve","twenty","twice","twin","twist","two","type","typical","ugly","umbrella","unable","unaware","uncle","uncover","under","undo","unfair","unfold","unhappy","uniform","unique","unit","universe","unknown","unlock","until","unusual","unveil","update","upgrade","uphold","upon","upper","upset","urban","urge","usage","use","used","useful","useless","usual","utility","vacant","vacuum","vague","valid","valley","valve","van","vanish","vapor","various","vast","vault","vehicle","velvet","vendor","venture","venue","verb","verify","version","very","vessel","veteran","viable","vibrant","vicious","victory","video","view","village","vintage","violin","virtual","virus","visa","visit","visual","vital","vivid","vocal","voice","void","volcano","volume","vote","voyage","wage","wagon","wait","walk","wall","walnut","want","warfare","warm","warrior","wash","wasp","waste","water","wave","way","wealth","weapon","wear","weasel","weather","web","wedding","weekend","weird","welcome","west","wet","whale","what","wheat","wheel","when","where","whip","whisper","wide","width","wife","wild","will","win","window","wine","wing","wink","winner","winter","wire","wisdom","wise","wish","witness","wolf","woman","wonder","wood","wool","word","work","world","worry","worth","wrap","wreck","wrestle","wrist","write","wrong","yard","year","yellow","you","young","youth","zebra","zero","zone","zoo"]},function(e,t,r){"use strict";(function(t){var n=r(108);
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */function i(e,t){if(e===t)return 0;for(var r=e.length,n=t.length,i=0,o=Math.min(r,n);i<o;++i)if(e[i]!==t[i]){r=e[i],n=t[i];break}return r<n?-1:n<r?1:0}function o(e){return t.Buffer&&"function"==typeof t.Buffer.isBuffer?t.Buffer.isBuffer(e):!(null==e||!e._isBuffer)}var s=r(203),a=Object.prototype.hasOwnProperty,f=Array.prototype.slice,c="foo"===function(){}.name;function u(e){return Object.prototype.toString.call(e)}function h(e){return!o(e)&&("function"==typeof t.ArrayBuffer&&("function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(e):!!e&&(e instanceof DataView||!!(e.buffer&&e.buffer instanceof ArrayBuffer))))}var d=e.exports=g,l=/\s*function\s+([^\(\s]*)\s*/;function p(e){if(s.isFunction(e)){if(c)return e.name;var t=e.toString().match(l);return t&&t[1]}}function b(e,t){return"string"==typeof e?e.length<t?e:e.slice(0,t):e}function y(e){if(c||!s.isFunction(e))return s.inspect(e);var t=p(e);return"[Function"+(t?": "+t:"")+"]"}function m(e,t,r,n,i){throw new d.AssertionError({message:r,actual:e,expected:t,operator:n,stackStartFunction:i})}function g(e,t){e||m(e,!0,t,"==",d.ok)}function v(e,t,r,n){if(e===t)return!0;if(o(e)&&o(t))return 0===i(e,t);if(s.isDate(e)&&s.isDate(t))return e.getTime()===t.getTime();if(s.isRegExp(e)&&s.isRegExp(t))return e.source===t.source&&e.global===t.global&&e.multiline===t.multiline&&e.lastIndex===t.lastIndex&&e.ignoreCase===t.ignoreCase;if(null!==e&&"object"==typeof e||null!==t&&"object"==typeof t){if(h(e)&&h(t)&&u(e)===u(t)&&!(e instanceof Float32Array||e instanceof Float64Array))return 0===i(new Uint8Array(e.buffer),new Uint8Array(t.buffer));if(o(e)!==o(t))return!1;var a=(n=n||{actual:[],expected:[]}).actual.indexOf(e);return-1!==a&&a===n.expected.indexOf(t)||(n.actual.push(e),n.expected.push(t),function(e,t,r,n){if(null==e||null==t)return!1;if(s.isPrimitive(e)||s.isPrimitive(t))return e===t;if(r&&Object.getPrototypeOf(e)!==Object.getPrototypeOf(t))return!1;var i=_(e),o=_(t);if(i&&!o||!i&&o)return!1;if(i)return e=f.call(e),t=f.call(t),v(e,t,r);var a,c,u=S(e),h=S(t);if(u.length!==h.length)return!1;for(u.sort(),h.sort(),c=u.length-1;c>=0;c--)if(u[c]!==h[c])return!1;for(c=u.length-1;c>=0;c--)if(a=u[c],!v(e[a],t[a],r,n))return!1;return!0}(e,t,r,n))}return r?e===t:e==t}function _(e){return"[object Arguments]"==Object.prototype.toString.call(e)}function w(e,t){if(!e||!t)return!1;if("[object RegExp]"==Object.prototype.toString.call(t))return t.test(e);try{if(e instanceof t)return!0}catch(e){}return!Error.isPrototypeOf(t)&&!0===t.call({},e)}function E(e,t,r,n){var i;if("function"!=typeof t)throw new TypeError('"block" argument must be a function');"string"==typeof r&&(n=r,r=null),i=function(e){var t;try{e()}catch(e){t=e}return t}(t),n=(r&&r.name?" ("+r.name+").":".")+(n?" "+n:"."),e&&!i&&m(i,r,"Missing expected exception"+n);var o="string"==typeof n,a=!e&&i&&!r;if((!e&&s.isError(i)&&o&&w(i,r)||a)&&m(i,r,"Got unwanted exception"+n),e&&i&&r&&!w(i,r)||!e&&i)throw i}d.AssertionError=function(e){this.name="AssertionError",this.actual=e.actual,this.expected=e.expected,this.operator=e.operator,e.message?(this.message=e.message,this.generatedMessage=!1):(this.message=function(e){return b(y(e.actual),128)+" "+e.operator+" "+b(y(e.expected),128)}(this),this.generatedMessage=!0);var t=e.stackStartFunction||m;if(Error.captureStackTrace)Error.captureStackTrace(this,t);else{var r=new Error;if(r.stack){var n=r.stack,i=p(t),o=n.indexOf("\n"+i);if(o>=0){var s=n.indexOf("\n",o+1);n=n.substring(s+1)}this.stack=n}}},s.inherits(d.AssertionError,Error),d.fail=m,d.ok=g,d.equal=function(e,t,r){e!=t&&m(e,t,r,"==",d.equal)},d.notEqual=function(e,t,r){e==t&&m(e,t,r,"!=",d.notEqual)},d.deepEqual=function(e,t,r){v(e,t,!1)||m(e,t,r,"deepEqual",d.deepEqual)},d.deepStrictEqual=function(e,t,r){v(e,t,!0)||m(e,t,r,"deepStrictEqual",d.deepStrictEqual)},d.notDeepEqual=function(e,t,r){v(e,t,!1)&&m(e,t,r,"notDeepEqual",d.notDeepEqual)},d.notDeepStrictEqual=function e(t,r,n){v(t,r,!0)&&m(t,r,n,"notDeepStrictEqual",e)},d.strictEqual=function(e,t,r){e!==t&&m(e,t,r,"===",d.strictEqual)},d.notStrictEqual=function(e,t,r){e===t&&m(e,t,r,"!==",d.notStrictEqual)},d.throws=function(e,t,r){E(!0,e,t,r)},d.doesNotThrow=function(e,t,r){E(!1,e,t,r)},d.ifError=function(e){if(e)throw e},d.strict=n(function e(t,r){t||m(t,!0,r,"==",e)},d,{equal:d.strictEqual,deepEqual:d.deepStrictEqual,notEqual:d.notStrictEqual,notDeepEqual:d.notDeepStrictEqual}),d.strict.strict=d.strict;var S=Object.keys||function(e){var t=[];for(var r in e)a.call(e,r)&&t.push(r);return t}}).call(this,r(11))},function(e,t,r){(function(e){var n=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),r={},n=0;n<t.length;n++)r[t[n]]=Object.getOwnPropertyDescriptor(e,t[n]);return r},i=/%[sdj%]/g;t.format=function(e){if(!m(e)){for(var t=[],r=0;r<arguments.length;r++)t.push(a(arguments[r]));return t.join(" ")}r=1;for(var n=arguments,o=n.length,s=String(e).replace(i,function(e){if("%%"===e)return"%";if(r>=o)return e;switch(e){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(e){return"[Circular]"}default:return e}}),f=n[r];r<o;f=n[++r])b(f)||!_(f)?s+=" "+f:s+=" "+a(f);return s},t.deprecate=function(r,n){if(void 0!==e&&!0===e.noDeprecation)return r;if(void 0===e)return function(){return t.deprecate(r,n).apply(this,arguments)};var i=!1;return function(){if(!i){if(e.throwDeprecation)throw new Error(n);e.traceDeprecation?console.trace(n):console.error(n),i=!0}return r.apply(this,arguments)}};var o,s={};function a(e,r){var n={seen:[],stylize:c};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),p(r)?n.showHidden=r:r&&t._extend(n,r),g(n.showHidden)&&(n.showHidden=!1),g(n.depth)&&(n.depth=2),g(n.colors)&&(n.colors=!1),g(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=f),u(n,e,n.depth)}function f(e,t){var r=a.styles[t];return r?"["+a.colors[r][0]+"m"+e+"["+a.colors[r][1]+"m":e}function c(e,t){return e}function u(e,r,n){if(e.customInspect&&r&&S(r.inspect)&&r.inspect!==t.inspect&&(!r.constructor||r.constructor.prototype!==r)){var i=r.inspect(n,e);return m(i)||(i=u(e,i,n)),i}var o=function(e,t){if(g(t))return e.stylize("undefined","undefined");if(m(t)){var r="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(r,"string")}if(y(t))return e.stylize(""+t,"number");if(p(t))return e.stylize(""+t,"boolean");if(b(t))return e.stylize("null","null")}(e,r);if(o)return o;var s=Object.keys(r),a=function(e){var t={};return e.forEach(function(e,r){t[e]=!0}),t}(s);if(e.showHidden&&(s=Object.getOwnPropertyNames(r)),E(r)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return h(r);if(0===s.length){if(S(r)){var f=r.name?": "+r.name:"";return e.stylize("[Function"+f+"]","special")}if(v(r))return e.stylize(RegExp.prototype.toString.call(r),"regexp");if(w(r))return e.stylize(Date.prototype.toString.call(r),"date");if(E(r))return h(r)}var c,_="",A=!1,k=["{","}"];(l(r)&&(A=!0,k=["[","]"]),S(r))&&(_=" [Function"+(r.name?": "+r.name:"")+"]");return v(r)&&(_=" "+RegExp.prototype.toString.call(r)),w(r)&&(_=" "+Date.prototype.toUTCString.call(r)),E(r)&&(_=" "+h(r)),0!==s.length||A&&0!=r.length?n<0?v(r)?e.stylize(RegExp.prototype.toString.call(r),"regexp"):e.stylize("[Object]","special"):(e.seen.push(r),c=A?function(e,t,r,n,i){for(var o=[],s=0,a=t.length;s<a;++s)I(t,String(s))?o.push(d(e,t,r,n,String(s),!0)):o.push("");return i.forEach(function(i){i.match(/^\d+$/)||o.push(d(e,t,r,n,i,!0))}),o}(e,r,n,a,s):s.map(function(t){return d(e,r,n,a,t,A)}),e.seen.pop(),function(e,t,r){if(e.reduce(function(e,t){return 0,t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60)return r[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+r[1];return r[0]+t+" "+e.join(", ")+" "+r[1]}(c,_,k)):k[0]+_+k[1]}function h(e){return"["+Error.prototype.toString.call(e)+"]"}function d(e,t,r,n,i,o){var s,a,f;if((f=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]}).get?a=f.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):f.set&&(a=e.stylize("[Setter]","special")),I(n,i)||(s="["+i+"]"),a||(e.seen.indexOf(f.value)<0?(a=b(r)?u(e,f.value,null):u(e,f.value,r-1)).indexOf("\n")>-1&&(a=o?a.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+a.split("\n").map(function(e){return"   "+e}).join("\n")):a=e.stylize("[Circular]","special")),g(s)){if(o&&i.match(/^\d+$/))return a;(s=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+a}function l(e){return Array.isArray(e)}function p(e){return"boolean"==typeof e}function b(e){return null===e}function y(e){return"number"==typeof e}function m(e){return"string"==typeof e}function g(e){return void 0===e}function v(e){return _(e)&&"[object RegExp]"===A(e)}function _(e){return"object"==typeof e&&null!==e}function w(e){return _(e)&&"[object Date]"===A(e)}function E(e){return _(e)&&("[object Error]"===A(e)||e instanceof Error)}function S(e){return"function"==typeof e}function A(e){return Object.prototype.toString.call(e)}function k(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(r){if(g(o)&&(o=e.env.NODE_DEBUG||""),r=r.toUpperCase(),!s[r])if(new RegExp("\\b"+r+"\\b","i").test(o)){var n=e.pid;s[r]=function(){var e=t.format.apply(t,arguments);console.error("%s %d: %s",r,n,e)}}else s[r]=function(){};return s[r]},t.inspect=a,a.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},a.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=l,t.isBoolean=p,t.isNull=b,t.isNullOrUndefined=function(e){return null==e},t.isNumber=y,t.isString=m,t.isSymbol=function(e){return"symbol"==typeof e},t.isUndefined=g,t.isRegExp=v,t.isObject=_,t.isDate=w,t.isError=E,t.isFunction=S,t.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},t.isBuffer=r(204);var x=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function I(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){var e,r;console.log("%s - %s",(e=new Date,r=[k(e.getHours()),k(e.getMinutes()),k(e.getSeconds())].join(":"),[e.getDate(),x[e.getMonth()],r].join(" ")),t.format.apply(t,arguments))},t.inherits=r(1),t._extend=function(e,t){if(!t||!_(t))return e;for(var r=Object.keys(t),n=r.length;n--;)e[r[n]]=t[r[n]];return e};var T="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function M(e,t){if(!e){var r=new Error("Promise was rejected with a falsy value");r.reason=e,e=r}return t(e)}t.promisify=function(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');if(T&&e[T]){var t;if("function"!=typeof(t=e[T]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,T,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var t,r,n=new Promise(function(e,n){t=e,r=n}),i=[],o=0;o<arguments.length;o++)i.push(arguments[o]);i.push(function(e,n){e?r(e):t(n)});try{e.apply(this,i)}catch(e){r(e)}return n}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),T&&Object.defineProperty(t,T,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,n(e))},t.promisify.custom=T,t.callbackify=function(t){if("function"!=typeof t)throw new TypeError('The "original" argument must be of type Function');function r(){for(var r=[],n=0;n<arguments.length;n++)r.push(arguments[n]);var i=r.pop();if("function"!=typeof i)throw new TypeError("The last argument must be of type Function");var o=this,s=function(){return i.apply(o,arguments)};t.apply(this,r).then(function(t){e.nextTick(s,null,t)},function(t){e.nextTick(M,t,s)})}return Object.setPrototypeOf(r,Object.getPrototypeOf(t)),Object.defineProperties(r,n(t)),r}}).call(this,r(15))},function(e,t){e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},function(e,t,r){"use strict";t.randomBytes=t.rng=t.pseudoRandomBytes=t.prng=r(27),t.createHash=t.Hash=r(21),t.createHmac=t.Hmac=r(109);var n=r(207),i=Object.keys(n),o=["sha1","sha224","sha256","sha384","sha512","md5","rmd160"].concat(i);t.getHashes=function(){return o};var s=r(44);t.pbkdf2=s.pbkdf2,t.pbkdf2Sync=s.pbkdf2Sync;var a=r(208);t.Cipher=a.Cipher,t.createCipher=a.createCipher,t.Cipheriv=a.Cipheriv,t.createCipheriv=a.createCipheriv,t.Decipher=a.Decipher,t.createDecipher=a.createDecipher,t.Decipheriv=a.Decipheriv,t.createDecipheriv=a.createDecipheriv,t.getCiphers=a.getCiphers,t.listCiphers=a.listCiphers;var f=r(225);t.DiffieHellmanGroup=f.DiffieHellmanGroup,t.createDiffieHellmanGroup=f.createDiffieHellmanGroup,t.getDiffieHellman=f.getDiffieHellman,t.createDiffieHellman=f.createDiffieHellman,t.DiffieHellman=f.DiffieHellman;var c=r(228);t.createSign=c.createSign,t.Sign=c.Sign,t.createVerify=c.createVerify,t.Verify=c.Verify,t.createECDH=r(244);var u=r(245);t.publicEncrypt=u.publicEncrypt,t.privateEncrypt=u.privateEncrypt,t.publicDecrypt=u.publicDecrypt,t.privateDecrypt=u.privateDecrypt;var h=r(248);t.randomFill=h.randomFill,t.randomFillSync=h.randomFillSync,t.createCredentials=function(){throw new Error(["sorry, createCredentials is not implemented yet","we accept pull requests","https://github.com/crypto-browserify/crypto-browserify"].join("\n"))},t.constants={DH_CHECK_P_NOT_SAFE_PRIME:2,DH_CHECK_P_NOT_PRIME:1,DH_UNABLE_TO_CHECK_GENERATOR:4,DH_NOT_SUITABLE_GENERATOR:8,NPN_ENABLED:1,ALPN_ENABLED:1,RSA_PKCS1_PADDING:1,RSA_SSLV23_PADDING:2,RSA_NO_PADDING:3,RSA_PKCS1_OAEP_PADDING:4,RSA_X931_PADDING:5,RSA_PKCS1_PSS_PADDING:6,POINT_CONVERSION_COMPRESSED:2,POINT_CONVERSION_UNCOMPRESSED:4,POINT_CONVERSION_HYBRID:6}},function(e,t,r){"use strict";var n=r(1),i=r(0).Buffer,o=r(22),s=i.alloc(128),a=64;function f(e,t){o.call(this,"digest"),"string"==typeof t&&(t=i.from(t)),this._alg=e,this._key=t,t.length>a?t=e(t):t.length<a&&(t=i.concat([t,s],a));for(var r=this._ipad=i.allocUnsafe(a),n=this._opad=i.allocUnsafe(a),f=0;f<a;f++)r[f]=54^t[f],n[f]=92^t[f];this._hash=[r]}n(f,o),f.prototype._update=function(e){this._hash.push(e)},f.prototype._final=function(){var e=this._alg(i.concat(this._hash));return this._alg(i.concat([this._opad,e]))},e.exports=f},function(e,t,r){e.exports=r(110)},function(e,t,r){var n=r(209),i=r(72),o=r(73),s=r(224),a=r(46);function f(e,t,r){if(e=e.toLowerCase(),o[e])return i.createCipheriv(e,t,r);if(s[e])return new n({key:t,iv:r,mode:e});throw new TypeError("invalid suite type")}function c(e,t,r){if(e=e.toLowerCase(),o[e])return i.createDecipheriv(e,t,r);if(s[e])return new n({key:t,iv:r,mode:e,decrypt:!0});throw new TypeError("invalid suite type")}t.createCipher=t.Cipher=function(e,t){var r,n;if(e=e.toLowerCase(),o[e])r=o[e].key,n=o[e].iv;else{if(!s[e])throw new TypeError("invalid suite type");r=8*s[e].key,n=s[e].iv}var i=a(t,!1,r,n);return f(e,i.key,i.iv)},t.createCipheriv=t.Cipheriv=f,t.createDecipher=t.Decipher=function(e,t){var r,n;if(e=e.toLowerCase(),o[e])r=o[e].key,n=o[e].iv;else{if(!s[e])throw new TypeError("invalid suite type");r=8*s[e].key,n=s[e].iv}var i=a(t,!1,r,n);return c(e,i.key,i.iv)},t.createDecipheriv=t.Decipheriv=c,t.listCiphers=t.getCiphers=function(){return Object.keys(s).concat(i.getCiphers())}},function(e,t,r){var n=r(22),i=r(71),o=r(1),s=r(0).Buffer,a={"des-ede3-cbc":i.CBC.instantiate(i.EDE),"des-ede3":i.EDE,"des-ede-cbc":i.CBC.instantiate(i.EDE),"des-ede":i.EDE,"des-cbc":i.CBC.instantiate(i.DES),"des-ecb":i.DES};function f(e){n.call(this);var t,r=e.mode.toLowerCase(),i=a[r];t=e.decrypt?"decrypt":"encrypt";var o=e.key;s.isBuffer(o)||(o=s.from(o)),"des-ede"!==r&&"des-ede-cbc"!==r||(o=s.concat([o,o.slice(0,8)]));var f=e.iv;s.isBuffer(f)||(f=s.from(f)),this._des=i.create({key:o,iv:f,type:t})}a.des=a["des-cbc"],a.des3=a["des-ede3-cbc"],e.exports=f,o(f,n),f.prototype._update=function(e){return s.from(this._des.update(e))},f.prototype._final=function(){return s.from(this._des.final())}},function(e,t,r){"use strict";t.readUInt32BE=function(e,t){return(e[0+t]<<24|e[1+t]<<16|e[2+t]<<8|e[3+t])>>>0},t.writeUInt32BE=function(e,t,r){e[0+r]=t>>>24,e[1+r]=t>>>16&255,e[2+r]=t>>>8&255,e[3+r]=255&t},t.ip=function(e,t,r,n){for(var i=0,o=0,s=6;s>=0;s-=2){for(var a=0;a<=24;a+=8)i<<=1,i|=t>>>a+s&1;for(a=0;a<=24;a+=8)i<<=1,i|=e>>>a+s&1}for(s=6;s>=0;s-=2){for(a=1;a<=25;a+=8)o<<=1,o|=t>>>a+s&1;for(a=1;a<=25;a+=8)o<<=1,o|=e>>>a+s&1}r[n+0]=i>>>0,r[n+1]=o>>>0},t.rip=function(e,t,r,n){for(var i=0,o=0,s=0;s<4;s++)for(var a=24;a>=0;a-=8)i<<=1,i|=t>>>a+s&1,i<<=1,i|=e>>>a+s&1;for(s=4;s<8;s++)for(a=24;a>=0;a-=8)o<<=1,o|=t>>>a+s&1,o<<=1,o|=e>>>a+s&1;r[n+0]=i>>>0,r[n+1]=o>>>0},t.pc1=function(e,t,r,n){for(var i=0,o=0,s=7;s>=5;s--){for(var a=0;a<=24;a+=8)i<<=1,i|=t>>a+s&1;for(a=0;a<=24;a+=8)i<<=1,i|=e>>a+s&1}for(a=0;a<=24;a+=8)i<<=1,i|=t>>a+s&1;for(s=1;s<=3;s++){for(a=0;a<=24;a+=8)o<<=1,o|=t>>a+s&1;for(a=0;a<=24;a+=8)o<<=1,o|=e>>a+s&1}for(a=0;a<=24;a+=8)o<<=1,o|=e>>a+s&1;r[n+0]=i>>>0,r[n+1]=o>>>0},t.r28shl=function(e,t){return e<<t&268435455|e>>>28-t};var n=[14,11,17,4,27,23,25,0,13,22,7,18,5,9,16,24,2,20,12,21,1,8,15,26,15,4,25,19,9,1,26,16,5,11,23,8,12,7,17,0,22,3,10,14,6,20,27,24];t.pc2=function(e,t,r,i){for(var o=0,s=0,a=n.length>>>1,f=0;f<a;f++)o<<=1,o|=e>>>n[f]&1;for(f=a;f<n.length;f++)s<<=1,s|=t>>>n[f]&1;r[i+0]=o>>>0,r[i+1]=s>>>0},t.expand=function(e,t,r){var n=0,i=0;n=(1&e)<<5|e>>>27;for(var o=23;o>=15;o-=4)n<<=6,n|=e>>>o&63;for(o=11;o>=3;o-=4)i|=e>>>o&63,i<<=6;i|=(31&e)<<1|e>>>31,t[r+0]=n>>>0,t[r+1]=i>>>0};var i=[14,0,4,15,13,7,1,4,2,14,15,2,11,13,8,1,3,10,10,6,6,12,12,11,5,9,9,5,0,3,7,8,4,15,1,12,14,8,8,2,13,4,6,9,2,1,11,7,15,5,12,11,9,3,7,14,3,10,10,0,5,6,0,13,15,3,1,13,8,4,14,7,6,15,11,2,3,8,4,14,9,12,7,0,2,1,13,10,12,6,0,9,5,11,10,5,0,13,14,8,7,10,11,1,10,3,4,15,13,4,1,2,5,11,8,6,12,7,6,12,9,0,3,5,2,14,15,9,10,13,0,7,9,0,14,9,6,3,3,4,15,6,5,10,1,2,13,8,12,5,7,14,11,12,4,11,2,15,8,1,13,1,6,10,4,13,9,0,8,6,15,9,3,8,0,7,11,4,1,15,2,14,12,3,5,11,10,5,14,2,7,12,7,13,13,8,14,11,3,5,0,6,6,15,9,0,10,3,1,4,2,7,8,2,5,12,11,1,12,10,4,14,15,9,10,3,6,15,9,0,0,6,12,10,11,1,7,13,13,8,15,9,1,4,3,5,14,11,5,12,2,7,8,2,4,14,2,14,12,11,4,2,1,12,7,4,10,7,11,13,6,1,8,5,5,0,3,15,15,10,13,3,0,9,14,8,9,6,4,11,2,8,1,12,11,7,10,1,13,14,7,2,8,13,15,6,9,15,12,0,5,9,6,10,3,4,0,5,14,3,12,10,1,15,10,4,15,2,9,7,2,12,6,9,8,5,0,6,13,1,3,13,4,14,14,0,7,11,5,3,11,8,9,4,14,3,15,2,5,12,2,9,8,5,12,15,3,10,7,11,0,14,4,1,10,7,1,6,13,0,11,8,6,13,4,13,11,0,2,11,14,7,15,4,0,9,8,1,13,10,3,14,12,3,9,5,7,12,5,2,10,15,6,8,1,6,1,6,4,11,11,13,13,8,12,1,3,4,7,10,14,7,10,9,15,5,6,0,8,15,0,14,5,2,9,3,2,12,13,1,2,15,8,13,4,8,6,10,15,3,11,7,1,4,10,12,9,5,3,6,14,11,5,0,0,14,12,9,7,2,7,2,11,1,4,14,1,7,9,4,12,10,14,8,2,13,0,15,6,12,10,9,13,0,15,3,3,5,5,6,8,11];t.substitute=function(e,t){for(var r=0,n=0;n<4;n++){r<<=4,r|=i[64*n+(e>>>18-6*n&63)]}for(n=0;n<4;n++){r<<=4,r|=i[256+64*n+(t>>>18-6*n&63)]}return r>>>0};var o=[16,25,12,11,3,20,4,15,31,17,9,6,27,14,1,22,30,24,8,18,0,5,29,23,13,19,2,26,10,21,28,7];t.permute=function(e){for(var t=0,r=0;r<o.length;r++)t<<=1,t|=e>>>o[r]&1;return t>>>0},t.padSplit=function(e,t,r){for(var n=e.toString(2);n.length<t;)n="0"+n;for(var i=[],o=0;o<t;o+=r)i.push(n.slice(o,o+r));return i.join(" ")}},function(e,t,r){"use strict";var n=r(12);function i(e){this.options=e,this.type=this.options.type,this.blockSize=8,this._init(),this.buffer=new Array(this.blockSize),this.bufferOff=0}e.exports=i,i.prototype._init=function(){},i.prototype.update=function(e){return 0===e.length?[]:"decrypt"===this.type?this._updateDecrypt(e):this._updateEncrypt(e)},i.prototype._buffer=function(e,t){for(var r=Math.min(this.buffer.length-this.bufferOff,e.length-t),n=0;n<r;n++)this.buffer[this.bufferOff+n]=e[t+n];return this.bufferOff+=r,r},i.prototype._flushBuffer=function(e,t){return this._update(this.buffer,0,e,t),this.bufferOff=0,this.blockSize},i.prototype._updateEncrypt=function(e){var t=0,r=0,n=(this.bufferOff+e.length)/this.blockSize|0,i=new Array(n*this.blockSize);0!==this.bufferOff&&(t+=this._buffer(e,t),this.bufferOff===this.buffer.length&&(r+=this._flushBuffer(i,r)));for(var o=e.length-(e.length-t)%this.blockSize;t<o;t+=this.blockSize)this._update(e,t,i,r),r+=this.blockSize;for(;t<e.length;t++,this.bufferOff++)this.buffer[this.bufferOff]=e[t];return i},i.prototype._updateDecrypt=function(e){for(var t=0,r=0,n=Math.ceil((this.bufferOff+e.length)/this.blockSize)-1,i=new Array(n*this.blockSize);n>0;n--)t+=this._buffer(e,t),r+=this._flushBuffer(i,r);return t+=this._buffer(e,t),i},i.prototype.final=function(e){var t,r;return e&&(t=this.update(e)),r="encrypt"===this.type?this._finalEncrypt():this._finalDecrypt(),t?t.concat(r):r},i.prototype._pad=function(e,t){if(0===t)return!1;for(;t<e.length;)e[t++]=0;return!0},i.prototype._finalEncrypt=function(){if(!this._pad(this.buffer,this.bufferOff))return[];var e=new Array(this.blockSize);return this._update(this.buffer,0,e,0),e},i.prototype._unpad=function(e){return e},i.prototype._finalDecrypt=function(){n.equal(this.bufferOff,this.blockSize,"Not enough data to decrypt");var e=new Array(this.blockSize);return this._flushBuffer(e,0),this._unpad(e)}},function(e,t,r){"use strict";var n=r(12),i=r(1),o=r(71),s=o.utils,a=o.Cipher;function f(){this.tmp=new Array(2),this.keys=null}function c(e){a.call(this,e);var t=new f;this._desState=t,this.deriveKeys(t,e.key)}i(c,a),e.exports=c,c.create=function(e){return new c(e)};var u=[1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];c.prototype.deriveKeys=function(e,t){e.keys=new Array(32),n.equal(t.length,this.blockSize,"Invalid key length");var r=s.readUInt32BE(t,0),i=s.readUInt32BE(t,4);s.pc1(r,i,e.tmp,0),r=e.tmp[0],i=e.tmp[1];for(var o=0;o<e.keys.length;o+=2){var a=u[o>>>1];r=s.r28shl(r,a),i=s.r28shl(i,a),s.pc2(r,i,e.keys,o)}},c.prototype._update=function(e,t,r,n){var i=this._desState,o=s.readUInt32BE(e,t),a=s.readUInt32BE(e,t+4);s.ip(o,a,i.tmp,0),o=i.tmp[0],a=i.tmp[1],"encrypt"===this.type?this._encrypt(i,o,a,i.tmp,0):this._decrypt(i,o,a,i.tmp,0),o=i.tmp[0],a=i.tmp[1],s.writeUInt32BE(r,o,n),s.writeUInt32BE(r,a,n+4)},c.prototype._pad=function(e,t){for(var r=e.length-t,n=t;n<e.length;n++)e[n]=r;return!0},c.prototype._unpad=function(e){for(var t=e[e.length-1],r=e.length-t;r<e.length;r++)n.equal(e[r],t);return e.slice(0,e.length-t)},c.prototype._encrypt=function(e,t,r,n,i){for(var o=t,a=r,f=0;f<e.keys.length;f+=2){var c=e.keys[f],u=e.keys[f+1];s.expand(a,e.tmp,0),c^=e.tmp[0],u^=e.tmp[1];var h=s.substitute(c,u),d=a;a=(o^s.permute(h))>>>0,o=d}s.rip(a,o,n,i)},c.prototype._decrypt=function(e,t,r,n,i){for(var o=r,a=t,f=e.keys.length-2;f>=0;f-=2){var c=e.keys[f],u=e.keys[f+1];s.expand(o,e.tmp,0),c^=e.tmp[0],u^=e.tmp[1];var h=s.substitute(c,u),d=o;o=(a^s.permute(h))>>>0,a=d}s.rip(o,a,n,i)}},function(e,t,r){"use strict";var n=r(12),i=r(1),o={};function s(e){n.equal(e.length,8,"Invalid IV length"),this.iv=new Array(8);for(var t=0;t<this.iv.length;t++)this.iv[t]=e[t]}t.instantiate=function(e){function t(t){e.call(this,t),this._cbcInit()}i(t,e);for(var r=Object.keys(o),n=0;n<r.length;n++){var s=r[n];t.prototype[s]=o[s]}return t.create=function(e){return new t(e)},t},o._cbcInit=function(){var e=new s(this.options.iv);this._cbcState=e},o._update=function(e,t,r,n){var i=this._cbcState,o=this.constructor.super_.prototype,s=i.iv;if("encrypt"===this.type){for(var a=0;a<this.blockSize;a++)s[a]^=e[t+a];o._update.call(this,s,0,r,n);for(a=0;a<this.blockSize;a++)s[a]=r[n+a]}else{o._update.call(this,e,t,r,n);for(a=0;a<this.blockSize;a++)r[n+a]^=s[a];for(a=0;a<this.blockSize;a++)s[a]=e[t+a]}}},function(e,t,r){"use strict";var n=r(12),i=r(1),o=r(71),s=o.Cipher,a=o.DES;function f(e,t){n.equal(t.length,24,"Invalid key length");var r=t.slice(0,8),i=t.slice(8,16),o=t.slice(16,24);this.ciphers="encrypt"===e?[a.create({type:"encrypt",key:r}),a.create({type:"decrypt",key:i}),a.create({type:"encrypt",key:o})]:[a.create({type:"decrypt",key:o}),a.create({type:"encrypt",key:i}),a.create({type:"decrypt",key:r})]}function c(e){s.call(this,e);var t=new f(this.type,this.options.key);this._edeState=t}i(c,s),e.exports=c,c.create=function(e){return new c(e)},c.prototype._update=function(e,t,r,n){var i=this._edeState;i.ciphers[0]._update(e,t,r,n),i.ciphers[1]._update(r,n,r,n),i.ciphers[2]._update(r,n,r,n)},c.prototype._pad=a.prototype._pad,c.prototype._unpad=a.prototype._unpad},function(e,t,r){var n=r(73),i=r(114),o=r(0).Buffer,s=r(115),a=r(22),f=r(45),c=r(46);function u(e,t,r){a.call(this),this._cache=new d,this._cipher=new f.AES(t),this._prev=o.from(r),this._mode=e,this._autopadding=!0}r(1)(u,a),u.prototype._update=function(e){var t,r;this._cache.add(e);for(var n=[];t=this._cache.get();)r=this._mode.encrypt(this,t),n.push(r);return o.concat(n)};var h=o.alloc(16,16);function d(){this.cache=o.allocUnsafe(0)}function l(e,t,r){var a=n[e.toLowerCase()];if(!a)throw new TypeError("invalid suite type");if("string"==typeof t&&(t=o.from(t)),t.length!==a.key/8)throw new TypeError("invalid key length "+t.length);if("string"==typeof r&&(r=o.from(r)),"GCM"!==a.mode&&r.length!==a.iv)throw new TypeError("invalid iv length "+r.length);return"stream"===a.type?new s(a.module,t,r):"auth"===a.type?new i(a.module,t,r):new u(a.module,t,r)}u.prototype._final=function(){var e=this._cache.flush();if(this._autopadding)return e=this._mode.encrypt(this,e),this._cipher.scrub(),e;if(!e.equals(h))throw this._cipher.scrub(),new Error("data not multiple of block length")},u.prototype.setAutoPadding=function(e){return this._autopadding=!!e,this},d.prototype.add=function(e){this.cache=o.concat([this.cache,e])},d.prototype.get=function(){if(this.cache.length>15){var e=this.cache.slice(0,16);return this.cache=this.cache.slice(16),e}return null},d.prototype.flush=function(){for(var e=16-this.cache.length,t=o.allocUnsafe(e),r=-1;++r<e;)t.writeUInt8(e,r);return o.concat([this.cache,t])},t.createCipheriv=l,t.createCipher=function(e,t){var r=n[e.toLowerCase()];if(!r)throw new TypeError("invalid suite type");var i=c(t,!1,r.key,r.iv);return l(e,i.key,i.iv)}},function(e,t){t.encrypt=function(e,t){return e._cipher.encryptBlock(t)},t.decrypt=function(e,t){return e._cipher.decryptBlock(t)}},function(e,t,r){var n=r(36);t.encrypt=function(e,t){var r=n(t,e._prev);return e._prev=e._cipher.encryptBlock(r),e._prev},t.decrypt=function(e,t){var r=e._prev;e._prev=t;var i=e._cipher.decryptBlock(t);return n(i,r)}},function(e,t,r){var n=r(0).Buffer,i=r(36);function o(e,t,r){var o=t.length,s=i(t,e._cache);return e._cache=e._cache.slice(o),e._prev=n.concat([e._prev,r?t:s]),s}t.encrypt=function(e,t,r){for(var i,s=n.allocUnsafe(0);t.length;){if(0===e._cache.length&&(e._cache=e._cipher.encryptBlock(e._prev),e._prev=n.allocUnsafe(0)),!(e._cache.length<=t.length)){s=n.concat([s,o(e,t,r)]);break}i=e._cache.length,s=n.concat([s,o(e,t.slice(0,i),r)]),t=t.slice(i)}return s}},function(e,t,r){var n=r(0).Buffer;function i(e,t,r){var i=e._cipher.encryptBlock(e._prev)[0]^t;return e._prev=n.concat([e._prev.slice(1),n.from([r?t:i])]),i}t.encrypt=function(e,t,r){for(var o=t.length,s=n.allocUnsafe(o),a=-1;++a<o;)s[a]=i(e,t[a],r);return s}},function(e,t,r){var n=r(0).Buffer;function i(e,t,r){for(var n,i,s=-1,a=0;++s<8;)n=t&1<<7-s?128:0,a+=(128&(i=e._cipher.encryptBlock(e._prev)[0]^n))>>s%8,e._prev=o(e._prev,r?n:i);return a}function o(e,t){var r=e.length,i=-1,o=n.allocUnsafe(e.length);for(e=n.concat([e,n.from([t])]);++i<r;)o[i]=e[i]<<1|e[i+1]>>7;return o}t.encrypt=function(e,t,r){for(var o=t.length,s=n.allocUnsafe(o),a=-1;++a<o;)s[a]=i(e,t[a],r);return s}},function(e,t,r){(function(e){var n=r(36);function i(e){return e._prev=e._cipher.encryptBlock(e._prev),e._prev}t.encrypt=function(t,r){for(;t._cache.length<r.length;)t._cache=e.concat([t._cache,i(t)]);var o=t._cache.slice(0,r.length);return t._cache=t._cache.slice(r.length),n(r,o)}}).call(this,r(2).Buffer)},function(e,t,r){var n=r(0).Buffer,i=n.alloc(16,0);function o(e){var t=n.allocUnsafe(16);return t.writeUInt32BE(e[0]>>>0,0),t.writeUInt32BE(e[1]>>>0,4),t.writeUInt32BE(e[2]>>>0,8),t.writeUInt32BE(e[3]>>>0,12),t}function s(e){this.h=e,this.state=n.alloc(16,0),this.cache=n.allocUnsafe(0)}s.prototype.ghash=function(e){for(var t=-1;++t<e.length;)this.state[t]^=e[t];this._multiply()},s.prototype._multiply=function(){for(var e,t,r,n=[(e=this.h).readUInt32BE(0),e.readUInt32BE(4),e.readUInt32BE(8),e.readUInt32BE(12)],i=[0,0,0,0],s=-1;++s<128;){for(0!=(this.state[~~(s/8)]&1<<7-s%8)&&(i[0]^=n[0],i[1]^=n[1],i[2]^=n[2],i[3]^=n[3]),r=0!=(1&n[3]),t=3;t>0;t--)n[t]=n[t]>>>1|(1&n[t-1])<<31;n[0]=n[0]>>>1,r&&(n[0]=n[0]^225<<24)}this.state=o(i)},s.prototype.update=function(e){var t;for(this.cache=n.concat([this.cache,e]);this.cache.length>=16;)t=this.cache.slice(0,16),this.cache=this.cache.slice(16),this.ghash(t)},s.prototype.final=function(e,t){return this.cache.length&&this.ghash(n.concat([this.cache,i],16)),this.ghash(o([0,e,0,t])),this.state},e.exports=s},function(e,t,r){var n=r(114),i=r(0).Buffer,o=r(73),s=r(115),a=r(22),f=r(45),c=r(46);function u(e,t,r){a.call(this),this._cache=new h,this._last=void 0,this._cipher=new f.AES(t),this._prev=i.from(r),this._mode=e,this._autopadding=!0}function h(){this.cache=i.allocUnsafe(0)}function d(e,t,r){var a=o[e.toLowerCase()];if(!a)throw new TypeError("invalid suite type");if("string"==typeof r&&(r=i.from(r)),"GCM"!==a.mode&&r.length!==a.iv)throw new TypeError("invalid iv length "+r.length);if("string"==typeof t&&(t=i.from(t)),t.length!==a.key/8)throw new TypeError("invalid key length "+t.length);return"stream"===a.type?new s(a.module,t,r,!0):"auth"===a.type?new n(a.module,t,r,!0):new u(a.module,t,r)}r(1)(u,a),u.prototype._update=function(e){var t,r;this._cache.add(e);for(var n=[];t=this._cache.get(this._autopadding);)r=this._mode.decrypt(this,t),n.push(r);return i.concat(n)},u.prototype._final=function(){var e=this._cache.flush();if(this._autopadding)return function(e){var t=e[15];if(t<1||t>16)throw new Error("unable to decrypt data");var r=-1;for(;++r<t;)if(e[r+(16-t)]!==t)throw new Error("unable to decrypt data");if(16===t)return;return e.slice(0,16-t)}(this._mode.decrypt(this,e));if(e)throw new Error("data not multiple of block length")},u.prototype.setAutoPadding=function(e){return this._autopadding=!!e,this},h.prototype.add=function(e){this.cache=i.concat([this.cache,e])},h.prototype.get=function(e){var t;if(e){if(this.cache.length>16)return t=this.cache.slice(0,16),this.cache=this.cache.slice(16),t}else if(this.cache.length>=16)return t=this.cache.slice(0,16),this.cache=this.cache.slice(16),t;return null},h.prototype.flush=function(){if(this.cache.length)return this.cache},t.createDecipher=function(e,t){var r=o[e.toLowerCase()];if(!r)throw new TypeError("invalid suite type");var n=c(t,!1,r.key,r.iv);return d(e,n.key,n.iv)},t.createDecipheriv=d},function(e,t){t["des-ecb"]={key:8,iv:0},t["des-cbc"]=t.des={key:8,iv:8},t["des-ede3-cbc"]=t.des3={key:24,iv:8},t["des-ede3"]={key:24,iv:0},t["des-ede-cbc"]={key:16,iv:8},t["des-ede"]={key:16,iv:0}},function(e,t,r){(function(e){var n=r(116),i=r(226),o=r(227);var s={binary:!0,hex:!0,base64:!0};t.DiffieHellmanGroup=t.createDiffieHellmanGroup=t.getDiffieHellman=function(t){var r=new e(i[t].prime,"hex"),n=new e(i[t].gen,"hex");return new o(r,n)},t.createDiffieHellman=t.DiffieHellman=function t(r,i,a,f){return e.isBuffer(i)||void 0===s[i]?t(r,"binary",i,a):(i=i||"binary",f=f||"binary",a=a||new e([2]),e.isBuffer(a)||(a=new e(a,f)),"number"==typeof r?new o(n(r,a),a,!0):(e.isBuffer(r)||(r=new e(r,i)),new o(r,a,!0)))}}).call(this,r(2).Buffer)},function(e){e.exports={modp1:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},modp2:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},modp5:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},modp14:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},modp15:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},modp16:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},modp17:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},modp18:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}},function(e,t,r){(function(t){var n=r(4),i=new(r(117)),o=new n(24),s=new n(11),a=new n(10),f=new n(3),c=new n(7),u=r(116),h=r(27);function d(e,r){return r=r||"utf8",t.isBuffer(e)||(e=new t(e,r)),this._pub=new n(e),this}function l(e,r){return r=r||"utf8",t.isBuffer(e)||(e=new t(e,r)),this._priv=new n(e),this}e.exports=b;var p={};function b(e,t,r){this.setGenerator(t),this.__prime=new n(e),this._prime=n.mont(this.__prime),this._primeLen=e.length,this._pub=void 0,this._priv=void 0,this._primeCode=void 0,r?(this.setPublicKey=d,this.setPrivateKey=l):this._primeCode=8}function y(e,r){var n=new t(e.toArray());return r?n.toString(r):n}Object.defineProperty(b.prototype,"verifyError",{enumerable:!0,get:function(){return"number"!=typeof this._primeCode&&(this._primeCode=function(e,t){var r=t.toString("hex"),n=[r,e.toString(16)].join("_");if(n in p)return p[n];var h,d=0;if(e.isEven()||!u.simpleSieve||!u.fermatTest(e)||!i.test(e))return d+=1,d+="02"===r||"05"===r?8:4,p[n]=d,d;switch(i.test(e.shrn(1))||(d+=2),r){case"02":e.mod(o).cmp(s)&&(d+=8);break;case"05":(h=e.mod(a)).cmp(f)&&h.cmp(c)&&(d+=8);break;default:d+=4}return p[n]=d,d}(this.__prime,this.__gen)),this._primeCode}}),b.prototype.generateKeys=function(){return this._priv||(this._priv=new n(h(this._primeLen))),this._pub=this._gen.toRed(this._prime).redPow(this._priv).fromRed(),this.getPublicKey()},b.prototype.computeSecret=function(e){var r=(e=(e=new n(e)).toRed(this._prime)).redPow(this._priv).fromRed(),i=new t(r.toArray()),o=this.getPrime();if(i.length<o.length){var s=new t(o.length-i.length);s.fill(0),i=t.concat([s,i])}return i},b.prototype.getPublicKey=function(e){return y(this._pub,e)},b.prototype.getPrivateKey=function(e){return y(this._priv,e)},b.prototype.getPrime=function(e){return y(this.__prime,e)},b.prototype.getGenerator=function(e){return y(this._gen,e)},b.prototype.setGenerator=function(e,r){return r=r||"utf8",t.isBuffer(e)||(e=new t(e,r)),this.__gen=e,this._gen=new n(e),this}}).call(this,r(2).Buffer)},function(e,t,r){(function(t){var n=r(21),i=r(64),o=r(1),s=r(229),a=r(243),f=r(110);function c(e){i.Writable.call(this);var t=f[e];if(!t)throw new Error("Unknown message digest");this._hashType=t.hash,this._hash=n(t.hash),this._tag=t.id,this._signType=t.sign}function u(e){i.Writable.call(this);var t=f[e];if(!t)throw new Error("Unknown message digest");this._hash=n(t.hash),this._tag=t.id,this._signType=t.sign}function h(e){return new c(e)}function d(e){return new u(e)}Object.keys(f).forEach(function(e){f[e].id=new t(f[e].id,"hex"),f[e.toLowerCase()]=f[e]}),o(c,i.Writable),c.prototype._write=function(e,t,r){this._hash.update(e),r()},c.prototype.update=function(e,r){return"string"==typeof e&&(e=new t(e,r)),this._hash.update(e),this},c.prototype.sign=function(e,t){this.end();var r=this._hash.digest(),n=s(r,e,this._hashType,this._signType,this._tag);return t?n.toString(t):n},o(u,i.Writable),u.prototype._write=function(e,t,r){this._hash.update(e),r()},u.prototype.update=function(e,r){return"string"==typeof e&&(e=new t(e,r)),this._hash.update(e),this},u.prototype.verify=function(e,r,n){"string"==typeof r&&(r=new t(r,n)),this.end();var i=this._hash.digest();return a(r,i,e,this._signType,this._tag)},e.exports={Sign:h,Verify:d,createSign:h,createVerify:d}}).call(this,r(2).Buffer)},function(e,t,r){(function(t){var n=r(109),i=r(74),o=r(7).ec,s=r(4),a=r(47),f=r(122);function c(e,r,i,o){if((e=new t(e.toArray())).length<r.byteLength()){var s=new t(r.byteLength()-e.length);s.fill(0),e=t.concat([s,e])}var a=i.length,f=function(e,r){e=(e=u(e,r)).mod(r);var n=new t(e.toArray());if(n.length<r.byteLength()){var i=new t(r.byteLength()-n.length);i.fill(0),n=t.concat([i,n])}return n}(i,r),c=new t(a);c.fill(1);var h=new t(a);return h.fill(0),h=n(o,h).update(c).update(new t([0])).update(e).update(f).digest(),c=n(o,h).update(c).digest(),{k:h=n(o,h).update(c).update(new t([1])).update(e).update(f).digest(),v:c=n(o,h).update(c).digest()}}function u(e,t){var r=new s(e),n=(e.length<<3)-t.bitLength();return n>0&&r.ishrn(n),r}function h(e,r,i){var o,s;do{for(o=new t(0);8*o.length<e.bitLength();)r.v=n(i,r.k).update(r.v).digest(),o=t.concat([o,r.v]);s=u(o,e),r.k=n(i,r.k).update(r.v).update(new t([0])).digest(),r.v=n(i,r.k).update(r.v).digest()}while(-1!==s.cmp(e));return s}function d(e,t,r,n){return e.toRed(s.mont(r)).redPow(t).fromRed().mod(n)}e.exports=function(e,r,n,l,p){var b=a(r);if(b.curve){if("ecdsa"!==l&&"ecdsa/rsa"!==l)throw new Error("wrong private key type");return function(e,r){var n=f[r.curve.join(".")];if(!n)throw new Error("unknown curve "+r.curve.join("."));var i=new o(n).keyFromPrivate(r.privateKey).sign(e);return new t(i.toDER())}(e,b)}if("dsa"===b.type){if("dsa"!==l)throw new Error("wrong private key type");return function(e,r,n){for(var i,o=r.params.priv_key,a=r.params.p,f=r.params.q,l=r.params.g,p=new s(0),b=u(e,f).mod(f),y=!1,m=c(o,f,e,n);!1===y;)i=h(f,m,n),p=d(l,i,a,f),0===(y=i.invm(f).imul(b.add(o.mul(p))).mod(f)).cmpn(0)&&(y=!1,p=new s(0));return function(e,r){e=e.toArray(),r=r.toArray(),128&e[0]&&(e=[0].concat(e)),128&r[0]&&(r=[0].concat(r));var n=[48,e.length+r.length+4,2,e.length];return n=n.concat(e,[2,r.length],r),new t(n)}(p,y)}(e,b,n)}if("rsa"!==l&&"ecdsa/rsa"!==l)throw new Error("wrong private key type");e=t.concat([p,e]);for(var y=b.modulus.byteLength(),m=[0,1];e.length+m.length+1<y;)m.push(255);m.push(0);for(var g=-1;++g<e.length;)m.push(e[g]);return i(m,b)},e.exports.getKey=c,e.exports.makeKey=h}).call(this,r(2).Buffer)},function(e,t,r){"use strict";var n=r(37);t.certificate=r(240);var i=n.define("RSAPrivateKey",function(){this.seq().obj(this.key("version").int(),this.key("modulus").int(),this.key("publicExponent").int(),this.key("privateExponent").int(),this.key("prime1").int(),this.key("prime2").int(),this.key("exponent1").int(),this.key("exponent2").int(),this.key("coefficient").int())});t.RSAPrivateKey=i;var o=n.define("RSAPublicKey",function(){this.seq().obj(this.key("modulus").int(),this.key("publicExponent").int())});t.RSAPublicKey=o;var s=n.define("SubjectPublicKeyInfo",function(){this.seq().obj(this.key("algorithm").use(a),this.key("subjectPublicKey").bitstr())});t.PublicKey=s;var a=n.define("AlgorithmIdentifier",function(){this.seq().obj(this.key("algorithm").objid(),this.key("none").null_().optional(),this.key("curve").objid().optional(),this.key("params").seq().obj(this.key("p").int(),this.key("q").int(),this.key("g").int()).optional())}),f=n.define("PrivateKeyInfo",function(){this.seq().obj(this.key("version").int(),this.key("algorithm").use(a),this.key("subjectPrivateKey").octstr())});t.PrivateKey=f;var c=n.define("EncryptedPrivateKeyInfo",function(){this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(),this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(),this.key("kdeparams").seq().obj(this.key("salt").octstr(),this.key("iters").int())),this.key("cipher").seq().obj(this.key("algo").objid(),this.key("iv").octstr()))),this.key("subjectPrivateKey").octstr())});t.EncryptedPrivateKey=c;var u=n.define("DSAPrivateKey",function(){this.seq().obj(this.key("version").int(),this.key("p").int(),this.key("q").int(),this.key("g").int(),this.key("pub_key").int(),this.key("priv_key").int())});t.DSAPrivateKey=u,t.DSAparam=n.define("DSAparam",function(){this.int()});var h=n.define("ECPrivateKey",function(){this.seq().obj(this.key("version").int(),this.key("privateKey").octstr(),this.key("parameters").optional().explicit(0).use(d),this.key("publicKey").optional().explicit(1).bitstr())});t.ECPrivateKey=h;var d=n.define("ECParameters",function(){this.choice({namedCurve:this.objid()})});t.signature=n.define("signature",function(){this.seq().obj(this.key("r").int(),this.key("s").int())})},function(e,t,r){var n=r(37),i=r(1);function o(e,t){this.name=e,this.body=t,this.decoders={},this.encoders={}}t.define=function(e,t){return new o(e,t)},o.prototype._createNamed=function(e){var t;try{t=r(232).runInThisContext("(function "+this.name+"(entity) {\n  this._initNamed(entity);\n})")}catch(e){t=function(e){this._initNamed(e)}}return i(t,e),t.prototype._initNamed=function(t){e.call(this,t)},new t(this)},o.prototype._getDecoder=function(e){return e=e||"der",this.decoders.hasOwnProperty(e)||(this.decoders[e]=this._createNamed(n.decoders[e])),this.decoders[e]},o.prototype.decode=function(e,t,r){return this._getDecoder(t).decode(e,r)},o.prototype._getEncoder=function(e){return e=e||"der",this.encoders.hasOwnProperty(e)||(this.encoders[e]=this._createNamed(n.encoders[e])),this.encoders[e]},o.prototype.encode=function(e,t,r){return this._getEncoder(t).encode(e,r)}},function(module,exports){var indexOf=function(e,t){if(e.indexOf)return e.indexOf(t);for(var r=0;r<e.length;r++)if(e[r]===t)return r;return-1},Object_keys=function(e){if(Object.keys)return Object.keys(e);var t=[];for(var r in e)t.push(r);return t},forEach=function(e,t){if(e.forEach)return e.forEach(t);for(var r=0;r<e.length;r++)t(e[r],r,e)},defineProp=function(){try{return Object.defineProperty({},"_",{}),function(e,t,r){Object.defineProperty(e,t,{writable:!0,enumerable:!1,configurable:!0,value:r})}}catch(e){return function(e,t,r){e[t]=r}}}(),globals=["Array","Boolean","Date","Error","EvalError","Function","Infinity","JSON","Math","NaN","Number","Object","RangeError","ReferenceError","RegExp","String","SyntaxError","TypeError","URIError","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","eval","isFinite","isNaN","parseFloat","parseInt","undefined","unescape"];function Context(){}Context.prototype={};var Script=exports.Script=function(e){if(!(this instanceof Script))return new Script(e);this.code=e};Script.prototype.runInContext=function(e){if(!(e instanceof Context))throw new TypeError("needs a 'context' argument.");var t=document.createElement("iframe");t.style||(t.style={}),t.style.display="none",document.body.appendChild(t);var r=t.contentWindow,n=r.eval,i=r.execScript;!n&&i&&(i.call(r,"null"),n=r.eval),forEach(Object_keys(e),function(t){r[t]=e[t]}),forEach(globals,function(t){e[t]&&(r[t]=e[t])});var o=Object_keys(r),s=n.call(r,this.code);return forEach(Object_keys(r),function(t){(t in e||-1===indexOf(o,t))&&(e[t]=r[t])}),forEach(globals,function(t){t in e||defineProp(e,t,r[t])}),document.body.removeChild(t),s},Script.prototype.runInThisContext=function(){return eval(this.code)},Script.prototype.runInNewContext=function(e){var t=Script.createContext(e),r=this.runInContext(t);return e&&forEach(Object_keys(t),function(r){e[r]=t[r]}),r},forEach(Object_keys(Script.prototype),function(e){exports[e]=Script[e]=function(t){var r=Script(t);return r[e].apply(r,[].slice.call(arguments,1))}}),exports.isContext=function(e){return e instanceof Context},exports.createScript=function(e){return exports.Script(e)},exports.createContext=Script.createContext=function(e){var t=new Context;return"object"==typeof e&&forEach(Object_keys(e),function(r){t[r]=e[r]}),t}},function(e,t,r){var n=r(1);function i(e){this._reporterState={obj:null,path:[],options:e||{},errors:[]}}function o(e,t){this.path=e,this.rethrow(t)}t.Reporter=i,i.prototype.isError=function(e){return e instanceof o},i.prototype.save=function(){var e=this._reporterState;return{obj:e.obj,pathLen:e.path.length}},i.prototype.restore=function(e){var t=this._reporterState;t.obj=e.obj,t.path=t.path.slice(0,e.pathLen)},i.prototype.enterKey=function(e){return this._reporterState.path.push(e)},i.prototype.exitKey=function(e){var t=this._reporterState;t.path=t.path.slice(0,e-1)},i.prototype.leaveKey=function(e,t,r){var n=this._reporterState;this.exitKey(e),null!==n.obj&&(n.obj[t]=r)},i.prototype.path=function(){return this._reporterState.path.join("/")},i.prototype.enterObject=function(){var e=this._reporterState,t=e.obj;return e.obj={},t},i.prototype.leaveObject=function(e){var t=this._reporterState,r=t.obj;return t.obj=e,r},i.prototype.error=function(e){var t,r=this._reporterState,n=e instanceof o;if(t=n?e:new o(r.path.map(function(e){return"["+JSON.stringify(e)+"]"}).join(""),e.message||e,e.stack),!r.options.partial)throw t;return n||r.errors.push(t),t},i.prototype.wrapResult=function(e){var t=this._reporterState;return t.options.partial?{result:this.isError(e)?null:e,errors:t.errors}:e},n(o,Error),o.prototype.rethrow=function(e){if(this.message=e+" at: "+(this.path||"(shallow)"),Error.captureStackTrace&&Error.captureStackTrace(this,o),!this.stack)try{throw new Error(this.message)}catch(e){this.stack=e.stack}return this}},function(e,t,r){var n=r(38).Reporter,i=r(38).EncoderBuffer,o=r(38).DecoderBuffer,s=r(12),a=["seq","seqof","set","setof","objid","bool","gentime","utctime","null_","enum","int","objDesc","bitstr","bmpstr","charstr","genstr","graphstr","ia5str","iso646str","numstr","octstr","printstr","t61str","unistr","utf8str","videostr"],f=["key","obj","use","optional","explicit","implicit","def","choice","any","contains"].concat(a);function c(e,t){var r={};this._baseState=r,r.enc=e,r.parent=t||null,r.children=null,r.tag=null,r.args=null,r.reverseArgs=null,r.choice=null,r.optional=!1,r.any=!1,r.obj=!1,r.use=null,r.useDecoder=null,r.key=null,r.default=null,r.explicit=null,r.implicit=null,r.contains=null,r.parent||(r.children=[],this._wrap())}e.exports=c;var u=["enc","parent","children","tag","args","reverseArgs","choice","optional","any","obj","use","alteredUse","key","default","explicit","implicit","contains"];c.prototype.clone=function(){var e=this._baseState,t={};u.forEach(function(r){t[r]=e[r]});var r=new this.constructor(t.parent);return r._baseState=t,r},c.prototype._wrap=function(){var e=this._baseState;f.forEach(function(t){this[t]=function(){var r=new this.constructor(this);return e.children.push(r),r[t].apply(r,arguments)}},this)},c.prototype._init=function(e){var t=this._baseState;s(null===t.parent),e.call(this),t.children=t.children.filter(function(e){return e._baseState.parent===this},this),s.equal(t.children.length,1,"Root node can have only one child")},c.prototype._useArgs=function(e){var t=this._baseState,r=e.filter(function(e){return e instanceof this.constructor},this);e=e.filter(function(e){return!(e instanceof this.constructor)},this),0!==r.length&&(s(null===t.children),t.children=r,r.forEach(function(e){e._baseState.parent=this},this)),0!==e.length&&(s(null===t.args),t.args=e,t.reverseArgs=e.map(function(e){if("object"!=typeof e||e.constructor!==Object)return e;var t={};return Object.keys(e).forEach(function(r){r==(0|r)&&(r|=0);var n=e[r];t[n]=r}),t}))},["_peekTag","_decodeTag","_use","_decodeStr","_decodeObjid","_decodeTime","_decodeNull","_decodeInt","_decodeBool","_decodeList","_encodeComposite","_encodeStr","_encodeObjid","_encodeTime","_encodeNull","_encodeInt","_encodeBool"].forEach(function(e){c.prototype[e]=function(){var t=this._baseState;throw new Error(e+" not implemented for encoding: "+t.enc)}}),a.forEach(function(e){c.prototype[e]=function(){var t=this._baseState,r=Array.prototype.slice.call(arguments);return s(null===t.tag),t.tag=e,this._useArgs(r),this}}),c.prototype.use=function(e){s(e);var t=this._baseState;return s(null===t.use),t.use=e,this},c.prototype.optional=function(){return this._baseState.optional=!0,this},c.prototype.def=function(e){var t=this._baseState;return s(null===t.default),t.default=e,t.optional=!0,this},c.prototype.explicit=function(e){var t=this._baseState;return s(null===t.explicit&&null===t.implicit),t.explicit=e,this},c.prototype.implicit=function(e){var t=this._baseState;return s(null===t.explicit&&null===t.implicit),t.implicit=e,this},c.prototype.obj=function(){var e=this._baseState,t=Array.prototype.slice.call(arguments);return e.obj=!0,0!==t.length&&this._useArgs(t),this},c.prototype.key=function(e){var t=this._baseState;return s(null===t.key),t.key=e,this},c.prototype.any=function(){return this._baseState.any=!0,this},c.prototype.choice=function(e){var t=this._baseState;return s(null===t.choice),t.choice=e,this._useArgs(Object.keys(e).map(function(t){return e[t]})),this},c.prototype.contains=function(e){var t=this._baseState;return s(null===t.use),t.contains=e,this},c.prototype._decode=function(e,t){var r=this._baseState;if(null===r.parent)return e.wrapResult(r.children[0]._decode(e,t));var n,i=r.default,s=!0,a=null;if(null!==r.key&&(a=e.enterKey(r.key)),r.optional){var f=null;if(null!==r.explicit?f=r.explicit:null!==r.implicit?f=r.implicit:null!==r.tag&&(f=r.tag),null!==f||r.any){if(s=this._peekTag(e,f,r.any),e.isError(s))return s}else{var c=e.save();try{null===r.choice?this._decodeGeneric(r.tag,e,t):this._decodeChoice(e,t),s=!0}catch(e){s=!1}e.restore(c)}}if(r.obj&&s&&(n=e.enterObject()),s){if(null!==r.explicit){var u=this._decodeTag(e,r.explicit);if(e.isError(u))return u;e=u}var h=e.offset;if(null===r.use&&null===r.choice){if(r.any)c=e.save();var d=this._decodeTag(e,null!==r.implicit?r.implicit:r.tag,r.any);if(e.isError(d))return d;r.any?i=e.raw(c):e=d}if(t&&t.track&&null!==r.tag&&t.track(e.path(),h,e.length,"tagged"),t&&t.track&&null!==r.tag&&t.track(e.path(),e.offset,e.length,"content"),i=r.any?i:null===r.choice?this._decodeGeneric(r.tag,e,t):this._decodeChoice(e,t),e.isError(i))return i;if(r.any||null!==r.choice||null===r.children||r.children.forEach(function(r){r._decode(e,t)}),r.contains&&("octstr"===r.tag||"bitstr"===r.tag)){var l=new o(i);i=this._getUse(r.contains,e._reporterState.obj)._decode(l,t)}}return r.obj&&s&&(i=e.leaveObject(n)),null===r.key||null===i&&!0!==s?null!==a&&e.exitKey(a):e.leaveKey(a,r.key,i),i},c.prototype._decodeGeneric=function(e,t,r){var n=this._baseState;return"seq"===e||"set"===e?null:"seqof"===e||"setof"===e?this._decodeList(t,e,n.args[0],r):/str$/.test(e)?this._decodeStr(t,e,r):"objid"===e&&n.args?this._decodeObjid(t,n.args[0],n.args[1],r):"objid"===e?this._decodeObjid(t,null,null,r):"gentime"===e||"utctime"===e?this._decodeTime(t,e,r):"null_"===e?this._decodeNull(t,r):"bool"===e?this._decodeBool(t,r):"objDesc"===e?this._decodeStr(t,e,r):"int"===e||"enum"===e?this._decodeInt(t,n.args&&n.args[0],r):null!==n.use?this._getUse(n.use,t._reporterState.obj)._decode(t,r):t.error("unknown tag: "+e)},c.prototype._getUse=function(e,t){var r=this._baseState;return r.useDecoder=this._use(e,t),s(null===r.useDecoder._baseState.parent),r.useDecoder=r.useDecoder._baseState.children[0],r.implicit!==r.useDecoder._baseState.implicit&&(r.useDecoder=r.useDecoder.clone(),r.useDecoder._baseState.implicit=r.implicit),r.useDecoder},c.prototype._decodeChoice=function(e,t){var r=this._baseState,n=null,i=!1;return Object.keys(r.choice).some(function(o){var s=e.save(),a=r.choice[o];try{var f=a._decode(e,t);if(e.isError(f))return!1;n={type:o,value:f},i=!0}catch(t){return e.restore(s),!1}return!0},this),i?n:e.error("Choice not matched")},c.prototype._createEncoderBuffer=function(e){return new i(e,this.reporter)},c.prototype._encode=function(e,t,r){var n=this._baseState;if(null===n.default||n.default!==e){var i=this._encodeValue(e,t,r);if(void 0!==i&&!this._skipDefault(i,t,r))return i}},c.prototype._encodeValue=function(e,t,r){var i=this._baseState;if(null===i.parent)return i.children[0]._encode(e,t||new n);var o=null;if(this.reporter=t,i.optional&&void 0===e){if(null===i.default)return;e=i.default}var s=null,a=!1;if(i.any)o=this._createEncoderBuffer(e);else if(i.choice)o=this._encodeChoice(e,t);else if(i.contains)s=this._getUse(i.contains,r)._encode(e,t),a=!0;else if(i.children)s=i.children.map(function(r){if("null_"===r._baseState.tag)return r._encode(null,t,e);if(null===r._baseState.key)return t.error("Child should have a key");var n=t.enterKey(r._baseState.key);if("object"!=typeof e)return t.error("Child expected, but input is not object");var i=r._encode(e[r._baseState.key],t,e);return t.leaveKey(n),i},this).filter(function(e){return e}),s=this._createEncoderBuffer(s);else if("seqof"===i.tag||"setof"===i.tag){if(!i.args||1!==i.args.length)return t.error("Too many args for : "+i.tag);if(!Array.isArray(e))return t.error("seqof/setof, but data is not Array");var f=this.clone();f._baseState.implicit=null,s=this._createEncoderBuffer(e.map(function(r){var n=this._baseState;return this._getUse(n.args[0],e)._encode(r,t)},f))}else null!==i.use?o=this._getUse(i.use,r)._encode(e,t):(s=this._encodePrimitive(i.tag,e),a=!0);if(!i.any&&null===i.choice){var c=null!==i.implicit?i.implicit:i.tag,u=null===i.implicit?"universal":"context";null===c?null===i.use&&t.error("Tag could be omitted only for .use()"):null===i.use&&(o=this._encodeComposite(c,a,u,s))}return null!==i.explicit&&(o=this._encodeComposite(i.explicit,!1,"context",o)),o},c.prototype._encodeChoice=function(e,t){var r=this._baseState,n=r.choice[e.type];return n||s(!1,e.type+" not found in "+JSON.stringify(Object.keys(r.choice))),n._encode(e.value,t)},c.prototype._encodePrimitive=function(e,t){var r=this._baseState;if(/str$/.test(e))return this._encodeStr(t,e);if("objid"===e&&r.args)return this._encodeObjid(t,r.reverseArgs[0],r.args[1]);if("objid"===e)return this._encodeObjid(t,null,null);if("gentime"===e||"utctime"===e)return this._encodeTime(t,e);if("null_"===e)return this._encodeNull();if("int"===e||"enum"===e)return this._encodeInt(t,r.args&&r.reverseArgs[0]);if("bool"===e)return this._encodeBool(t);if("objDesc"===e)return this._encodeStr(t,e);throw new Error("Unsupported tag: "+e)},c.prototype._isNumstr=function(e){return/^[0-9 ]*$/.test(e)},c.prototype._isPrintstr=function(e){return/^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(e)}},function(e,t,r){var n=r(119);t.tagClass={0:"universal",1:"application",2:"context",3:"private"},t.tagClassByName=n._reverse(t.tagClass),t.tag={0:"end",1:"bool",2:"int",3:"bitstr",4:"octstr",5:"null_",6:"objid",7:"objDesc",8:"external",9:"real",10:"enum",11:"embed",12:"utf8str",13:"relativeOid",16:"seq",17:"set",18:"numstr",19:"printstr",20:"t61str",21:"videostr",22:"ia5str",23:"utctime",24:"gentime",25:"graphstr",26:"iso646str",27:"genstr",28:"unistr",29:"charstr",30:"bmpstr"},t.tagByName=n._reverse(t.tag)},function(e,t,r){var n=t;n.der=r(120),n.pem=r(237)},function(e,t,r){var n=r(1),i=r(2).Buffer,o=r(120);function s(e){o.call(this,e),this.enc="pem"}n(s,o),e.exports=s,s.prototype.decode=function(e,t){for(var r=e.toString().split(/[\r\n]+/g),n=t.label.toUpperCase(),s=/^-----(BEGIN|END) ([^-]+)-----$/,a=-1,f=-1,c=0;c<r.length;c++){var u=r[c].match(s);if(null!==u&&u[2]===n){if(-1!==a){if("END"!==u[1])break;f=c;break}if("BEGIN"!==u[1])break;a=c}}if(-1===a||-1===f)throw new Error("PEM section not found for: "+n);var h=r.slice(a+1,f).join("");h.replace(/[^a-z0-9\+\/=]+/gi,"");var d=new i(h,"base64");return o.prototype.decode.call(this,d,t)}},function(e,t,r){var n=t;n.der=r(121),n.pem=r(239)},function(e,t,r){var n=r(1),i=r(121);function o(e){i.call(this,e),this.enc="pem"}n(o,i),e.exports=o,o.prototype.encode=function(e,t){for(var r=i.prototype.encode.call(this,e).toString("base64"),n=["-----BEGIN "+t.label+"-----"],o=0;o<r.length;o+=64)n.push(r.slice(o,o+64));return n.push("-----END "+t.label+"-----"),n.join("\n")}},function(e,t,r){"use strict";var n=r(37),i=n.define("Time",function(){this.choice({utcTime:this.utctime(),generalTime:this.gentime()})}),o=n.define("AttributeTypeValue",function(){this.seq().obj(this.key("type").objid(),this.key("value").any())}),s=n.define("AlgorithmIdentifier",function(){this.seq().obj(this.key("algorithm").objid(),this.key("parameters").optional(),this.key("curve").objid().optional())}),a=n.define("SubjectPublicKeyInfo",function(){this.seq().obj(this.key("algorithm").use(s),this.key("subjectPublicKey").bitstr())}),f=n.define("RelativeDistinguishedName",function(){this.setof(o)}),c=n.define("RDNSequence",function(){this.seqof(f)}),u=n.define("Name",function(){this.choice({rdnSequence:this.use(c)})}),h=n.define("Validity",function(){this.seq().obj(this.key("notBefore").use(i),this.key("notAfter").use(i))}),d=n.define("Extension",function(){this.seq().obj(this.key("extnID").objid(),this.key("critical").bool().def(!1),this.key("extnValue").octstr())}),l=n.define("TBSCertificate",function(){this.seq().obj(this.key("version").explicit(0).int().optional(),this.key("serialNumber").int(),this.key("signature").use(s),this.key("issuer").use(u),this.key("validity").use(h),this.key("subject").use(u),this.key("subjectPublicKeyInfo").use(a),this.key("issuerUniqueID").implicit(1).bitstr().optional(),this.key("subjectUniqueID").implicit(2).bitstr().optional(),this.key("extensions").explicit(3).seqof(d).optional())}),p=n.define("X509Certificate",function(){this.seq().obj(this.key("tbsCertificate").use(l),this.key("signatureAlgorithm").use(s),this.key("signatureValue").bitstr())});e.exports=p},function(e){e.exports={"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}},function(e,t,r){var n=/Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r\+\/\=]+)[\n\r]+/m,i=/^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m,o=/^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r\+\/\=]+)-----END \1-----$/m,s=r(46),a=r(72),f=r(0).Buffer;e.exports=function(e,t){var r,c=e.toString(),u=c.match(n);if(u){var h="aes"+u[1],d=f.from(u[2],"hex"),l=f.from(u[3].replace(/[\r\n]/g,""),"base64"),p=s(t,d.slice(0,8),parseInt(u[1],10)).key,b=[],y=a.createDecipheriv(h,p,d);b.push(y.update(l)),b.push(y.final()),r=f.concat(b)}else{var m=c.match(o);r=new f(m[2].replace(/[\r\n]/g,""),"base64")}return{tag:c.match(i)[1],data:r}}},function(e,t,r){(function(t){var n=r(4),i=r(7).ec,o=r(47),s=r(122);function a(e,t){if(e.cmpn(0)<=0)throw new Error("invalid sig");if(e.cmp(t)>=t)throw new Error("invalid sig")}e.exports=function(e,r,f,c,u){var h=o(f);if("ec"===h.type){if("ecdsa"!==c&&"ecdsa/rsa"!==c)throw new Error("wrong public key type");return function(e,t,r){var n=s[r.data.algorithm.curve.join(".")];if(!n)throw new Error("unknown curve "+r.data.algorithm.curve.join("."));var o=new i(n),a=r.data.subjectPrivateKey.data;return o.verify(t,e,a)}(e,r,h)}if("dsa"===h.type){if("dsa"!==c)throw new Error("wrong public key type");return function(e,t,r){var i=r.data.p,s=r.data.q,f=r.data.g,c=r.data.pub_key,u=o.signature.decode(e,"der"),h=u.s,d=u.r;a(h,s),a(d,s);var l=n.mont(i),p=h.invm(s);return 0===f.toRed(l).redPow(new n(t).mul(p).mod(s)).fromRed().mul(c.toRed(l).redPow(d.mul(p).mod(s)).fromRed()).mod(i).mod(s).cmp(d)}(e,r,h)}if("rsa"!==c&&"ecdsa/rsa"!==c)throw new Error("wrong public key type");r=t.concat([u,r]);for(var d=h.modulus.byteLength(),l=[1],p=0;r.length+l.length+2<d;)l.push(255),p++;l.push(0);for(var b=-1;++b<r.length;)l.push(r[b]);l=new t(l);var y=n.mont(h.modulus);e=(e=new n(e).toRed(y)).redPow(new n(h.publicExponent)),e=new t(e.fromRed().toArray());var m=p<8?1:0;for(d=Math.min(e.length,l.length),e.length!==l.length&&(m=1),b=-1;++b<d;)m|=e[b]^l[b];return 0===m}}).call(this,r(2).Buffer)},function(e,t,r){(function(t){var n=r(7),i=r(4);e.exports=function(e){return new s(e)};var o={secp256k1:{name:"secp256k1",byteLength:32},secp224r1:{name:"p224",byteLength:28},prime256v1:{name:"p256",byteLength:32},prime192v1:{name:"p192",byteLength:24},ed25519:{name:"ed25519",byteLength:32},secp384r1:{name:"p384",byteLength:48},secp521r1:{name:"p521",byteLength:66}};function s(e){this.curveType=o[e],this.curveType||(this.curveType={name:e}),this.curve=new n.ec(this.curveType.name),this.keys=void 0}function a(e,r,n){Array.isArray(e)||(e=e.toArray());var i=new t(e);if(n&&i.length<n){var o=new t(n-i.length);o.fill(0),i=t.concat([o,i])}return r?i.toString(r):i}o.p224=o.secp224r1,o.p256=o.secp256r1=o.prime256v1,o.p192=o.secp192r1=o.prime192v1,o.p384=o.secp384r1,o.p521=o.secp521r1,s.prototype.generateKeys=function(e,t){return this.keys=this.curve.genKeyPair(),this.getPublicKey(e,t)},s.prototype.computeSecret=function(e,r,n){return r=r||"utf8",t.isBuffer(e)||(e=new t(e,r)),a(this.curve.keyFromPublic(e).getPublic().mul(this.keys.getPrivate()).getX(),n,this.curveType.byteLength)},s.prototype.getPublicKey=function(e,t){var r=this.keys.getPublic("compressed"===t,!0);return"hybrid"===t&&(r[r.length-1]%2?r[0]=7:r[0]=6),a(r,e)},s.prototype.getPrivateKey=function(e){return a(this.keys.getPrivate(),e)},s.prototype.setPublicKey=function(e,r){return r=r||"utf8",t.isBuffer(e)||(e=new t(e,r)),this.keys._importPublic(e),this},s.prototype.setPrivateKey=function(e,r){r=r||"utf8",t.isBuffer(e)||(e=new t(e,r));var n=new i(e);return n=n.toString(16),this.keys=this.curve.genKeyPair(),this.keys._importPrivate(n),this}}).call(this,r(2).Buffer)},function(e,t,r){t.publicEncrypt=r(246),t.privateDecrypt=r(247),t.privateEncrypt=function(e,r){return t.publicEncrypt(e,r,!0)},t.publicDecrypt=function(e,r){return t.privateDecrypt(e,r,!0)}},function(e,t,r){var n=r(47),i=r(27),o=r(21),s=r(123),a=r(124),f=r(4),c=r(125),u=r(74),h=r(0).Buffer;e.exports=function(e,t,r){var d;d=e.padding?e.padding:r?1:4;var l,p=n(e);if(4===d)l=function(e,t){var r=e.modulus.byteLength(),n=t.length,c=o("sha1").update(h.alloc(0)).digest(),u=c.length,d=2*u;if(n>r-d-2)throw new Error("message too long");var l=h.alloc(r-n-d-2),p=r-u-1,b=i(u),y=a(h.concat([c,l,h.alloc(1,1),t],p),s(b,p)),m=a(b,s(y,u));return new f(h.concat([h.alloc(1),m,y],r))}(p,t);else if(1===d)l=function(e,t,r){var n,o=t.length,s=e.modulus.byteLength();if(o>s-11)throw new Error("message too long");n=r?h.alloc(s-o-3,255):function(e){var t,r=h.allocUnsafe(e),n=0,o=i(2*e),s=0;for(;n<e;)s===o.length&&(o=i(2*e),s=0),(t=o[s++])&&(r[n++]=t);return r}(s-o-3);return new f(h.concat([h.from([0,r?1:2]),n,h.alloc(1),t],s))}(p,t,r);else{if(3!==d)throw new Error("unknown padding");if((l=new f(t)).cmp(p.modulus)>=0)throw new Error("data too long for modulus")}return r?u(l,p):c(l,p)}},function(e,t,r){var n=r(47),i=r(123),o=r(124),s=r(4),a=r(74),f=r(21),c=r(125),u=r(0).Buffer;e.exports=function(e,t,r){var h;h=e.padding?e.padding:r?1:4;var d,l=n(e),p=l.modulus.byteLength();if(t.length>p||new s(t).cmp(l.modulus)>=0)throw new Error("decryption error");d=r?c(new s(t),l):a(t,l);var b=u.alloc(p-d.length);if(d=u.concat([b,d],p),4===h)return function(e,t){var r=e.modulus.byteLength(),n=f("sha1").update(u.alloc(0)).digest(),s=n.length;if(0!==t[0])throw new Error("decryption error");var a=t.slice(1,s+1),c=t.slice(s+1),h=o(a,i(c,s)),d=o(c,i(h,r-s-1));if(function(e,t){e=u.from(e),t=u.from(t);var r=0,n=e.length;e.length!==t.length&&(r++,n=Math.min(e.length,t.length));var i=-1;for(;++i<n;)r+=e[i]^t[i];return r}(n,d.slice(0,s)))throw new Error("decryption error");var l=s;for(;0===d[l];)l++;if(1!==d[l++])throw new Error("decryption error");return d.slice(l)}(l,d);if(1===h)return function(e,t,r){var n=t.slice(0,2),i=2,o=0;for(;0!==t[i++];)if(i>=t.length){o++;break}var s=t.slice(2,i-1);("0002"!==n.toString("hex")&&!r||"0001"!==n.toString("hex")&&r)&&o++;s.length<8&&o++;if(o)throw new Error("decryption error");return t.slice(i)}(0,d,r);if(3===h)return d;throw new Error("unknown padding")}},function(e,t,r){"use strict";(function(e,n){function i(){throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")}var o=r(0),s=r(27),a=o.Buffer,f=o.kMaxLength,c=e.crypto||e.msCrypto,u=Math.pow(2,32)-1;function h(e,t){if("number"!=typeof e||e!=e)throw new TypeError("offset must be a number");if(e>u||e<0)throw new TypeError("offset must be a uint32");if(e>f||e>t)throw new RangeError("offset out of range")}function d(e,t,r){if("number"!=typeof e||e!=e)throw new TypeError("size must be a number");if(e>u||e<0)throw new TypeError("size must be a uint32");if(e+t>r||e>f)throw new RangeError("buffer too small")}function l(e,t,r,i){if(n.browser){var o=e.buffer,a=new Uint8Array(o,t,r);return c.getRandomValues(a),i?void n.nextTick(function(){i(null,e)}):e}if(!i)return s(r).copy(e,t),e;s(r,function(r,n){if(r)return i(r);n.copy(e,t),i(null,e)})}c&&c.getRandomValues||!n.browser?(t.randomFill=function(t,r,n,i){if(!(a.isBuffer(t)||t instanceof e.Uint8Array))throw new TypeError('"buf" argument must be a Buffer or Uint8Array');if("function"==typeof r)i=r,r=0,n=t.length;else if("function"==typeof n)i=n,n=t.length-r;else if("function"!=typeof i)throw new TypeError('"cb" argument must be a function');return h(r,t.length),d(n,r,t.length),l(t,r,n,i)},t.randomFillSync=function(t,r,n){void 0===r&&(r=0);if(!(a.isBuffer(t)||t instanceof e.Uint8Array))throw new TypeError('"buf" argument must be a Buffer or Uint8Array');h(r,t.length),void 0===n&&(n=t.length-r);return d(n,r,t.length),l(t,r,n)}):(t.randomFill=i,t.randomFillSync=i)}).call(this,r(11),r(15))},function(e,t,r){(function(t){var n=r(48),i=r(21);function o(e,r){var i;(Array.isArray(e)||e instanceof Uint8Array)&&(e=new t(e)),null!=r?("number"==typeof r&&(r=new t([r])),i=t.concat([r,e])):i=e;var o=f(i).slice(0,4),s=t.concat([i,o]);return n.encode(s)}function s(e,r){var i,o=n.decode(e),s=new t(o);if(null==r)i=0;else if("number"==typeof r&&(r=new t([r])),i=r.length,s.slice(0,i).toString("hex")!==r.toString("hex"))throw new Error("Invalid version");var a=s.slice(-4),c=s.length-4,u=s.slice(0,c),h=f(u).slice(0,4);if(a.toString("hex")!==h.toString("hex"))throw new Error("Invalid checksum");return u.slice(i)}function a(e,t){try{s(e,t)}catch(e){return!1}return!0}function f(e){var t=i("sha256").update(e).digest();return i("sha256").update(t).digest()}e.exports={encode:o,decode:s,isValid:a,createEncoder:function(e){return function(t){return o(t,e)}},createDecoder:function(e){return function(t){return s(t,e)}},createValidator:function(e){return function(t){return a(t,e)}}}}).call(this,r(2).Buffer)},function(e,t,r){"use strict";e.exports=r(251)(r(255))},function(e,t,r){"use strict";var n=r(252),i=r(253),o=r(126);function s(e,t){return void 0===e?t:(n.isBoolean(e,o.COMPRESSED_TYPE_INVALID),e)}e.exports=function(e){return{privateKeyVerify:function(t){return n.isBuffer(t,o.EC_PRIVATE_KEY_TYPE_INVALID),32===t.length&&e.privateKeyVerify(t)},privateKeyExport:function(t,r){n.isBuffer(t,o.EC_PRIVATE_KEY_TYPE_INVALID),n.isBufferLength(t,32,o.EC_PRIVATE_KEY_LENGTH_INVALID),r=s(r,!0);var a=e.privateKeyExport(t,r);return i.privateKeyExport(t,a,r)},privateKeyImport:function(t){if(n.isBuffer(t,o.EC_PRIVATE_KEY_TYPE_INVALID),(t=i.privateKeyImport(t))&&32===t.length&&e.privateKeyVerify(t))return t;throw new Error(o.EC_PRIVATE_KEY_IMPORT_DER_FAIL)},privateKeyNegate:function(t){return n.isBuffer(t,o.EC_PRIVATE_KEY_TYPE_INVALID),n.isBufferLength(t,32,o.EC_PRIVATE_KEY_LENGTH_INVALID),e.privateKeyNegate(t)},privateKeyModInverse:function(t){return n.isBuffer(t,o.EC_PRIVATE_KEY_TYPE_INVALID),n.isBufferLength(t,32,o.EC_PRIVATE_KEY_LENGTH_INVALID),e.privateKeyModInverse(t)},privateKeyTweakAdd:function(t,r){return n.isBuffer(t,o.EC_PRIVATE_KEY_TYPE_INVALID),n.isBufferLength(t,32,o.EC_PRIVATE_KEY_LENGTH_INVALID),n.isBuffer(r,o.TWEAK_TYPE_INVALID),n.isBufferLength(r,32,o.TWEAK_LENGTH_INVALID),e.privateKeyTweakAdd(t,r)},privateKeyTweakMul:function(t,r){return n.isBuffer(t,o.EC_PRIVATE_KEY_TYPE_INVALID),n.isBufferLength(t,32,o.EC_PRIVATE_KEY_LENGTH_INVALID),n.isBuffer(r,o.TWEAK_TYPE_INVALID),n.isBufferLength(r,32,o.TWEAK_LENGTH_INVALID),e.privateKeyTweakMul(t,r)},publicKeyCreate:function(t,r){return n.isBuffer(t,o.EC_PRIVATE_KEY_TYPE_INVALID),n.isBufferLength(t,32,o.EC_PRIVATE_KEY_LENGTH_INVALID),r=s(r,!0),e.publicKeyCreate(t,r)},publicKeyConvert:function(t,r){return n.isBuffer(t,o.EC_PUBLIC_KEY_TYPE_INVALID),n.isBufferLength2(t,33,65,o.EC_PUBLIC_KEY_LENGTH_INVALID),r=s(r,!0),e.publicKeyConvert(t,r)},publicKeyVerify:function(t){return n.isBuffer(t,o.EC_PUBLIC_KEY_TYPE_INVALID),e.publicKeyVerify(t)},publicKeyTweakAdd:function(t,r,i){return n.isBuffer(t,o.EC_PUBLIC_KEY_TYPE_INVALID),n.isBufferLength2(t,33,65,o.EC_PUBLIC_KEY_LENGTH_INVALID),n.isBuffer(r,o.TWEAK_TYPE_INVALID),n.isBufferLength(r,32,o.TWEAK_LENGTH_INVALID),i=s(i,!0),e.publicKeyTweakAdd(t,r,i)},publicKeyTweakMul:function(t,r,i){return n.isBuffer(t,o.EC_PUBLIC_KEY_TYPE_INVALID),n.isBufferLength2(t,33,65,o.EC_PUBLIC_KEY_LENGTH_INVALID),n.isBuffer(r,o.TWEAK_TYPE_INVALID),n.isBufferLength(r,32,o.TWEAK_LENGTH_INVALID),i=s(i,!0),e.publicKeyTweakMul(t,r,i)},publicKeyCombine:function(t,r){n.isArray(t,o.EC_PUBLIC_KEYS_TYPE_INVALID),n.isLengthGTZero(t,o.EC_PUBLIC_KEYS_LENGTH_INVALID);for(var i=0;i<t.length;++i)n.isBuffer(t[i],o.EC_PUBLIC_KEY_TYPE_INVALID),n.isBufferLength2(t[i],33,65,o.EC_PUBLIC_KEY_LENGTH_INVALID);return r=s(r,!0),e.publicKeyCombine(t,r)},signatureNormalize:function(t){return n.isBuffer(t,o.ECDSA_SIGNATURE_TYPE_INVALID),n.isBufferLength(t,64,o.ECDSA_SIGNATURE_LENGTH_INVALID),e.signatureNormalize(t)},signatureExport:function(t){n.isBuffer(t,o.ECDSA_SIGNATURE_TYPE_INVALID),n.isBufferLength(t,64,o.ECDSA_SIGNATURE_LENGTH_INVALID);var r=e.signatureExport(t);return i.signatureExport(r)},signatureImport:function(t){n.isBuffer(t,o.ECDSA_SIGNATURE_TYPE_INVALID),n.isLengthGTZero(t,o.ECDSA_SIGNATURE_LENGTH_INVALID);var r=i.signatureImport(t);if(r)return e.signatureImport(r);throw new Error(o.ECDSA_SIGNATURE_PARSE_DER_FAIL)},signatureImportLax:function(t){n.isBuffer(t,o.ECDSA_SIGNATURE_TYPE_INVALID),n.isLengthGTZero(t,o.ECDSA_SIGNATURE_LENGTH_INVALID);var r=i.signatureImportLax(t);if(r)return e.signatureImport(r);throw new Error(o.ECDSA_SIGNATURE_PARSE_DER_FAIL)},sign:function(t,r,i){n.isBuffer(t,o.MSG32_TYPE_INVALID),n.isBufferLength(t,32,o.MSG32_LENGTH_INVALID),n.isBuffer(r,o.EC_PRIVATE_KEY_TYPE_INVALID),n.isBufferLength(r,32,o.EC_PRIVATE_KEY_LENGTH_INVALID);var s=null,a=null;return void 0!==i&&(n.isObject(i,o.OPTIONS_TYPE_INVALID),void 0!==i.data&&(n.isBuffer(i.data,o.OPTIONS_DATA_TYPE_INVALID),n.isBufferLength(i.data,32,o.OPTIONS_DATA_LENGTH_INVALID),s=i.data),void 0!==i.noncefn&&(n.isFunction(i.noncefn,o.OPTIONS_NONCEFN_TYPE_INVALID),a=i.noncefn)),e.sign(t,r,a,s)},verify:function(t,r,i){return n.isBuffer(t,o.MSG32_TYPE_INVALID),n.isBufferLength(t,32,o.MSG32_LENGTH_INVALID),n.isBuffer(r,o.ECDSA_SIGNATURE_TYPE_INVALID),n.isBufferLength(r,64,o.ECDSA_SIGNATURE_LENGTH_INVALID),n.isBuffer(i,o.EC_PUBLIC_KEY_TYPE_INVALID),n.isBufferLength2(i,33,65,o.EC_PUBLIC_KEY_LENGTH_INVALID),e.verify(t,r,i)},recover:function(t,r,i,a){return n.isBuffer(t,o.MSG32_TYPE_INVALID),n.isBufferLength(t,32,o.MSG32_LENGTH_INVALID),n.isBuffer(r,o.ECDSA_SIGNATURE_TYPE_INVALID),n.isBufferLength(r,64,o.ECDSA_SIGNATURE_LENGTH_INVALID),n.isNumber(i,o.RECOVERY_ID_TYPE_INVALID),n.isNumberInInterval(i,-1,4,o.RECOVERY_ID_VALUE_INVALID),a=s(a,!0),e.recover(t,r,i,a)},ecdh:function(t,r){return n.isBuffer(t,o.EC_PUBLIC_KEY_TYPE_INVALID),n.isBufferLength2(t,33,65,o.EC_PUBLIC_KEY_LENGTH_INVALID),n.isBuffer(r,o.EC_PRIVATE_KEY_TYPE_INVALID),n.isBufferLength(r,32,o.EC_PRIVATE_KEY_LENGTH_INVALID),e.ecdh(t,r)},ecdhUnsafe:function(t,r,i){return n.isBuffer(t,o.EC_PUBLIC_KEY_TYPE_INVALID),n.isBufferLength2(t,33,65,o.EC_PUBLIC_KEY_LENGTH_INVALID),n.isBuffer(r,o.EC_PRIVATE_KEY_TYPE_INVALID),n.isBufferLength(r,32,o.EC_PRIVATE_KEY_LENGTH_INVALID),i=s(i,!0),e.ecdhUnsafe(t,r,i)}}}},function(e,t,r){"use strict";(function(e){var r=Object.prototype.toString;t.isArray=function(e,t){if(!Array.isArray(e))throw TypeError(t)},t.isBoolean=function(e,t){if("[object Boolean]"!==r.call(e))throw TypeError(t)},t.isBuffer=function(t,r){if(!e.isBuffer(t))throw TypeError(r)},t.isFunction=function(e,t){if("[object Function]"!==r.call(e))throw TypeError(t)},t.isNumber=function(e,t){if("[object Number]"!==r.call(e))throw TypeError(t)},t.isObject=function(e,t){if("[object Object]"!==r.call(e))throw TypeError(t)},t.isBufferLength=function(e,t,r){if(e.length!==t)throw RangeError(r)},t.isBufferLength2=function(e,t,r,n){if(e.length!==t&&e.length!==r)throw RangeError(n)},t.isLengthGTZero=function(e,t){if(0===e.length)throw RangeError(t)},t.isNumberInInterval=function(e,t,r,n){if(e<=t||e>=r)throw RangeError(n)}}).call(this,r(2).Buffer)},function(e,t,r){"use strict";var n=r(0).Buffer,i=r(254),o=n.from([48,129,211,2,1,1,4,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,129,133,48,129,130,2,1,1,48,44,6,7,42,134,72,206,61,1,1,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,255,255,252,47,48,6,4,1,0,4,1,7,4,33,2,121,190,102,126,249,220,187,172,85,160,98,149,206,135,11,7,2,155,252,219,45,206,40,217,89,242,129,91,22,248,23,152,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,186,174,220,230,175,72,160,59,191,210,94,140,208,54,65,65,2,1,1,161,36,3,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),s=n.from([48,130,1,19,2,1,1,4,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,129,165,48,129,162,2,1,1,48,44,6,7,42,134,72,206,61,1,1,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,255,255,252,47,48,6,4,1,0,4,1,7,4,65,4,121,190,102,126,249,220,187,172,85,160,98,149,206,135,11,7,2,155,252,219,45,206,40,217,89,242,129,91,22,248,23,152,72,58,218,119,38,163,196,101,93,164,251,252,14,17,8,168,253,23,180,72,166,133,84,25,156,71,208,143,251,16,212,184,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,186,174,220,230,175,72,160,59,191,210,94,140,208,54,65,65,2,1,1,161,68,3,66,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);t.privateKeyExport=function(e,t,r){var i=n.from(r?o:s);return e.copy(i,r?8:9),t.copy(i,r?181:214),i},t.privateKeyImport=function(e){var t=e.length,r=0;if(!(t<r+1||48!==e[r])&&!(t<(r+=1)+1)&&128&e[r]){var n=127&e[r];if(r+=1,!(n<1||n>2||t<r+n)){var i=e[r+n-1]|(n>1?e[r+n-2]<<8:0);if(!(t<(r+=n)+i||t<r+3||2!==e[r]||1!==e[r+1]||1!==e[r+2]||t<(r+=3)+2||4!==e[r]||e[r+1]>32||t<r+2+e[r+1]))return e.slice(r+2,r+2+e[r+1])}}},t.signatureExport=function(e){for(var t=n.concat([n.from([0]),e.r]),r=33,o=0;r>1&&0===t[o]&&!(128&t[o+1]);--r,++o);for(var s=n.concat([n.from([0]),e.s]),a=33,f=0;a>1&&0===s[f]&&!(128&s[f+1]);--a,++f);return i.encode(t.slice(o),s.slice(f))},t.signatureImport=function(e){var t=n.alloc(32,0),r=n.alloc(32,0);try{var o=i.decode(e);if(33===o.r.length&&0===o.r[0]&&(o.r=o.r.slice(1)),o.r.length>32)throw new Error("R length is too long");if(33===o.s.length&&0===o.s[0]&&(o.s=o.s.slice(1)),o.s.length>32)throw new Error("S length is too long")}catch(e){return}return o.r.copy(t,32-o.r.length),o.s.copy(r,32-o.s.length),{r:t,s:r}},t.signatureImportLax=function(e){var t=n.alloc(32,0),r=n.alloc(32,0),i=e.length,o=0;if(48===e[o++]){var s=e[o++];if(!(128&s&&(o+=s-128)>i)&&2===e[o++]){var a=e[o++];if(128&a){if(o+(s=a-128)>i)return;for(;s>0&&0===e[o];o+=1,s-=1);for(a=0;s>0;o+=1,s-=1)a=(a<<8)+e[o]}if(!(a>i-o)){var f=o;if(o+=a,2===e[o++]){var c=e[o++];if(128&c){if(o+(s=c-128)>i)return;for(;s>0&&0===e[o];o+=1,s-=1);for(c=0;s>0;o+=1,s-=1)c=(c<<8)+e[o]}if(!(c>i-o)){var u=o;for(o+=c;a>0&&0===e[f];a-=1,f+=1);if(!(a>32)){var h=e.slice(f,f+a);for(h.copy(t,32-h.length);c>0&&0===e[u];c-=1,u+=1);if(!(c>32)){var d=e.slice(u,u+c);return d.copy(r,32-d.length),{r:t,s:r}}}}}}}}}},function(e,t,r){var n=r(0).Buffer;e.exports={check:function(e){if(e.length<8)return!1;if(e.length>72)return!1;if(48!==e[0])return!1;if(e[1]!==e.length-2)return!1;if(2!==e[2])return!1;var t=e[3];if(0===t)return!1;if(5+t>=e.length)return!1;if(2!==e[4+t])return!1;var r=e[5+t];return!(0===r||6+t+r!==e.length||128&e[4]||t>1&&0===e[4]&&!(128&e[5])||128&e[t+6]||r>1&&0===e[t+6]&&!(128&e[t+7]))},decode:function(e){if(e.length<8)throw new Error("DER sequence length is too short");if(e.length>72)throw new Error("DER sequence length is too long");if(48!==e[0])throw new Error("Expected DER sequence");if(e[1]!==e.length-2)throw new Error("DER sequence length is invalid");if(2!==e[2])throw new Error("Expected DER integer");var t=e[3];if(0===t)throw new Error("R length is zero");if(5+t>=e.length)throw new Error("R length is too long");if(2!==e[4+t])throw new Error("Expected DER integer (2)");var r=e[5+t];if(0===r)throw new Error("S length is zero");if(6+t+r!==e.length)throw new Error("S length is invalid");if(128&e[4])throw new Error("R value is negative");if(t>1&&0===e[4]&&!(128&e[5]))throw new Error("R value excessively padded");if(128&e[t+6])throw new Error("S value is negative");if(r>1&&0===e[t+6]&&!(128&e[t+7]))throw new Error("S value excessively padded");return{r:e.slice(4,4+t),s:e.slice(6+t)}},encode:function(e,t){var r=e.length,i=t.length;if(0===r)throw new Error("R length is zero");if(0===i)throw new Error("S length is zero");if(r>33)throw new Error("R length is too long");if(i>33)throw new Error("S length is too long");if(128&e[0])throw new Error("R value is negative");if(128&t[0])throw new Error("S value is negative");if(r>1&&0===e[0]&&!(128&e[1]))throw new Error("R value excessively padded");if(i>1&&0===t[0]&&!(128&t[1]))throw new Error("S value excessively padded");var o=n.allocUnsafe(6+r+i);return o[0]=48,o[1]=o.length-2,o[2]=2,o[3]=e.length,e.copy(o,4),o[4+r]=2,o[5+r]=t.length,t.copy(o,6+r),o}}},function(e,t,r){"use strict";var n=r(0).Buffer,i=r(21),o=r(4),s=r(7).ec,a=r(126),f=new s("secp256k1"),c=f.curve;function u(e){var t=e[0];switch(t){case 2:case 3:return 33!==e.length?null:function(e,t){var r=new o(t);if(r.cmp(c.p)>=0)return null;var n=(r=r.toRed(c.red)).redSqr().redIMul(r).redIAdd(c.b).redSqrt();return 3===e!==n.isOdd()&&(n=n.redNeg()),f.keyPair({pub:{x:r,y:n}})}(t,e.slice(1,33));case 4:case 6:case 7:return 65!==e.length?null:function(e,t,r){var n=new o(t),i=new o(r);if(n.cmp(c.p)>=0||i.cmp(c.p)>=0)return null;if(n=n.toRed(c.red),i=i.toRed(c.red),(6===e||7===e)&&i.isOdd()!==(7===e))return null;var s=n.redSqr().redIMul(n);return i.redSqr().redISub(s.redIAdd(c.b)).isZero()?f.keyPair({pub:{x:n,y:i}}):null}(t,e.slice(1,33),e.slice(33,65));default:return null}}t.privateKeyVerify=function(e){var t=new o(e);return t.cmp(c.n)<0&&!t.isZero()},t.privateKeyExport=function(e,t){var r=new o(e);if(r.cmp(c.n)>=0||r.isZero())throw new Error(a.EC_PRIVATE_KEY_EXPORT_DER_FAIL);return n.from(f.keyFromPrivate(e).getPublic(t,!0))},t.privateKeyNegate=function(e){var t=new o(e);return t.isZero()?n.alloc(32):c.n.sub(t).umod(c.n).toArrayLike(n,"be",32)},t.privateKeyModInverse=function(e){var t=new o(e);if(t.cmp(c.n)>=0||t.isZero())throw new Error(a.EC_PRIVATE_KEY_RANGE_INVALID);return t.invm(c.n).toArrayLike(n,"be",32)},t.privateKeyTweakAdd=function(e,t){var r=new o(t);if(r.cmp(c.n)>=0)throw new Error(a.EC_PRIVATE_KEY_TWEAK_ADD_FAIL);if(r.iadd(new o(e)),r.cmp(c.n)>=0&&r.isub(c.n),r.isZero())throw new Error(a.EC_PRIVATE_KEY_TWEAK_ADD_FAIL);return r.toArrayLike(n,"be",32)},t.privateKeyTweakMul=function(e,t){var r=new o(t);if(r.cmp(c.n)>=0||r.isZero())throw new Error(a.EC_PRIVATE_KEY_TWEAK_MUL_FAIL);return r.imul(new o(e)),r.cmp(c.n)&&(r=r.umod(c.n)),r.toArrayLike(n,"be",32)},t.publicKeyCreate=function(e,t){var r=new o(e);if(r.cmp(c.n)>=0||r.isZero())throw new Error(a.EC_PUBLIC_KEY_CREATE_FAIL);return n.from(f.keyFromPrivate(e).getPublic(t,!0))},t.publicKeyConvert=function(e,t){var r=u(e);if(null===r)throw new Error(a.EC_PUBLIC_KEY_PARSE_FAIL);return n.from(r.getPublic(t,!0))},t.publicKeyVerify=function(e){return null!==u(e)},t.publicKeyTweakAdd=function(e,t,r){var i=u(e);if(null===i)throw new Error(a.EC_PUBLIC_KEY_PARSE_FAIL);if((t=new o(t)).cmp(c.n)>=0)throw new Error(a.EC_PUBLIC_KEY_TWEAK_ADD_FAIL);var s=c.g.mul(t).add(i.pub);if(s.isInfinity())throw new Error(a.EC_PUBLIC_KEY_TWEAK_ADD_FAIL);return n.from(s.encode(!0,r))},t.publicKeyTweakMul=function(e,t,r){var i=u(e);if(null===i)throw new Error(a.EC_PUBLIC_KEY_PARSE_FAIL);if((t=new o(t)).cmp(c.n)>=0||t.isZero())throw new Error(a.EC_PUBLIC_KEY_TWEAK_MUL_FAIL);return n.from(i.pub.mul(t).encode(!0,r))},t.publicKeyCombine=function(e,t){for(var r=new Array(e.length),i=0;i<e.length;++i)if(r[i]=u(e[i]),null===r[i])throw new Error(a.EC_PUBLIC_KEY_PARSE_FAIL);for(var o=r[0].pub,s=1;s<r.length;++s)o=o.add(r[s].pub);if(o.isInfinity())throw new Error(a.EC_PUBLIC_KEY_COMBINE_FAIL);return n.from(o.encode(!0,t))},t.signatureNormalize=function(e){var t=new o(e.slice(0,32)),r=new o(e.slice(32,64));if(t.cmp(c.n)>=0||r.cmp(c.n)>=0)throw new Error(a.ECDSA_SIGNATURE_PARSE_FAIL);var i=n.from(e);return 1===r.cmp(f.nh)&&c.n.sub(r).toArrayLike(n,"be",32).copy(i,32),i},t.signatureExport=function(e){var t=e.slice(0,32),r=e.slice(32,64);if(new o(t).cmp(c.n)>=0||new o(r).cmp(c.n)>=0)throw new Error(a.ECDSA_SIGNATURE_PARSE_FAIL);return{r:t,s:r}},t.signatureImport=function(e){var t=new o(e.r);t.cmp(c.n)>=0&&(t=new o(0));var r=new o(e.s);return r.cmp(c.n)>=0&&(r=new o(0)),n.concat([t.toArrayLike(n,"be",32),r.toArrayLike(n,"be",32)])},t.sign=function(e,t,r,i){if("function"==typeof r){var s=r;r=function(r){var f=s(e,t,null,i,r);if(!n.isBuffer(f)||32!==f.length)throw new Error(a.ECDSA_SIGN_FAIL);return new o(f)}}var u=new o(t);if(u.cmp(c.n)>=0||u.isZero())throw new Error(a.ECDSA_SIGN_FAIL);var h=f.sign(e,t,{canonical:!0,k:r,pers:i});return{signature:n.concat([h.r.toArrayLike(n,"be",32),h.s.toArrayLike(n,"be",32)]),recovery:h.recoveryParam}},t.verify=function(e,t,r){var n={r:t.slice(0,32),s:t.slice(32,64)},i=new o(n.r),s=new o(n.s);if(i.cmp(c.n)>=0||s.cmp(c.n)>=0)throw new Error(a.ECDSA_SIGNATURE_PARSE_FAIL);if(1===s.cmp(f.nh)||i.isZero()||s.isZero())return!1;var h=u(r);if(null===h)throw new Error(a.EC_PUBLIC_KEY_PARSE_FAIL);return f.verify(e,n,{x:h.pub.x,y:h.pub.y})},t.recover=function(e,t,r,i){var s={r:t.slice(0,32),s:t.slice(32,64)},u=new o(s.r),h=new o(s.s);if(u.cmp(c.n)>=0||h.cmp(c.n)>=0)throw new Error(a.ECDSA_SIGNATURE_PARSE_FAIL);try{if(u.isZero()||h.isZero())throw new Error;var d=f.recoverPubKey(e,s,r);return n.from(d.encode(!0,i))}catch(e){throw new Error(a.ECDSA_RECOVER_FAIL)}},t.ecdh=function(e,r){var n=t.ecdhUnsafe(e,r,!0);return i("sha256").update(n).digest()},t.ecdhUnsafe=function(e,t,r){var i=u(e);if(null===i)throw new Error(a.EC_PUBLIC_KEY_PARSE_FAIL);var s=new o(t);if(s.cmp(c.n)>=0||s.isZero())throw new Error(a.ECDH_FAIL);return n.from(i.pub.mul(s).encode(!0,r))}},function(e,t,r){var n,i,o;e.exports=(n=r(13),o=(i=n).lib.WordArray,i.enc.Base64={stringify:function(e){var t=e.words,r=e.sigBytes,n=this._map;e.clamp();for(var i=[],o=0;o<r;o+=3)for(var s=(t[o>>>2]>>>24-o%4*8&255)<<16|(t[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|t[o+2>>>2]>>>24-(o+2)%4*8&255,a=0;a<4&&o+.75*a<r;a++)i.push(n.charAt(s>>>6*(3-a)&63));var f=n.charAt(64);if(f)for(;i.length%4;)i.push(f);return i.join("")},parse:function(e){var t=e.length,r=this._map,n=this._reverseMap;if(!n){n=this._reverseMap=[];for(var i=0;i<r.length;i++)n[r.charCodeAt(i)]=i}var s=r.charAt(64);if(s){var a=e.indexOf(s);-1!==a&&(t=a)}return function(e,t,r){for(var n=[],i=0,s=0;s<t;s++)if(s%4){var a=r[e.charCodeAt(s-1)]<<s%4*2,f=r[e.charCodeAt(s)]>>>6-s%4*2;n[i>>>2]|=(a|f)<<24-i%4*8,i++}return o.create(n,i)}(e,t,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},n.enc.Base64)},function(e,t,r){var n;e.exports=(n=r(13),function(e){var t=n,r=t.lib,i=r.WordArray,o=r.Hasher,s=t.algo,a=[];!function(){for(var t=0;t<64;t++)a[t]=4294967296*e.abs(e.sin(t+1))|0}();var f=s.MD5=o.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,t){for(var r=0;r<16;r++){var n=t+r,i=e[n];e[n]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8)}var o=this._hash.words,s=e[t+0],f=e[t+1],l=e[t+2],p=e[t+3],b=e[t+4],y=e[t+5],m=e[t+6],g=e[t+7],v=e[t+8],_=e[t+9],w=e[t+10],E=e[t+11],S=e[t+12],A=e[t+13],k=e[t+14],x=e[t+15],I=o[0],T=o[1],M=o[2],O=o[3];I=c(I,T,M,O,s,7,a[0]),O=c(O,I,T,M,f,12,a[1]),M=c(M,O,I,T,l,17,a[2]),T=c(T,M,O,I,p,22,a[3]),I=c(I,T,M,O,b,7,a[4]),O=c(O,I,T,M,y,12,a[5]),M=c(M,O,I,T,m,17,a[6]),T=c(T,M,O,I,g,22,a[7]),I=c(I,T,M,O,v,7,a[8]),O=c(O,I,T,M,_,12,a[9]),M=c(M,O,I,T,w,17,a[10]),T=c(T,M,O,I,E,22,a[11]),I=c(I,T,M,O,S,7,a[12]),O=c(O,I,T,M,A,12,a[13]),M=c(M,O,I,T,k,17,a[14]),I=u(I,T=c(T,M,O,I,x,22,a[15]),M,O,f,5,a[16]),O=u(O,I,T,M,m,9,a[17]),M=u(M,O,I,T,E,14,a[18]),T=u(T,M,O,I,s,20,a[19]),I=u(I,T,M,O,y,5,a[20]),O=u(O,I,T,M,w,9,a[21]),M=u(M,O,I,T,x,14,a[22]),T=u(T,M,O,I,b,20,a[23]),I=u(I,T,M,O,_,5,a[24]),O=u(O,I,T,M,k,9,a[25]),M=u(M,O,I,T,p,14,a[26]),T=u(T,M,O,I,v,20,a[27]),I=u(I,T,M,O,A,5,a[28]),O=u(O,I,T,M,l,9,a[29]),M=u(M,O,I,T,g,14,a[30]),I=h(I,T=u(T,M,O,I,S,20,a[31]),M,O,y,4,a[32]),O=h(O,I,T,M,v,11,a[33]),M=h(M,O,I,T,E,16,a[34]),T=h(T,M,O,I,k,23,a[35]),I=h(I,T,M,O,f,4,a[36]),O=h(O,I,T,M,b,11,a[37]),M=h(M,O,I,T,g,16,a[38]),T=h(T,M,O,I,w,23,a[39]),I=h(I,T,M,O,A,4,a[40]),O=h(O,I,T,M,s,11,a[41]),M=h(M,O,I,T,p,16,a[42]),T=h(T,M,O,I,m,23,a[43]),I=h(I,T,M,O,_,4,a[44]),O=h(O,I,T,M,S,11,a[45]),M=h(M,O,I,T,x,16,a[46]),I=d(I,T=h(T,M,O,I,l,23,a[47]),M,O,s,6,a[48]),O=d(O,I,T,M,g,10,a[49]),M=d(M,O,I,T,k,15,a[50]),T=d(T,M,O,I,y,21,a[51]),I=d(I,T,M,O,S,6,a[52]),O=d(O,I,T,M,p,10,a[53]),M=d(M,O,I,T,w,15,a[54]),T=d(T,M,O,I,f,21,a[55]),I=d(I,T,M,O,v,6,a[56]),O=d(O,I,T,M,x,10,a[57]),M=d(M,O,I,T,m,15,a[58]),T=d(T,M,O,I,A,21,a[59]),I=d(I,T,M,O,b,6,a[60]),O=d(O,I,T,M,E,10,a[61]),M=d(M,O,I,T,l,15,a[62]),T=d(T,M,O,I,_,21,a[63]),o[0]=o[0]+I|0,o[1]=o[1]+T|0,o[2]=o[2]+M|0,o[3]=o[3]+O|0},_doFinalize:function(){var t=this._data,r=t.words,n=8*this._nDataBytes,i=8*t.sigBytes;r[i>>>5]|=128<<24-i%32;var o=e.floor(n/4294967296),s=n;r[15+(i+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),r[14+(i+64>>>9<<4)]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),t.sigBytes=4*(r.length+1),this._process();for(var a=this._hash,f=a.words,c=0;c<4;c++){var u=f[c];f[c]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8)}return a},clone:function(){var e=o.clone.call(this);return e._hash=this._hash.clone(),e}});function c(e,t,r,n,i,o,s){var a=e+(t&r|~t&n)+i+s;return(a<<o|a>>>32-o)+t}function u(e,t,r,n,i,o,s){var a=e+(t&n|r&~n)+i+s;return(a<<o|a>>>32-o)+t}function h(e,t,r,n,i,o,s){var a=e+(t^r^n)+i+s;return(a<<o|a>>>32-o)+t}function d(e,t,r,n,i,o,s){var a=e+(r^(t|~n))+i+s;return(a<<o|a>>>32-o)+t}t.MD5=o._createHelper(f),t.HmacMD5=o._createHmacHelper(f)}(Math),n.MD5)},function(e,t,r){var n,i,o,s,a,f,c,u;e.exports=(n=r(13),o=(i=n).lib,s=o.WordArray,a=o.Hasher,f=i.algo,c=[],u=f.SHA1=a.extend({_doReset:function(){this._hash=new s.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var r=this._hash.words,n=r[0],i=r[1],o=r[2],s=r[3],a=r[4],f=0;f<80;f++){if(f<16)c[f]=0|e[t+f];else{var u=c[f-3]^c[f-8]^c[f-14]^c[f-16];c[f]=u<<1|u>>>31}var h=(n<<5|n>>>27)+a+c[f];h+=f<20?1518500249+(i&o|~i&s):f<40?1859775393+(i^o^s):f<60?(i&o|i&s|o&s)-1894007588:(i^o^s)-899497514,a=s,s=o,o=i<<30|i>>>2,i=n,n=h}r[0]=r[0]+n|0,r[1]=r[1]+i|0,r[2]=r[2]+o|0,r[3]=r[3]+s|0,r[4]=r[4]+a|0},_doFinalize:function(){var e=this._data,t=e.words,r=8*this._nDataBytes,n=8*e.sigBytes;return t[n>>>5]|=128<<24-n%32,t[14+(n+64>>>9<<4)]=Math.floor(r/4294967296),t[15+(n+64>>>9<<4)]=r,e.sigBytes=4*t.length,this._process(),this._hash},clone:function(){var e=a.clone.call(this);return e._hash=this._hash.clone(),e}}),i.SHA1=a._createHelper(u),i.HmacSHA1=a._createHmacHelper(u),n.SHA1)},function(e,t,r){var n,i,o,s,a,f,c;e.exports=(n=r(13),o=(i=n).lib,s=o.Base,a=i.enc,f=a.Utf8,c=i.algo,void(c.HMAC=s.extend({init:function(e,t){e=this._hasher=new e.init,"string"==typeof t&&(t=f.parse(t));var r=e.blockSize,n=4*r;t.sigBytes>n&&(t=e.finalize(t)),t.clamp();for(var i=this._oKey=t.clone(),o=this._iKey=t.clone(),s=i.words,a=o.words,c=0;c<r;c++)s[c]^=1549556828,a[c]^=909522486;i.sigBytes=o.sigBytes=n,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var t=this._hasher,r=t.finalize(e);t.reset();var n=t.finalize(this._oKey.clone().concat(r));return n}})))},function(e,t,r){var n;e.exports=(n=r(13),r(127),void(n.lib.Cipher||function(e){var t=n,r=t.lib,i=r.Base,o=r.WordArray,s=r.BufferedBlockAlgorithm,a=t.enc,f=(a.Utf8,a.Base64),c=t.algo,u=c.EvpKDF,h=r.Cipher=s.extend({cfg:i.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,r){this.cfg=this.cfg.extend(r),this._xformMode=e,this._key=t,this.reset()},reset:function(){s.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){e&&this._append(e);var t=this._doFinalize();return t},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function e(e){return"string"==typeof e?S:_}return function(t){return{encrypt:function(r,n,i){return e(n).encrypt(t,r,n,i)},decrypt:function(r,n,i){return e(n).decrypt(t,r,n,i)}}}}()}),d=(r.StreamCipher=h.extend({_doFinalize:function(){var e=this._process(!0);return e},blockSize:1}),t.mode={}),l=r.BlockCipherMode=i.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e,this._iv=t}}),p=d.CBC=function(){var t=l.extend();function r(t,r,n){var i=this._iv;if(i){var o=i;this._iv=e}else var o=this._prevBlock;for(var s=0;s<n;s++)t[r+s]^=o[s]}return t.Encryptor=t.extend({processBlock:function(e,t){var n=this._cipher,i=n.blockSize;r.call(this,e,t,i),n.encryptBlock(e,t),this._prevBlock=e.slice(t,t+i)}}),t.Decryptor=t.extend({processBlock:function(e,t){var n=this._cipher,i=n.blockSize,o=e.slice(t,t+i);n.decryptBlock(e,t),r.call(this,e,t,i),this._prevBlock=o}}),t}(),b=t.pad={},y=b.Pkcs7={pad:function(e,t){for(var r=4*t,n=r-e.sigBytes%r,i=n<<24|n<<16|n<<8|n,s=[],a=0;a<n;a+=4)s.push(i);var f=o.create(s,n);e.concat(f)},unpad:function(e){var t=255&e.words[e.sigBytes-1>>>2];e.sigBytes-=t}},m=(r.BlockCipher=h.extend({cfg:h.cfg.extend({mode:p,padding:y}),reset:function(){h.reset.call(this);var e=this.cfg,t=e.iv,r=e.mode;if(this._xformMode==this._ENC_XFORM_MODE)var n=r.createEncryptor;else{var n=r.createDecryptor;this._minBufferSize=1}this._mode&&this._mode.__creator==n?this._mode.init(this,t&&t.words):(this._mode=n.call(r,this,t&&t.words),this._mode.__creator=n)},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){e.pad(this._data,this.blockSize);var t=this._process(!0)}else{var t=this._process(!0);e.unpad(t)}return t},blockSize:4}),r.CipherParams=i.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}})),g=t.format={},v=g.OpenSSL={stringify:function(e){var t=e.ciphertext,r=e.salt;if(r)var n=o.create([1398893684,1701076831]).concat(r).concat(t);else var n=t;return n.toString(f)},parse:function(e){var t=f.parse(e),r=t.words;if(1398893684==r[0]&&1701076831==r[1]){var n=o.create(r.slice(2,4));r.splice(0,4),t.sigBytes-=16}return m.create({ciphertext:t,salt:n})}},_=r.SerializableCipher=i.extend({cfg:i.extend({format:v}),encrypt:function(e,t,r,n){n=this.cfg.extend(n);var i=e.createEncryptor(r,n),o=i.finalize(t),s=i.cfg;return m.create({ciphertext:o,key:r,iv:s.iv,algorithm:e,mode:s.mode,padding:s.padding,blockSize:e.blockSize,formatter:n.format})},decrypt:function(e,t,r,n){n=this.cfg.extend(n),t=this._parse(t,n.format);var i=e.createDecryptor(r,n).finalize(t.ciphertext);return i},_parse:function(e,t){return"string"==typeof e?t.parse(e,this):e}}),w=t.kdf={},E=w.OpenSSL={execute:function(e,t,r,n){n||(n=o.random(8));var i=u.create({keySize:t+r}).compute(e,n),s=o.create(i.words.slice(t),4*r);return i.sigBytes=4*t,m.create({key:i,iv:s,salt:n})}},S=r.PasswordBasedCipher=_.extend({cfg:_.cfg.extend({kdf:E}),encrypt:function(e,t,r,n){var i=(n=this.cfg.extend(n)).kdf.execute(r,e.keySize,e.ivSize);n.iv=i.iv;var o=_.encrypt.call(this,e,t,i.key,n);return o.mixIn(i),o},decrypt:function(e,t,r,n){n=this.cfg.extend(n),t=this._parse(t,n.format);var i=n.kdf.execute(r,e.keySize,e.ivSize,t.salt);n.iv=i.iv;var o=_.decrypt.call(this,e,t,i.key,n);return o}})}()))},function(e,t,r){(function(t){var n=r(44).pbkdf2Sync,i=2147483647;function o(e,r,n,i,o){if(t.isBuffer(e)&&t.isBuffer(n))e.copy(n,i,r,r+o);else for(;o--;)n[i++]=e[r++]}e.exports=function(e,r,s,a,f,c,u){if(0===s||0!=(s&s-1))throw Error("N must be > 0 and a power of 2");if(s>i/128/a)throw Error("Parameter N is too large");if(a>i/128/f)throw Error("Parameter r is too large");var h,d=new t(256*a),l=new t(128*a*s),p=new Int32Array(16),b=new Int32Array(16),y=new t(64),m=n(e,r,1,128*f*a,"sha256");if(u){var g=f*s*2,v=0;h=function(){++v%1e3==0&&u({current:v,total:g,percent:v/g*100})}}for(var _=0;_<f;_++)w(m,128*_*a,a,s,l,d);return n(e,m,1,c,"sha256");function w(e,t,r,n,i,o){var s,a=128*r;for(e.copy(o,0,t,t+a),s=0;s<n;s++)o.copy(i,s*a,0,0+a),E(o,0,a,r),h&&h();for(s=0;s<n;s++){var f=0+64*(2*r-1);k(i,(o.readUInt32LE(f)&n-1)*a,o,0,a),E(o,0,a,r),h&&h()}o.copy(e,t,0,0+a)}function E(e,t,r,n){var i;for(o(e,t+64*(2*n-1),y,0,64),i=0;i<2*n;i++)k(e,64*i,y,0,64),A(y),o(y,0,e,r+64*i,64);for(i=0;i<n;i++)o(e,r+2*i*64,e,t+64*i,64);for(i=0;i<n;i++)o(e,r+64*(2*i+1),e,t+64*(i+n),64)}function S(e,t){return e<<t|e>>>32-t}function A(e){var t;for(t=0;t<16;t++)p[t]=(255&e[4*t+0])<<0,p[t]|=(255&e[4*t+1])<<8,p[t]|=(255&e[4*t+2])<<16,p[t]|=(255&e[4*t+3])<<24;for(o(p,0,b,0,16),t=8;t>0;t-=2)b[4]^=S(b[0]+b[12],7),b[8]^=S(b[4]+b[0],9),b[12]^=S(b[8]+b[4],13),b[0]^=S(b[12]+b[8],18),b[9]^=S(b[5]+b[1],7),b[13]^=S(b[9]+b[5],9),b[1]^=S(b[13]+b[9],13),b[5]^=S(b[1]+b[13],18),b[14]^=S(b[10]+b[6],7),b[2]^=S(b[14]+b[10],9),b[6]^=S(b[2]+b[14],13),b[10]^=S(b[6]+b[2],18),b[3]^=S(b[15]+b[11],7),b[7]^=S(b[3]+b[15],9),b[11]^=S(b[7]+b[3],13),b[15]^=S(b[11]+b[7],18),b[1]^=S(b[0]+b[3],7),b[2]^=S(b[1]+b[0],9),b[3]^=S(b[2]+b[1],13),b[0]^=S(b[3]+b[2],18),b[6]^=S(b[5]+b[4],7),b[7]^=S(b[6]+b[5],9),b[4]^=S(b[7]+b[6],13),b[5]^=S(b[4]+b[7],18),b[11]^=S(b[10]+b[9],7),b[8]^=S(b[11]+b[10],9),b[9]^=S(b[8]+b[11],13),b[10]^=S(b[9]+b[8],18),b[12]^=S(b[15]+b[14],7),b[13]^=S(b[12]+b[15],9),b[14]^=S(b[13]+b[12],13),b[15]^=S(b[14]+b[13],18);for(t=0;t<16;++t)p[t]=b[t]+p[t];for(t=0;t<16;t++){var r=4*t;e[r+0]=p[t]>>0&255,e[r+1]=p[t]>>8&255,e[r+2]=p[t]>>16&255,e[r+3]=p[t]>>24&255}}function k(e,t,r,n,i){for(var o=0;o<i;o++)r[n+o]^=e[t+o]}}}).call(this,r(2).Buffer)},function(e,t,r){var n,i,o,s,a,f;e.exports=(n=r(13),o=(i=n).lib,s=o.Base,a=o.WordArray,(f=i.x64={}).Word=s.extend({init:function(e,t){this.high=e,this.low=t}}),f.WordArray=s.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=null!=t?t:8*e.length},toX32:function(){for(var e=this.words,t=e.length,r=[],n=0;n<t;n++){var i=e[n];r.push(i.high),r.push(i.low)}return a.create(r,this.sigBytes)},clone:function(){for(var e=s.clone.call(this),t=e.words=this.words.slice(0),r=t.length,n=0;n<r;n++)t[n]=t[n].clone();return e}}),n)},function(e,t,r){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}},function(e,t,r){"use strict";var n=new RegExp("%[a-f0-9]{2}","gi"),i=new RegExp("(%[a-f0-9]{2})+","gi");function o(e,t){try{return decodeURIComponent(e.join(""))}catch(e){}if(1===e.length)return e;t=t||1;var r=e.slice(0,t),n=e.slice(t);return Array.prototype.concat.call([],o(r),o(n))}function s(e){try{return decodeURIComponent(e)}catch(i){for(var t=e.match(n),r=1;r<t.length;r++)t=(e=o(t,r).join("")).match(n);return e}}e.exports=function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return function(e){for(var t={"%FE%FF":"��","%FF%FE":"��"},r=i.exec(e);r;){try{t[r[0]]=decodeURIComponent(r[0])}catch(e){var n=s(r[0]);n!==r[0]&&(t[r[0]]=n)}r=i.exec(e)}t["%C2"]="�";for(var o=Object.keys(t),a=0;a<o.length;a++){var f=o[a];e=e.replace(new RegExp(f,"g"),t[f])}return e}(e)}}},function(e,t,r){"use strict";r.r(t);var n=r(9),i=r.n(n),o=r(8),s=r.n(o),a=r(10),f=r.n(a),c=r(17),u=r.n(c),h=r(16),d=r(23),l=r.n(d),p=r(128),b=function(){function e(t){s()(this,e),this.provider=t}return f()(e,[{key:"setProvider",value:function(e){this.provider=e}},{key:"send",value:function(t){if(!this.provider)return null;var r=e.prepareRequest(t);return this.provider.send(r)}},{key:"sendAsync",value:function(t){if(!this.provider)return null;var r=e.prepareRequest(t);return this.provider.sendAsync(r)}}],[{key:"prepareRequest",value:function(e){var t=e.requestMethod,r=e.method,n=e.params,i=void 0===n?{}:n;return{method:t.toUpperCase(),url:r,params:i}}}]),e}(),y=r(78),m=r(49),g=r(3),v=r(14),_=function e(){s()(this,e),this.defaultAccount=void 0};r.d(t,"default",function(){return E});var w=l.a.sha256,E=function(){function e(t){s()(this,e),u()(this,"providers",{HttpProvider:y.a}),u()(this,"settings",new _),u()(this,"version",{api:"3.2.4"}),this._requestManager=new b(t),this.currentProvider=t,this.chain=new p.a(this._requestManager)}return f()(e,[{key:"isConnected",value:function(){return this.currentProvider&&this.currentProvider.isConnected()}},{key:"reset",value:function(e){this._requestManager.reset(e),this.settings=new _}},{key:"setProvider",value:function(e){this._requestManager.setProvider(e),this.currentProvider=e}}]),e}();u()(E,"version","3.2.4"),u()(E,"providers",{HttpProvider:y.a}),u()(E,"pbjs",h),u()(E,"pbUtils",v),u()(E,"wallet",m.a),u()(E,"utils",i()({},g,{sha256:w}))}]).default});
//# sourceMappingURL=aelf.umd.js.map

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/builtin-status-codes/browser.js":
/*!******************************************************!*\
  !*** ./node_modules/builtin-status-codes/browser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
}


/***/ }),

/***/ "./node_modules/core-util-is/lib/util.js":
/*!***********************************************!*\
  !*** ./node_modules/core-util-is/lib/util.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/https-browserify/index.js":
/*!************************************************!*\
  !*** ./node_modules/https-browserify/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var http = __webpack_require__(/*! http */ "./node_modules/stream-http/index.js")
var url = __webpack_require__(/*! url */ "./node_modules/url/url.js")

var https = module.exports

for (var key in http) {
  if (http.hasOwnProperty(key)) https[key] = http[key]
}

https.request = function (params, cb) {
  params = validateParams(params)
  return http.request.call(this, params, cb)
}

https.get = function (params, cb) {
  params = validateParams(params)
  return http.get.call(this, params, cb)
}

function validateParams (params) {
  if (typeof params === 'string') {
    params = url.parse(params)
  }
  if (!params.protocol) {
    params.protocol = 'https:'
  }
  if (params.protocol !== 'https:') {
    throw new Error('Protocol "' + params.protocol + '" not supported. Expected "https:"')
  }
  return params
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/node-libs-browser/mock/empty.js":
/*!******************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/empty.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process-nextick-args/index.js":
/*!****************************************************!*\
  !*** ./node_modules/process-nextick-args/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_duplex.js":
/*!************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_duplex.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

var Readable = __webpack_require__(/*! ./_stream_readable */ "./node_modules/readable-stream/lib/_stream_readable.js");
var Writable = __webpack_require__(/*! ./_stream_writable */ "./node_modules/readable-stream/lib/_stream_writable.js");

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_passthrough.js":
/*!*****************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_passthrough.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(/*! ./_stream_transform */ "./node_modules/readable-stream/lib/_stream_transform.js");

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_readable.js":
/*!**************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_readable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(/*! ./internal/streams/stream */ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js");
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(/*! util */ 0);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(/*! ./internal/streams/BufferList */ "./node_modules/readable-stream/lib/internal/streams/BufferList.js");
var destroyImpl = __webpack_require__(/*! ./internal/streams/destroy */ "./node_modules/readable-stream/lib/internal/streams/destroy.js");
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(/*! string_decoder/ */ "./node_modules/string_decoder/lib/string_decoder.js").StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(/*! string_decoder/ */ "./node_modules/string_decoder/lib/string_decoder.js").StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_transform.js":
/*!***************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_transform.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_writable.js":
/*!**************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_writable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(/*! util-deprecate */ "./node_modules/util-deprecate/browser.js")
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(/*! ./internal/streams/stream */ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js");
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = __webpack_require__(/*! ./internal/streams/destroy */ "./node_modules/readable-stream/lib/internal/streams/destroy.js");

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/BufferList.js":
/*!*************************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/BufferList.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer;
var util = __webpack_require__(/*! util */ 1);

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/destroy.js":
/*!**********************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/destroy.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/stream-browser.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;


/***/ }),

/***/ "./node_modules/readable-stream/readable-browser.js":
/*!**********************************************************!*\
  !*** ./node_modules/readable-stream/readable-browser.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ./lib/_stream_readable.js */ "./node_modules/readable-stream/lib/_stream_readable.js");
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(/*! ./lib/_stream_writable.js */ "./node_modules/readable-stream/lib/_stream_writable.js");
exports.Duplex = __webpack_require__(/*! ./lib/_stream_duplex.js */ "./node_modules/readable-stream/lib/_stream_duplex.js");
exports.Transform = __webpack_require__(/*! ./lib/_stream_transform.js */ "./node_modules/readable-stream/lib/_stream_transform.js");
exports.PassThrough = __webpack_require__(/*! ./lib/_stream_passthrough.js */ "./node_modules/readable-stream/lib/_stream_passthrough.js");


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./node_modules/safe-buffer/index.js":
/*!*******************************************!*\
  !*** ./node_modules/safe-buffer/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/stream-http/index.js":
/*!*******************************************!*\
  !*** ./node_modules/stream-http/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var ClientRequest = __webpack_require__(/*! ./lib/request */ "./node_modules/stream-http/lib/request.js")
var response = __webpack_require__(/*! ./lib/response */ "./node_modules/stream-http/lib/response.js")
var extend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js")
var statusCodes = __webpack_require__(/*! builtin-status-codes */ "./node_modules/builtin-status-codes/browser.js")
var url = __webpack_require__(/*! url */ "./node_modules/url/url.js")

var http = exports

http.request = function (opts, cb) {
	if (typeof opts === 'string')
		opts = url.parse(opts)
	else
		opts = extend(opts)

	// Normally, the page is loaded from http or https, so not specifying a protocol
	// will result in a (valid) protocol-relative url. However, this won't work if
	// the protocol is something else, like 'file:'
	var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''

	var protocol = opts.protocol || defaultProtocol
	var host = opts.hostname || opts.host
	var port = opts.port
	var path = opts.path || '/'

	// Necessary for IPv6 addresses
	if (host && host.indexOf(':') !== -1)
		host = '[' + host + ']'

	// This may be a relative url. The browser should always be able to interpret it correctly.
	opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
	opts.method = (opts.method || 'GET').toUpperCase()
	opts.headers = opts.headers || {}

	// Also valid opts.auth, opts.mode

	var req = new ClientRequest(opts)
	if (cb)
		req.on('response', cb)
	return req
}

http.get = function get (opts, cb) {
	var req = http.request(opts, cb)
	req.end()
	return req
}

http.ClientRequest = ClientRequest
http.IncomingMessage = response.IncomingMessage

http.Agent = function () {}
http.Agent.defaultMaxSockets = 4

http.globalAgent = new http.Agent()

http.STATUS_CODES = statusCodes

http.METHODS = [
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'DELETE',
	'GET',
	'HEAD',
	'LOCK',
	'M-SEARCH',
	'MERGE',
	'MKACTIVITY',
	'MKCOL',
	'MOVE',
	'NOTIFY',
	'OPTIONS',
	'PATCH',
	'POST',
	'PROPFIND',
	'PROPPATCH',
	'PURGE',
	'PUT',
	'REPORT',
	'SEARCH',
	'SUBSCRIBE',
	'TRACE',
	'UNLOCK',
	'UNSUBSCRIBE'
]
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/stream-http/lib/capability.js":
/*!****************************************************!*\
  !*** ./node_modules/stream-http/lib/capability.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream)

exports.writableStream = isFunction(global.WritableStream)

exports.abortController = isFunction(global.AbortController)

exports.blobConstructor = false
try {
	new Blob([new ArrayBuffer(1)])
	exports.blobConstructor = true
} catch (e) {}

// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr
function getXHR () {
	// Cache the xhr value
	if (xhr !== undefined) return xhr

	if (global.XMLHttpRequest) {
		xhr = new global.XMLHttpRequest()
		// If XDomainRequest is available (ie only, where xhr might not work
		// cross domain), use the page location. Otherwise use example.com
		// Note: this doesn't actually make an http request.
		try {
			xhr.open('GET', global.XDomainRequest ? '/' : 'https://example.com')
		} catch(e) {
			xhr = null
		}
	} else {
		// Service workers don't have XHR
		xhr = null
	}
	return xhr
}

function checkTypeSupport (type) {
	var xhr = getXHR()
	if (!xhr) return false
	try {
		xhr.responseType = type
		return xhr.responseType === type
	} catch (e) {}
	return false
}

// For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
// Safari 7.1 appears to have fixed this bug.
var haveArrayBuffer = typeof global.ArrayBuffer !== 'undefined'
var haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice)

// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer = exports.fetch || (haveArrayBuffer && checkTypeSupport('arraybuffer'))

// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream = !exports.fetch && haveSlice && checkTypeSupport('ms-stream')
exports.mozchunkedarraybuffer = !exports.fetch && haveArrayBuffer &&
	checkTypeSupport('moz-chunked-arraybuffer')

// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false)

exports.vbArray = isFunction(global.VBArray)

function isFunction (value) {
	return typeof value === 'function'
}

xhr = null // Help gc

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/stream-http/lib/request.js":
/*!*************************************************!*\
  !*** ./node_modules/stream-http/lib/request.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, global, process) {var capability = __webpack_require__(/*! ./capability */ "./node_modules/stream-http/lib/capability.js")
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
var response = __webpack_require__(/*! ./response */ "./node_modules/stream-http/lib/response.js")
var stream = __webpack_require__(/*! readable-stream */ "./node_modules/readable-stream/readable-browser.js")
var toArrayBuffer = __webpack_require__(/*! to-arraybuffer */ "./node_modules/to-arraybuffer/index.js")

var IncomingMessage = response.IncomingMessage
var rStates = response.readyStates

function decideMode (preferBinary, useFetch) {
	if (capability.fetch && useFetch) {
		return 'fetch'
	} else if (capability.mozchunkedarraybuffer) {
		return 'moz-chunked-arraybuffer'
	} else if (capability.msstream) {
		return 'ms-stream'
	} else if (capability.arraybuffer && preferBinary) {
		return 'arraybuffer'
	} else if (capability.vbArray && preferBinary) {
		return 'text:vbarray'
	} else {
		return 'text'
	}
}

var ClientRequest = module.exports = function (opts) {
	var self = this
	stream.Writable.call(self)

	self._opts = opts
	self._body = []
	self._headers = {}
	if (opts.auth)
		self.setHeader('Authorization', 'Basic ' + new Buffer(opts.auth).toString('base64'))
	Object.keys(opts.headers).forEach(function (name) {
		self.setHeader(name, opts.headers[name])
	})

	var preferBinary
	var useFetch = true
	if (opts.mode === 'disable-fetch' || ('requestTimeout' in opts && !capability.abortController)) {
		// If the use of XHR should be preferred. Not typically needed.
		useFetch = false
		preferBinary = true
	} else if (opts.mode === 'prefer-streaming') {
		// If streaming is a high priority but binary compatibility and
		// the accuracy of the 'content-type' header aren't
		preferBinary = false
	} else if (opts.mode === 'allow-wrong-content-type') {
		// If streaming is more important than preserving the 'content-type' header
		preferBinary = !capability.overrideMimeType
	} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
		// Use binary if text streaming may corrupt data or the content-type header, or for speed
		preferBinary = true
	} else {
		throw new Error('Invalid value for opts.mode')
	}
	self._mode = decideMode(preferBinary, useFetch)
	self._fetchTimer = null

	self.on('finish', function () {
		self._onFinish()
	})
}

inherits(ClientRequest, stream.Writable)

ClientRequest.prototype.setHeader = function (name, value) {
	var self = this
	var lowerName = name.toLowerCase()
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1)
		return

	self._headers[lowerName] = {
		name: name,
		value: value
	}
}

ClientRequest.prototype.getHeader = function (name) {
	var header = this._headers[name.toLowerCase()]
	if (header)
		return header.value
	return null
}

ClientRequest.prototype.removeHeader = function (name) {
	var self = this
	delete self._headers[name.toLowerCase()]
}

ClientRequest.prototype._onFinish = function () {
	var self = this

	if (self._destroyed)
		return
	var opts = self._opts

	var headersObj = self._headers
	var body = null
	if (opts.method !== 'GET' && opts.method !== 'HEAD') {
		if (capability.arraybuffer) {
			body = toArrayBuffer(Buffer.concat(self._body))
		} else if (capability.blobConstructor) {
			body = new global.Blob(self._body.map(function (buffer) {
				return toArrayBuffer(buffer)
			}), {
				type: (headersObj['content-type'] || {}).value || ''
			})
		} else {
			// get utf8 string
			body = Buffer.concat(self._body).toString()
		}
	}

	// create flattened list of headers
	var headersList = []
	Object.keys(headersObj).forEach(function (keyName) {
		var name = headersObj[keyName].name
		var value = headersObj[keyName].value
		if (Array.isArray(value)) {
			value.forEach(function (v) {
				headersList.push([name, v])
			})
		} else {
			headersList.push([name, value])
		}
	})

	if (self._mode === 'fetch') {
		var signal = null
		var fetchTimer = null
		if (capability.abortController) {
			var controller = new AbortController()
			signal = controller.signal
			self._fetchAbortController = controller

			if ('requestTimeout' in opts && opts.requestTimeout !== 0) {
				self._fetchTimer = global.setTimeout(function () {
					self.emit('requestTimeout')
					if (self._fetchAbortController)
						self._fetchAbortController.abort()
				}, opts.requestTimeout)
			}
		}

		global.fetch(self._opts.url, {
			method: self._opts.method,
			headers: headersList,
			body: body || undefined,
			mode: 'cors',
			credentials: opts.withCredentials ? 'include' : 'same-origin',
			signal: signal
		}).then(function (response) {
			self._fetchResponse = response
			self._connect()
		}, function (reason) {
			global.clearTimeout(self._fetchTimer)
			if (!self._destroyed)
				self.emit('error', reason)
		})
	} else {
		var xhr = self._xhr = new global.XMLHttpRequest()
		try {
			xhr.open(self._opts.method, self._opts.url, true)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}

		// Can't set responseType on really old browsers
		if ('responseType' in xhr)
			xhr.responseType = self._mode.split(':')[0]

		if ('withCredentials' in xhr)
			xhr.withCredentials = !!opts.withCredentials

		if (self._mode === 'text' && 'overrideMimeType' in xhr)
			xhr.overrideMimeType('text/plain; charset=x-user-defined')

		if ('requestTimeout' in opts) {
			xhr.timeout = opts.requestTimeout
			xhr.ontimeout = function () {
				self.emit('requestTimeout')
			}
		}

		headersList.forEach(function (header) {
			xhr.setRequestHeader(header[0], header[1])
		})

		self._response = null
		xhr.onreadystatechange = function () {
			switch (xhr.readyState) {
				case rStates.LOADING:
				case rStates.DONE:
					self._onXHRProgress()
					break
			}
		}
		// Necessary for streaming in Firefox, since xhr.response is ONLY defined
		// in onprogress, not in onreadystatechange with xhr.readyState = 3
		if (self._mode === 'moz-chunked-arraybuffer') {
			xhr.onprogress = function () {
				self._onXHRProgress()
			}
		}

		xhr.onerror = function () {
			if (self._destroyed)
				return
			self.emit('error', new Error('XHR error'))
		}

		try {
			xhr.send(body)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}
	}
}

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid (xhr) {
	try {
		var status = xhr.status
		return (status !== null && status !== 0)
	} catch (e) {
		return false
	}
}

ClientRequest.prototype._onXHRProgress = function () {
	var self = this

	if (!statusValid(self._xhr) || self._destroyed)
		return

	if (!self._response)
		self._connect()

	self._response._onXHRProgress()
}

ClientRequest.prototype._connect = function () {
	var self = this

	if (self._destroyed)
		return

	self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode, self._fetchTimer)
	self._response.on('error', function(err) {
		self.emit('error', err)
	})

	self.emit('response', self._response)
}

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	var self = this

	self._body.push(chunk)
	cb()
}

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function () {
	var self = this
	self._destroyed = true
	global.clearTimeout(self._fetchTimer)
	if (self._response)
		self._response._destroyed = true
	if (self._xhr)
		self._xhr.abort()
	else if (self._fetchAbortController)
		self._fetchAbortController.abort()
}

ClientRequest.prototype.end = function (data, encoding, cb) {
	var self = this
	if (typeof data === 'function') {
		cb = data
		data = undefined
	}

	stream.Writable.prototype.end.call(self, data, encoding, cb)
}

ClientRequest.prototype.flushHeaders = function () {}
ClientRequest.prototype.setTimeout = function () {}
ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'via'
]

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/stream-http/lib/response.js":
/*!**************************************************!*\
  !*** ./node_modules/stream-http/lib/response.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Buffer, global) {var capability = __webpack_require__(/*! ./capability */ "./node_modules/stream-http/lib/capability.js")
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
var stream = __webpack_require__(/*! readable-stream */ "./node_modules/readable-stream/readable-browser.js")

var rStates = exports.readyStates = {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
}

var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode, fetchTimer) {
	var self = this
	stream.Readable.call(self)

	self._mode = mode
	self.headers = {}
	self.rawHeaders = []
	self.trailers = {}
	self.rawTrailers = []

	// Fake the 'close' event, but only once 'end' fires
	self.on('end', function () {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		process.nextTick(function () {
			self.emit('close')
		})
	})

	if (mode === 'fetch') {
		self._fetchResponse = response

		self.url = response.url
		self.statusCode = response.status
		self.statusMessage = response.statusText
		
		response.headers.forEach(function (header, key){
			self.headers[key.toLowerCase()] = header
			self.rawHeaders.push(key, header)
		})

		if (capability.writableStream) {
			var writable = new WritableStream({
				write: function (chunk) {
					return new Promise(function (resolve, reject) {
						if (self._destroyed) {
							reject()
						} else if(self.push(new Buffer(chunk))) {
							resolve()
						} else {
							self._resumeFetch = resolve
						}
					})
				},
				close: function () {
					global.clearTimeout(fetchTimer)
					if (!self._destroyed)
						self.push(null)
				},
				abort: function (err) {
					if (!self._destroyed)
						self.emit('error', err)
				}
			})

			try {
				response.body.pipeTo(writable).catch(function (err) {
					global.clearTimeout(fetchTimer)
					if (!self._destroyed)
						self.emit('error', err)
				})
				return
			} catch (e) {} // pipeTo method isn't defined. Can't find a better way to feature test this
		}
		// fallback for when writableStream or pipeTo aren't available
		var reader = response.body.getReader()
		function read () {
			reader.read().then(function (result) {
				if (self._destroyed)
					return
				if (result.done) {
					global.clearTimeout(fetchTimer)
					self.push(null)
					return
				}
				self.push(new Buffer(result.value))
				read()
			}).catch(function (err) {
				global.clearTimeout(fetchTimer)
				if (!self._destroyed)
					self.emit('error', err)
			})
		}
		read()
	} else {
		self._xhr = xhr
		self._pos = 0

		self.url = xhr.responseURL
		self.statusCode = xhr.status
		self.statusMessage = xhr.statusText
		var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
		headers.forEach(function (header) {
			var matches = header.match(/^([^:]+):\s*(.*)/)
			if (matches) {
				var key = matches[1].toLowerCase()
				if (key === 'set-cookie') {
					if (self.headers[key] === undefined) {
						self.headers[key] = []
					}
					self.headers[key].push(matches[2])
				} else if (self.headers[key] !== undefined) {
					self.headers[key] += ', ' + matches[2]
				} else {
					self.headers[key] = matches[2]
				}
				self.rawHeaders.push(matches[1], matches[2])
			}
		})

		self._charset = 'x-user-defined'
		if (!capability.overrideMimeType) {
			var mimeType = self.rawHeaders['mime-type']
			if (mimeType) {
				var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/)
				if (charsetMatch) {
					self._charset = charsetMatch[1].toLowerCase()
				}
			}
			if (!self._charset)
				self._charset = 'utf-8' // best guess
		}
	}
}

inherits(IncomingMessage, stream.Readable)

IncomingMessage.prototype._read = function () {
	var self = this

	var resolve = self._resumeFetch
	if (resolve) {
		self._resumeFetch = null
		resolve()
	}
}

IncomingMessage.prototype._onXHRProgress = function () {
	var self = this

	var xhr = self._xhr

	var response = null
	switch (self._mode) {
		case 'text:vbarray': // For IE9
			if (xhr.readyState !== rStates.DONE)
				break
			try {
				// This fails in IE8
				response = new global.VBArray(xhr.responseBody).toArray()
			} catch (e) {}
			if (response !== null) {
				self.push(new Buffer(response))
				break
			}
			// Falls through in IE8	
		case 'text':
			try { // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
				response = xhr.responseText
			} catch (e) {
				self._mode = 'text:vbarray'
				break
			}
			if (response.length > self._pos) {
				var newData = response.substr(self._pos)
				if (self._charset === 'x-user-defined') {
					var buffer = new Buffer(newData.length)
					for (var i = 0; i < newData.length; i++)
						buffer[i] = newData.charCodeAt(i) & 0xff

					self.push(buffer)
				} else {
					self.push(newData, self._charset)
				}
				self._pos = response.length
			}
			break
		case 'arraybuffer':
			if (xhr.readyState !== rStates.DONE || !xhr.response)
				break
			response = xhr.response
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'moz-chunked-arraybuffer': // take whole
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING || !response)
				break
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'ms-stream':
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING)
				break
			var reader = new global.MSStreamReader()
			reader.onprogress = function () {
				if (reader.result.byteLength > self._pos) {
					self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))))
					self._pos = reader.result.byteLength
				}
			}
			reader.onload = function () {
				self.push(null)
			}
			// reader.onerror = ??? // TODO: this
			reader.readAsArrayBuffer(response)
			break
	}

	// The ms-stream case handles end separately in reader.onload()
	if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
		self.push(null)
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/string_decoder/lib/string_decoder.js":
/*!***********************************************************!*\
  !*** ./node_modules/string_decoder/lib/string_decoder.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/to-arraybuffer/index.js":
/*!**********************************************!*\
  !*** ./node_modules/to-arraybuffer/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js").Buffer

module.exports = function (buf) {
	// If the buffer is backed by a Uint8Array, a faster version will work
	if (buf instanceof Uint8Array) {
		// If the buffer isn't a subarray, return the underlying ArrayBuffer
		if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
			return buf.buffer
		} else if (typeof buf.buffer.slice === 'function') {
			// Otherwise we need to get a proper copy
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
		}
	}

	if (Buffer.isBuffer(buf)) {
		// This is the slow version that will work with any Buffer
		// implementation (even in old browsers)
		var arrayCopy = new Uint8Array(buf.length)
		var len = buf.length
		for (var i = 0; i < len; i++) {
			arrayCopy[i] = buf[i]
		}
		return arrayCopy.buffer
	} else {
		throw new Error('Argument must be a Buffer')
	}
}


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/util-deprecate/browser.js":
/*!************************************************!*\
  !*** ./node_modules/util-deprecate/browser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/xmlhttprequest/lib/XMLHttpRequest.js":
/*!***********************************************************!*\
  !*** ./node_modules/xmlhttprequest/lib/XMLHttpRequest.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, process) {/**
 * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
 *
 * This can be used with JS designed for browsers to improve reuse of code and
 * allow the use of existing libraries.
 *
 * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
 *
 * @author Dan DeFelippi <dan@driverdan.com>
 * @contributor David Ellis <d.f.ellis@ieee.org>
 * @license MIT
 */

var Url = __webpack_require__(/*! url */ "./node_modules/url/url.js");
var spawn = __webpack_require__(/*! child_process */ "./node_modules/node-libs-browser/mock/empty.js").spawn;
var fs = __webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js");

exports.XMLHttpRequest = function() {
  "use strict";

  /**
   * Private variables
   */
  var self = this;
  var http = __webpack_require__(/*! http */ "./node_modules/stream-http/index.js");
  var https = __webpack_require__(/*! https */ "./node_modules/https-browserify/index.js");

  // Holds http.js objects
  var request;
  var response;

  // Request settings
  var settings = {};

  // Disable header blacklist.
  // Not part of XHR specs.
  var disableHeaderCheck = false;

  // Set some default headers
  var defaultHeaders = {
    "User-Agent": "node-XMLHttpRequest",
    "Accept": "*/*",
  };

  var headers = {};
  var headersCase = {};

  // These headers are not user setable.
  // The following are allowed but banned in the spec:
  // * user-agent
  var forbiddenRequestHeaders = [
    "accept-charset",
    "accept-encoding",
    "access-control-request-headers",
    "access-control-request-method",
    "connection",
    "content-length",
    "content-transfer-encoding",
    "cookie",
    "cookie2",
    "date",
    "expect",
    "host",
    "keep-alive",
    "origin",
    "referer",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
    "via"
  ];

  // These request methods are not allowed
  var forbiddenRequestMethods = [
    "TRACE",
    "TRACK",
    "CONNECT"
  ];

  // Send flag
  var sendFlag = false;
  // Error flag, used when errors occur or abort is called
  var errorFlag = false;

  // Event listeners
  var listeners = {};

  /**
   * Constants
   */

  this.UNSENT = 0;
  this.OPENED = 1;
  this.HEADERS_RECEIVED = 2;
  this.LOADING = 3;
  this.DONE = 4;

  /**
   * Public vars
   */

  // Current state
  this.readyState = this.UNSENT;

  // default ready state change handler in case one is not set or is set late
  this.onreadystatechange = null;

  // Result & response
  this.responseText = "";
  this.responseXML = "";
  this.status = null;
  this.statusText = null;
  
  // Whether cross-site Access-Control requests should be made using
  // credentials such as cookies or authorization headers
  this.withCredentials = false;

  /**
   * Private methods
   */

  /**
   * Check if the specified header is allowed.
   *
   * @param string header Header to validate
   * @return boolean False if not allowed, otherwise true
   */
  var isAllowedHttpHeader = function(header) {
    return disableHeaderCheck || (header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1);
  };

  /**
   * Check if the specified method is allowed.
   *
   * @param string method Request method to validate
   * @return boolean False if not allowed, otherwise true
   */
  var isAllowedHttpMethod = function(method) {
    return (method && forbiddenRequestMethods.indexOf(method) === -1);
  };

  /**
   * Public methods
   */

  /**
   * Open the connection. Currently supports local server requests.
   *
   * @param string method Connection method (eg GET, POST)
   * @param string url URL for the connection.
   * @param boolean async Asynchronous connection. Default is true.
   * @param string user Username for basic authentication (optional)
   * @param string password Password for basic authentication (optional)
   */
  this.open = function(method, url, async, user, password) {
    this.abort();
    errorFlag = false;

    // Check for valid request method
    if (!isAllowedHttpMethod(method)) {
      throw new Error("SecurityError: Request method not allowed");
    }

    settings = {
      "method": method,
      "url": url.toString(),
      "async": (typeof async !== "boolean" ? true : async),
      "user": user || null,
      "password": password || null
    };

    setState(this.OPENED);
  };

  /**
   * Disables or enables isAllowedHttpHeader() check the request. Enabled by default.
   * This does not conform to the W3C spec.
   *
   * @param boolean state Enable or disable header checking.
   */
  this.setDisableHeaderCheck = function(state) {
    disableHeaderCheck = state;
  };

  /**
   * Sets a header for the request or appends the value if one is already set.
   *
   * @param string header Header name
   * @param string value Header value
   */
  this.setRequestHeader = function(header, value) {
    if (this.readyState !== this.OPENED) {
      throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");
    }
    if (!isAllowedHttpHeader(header)) {
      console.warn("Refused to set unsafe header \"" + header + "\"");
      return;
    }
    if (sendFlag) {
      throw new Error("INVALID_STATE_ERR: send flag is true");
    }
    header = headersCase[header.toLowerCase()] || header;
    headersCase[header.toLowerCase()] = header;
    headers[header] = headers[header] ? headers[header] + ', ' + value : value;
  };

  /**
   * Gets a header from the server response.
   *
   * @param string header Name of header to get.
   * @return string Text of the header or null if it doesn't exist.
   */
  this.getResponseHeader = function(header) {
    if (typeof header === "string"
      && this.readyState > this.OPENED
      && response
      && response.headers
      && response.headers[header.toLowerCase()]
      && !errorFlag
    ) {
      return response.headers[header.toLowerCase()];
    }

    return null;
  };

  /**
   * Gets all the response headers.
   *
   * @return string A string with all response headers separated by CR+LF
   */
  this.getAllResponseHeaders = function() {
    if (this.readyState < this.HEADERS_RECEIVED || errorFlag) {
      return "";
    }
    var result = "";

    for (var i in response.headers) {
      // Cookie headers are excluded
      if (i !== "set-cookie" && i !== "set-cookie2") {
        result += i + ": " + response.headers[i] + "\r\n";
      }
    }
    return result.substr(0, result.length - 2);
  };

  /**
   * Gets a request header
   *
   * @param string name Name of header to get
   * @return string Returns the request header or empty string if not set
   */
  this.getRequestHeader = function(name) {
    if (typeof name === "string" && headersCase[name.toLowerCase()]) {
      return headers[headersCase[name.toLowerCase()]];
    }

    return "";
  };

  /**
   * Sends the request to the server.
   *
   * @param string data Optional data to send as request body.
   */
  this.send = function(data) {
    if (this.readyState !== this.OPENED) {
      throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");
    }

    if (sendFlag) {
      throw new Error("INVALID_STATE_ERR: send has already been called");
    }

    var ssl = false, local = false;
    var url = Url.parse(settings.url);
    var host;
    // Determine the server
    switch (url.protocol) {
      case "https:":
        ssl = true;
        // SSL & non-SSL both need host, no break here.
      case "http:":
        host = url.hostname;
        break;

      case "file:":
        local = true;
        break;

      case undefined:
      case null:
      case "":
        host = "localhost";
        break;

      default:
        throw new Error("Protocol not supported.");
    }

    // Load files off the local filesystem (file://)
    if (local) {
      if (settings.method !== "GET") {
        throw new Error("XMLHttpRequest: Only GET method is supported");
      }

      if (settings.async) {
        fs.readFile(url.pathname, "utf8", function(error, data) {
          if (error) {
            self.handleError(error);
          } else {
            self.status = 200;
            self.responseText = data;
            setState(self.DONE);
          }
        });
      } else {
        try {
          this.responseText = fs.readFileSync(url.pathname, "utf8");
          this.status = 200;
          setState(self.DONE);
        } catch(e) {
          this.handleError(e);
        }
      }

      return;
    }

    // Default to port 80. If accessing localhost on another port be sure
    // to use http://localhost:port/path
    var port = url.port || (ssl ? 443 : 80);
    // Add query string if one is used
    var uri = url.pathname + (url.search ? url.search : "");

    // Set the defaults if they haven't been set
    for (var name in defaultHeaders) {
      if (!headersCase[name.toLowerCase()]) {
        headers[name] = defaultHeaders[name];
      }
    }

    // Set the Host header or the server may reject the request
    headers.Host = host;
    if (!((ssl && port === 443) || port === 80)) {
      headers.Host += ":" + url.port;
    }

    // Set Basic Auth if necessary
    if (settings.user) {
      if (typeof settings.password === "undefined") {
        settings.password = "";
      }
      var authBuf = new Buffer(settings.user + ":" + settings.password);
      headers.Authorization = "Basic " + authBuf.toString("base64");
    }

    // Set content length header
    if (settings.method === "GET" || settings.method === "HEAD") {
      data = null;
    } else if (data) {
      headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);

      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "text/plain;charset=UTF-8";
      }
    } else if (settings.method === "POST") {
      // For a post with no data set Content-Length: 0.
      // This is required by buggy servers that don't meet the specs.
      headers["Content-Length"] = 0;
    }

    var options = {
      host: host,
      port: port,
      path: uri,
      method: settings.method,
      headers: headers,
      agent: false,
      withCredentials: self.withCredentials
    };

    // Reset error flag
    errorFlag = false;

    // Handle async requests
    if (settings.async) {
      // Use the proper protocol
      var doRequest = ssl ? https.request : http.request;

      // Request is being sent, set send flag
      sendFlag = true;

      // As per spec, this is called here for historical reasons.
      self.dispatchEvent("readystatechange");

      // Handler for the response
      var responseHandler = function responseHandler(resp) {
        // Set response var to the response we got back
        // This is so it remains accessable outside this scope
        response = resp;
        // Check for redirect
        // @TODO Prevent looped redirects
        if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
          // Change URL to the redirect location
          settings.url = response.headers.location;
          var url = Url.parse(settings.url);
          // Set host var in case it's used later
          host = url.hostname;
          // Options for the new request
          var newOptions = {
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            method: response.statusCode === 303 ? "GET" : settings.method,
            headers: headers,
            withCredentials: self.withCredentials
          };

          // Issue the new request
          request = doRequest(newOptions, responseHandler).on("error", errorHandler);
          request.end();
          // @TODO Check if an XHR event needs to be fired here
          return;
        }

        response.setEncoding("utf8");

        setState(self.HEADERS_RECEIVED);
        self.status = response.statusCode;

        response.on("data", function(chunk) {
          // Make sure there's some data
          if (chunk) {
            self.responseText += chunk;
          }
          // Don't emit state changes if the connection has been aborted.
          if (sendFlag) {
            setState(self.LOADING);
          }
        });

        response.on("end", function() {
          if (sendFlag) {
            // Discard the end event if the connection has been aborted
            setState(self.DONE);
            sendFlag = false;
          }
        });

        response.on("error", function(error) {
          self.handleError(error);
        });
      };

      // Error handler for the request
      var errorHandler = function errorHandler(error) {
        self.handleError(error);
      };

      // Create the request
      request = doRequest(options, responseHandler).on("error", errorHandler);

      // Node 0.4 and later won't accept empty data. Make sure it's needed.
      if (data) {
        request.write(data);
      }

      request.end();

      self.dispatchEvent("loadstart");
    } else { // Synchronous
      // Create a temporary file for communication with the other Node process
      var contentFile = ".node-xmlhttprequest-content-" + process.pid;
      var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
      fs.writeFileSync(syncFile, "", "utf8");
      // The async request the other Node process executes
      var execString = "var http = require('http'), https = require('https'), fs = require('fs');"
        + "var doRequest = http" + (ssl ? "s" : "") + ".request;"
        + "var options = " + JSON.stringify(options) + ";"
        + "var responseText = '';"
        + "var req = doRequest(options, function(response) {"
        + "response.setEncoding('utf8');"
        + "response.on('data', function(chunk) {"
        + "  responseText += chunk;"
        + "});"
        + "response.on('end', function() {"
        + "fs.writeFileSync('" + contentFile + "', JSON.stringify({err: null, data: {statusCode: response.statusCode, headers: response.headers, text: responseText}}), 'utf8');"
        + "fs.unlinkSync('" + syncFile + "');"
        + "});"
        + "response.on('error', function(error) {"
        + "fs.writeFileSync('" + contentFile + "', JSON.stringify({err: error}), 'utf8');"
        + "fs.unlinkSync('" + syncFile + "');"
        + "});"
        + "}).on('error', function(error) {"
        + "fs.writeFileSync('" + contentFile + "', JSON.stringify({err: error}), 'utf8');"
        + "fs.unlinkSync('" + syncFile + "');"
        + "});"
        + (data ? "req.write('" + JSON.stringify(data).slice(1,-1).replace(/'/g, "\\'") + "');":"")
        + "req.end();";
      // Start the other Node Process, executing this string
      var syncProc = spawn(process.argv[0], ["-e", execString]);
      while(fs.existsSync(syncFile)) {
        // Wait while the sync file is empty
      }
      var resp = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
      // Kill the child process once the file has data
      syncProc.stdin.end();
      // Remove the temporary file
      fs.unlinkSync(contentFile);

      if (resp.err) {
        self.handleError(resp.err);
      } else {
        response = resp.data;
        self.status = resp.data.statusCode;
        self.responseText = resp.data.text;
        setState(self.DONE);
      }
    }
  };

  /**
   * Called when an error is encountered to deal with it.
   */
  this.handleError = function(error) {
    this.status = 0;
    this.statusText = error;
    this.responseText = error.stack;
    errorFlag = true;
    setState(this.DONE);
    this.dispatchEvent('error');
  };

  /**
   * Aborts a request.
   */
  this.abort = function() {
    if (request) {
      request.abort();
      request = null;
    }

    headers = defaultHeaders;
    this.status = 0;
    this.responseText = "";
    this.responseXML = "";

    errorFlag = true;

    if (this.readyState !== this.UNSENT
        && (this.readyState !== this.OPENED || sendFlag)
        && this.readyState !== this.DONE) {
      sendFlag = false;
      setState(this.DONE);
    }
    this.readyState = this.UNSENT;
    this.dispatchEvent('abort');
  };

  /**
   * Adds an event listener. Preferred method of binding to events.
   */
  this.addEventListener = function(event, callback) {
    if (!(event in listeners)) {
      listeners[event] = [];
    }
    // Currently allows duplicate callbacks. Should it?
    listeners[event].push(callback);
  };

  /**
   * Remove an event callback that has already been bound.
   * Only works on the matching funciton, cannot be a copy.
   */
  this.removeEventListener = function(event, callback) {
    if (event in listeners) {
      // Filter will return a new array with the callback removed
      listeners[event] = listeners[event].filter(function(ev) {
        return ev !== callback;
      });
    }
  };

  /**
   * Dispatch any events, including both "on" methods and events attached using addEventListener.
   */
  this.dispatchEvent = function(event) {
    if (typeof self["on" + event] === "function") {
      self["on" + event]();
    }
    if (event in listeners) {
      for (var i = 0, len = listeners[event].length; i < len; i++) {
        listeners[event][i].call(self);
      }
    }
  };

  /**
   * Changes readyState and calls onreadystatechange.
   *
   * @param int state New state
   */
  var setState = function(state) {
    if (state == self.LOADING || self.readyState !== state) {
      self.readyState = state;

      if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
        self.dispatchEvent("readystatechange");
      }

      if (self.readyState === self.DONE && !errorFlag) {
        self.dispatchEvent("load");
        // @TODO figure out InspectorInstrumentation::didLoadXHR(cookie)
        self.dispatchEvent("loadend");
      }
    }
  };
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/xtend/immutable.js":
/*!*****************************************!*\
  !*** ./node_modules/xtend/immutable.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),

/***/ 0:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=bingo.bundle.js.map
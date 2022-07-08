/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addons/fps.ts":
/*!***************************!*\
  !*** ./src/addons/fps.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar fps = 0;\nvar gfps = 0;\nsetInterval(function () { gfps = fps; fps = 0; }, 1000);\nvar fpsMeter = function (scene) {\n    fps++;\n    scene.fillText(gfps.toString(), 20, 20);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fpsMeter);\n\n\n//# sourceURL=webpack://kostya-game/./src/addons/fps.ts?");

/***/ }),

/***/ "./src/classes/Character.ts":
/*!**********************************!*\
  !*** ./src/classes/Character.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ \"./src/classes/GameObject.ts\");\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sprite */ \"./src/classes/Sprite.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar Character = /** @class */ (function (_super) {\n    __extends(Character, _super);\n    function Character(x, y) {\n        var _this = _super.call(this) || this;\n        _this.faced = 1;\n        _this.sprites = {\n            \"idle\": new _Sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"](12, \"idle.png\", 0.30),\n            \"run\": new _Sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"](8, \"run.png\", 0.2),\n            \"jump\": new _Sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"](1, \"jump.png\", 0),\n            \"fall\": new _Sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"](2, \"fall.png\", 0.1),\n            \"landing\": new _Sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"](1, \"landing.png\", 0),\n        };\n        _this.x = x;\n        _this.y = y;\n        _this.height = 165;\n        _this.width = 100;\n        _this.speed = 0.25;\n        _this.mass = .5;\n        _this.hasGround = false;\n        return _this;\n    }\n    return Character;\n}(_GameObject__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Character);\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/Character.ts?");

/***/ }),

/***/ "./src/classes/Engine/Camera.ts":
/*!**************************************!*\
  !*** ./src/classes/Engine/Camera.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"_Camera\": () => (/* binding */ _Camera),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_createVirtualPoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/createVirtualPoint */ \"./src/utils/createVirtualPoint.ts\");\n/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Keyboard */ \"./src/classes/Engine/Keyboard.ts\");\n/* harmony import */ var _Physics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Physics */ \"./src/classes/Engine/Physics.ts\");\n\n\n\nvar _Camera = /** @class */ (function () {\n    function _Camera() {\n        this.customAttach = false;\n    }\n    Object.defineProperty(_Camera.prototype, \"target\", {\n        get: function () {\n            return this.attached;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(_Camera.prototype, \"x\", {\n        get: function () {\n            return this === null || this === void 0 ? void 0 : this.attached.x;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(_Camera.prototype, \"y\", {\n        get: function () {\n            return this === null || this === void 0 ? void 0 : this.attached.y;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    _Camera.prototype.virtualAttach = function () {\n        this.attached = (0,_utils_createVirtualPoint__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        this.customAttach = true;\n        _Keyboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"].attach(this.attached);\n        _Physics__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addObject(this.attached);\n    };\n    _Camera.prototype.attach = function (obj) {\n        if (obj instanceof _Keyboard__WEBPACK_IMPORTED_MODULE_1__._Keyboard) {\n            this.virtualAttach();\n            return;\n        }\n        this.attached = obj;\n    };\n    _Camera.prototype.unAttach = function () {\n        if (this.customAttach) {\n            _Keyboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"].unAttach();\n            _Physics__WEBPACK_IMPORTED_MODULE_2__[\"default\"].removeObject(this.attached);\n            this.customAttach = false;\n        }\n        this.attached = undefined;\n    };\n    return _Camera;\n}());\nvar Camera = new _Camera();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Camera);\n\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/Engine/Camera.ts?");

/***/ }),

/***/ "./src/classes/Engine/Display.ts":
/*!***************************************!*\
  !*** ./src/classes/Engine/Display.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"_Display\": () => (/* binding */ _Display),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layer */ \"./src/classes/Engine/Layer.ts\");\n/* harmony import */ var _utils_requestAnimationFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/requestAnimationFrame */ \"./src/utils/requestAnimationFrame.ts\");\n/* harmony import */ var _utils_recalcSceneSize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/recalcSceneSize */ \"./src/utils/recalcSceneSize.ts\");\n/* harmony import */ var _DisplayAddons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DisplayAddons */ \"./src/classes/Engine/DisplayAddons.ts\");\n/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Camera */ \"./src/classes/Engine/Camera.ts\");\n\n\n\n\n\nvar _Display = /** @class */ (function () {\n    function _Display() {\n        this.parallax = new _Layer__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        this.layers = [];\n        this.addons = new _DisplayAddons__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    }\n    Object.defineProperty(_Display.prototype, \"height\", {\n        get: function () {\n            return this.display.height;\n        },\n        set: function (value) {\n            this.display.height = value;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(_Display.prototype, \"width\", {\n        get: function () {\n            return this.display.width;\n        },\n        set: function (value) {\n            this.display.width = value;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(_Display.prototype, \"canvas\", {\n        get: function () {\n            return this.display;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    _Display.prototype.attach = function (id) {\n        this.display = document.getElementById(id);\n        (0,_utils_recalcSceneSize__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n        this.scene = this.display.getContext(\"2d\");\n    };\n    _Display.prototype.addParallax = function (obj) {\n        var parallax = this.parallax;\n        parallax.addObject(obj);\n    };\n    _Display.prototype.addObject = function (obj, layer) {\n        var layers = this.layers;\n        if (typeof layers[layer] === \"undefined\") {\n            layers[layer] = new _Layer__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        }\n        layers[layer].addObject(obj);\n    };\n    _Display.prototype.startDrawing = function () {\n        var _a = this, scene = _a.scene, parallax = _a.parallax, layers = _a.layers, addons = _a.addons;\n        scene.imageSmoothingEnabled = false;\n        scene.fillStyle = \"#000\";\n        var draw = function () {\n            parallax.objects.map(function (object) { return object.draw(scene); });\n            scene.translate(Display.width / 2, Display.height / 2);\n            scene.translate(-_Camera__WEBPACK_IMPORTED_MODULE_4__[\"default\"].x, -_Camera__WEBPACK_IMPORTED_MODULE_4__[\"default\"].y);\n            layers.map(function (layer) {\n                layer.objects.map(function (object) { return object.draw(scene); });\n            });\n            scene.resetTransform();\n            addons.postWork(scene);\n            (0,_utils_requestAnimationFrame__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(draw);\n        };\n        draw();\n    };\n    return _Display;\n}());\nvar Display = new _Display();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Display);\n\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/Engine/Display.ts?");

/***/ }),

/***/ "./src/classes/Engine/DisplayAddons.ts":
/*!*********************************************!*\
  !*** ./src/classes/Engine/DisplayAddons.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar DisplayAddons = /** @class */ (function () {\n    function DisplayAddons() {\n        this.postCb = [];\n    }\n    DisplayAddons.prototype.add = function (postCb) {\n        this.postCb.push(function (scene) { return postCb(scene); });\n    };\n    DisplayAddons.prototype.postWork = function (scene) {\n        this.postCb.map(function (cb) { return cb(scene); });\n    };\n    return DisplayAddons;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisplayAddons);\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/Engine/DisplayAddons.ts?");

/***/ }),

/***/ "./src/classes/Engine/GameKeyboard.ts":
/*!********************************************!*\
  !*** ./src/classes/Engine/GameKeyboard.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"_GameKeyboard\": () => (/* binding */ _GameKeyboard),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar _GameKeyboard = /** @class */ (function () {\n    function _GameKeyboard() {\n        this.a = false;\n        this.d = false;\n        this.space = false;\n    }\n    _GameKeyboard.prototype.setMaster = function (keyboard) {\n        this.master = keyboard;\n    };\n    _GameKeyboard.prototype.removeMaster = function () {\n        this.master = undefined;\n    };\n    _GameKeyboard.prototype.setSlave = function (obj) {\n        this.slave = obj;\n    };\n    _GameKeyboard.prototype.removeSlave = function () {\n        this.slave = undefined;\n    };\n    _GameKeyboard.prototype.updateState = function () {\n        this.a = this.master.getKey(\"KeyA\") !== undefined;\n        this.d = this.master.getKey(\"KeyD\") !== undefined;\n        this.space = this.master.getKey(\"Space\") !== undefined;\n    };\n    _GameKeyboard.prototype.update = function () {\n        if (this.master === undefined || this.slave === undefined) {\n            return;\n        }\n        if (this.a && this.slave.hasGround) {\n            this.slave.faced = 0;\n            this.slave.inertion = -this.slave.speed;\n        }\n        if (this.d && this.slave.hasGround) {\n            this.slave.faced = 1;\n            this.slave.inertion = this.slave.speed;\n        }\n        if (this.space && this.slave.hasGround) {\n            this.slave.eDown = -10;\n            this.slave.hasGround = false;\n            this.slave.state = \"jump\";\n        }\n    };\n    return _GameKeyboard;\n}());\nvar GameKeyboard = new _GameKeyboard();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameKeyboard);\n\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/Engine/GameKeyboard.ts?");

/***/ }),

/***/ "./src/classes/Engine/Keyboard.ts":
/*!****************************************!*\
  !*** ./src/classes/Engine/Keyboard.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"_Keyboard\": () => (/* binding */ _Keyboard),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _GameKeyboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameKeyboard */ \"./src/classes/Engine/GameKeyboard.ts\");\n\nvar _Keyboard = /** @class */ (function () {\n    function _Keyboard() {\n        var _this = this;\n        this.virtualKeys = {};\n        document.addEventListener(\"keydown\", function (e) { return _this.codeReaction(e.code, true, e); });\n        document.addEventListener(\"keyup\", function (e) { return _this.codeReaction(e.code, false, e); });\n    }\n    _Keyboard.prototype.getKey = function (key) {\n        return this.virtualKeys[key];\n    };\n    _Keyboard.prototype.attach = function (slave) {\n        _GameKeyboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setMaster(this);\n        _GameKeyboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setSlave(slave);\n        this.slave = _GameKeyboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n    };\n    _Keyboard.prototype.unAttach = function () {\n        _GameKeyboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeMaster();\n        _GameKeyboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeSlave();\n        this.slave = undefined;\n    };\n    _Keyboard.prototype.codeReaction = function (code, bool, event) {\n        if (bool) {\n            this.virtualKeys[code] = event;\n        }\n        else {\n            delete this.virtualKeys[code];\n        }\n        if (this.slave) {\n            this.slave.updateState();\n        }\n    };\n    return _Keyboard;\n}());\nvar Keyboard = new _Keyboard();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Keyboard);\n\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/Engine/Keyboard.ts?");

/***/ }),

/***/ "./src/classes/Engine/Layer.ts":
/*!*************************************!*\
  !*** ./src/classes/Engine/Layer.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Layer = /** @class */ (function () {\n    function Layer() {\n        this.items = [];\n    }\n    Object.defineProperty(Layer.prototype, \"objects\", {\n        get: function () {\n            return this.items;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Layer.prototype.addObject = function (obj) {\n        this.items.push(obj);\n    };\n    return Layer;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layer);\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/Engine/Layer.ts?");

/***/ }),

/***/ "./src/classes/Engine/Physics.ts":
/*!***************************************!*\
  !*** ./src/classes/Engine/Physics.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_requestAnimationFrame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/requestAnimationFrame */ \"./src/utils/requestAnimationFrame.ts\");\n/* harmony import */ var _utils_intersectRect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/intersectRect */ \"./src/utils/intersectRect.ts\");\n/* harmony import */ var _GameKeyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameKeyboard */ \"./src/classes/Engine/GameKeyboard.ts\");\n\n\n\nvar _Physics = /** @class */ (function () {\n    function _Physics() {\n        this.objects = [];\n        this.lastTime = new Date().valueOf();\n    }\n    _Physics.prototype.addObject = function (obj) {\n        this.objects.push(obj);\n    };\n    _Physics.prototype.removeObject = function (obj) {\n        if (this.objects.includes(obj)) {\n            this.objects.splice(this.objects.indexOf(obj), 1);\n        }\n    };\n    _Physics.prototype.start = function () {\n        var _this = this;\n        var objects = this.objects;\n        var calc = function () {\n            _GameKeyboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"].update();\n            var delta = new Date().valueOf() - _this.lastTime;\n            objects.map(function (object) {\n                object.eDown += object.mass;\n                var newY = 0;\n                var newX = 0;\n                var hitBox;\n                var inter = [];\n                newY = object.y + object.eDown;\n                newX = object.x;\n                hitBox = { left: newX, top: newY, right: newX + object.width, bottom: newY + object.height };\n                inter = _this.checkCollision(hitBox, object.id);\n                if (inter.length === 0) {\n                    object.y += object.eDown;\n                    object.state = \"fall\";\n                }\n                else {\n                    object.y = inter[0].top - object.height;\n                    object.eDown = 0;\n                    object.hasGround = true;\n                    object.state = \"idle\";\n                }\n                newY = object.y;\n                newX = object.x + object.inertion * delta;\n                hitBox = { left: newX, top: newY, right: newX + object.width, bottom: newY + object.height };\n                inter = _this.checkCollision(hitBox, object.id);\n                if (inter.length === 0) {\n                    object.state = \"run\";\n                    object.x += object.inertion * delta;\n                    if (object.hasGround) {\n                        object.inertion -= (object.inertion * 0.7);\n                    }\n                }\n                else {\n                    object.inertion = 0;\n                }\n                if (Math.abs(object.inertion) < 0.001) {\n                    object.inertion = 0;\n                }\n                if (object.inertion === 0) {\n                    if (object.state !== \"fall\") {\n                        object.state = \"idle\";\n                    }\n                }\n            });\n            (0,_utils_requestAnimationFrame__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(calc);\n            _this.lastTime = new Date().valueOf();\n        };\n        calc();\n    };\n    _Physics.prototype.checkCollision = function (hitBox, ignore) {\n        if (ignore === void 0) { ignore = \"\"; }\n        var inter = this.objects.map(function (e) {\n            if (e.id === ignore || !e.hasCollision) {\n                return undefined;\n            }\n            if ((0,_utils_intersectRect__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height }, hitBox)) {\n                return { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height };\n            }\n            else {\n                return undefined;\n            }\n        }).filter(function (e) { return e; });\n        return inter;\n    };\n    return _Physics;\n}());\nvar Physics = new _Physics();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Physics);\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/Engine/Physics.ts?");

/***/ }),

/***/ "./src/classes/GameObject.ts":
/*!***********************************!*\
  !*** ./src/classes/GameObject.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Engine_Camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Engine/Camera */ \"./src/classes/Engine/Camera.ts\");\n\nvar GameObject = /** @class */ (function () {\n    function GameObject() {\n        this.state = \"idle\";\n        this.hasGround = true;\n        this.speed = 0;\n        this.inertion = 0;\n        this.eDown = 0;\n        this.mass = 0;\n        this.hasCollision = true;\n        this.id = Math.random().toString(16).slice(2);\n    }\n    GameObject.prototype.draw = function (scene) {\n        var faced = this.faced;\n        var sprite = this.sprites[this.state];\n        var image = sprite.image[faced];\n        var coef = this.height / image.height;\n        var sizeW = image.width * coef / sprite.max;\n        var x = this.x - sizeW / 2;\n        var y = this.y - _Engine_Camera__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target.height / 2;\n        scene.drawImage(image, image.width / (sprite.max) * Math.floor(sprite.cur), 0, image.width / (sprite.max), image.height, x, y, image.width * coef / (sprite.max), this.height);\n        sprite.update();\n    };\n    return GameObject;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameObject);\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/GameObject.ts?");

/***/ }),

/***/ "./src/classes/Parallax.ts":
/*!*********************************!*\
  !*** ./src/classes/Parallax.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Engine_Camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Engine/Camera */ \"./src/classes/Engine/Camera.ts\");\n/* harmony import */ var _Engine_Display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Engine/Display */ \"./src/classes/Engine/Display.ts\");\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameObject */ \"./src/classes/GameObject.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n\nvar Parallax = /** @class */ (function (_super) {\n    __extends(Parallax, _super);\n    function Parallax(image, bias) {\n        var _this = _super.call(this) || this;\n        _this.fon = new Image();\n        _this.fon.src = image;\n        _this.bias = bias;\n        return _this;\n    }\n    Parallax.prototype.draw = function (scene) {\n        var fon = this.fon;\n        var coef = _Engine_Display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].height / fon.height;\n        var pass = (_Engine_Camera__WEBPACK_IMPORTED_MODULE_0__[\"default\"].x * (this.bias / 10)) % (fon.width * coef);\n        scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass - (fon.width * coef), 0, fon.width * coef, _Engine_Display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].height);\n        scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass, 0, fon.width * coef, _Engine_Display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].height);\n        scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass + (fon.width * coef), 0, fon.width * coef, _Engine_Display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].height);\n        scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass + (fon.width * coef) * 2, 0, fon.width * coef, _Engine_Display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].height);\n    };\n    return Parallax;\n}(_GameObject__WEBPACK_IMPORTED_MODULE_2__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Parallax);\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/Parallax.ts?");

/***/ }),

/***/ "./src/classes/ResourceLoader.ts":
/*!***************************************!*\
  !*** ./src/classes/ResourceLoader.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-fetch */ \"node-fetch\");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_0__);\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\nvar _ResourceLoader = /** @class */ (function () {\n    function _ResourceLoader() {\n    }\n    _ResourceLoader.prototype.loadResource = function (resourceMap) {\n        return __awaiter(this, void 0, void 0, function () {\n            var _a;\n            return __generator(this, function (_b) {\n                switch (_b.label) {\n                    case 0:\n                        console.log(\"http://gg.prog3.airnet.ru/\" + resourceMap);\n                        _a = this;\n                        return [4 /*yield*/, node_fetch__WEBPACK_IMPORTED_MODULE_0___default()(\"http://gg.prog3.airnet.ru/\" + resourceMap)\n                                .then(function (res) { return res.json(); })];\n                    case 1:\n                        _a.resourceMap = (_b.sent());\n                        return [2 /*return*/];\n                }\n            });\n        });\n    };\n    return _ResourceLoader;\n}());\nvar Resources = new _ResourceLoader();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Resources);\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/ResourceLoader.ts?");

/***/ }),

/***/ "./src/classes/Sprite.ts":
/*!*******************************!*\
  !*** ./src/classes/Sprite.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Sprite = /** @class */ (function () {\n    function Sprite(max, src, speed) {\n        var _this = this;\n        this.cur = 0;\n        this.speed = speed;\n        this.max = max;\n        this.image = [];\n        var tmpImg = new Image();\n        tmpImg.src = \"resources/\" + src;\n        tmpImg.onload = function () {\n            _this.image[1] = tmpImg;\n            var canvasTmp = document.createElement(\"canvas\");\n            canvasTmp.width = tmpImg.width;\n            canvasTmp.height = tmpImg.height;\n            var secondaryCtx = canvasTmp.getContext(\"2d\");\n            secondaryCtx.scale(-1, 1);\n            secondaryCtx.translate(-tmpImg.width, 0);\n            secondaryCtx.drawImage(tmpImg, 0, 0);\n            _this.image[0] = canvasTmp;\n        };\n    }\n    Sprite.prototype.update = function () {\n        this.cur += this.speed;\n        if (this.cur > this.max) {\n            this.cur = 0;\n        }\n    };\n    return Sprite;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sprite);\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/Sprite.ts?");

/***/ }),

/***/ "./src/classes/Structure.ts":
/*!**********************************!*\
  !*** ./src/classes/Structure.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ \"./src/classes/GameObject.ts\");\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sprite */ \"./src/classes/Sprite.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar Structure = /** @class */ (function (_super) {\n    __extends(Structure, _super);\n    function Structure(x, y) {\n        var _this = _super.call(this) || this;\n        _this.faced = 1;\n        _this.sprites = {\n            \"idle\": new _Sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"](1, \"block.png\", 0)\n        };\n        _this.x = x;\n        _this.y = y;\n        _this.height = 100;\n        _this.width = 100;\n        return _this;\n    }\n    return Structure;\n}(_GameObject__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Structure);\n\n\n//# sourceURL=webpack://kostya-game/./src/classes/Structure.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_Engine_Camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Engine/Camera */ \"./src/classes/Engine/Camera.ts\");\n/* harmony import */ var _classes_Character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Character */ \"./src/classes/Character.ts\");\n/* harmony import */ var _classes_Engine_Display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Engine/Display */ \"./src/classes/Engine/Display.ts\");\n/* harmony import */ var _classes_Engine_Keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/Engine/Keyboard */ \"./src/classes/Engine/Keyboard.ts\");\n/* harmony import */ var _classes_Parallax__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./classes/Parallax */ \"./src/classes/Parallax.ts\");\n/* harmony import */ var _classes_Engine_Physics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./classes/Engine/Physics */ \"./src/classes/Engine/Physics.ts\");\n/* harmony import */ var _classes_Structure__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./classes/Structure */ \"./src/classes/Structure.ts\");\n/* harmony import */ var _utils_recalcSceneSize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/recalcSceneSize */ \"./src/utils/recalcSceneSize.ts\");\n/* harmony import */ var _addons_fps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addons/fps */ \"./src/addons/fps.ts\");\n/* harmony import */ var _classes_ResourceLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./classes/ResourceLoader */ \"./src/classes/ResourceLoader.ts\");\n\n\n\n\n\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    _classes_Engine_Display__WEBPACK_IMPORTED_MODULE_2__[\"default\"].attach(\"display\");\n    _classes_Engine_Display__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addons.add(_addons_fps__WEBPACK_IMPORTED_MODULE_8__[\"default\"]);\n    _classes_Engine_Display__WEBPACK_IMPORTED_MODULE_2__[\"default\"].startDrawing();\n    _classes_Engine_Physics__WEBPACK_IMPORTED_MODULE_5__[\"default\"].start();\n    window.addEventListener(\"resize\", function () {\n        (0,_utils_recalcSceneSize__WEBPACK_IMPORTED_MODULE_7__[\"default\"])();\n    });\n});\n_classes_ResourceLoader__WEBPACK_IMPORTED_MODULE_9__[\"default\"].loadResource(\"/resource.json\");\nconsole.log(_classes_ResourceLoader__WEBPACK_IMPORTED_MODULE_9__[\"default\"].resourceList);\nconsole.log(_classes_ResourceLoader__WEBPACK_IMPORTED_MODULE_9__[\"default\"].resourceMap);\nvar plx1 = new _classes_Parallax__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\"resources/plx-1.png\", 1);\n_classes_Engine_Display__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addParallax(plx1);\nvar plx2 = new _classes_Parallax__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\"resources/plx-2.png\", 2);\n_classes_Engine_Display__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addParallax(plx2);\nvar plx3 = new _classes_Parallax__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\"resources/plx-3.png\", 3);\n_classes_Engine_Display__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addParallax(plx3);\nvar plx4 = new _classes_Parallax__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\"resources/plx-4.png\", 4);\n_classes_Engine_Display__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addParallax(plx4);\nvar plx5 = new _classes_Parallax__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\"resources/plx-5.png\", 5);\n_classes_Engine_Display__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addParallax(plx5);\nfor (var i = 0; i < 100; i++) {\n    var box = new _classes_Structure__WEBPACK_IMPORTED_MODULE_6__[\"default\"](50 + i * 250, 300);\n    _classes_Engine_Display__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addObject(box, 1);\n    _classes_Engine_Physics__WEBPACK_IMPORTED_MODULE_5__[\"default\"].addObject(box);\n}\nvar Kostya = new _classes_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"](100, 100);\n_classes_Engine_Display__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addObject(Kostya, 1);\n_classes_Engine_Physics__WEBPACK_IMPORTED_MODULE_5__[\"default\"].addObject(Kostya);\n_classes_Engine_Keyboard__WEBPACK_IMPORTED_MODULE_3__[\"default\"].attach(Kostya);\n_classes_Engine_Camera__WEBPACK_IMPORTED_MODULE_0__[\"default\"].attach(Kostya);\n\n\n//# sourceURL=webpack://kostya-game/./src/index.ts?");

/***/ }),

/***/ "./src/utils/createVirtualPoint.ts":
/*!*****************************************!*\
  !*** ./src/utils/createVirtualPoint.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _classes_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/GameObject */ \"./src/classes/GameObject.ts\");\n\nvar createVirtualPoint = function (x, y) {\n    if (x === void 0) { x = 100; }\n    if (y === void 0) { y = 100; }\n    var point = new _classes_GameObject__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    point.x = x;\n    point.y = y;\n    point.width = 1;\n    point.height = 1;\n    point.speed = 1;\n    point.hasCollision = false;\n    return point;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createVirtualPoint);\n\n\n//# sourceURL=webpack://kostya-game/./src/utils/createVirtualPoint.ts?");

/***/ }),

/***/ "./src/utils/intersectRect.ts":
/*!************************************!*\
  !*** ./src/utils/intersectRect.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar intersectRect = function (r1, r2) {\n    return !(r2.left >= r1.right ||\n        r2.right <= r1.left ||\n        r2.top >= r1.bottom ||\n        r2.bottom <= r1.top);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (intersectRect);\n\n\n//# sourceURL=webpack://kostya-game/./src/utils/intersectRect.ts?");

/***/ }),

/***/ "./src/utils/recalcSceneSize.ts":
/*!**************************************!*\
  !*** ./src/utils/recalcSceneSize.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _classes_Engine_Display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/Engine/Display */ \"./src/classes/Engine/Display.ts\");\n\nvar recalcSceneSize = function () {\n    var _a = _classes_Engine_Display__WEBPACK_IMPORTED_MODULE_0__[\"default\"].canvas.getBoundingClientRect(), width = _a.width, height = _a.height;\n    _classes_Engine_Display__WEBPACK_IMPORTED_MODULE_0__[\"default\"].width = width;\n    _classes_Engine_Display__WEBPACK_IMPORTED_MODULE_0__[\"default\"].height = height;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (recalcSceneSize);\n\n\n//# sourceURL=webpack://kostya-game/./src/utils/recalcSceneSize.ts?");

/***/ }),

/***/ "./src/utils/requestAnimationFrame.ts":
/*!********************************************!*\
  !*** ./src/utils/requestAnimationFrame.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar customRequestAnimationFrame = function (callback) { return window.setTimeout(callback, 1000 / 60); };\nvar requestAnimationFrame = (function () { return window.requestAnimationFrame || customRequestAnimationFrame; })();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (requestAnimationFrame);\n\n\n//# sourceURL=webpack://kostya-game/./src/utils/requestAnimationFrame.ts?");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
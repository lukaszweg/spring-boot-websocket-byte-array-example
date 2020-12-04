(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Stomp = require('@stomp/stompjs');
const { v4: uuidv4 } = require('uuid');

var videos = []
var id = uuidv4();
const client = new Stomp.Client({
    brokerURL: 'ws://localhost:8080/socket',
    debug: function (str) {
      console.log(str);
    },
    maxWebSocketChunkSize: 1024 * 1024,
    splitLargeFrames: true
  });

  client.configure({maxWebSocketChunkSize: 1024*1024, splitLargeFrames: true})
  client.onConnect = function (frame) {
    var subscription = client.subscribe('/topic/video-call', callback);
    function callback (data) {
        videos.forEach(data => console.log(data))
        var test = videos.find(value => {
            return value.id == data.headers['my-id']
        })
        console.log(test)
        if(test !== undefined) {
            test.value.src  = URL.createObjectURL(new Blob([data.binaryBody], {type:"video/webm"}));
            test.value.play();
        } else {
            var newvideo = document.createElement("video")
            newvideo.setAttribute("id", data.headers['my-id'])
            document.body.insertBefore(newvideo, document.getElementById("org_div1"))
            videos.push({id: data.headers['my-id'], value: newvideo})
        }

    }
    if(navigator.mediaDevices) {
    navigator.mediaDevices
    .getUserMedia({video: true})
       .then(mediaStream => {
      const recorder = new MediaStreamRecorder(mediaStream);
      recorder.mimeType = 'video/webm';
       recorder.start(1000);
        recorder.ondataavailable = event => {

            event.arrayBuffer().then(buffer =>   {
                client.publish({destination: '/app/video-call', binaryBody: new Uint8Array(buffer),
            headers: {'content-type': 'application/octet-stream', 'my-id': id}})});
               }

         });
    }
};
  
  client.onStompError = function (frame) {
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };
  
  client.activate();

},{"@stomp/stompjs":2,"uuid":3}],2:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("StompJs", [], factory);
	else if(typeof exports === 'object')
		exports["StompJs"] = factory();
	else
		root["StompJs"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/augment-websocket.ts":
/*!**********************************!*\
  !*** ./src/augment-websocket.ts ***!
  \**********************************/
/*! exports provided: augmentWebsocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "augmentWebsocket", function() { return augmentWebsocket; });
/**
 * @internal
 */
function augmentWebsocket(webSocket, debug) {
    webSocket.terminate = function () {
        const noOp = () => { };
        // set all callbacks to no op
        this.onerror = noOp;
        this.onmessage = noOp;
        this.onopen = noOp;
        const ts = new Date();
        const origOnClose = this.onclose;
        // Track delay in actual closure of the socket
        this.onclose = closeEvent => {
            const delay = new Date().getTime() - ts.getTime();
            debug(`Discarded socket closed after ${delay}ms, with code/reason: ${closeEvent.code}/${closeEvent.reason}`);
        };
        this.close();
        origOnClose.call(this, {
            code: 4001,
            reason: 'Heartbeat failure, discarding the socket',
            wasClean: false,
        });
    };
}


/***/ }),

/***/ "./src/byte.ts":
/*!*********************!*\
  !*** ./src/byte.ts ***!
  \*********************/
/*! exports provided: BYTE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BYTE", function() { return BYTE; });
/**
 * Some byte values, used as per STOMP specifications.
 *
 * Part of `@stomp/stompjs`.
 *
 * @internal
 */
const BYTE = {
    // LINEFEED byte (octet 10)
    LF: '\x0A',
    // NULL byte (octet 0)
    NULL: '\x00',
};


/***/ }),

/***/ "./src/client.ts":
/*!***********************!*\
  !*** ./src/client.ts ***!
  \***********************/
/*! exports provided: Client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Client", function() { return Client; });
/* harmony import */ var _stomp_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stomp-handler */ "./src/stomp-handler.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/types.ts");
/* harmony import */ var _versions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./versions */ "./src/versions.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



/**
 * STOMP Client Class.
 *
 * Part of `@stomp/stompjs`.
 */
class Client {
    /**
     * Create an instance.
     */
    constructor(conf = {}) {
        /**
         * STOMP versions to attempt during STOMP handshake. By default versions `1.0`, `1.1`, and `1.2` are attempted.
         *
         * Example:
         * ```javascript
         *        // Try only versions 1.0 and 1.1
         *        client.stompVersions = new Versions(['1.0', '1.1'])
         * ```
         */
        this.stompVersions = _versions__WEBPACK_IMPORTED_MODULE_2__["Versions"].default;
        /**
         * Will retry if Stomp connection is not established in specified milliseconds.
         * Default 10,000ms, set to 0 to wait for ever.
         */
        this.connectionTimeout = 10000;
        /**
         *  automatically reconnect with delay in milliseconds, set to 0 to disable.
         */
        this.reconnectDelay = 5000;
        /**
         * Incoming heartbeat interval in milliseconds. Set to 0 to disable.
         */
        this.heartbeatIncoming = 10000;
        /**
         * Outgoing heartbeat interval in milliseconds. Set to 0 to disable.
         */
        this.heartbeatOutgoing = 10000;
        /**
         * This switches on a non standard behavior while sending WebSocket packets.
         * It splits larger (text) packets into chunks of [maxWebSocketChunkSize]{@link Client#maxWebSocketChunkSize}.
         * Only Java Spring brokers seems to use this mode.
         *
         * WebSockets, by itself, split large (text) packets,
         * so it is not needed with a truly compliant STOMP/WebSocket broker.
         * Actually setting it for such broker will cause large messages to fail.
         *
         * `false` by default.
         *
         * Binary frames are never split.
         */
        this.splitLargeFrames = false;
        /**
         * See [splitLargeFrames]{@link Client#splitLargeFrames}.
         * This has no effect if [splitLargeFrames]{@link Client#splitLargeFrames} is `false`.
         */
        this.maxWebSocketChunkSize = 8 * 1024;
        /**
         * Usually the
         * [type of WebSocket frame]{@link https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send#Parameters}
         * is automatically decided by type of the payload.
         * Default is `false`, which should work with all compliant brokers.
         *
         * Set this flag to force binary frames.
         */
        this.forceBinaryWSFrames = false;
        /**
         * A bug in ReactNative chops a string on occurrence of a NULL.
         * See issue [https://github.com/stomp-js/stompjs/issues/89]{@link https://github.com/stomp-js/stompjs/issues/89}.
         * This makes incoming WebSocket messages invalid STOMP packets.
         * Setting this flag attempts to reverse the damage by appending a NULL.
         * If the broker splits a large message into multiple WebSocket messages,
         * this flag will cause data loss and abnormal termination of connection.
         *
         * This is not an ideal solution, but a stop gap until the underlying issue is fixed at ReactNative library.
         */
        this.appendMissingNULLonIncoming = false;
        /**
         * Activation state.
         *
         * It will usually be ACTIVE or INACTIVE.
         * When deactivating it may go from ACTIVE to INACTIVE without entering DEACTIVATING.
         */
        this.state = _types__WEBPACK_IMPORTED_MODULE_1__["ActivationState"].INACTIVE;
        // Dummy callbacks
        const noOp = () => { };
        this.debug = noOp;
        this.beforeConnect = noOp;
        this.onConnect = noOp;
        this.onDisconnect = noOp;
        this.onUnhandledMessage = noOp;
        this.onUnhandledReceipt = noOp;
        this.onUnhandledFrame = noOp;
        this.onStompError = noOp;
        this.onWebSocketClose = noOp;
        this.onWebSocketError = noOp;
        this.logRawCommunication = false;
        this.onChangeState = noOp;
        // These parameters would typically get proper values before connect is called
        this.connectHeaders = {};
        this._disconnectHeaders = {};
        // Apply configuration
        this.configure(conf);
    }
    /**
     * Underlying WebSocket instance, READONLY.
     */
    get webSocket() {
        return this._stompHandler ? this._stompHandler._webSocket : undefined;
    }
    /**
     * Disconnection headers.
     */
    get disconnectHeaders() {
        return this._disconnectHeaders;
    }
    set disconnectHeaders(value) {
        this._disconnectHeaders = value;
        if (this._stompHandler) {
            this._stompHandler.disconnectHeaders = this._disconnectHeaders;
        }
    }
    /**
     * `true` if there is a active connection with STOMP Broker
     */
    get connected() {
        return !!this._stompHandler && this._stompHandler.connected;
    }
    /**
     * version of STOMP protocol negotiated with the server, READONLY
     */
    get connectedVersion() {
        return this._stompHandler ? this._stompHandler.connectedVersion : undefined;
    }
    /**
     * if the client is active (connected or going to reconnect)
     */
    get active() {
        return this.state === _types__WEBPACK_IMPORTED_MODULE_1__["ActivationState"].ACTIVE;
    }
    _changeState(state) {
        this.state = state;
        this.onChangeState(state);
    }
    /**
     * Update configuration.
     */
    configure(conf) {
        // bulk assign all properties to this
        Object.assign(this, conf);
    }
    /**
     * Initiate the connection with the broker.
     * If the connection breaks, as per [Client#reconnectDelay]{@link Client#reconnectDelay},
     * it will keep trying to reconnect.
     *
     * Call [Client#deactivate]{@link Client#deactivate} to disconnect and stop reconnection attempts.
     */
    activate() {
        if (this.state === _types__WEBPACK_IMPORTED_MODULE_1__["ActivationState"].DEACTIVATING) {
            this.debug('Still DEACTIVATING, please await call to deactivate before trying to re-activate');
            throw new Error('Still DEACTIVATING, can not activate now');
        }
        if (this.active) {
            this.debug('Already ACTIVE, ignoring request to activate');
            return;
        }
        this._changeState(_types__WEBPACK_IMPORTED_MODULE_1__["ActivationState"].ACTIVE);
        this._connect();
    }
    _connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connected) {
                this.debug('STOMP: already connected, nothing to do');
                return;
            }
            yield this.beforeConnect();
            if (!this.active) {
                this.debug('Client has been marked inactive, will not attempt to connect');
                return;
            }
            // setup connection watcher
            if (this.connectionTimeout > 0) {
                this._connectionWatcher = setTimeout(() => {
                    // Connection not established, close the underlying socket
                    // a reconnection will be attempted
                    this.debug(`Connection not established in ${this.connectionTimeout}ms, closing socket`);
                    this.forceDisconnect();
                }, this.connectionTimeout);
            }
            this.debug('Opening Web Socket...');
            // Get the actual WebSocket (or a similar object)
            const webSocket = this._createWebSocket();
            this._stompHandler = new _stomp_handler__WEBPACK_IMPORTED_MODULE_0__["StompHandler"](this, webSocket, {
                debug: this.debug,
                stompVersions: this.stompVersions,
                connectHeaders: this.connectHeaders,
                disconnectHeaders: this._disconnectHeaders,
                heartbeatIncoming: this.heartbeatIncoming,
                heartbeatOutgoing: this.heartbeatOutgoing,
                splitLargeFrames: this.splitLargeFrames,
                maxWebSocketChunkSize: this.maxWebSocketChunkSize,
                forceBinaryWSFrames: this.forceBinaryWSFrames,
                logRawCommunication: this.logRawCommunication,
                appendMissingNULLonIncoming: this.appendMissingNULLonIncoming,
                discardWebsocketOnCommFailure: this.discardWebsocketOnCommFailure,
                onConnect: frame => {
                    // Successfully connected, stop the connection watcher
                    if (this._connectionWatcher) {
                        clearTimeout(this._connectionWatcher);
                        this._connectionWatcher = undefined;
                    }
                    if (!this.active) {
                        this.debug('STOMP got connected while deactivate was issued, will disconnect now');
                        this._disposeStompHandler();
                        return;
                    }
                    this.onConnect(frame);
                },
                onDisconnect: frame => {
                    this.onDisconnect(frame);
                },
                onStompError: frame => {
                    this.onStompError(frame);
                },
                onWebSocketClose: evt => {
                    this._stompHandler = undefined; // a new one will be created in case of a reconnect
                    if (this.state === _types__WEBPACK_IMPORTED_MODULE_1__["ActivationState"].DEACTIVATING) {
                        // Mark deactivation complete
                        this._resolveSocketClose();
                        this._resolveSocketClose = undefined;
                        this._changeState(_types__WEBPACK_IMPORTED_MODULE_1__["ActivationState"].INACTIVE);
                    }
                    this.onWebSocketClose(evt);
                    // The callback is called before attempting to reconnect, this would allow the client
                    // to be `deactivated` in the callback.
                    if (this.active) {
                        this._schedule_reconnect();
                    }
                },
                onWebSocketError: evt => {
                    this.onWebSocketError(evt);
                },
                onUnhandledMessage: message => {
                    this.onUnhandledMessage(message);
                },
                onUnhandledReceipt: frame => {
                    this.onUnhandledReceipt(frame);
                },
                onUnhandledFrame: frame => {
                    this.onUnhandledFrame(frame);
                },
            });
            this._stompHandler.start();
        });
    }
    _createWebSocket() {
        let webSocket;
        if (this.webSocketFactory) {
            webSocket = this.webSocketFactory();
        }
        else {
            webSocket = new WebSocket(this.brokerURL, this.stompVersions.protocolVersions());
        }
        webSocket.binaryType = 'arraybuffer';
        return webSocket;
    }
    _schedule_reconnect() {
        if (this.reconnectDelay > 0) {
            this.debug(`STOMP: scheduling reconnection in ${this.reconnectDelay}ms`);
            this._reconnector = setTimeout(() => {
                this._connect();
            }, this.reconnectDelay);
        }
    }
    /**
     * Disconnect if connected and stop auto reconnect loop.
     * Appropriate callbacks will be invoked if underlying STOMP connection was connected.
     *
     * This call is async, it will resolve immediately if there is no underlying active websocket,
     * otherwise, it will resolve after underlying websocket is properly disposed.
     *
     * To reactivate you can call [Client#activate]{@link Client#activate}.
     */
    deactivate() {
        return __awaiter(this, void 0, void 0, function* () {
            let retPromise;
            if (this.state !== _types__WEBPACK_IMPORTED_MODULE_1__["ActivationState"].ACTIVE) {
                this.debug(`Already ${_types__WEBPACK_IMPORTED_MODULE_1__["ActivationState"][this.state]}, ignoring call to deactivate`);
                return Promise.resolve();
            }
            this._changeState(_types__WEBPACK_IMPORTED_MODULE_1__["ActivationState"].DEACTIVATING);
            // Clear if a reconnection was scheduled
            if (this._reconnector) {
                clearTimeout(this._reconnector);
            }
            if (this._stompHandler &&
                this.webSocket.readyState !== _types__WEBPACK_IMPORTED_MODULE_1__["StompSocketState"].CLOSED) {
                // we need to wait for underlying websocket to close
                retPromise = new Promise((resolve, reject) => {
                    this._resolveSocketClose = resolve;
                });
            }
            else {
                // indicate that auto reconnect loop should terminate
                this._changeState(_types__WEBPACK_IMPORTED_MODULE_1__["ActivationState"].INACTIVE);
                return Promise.resolve();
            }
            this._disposeStompHandler();
            return retPromise;
        });
    }
    /**
     * Force disconnect if there is an active connection by directly closing the underlying WebSocket.
     * This is different than a normal disconnect where a DISCONNECT sequence is carried out with the broker.
     * After forcing disconnect, automatic reconnect will be attempted.
     * To stop further reconnects call [Client#deactivate]{@link Client#deactivate} as well.
     */
    forceDisconnect() {
        if (this._stompHandler) {
            this._stompHandler.forceDisconnect();
        }
    }
    _disposeStompHandler() {
        // Dispose STOMP Handler
        if (this._stompHandler) {
            this._stompHandler.dispose();
            this._stompHandler = null;
        }
    }
    /**
     * Send a message to a named destination. Refer to your STOMP broker documentation for types
     * and naming of destinations.
     *
     * STOMP protocol specifies and suggests some headers and also allows broker specific headers.
     *
     * `body` must be String.
     * You will need to covert the payload to string in case it is not string (e.g. JSON).
     *
     * To send a binary message body use binaryBody parameter. It should be a
     * [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array).
     * Sometimes brokers may not support binary frames out of the box.
     * Please check your broker documentation.
     *
     * `content-length` header is automatically added to the STOMP Frame sent to the broker.
     * Set `skipContentLengthHeader` to indicate that `content-length` header should not be added.
     * For binary messages `content-length` header is always added.
     *
     * Caution: The broker will, most likely, report an error and disconnect if message body has NULL octet(s)
     * and `content-length` header is missing.
     *
     * ```javascript
     *        client.publish({destination: "/queue/test", headers: {priority: 9}, body: "Hello, STOMP"});
     *
     *        // Only destination is mandatory parameter
     *        client.publish({destination: "/queue/test", body: "Hello, STOMP"});
     *
     *        // Skip content-length header in the frame to the broker
     *        client.publish({"/queue/test", body: "Hello, STOMP", skipContentLengthHeader: true});
     *
     *        var binaryData = generateBinaryData(); // This need to be of type Uint8Array
     *        // setting content-type header is not mandatory, however a good practice
     *        client.publish({destination: '/topic/special', binaryBody: binaryData,
     *                         headers: {'content-type': 'application/octet-stream'}});
     * ```
     */
    publish(params) {
        this._stompHandler.publish(params);
    }
    /**
     * STOMP brokers may carry out operation asynchronously and allow requesting for acknowledgement.
     * To request an acknowledgement, a `receipt` header needs to be sent with the actual request.
     * The value (say receipt-id) for this header needs to be unique for each use. Typically a sequence, a UUID, a
     * random number or a combination may be used.
     *
     * A complaint broker will send a RECEIPT frame when an operation has actually been completed.
     * The operation needs to be matched based in the value of the receipt-id.
     *
     * This method allow watching for a receipt and invoke the callback
     * when corresponding receipt has been received.
     *
     * The actual {@link FrameImpl} will be passed as parameter to the callback.
     *
     * Example:
     * ```javascript
     *        // Subscribing with acknowledgement
     *        let receiptId = randomText();
     *
     *        client.watchForReceipt(receiptId, function() {
     *          // Will be called after server acknowledges
     *        });
     *
     *        client.subscribe(TEST.destination, onMessage, {receipt: receiptId});
     *
     *
     *        // Publishing with acknowledgement
     *        receiptId = randomText();
     *
     *        client.watchForReceipt(receiptId, function() {
     *          // Will be called after server acknowledges
     *        });
     *        client.publish({destination: TEST.destination, headers: {receipt: receiptId}, body: msg});
     * ```
     */
    watchForReceipt(receiptId, callback) {
        this._stompHandler.watchForReceipt(receiptId, callback);
    }
    /**
     * Subscribe to a STOMP Broker location. The callback will be invoked for each received message with
     * the {@link IMessage} as argument.
     *
     * Note: The library will generate an unique ID if there is none provided in the headers.
     *       To use your own ID, pass it using the headers argument.
     *
     * ```javascript
     *        callback = function(message) {
     *        // called when the client receives a STOMP message from the server
     *          if (message.body) {
     *            alert("got message with body " + message.body)
     *          } else {
     *            alert("got empty message");
     *          }
     *        });
     *
     *        var subscription = client.subscribe("/queue/test", callback);
     *
     *        // Explicit subscription id
     *        var mySubId = 'my-subscription-id-001';
     *        var subscription = client.subscribe(destination, callback, { id: mySubId });
     * ```
     */
    subscribe(destination, callback, headers = {}) {
        return this._stompHandler.subscribe(destination, callback, headers);
    }
    /**
     * It is preferable to unsubscribe from a subscription by calling
     * `unsubscribe()` directly on {@link StompSubscription} returned by `client.subscribe()`:
     *
     * ```javascript
     *        var subscription = client.subscribe(destination, onmessage);
     *        // ...
     *        subscription.unsubscribe();
     * ```
     *
     * See: http://stomp.github.com/stomp-specification-1.2.html#UNSUBSCRIBE UNSUBSCRIBE Frame
     */
    unsubscribe(id, headers = {}) {
        this._stompHandler.unsubscribe(id, headers);
    }
    /**
     * Start a transaction, the returned {@link ITransaction} has methods - [commit]{@link ITransaction#commit}
     * and [abort]{@link ITransaction#abort}.
     *
     * `transactionId` is optional, if not passed the library will generate it internally.
     */
    begin(transactionId) {
        return this._stompHandler.begin(transactionId);
    }
    /**
     * Commit a transaction.
     *
     * It is preferable to commit a transaction by calling [commit]{@link ITransaction#commit} directly on
     * {@link ITransaction} returned by [client.begin]{@link Client#begin}.
     *
     * ```javascript
     *        var tx = client.begin(txId);
     *        //...
     *        tx.commit();
     * ```
     */
    commit(transactionId) {
        this._stompHandler.commit(transactionId);
    }
    /**
     * Abort a transaction.
     * It is preferable to abort a transaction by calling [abort]{@link ITransaction#abort} directly on
     * {@link ITransaction} returned by [client.begin]{@link Client#begin}.
     *
     * ```javascript
     *        var tx = client.begin(txId);
     *        //...
     *        tx.abort();
     * ```
     */
    abort(transactionId) {
        this._stompHandler.abort(transactionId);
    }
    /**
     * ACK a message. It is preferable to acknowledge a message by calling [ack]{@link IMessage#ack} directly
     * on the {@link IMessage} handled by a subscription callback:
     *
     * ```javascript
     *        var callback = function (message) {
     *          // process the message
     *          // acknowledge it
     *          message.ack();
     *        };
     *        client.subscribe(destination, callback, {'ack': 'client'});
     * ```
     */
    ack(messageId, subscriptionId, headers = {}) {
        this._stompHandler.ack(messageId, subscriptionId, headers);
    }
    /**
     * NACK a message. It is preferable to acknowledge a message by calling [nack]{@link IMessage#nack} directly
     * on the {@link IMessage} handled by a subscription callback:
     *
     * ```javascript
     *        var callback = function (message) {
     *          // process the message
     *          // an error occurs, nack it
     *          message.nack();
     *        };
     *        client.subscribe(destination, callback, {'ack': 'client'});
     * ```
     */
    nack(messageId, subscriptionId, headers = {}) {
        this._stompHandler.nack(messageId, subscriptionId, headers);
    }
}


/***/ }),

/***/ "./src/compatibility/compat-client.ts":
/*!********************************************!*\
  !*** ./src/compatibility/compat-client.ts ***!
  \********************************************/
/*! exports provided: CompatClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompatClient", function() { return CompatClient; });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client */ "./src/client.ts");
/* harmony import */ var _heartbeat_info__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./heartbeat-info */ "./src/compatibility/heartbeat-info.ts");


/**
 * Available for backward compatibility, please shift to using {@link Client}.
 *
 * **Deprecated**
 *
 * Part of `@stomp/stompjs`.
 *
 * To upgrade, please follow the [Upgrade Guide](../additional-documentation/upgrading.html)
 */
class CompatClient extends _client__WEBPACK_IMPORTED_MODULE_0__["Client"] {
    /**
     * Available for backward compatibility, please shift to using {@link Client}
     * and [Client#webSocketFactory]{@link Client#webSocketFactory}.
     *
     * **Deprecated**
     *
     * @internal
     */
    constructor(webSocketFactory) {
        super();
        /**
         * It is no op now. No longer needed. Large packets work out of the box.
         */
        this.maxWebSocketFrameSize = 16 * 1024;
        this._heartbeatInfo = new _heartbeat_info__WEBPACK_IMPORTED_MODULE_1__["HeartbeatInfo"](this);
        this.reconnect_delay = 0;
        this.webSocketFactory = webSocketFactory;
        // Default from previous version
        this.debug = (...message) => {
            console.log(...message);
        };
    }
    _parseConnect(...args) {
        let closeEventCallback;
        let connectCallback;
        let errorCallback;
        let headers = {};
        if (args.length < 2) {
            throw new Error('Connect requires at least 2 arguments');
        }
        if (typeof args[1] === 'function') {
            [headers, connectCallback, errorCallback, closeEventCallback] = args;
        }
        else {
            switch (args.length) {
                case 6:
                    [
                        headers.login,
                        headers.passcode,
                        connectCallback,
                        errorCallback,
                        closeEventCallback,
                        headers.host,
                    ] = args;
                    break;
                default:
                    [
                        headers.login,
                        headers.passcode,
                        connectCallback,
                        errorCallback,
                        closeEventCallback,
                    ] = args;
            }
        }
        return [headers, connectCallback, errorCallback, closeEventCallback];
    }
    /**
     * Available for backward compatibility, please shift to using [Client#activate]{@link Client#activate}.
     *
     * **Deprecated**
     *
     * The `connect` method accepts different number of arguments and types. See the Overloads list. Use the
     * version with headers to pass your broker specific options.
     *
     * overloads:
     * - connect(headers, connectCallback)
     * - connect(headers, connectCallback, errorCallback)
     * - connect(login, passcode, connectCallback)
     * - connect(login, passcode, connectCallback, errorCallback)
     * - connect(login, passcode, connectCallback, errorCallback, closeEventCallback)
     * - connect(login, passcode, connectCallback, errorCallback, closeEventCallback, host)
     *
     * params:
     * - headers, see [Client#connectHeaders]{@link Client#connectHeaders}
     * - connectCallback, see [Client#onConnect]{@link Client#onConnect}
     * - errorCallback, see [Client#onStompError]{@link Client#onStompError}
     * - closeEventCallback, see [Client#onWebSocketClose]{@link Client#onWebSocketClose}
     * - login [String], see [Client#connectHeaders](../classes/Client.html#connectHeaders)
     * - passcode [String], [Client#connectHeaders](../classes/Client.html#connectHeaders)
     * - host [String], see [Client#connectHeaders](../classes/Client.html#connectHeaders)
     *
     * To upgrade, please follow the [Upgrade Guide](../additional-documentation/upgrading.html)
     */
    connect(...args) {
        const out = this._parseConnect(...args);
        if (out[0]) {
            this.connectHeaders = out[0];
        }
        if (out[1]) {
            this.onConnect = out[1];
        }
        if (out[2]) {
            this.onStompError = out[2];
        }
        if (out[3]) {
            this.onWebSocketClose = out[3];
        }
        super.activate();
    }
    /**
     * Available for backward compatibility, please shift to using [Client#deactivate]{@link Client#deactivate}.
     *
     * **Deprecated**
     *
     * See:
     * [Client#onDisconnect]{@link Client#onDisconnect}, and
     * [Client#disconnectHeaders]{@link Client#disconnectHeaders}
     *
     * To upgrade, please follow the [Upgrade Guide](../additional-documentation/upgrading.html)
     */
    disconnect(disconnectCallback, headers = {}) {
        if (disconnectCallback) {
            this.onDisconnect = disconnectCallback;
        }
        this.disconnectHeaders = headers;
        super.deactivate();
    }
    /**
     * Available for backward compatibility, use [Client#publish]{@link Client#publish}.
     *
     * Send a message to a named destination. Refer to your STOMP broker documentation for types
     * and naming of destinations. The headers will, typically, be available to the subscriber.
     * However, there may be special purpose headers corresponding to your STOMP broker.
     *
     *  **Deprecated**, use [Client#publish]{@link Client#publish}
     *
     * Note: Body must be String. You will need to covert the payload to string in case it is not string (e.g. JSON)
     *
     * ```javascript
     *        client.send("/queue/test", {priority: 9}, "Hello, STOMP");
     *
     *        // If you want to send a message with a body, you must also pass the headers argument.
     *        client.send("/queue/test", {}, "Hello, STOMP");
     * ```
     *
     * To upgrade, please follow the [Upgrade Guide](../additional-documentation/upgrading.html)
     */
    send(destination, headers = {}, body = '') {
        headers = Object.assign({}, headers);
        const skipContentLengthHeader = headers['content-length'] === false;
        if (skipContentLengthHeader) {
            delete headers['content-length'];
        }
        this.publish({
            destination,
            headers: headers,
            body,
            skipContentLengthHeader,
        });
    }
    /**
     * Available for backward compatibility, renamed to [Client#reconnectDelay]{@link Client#reconnectDelay}.
     *
     * **Deprecated**
     */
    set reconnect_delay(value) {
        this.reconnectDelay = value;
    }
    /**
     * Available for backward compatibility, renamed to [Client#webSocket]{@link Client#webSocket}.
     *
     * **Deprecated**
     */
    get ws() {
        return this.webSocket;
    }
    /**
     * Available for backward compatibility, renamed to [Client#connectedVersion]{@link Client#connectedVersion}.
     *
     * **Deprecated**
     */
    get version() {
        return this.connectedVersion;
    }
    /**
     * Available for backward compatibility, renamed to [Client#onUnhandledMessage]{@link Client#onUnhandledMessage}.
     *
     * **Deprecated**
     */
    get onreceive() {
        return this.onUnhandledMessage;
    }
    /**
     * Available for backward compatibility, renamed to [Client#onUnhandledMessage]{@link Client#onUnhandledMessage}.
     *
     * **Deprecated**
     */
    set onreceive(value) {
        this.onUnhandledMessage = value;
    }
    /**
     * Available for backward compatibility, renamed to [Client#onUnhandledReceipt]{@link Client#onUnhandledReceipt}.
     * Prefer using [Client#watchForReceipt]{@link Client#watchForReceipt}.
     *
     * **Deprecated**
     */
    get onreceipt() {
        return this.onUnhandledReceipt;
    }
    /**
     * Available for backward compatibility, renamed to [Client#onUnhandledReceipt]{@link Client#onUnhandledReceipt}.
     *
     * **Deprecated**
     */
    set onreceipt(value) {
        this.onUnhandledReceipt = value;
    }
    /**
     * Available for backward compatibility, renamed to [Client#heartbeatIncoming]{@link Client#heartbeatIncoming}
     * [Client#heartbeatOutgoing]{@link Client#heartbeatOutgoing}.
     *
     * **Deprecated**
     */
    get heartbeat() {
        return this._heartbeatInfo;
    }
    /**
     * Available for backward compatibility, renamed to [Client#heartbeatIncoming]{@link Client#heartbeatIncoming}
     * [Client#heartbeatOutgoing]{@link Client#heartbeatOutgoing}.
     *
     * **Deprecated**
     */
    set heartbeat(value) {
        this.heartbeatIncoming = value.incoming;
        this.heartbeatOutgoing = value.outgoing;
    }
}


/***/ }),

/***/ "./src/compatibility/heartbeat-info.ts":
/*!*********************************************!*\
  !*** ./src/compatibility/heartbeat-info.ts ***!
  \*********************************************/
/*! exports provided: HeartbeatInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeartbeatInfo", function() { return HeartbeatInfo; });
/**
 * Part of `@stomp/stompjs`.
 *
 * @internal
 */
class HeartbeatInfo {
    constructor(client) {
        this.client = client;
    }
    get outgoing() {
        return this.client.heartbeatOutgoing;
    }
    set outgoing(value) {
        this.client.heartbeatOutgoing = value;
    }
    get incoming() {
        return this.client.heartbeatIncoming;
    }
    set incoming(value) {
        this.client.heartbeatIncoming = value;
    }
}


/***/ }),

/***/ "./src/compatibility/stomp.ts":
/*!************************************!*\
  !*** ./src/compatibility/stomp.ts ***!
  \************************************/
/*! exports provided: Stomp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stomp", function() { return Stomp; });
/* harmony import */ var _versions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../versions */ "./src/versions.ts");
/* harmony import */ var _compat_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compat-client */ "./src/compatibility/compat-client.ts");


/**
 * STOMP Class, acts like a factory to create {@link Client}.
 *
 * Part of `@stomp/stompjs`.
 *
 * **Deprecated**
 *
 * It will be removed in next major version. Please switch to {@link Client}.
 */
class Stomp {
    /**
     * This method creates a WebSocket client that is connected to
     * the STOMP server located at the url.
     *
     * ```javascript
     *        var url = "ws://localhost:61614/stomp";
     *        var client = Stomp.client(url);
     * ```
     *
     * **Deprecated**
     *
     * It will be removed in next major version. Please switch to {@link Client}
     * using [Client#brokerURL]{@link Client#brokerURL}.
     */
    static client(url, protocols) {
        // This is a hack to allow another implementation than the standard
        // HTML5 WebSocket class.
        //
        // It is possible to use another class by calling
        //
        //     Stomp.WebSocketClass = MozWebSocket
        //
        // *prior* to call `Stomp.client()`.
        //
        // This hack is deprecated and `Stomp.over()` method should be used
        // instead.
        // See remarks on the function Stomp.over
        if (protocols == null) {
            protocols = _versions__WEBPACK_IMPORTED_MODULE_0__["Versions"].default.protocolVersions();
        }
        const wsFn = () => {
            const klass = Stomp.WebSocketClass || WebSocket;
            return new klass(url, protocols);
        };
        return new _compat_client__WEBPACK_IMPORTED_MODULE_1__["CompatClient"](wsFn);
    }
    /**
     * This method is an alternative to [Stomp#client]{@link Stomp#client} to let the user
     * specify the WebSocket to use (either a standard HTML5 WebSocket or
     * a similar object).
     *
     * In order to support reconnection, the function Client._connect should be callable more than once.
     * While reconnecting
     * a new instance of underlying transport (TCP Socket, WebSocket or SockJS) will be needed. So, this function
     * alternatively allows passing a function that should return a new instance of the underlying socket.
     *
     * ```javascript
     *        var client = Stomp.over(function(){
     *          return new WebSocket('ws://localhost:15674/ws')
     *        });
     * ```
     *
     * **Deprecated**
     *
     * It will be removed in next major version. Please switch to {@link Client}
     * using [Client#webSocketFactory]{@link Client#webSocketFactory}.
     */
    static over(ws) {
        let wsFn;
        if (typeof ws === 'function') {
            wsFn = ws;
        }
        else {
            console.warn('Stomp.over did not receive a factory, auto reconnect will not work. ' +
                'Please see https://stomp-js.github.io/api-docs/latest/classes/Stomp.html#over');
            wsFn = () => ws;
        }
        return new _compat_client__WEBPACK_IMPORTED_MODULE_1__["CompatClient"](wsFn);
    }
}
/**
 * In case you need to use a non standard class for WebSocket.
 *
 * For example when using within NodeJS environment:
 *
 * ```javascript
 *        StompJs = require('../../esm5/');
 *        Stomp = StompJs.Stomp;
 *        Stomp.WebSocketClass = require('websocket').w3cwebsocket;
 * ```
 *
 * **Deprecated**
 *
 *
 * It will be removed in next major version. Please switch to {@link Client}
 * using [Client#webSocketFactory]{@link Client#webSocketFactory}.
 */
// tslint:disable-next-line:variable-name
Stomp.WebSocketClass = null;


/***/ }),

/***/ "./src/frame-impl.ts":
/*!***************************!*\
  !*** ./src/frame-impl.ts ***!
  \***************************/
/*! exports provided: FrameImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrameImpl", function() { return FrameImpl; });
/* harmony import */ var _byte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./byte */ "./src/byte.ts");

/**
 * Frame class represents a STOMP frame.
 *
 * @internal
 */
class FrameImpl {
    /**
     * Frame constructor. `command`, `headers` and `body` are available as properties.
     *
     * @internal
     */
    constructor(params) {
        const { command, headers, body, binaryBody, escapeHeaderValues, skipContentLengthHeader, } = params;
        this.command = command;
        this.headers = Object.assign({}, headers || {});
        if (binaryBody) {
            this._binaryBody = binaryBody;
            this.isBinaryBody = true;
        }
        else {
            this._body = body || '';
            this.isBinaryBody = false;
        }
        this.escapeHeaderValues = escapeHeaderValues || false;
        this.skipContentLengthHeader = skipContentLengthHeader || false;
    }
    /**
     * body of the frame
     */
    get body() {
        if (!this._body && this.isBinaryBody) {
            this._body = new TextDecoder().decode(this._binaryBody);
        }
        return this._body;
    }
    /**
     * body as Uint8Array
     */
    get binaryBody() {
        if (!this._binaryBody && !this.isBinaryBody) {
            this._binaryBody = new TextEncoder().encode(this._body);
        }
        return this._binaryBody;
    }
    /**
     * deserialize a STOMP Frame from raw data.
     *
     * @internal
     */
    static fromRawFrame(rawFrame, escapeHeaderValues) {
        const headers = {};
        const trim = (str) => str.replace(/^\s+|\s+$/g, '');
        // In case of repeated headers, as per standards, first value need to be used
        for (const header of rawFrame.headers.reverse()) {
            const idx = header.indexOf(':');
            const key = trim(header[0]);
            let value = trim(header[1]);
            if (escapeHeaderValues &&
                rawFrame.command !== 'CONNECT' &&
                rawFrame.command !== 'CONNECTED') {
                value = FrameImpl.hdrValueUnEscape(value);
            }
            headers[key] = value;
        }
        return new FrameImpl({
            command: rawFrame.command,
            headers,
            binaryBody: rawFrame.binaryBody,
            escapeHeaderValues,
        });
    }
    /**
     * @internal
     */
    toString() {
        return this.serializeCmdAndHeaders();
    }
    /**
     * serialize this Frame in a format suitable to be passed to WebSocket.
     * If the body is string the output will be string.
     * If the body is binary (i.e. of type Unit8Array) it will be serialized to ArrayBuffer.
     *
     * @internal
     */
    serialize() {
        const cmdAndHeaders = this.serializeCmdAndHeaders();
        if (this.isBinaryBody) {
            return FrameImpl.toUnit8Array(cmdAndHeaders, this._binaryBody).buffer;
        }
        else {
            return cmdAndHeaders + this._body + _byte__WEBPACK_IMPORTED_MODULE_0__["BYTE"].NULL;
        }
    }
    serializeCmdAndHeaders() {
        const lines = [this.command];
        if (this.skipContentLengthHeader) {
            delete this.headers['content-length'];
        }
        for (const name of Object.keys(this.headers || {})) {
            const value = this.headers[name];
            if (this.escapeHeaderValues &&
                this.command !== 'CONNECT' &&
                this.command !== 'CONNECTED') {
                lines.push(`${name}:${FrameImpl.hdrValueEscape(`${value}`)}`);
            }
            else {
                lines.push(`${name}:${value}`);
            }
        }
        if (this.isBinaryBody ||
            (!this.isBodyEmpty() && !this.skipContentLengthHeader)) {
            lines.push(`content-length:${this.bodyLength()}`);
        }
        return lines.join(_byte__WEBPACK_IMPORTED_MODULE_0__["BYTE"].LF) + _byte__WEBPACK_IMPORTED_MODULE_0__["BYTE"].LF + _byte__WEBPACK_IMPORTED_MODULE_0__["BYTE"].LF;
    }
    isBodyEmpty() {
        return this.bodyLength() === 0;
    }
    bodyLength() {
        const binaryBody = this.binaryBody;
        return binaryBody ? binaryBody.length : 0;
    }
    /**
     * Compute the size of a UTF-8 string by counting its number of bytes
     * (and not the number of characters composing the string)
     */
    static sizeOfUTF8(s) {
        return s ? new TextEncoder().encode(s).length : 0;
    }
    static toUnit8Array(cmdAndHeaders, binaryBody) {
        const uint8CmdAndHeaders = new TextEncoder().encode(cmdAndHeaders);
        const nullTerminator = new Uint8Array([0]);
        const uint8Frame = new Uint8Array(uint8CmdAndHeaders.length + binaryBody.length + nullTerminator.length);
        uint8Frame.set(uint8CmdAndHeaders);
        uint8Frame.set(binaryBody, uint8CmdAndHeaders.length);
        uint8Frame.set(nullTerminator, uint8CmdAndHeaders.length + binaryBody.length);
        return uint8Frame;
    }
    /**
     * Serialize a STOMP frame as per STOMP standards, suitable to be sent to the STOMP broker.
     *
     * @internal
     */
    static marshall(params) {
        const frame = new FrameImpl(params);
        return frame.serialize();
    }
    /**
     *  Escape header values
     */
    static hdrValueEscape(str) {
        return str
            .replace(/\\/g, '\\\\')
            .replace(/\r/g, '\\r')
            .replace(/\n/g, '\\n')
            .replace(/:/g, '\\c');
    }
    /**
     * UnEscape header values
     */
    static hdrValueUnEscape(str) {
        return str
            .replace(/\\r/g, '\r')
            .replace(/\\n/g, '\n')
            .replace(/\\c/g, ':')
            .replace(/\\\\/g, '\\');
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Client, FrameImpl, Parser, StompConfig, StompHeaders, StompSubscription, StompSocketState, ActivationState, Versions, CompatClient, Stomp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "./src/client.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Client", function() { return _client__WEBPACK_IMPORTED_MODULE_0__["Client"]; });

/* harmony import */ var _frame_impl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frame-impl */ "./src/frame-impl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FrameImpl", function() { return _frame_impl__WEBPACK_IMPORTED_MODULE_1__["FrameImpl"]; });

/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser */ "./src/parser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Parser", function() { return _parser__WEBPACK_IMPORTED_MODULE_2__["Parser"]; });

/* harmony import */ var _stomp_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stomp-config */ "./src/stomp-config.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StompConfig", function() { return _stomp_config__WEBPACK_IMPORTED_MODULE_3__["StompConfig"]; });

/* harmony import */ var _stomp_headers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stomp-headers */ "./src/stomp-headers.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StompHeaders", function() { return _stomp_headers__WEBPACK_IMPORTED_MODULE_4__["StompHeaders"]; });

/* harmony import */ var _stomp_subscription__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stomp-subscription */ "./src/stomp-subscription.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StompSubscription", function() { return _stomp_subscription__WEBPACK_IMPORTED_MODULE_5__["StompSubscription"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types */ "./src/types.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StompSocketState", function() { return _types__WEBPACK_IMPORTED_MODULE_6__["StompSocketState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ActivationState", function() { return _types__WEBPACK_IMPORTED_MODULE_6__["ActivationState"]; });

/* harmony import */ var _versions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./versions */ "./src/versions.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Versions", function() { return _versions__WEBPACK_IMPORTED_MODULE_7__["Versions"]; });

/* harmony import */ var _compatibility_compat_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./compatibility/compat-client */ "./src/compatibility/compat-client.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompatClient", function() { return _compatibility_compat_client__WEBPACK_IMPORTED_MODULE_8__["CompatClient"]; });

/* harmony import */ var _compatibility_stomp__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./compatibility/stomp */ "./src/compatibility/stomp.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stomp", function() { return _compatibility_stomp__WEBPACK_IMPORTED_MODULE_9__["Stomp"]; });









// Compatibility code




/***/ }),

/***/ "./src/parser.ts":
/*!***********************!*\
  !*** ./src/parser.ts ***!
  \***********************/
/*! exports provided: Parser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parser", function() { return Parser; });
/**
 * @internal
 */
const NULL = 0;
/**
 * @internal
 */
const LF = 10;
/**
 * @internal
 */
const CR = 13;
/**
 * @internal
 */
const COLON = 58;
/**
 * This is an evented, rec descent parser.
 * A stream of Octets can be passed and whenever it recognizes
 * a complete Frame or an incoming ping it will invoke the registered callbacks.
 *
 * All incoming Octets are fed into _onByte function.
 * Depending on current state the _onByte function keeps changing.
 * Depending on the state it keeps accumulating into _token and _results.
 * State is indicated by current value of _onByte, all states are named as _collect.
 *
 * STOMP standards https://stomp.github.io/stomp-specification-1.2.html
 * imply that all lengths are considered in bytes (instead of string lengths).
 * So, before actual parsing, if the incoming data is String it is converted to Octets.
 * This allows faithful implementation of the protocol and allows NULL Octets to be present in the body.
 *
 * There is no peek function on the incoming data.
 * When a state change occurs based on an Octet without consuming the Octet,
 * the Octet, after state change, is fed again (_reinjectByte).
 * This became possible as the state change can be determined by inspecting just one Octet.
 *
 * There are two modes to collect the body, if content-length header is there then it by counting Octets
 * otherwise it is determined by NULL terminator.
 *
 * Following the standards, the command and headers are converted to Strings
 * and the body is returned as Octets.
 * Headers are returned as an array and not as Hash - to allow multiple occurrence of an header.
 *
 * This parser does not use Regular Expressions as that can only operate on Strings.
 *
 * It handles if multiple STOMP frames are given as one chunk, a frame is split into multiple chunks, or
 * any combination there of. The parser remembers its state (any partial frame) and continues when a new chunk
 * is pushed.
 *
 * Typically the higher level function will convert headers to Hash, handle unescaping of header values
 * (which is protocol version specific), and convert body to text.
 *
 * Check the parser.spec.js to understand cases that this parser is supposed to handle.
 *
 * Part of `@stomp/stompjs`.
 *
 * @internal
 */
class Parser {
    constructor(onFrame, onIncomingPing) {
        this.onFrame = onFrame;
        this.onIncomingPing = onIncomingPing;
        this._encoder = new TextEncoder();
        this._decoder = new TextDecoder();
        this._token = [];
        this._initState();
    }
    parseChunk(segment, appendMissingNULLonIncoming = false) {
        let chunk;
        if (segment instanceof ArrayBuffer) {
            chunk = new Uint8Array(segment);
        }
        else {
            chunk = this._encoder.encode(segment);
        }
        // See https://github.com/stomp-js/stompjs/issues/89
        // Remove when underlying issue is fixed.
        //
        // Send a NULL byte, if the last byte of a Text frame was not NULL.F
        if (appendMissingNULLonIncoming && chunk[chunk.length - 1] !== 0) {
            const chunkWithNull = new Uint8Array(chunk.length + 1);
            chunkWithNull.set(chunk, 0);
            chunkWithNull[chunk.length] = 0;
            chunk = chunkWithNull;
        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < chunk.length; i++) {
            const byte = chunk[i];
            this._onByte(byte);
        }
    }
    // The following implements a simple Rec Descent Parser.
    // The grammar is simple and just one byte tells what should be the next state
    _collectFrame(byte) {
        if (byte === NULL) {
            // Ignore
            return;
        }
        if (byte === CR) {
            // Ignore CR
            return;
        }
        if (byte === LF) {
            // Incoming Ping
            this.onIncomingPing();
            return;
        }
        this._onByte = this._collectCommand;
        this._reinjectByte(byte);
    }
    _collectCommand(byte) {
        if (byte === CR) {
            // Ignore CR
            return;
        }
        if (byte === LF) {
            this._results.command = this._consumeTokenAsUTF8();
            this._onByte = this._collectHeaders;
            return;
        }
        this._consumeByte(byte);
    }
    _collectHeaders(byte) {
        if (byte === CR) {
            // Ignore CR
            return;
        }
        if (byte === LF) {
            this._setupCollectBody();
            return;
        }
        this._onByte = this._collectHeaderKey;
        this._reinjectByte(byte);
    }
    _reinjectByte(byte) {
        this._onByte(byte);
    }
    _collectHeaderKey(byte) {
        if (byte === COLON) {
            this._headerKey = this._consumeTokenAsUTF8();
            this._onByte = this._collectHeaderValue;
            return;
        }
        this._consumeByte(byte);
    }
    _collectHeaderValue(byte) {
        if (byte === CR) {
            // Ignore CR
            return;
        }
        if (byte === LF) {
            this._results.headers.push([this._headerKey, this._consumeTokenAsUTF8()]);
            this._headerKey = undefined;
            this._onByte = this._collectHeaders;
            return;
        }
        this._consumeByte(byte);
    }
    _setupCollectBody() {
        const contentLengthHeader = this._results.headers.filter((header) => {
            return header[0] === 'content-length';
        })[0];
        if (contentLengthHeader) {
            this._bodyBytesRemaining = parseInt(contentLengthHeader[1], 10);
            this._onByte = this._collectBodyFixedSize;
        }
        else {
            this._onByte = this._collectBodyNullTerminated;
        }
    }
    _collectBodyNullTerminated(byte) {
        if (byte === NULL) {
            this._retrievedBody();
            return;
        }
        this._consumeByte(byte);
    }
    _collectBodyFixedSize(byte) {
        // It is post decrement, so that we discard the trailing NULL octet
        if (this._bodyBytesRemaining-- === 0) {
            this._retrievedBody();
            return;
        }
        this._consumeByte(byte);
    }
    _retrievedBody() {
        this._results.binaryBody = this._consumeTokenAsRaw();
        this.onFrame(this._results);
        this._initState();
    }
    // Rec Descent Parser helpers
    _consumeByte(byte) {
        this._token.push(byte);
    }
    _consumeTokenAsUTF8() {
        return this._decoder.decode(this._consumeTokenAsRaw());
    }
    _consumeTokenAsRaw() {
        const rawResult = new Uint8Array(this._token);
        this._token = [];
        return rawResult;
    }
    _initState() {
        this._results = {
            command: undefined,
            headers: [],
            binaryBody: undefined,
        };
        this._token = [];
        this._headerKey = undefined;
        this._onByte = this._collectFrame;
    }
}


/***/ }),

/***/ "./src/stomp-config.ts":
/*!*****************************!*\
  !*** ./src/stomp-config.ts ***!
  \*****************************/
/*! exports provided: StompConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StompConfig", function() { return StompConfig; });
/**
 * Configuration options for STOMP Client, each key corresponds to
 * field by the same name in {@link Client}. This can be passed to
 * the constructor of {@link Client} or to [Client#configure]{@link Client#configure}.
 *
 * There used to be a class with the same name in `@stomp/ng2-stompjs`, which has been replaced by
 * {@link RxStompConfig} and {@link InjectableRxStompConfig}.
 *
 * Part of `@stomp/stompjs`.
 */
class StompConfig {
}


/***/ }),

/***/ "./src/stomp-handler.ts":
/*!******************************!*\
  !*** ./src/stomp-handler.ts ***!
  \******************************/
/*! exports provided: StompHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StompHandler", function() { return StompHandler; });
/* harmony import */ var _byte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./byte */ "./src/byte.ts");
/* harmony import */ var _frame_impl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frame-impl */ "./src/frame-impl.ts");
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser */ "./src/parser.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./src/types.ts");
/* harmony import */ var _versions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./versions */ "./src/versions.ts");
/* harmony import */ var _augment_websocket__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./augment-websocket */ "./src/augment-websocket.ts");






/**
 * The STOMP protocol handler
 *
 * Part of `@stomp/stompjs`.
 *
 * @internal
 */
class StompHandler {
    constructor(_client, _webSocket, config = {}) {
        this._client = _client;
        this._webSocket = _webSocket;
        this._serverFrameHandlers = {
            // [CONNECTED Frame](http://stomp.github.com/stomp-specification-1.2.html#CONNECTED_Frame)
            CONNECTED: frame => {
                this.debug(`connected to server ${frame.headers.server}`);
                this._connected = true;
                this._connectedVersion = frame.headers.version;
                // STOMP version 1.2 needs header values to be escaped
                if (this._connectedVersion === _versions__WEBPACK_IMPORTED_MODULE_4__["Versions"].V1_2) {
                    this._escapeHeaderValues = true;
                }
                this._setupHeartbeat(frame.headers);
                this.onConnect(frame);
            },
            // [MESSAGE Frame](http://stomp.github.com/stomp-specification-1.2.html#MESSAGE)
            MESSAGE: frame => {
                // the callback is registered when the client calls
                // `subscribe()`.
                // If there is no registered subscription for the received message,
                // the default `onUnhandledMessage` callback is used that the client can set.
                // This is useful for subscriptions that are automatically created
                // on the browser side (e.g. [RabbitMQ's temporary
                // queues](http://www.rabbitmq.com/stomp.html)).
                const subscription = frame.headers.subscription;
                const onReceive = this._subscriptions[subscription] || this.onUnhandledMessage;
                // bless the frame to be a Message
                const message = frame;
                const client = this;
                const messageId = this._connectedVersion === _versions__WEBPACK_IMPORTED_MODULE_4__["Versions"].V1_2
                    ? message.headers.ack
                    : message.headers['message-id'];
                // add `ack()` and `nack()` methods directly to the returned frame
                // so that a simple call to `message.ack()` can acknowledge the message.
                message.ack = (headers = {}) => {
                    return client.ack(messageId, subscription, headers);
                };
                message.nack = (headers = {}) => {
                    return client.nack(messageId, subscription, headers);
                };
                onReceive(message);
            },
            // [RECEIPT Frame](http://stomp.github.com/stomp-specification-1.2.html#RECEIPT)
            RECEIPT: frame => {
                const callback = this._receiptWatchers[frame.headers['receipt-id']];
                if (callback) {
                    callback(frame);
                    // Server will acknowledge only once, remove the callback
                    delete this._receiptWatchers[frame.headers['receipt-id']];
                }
                else {
                    this.onUnhandledReceipt(frame);
                }
            },
            // [ERROR Frame](http://stomp.github.com/stomp-specification-1.2.html#ERROR)
            ERROR: frame => {
                this.onStompError(frame);
            },
        };
        // used to index subscribers
        this._counter = 0;
        // subscription callbacks indexed by subscriber's ID
        this._subscriptions = {};
        // receipt-watchers indexed by receipts-ids
        this._receiptWatchers = {};
        this._partialData = '';
        this._escapeHeaderValues = false;
        this._lastServerActivityTS = Date.now();
        this.configure(config);
    }
    get connectedVersion() {
        return this._connectedVersion;
    }
    get connected() {
        return this._connected;
    }
    configure(conf) {
        // bulk assign all properties to this
        Object.assign(this, conf);
    }
    start() {
        const parser = new _parser__WEBPACK_IMPORTED_MODULE_2__["Parser"](
        // On Frame
        rawFrame => {
            const frame = _frame_impl__WEBPACK_IMPORTED_MODULE_1__["FrameImpl"].fromRawFrame(rawFrame, this._escapeHeaderValues);
            // if this.logRawCommunication is set, the rawChunk is logged at this._webSocket.onmessage
            if (!this.logRawCommunication) {
                this.debug(`<<< ${frame}`);
            }
            const serverFrameHandler = this._serverFrameHandlers[frame.command] || this.onUnhandledFrame;
            serverFrameHandler(frame);
        }, 
        // On Incoming Ping
        () => {
            this.debug('<<< PONG');
        });
        this._webSocket.onmessage = (evt) => {
            this.debug('Received data');
            this._lastServerActivityTS = Date.now();
            if (this.logRawCommunication) {
                const rawChunkAsString = evt.data instanceof ArrayBuffer
                    ? new TextDecoder().decode(evt.data)
                    : evt.data;
                this.debug(`<<< ${rawChunkAsString}`);
            }
            parser.parseChunk(evt.data, this.appendMissingNULLonIncoming);
        };
        this._onclose = (closeEvent) => {
            this.debug(`Connection closed to ${this._client.brokerURL}`);
            this._cleanUp();
            this.onWebSocketClose(closeEvent);
        };
        this._webSocket.onclose = this._onclose;
        this._webSocket.onerror = (errorEvent) => {
            this.onWebSocketError(errorEvent);
        };
        this._webSocket.onopen = () => {
            // Clone before updating
            const connectHeaders = Object.assign({}, this.connectHeaders);
            this.debug('Web Socket Opened...');
            connectHeaders['accept-version'] = this.stompVersions.supportedVersions();
            connectHeaders['heart-beat'] = [
                this.heartbeatOutgoing,
                this.heartbeatIncoming,
            ].join(',');
            this._transmit({ command: 'CONNECT', headers: connectHeaders });
        };
    }
    _setupHeartbeat(headers) {
        if (headers.version !== _versions__WEBPACK_IMPORTED_MODULE_4__["Versions"].V1_1 &&
            headers.version !== _versions__WEBPACK_IMPORTED_MODULE_4__["Versions"].V1_2) {
            return;
        }
        // It is valid for the server to not send this header
        // https://stomp.github.io/stomp-specification-1.2.html#Heart-beating
        if (!headers['heart-beat']) {
            return;
        }
        // heart-beat header received from the server looks like:
        //
        //     heart-beat: sx, sy
        const [serverOutgoing, serverIncoming] = headers['heart-beat']
            .split(',')
            .map((v) => parseInt(v, 10));
        if (this.heartbeatOutgoing !== 0 && serverIncoming !== 0) {
            const ttl = Math.max(this.heartbeatOutgoing, serverIncoming);
            this.debug(`send PING every ${ttl}ms`);
            this._pinger = setInterval(() => {
                if (this._webSocket.readyState === _types__WEBPACK_IMPORTED_MODULE_3__["StompSocketState"].OPEN) {
                    this._webSocket.send(_byte__WEBPACK_IMPORTED_MODULE_0__["BYTE"].LF);
                    this.debug('>>> PING');
                }
            }, ttl);
        }
        if (this.heartbeatIncoming !== 0 && serverOutgoing !== 0) {
            const ttl = Math.max(this.heartbeatIncoming, serverOutgoing);
            this.debug(`check PONG every ${ttl}ms`);
            this._ponger = setInterval(() => {
                const delta = Date.now() - this._lastServerActivityTS;
                // We wait twice the TTL to be flexible on window's setInterval calls
                if (delta > ttl * 2) {
                    this.debug(`did not receive server activity for the last ${delta}ms`);
                    this._closeOrDiscardWebsocket();
                }
            }, ttl);
        }
    }
    _closeOrDiscardWebsocket() {
        if (this.discardWebsocketOnCommFailure) {
            this.debug("Discarding websocket, the underlying socket may linger for a while");
            this._discardWebsocket();
        }
        else {
            this.debug("Issuing close on the websocket");
            this._closeWebsocket();
        }
    }
    forceDisconnect() {
        if (this._webSocket) {
            if (this._webSocket.readyState === _types__WEBPACK_IMPORTED_MODULE_3__["StompSocketState"].CONNECTING ||
                this._webSocket.readyState === _types__WEBPACK_IMPORTED_MODULE_3__["StompSocketState"].OPEN) {
                this._closeOrDiscardWebsocket();
            }
        }
    }
    _closeWebsocket() {
        this._webSocket.onmessage = () => { }; // ignore messages
        this._webSocket.close();
    }
    _discardWebsocket() {
        if (!this._webSocket.terminate) {
            Object(_augment_websocket__WEBPACK_IMPORTED_MODULE_5__["augmentWebsocket"])(this._webSocket, (msg) => this.debug(msg));
        }
        this._webSocket.terminate();
    }
    _transmit(params) {
        const { command, headers, body, binaryBody, skipContentLengthHeader, } = params;
        const frame = new _frame_impl__WEBPACK_IMPORTED_MODULE_1__["FrameImpl"]({
            command,
            headers,
            body,
            binaryBody,
            escapeHeaderValues: this._escapeHeaderValues,
            skipContentLengthHeader,
        });
        let rawChunk = frame.serialize();
        if (this.logRawCommunication) {
            this.debug(`>>> ${rawChunk}`);
        }
        else {
            this.debug(`>>> ${frame}`);
        }
        if (this.forceBinaryWSFrames && typeof rawChunk === 'string') {
            rawChunk = new TextEncoder().encode(rawChunk);
        }
        if (typeof rawChunk !== 'string' || !this.splitLargeFrames) {
            this._webSocket.send(rawChunk);
        }
        else {
            let out = rawChunk;
            while (out.length > 0) {
                const chunk = out.substring(0, this.maxWebSocketChunkSize);
                out = out.substring(this.maxWebSocketChunkSize);
                this._webSocket.send(chunk);
                this.debug(`chunk sent = ${chunk.length}, remaining = ${out.length}`);
            }
        }
    }
    dispose() {
        if (this.connected) {
            try {
                // clone before updating
                const disconnectHeaders = Object.assign({}, this.disconnectHeaders);
                if (!disconnectHeaders.receipt) {
                    disconnectHeaders.receipt = `close-${this._counter++}`;
                }
                this.watchForReceipt(disconnectHeaders.receipt, frame => {
                    this._closeWebsocket();
                    this._cleanUp();
                    this.onDisconnect(frame);
                });
                this._transmit({ command: 'DISCONNECT', headers: disconnectHeaders });
            }
            catch (error) {
                this.debug(`Ignoring error during disconnect ${error}`);
            }
        }
        else {
            if (this._webSocket.readyState === _types__WEBPACK_IMPORTED_MODULE_3__["StompSocketState"].CONNECTING ||
                this._webSocket.readyState === _types__WEBPACK_IMPORTED_MODULE_3__["StompSocketState"].OPEN) {
                this._closeWebsocket();
            }
        }
    }
    _cleanUp() {
        this._connected = false;
        if (this._pinger) {
            clearInterval(this._pinger);
        }
        if (this._ponger) {
            clearInterval(this._ponger);
        }
    }
    publish(params) {
        const { destination, headers, body, binaryBody, skipContentLengthHeader, } = params;
        const hdrs = Object.assign({ destination }, headers);
        this._transmit({
            command: 'SEND',
            headers: hdrs,
            body,
            binaryBody,
            skipContentLengthHeader,
        });
    }
    watchForReceipt(receiptId, callback) {
        this._receiptWatchers[receiptId] = callback;
    }
    subscribe(destination, callback, headers = {}) {
        headers = Object.assign({}, headers);
        if (!headers.id) {
            headers.id = `sub-${this._counter++}`;
        }
        headers.destination = destination;
        this._subscriptions[headers.id] = callback;
        this._transmit({ command: 'SUBSCRIBE', headers });
        const client = this;
        return {
            id: headers.id,
            unsubscribe(hdrs) {
                return client.unsubscribe(headers.id, hdrs);
            },
        };
    }
    unsubscribe(id, headers = {}) {
        headers = Object.assign({}, headers);
        delete this._subscriptions[id];
        headers.id = id;
        this._transmit({ command: 'UNSUBSCRIBE', headers });
    }
    begin(transactionId) {
        const txId = transactionId || `tx-${this._counter++}`;
        this._transmit({
            command: 'BEGIN',
            headers: {
                transaction: txId,
            },
        });
        const client = this;
        return {
            id: txId,
            commit() {
                client.commit(txId);
            },
            abort() {
                client.abort(txId);
            },
        };
    }
    commit(transactionId) {
        this._transmit({
            command: 'COMMIT',
            headers: {
                transaction: transactionId,
            },
        });
    }
    abort(transactionId) {
        this._transmit({
            command: 'ABORT',
            headers: {
                transaction: transactionId,
            },
        });
    }
    ack(messageId, subscriptionId, headers = {}) {
        headers = Object.assign({}, headers);
        if (this._connectedVersion === _versions__WEBPACK_IMPORTED_MODULE_4__["Versions"].V1_2) {
            headers.id = messageId;
        }
        else {
            headers['message-id'] = messageId;
        }
        headers.subscription = subscriptionId;
        this._transmit({ command: 'ACK', headers });
    }
    nack(messageId, subscriptionId, headers = {}) {
        headers = Object.assign({}, headers);
        if (this._connectedVersion === _versions__WEBPACK_IMPORTED_MODULE_4__["Versions"].V1_2) {
            headers.id = messageId;
        }
        else {
            headers['message-id'] = messageId;
        }
        headers.subscription = subscriptionId;
        return this._transmit({ command: 'NACK', headers });
    }
}


/***/ }),

/***/ "./src/stomp-headers.ts":
/*!******************************!*\
  !*** ./src/stomp-headers.ts ***!
  \******************************/
/*! exports provided: StompHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StompHeaders", function() { return StompHeaders; });
/**
 * STOMP headers. Many functions calls will accept headers as parameters.
 * The headers sent by Broker will be available as [IFrame#headers]{@link IFrame#headers}.
 *
 * `key` and `value` must be valid strings.
 * In addition, `key` must not contain `CR`, `LF`, or `:`.
 *
 * Part of `@stomp/stompjs`.
 */
class StompHeaders {
}


/***/ }),

/***/ "./src/stomp-subscription.ts":
/*!***********************************!*\
  !*** ./src/stomp-subscription.ts ***!
  \***********************************/
/*! exports provided: StompSubscription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StompSubscription", function() { return StompSubscription; });
/**
 * Call [Client#subscribe]{@link Client#subscribe} to create a StompSubscription.
 *
 * Part of `@stomp/stompjs`.
 */
class StompSubscription {
}


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! exports provided: StompSocketState, ActivationState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StompSocketState", function() { return StompSocketState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivationState", function() { return ActivationState; });
/**
 * Possible states for the IStompSocket
 */
var StompSocketState;
(function (StompSocketState) {
    StompSocketState[StompSocketState["CONNECTING"] = 0] = "CONNECTING";
    StompSocketState[StompSocketState["OPEN"] = 1] = "OPEN";
    StompSocketState[StompSocketState["CLOSING"] = 2] = "CLOSING";
    StompSocketState[StompSocketState["CLOSED"] = 3] = "CLOSED";
})(StompSocketState || (StompSocketState = {}));
/**
 * Possible activation state
 */
var ActivationState;
(function (ActivationState) {
    ActivationState[ActivationState["ACTIVE"] = 0] = "ACTIVE";
    ActivationState[ActivationState["DEACTIVATING"] = 1] = "DEACTIVATING";
    ActivationState[ActivationState["INACTIVE"] = 2] = "INACTIVE";
})(ActivationState || (ActivationState = {}));


/***/ }),

/***/ "./src/versions.ts":
/*!*************************!*\
  !*** ./src/versions.ts ***!
  \*************************/
/*! exports provided: Versions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Versions", function() { return Versions; });
/**
 * Supported STOMP versions
 *
 * Part of `@stomp/stompjs`.
 */
class Versions {
    /**
     * Takes an array of string of versions, typical elements '1.0', '1.1', or '1.2'
     *
     * You will an instance if this class if you want to override supported versions to be declared during
     * STOMP handshake.
     */
    constructor(versions) {
        this.versions = versions;
    }
    /**
     * Used as part of CONNECT STOMP Frame
     */
    supportedVersions() {
        return this.versions.join(',');
    }
    /**
     * Used while creating a WebSocket
     */
    protocolVersions() {
        return this.versions.map(x => `v${x.replace('.', '')}.stomp`);
    }
}
/**
 * Indicates protocol version 1.0
 */
Versions.V1_0 = '1.0';
/**
 * Indicates protocol version 1.1
 */
Versions.V1_1 = '1.1';
/**
 * Indicates protocol version 1.2
 */
Versions.V1_2 = '1.2';
/**
 * @internal
 */
Versions.default = new Versions([
    Versions.V1_0,
    Versions.V1_1,
    Versions.V1_2,
]);


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/kdeepak/MyWork/Tech/stomp/stompjs/src/index.ts */"./src/index.ts");


/***/ })

/******/ });
});

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "v1", {
  enumerable: true,
  get: function () {
    return _v.default;
  }
});
Object.defineProperty(exports, "v3", {
  enumerable: true,
  get: function () {
    return _v2.default;
  }
});
Object.defineProperty(exports, "v4", {
  enumerable: true,
  get: function () {
    return _v3.default;
  }
});
Object.defineProperty(exports, "v5", {
  enumerable: true,
  get: function () {
    return _v4.default;
  }
});
Object.defineProperty(exports, "NIL", {
  enumerable: true,
  get: function () {
    return _nil.default;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.default;
  }
});
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function () {
    return _validate.default;
  }
});
Object.defineProperty(exports, "stringify", {
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parse.default;
  }
});

var _v = _interopRequireDefault(require("./v1.js"));

var _v2 = _interopRequireDefault(require("./v3.js"));

var _v3 = _interopRequireDefault(require("./v4.js"));

var _v4 = _interopRequireDefault(require("./v5.js"));

var _nil = _interopRequireDefault(require("./nil.js"));

var _version = _interopRequireDefault(require("./version.js"));

var _validate = _interopRequireDefault(require("./validate.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./nil.js":5,"./parse.js":6,"./stringify.js":10,"./v1.js":11,"./v3.js":12,"./v4.js":14,"./v5.js":15,"./validate.js":16,"./version.js":17}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports.default = _default;
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports.default = _default;
},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports.default = _default;
},{"./validate.js":16}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports.default = _default;
},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
const getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
const rnds8 = new Uint8Array(16);

function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}
},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports.default = _default;
},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports.default = _default;
},{"./validate.js":16}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports.default = _default;
},{"./rng.js":8,"./stringify.js":10}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _md = _interopRequireDefault(require("./md5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports.default = _default;
},{"./md5.js":4,"./v35.js":13}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
},{"./parse.js":6,"./stringify.js":10}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports.default = _default;
},{"./rng.js":8,"./stringify.js":10}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _sha = _interopRequireDefault(require("./sha1.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports.default = _default;
},{"./sha1.js":9,"./v35.js":13}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regex = _interopRequireDefault(require("./regex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports.default = _default;
},{"./regex.js":7}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports.default = _default;
},{"./validate.js":16}]},{},[1]);

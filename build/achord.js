"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var handleData = require('./modules/main').handleData;

var trimBuffer = require('./modules/main').trimBuffer;

var detectChord = require('./modules/main').detectChord;

var sampleRate = 44100;
var sampleLength = 4096;
var hopLength = 1024;
var bufferLength = sampleRate * 1;
var eventTracker = 0;
var chromaBuffer = [];
post('Initialized sample rate to', sampleRate, 'samples');
post('Initialized sample length to', sampleLenth, 'samples');
post('Initialized hop length to', hopLength, 'samples');
post('Initialized buffer length to', bufferLength, 'samples');

function setSampleRate(value) {
  sampleRate = value;
  post('Set sample rate to', sampleRate);
}

function setSampleLength(value) {
  sampleLength = value;
  post('Set sample length to', sampleLength);
}

function setHopLength(value) {
  hopLength = value;
  post('Set hop length to', hopLength);
}

function setModelType(value) {
  model = template[value];
  post('Now using the', value, 'model type');
}
/*
The audio processing step is the most CPU intensive step of the process.
In essence, we are using STFT on slices of a signal buffer. The frames and timing
are handled by Max. This handler simply processes the data found in the buffer
from start_frame to end_frame and appends the resulting chroma to the chromaBuffer list
which is stored and maintained in memory by trimBuffer. 

PCPDict allows Max to access the average PCP profile for visualization purposes.
*/


buffer = new Buffer('coreSignalBuffer');
var displayChromagram = new Dict('displayChromagram');

function processBufferFrame(_x, _x2) {
  return _processBufferFrame.apply(this, arguments);
}

function _processBufferFrame() {
  _processBufferFrame = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(start_frame, end_frame) {
    var _ref2, _ref3;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            audioFrame = buffer.peek(start_frame, end_frame);
            _context2.next = 3;
            return handleData(audioFrame, chromaBuffer, eventTracker);

          case 3:
            _ref2 = _context2.sent;
            _ref3 = (0, _slicedToArray2["default"])(_ref2, 2);
            chromaBuffer = _ref3[0];
            eventTracker = _ref3[1];

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _processBufferFrame.apply(this, arguments);
}

setInterval(function () {
  chromaBuffer = trimBuffer(chromaBuffer);
}, 200);
/*
Periodic task to detect chord if data is present in buffer
*/

setInterval(
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return detectChord(chromaBuffer);

        case 2:
          chord = _context.sent;
          outlet(chord);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})), 200);
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

outlets = 2;

var handleData = require('./main').handleData;

var detectChord = require('./main').detectChord;

var trimBuffer = require('./main').trimBuffer;

var sampleRate = 44100;
var sampleLength = 4096;
var hopLength = 1024;
var bufferLength = sampleRate * 1;
var eventTracker = 0;
var chromaBuffer = [];
post('Initialized sample rate to', sampleRate, 'samples');
post('Initialized sample length to', sampleLength, 'samples');
post('Initialized hop length to', hopLength, 'samples');
post('Initialized buffer length to', bufferLength, 'samples');
post('Initialized model type to basic');

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
/*
The audio processing step is the most CPU intensive step of the process.
In essence, we are using STFT on slices of a signal buffer. The frames and timing
are handled by Max. This handler simply processes the data found in the buffer
from start_frame to end_frame and appends the resulting chroma to the chromaBuffer list
which is stored and maintained in memory by trimBuffer. 

PCPDict allows Max to access the average PCP profile for visualization purposes.
*/


var bufferArray = new Array();
bufferArray[0] = new Buffer("audioBuffer0");
bufferArray[1] = new Buffer("audioBuffer1");
bufferArray[2] = new Buffer("audioBuffer2");
bufferArray[3] = new Buffer("audioBuffer3"); // var displayChromagram = new Dict('displayChromagram')

function process(_x) {
  return _process.apply(this, arguments);
}

function _process() {
  _process = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(end_frame) {
    var audioFrame, _ref, _ref2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            audioFrame = bufferArray[i % 4].peek(1, end_frame, end_frame);
            i++;

            if (i >= 4) {
              i = 0;
            }

            ;
            _context.next = 6;
            return handleData(audioFrame, chromaBuffer, eventTracker);

          case 6:
            _ref = _context.sent;
            _ref2 = (0, _slicedToArray2["default"])(_ref, 2);
            chromaBuffer = _ref2[0];
            eventTracker = _ref2[1];

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _process.apply(this, arguments);
}

function trim() {
  chromaBuffer = trimBuffer(chromaBuffer);
  post('Trimming buffer');
}

function detect() {
  return _detect.apply(this, arguments);
}

function _detect() {
  _detect = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return detectChord(chromaBuffer);

          case 2:
            chord = _context2.sent;
            outlet(1, chord);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _detect.apply(this, arguments);
}

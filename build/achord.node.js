"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Max = require("max-api");
/* 
---------------------------------------------------------
This is the entrypoint for the Node script containing the application's
core logic.
---------------------------------------------------------
*/


var sampleRate = 44100;
var sampleLength = 4096;
var hopLength = 1024;
var bufferLength = sampleRate * 1; // currently hard-coded to one second

var eventTracker = 0; // we use this to check if we haven't received new data 

var chromaBuffer = []; // stores the processed chroma arrays
// Max handlers and interval functions
// *disable these to run tests*

Max.post("Initialized sample rate to ".concat(sampleRate, " samples."));
Max.post("Initialized sample length to ".concat(sampleLength, " samples."));
Max.post("Initialized hop length to ".concat(hopLength, " samples."));
Max.post("Initialized buffer length to ".concat(bufferLength, " samples."));
Max.addHandler('setSampleRate', function (value) {
  sampleRate = value;
  Max.post("Set sample rate to ".concat(sampleRate));
});
Max.addHandler('setSampleLength', function (value) {
  sampleLength = value;
  Max.post("Set sample length to ".concat(sampleLength));
});
Max.addHandler('setHopLength', function (value) {
  hopLength = value;
  Max.post("Set hop length to ".concat(hopLength));
});
Max.addHandler('model-type', function (value) {
  model = templates[value];
  console.log('Now using the ', value, ' model type.');
}); // Processes and appends chroma to buffer

Max.addHandler('audio',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(audio) {
    var _ref2, _ref3;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return handleAudio(audio, chromaBuffer, eventTracker);

          case 2:
            _ref2 = _context.sent;
            _ref3 = (0, _slicedToArray2["default"])(_ref2, 2);
            chromaBuffer = _ref3[0];
            eventTracker = _ref3[1];

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()); // Periodic task to trim buffer if length is greater than bufferLength

setInterval(function () {
  chromaBuffer = trimBuffer(chromaBuffer);
}, 200); // Periodic task to detect chord if data present in buffer

setInterval(
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
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
          Max.outlet(chord);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})), 100);
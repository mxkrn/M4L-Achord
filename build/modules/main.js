"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var harmonicPCP = require('./hpcp').harmonicPCP;

var sampleRate = 44100;
var hopLength = 1024;
var bufferLength = sampleRate * 1; // currently hard-coded to one second

/*
---------------------------------------------------------
Audio processing
---------------------------------------------------------
handleAudio: async function to extract chroma from incoming audio
trimBuffer: interval function to limit number of frames in chromaBuffer to bufferLength

TODO: Move feature extraction into worker thread using an audioBuffer
*/

function handleData(_x, _x2, _x3) {
  return _handleData.apply(this, arguments);
}

function _handleData() {
  _handleData = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(audio, buffer, event) {
    var hpcp;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(audio.length === 0)) {
              _context.next = 5;
              break;
            }

            event += 1;

            if (event >= Math.floor(sampleRate / hopLength) * 2 & buffer.length > 0) {
              // After 2 seconds of no data, the chromaBuffer times out and resets
              console.log('No audio for 2 seconds so the audio buffer has been cleared.');
              buffer = [];
            }

            _context.next = 10;
            break;

          case 5:
            _context.next = 7;
            return harmonicPCP(audio, sampleRate);

          case 7:
            hpcp = _context.sent;
            buffer.push(hpcp);
            event = 0; // Reset event tracker because we received new data

          case 10:
            ;
            return _context.abrupt("return", [buffer, event]);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _handleData.apply(this, arguments);
}

exports.handleData = handleData;

function trimBuffer(buffer) {
  if (buffer.length > Math.floor(bufferLength / hopLength)) {
    buffer.reverse().splice(bufferLength / hopLength);
    buffer.reverse();
  }

  ;
  return buffer;
}

exports.trimBuffer = trimBuffer; // const audioBuffer = [];
// setInterval(featureExtraction, 50);
//
// async function featureExtraction() {
// 	if (audioBuffer.length > bufferLength) {
// 		// Trim audio buffer to buffer length if necessary
// 		audioBuffer.reverse().splice(bufferLength);
// 		audioBuffer.reverse();
// 	}
// 	if (audioBuffer.length > sampleLength) {
// 		for (let i = (audioBuffer.length / hopLength) - 1; i > 0; i--) {
// 			startIndex = i*hopLength - hopLength;
// 			hpcp = await harmonicPCP(audioBuffer[startIndex, sampleLength], sampleRate);
// 			chromagram.push(hpcp);
// 			chromaCount += 1;
// 		}
// 	}
// }

/* 
---------------------------------------------------------
Chord Detection
---------------------------------------------------------
detectChord: interval function to detect chord in chromaBuffer using binary template method
*/

var _basic = require('../templates/basic.json');

var _extended = require('../templates/extended.json');

var _full = require('../templates/full.json');

var templates = {
  'basic': _basic,
  'extended': _extended,
  'full': _full
};
var model = templates['basic']; // defaults to basic model

function detectChord(_x4) {
  return _detectChord.apply(this, arguments);
}

function _detectChord() {
  _detectChord = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(buffer) {
    var chord, chromagram, promises, scores, max_score;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            chord = 'N';

            if (!(buffer.length > 0)) {
              _context3.next = 11;
              break;
            }

            // average all chroma in chromaBuffer
            chromagram = buffer.reduce(sumVertical).map(function (i) {
              return i / buffer.length;
            }); // iterate over model async and update distance if less than previous

            promises = Object.entries(model).map(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2(obj) {
                var key, target, distance;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        key = obj[0];
                        target = obj[1];
                        _context2.next = 4;
                        return dotProduct(chromagram, target);

                      case 4:
                        distance = _context2.sent;
                        return _context2.abrupt("return", {
                          'chord': key,
                          'score': distance
                        });

                      case 6:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x7) {
                return _ref.apply(this, arguments);
              };
            }());
            _context3.next = 6;
            return Promise.all(promises);

          case 6:
            scores = _context3.sent;
            // Get minimum distance and key
            max_score = 0;
            scores.forEach(function (obj) {
              if (obj['score'] > max_score) {
                max_score = obj['score'];
                chord = obj['chord'];
              }

              ;
            });
            _context3.next = 12;
            break;

          case 11:
            console.log('No data found in buffer');

          case 12:
            ;
            return _context3.abrupt("return", chord);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _detectChord.apply(this, arguments);
}

exports.detectChord = detectChord;

function dotProduct(_x5, _x6) {
  return _dotProduct.apply(this, arguments);
}

function _dotProduct() {
  _dotProduct = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(data, target) {
    var promises, scores;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            promises = data.map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee4(bin, i) {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return bin;

                      case 2:
                        _context4.t0 = _context4.sent;
                        _context4.t1 = target[i];
                        return _context4.abrupt("return", _context4.t0 * _context4.t1);

                      case 5:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x8, _x9) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context5.next = 3;
            return Promise.all(promises);

          case 3:
            scores = _context5.sent;
            return _context5.abrupt("return", scores.reduce(function (a, b) {
              return a + b;
            }, 0));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _dotProduct.apply(this, arguments);
}

exports.dotProduct = dotProduct;

var sumVertical = function sumVertical(r, a) {
  return r.map(function (b, i) {
    return a[i] + b;
  });
};

exports.sumVertical = sumVertical;
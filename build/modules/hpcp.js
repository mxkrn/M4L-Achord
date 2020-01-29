"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fft = require('./fft').fft;

var fftMag = require('./fft').fftMag;

var fftFreq = require('./fft').fftFreq; // at the moment we only consider a static tuning frequency: A4=440Hz


var fref = 440;
var fmin = 55; // corresponding to A7

var fmax = 3520; // corresponding to A1
// generate this ahead of time to save compute

var temperedScale = generateEqualTemperedScale();
var length = 0.5 * (4 / 3); // Calculates the HPCP according to Gomez (2006)

function harmonicPCP(_x, _x2) {
  return _harmonicPCP.apply(this, arguments);
}

function _harmonicPCP() {
  _harmonicPCP = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(signal, samplerate) {
    var chromagram, freqPeaks, signalPromises, promises;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            chromagram = Array.from({
              length: 12
            }, function (v, k) {
              return [];
            });
            _context4.next = 3;
            return peakDetection(signal, samplerate);

          case 3:
            freqPeaks = _context4.sent;
            signalPromises = freqPeaks.map(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2(peak) {
                var distancePromises;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        distancePromises = temperedScale.map(
                        /*#__PURE__*/
                        function () {
                          var _ref2 = (0, _asyncToGenerator2["default"])(
                          /*#__PURE__*/
                          _regenerator["default"].mark(function _callee(f_bin, i) {
                            var d, weight;
                            return _regenerator["default"].wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    d = 12 * Math.log2(peak['f'] / f_bin);

                                    if (Math.abs(d) <= length) {
                                      weight = Math.cos(Math.PI / 2 * (d / length));
                                      chromagram[i % 12].push(weight * Math.pow(peak['y'], 2));
                                    }

                                    ;

                                  case 3:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x15, _x16) {
                            return _ref2.apply(this, arguments);
                          };
                        }());
                        _context2.next = 3;
                        return Promise.all(distancePromises);

                      case 3:
                        return _context2.abrupt("return");

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x14) {
                return _ref.apply(this, arguments);
              };
            }());
            _context4.next = 7;
            return Promise.all(signalPromises);

          case 7:
            promises = chromagram.map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee3(bin) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        return _context3.abrupt("return", bin.reduce(function (a, b) {
                          return a + b;
                        }, 0));

                      case 1:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x17) {
                return _ref3.apply(this, arguments);
              };
            }());
            _context4.next = 10;
            return Promise.all(promises);

          case 10:
            return _context4.abrupt("return", _context4.sent);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _harmonicPCP.apply(this, arguments);
}

exports.harmonicPCP = harmonicPCP;

function peakDetection(_x3, _x4) {
  return _peakDetection.apply(this, arguments);
}

function _peakDetection() {
  _peakDetection = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(signal, samplerate) {
    var spectogram, promises, data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return windowedDFT(signal, samplerate);

          case 2:
            spectogram = _context6.sent;
            promises = spectogram['freqs'].map(
            /*#__PURE__*/
            function () {
              var _ref4 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee5(f, i) {
                var peak;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!(spectogram['y'][i - 1] < spectogram['y'][i] && spectogram['y'][i] > spectogram['y'][i + 1])) {
                          _context5.next = 5;
                          break;
                        }

                        _context5.next = 3;
                        return parabolaPeakInterpolation(f, spectogram['y'], i);

                      case 3:
                        peak = _context5.sent;
                        return _context5.abrupt("return", peak);

                      case 5:
                        ;

                      case 6:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x18, _x19) {
                return _ref4.apply(this, arguments);
              };
            }());
            _context6.next = 6;
            return Promise.all(promises);

          case 6:
            data = _context6.sent;
            return _context6.abrupt("return", data.filter(function (p) {
              return p !== undefined;
            }));

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _peakDetection.apply(this, arguments);
}

exports.peakDetection = peakDetection;

function parabolaPeakInterpolation(_x5, _x6, _x7) {
  return _parabolaPeakInterpolation.apply(this, arguments);
}

function _parabolaPeakInterpolation() {
  _parabolaPeakInterpolation = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(freq, y, idx) {
    var peak;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return getParabolaPeak(y[idx - 1], y[idx], y[idx + 1], freq);

          case 2:
            peak = _context7.sent;

            if (!(peak['f'] > fmin & peak['f'] < fmax)) {
              _context7.next = 7;
              break;
            }

            if (!(peak['y'] > 0.1)) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return", peak);

          case 6:
            ;

          case 7:
            ;

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _parabolaPeakInterpolation.apply(this, arguments);
}

exports.parabolaPeakInterpolation = parabolaPeakInterpolation;

function getParabolaPeak(_x8, _x9, _x10, _x11) {
  return _getParabolaPeak.apply(this, arguments);
}

function _getParabolaPeak() {
  _getParabolaPeak = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(a, b, c, f) {
    var p, f_hat, y;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            p = (a - c) / (a - 2 * b + c) / 2;
            f_hat = f + p;
            y = b - (a - c) * (p / 4);
            return _context8.abrupt("return", {
              'f': f_hat,
              'y': y
            });

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _getParabolaPeak.apply(this, arguments);
}

exports.getParabolaPeak = getParabolaPeak;

function windowedDFT(_x12, _x13) {
  return _windowedDFT.apply(this, arguments);
}

function _windowedDFT() {
  _windowedDFT = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10(signal, samplerate) {
    var promises, windowed, phasors, freqs, magnitudes;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            promises = signal.map(
            /*#__PURE__*/
            function () {
              var _ref5 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee9(y, i) {
                var value;
                return _regenerator["default"].wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return y;

                      case 2:
                        _context9.t0 = _context9.sent;
                        _context9.t1 = 0.54 - 0.46 * Math.cos(2 * Math.PI * i / (signal.length - 1));
                        value = _context9.t0 * _context9.t1;
                        return _context9.abrupt("return", value);

                      case 6:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x20, _x21) {
                return _ref5.apply(this, arguments);
              };
            }());
            _context10.next = 3;
            return Promise.all(promises);

          case 3:
            windowed = _context10.sent;
            phasors = fft(windowed);
            freqs = fftFreq(phasors, samplerate);
            magnitudes = fftMag(phasors);
            return _context10.abrupt("return", {
              'freqs': freqs,
              'y': magnitudes
            });

          case 8:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _windowedDFT.apply(this, arguments);
}

exports.windowedDFT = windowedDFT;

function generateEqualTemperedScale() {
  var ratios = [];

  for (var i = 0; i < 12; i++) {
    ratios.push(Math.pow(2, i / 12));
  }

  var scale = [];

  var _loop = function _loop(_i) {
    ratios.forEach(function (r) {
      scale.push(r * (fref * Math.pow(2, _i)));
    });
  };

  for (var _i = -3; _i <= 2; _i++) {
    _loop(_i);
  }

  ;
  return scale;
}

exports.generateEqualTemperedScale = generateEqualTemperedScale;
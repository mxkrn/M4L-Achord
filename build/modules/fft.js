"use strict";

//-------------------------------------------------
// Fast Fourier Transform
//-------------------------------------------------
function fft(signal) {
  var X = [],
      N = signal.length; // Base case is X = x + 0i since our input is assumed to be real only.

  if (N == 1) {
    if (Array.isArray(signal[0])) //If input vector contains complex numbers
      return [[signal[0][0], signal[0][1]]];else return [[signal[0], 0]];
  } // Recurse: all even samples


  var X_evens = fft(signal.filter(even)),
      // Recurse: all odd samples
  X_odds = fft(signal.filter(odd)); // Now, perform N/2 operations!

  for (var k = 0; k < N / 2; k++) {
    // t is a complex number!
    var t = X_evens[k],
        e = complexMultiply(exponent(k, N), X_odds[k]);
    X[k] = complexAdd(t, e);
    X[k + N / 2] = complexSubtract(t, e);
  }

  function even(__, ix) {
    return ix % 2 == 0;
  }

  function odd(__, ix) {
    return ix % 2 == 1;
  }

  return X;
}

exports.fft = fft; //-------------------------------------------------
// Calculate FFT Magnitude for complex numbers.
//-------------------------------------------------

var fftMag = function fftMag(fftBins) {
  var ret = fftBins.map(complexMagnitude);
  return ret.slice(0, ret.length / 2);
};

exports.fftMag = fftMag; //-------------------------------------------------
// Calculate Frequency Bins
// 
// Returns an array of the frequencies (in hertz) of
// each FFT bin provided, assuming the sampleRate is
// samples taken per second.
//-------------------------------------------------

var fftFreq = function fftFreq(fftBins, sampleRate) {
  var stepFreq = sampleRate / fftBins.length;
  var ret = fftBins.slice(0, fftBins.length / 2);
  return ret.map(function (__, ix) {
    return ix * stepFreq;
  });
};

exports.fftFreq = fftFreq; //-------------------------------------------------
// Complex exponent
//-------------------------------------------------

var mapExponent = {},
    exponent = function exponent(k, N) {
  var x = -2 * Math.PI * (k / N);
  mapExponent[N] = mapExponent[N] || {};
  mapExponent[N][k] = mapExponent[N][k] || [Math.cos(x), Math.sin(x)]; // [Real, Imaginary]

  return mapExponent[N][k];
}; //-------------------------------------------------
// Multiply two complex numbers
//
// (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
//-------------------------------------------------


var complexMultiply = function complexMultiply(a, b) {
  return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
}; //-------------------------------------------------
// Add two complex numbers
//-------------------------------------------------


var complexAdd = function complexAdd(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}; //-------------------------------------------------
// Subtract two complex numbers
//-------------------------------------------------


var complexSubtract = function complexSubtract(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}; //-------------------------------------------------
// Calculate |a + bi|
//
// sqrt(a*a + b*b)
//-------------------------------------------------


var complexMagnitude = function complexMagnitude(c) {
  return Math.sqrt(c[0] * c[0] + c[1] * c[1]);
};
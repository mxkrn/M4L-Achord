const assert = require('assert');

const fft = require('../src/fft').fft;

const _fft = require('fft-js').fft;


// setup test signal
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  let sampleLength = 4096;
  let signal = Array.from({length: sampleLength}, (v, k) => getRandomInt(256));

// First check FFT
describe('FFT', function() {
    it('FFT should be the same as the npm module', async function() {
        phasors = fft(signal);
        _phasors = _fft(signal);
        for (let i=0; i < phasors[0].length; i++) {
            assert.ok(phasors[0][i] === _phasors[0][i]);
        }
    });
});
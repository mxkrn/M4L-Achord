const { performance } = require('perf_hooks');
const assert = require('assert');
import { ComplexArray } from 'fft';

const generateEqualTemperedScale = require("../modules/hpcp").generateEqualTemperedScale;
const windowedDFT = require("../modules/hpcp").windowedDFT;
const getParabolaPeak = require("../modules/hpcp").getParabolaPeak;
const parabolaPeakInterpolation = require("../modules/hpcp").parabolaPeakInterpolation;
const peakDetection = require("../modules/hpcp").peakDetection;
const harmonicPCP = require("../modules/hpcp").harmonicPCP;

// UNIT TESTS

// equalTemperedScale
describe('equalTemperedScale', function() {
  it('should generate an array of frequency bins for notes A1 - A7, exclusive.', function() {
    scale = generateEqualTemperedScale();
    assert.ok(scale.length == 6*12);
    // console.log('Frequency range: ', scale[0], ' - ', scale[scale.length-1]);
    assert.ok(scale[scale.length-1] < 3520);
    assert.ok(scale[1] >= 55);
  })
});

// setup test signal
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let sampleLength = 4096;
let sampleRate = 44100;
let signal = Array.from({length: sampleLength}, (v, k) => getRandomInt(256));



// windowedDFT
describe('windowedDFT', function() {
  it('should window the signal and then compute the FFT', async function () {
    spectogram = await windowedDFT(signal, sampleRate);
    assert.ok(spectogram['freqs'].length == signal.length / 2);
    assert.ok(spectogram['y'].length == signal.length / 2);
  });
  it('should take less than 2 ms', async function() {
    t0 = performance.now();
    spectogram = await windowedDFT(signal, sampleRate);
    t1 = performance.now();
    delta = t1 - t0;
    assert.ok(delta < 20);
  });
});

// check again FFT implementation
describe('FFT', function() {
  it('should work', function() {
    // Use the in-place mapper to populate the data.
    const data = new fft.ComplexArray(512).map((value, i, n) => {
      value.real = (i > n/3 && i < 2*n/3) ? 1 : 0;
    });
    console.log(data);
  })
})

// getParabolaPeak
describe('getParabolaPeak', function() {
  it('should find the peak of the parabola formed between 3 points (a,b,c) and one x-value (f)', async function() {
    peak = await getParabolaPeak(0.5, 0.8, 0.5, 400)
    assert.ok(peak['f'] == 400);
    assert.ok(peak['y'] == 0.8); 
  });
});

// parabolaPeakInterpolation
describe('parabolaPeakInterpolation', function() {
  it('should return the parabola peak only if the freq is within 55 - 3520 Hz', async function() {
    spectogram = await windowedDFT(signal, sampleRate);
    peak = await parabolaPeakInterpolation(50, spectogram['y'], 10);
    assert.ok(peak == undefined);
    peak = await parabolaPeakInterpolation(3540, spectogram['y'], 10);
    assert.ok(peak == undefined);
  });
  it('should return the parabola peak only if the magnitude is greater than 0.1', async function() {
    peak = await parabolaPeakInterpolation(500, [0.01, 0.01, 0.01, 0.01], 2);
    assert.ok(peak == undefined);
  })
});

// peakDetection
describe('peakDetection', function() {
  it('should be less than 10 milliseconds', async function() {
    t0 = performance.now();
    peaks = await peakDetection(signal, sampleRate);
    t1 = performance.now();
    delta = t1 - t0;
    assert.ok(delta < 20);
  });
});

// harmonicPCP
describe('harmonicPCP', function() {
  it('should calculate a vector of size 12 containing magnitudes for each note from A-G#', async function() {
    t0 = performance.now();
    hpcp = await harmonicPCP(signal, sampleRate);
    t1 = performance.now();
    delta = t1 - t0;
    assert.ok(hpcp.length == 12);
  })
})

// INTEGRATION TESTS
function sineWaveAt(sampleNumber, tone) {
  var sampleFreq = sampleRate / tone
  return Math.sin(sampleNumber / (sampleFreq / (Math.PI*2)))
}

let sineSignal = [];
let tone = 466;
let volume = 0.3;

for (var i = 0; i < sampleLength; i++) {
  sineSignal[i] = sineWaveAt(i, tone) * volume
}

describe('harmonicPCP integration test', function() {
  it('given a sine wave signal with tone 466, the HPCP should only have values in the A#-bin', async function() {
    hpcp = await harmonicPCP(sineSignal, sampleRate);
    max_idx = -1
    value = 0
    hpcp.forEach((bin, i) => {
      if (bin > value) {
        value = bin;
        max_idx = i;
      };
    });
    assert.ok(max_idx == 1);
  })
})
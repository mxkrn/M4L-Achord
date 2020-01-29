const { performance } = require('perf_hooks');
const assert = require('assert');
const math = require('mathjs')

const sumVertical = require('../modules/main').sumVertical;
const dotProduct = require('../modules/main').dotProduct;
const detectChord = require('../modules/main').detectChord;
const trimBuffer = require('../modules/main').trimBuffer;
const handleData = require('../modules/main').handleData;


testArray = [[2,3,1],[6,1,5]];

// sumVertical
describe('sumVertical', function() {
    it('should get the mean of arrays within an array and return a single array', function() {
        result = testArray.reduce(sumVertical).map(i => {
            return i / testArray.length;
        });
        assert.ok(result[0] === 4);
        assert.ok(result[1] == 2);
        assert.ok(result[2] === 3);
        assert.ok(result.length == 3);
    });
  });

// dotProduct
describe('dotProduct', function() {
    it('should get the dot product of an array and be exactly equal to math.dot', async function() {
        dotProd = await dotProduct(testArray[0], testArray[1]);
        assert.ok(dotProd === math.dot(testArray[0], testArray[1]));
    })
})

let sampleLength = 4096;
let sampleRate = 44100;
let bufferLength = sampleRate*1;
let hopLength = 1024;
let volume = 0.1;

const testBuffer = (testBufferLength) => Array.from({length: testBufferLength}, (v, k) => 
    Array.from({length: 12}, (v, k) => Math.random(1))
    );
let chromaBuffer = testBuffer(Math.floor(bufferLength/hopLength) + 1);

// trimBuffer
describe('trimBuffer', function() {
    it('should trim the chromaBuffer if the length exceeds the bufferLength, first sample in new buffer should equal to second sample', function() {
        firstChromaBefore = chromaBuffer[1];
        trimBuffer(chromaBuffer);
        firstChromaAfter = chromaBuffer[0];
        assert.ok(chromaBuffer.length <= Math.floor(bufferLength / hopLength));
        assert.ok(firstChromaBefore === firstChromaAfter);
    });
})

// setup test signal made up of sine waves with frequencies 
// corresponding to A4, C4, and E4; a.k.a. A:min chord
function sineMatrix(tone) {
    function sineWaveAt(sampleNumber, tone) {
        var sampleFreq = sampleRate / tone
        return Math.sin(sampleNumber / (sampleFreq / (Math.PI*2)))
    }
    let signal = [];
  
    for (var i = 0; i < sampleLength; i++) {
        signal[i] = sineWaveAt(i, tone) * volume
    };
    return math.matrix(signal);
}

let toneA = 440;
let toneC = 523;
let toneE = 659;

let ACMatrix = math.add(sineMatrix(toneA, volume), sineMatrix(toneC, volume));
let ACEMatrix = math.add(ACMatrix, sineMatrix(toneE, volume));
let signal = ACEMatrix['_data'];

let eventTracker = 0;
chromaBuffer = [];

// handleAudio
describe('handleAudio', function() {
    it('should increase the eventTracker when an empty audio event comesin', async function() {
        emptySignal = [];
        [chromaBuffer, eventTracker] = await handleData(emptySignal, chromaBuffer, eventTracker);
        assert.ok(eventTracker === 1);
        assert.ok(chromaBuffer.length === 0);
    });
    it('should extract chroma from incoming audio and append to chroma buffer', async function() {
        eventTracker = 0;
        [chromaBuffer, eventTracker] = await handleData(signal, chromaBuffer, eventTracker);
        assert.ok(eventTracker === 0);
        assert.ok(chromaBuffer.length === 1);
        assert.ok(chromaBuffer[0].length === 12);
    });
    it('should clear the buffer if we received 2 seconds of empty audio chunks', async function() {
        eventTracker = 0;
        await handleData(signal, chromaBuffer, eventTracker);
        assert.ok(chromaBuffer.length === 2);
        for (let i=0; i < Math.floor(sampleRate/hopLength)*2 + 1; i++) {
            [chromaBuffer, eventTracker] = await handleData(emptySignal, chromaBuffer, eventTracker);
            assert.ok(eventTracker == i + 1);
        };
        assert.ok(chromaBuffer.length === 0);
    });
    it ('should be quick', async function() {
        t0 = performance.now();
        await handleData(signal, chromaBuffer, eventTracker);
        t1 = performance.now();
        delta = t1 - t0;
        console.log(`handleAudio takes ${delta} milliseconds`);
    });
})

// detectChord
describe('detectChord', function() {
    it('should be an A:min chord, hurrah it works!', async function() {
        eventTracker = 0;
        chromaBuffer = [];
        [chromaBuffer, eventTracker] = await handleData(signal, chromaBuffer, eventTracker);
        chord = await detectChord(chromaBuffer);
        assert.ok(chord == 'A:min');
    });
    it('should also be quick', async function() {
        t0 = performance.now();
        chord = await detectChord(chromaBuffer);
        t1 = performance.now();
        delta = t1 - t0;
        assert.ok(delta < 10);
        console.log(`detectChord takes ${delta} milliseconds`);
    });
})
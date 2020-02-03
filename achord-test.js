Max = require('max-api');

var handleData = require('./src/main').handleData;
var detectChord = require('./src/main').detectChord;
var trimBuffer = require('./src/main').trimChromaBuffer;

const sampleRate = 22050;
const sampleLength = 4096;
const hopLength = 2048;
const bufferLength = sampleRate * 1;
const eventTracker = 0;
const chromaBuffer = [];
const audioBuffer = new Array;

Max.post('Initialized sample rate to', sampleRate, 'samples');
Max.post('Initialized sample length to', sampleLength, 'samples');
Max.post('Initialized hop length to', hopLength, 'samples');
Max.post('Initialized buffer length to', bufferLength, 'samples');
Max.post('Initialized model type to basic');

function setSampleRate(value) {
  sampleRate = value;
  Max.post('Set sample rate to', sampleRate);
}

function setSampleLength(value) {
  sampleLength = value;
  Max.post('Set sample length to', sampleLength);
}

function setHopLength(value) {
  hopLength = value;
  Max.post('Set hop length to', hopLength);
}


/*
The audio processing step is the most CPU intensive step of the process.
In essence, we are using STFT on slices of a signal buffer. The frames and timing
are handled by Max. This handler simply processes the data found in the buffer
from start_frame to end_frame and appends the resulting chroma to the chromaBuffer list
which is stored and maintained in memory by trimBuffer. 

PCPDict allows Max to access the average PCP profile for visualization purposes.
*/

Max.addHandler('processAudio', function(value) {
	audioBuffer.push(value);	
});

setInterval(function())

function trimChromaBuffer() {
	chromaBuffer = trimBuffer(chromaBuffer);
	post('Trimmed buffer');
}

// function detectChordProfile() {
//   post('Detecting chord');
//   // chord = await detectChord(chromaBuffer);
//   outlet(1, 'X');
//   post('X', 'was detected');
// }
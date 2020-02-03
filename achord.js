outlets = 2;
var handleData = require('./src/main').handleData;
var detectChord = require('./src/main').detectChord;
var trimBuffer = require('./src/main').trimBuffer;

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
bufferArray[3] = new Buffer("audioBuffer3");
// var displayChromagram = new Dict('displayChromagram')


async function process(end_frame) {
	var audioFrame = bufferArray[i % 4].peek(1, end_frame, end_frame);
	i++;
	if (i >= 4) {i = 0;};
    [chromaBuffer, eventTracker] = await handleData(audioFrame, chromaBuffer, eventTracker);
}

function trim() {
	chromaBuffer = trimBuffer(chromaBuffer);
	post('Trimming buffer');
}

async function detect() {
	chord = await detectChord(chromaBuffer);
	outlet(1, chord);
}
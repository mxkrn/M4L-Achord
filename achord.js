import { handleData, trimBuffer, detectChord } from "./modules/main";

var sampleRate = 44100;
var sampleLength = 4096;
var hopLength = 1024;
var bufferLength = sampleRate*1;

var eventTracker = 0;
var chromaBuffer = [];

post('Initialized sample rate to', sampleRate, 'samples');
post('Initialized sample length to', sampleLenth, 'samples');
post('Initialized hop length to', hopLength, 'samples');
post('Initialized buffer length to', bufferLength, 'samples');

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

function setModelType(value) {
    model = template[value];
    post('Now using the', value, 'model type');
}

/*
The audio processing step is the most CPU intensive step of the process.
In essence, we are using STFT on slices of a signal buffer. The frames and timing
are handled by Max. This handler simply processes the data found in the buffer
from start_frame to end_frame and appends the resulting chroma to the chromaBuffer list
which is stored and maintained in memory by trimBuffer. 

PCPDict allows Max to access the average PCP profile for visualization purposes.
*/
buffer = new Buffer('coreSignalBuffer');
var meanChromagram = new Dict('meanChromagram')

async function processBufferFrame(start_frame, end_frame) {
    audioFrame = buffer.peek(start_frame, end_frame);
    [chromaBuffer, eventTracker] = await handleData(audioFrame, chromaBuffer, eventTracker);
}

setInterval(function() {
    chromaBuffer = trimBuffer(chromaBuffer);
}, 200);

/*
Periodic task to detect chord if data is present in buffer
*/
setInterval(async function() {
    chord = await detectChord(chromaBuffer);
    outlet(chord);
}, 100);
const Max = require("max-api");

var processAudio = require('./src/main').processAudio;
var detectChord = require('./src/main').detectChord;
var trimChromaBuffer = require('./src/main').trimChromaBuffer;
var trimAudioBuffer = require('./src/main').trimAudioBuffer;

/* 
---------------------------------------------------------
This is the entrypoint for the Node script containing the application's
core logic.
---------------------------------------------------------
*/
let sampleRate = 22050;
let sampleLength = 4096;
let hopLength = sampleLength/2;
let bufferLength = sampleRate*1; // currently hard-coded to one second
let eventTracker = 0; // we use this to check if we haven't received new data 
let chromaBuffer = new Array; // stores the processed chroma arrays
let audioBuffer = new Array;

// Max handlers and interval functions
// *disable these to run tests*
Max.post(`Initialized sample rate to ${sampleRate} samples.`);
Max.post(`Initialized sample length to ${sampleLength} samples.`);
Max.post(`Initialized hop length to ${hopLength} samples.`);
Max.post(`Initialized buffer length to ${bufferLength} samples.`)

Max.addHandler('setSampleRate', (value) => {
	sampleRate = value;
	Max.post(`Set sample rate to ${sampleRate}`);
})
Max.addHandler('setSampleLength', (value) => {
	sampleLength = value;
	Max.post(`Set sample length to ${sampleLength}`);
})
Max.addHandler('setHopLength', (value) => {
	hopLength = value;
	Max.post(`Set hop length to ${hopLength}`);
})
Max.addHandler('model-type', (value) => {
	model = templates[value];
	console.log('Now using the ', value, ' model type.');
})

Max.addHandler('processAudio', function(value) {
    audioBuffer.push(value);
    // Max.post(audioBuffer.length);
});

// Processes and appends chroma to buffer
setInterval(async function() {
	if (audioBuffer.length >= sampleLength) {
		for (let i=0; i < Math.floor(audioBuffer.length / hopLength) - 1; i++) {
			audio = audioBuffer.slice(i*hopLength, (i*hopLength)+sampleLength);
			// Max.post('Processing audio with length: ', audio.length);
        };
    };
}, 100);

// Periodic task to trim buffer if length is greater than bufferLength
setInterval(function() {
	audioBuffer = trimAudioBuffer(audioBuffer);
	chromaBuffer = trimChromaBuffer(chromaBuffer);
}, 200);

// Periodic task to detect chord if data present in buffer
setInterval(async function() {
	chord = 'X';
	Max.outlet(chord);
}, 200);

let s = 0
setInterval(function() {
    Max.post('Count:', s);
    Max.post('SR:', audioBuffer.length / s);
    s++;
}, 1000)
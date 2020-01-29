const Max = require("max-api");

/* 
---------------------------------------------------------
This is the entrypoint for the Node script containing the application's
core logic.
---------------------------------------------------------
*/
let sampleRate = 44100;
let sampleLength = 4096;
let hopLength = 1024;
let bufferLength = sampleRate*1; // currently hard-coded to one second
let eventTracker = 0; // we use this to check if we haven't received new data 
let chromaBuffer = []; // stores the processed chroma arrays

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

// Processes and appends chroma to buffer
Max.addHandler('audio', async(audio) => {
	[chromaBuffer, eventTracker] = await handleAudio(audio, chromaBuffer, eventTracker);
});

// Periodic task to trim buffer if length is greater than bufferLength
setInterval(function() {
	chromaBuffer = trimBuffer(chromaBuffer);
}, 200);

// Periodic task to detect chord if data present in buffer
setInterval(async function() {
	chord = await detectChord(chromaBuffer);
	Max.outlet(chord);
}, 100);
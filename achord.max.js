const Max = require('max-api');
const fsp = require('fs').promises;
const chokidar = require('chokidar');

const processAudio = require('./src/main').processAudio;
const detectChord = require('./src/main').detectChord;
const trimChromaBuffer = require('./src/main').trimChromaBuffer;
const readAudioAsync = require('./src/main').readAudioAsync;

/* 
---------------------------------------------------------
This is the entrypoint for the Node script containing the application's
core logic.
---------------------------------------------------------
*/
// config
let sampleRate = 44100;
let sampleLength = 4096;
let hopLength = sampleLength/2;
let bufferLength = sampleRate*1; // currently hard-coded to one second
let defaultDirectoryPath = 'tmp';

// Max handlers and interval functions
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
Max.addHandler('modelType', (value) => {
	model = templates[value];
	console.log('Now using the ', value, ' model type.');
})
Max.addHandler('defaultAudioPath', (value) => {
	defaultDirectoryPath = value;
	console.log('Default directory path was set to', defaultDirectoryPath);
})

// audio processing
let eventTracker = 0;
const chromaBuffer = [];
let lastCall = Date.now();
const timeout = 2000; // timeout (in ms) before chromaBuffer is cleared
let emptyBuffer = true;

// This function uses chokidar to watch the default directory where audio is  written to from Max. 
// When a new file is added:
// the file is read, the contents pushed into audioBuffer, and the file is deleted
const watcher = chokidar.watch(defaultDirectoryPath, {
	ignored: /(^|[\/\\])\../, // ignore dotfiles
	persistent: true
  });
watcher
	.on('add', async(fpath) => await onNewFile(fpath))

async function onNewFile(fpath) {
	// Process audio
	audio = await readAudioAsync(fpath);
	[chromaBuffer, eventTracker] = await processAudio(audio.slice(0, sampleLength), chromaBuffer, eventTracker);

	// Reset lastCall, emptyBuffer, and remove tmp file
	lastCall = Date.now();
	emptyBuffer = false;
	await fsp.unlink(fpath);
}

// Periodic task to trim buffer if length is greater than bufferLength
setInterval(function() {
	chromaBuffer = trimChromaBuffer(chromaBuffer);
}, 200);

// Periodic task to detect chord if data present in buffer
// If data was present for longer than timeout length, the buffer is cleared
setInterval(async function() {
	if ((Date.now() - lastCall) > timeout) {
		if (!emptyBuffer) {
			emptyBuffer = true;
			chromaBuffer = new Array;
		}
	} else {
		chord = await detectChord(chromaBuffer);
		
	}
}, 100)
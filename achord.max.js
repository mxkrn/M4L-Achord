const Max = require('max-api');
const fs = require('fs');
const fsp = fs.promises;
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
let defaultDirectoryPath = '';

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
Max.addHandler('setModelType', (value) => {
	model = templates[value];
	Max.post(`Now using the ${value} model type`);
})
Max.addHandler('setDefaultPath', (value) => {
	defaultDirectoryPath = value;
	Max.post(`Set default directory path to ${defaultDirectoryPath}`);
});

// audio processing
// vars
let eventTracker = 0;
let chromaBuffer = [];
let currentBufferLength = 0;
let lastCall = Date.now();
const timeout = 1000; // timeout (in ms) before chromaBuffer is cleared
let emptyBuffer = true;

// This function uses chokidar to watch the default directory where audio is  written to from Max. 
// When a new file is added:
// the file is read, the contents pushed into audioBuffer, and the file is deleted
setTimeout(() => {
	const watcher = chokidar.watch(defaultDirectoryPath, {
		ignored: /(^|[\/\\])\../, // ignore dotfiles
		persistent: true,
		usePolling: true,
		interval: 25,
		awaitWriteFinish: true
	  });
	watcher
		.on('add', async(fpath) => await onNewFile(fpath))
}, 1000)


async function onNewFile(fpath) {
	// Process audio
	audio = await readAudioAsync(fpath);
	[chromaBuffer, eventTracker] = await processAudio(audio.slice(0, sampleLength), chromaBuffer, eventTracker);
	// Reset lastCall, emptyBuffer, and remove tmp file
	await fsp.unlink(fpath);
}

// Periodic task to trim buffer if length is greater than bufferLength
setInterval(function() {
	chromaBuffer = trimChromaBuffer(chromaBuffer);
}, 100);

// Periodic task to detect chord if data present in buffer
// If data was present for longer than timeout length, the buffer is cleared
let chord = 'X';
setInterval(async function() {
	chord = await detectChord(chromaBuffer, chord);
	Max.outlet(chord);
}, 50);
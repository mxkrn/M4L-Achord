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
let sampleRate = 22050;
let sampleLength = 4096;
let hopLength = sampleLength/2;
let bufferLength = sampleRate*1; // currently hard-coded to one second

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
Max.addHandler('modelType', (value) => {
	model = templates[value];
	console.log('Now using the ', value, ' model type.');
})

// audio processing
let defaultDirectoryPath;
let eventTracker = 0;
let chromaBuffer = new Array;

Max.addHandler('defaultAudioPath', (value) => {
	defaultDirectoryPath = value;
	console.log('Default directory path was set to', defaultDirectoryPath);
})

// This function uses chokidar to watch the default directory where audio is
// written to from Max. When a new file is added (as identified by the 'rename' method)
// the file is read, the contents pushed into audioBuffer, and the file is deleted
const watcher = chokidar.watch(defaultDirectoryPath, {
	ignored: /(^|[\/\\])\../, // ignore dotfiles
	persistent: true
  });
watcher
	.on('add', async(fpath) => await onNewFile(fpath))
	.on('unlink', fpath => Max.post('Removed file', fpath))

async function onNewFile(fpath) {
	audio = await readAudioAsync(fpath);
	Max.post('Read audio');
	[chromaBuffer, eventTracker] = await processAudio(audio, chromaBuffer, eventTracker);
	Max.post('Processed audio')
	await fsp.unlink(fpath);
}

// Periodic task to trim buffer if length is greater than bufferLength
setInterval(function() {
	chromaBuffer = trimChromaBuffer(chromaBuffer);
}, 200);

// Periodic task to detect chord if data present in buffer
setInterval(async function() {
	chord = await detectChord(chromaBuffer);
	Max.outlet(chord);
})
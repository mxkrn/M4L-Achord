const Max = require('max-api');
const fs = require('fs');

const processAudio = require('./src/main').processAudio;
const detectChord = require('./src/main').detectChord;
const trimChromaBuffer = require('./src/main').trimChromaBuffer;

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
let defaultDirectoryPath = '';

Max.addHandler('setSampleRate', async(value) => {
	sampleRate = value;
	await Max.post(`Set sample rate to ${sampleRate}`);
})
Max.addHandler('setSampleLength', async(value) => {
	sampleLength = value;
	await Max.post(`Set sample length to ${sampleLength}`);
})
Max.addHandler('setHopLength', async(value) => {
	hopLength = value;
	await Max.post(`Set hop length to ${hopLength}`);
})

const _basic = require('./templates/basic.json');
const _extended = require('./templates/extended.json');
const _full = require('./templates/full.json');

const templates = {
	'majmin': _basic,
	'majmin7': _extended,
	'all': _full
}

let model = templates['majmin']; // defaults to basic model

Max.addHandler('setModelType', async(value) => {
	model = templates[value];
	await Max.post(`Now using the ${value} model type`);
})
Max.addHandler('setDefaultPath', async(path) => {
	if (fs.existsSync(path)) {
		deleteFolderRecursive(path);
	} else {
		fs.mkdirSync(path);
	};
	defaultDirectoryPath = path;
	await Max.post(`Set default directory path to ${defaultDirectoryPath}`);
});

// Audio processing
let eventTracker = 0;
let chromaBuffer = [];

Max.addHandler('processAudio', async(...audio) => {
	[chromaBuffer, eventTracker] = await processAudio(audio, chromaBuffer, eventTracker);
})

// Periodic task to trim buffer if length is greater than bufferLength
setInterval(function() {
	chromaBuffer = trimChromaBuffer(chromaBuffer);
}, 200);

// Periodic task to detect chord if data present in buffer
// If data was present for longer than timeout length, the buffer is cleared
let chord = 'X';
// let chromaDict = {
// 	36: 0, 37: 0, 38: 0, 39: 0, 40: 0, 41: 0,
// 	42: 0, 43: 0, 44: 0, 45: 0, 46: 0, 47: 0
// };

setInterval(async function() {
	[chord, chroma] = await detectChord(chromaBuffer, chord, model);
	if (typeof chroma !== 'undefined') {
		await generateChromaDict(chroma);
	}
	await Max.outlet(chord);
}, 400);

async function generateChromaDict(chroma) {
	let chromaDict = {};
	chroma.forEach((value, index) => {
		let key = index;
		if (index <  3) {
			key += 45;
		} else {
			key += 33;
		}
		chromaDict[key] = value * 100;
	})
	await Max.setDict('chromaDict', chromaDict);
}
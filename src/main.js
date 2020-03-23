// const Max = require('max-api');
// const util = require('util');
// const fsp = require('fs').promises;
// const AudioContext = require('web-audio-api').AudioContext;

const harmonicPCP = require('./hpcp').harmonicPCP;

let sampleRate = 44100;
let hopLength = 1024;
// let bufferLength = sampleRate*1; // currently hard-coded to one second

/*
---------------------------------------------------------
Audio processing
---------------------------------------------------------
handleAudio: async function to extract chroma from incoming audio
trimBuffer: interval function to limit number of frames in chromaBuffer to bufferLength
TODO: Move feature extraction into worker thread using an audioBuffer
*/
const isBelowThreshold = (currentValue) => currentValue < 0.1;

async function processAudio(audio, buffer, event) {
	audioArray = Array.from(audio);
	if (audioArray.length === 0) {
		event += 1
		if (event >= Math.floor(sampleRate/hopLength)*2 & buffer.length > 0) {
			// After 2 seconds of no data, the chromaBuffer times out and resets
			console.log('No audio for 2 seconds so the audio buffer has been cleared.');
			buffer = [];
		}
	} else {
		// On data, process the audio and append to chromaBuffer
		const hpcp = await harmonicPCP(audioArray, sampleRate);
		if (hpcp.every(isBelowThreshold)) {
			event += 1 // invalid data so we increase the eventTracker
		} else {
			buffer.push(hpcp);
			event = 0 // Reset event tracker because we received valid data
		}
	}
	return [buffer, event];
}
exports.processAudio = processAudio;

function trimChromaBuffer(buffer) {
	if (buffer.length > 5) {
		buffer.reverse().splice(5);
		buffer.reverse();
	};
	return buffer;
}
exports.trimChromaBuffer = trimChromaBuffer;

/* 
---------------------------------------------------------
Chord Detection
---------------------------------------------------------
detectChord: interval function to detect chord in chromaBuffer using binary template method
*/
async function detectChord(buffer, chord, model) {
	if (buffer.length > 0) {
		// average all chroma in chromaBuffer
		let chromagram = buffer.reduce(sumVertical).map(i => {
			return i / buffer.length;
		});

		// iterate over model async and update distance if less than previous
		let promises = Object.entries(model).map(async(obj) => {
			const key = obj[0];
			const target = obj[1];

			let distance = await dotProduct(chromagram, target);
			return {'chord': key, 
					'score': distance}
		 });
		let scores = await Promise.all(promises)

		// Get minimum distance and key
		let max_score = 0;
		scores.forEach(obj => {
			if (obj['score'] > max_score) {
				max_score = obj['score'];
				chord = obj['chord'];
			};
		});
	}
	return [chord, model[chord]];
}
exports.detectChord = detectChord;

async function dotProduct(data, target) {
    let promises = data.map(async(bin, i) => {
        return await bin*target[i];
    });
	let scores = await Promise.all(promises);
	return scores.reduce((a, b) => a + b, 0)
}
exports.dotProduct = dotProduct;

const sumVertical = (r, a) => r.map((b, i) => a[i] + b);
exports.sumVertical = sumVertical;
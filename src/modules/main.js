const harmonicPCP = require('./hpcp').harmonicPCP;

let sampleRate = 44100;
let hopLength = 1024;
let bufferLength = sampleRate*1; // currently hard-coded to one second

/*
---------------------------------------------------------
Audio processing
---------------------------------------------------------
handleAudio: async function to extract chroma from incoming audio
trimBuffer: interval function to limit number of frames in chromaBuffer to bufferLength

TODO: Move feature extraction into worker thread using an audioBuffer
*/

async function handleData(audio, buffer, event) {
	if (audio.length === 0) {
		event += 1
		if (event >= Math.floor(sampleRate/hopLength)*2 & buffer.length > 0) {
			// After 2 seconds of no data, the chromaBuffer times out and resets
			console.log('No audio for 2 seconds so the audio buffer has been cleared.');
			buffer = [];
		}
	} else {
		// On data, process the audio and append to chromaBuffer
		const hpcp = await harmonicPCP(audio, sampleRate);
		buffer.push(hpcp);
		event = 0 // Reset event tracker because we received new data
	};
	return [buffer, event];
}
exports.handleData = handleData;

function trimBuffer(buffer) {
	if (buffer.length > Math.floor(bufferLength / hopLength)) {
		buffer.reverse().splice(bufferLength / hopLength);
		buffer.reverse();
	};
	return buffer;
}
exports.trimBuffer = trimBuffer;

// const audioBuffer = [];
// setInterval(featureExtraction, 50);
//
// async function featureExtraction() {
// 	if (audioBuffer.length > bufferLength) {
// 		// Trim audio buffer to buffer length if necessary
// 		audioBuffer.reverse().splice(bufferLength);
// 		audioBuffer.reverse();
// 	}
// 	if (audioBuffer.length > sampleLength) {
// 		for (let i = (audioBuffer.length / hopLength) - 1; i > 0; i--) {
// 			startIndex = i*hopLength - hopLength;
// 			hpcp = await harmonicPCP(audioBuffer[startIndex, sampleLength], sampleRate);
// 			chromagram.push(hpcp);
// 			chromaCount += 1;
// 		}
// 	}
// }
/* 
---------------------------------------------------------
Chord Detection
---------------------------------------------------------
detectChord: interval function to detect chord in chromaBuffer using binary template method
*/
const _basic = require('../templates/basic.json');
const _extended = require('../templates/extended.json');
const _full = require('../templates/full.json');

const templates = {
	'basic': _basic,
	'extended': _extended,
	'full': _full
}

let model = templates['basic']; // defaults to basic model

async function detectChord(buffer) {
	let chord = 'N';
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
	} else {
		console.log('No data found in buffer');
	};
	return chord;
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
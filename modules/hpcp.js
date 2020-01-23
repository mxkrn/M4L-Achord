const fft = require('fft-js').fft;
const fftUtil = require('fft-js').util;

// at the moment we only consider a static tuning frequency: A4=440Hz
const fref = 440;
const fmin = 55; // corresponding to A7
const fmax = 3520; // corresponding to A1

// generate this ahead of time to save compute
const octaves = Array.from({length: 7}, (v, k) => -3 + k);
const temperedScale = generateEqualTemperedScale();
const length = 0.5*(4/3);

// Calculates the HPCP according to Gomez (2006)
async function harmonicPCP(signal, samplerate) {
    chromagram = Array.from({length: 12}, (v, k) => []);
    freqPeaks = await peakDetection(signal, samplerate);
    signalPromises = freqPeaks.map(async(peak) => {
        distancePromises = temperedScale.map(async(f_bin, i) => {
            d = 12*Math.log2(peak['f'] / f_bin);
            if (Math.abs(d) <= length) {
                weight = Math.cos((Math.PI/2)*(d/length));
                chromagram[i%12].push(weight*(peak['y']**2));
            };
        });
        await Promise.all(distancePromises);
        return;
    });
    await Promise.all(signalPromises);
    promises = chromagram.map(async(bin) => {
        return bin.reduce((a, b) => a + b, 0);
    })
    return await Promise.all(promises);
}
exports.harmonicPCP = harmonicPCP;

async function peakDetection(signal, samplerate) {
    spectogram = await windowedDFT(signal, samplerate);
    promises = spectogram['freqs'].map(async(f, i) => {
        if (spectogram['y'][i-1] < spectogram['y'][i] && spectogram['y'][i] > spectogram['y'][i+1]) {
            peak = await parabolaPeakInterpolation(f, spectogram['y'], i);
            return peak;
        };
    });
    data = await Promise.all(promises);
    return data.filter(p => {
        return p !== undefined
    })
}
exports.peakDetection = peakDetection;

async function parabolaPeakInterpolation(freq, y, idx) {
    peak = await getParabolaPeak(y[idx-1], y[idx], y[idx+1], freq);
    if (peak['f'] > fmin & peak['f'] < fmax) {
        if (peak['y'] > 0.1) {
            return peak;
        };
    };
}
exports.parabolaPeakInterpolation = parabolaPeakInterpolation;

async function getParabolaPeak(a, b, c, f) {
    p = ((a - c) / (a - 2*b + c)) / 2;
    f_hat = f + p;
    y = b - ((a - c) * (p / 4));
    return {'f': f_hat, 'y': y}
}
exports.getParabolaPeak = getParabolaPeak;

async function windowedDFT(signal, samplerate) {
    let promises = signal.map(async(y, i) => {
        const value = await y*(0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (signal.length - 1)));
        return value;
    });
    windowed = await Promise.all(promises);
    const phasors = fft(windowed);
	const freqs = fftUtil.fftFreq(phasors, samplerate);
    const magnitudes = fftUtil.fftMag(phasors);
    return {'freqs': freqs, 'y': magnitudes};
}
exports.windowedDFT = windowedDFT;

function generateEqualTemperedScale() {
    ratios = []
    for (let i=0; i<12; i++) {
        ratios.push(2**(i/12));
    }
    scale = []
    for (let i=-3; i<=2; i++) {
        ratios.forEach(r => {
            scale.push(r*(fref*(2**i)));
        });
    };
    return scale;
}
exports.generateEqualTemperedScale = generateEqualTemperedScale;
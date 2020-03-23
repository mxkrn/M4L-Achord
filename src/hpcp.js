const fft = require('./fft').fft;
const fftMag = require('./fft').fftMag;
const fftFreq = require('./fft').fftFreq;

// at the moment we only consider a static tuning frequency: A4=440Hz
const fref = 440;
const fmin = 55; // corresponding to A7
const fmax = 3520; // corresponding to A1

// generate this ahead of time to save compute
const temperedScale = generateEqualTemperedScale();
const length = 0.5*(4/3);

// Calculates the HPCP according to Gomez (2006)
async function harmonicPCP(signal, samplerate) {
    let chromagram = Array.from({length: 12}, (v, k) => []);
    let freqPeaks = peakDetection(signal, samplerate);
    freqPeaks.forEach((peak) => {
        temperedScale.forEach((f_bin, i) => {
            let d = 12*Math.log2(peak['f'] / f_bin);
            if (Math.abs(d) <= length) {
                let weight = Math.cos((Math.PI/2)*(d/length));
                chromagram[i%12].push(weight*(peak['y']**2));
            };
        });
    });
    return chromagram.map((bin) => {
        return bin.reduce((a, b) => a + b, 0);
    });
}
exports.harmonicPCP = harmonicPCP;

function peakDetection(signal, samplerate) {
    let spectogram = windowedDFT(signal, samplerate);
    let data = spectogram['freqs'].map((f, i) => {
        if (spectogram['y'][i-1] < spectogram['y'][i] && spectogram['y'][i] > spectogram['y'][i+1]) {
            let peak = parabolaPeakInterpolation(f, spectogram['y'], i);
            return peak;
        };
    });
    return data.filter(p => {
        return p !== undefined
    })
}
exports.peakDetection = peakDetection;

function parabolaPeakInterpolation(freq, y, idx) {
    let peak = getParabolaPeak(y[idx-1], y[idx], y[idx+1], freq);
    if (peak['f'] > fmin & peak['f'] < fmax) {
        if (peak['y'] > 0.1) {
            return peak;
        };
    };
}
exports.parabolaPeakInterpolation = parabolaPeakInterpolation;

function getParabolaPeak(a, b, c, f) {
    let p = ((a - c) / (a - 2*b + c)) / 2;
    let f_hat = f + p;
    let y = b - ((a - c) * (p / 4));
    return {'f': f_hat, 'y': y}
}
exports.getParabolaPeak = getParabolaPeak;

function windowedDFT(signal, samplerate) {
    let windowed = signal.map((y, i) => {
        const value = y*(0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (signal.length - 1)));
        return value;
    });
    const phasors = fft(windowed);
	const freqs = fftFreq(phasors, samplerate);
    const magnitudes = fftMag(phasors);
    return {'freqs': freqs, 'y': magnitudes};
}
exports.windowedDFT = windowedDFT;

function generateEqualTemperedScale() {
    const ratios = [];
    for (let i=0; i<12; i++) {
        ratios.push(2**(i/12));
    }
    const scale = [];
    for (let i=-3; i<=2; i++) {
        ratios.forEach(r => {
            scale.push(r*(fref*(2**i)));
        });
    };
    return scale;
}
exports.generateEqualTemperedScale = generateEqualTemperedScale;
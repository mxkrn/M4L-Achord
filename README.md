## M4L-Achord

This is a Max for Live application which is able to detect tonal information from a live audio input. Surprisingly, although the research is nearly 20 years old, this sort of application has never been built within the Max for Live environment.

The application uses Node for Max to perform spectral processing on the audio signal and subsequently calculate the average Harmonic Pitch Class Profile (HPCP) using the STFT calculated on frames in the last second. The HPCP is compared to a template as described in the aforementioned paper and by that, the most likely chord is output to the user.

Usage
---
The application is currently in development mode, so the only way to try it out is to clone this directory and open the patch. Make sure to click install before you try to run. For the rest it's rather straightforward, simply play some audio and see your chord! If the app crashes, just click restart and if you want to pause to save CPU your best of disabling the plugin.

Dev
---
To run tests: `npm install && node_modules/.bin/mocha`

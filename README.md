## M4L-Achord

This is a Max for Live application which is able to detect tonal information from a live audio input. Surprisingly, although the research is nearly 20 years old, this sort of application has never been built within the Max for Live environment.

The application uses Node for Max to perform spectral processing on the incoming signal. To be specific, we are performing a Short-Time Fourier Transform (STFT) on overlapping windows of the signal. The resulting spectogram is further processed to extract a Harmonic Pitch Class Profile, which is defined as a vector of relative intensities of each of the 12 pitch classes of the equal-tempered scale within an analysis frame.

Usage
---
The application is currently in development mode, so the only way to try it out is to clone this directory. To load the patch as an Ableton Live plug-in, simply drag-and-drop achord.max.amxd into the Ableton device area. Make sure to click install the first time you are using the patch. 

For the rest, using the device is rather rather straightforward: click record (the red light will indicate that the application is now live), play some audio and your chord will be detected from the incoming signal! If the red light turns off, just click record again; if you want to save CPU you can press stop or deactive the plugin.

Dev
---
To run tests: `npm install && node_modules/.bin/mocha`

outlets = 1

var buf0 = new Buffer("audioBuffer0");
var buf1 = new Buffer("audioBuffer1");
var sampleLength = 4096;

function samples(channel) 
{	
    if (channel === 0) {
        var buf = buf0;
    } else if (channel === 1) {
        var buf = buf1;
    }
    var audio = buf.peek(0, 0, sampleLength);
	outlet(0, audio);
}
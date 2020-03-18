outlets = 1

var buf0 = new Buffer("audioBuffer0");
var buf1 = new Buffer("audioBuffer1");

function samples0() 
{	
	var tmp = buf0.peek(0, 0, 4096);
	outlet(0, tmp);
}

function samples1() 
{	
	var tmp = buf1.peek(0, 0, 4096);
	outlet(0, tmp);
}
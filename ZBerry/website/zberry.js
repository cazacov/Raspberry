/**
 * Created by Victor on 04.02.14.
 */
var pfio = require('piface-node');
pfio.init();

var lastStatus = "None"

function demoDone()
{
    console.log('Demo done')
    lastStatus = "Demo";
}

function demoStep(stepNr, callback) {

    var flags = 0;
    var index = stepNr % 10;
    if (index < 5) {
        flags = 4 << index;
    }
    else {
        flags = 0x80 >>> (index - 5);
    }
    pfio.write_output(flags);
    setTimeout(function() { callback(stepNr + 1); }, 200);
}

function showDemo(stepNr) {
   if (stepNr < 1000)
   {
       demoStep(stepNr, function(nextStep) {
               showDemo(nextStep);
           }
       )
   }
   else {
       return demoDone();
   }
}


exports.demo = function() {
    console.log('I am the demo')
    showDemo(0);
}




exports.status = function()
{
    return lastStatus;
}


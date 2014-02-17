/**
 * Created by Victor on 04.02.14.
 *
 * TORead: http://www.slideshare.net/jayharris/nodejs-module-development
 */
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var pfio = require('piface-node');


function ZBerry()
{
    this.prev_state = false;
    this.debug = true;
    this.stepNr = 0;

    EventEmitter.call(this);

    // Watch for Ctrl+C

    pfio.init();
    console.log("Watching inputs...");

    var that = this;
    setTimeout(function() {
                    watchInputs.call(that);
                }, 1000);
}

util.inherits(ZBerry, EventEmitter);

// public functions

ZBerry.prototype.demo = function() {
    console.log('I am the demo');
    demoStep.call(this);
};

ZBerry.prototype.seesMovement = function() {
    return getSensorState.call(this);
};

ZBerry.prototype.sensorStatus = function() {
    var all = pfio.read_input();
    return all.toString(2);
};

/* private functions */
var stopListening = function() {
    pfio.deinit();
    console.log("ZBerry is stopped");
    process.exit(0);
};

function getSensorState() {
    var left = !pfio.digital_read(0);
    var right = !pfio.digital_read(1);

    return left || right;
};

function watchInputs() {
    var state = getSensorState();
    var that = this;

    if (state !== this.prev_state) {
        setTimeout(function() {
            that.emit('stateChanged', state, that.prev_state);
        }, 0);
        this.prev_state = state;
        console.log(state);
    }
    setTimeout(function() { watchInputs.call(that); }, 100);
};

function demoStep() {
    var that = this;
    var flags = 0;
    var index = this.stepNr % 10;
    if (index < 5) {
        flags = 4 << index;
    }
    else {
        flags = 0x80 >>> (index - 5);
    }
    pfio.write_output(flags);
    this.stepNr++;
    setTimeout(function() {
        demoStep.call(that);
    }, 200);
}

module.exports = new ZBerry();

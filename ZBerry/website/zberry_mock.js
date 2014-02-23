/**
 * Created by Victor on 18.02.14.
 */
/**
 * Created by Victor on 04.02.14.
 *
 * TORead: http://www.slideshare.net/jayharris/nodejs-module-development
 */
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function ZBerry()
{
    this.state = false;

    console.log("Mocking PiFace...");

    EventEmitter.call(this);
    var that = this;
    setTimeout(function() {
        watchInputs.call(that);
    }, 1000);
}

util.inherits(ZBerry, EventEmitter);

// public functions

ZBerry.prototype.demo = function() {
    console.log('I am the mock demo');
};

ZBerry.prototype.seesMovement = function() {
    return getSensorState.call(this);
};

ZBerry.prototype.sensorStatus = function() {
    return 127;
};

/* private functions */

function getSensorState() {
    return this.state;
};

function watchInputs() {
    var that = this;

    console.log(this.state);
    var newState = !getSensorState.call(this);
    this.state = newState;

    setTimeout(function() {
        that.emit('stateChanged', newState, !newState);
        }, 0);

    setTimeout(function() { watchInputs.call(that); }, 1000);
};

module.exports = new ZBerry();
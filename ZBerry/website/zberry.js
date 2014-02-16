/**
 * Created by Victor on 04.02.14.
 */
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var pfio = require('piface-node');

var ZBerry = function() {
    var self = this;
    var prev_state = false;
    var debug = true;
    var stepNr = 0;

    var stopListening = function() {
        pfio.deinit();
        console.log("ZBerry is stopped");
        process.exit(0);
    };

    var getState = function() {
        var left = !pfio.digital_read(0);
        var right = !pfio.digital_read(1);

        return left || right;
    };

    var watchInputs = function() {
        var state;
        state = getState();
        if (state !== prev_state) {

            setTimeout(function() {
                self.emit('zberry state changed', state, prev_state);
            }, 0);
            prev_state = state;
            console.log(state);
        }
        setTimeout(watchInputs, 100);
    };

    var demoStep = function() {
        var flags = 0;
        var index = stepNr % 10;
        if (index < 5) {
            flags = 4 << index;
        }
        else {
            flags = 0x80 >>> (index - 5);
        }
        pfio.write_output(flags);
        stepNr++;
        setTimeout(demoStep, 200);
    }

    EventEmitter.call(this);

    // Watch for Ctrl+C
    process.on('SIGINT', stopListening);

    pfio.init();
    watchInputs();
    console.log("ZBerry is initialized");

    return {
        demo: function() {
                console.log('I am the demo');
                demoStep();
            },

        seesMovement: getState,

        sensorStatus: function() {
            var all = pfio.read_input();
            return all.toString(2);
        }
    };
};
util.inherits(ZBerry, EventEmitter);

module.exports = new ZBerry();

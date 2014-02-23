/**
 * Created by Victor on 16.02.14.
 */

// Based on http://www.smartjava.org/content/html5-server-sent-events-angularjs-nodejs-and-expressjs

var zberry = require('../zberry_mock.js');

var openConnections = [];

zberry.addListener('stateChanged', function(newState, oldState) {
    console.log("Notify stateChanged");
    openConnections.forEach(function(resp) {
        var d = new Date();
        resp.write('id: ' + d.getMilliseconds() + '\n');
        resp.write('data:' + JSON.stringify(newState) +   '\n\n');
    });
});

exports.getStatus = function(req, res){
    // set timeout as high as possible
    req.socket.setTimeout(Infinity);

    // send headers for event-stream connection
    // see spec for more information
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write('\n');

    // push this res object to our global variable
    openConnections.push(res);

    // When the request is closed, e.g. the browser window
    // is closed. We search through the open connections
    // array and remove this connection.
    req.on("close", function() {
        var toRemove;
        for (var j =0 ; j < openConnections.length ; j++) {
            if (openConnections[j] == res) {
                toRemove =j;
                break;
            }
        }
        openConnections.splice(j,1);
        console.log(openConnections.length);
    });
};


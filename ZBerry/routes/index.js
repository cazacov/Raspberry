
/*
 * GET home page.
 */

var zberry = require('../zberry_mock.js');

exports.index = function(req, res){
  var model = {
      title: 'zBerry',
      sensorStatus: zberry.sensorStatus(),
      seesMovement: zberry.seesMovement()
  }
  res.render('index', model );
};
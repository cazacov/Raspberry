
/*
 * GET home page.
 */

var zberry = require('../zberry.js');

exports.index = function(req, res){
  res.render('index', { title: 'Express', status: zberry.status() });
};
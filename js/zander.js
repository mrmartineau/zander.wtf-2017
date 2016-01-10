/**
 * Author: Zander Martineau
 */

var css = require('../scss/kickoff');

var trak           = require('trak.js');
var ready          = require('lite-ready');

var toggleComments = require('./modules/comments.js');

ready(function () {
	trak.start();
	toggleComments();
});

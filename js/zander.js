/**
 * Author: Zander Martineau
 */

var css = require('../scss/kickoff');

var SwiftClick     = require('swiftclick');
var trak           = require('trak.js');
var ready          = require('lite-ready');

var toggleComments = require('./modules/comments.js');

ready(function () {
	trak.start();
	var swiftclick = SwiftClick.attach(document.body);
	toggleComments();
});

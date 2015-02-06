/**
 * Author: Zander Martineau
 */

var SwiftClick     = require('swiftclick');
var trak           = require('trak.js');

var toggleComments = require('./modules/comments.js');
var navigation     = require('./modules/navigation.js');

document.addEventListener('DOMContentLoaded', function() {
	trak.start();
	var swiftclick = SwiftClick.attach(document.body);

	// scrollConverter.activate();

	navigation();
	toggleComments();

});

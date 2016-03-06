var util = {};

var seed = require('./seed.js')();
var Megabiome = require('./types/megabiome.js');
var random = require('seed-random');
var assert = require('assert');

function getRandom(x, y, desc) {
	// This seems to be a bug in Browserify or one of its plugins
	return random()(seed + '.' + x + '.' + y + desc );
}

util.megabiome = function(x, y) {
	// Megabiome side size (max 15)
	var sideSize = Math.floor(getRandom(x, y, 'size') * 1000) % 15;

	// Modulo 10 because there's a 1 in 10 chance of physics not being required
	var physicsRequired = Math.floor(getRandom(x, y, 'physics') * 1000) % 10;
	physicsRequired = physicsRequired === 0 ? false : true;

	// Magic is quite common, so there's only a 1 in 3 chance that it's disallowed
	var magicAllowed = Math.floor(getRandom(x, y, 'magic') * 1000) % 3;
	magicAllowed = magicAllowed === 0 ? false : true;

	var megabiome = new Megabiome(sideSize, {
		physics: physicsRequired,
		magic: magicAllowed
	});

	console.log('Creating new megabiome at (' + x + ', ' + y + '): ' + JSON.stringify(megabiome));
};

module.exports = util;
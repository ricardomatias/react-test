'use strict';

var jsdom = require('jsdom');
var chai = require('chai');

global.expect = chai.expect;

global.React = require('react');

// node fix
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
  };
}

if (!console.debug) {
  console.debug = console.log;
}


// this handles setup of the fake DOM when the tests are
// run in Node
var FAKE_DOM_HTML = [
  '<html>',
  '<body>',
  '</body>',
  '</html>'
].join('\n');

function setupFakeDOM() {
	if (typeof document !== 'undefined') {
		// if the fake DOM has already been set up, or
		// if running in a real browser, do nothing
		return;
	}

	// setup the fake DOM environment.
	//
	// Note that we use the synchronous jsdom.jsdom() API
	// instead of jsdom.env() because the 'document' and 'window'
	// objects must be available when React is require()-d for
	// the first time.
	//
	// If you want to do any async setup in your tests, use
	// the before() and beforeEach() hooks.
  const dom = new jsdom.JSDOM(FAKE_DOM_HTML);
	global.window = dom.window;
  global.document = window.document;
	global.navigator = window.navigator;
}

setupFakeDOM();

"use strict";
/* jshint esversion: 6 */

// invoces DOM environment
var chai = require( "chai" ),
	expect = chai.expect,
	sinon = require( "sinon" ),
	spy = sinon.spy,
	sinonChai = require( "sinon-chai" ),
	jsdom = require( "jsdom-global" ),
	DomElement = require( "../../lib/DomElement" );

chai.should();
chai.use( sinonChai );

beforeEach( function () {
	global.cleanup = jsdom()
} );

afterEach( function () {
	global.cleanup()
} );

describe( "DomElement - getter/setter:", function () {
	beforeEach( function () {
		this.testDiv = document.createElement( "div" );
		this.$domElement = new DomElement( this.testDiv );
	} );
} );

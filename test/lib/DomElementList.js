"use strict";

var expect = require( "chai" )
	.expect,
	domHelper = require( "../../simple-dom-helper" ),
	jsdom = require( "jsdom-global" ),
	domElementListFactory = require( "../../lib/domElementListFactory" );

beforeEach( function () {
	global.cleanup = jsdom()
} );

afterEach( function () {
	global.cleanup()
} );

describe( "DomElementList", function () {
	beforeEach( function () {
		this.testDiv1 = document.createElement( "div" );
		this.testDiv2 = document.createElement( "div" );

		this.testDiv1.className = "existingClass";
		this.testDiv1.setAttribute( "style", "color:red" );

		this.$elementList = domElementListFactory( [ this.testDiv1, this.testDiv2 ] );
	} );

	describe( "'map' should apply a function to each DomElement in a list", function () {
		it( "addClass", function () {
			this.$elementList.map( "addClass", [ "testClass" ] );

			expect( this.testDiv1.className )
				.to.equal( "existingClass testClass" );
			expect( this.testDiv2.className )
				.to.equal( "testClass" );
		} );

		it( "style", function () {
			this.$elementList.map( "setStyle", [ {
				"font-size": "12px"
			} ] );

			expect( this.testDiv1.getAttribute( "style" ) )
				.to.equal( "color:red;font-size:12px" );
			expect( this.testDiv2.getAttribute( "style" ) )
				.to.equal( "font-size:12px" );
		} );

		it( "setAttribute", function () {
			this.$elementList.map( "setAttribute", [ "testAttribute", "testValue" ] );

			expect( this.testDiv1.getAttribute( "testAttribute" ) )
				.to.equal( "testValue" );
			expect( this.testDiv2.getAttribute( "testAttribute" ) )
				.to.equal( "testValue" );
		} );
	} );

	describe( "'getLength' should", function () {
		it( "return the number of elements in the list", function () {
			expect( this.$elementList.getLength() )
				.to.equal( 2 );
		} );
	} );

	describe( "Errors", function () {
		it( "should throw, if a DomElement is passed as part of the list", function () {
			var $domElementList;

			expect( function () {
					$domElementList = domElementListFactory( [ domHelper.create( "div" ) ] );
				} )
				.to.throw();
		} );
	} );
} );

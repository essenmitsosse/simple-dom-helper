"use strict";

var expect = require( "chai" )
	.expect,
	domHelper = require( "../../simple-dom-helper" ),
	jsdom = require( "jsdom-global" ),
	domElementListFactory = require( "../../lib/domElementListFactory" );

beforeEach( function () {
	global.cleanup = jsdom();
} );

afterEach( function () {
	global.cleanup();
} );

describe( "DomElementList from array of HTMLElements", function () {
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
} );

describe( "DomElementList from array of DomElements", function () {
	beforeEach( function () {
		this.$testDiv1 = domHelper.create( "div" );
		this.$testDiv2 = domHelper.create( "div" );

		this.$testDiv1.addClass( "existingClass" );

		this.$elementList = domElementListFactory( [ this.$testDiv1, this.$testDiv2 ] );
	} );

	describe( "'map' should apply a function to each DomElement in a list", function () {
		it( "addClass", function () {
			this.$elementList.map( "addClass", [ "testClass" ] );

			expect( this.$testDiv1.getHtmlElement()
					.className )
				.to.equal( "existingClass testClass" );
			expect( this.$testDiv2.getHtmlElement()
					.className )
				.to.equal( "testClass" );
		} );
	} );
} );

describe( "DomElementList from array of HTMLCollection", function () {
	beforeEach( function () {
		document.body.innerHTML += "<div class=\"existingClass\"></div><div></div>";

		this.$elementList = domElementListFactory( document.body.getElementsByTagName( "div" ) );
	} );

	describe( "'map' should apply a function to each DomElement in a list", function () {
		it( "addClass", function () {
			this.$elementList.map( "addClass", [ "testClass" ] );

			expect( document.body.getElementsByTagName( "div" )[ 0 ]
					.className )
				.to.equal( "existingClass testClass" );
			expect( document.body.getElementsByTagName( "div" )[ 1 ]
					.className )
				.to.equal( "testClass" );
		} );
	} );
} );

describe( "Bulk edit on DomElementList", function () {
	beforeEach( function () {
		document.body.innerHTML += "<div class=\"existingClass\"></div><div></div>";

		this.$elementList = domElementListFactory( document.body.getElementsByTagName( "div" ) );
	} );

	describe( "'map' should apply a function to each DomElement in a list", function () {
		it( "addClass", function () {
			var div1 = document.body.getElementsByTagName( "div" )[ 0 ],
				div2 = document.body.getElementsByTagName( "div" )[ 1 ],
				$div1 = domHelper.createFromElement( div1 ),
				$div2 = domHelper.createFromElement( div2 );

			this.$elementList.map( "bulkEdit", [ {
				"addClass": "testClass",
				"setData": [ "testDataName", "testData" ]
			} ] );

			expect( div1.className )
				.to.equal( "existingClass testClass" );
			expect( div2.className )
				.to.equal( "testClass" );
			expect( $div1.getData( "testDataName" ) )
				.to.equal( "testData" );
			expect( $div2.getData( "testDataName" ) )
				.to.equal( "testData" );
		} );
	} );
} );

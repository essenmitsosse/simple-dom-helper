"use strict";

var expect = require( "chai" )
	.expect,
	domHelper = require( "../simple-dom-helper" ),
	DomElement = require( "../lib/DomElement" ),
	jsdom = require( "jsdom-global" );

beforeEach( function () {
	global.cleanup = jsdom();
} );

afterEach( function () {
	global.cleanup();
} );

describe( "domHelper", function () {

	beforeEach( function () {
		this.body = document.getElementsByTagName( "body" )[ 0 ];

		this.testDiv1 = document.createElement( "div" );
		this.testDiv2 = document.createElement( "div" );

		this.body.appendChild( this.testDiv1 );
		this.body.appendChild( this.testDiv2 );
	} );

	describe( "'createFromElement' should", function () {
		it( "return DomElement with the given input dom element", function () {
			this.$domElement = domHelper.createFromElement( this.testDiv1 );

			expect( this.$domElement )
				.to.equal( new DomElement( this.testDiv1 ) );

			expect( this.testDiv1 )
				.to.equal( this.$domElement.getHtmlElement() );
		} );

		it( "return 'false' if no element was given", function () {
			expect( domHelper.createFromElement( undefined ) )
				.to.equal( false );
		} );
	} );

	describe( "'create' should", function () {
		it( "return a DomElement element", function () {
			expect( domHelper.create( "TAGNAME" ) instanceof DomElement )
				.to.equal( true );
		} );

		it( "return a DOM element with the given tag name", function () {
			expect( domHelper.create( "TESTTAGNAME" )
					.getHtmlElement()
					.tagName )
				.to.equal( "TESTTAGNAME" );
		} );

		it( "return a DOM element with the given attributes", function () {
			var bulkEditData = {
					"setAttributes": {
						"attributeName": "attributeValue"
					}
				},
				$domElement = domHelper.create( "TAGNAME", bulkEditData );

			expect( $domElement.getHtmlElement()
					.getAttribute( "attributeName" ) )
				.to.equal( "attributeValue" );
		} );

		it( "return a DOM element with the given data", function () {
			var bulkEditData = {
					"setDatas": {
						"dataName": 123
					}
				},
				$domElement = domHelper.create( "TAGNAME", bulkEditData );

			expect( $domElement
					.getData( "dataName" ) )
				.to.equal( 123 );
		} );
	} );

	describe( "'getElementById' should", function () {
		it( "get the element with the given id", function () {
			this.testDiv1.setAttribute( "id", "foo" );

			expect( domHelper.getElementById( "foo" )
					.getHtmlElement() )
				.to.equal( this.testDiv1 );
		} );

		it( "return 'false' if no element is found", function () {
			expect( domHelper.getElementById( "nonExistingId" ) )
				.to.equal( false );
		} );
	} );

	describe( "'getElementByClassName' should", function () {
		it( "get the first element with the given class name", function () {
			var testDiv1 = document.createElement( "div" ),
				testDiv2 = document.createElement( "div" );

			testDiv1.className = "classNameToBeLookingFor anotherClassName";
			testDiv2.className = "classNameToBeLookingFor anotherClassName";

			this.body.appendChild( testDiv1 );
			this.body.appendChild( testDiv2 );

			expect( domHelper.getElementByClassName( "classNameToBeLookingFor" )
					.getHtmlElement() )
				.to.equal( testDiv1 );

			expect( domHelper.getElementByClassName( "classNameToBeLookingFor" )
					.getHtmlElement() )
				.to.not.equal( testDiv2 );
		} );

		it( "return 'false' if no element is found", function () {
			expect( domHelper.getElementByClassName( "nonExistingClassName" ) )
				.to.equal( false );
		} );
	} );

	describe( "'getElementByTagName' should", function () {
		it( "get the first element with the given tag name", function () {

			expect( domHelper.getElementByTagName( "div" )
					.getHtmlElement() )
				.to.equal( this.testDiv1 );

			expect( domHelper.getElementByTagName( "div" )
					.getHtmlElement() )
				.to.not.equal( this.testDiv2 );
		} );

		it( "return 'false' if no element is found", function () {
			expect( domHelper.getElementByTagName( "nonExistingTagName" ) )
				.to.equal( false );
		} );
	} );

	describe( "domElement Lists", function () {
		describe( "should return a list of all elements", function () {
			it( "getElementsByClassName", function () {
				var $domElementList;

				this.testDiv1.className = "classNameToBeLookingFor anotherClassName";
				this.testDiv2.className = "classNameToBeLookingFor anotherClassName";

				$domElementList = domHelper.getElementsByClassName( "classNameToBeLookingFor" );

				expect( $domElementList.getList() )
					.to.be.an( "array" );

				expect( $domElementList.getList()[ 0 ].getHtmlElement() )
					.to.equal( this.testDiv1 );

				expect( $domElementList.getList()[ 1 ].getHtmlElement() )
					.to.equal( this.testDiv2 );
			} );

			it( "getElementsByTagName", function () {
				var $domElementList;

				$domElementList = domHelper.getElementsByTagName( "div" );

				expect( $domElementList.getList() )
					.to.be.an( "array" );

				expect( $domElementList.getList()[ 0 ].getHtmlElement() )
					.to.equal( this.testDiv1 );

				expect( $domElementList.getList()[ 1 ].getHtmlElement() )
					.to.equal( this.testDiv2 );
			} );

			it( "createFromElementList", function () {
				var $domElementList = domHelper.createFromElementList( [ this.testDiv1, this.testDiv2 ] );

				expect( $domElementList.getList() )
					.to.be.an( "array" );

				expect( $domElementList.getList()[ 0 ].getHtmlElement() )
					.to.equal( this.testDiv1 );

				expect( $domElementList.getList()[ 1 ].getHtmlElement() )
					.to.equal( this.testDiv2 );
			} );
		} );
	} );
} );

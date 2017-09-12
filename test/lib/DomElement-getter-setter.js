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
	global.cleanup = jsdom();
} );

afterEach( function () {
	global.cleanup();
} );

describe( "DomElement - getter/setter for", function () {
	beforeEach( function () {
		this.testDiv = document.createElement( "div" );
		this.$domElement = new DomElement( this.testDiv );
	} );

	describe( "Styles:", function () {
		describe( "'setStyles' method should", function () {
			it( "add css styles to the element", function () {
				this.$domElement.setStyle( {
					"color": "red"
				} );

				expect( this.testDiv.getAttribute( "style" ) )
					.to.equal( "color:red" );
			} );

			it( "override existing styles on elements", function () {
				this.testDiv.setAttribute( "style", "color:green" );

				this.$domElement.setStyle( {
					"color": "red"
				} );

				expect( this.testDiv.getAttribute( "style" ) )
					.to.equal( "color:red" );
			} );

			it( "remove styles if 'false' is passed as a value", function () {
				this.testDiv.setAttribute( "style", "color:green" );

				this.$domElement.setStyle( {
					"color": false
				} );

				expect( this.testDiv.getAttribute( "style" ) )
					.to.equal( "" );
			} );

			it( "keep styles that are not changed", function () {
				this.testDiv.setAttribute( "style", "color:green;font-size:12px" );

				this.$domElement.setStyle( {
					"font-size": false,
					"text-align": "left"
				} );

				expect( this.testDiv.getAttribute( "style" ) )
					.to.equal( "color:green;text-align:left" );
			} );
		} );
		describe( "'setStylesForce' method should", function () {
			it( "add css styles to the element", function () {
				this.$domElement.setStyleForce( {
					"color": "red"
				} );

				expect( this.testDiv.getAttribute( "style" ) )
					.to.equal( "color:red" );
			} );

			it( "add several css styles to the element", function () {
				this.$domElement.setStyleForce( {
					"color": "red",
					"font-size": "12px"
				} );

				expect( this.testDiv.getAttribute( "style" ) )
					.to.equal( "color:red;font-size:12px" );
			} );

			it( "override existing styles on elements", function () {
				this.testDiv.setAttribute( "style", "color:green" );

				this.$domElement.setStyleForce( {
					"color": "red"
				} );

				expect( this.testDiv.getAttribute( "style" ) )
					.to.equal( "color:red" );
			} );

			it( "dont add styles if 'false' is passed as a value", function () {
				this.$domElement.setStyleForce( {
					"color": "red",
					"font-size": false
				} );

				expect( this.testDiv.getAttribute( "style" ) )
					.to.equal( "color:red" );
			} );

			it( "remove all existing styles if no new values are passed", function () {
				this.testDiv.setAttribute( "style", "color:green" );

				this.$domElement.setStyleForce( {
					"font-size": "12px"
				} );

				expect( this.testDiv.getAttribute( "style" ) )
					.to.equal( "font-size:12px" );
			} );

			it( "allows objects to be passed as a value", function () {
				this.$domElement.setStyleForce( {
					"transform": {
						"scale": 3,
						"translate": [ "10px", "50px" ],
						"rotate": "10deg",
						"skew": [ "10deg", "20deg" ]
					}
				} );

				expect( this.testDiv.getAttribute( "style" ) )
					.to.equal( "transform:scale(3)translate(10px,50px)rotate(10deg)skew(10deg,20deg)" );
			} );
		} );
	} );

	describe( "Attributes:", function () {
		describe( "'getAttribute' method should", function () {
			it( "get the value of the given attribute", function () {
				this.testDiv.setAttribute( "testAttribute", "testValue" );

				expect( this.$domElement.getAttribute( "testAttribute" ) )
					.to.equal( "testValue" );
			} );

			it( "returns 'null' if the attribute doesn’t exist", function () {
				expect( this.$domElement.getAttribute( "nonExistingAttribute" ) )
					.to.equal( null );
			} );

			it( "return an attribute set with 'setAttribute'", function () {
				this.$domElement.setAttribute( "testAttribute", "testValue" );

				expect( this.$domElement.getAttribute( "testAttribute" ) )
					.to.equal( "testValue" );
			} );
		} );
		describe( "'setAttribute' method should", function () {
			it( "change an attribute", function () {
				this.$domElement.setAttribute( "testAttribute", "testValue" );

				expect( this.testDiv.getAttribute( "testAttribute" ) )
					.to.equal( "testValue" );
			} );

			it( "overrides an existing attribute", function () {
				this.testDiv.setAttribute( "testAttribute", "firstValue" );
				this.$domElement.setAttribute( "testAttribute", "latestValue" );

				expect( this.testDiv.getAttribute( "testAttribute" ) )
					.to.equal( "latestValue" );
			} );
			it( "remove the attribute if 'false' is passed as a value", function () {
				this.$domElement.setAttribute( "testAttributeThatWillBeOverwritten", "testAttributeValue" );
				this.$domElement.setAttribute( "testAttributeThatWillBeOverwritten", false );

				expect( this.testDiv.getAttribute( 'testAttributeThatWillBeOverwritten' ) )
					.to.equal( null );
			} );

			it( "shouldn’t change the attribute if 'undefined' or no value is passed", function () {
				this.$domElement.setAttribute( "testAttributeThatWillNotBeOverwritten", "testAttributeValue" );
				this.$domElement.setAttribute( "testAttributeThatWillNotBeOverwritten" );
				this.$domElement.setAttribute( "testAttributeThatWillNotBeOverwritten", undefined );

				expect( this.testDiv.getAttribute( 'testAttributeThatWillNotBeOverwritten' ) )
					.to.equal( "testAttributeValue" );
			} );
		} );
		describe( "'removeAttribute' method should", function () {
			it( "remove an existing attribute", function () {
				this.testDiv.setAttribute( "removedAttribute", "value" );

				this.$domElement.removeAttribute( "removedAttribute" );

				expect( this.testDiv.getAttribute( 'removedAttribute' ) )
					.to.equal( null );
			} );
		} );
		describe( "'setAttributes' method should", function () {
			it( "call 'setAttributes' for each argument", function () {
				this.spy = spy( this.$domElement, "setAttribute" );

				this.$domElement.setAttributes( {
					"testAttribute1": "testValue1",
					"testAttribute2": false
				} );

				expect( this.spy )
					.to.be.calledWith( "testAttribute1", "testValue1" );
				expect( this.spy )
					.to.be.calledWith( "testAttribute2", false );
			} );
		} );
	} );

	describe( "Data:", function () {
		describe( "'getData/setData' method should", function () {
			it( "'setData' should save data that can be returned with 'getData'", function () {
				this.$domElement.setData( "testData", "testDataContent" );

				expect( this.$domElement.getData( "testData" ) )
					.to.equal( "testDataContent" );
			} );
			it( "should also work with objects and arrays", function () {
				var testObject = {
					"foo": "bar"
				};

				this.$domElement.setData( "testData", testObject );

				expect( this.$domElement.getData( "testData" ) )
					.to.equal( testObject );
			} );
			it( "should be able to recover data when new domElement ist created from same dom element", function () {
				this.$domElement.setData( "testData", "testDataContent" );

				var $sameDomElement = new DomElement( this.testDiv );

				expect( $sameDomElement.getData( "testData" ) )
					.to.equal( "testDataContent" );
			} );
			it( "should remove data when undefined", function () {
				this.$domElement.setData( "testData", "testDataContent" );

				var $sameDomElement = new DomElement( this.testDiv );

				expect( $sameDomElement.getData( "testData" ) )
					.to.equal( "testDataContent" );
			} );
			it( "should return 'undefined' if no data is set", function () {
				expect( this.$domElement.getData( "nonExistingData" ) )
					.to.equal( undefined );
			} );
		} );
		describe( "'removeData' method should", function () {
			it( "should remove data", function () {
				this.$domElement.setData( "testDataToBeDeleted", "testDataContent" );

				this.$domElement.removeData( "testDataToBeDeleted" );

				expect( this.$domElement.getData( "testDataToBeDeleted" ) )
					.to.equal( undefined );
			} );
		} );
		describe( "'setDatas' method should", function () {
			it( "call 'setData' for each argument", function () {
				this.spy = spy( this.$domElement, "setData" );

				this.$domElement.setDatas( {
					"testData1": "testValue1",
					"testData2": false
				} );

				expect( this.spy )
					.to.be.calledWith( "testData1", "testValue1" );
				expect( this.spy )
					.to.be.calledWith( "testData2", false );
			} );
		} );
	} );
} );

describe( "getting and setting attributes with:", function () {

	describe( "Saving and Getting", function () {

	} );

} );

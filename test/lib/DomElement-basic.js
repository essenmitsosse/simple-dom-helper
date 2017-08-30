"use strict";
/* jshint esversion: 6 */

// invoces DOM environment
var chai = require( "chai" ),
	expect = chai.expect,
	sinon = require( "sinon" ),
	spy = sinon.spy,
	sinonChai = require( "sinon-chai" ),
	jsdom = require( "jsdom-global" ),
	DomElement = require( "../../lib/DomElement" ),
	DomElementList = require( "../../lib/DomElementList" ),
	domHelper = require( "../../simple-dom-helper" );

chai.should();
chai.use( sinonChai );

function getDomStub( width, height, x, y ) {
	return {
		offsetWidth: width,
		offsetHeight: height,
		getBoundingClientRect: function () {
			return {
				left: x,
				top: y
			}
		}
	};
}

beforeEach( function () {
	global.cleanup = jsdom()
} );

afterEach( function () {
	global.cleanup()
} );

describe( "DomElement - Basics", function () {
	beforeEach( function () {
		this.testDiv = document.createElement( "div" );
		this.$domElement = new DomElement( this.testDiv );
	} );

	it( "getHtmlElement returns the acutal DOM element", function () {
		var domElement = new DomElement( this.testDiv );

		expect( domElement.getHtmlElement() )
			.to.equal( this.testDiv );
	} );

	it( "if domElement is created twice from the same dom element it is the same object", function () {
		var domElement = new DomElement( this.testDiv ),
			anotherDomElement = new DomElement( this.testDiv );

		expect( domElement )
			.to.equal( anotherDomElement );
	} );

	describe( "DomElement size and position", function () {
		/* The following tests are actually bad, because we are checking for implementation. If the implementation is ever changed, these tests must be changed too. Right now this saves us the trouble of doing tests in an actual browser and at least we are making sure we get the values we are expecting. */
		it( "getSizeX returns the width of the DOM element", function () {
			var domElement = new DomElement( this.testDiv ),
				domStub = new DomElement( getDomStub( 100, 200, 300, 400 ) );

			/* JSDOM defaults to 0 for offsetWidth */
			expect( domElement.getSizeX() )
				.to.equal( 0 );

			expect( domStub.getSizeX() )
				.to.equal( 100 ); // check if offsetWidth of DOM element is used
		} );

		it( "getSizeY returns the height of the DOM element", function () {
			var domElement = new DomElement( this.testDiv ),
				domStub = new DomElement( getDomStub( 100, 200, 300, 400 ) );

			expect( domElement.getSizeY() )
				.to.equal( 0 ); // JSDOM defaults to 0 for offsetHeight

			expect( domStub.getSizeY() )
				.to.equal( 200 ); // check if offsetHeight of DOM element is used
		} );

		it( "getPosX returns the X-Pos of the DOM element", function () {
			var domElement = new DomElement( this.testDiv ),
				domStub = new DomElement( getDomStub( 100, 200, 300, 400 ) );

			expect( domElement.getPosX() )
				.to.equal( 0 ); // JSDOM defaults to 0 for offsetWidth

			expect( domStub.getPosX() )
				.to.equal( 300 ); // check if offsetHeight of DOM element is
		} );

		it( "getPosY returns the Y-Pos of the DOM element", function () {
			var domElement = new DomElement( this.testDiv ),
				domStub = new DomElement( getDomStub( 100, 200, 300, 400 ) );

			expect( domElement.getPosY() )
				.to.equal( 0 ); // JSDOM defaults to 0 for offsetWidth

			expect( domStub.getPosY() )
				.to.equal( 400 ); // check if offsetHeight of DOM element is
		} );
	} );

	describe( "Getting Children", function () {

		beforeEach( function () {
			this.childDiv1 = document.createElement( "div" );
			this.childDiv2 = document.createElement( "div" );

			this.testDiv.appendChild( this.childDiv1 );
			this.testDiv.appendChild( this.childDiv2 );
		} );

		describe( "getElementById should", function () {
			it( "not exist", function () {
				expect( this.$domElement.getElementById )
					.to.equal( undefined );
			} );
		} );

		describe( "getElementByClassName should", function () {
			it( "get the first element with the given class name", function () {
				this.childDiv1.className = "classNameToBeLookingFor anotherClassName";
				this.childDiv2.className = "classNameToBeLookingFor anotherClassName";

				expect( this.$domElement.getElementByClassName( "classNameToBeLookingFor" )
						.getHtmlElement() )
					.to.equal( this.childDiv1 );

				expect( this.$domElement.getElementByClassName( "classNameToBeLookingFor" )
						.getHtmlElement() )
					.to.not.equal( this.childDiv2 );
			} );

			it( "return 'false' if no element is found", function () {
				expect( this.$domElement.getElementByClassName( "nonExistingClassName" ) )
					.to.equal( false );
			} );
		} );

		describe( "getElementByTagName should", function () {
			it( "get the first element with the given tag name", function () {

				expect( this.$domElement.getElementByTagName( "div" )
						.getHtmlElement() )
					.to.equal( this.childDiv1 );

				expect( this.$domElement.getElementByTagName( "div" )
						.getHtmlElement() )
					.to.not.equal( this.childDiv2 );
			} );

			it( "return 'false' if no element is found", function () {
				expect( this.$domElement.getElementByTagName( "nonExistingTagName" ) )
					.to.equal( false );
			} );
		} );

		describe( "domElement Lists", function () {
			describe( "should return a list of all elements", function () {
				it( "getElementsByClassName", function () {
					var $domElementList;

					this.childDiv1.className = "classNameToBeLookingFor anotherClassName";
					this.childDiv2.className = "classNameToBeLookingFor anotherClassName";

					$domElementList = this.$domElement.getElementsByClassName( "classNameToBeLookingFor" );

					expect( $domElementList.getList() )
						.to.be.an( 'array' );

					expect( $domElementList.getList()[ 0 ].getHtmlElement() )
						.to.equal( this.childDiv1 );

					expect( $domElementList.getList()[ 1 ].getHtmlElement() )
						.to.equal( this.childDiv2 );
				} );

				it( "getElementsByTagName", function () {
					var $domElementList;

					$domElementList = this.$domElement.getElementsByTagName( "div" );

					expect( $domElementList.getList() )
						.to.be.an( 'array' );

					expect( $domElementList.getList()[ 0 ].getHtmlElement() )
						.to.equal( this.childDiv1 );

					expect( $domElementList.getList()[ 1 ].getHtmlElement() )
						.to.equal( this.childDiv2 );
				} );
			} );
		} );
	} );

	describe( "'remove'", function () {
		it( "removes object from DOM", function () {
			var childDiv1 = document.createElement( "div" ),
				$childDiv1 = domHelper.createFromElement( childDiv1 );

			this.testDiv.appendChild( childDiv1 );

			expect( this.testDiv.childElementCount )
				.to.equal( 1 );

			$childDiv1.remove();

			expect( this.testDiv.childElementCount )
				.to.equal( 0 );
		} );

		it( "does nothing if object has no parent/is not part of the DOM", function () {
			var noParentDiv = document.createElement( "div" ),
				$noParentDiv = domHelper.createFromElement( noParentDiv );

			expect( $noParentDiv.remove() )
				.to.not.throw;
		} );

		it( "if object is added again to the DOM after removal, it is still cached", function () {
			var childDiv1 = document.createElement( "div" ),
				$childDiv1 = domHelper.createFromElement( childDiv1 );

			this.testDiv.appendChild( childDiv1 );
			$childDiv1.remove();
			this.testDiv.appendChild( childDiv1 );

			expect( this.$domElement.getElementByTagName( "div" ) )
				.to.equal( $childDiv1 );

		} );
	} );

	describe( "'append' should", function () {
		it( "append the given element to this element as a child", function () {
			var $newChildDomElement = domHelper.create( "div" );

			this.$domElement.append( $newChildDomElement );

			expect( $newChildDomElement.getHtmlElement()
					.parentElement )
				.to.equal( this.$domElement.getHtmlElement() );
		} );
	} );

	describe( "'appendTo' should", function () {
		it( "append this element to the given element as a child", function () {
			var $newParentDomElement = domHelper.create( "div" );

			this.$domElement.appendTo( $newParentDomElement );

			expect( this.$domElement.getHtmlElement()
					.parentElement )
				.to.equal( $newParentDomElement.getHtmlElement() );
		} );
	} );

	describe( "'appendList' should", function () {
		it( "append all given elements to this element as a children", function () {
			var $newChildDomElement = domHelper.create( "div" ),
				$anotherNewChildDomElement = domHelper.create( "div" );

			this.$domElement.appendList( [ $newChildDomElement, $anotherNewChildDomElement ] );

			expect( $newChildDomElement.getHtmlElement()
					.parentElement )
				.to.equal( this.$domElement.getHtmlElement() );

			expect( $anotherNewChildDomElement.getHtmlElement()
					.parentElement )
				.to.equal( this.$domElement.getHtmlElement() );
		} );
	} );

	describe( "'parent' should", function () {
		it( "return the parent DomElement", function () {
			var $newChildDomElement = domHelper.create( "div" );

			this.$domElement.getHtmlElement()
				.appendChild( $newChildDomElement.getHtmlElement() );

			expect( $newChildDomElement.parent()
					.getHtmlElement() )
				.to.equal( this.$domElement.getHtmlElement() );
		} );

		it( "return the parent DomElement, even after it has been moved", function () {
			var $newChildDomElement = domHelper.create( "div" ),
				$newParentDomElement = domHelper.create( "div" );

			this.$domElement.getHtmlElement()
				.appendChild( $newChildDomElement.getHtmlElement() );

			$newParentDomElement.getHtmlElement()
				.appendChild( $newChildDomElement.getHtmlElement() );

			expect( $newChildDomElement.parent()
					.getHtmlElement() )
				.to.equal( $newParentDomElement.getHtmlElement() );
		} );

		it( "return 'null' if there is no parent", function () {
			var $newDomElementWithoutParent = domHelper.create( "div" );

			expect( $newDomElementWithoutParent.parent() )
				.to.equal( null );
		} );

		it( "return 'document' if the parent is the document itself", function () {
			var $bodyElement = domHelper.createFromElement( document.getElementsByTagName( "html" )[ 0 ] );

			expect( $bodyElement.parent()
					.getHtmlElement() )
				.to.equal( document );
		} );
	} );

	describe( "'children' should", function () {
		it( "return a DomElementList of all children DomElements", function () {
			var $newChildDomElement = domHelper.create( "div" ),
				$anotherNewChildDomElement = domHelper.create( "div" ),
				$list;

			this.$domElement.getHtmlElement()
				.appendChild( $newChildDomElement.getHtmlElement() );
			this.$domElement.getHtmlElement()
				.appendChild( $anotherNewChildDomElement.getHtmlElement() );

			$list = this.$domElement.children();

			expect( $list instanceof DomElementList )
				.to.equal( true );

			expect( $list.getList()[ 0 ] )
				.to.equal( $newChildDomElement );

			expect( $list.getList()[ 1 ] )
				.to.equal( $anotherNewChildDomElement );

		} );

		it( "return a empty DomElementList if there are no children", function () {
			var $list;

			$list = this.$domElement.children();

			expect( $list instanceof DomElementList )
				.to.equal( true );

			expect( $list.getList()
					.length )
				.to.equal( 0 );

		} );
	} );

	it( "should throw, if a DomElement is passed as an argument", function () {
		var $domElement;

		expect( function () {
				$domElement = domHelper.createFromElement( domHelper.create( "div" ) )
			} )
			.to.throw();
	} );

} );

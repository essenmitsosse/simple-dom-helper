'use strict';

// invoces DOM environment
var expect = require( 'chai' )
	.expect,
	DomElement = require( '../lib/DomElement' );

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

before( function () {
	this.jsdom = require( 'jsdom-global' )();
} )

after( function () {
	this.jsdom()
} )

beforeEach( function () {
	this.testDiv = document.createElement( "div" );
	this.testDomEl = new DomElement( this.testDiv );
} )

describe( 'DomElement', function () {
	it( 'getDomElement returns the acutal DOM element', function () {
		var domElement = new DomElement( this.testDiv );

		expect( domElement.getDomElement() )
			.to.equal( this.testDiv );
	} );

	describe( 'DomElement size and position', function () {
		/* The following tests are actually bad, because we are checking for implementation. If the implementation is ever changed, these tests must be changed too. Right now this saves us the trouble of doing tests in an actual browser and at least we are making sure we get the values we are expecting. */
		it( 'getSizeX returns the width of the DOM element', function () {
			var domElement = new DomElement( this.testDiv ),
				domStub = new DomElement( getDomStub( 100, 200, 300, 400 ) );

			/* JSDOM defaults to 0 for offsetWidth */
			expect( domElement.getSizeX() )
				.to.equal( 0 );

			expect( domStub.getSizeX() )
				.to.equal( 100 ); // check if offsetWidth of DOM element is used
		} );

		it( 'getSizeY returns the height of the DOM element', function () {
			var domElement = new DomElement( this.testDiv ),
				domStub = new DomElement( getDomStub( 100, 200, 300, 400 ) );

			expect( domElement.getSizeY() )
				.to.equal( 0 ); // JSDOM defaults to 0 for offsetHeight

			expect( domStub.getSizeY() )
				.to.equal( 200 ); // check if offsetHeight of DOM element is used
		} );

		it( 'getPosX returns the X-Pos of the DOM element', function () {
			var domElement = new DomElement( this.testDiv ),
				domStub = new DomElement( getDomStub( 100, 200, 300, 400 ) );

			expect( domElement.getPosX() )
				.to.equal( 0 ); // JSDOM defaults to 0 for offsetWidth

			expect( domStub.getPosX() )
				.to.equal( 300 ); // check if offsetHeight of DOM element is
		} );

		it( 'getPosY returns the Y-Pos of the DOM element', function () {
			var domElement = new DomElement( this.testDiv ),
				domStub = new DomElement( getDomStub( 100, 200, 300, 400 ) );

			expect( domElement.getPosY() )
				.to.equal( 0 ); // JSDOM defaults to 0 for offsetWidth

			expect( domStub.getPosY() )
				.to.equal( 400 ); // check if offsetHeight of DOM element is
		} );
	} );

	describe( 'DomElement classes', function () {
		it( 'addClass adds classname to the element', function () {
			this.testDomEl.addClass( "testClassName" );

			expect( this.testDiv.className )
				.to.equal( "testClassName" );
		} );

		it( 'addClass adds two classnames to the element', function () {
			this.testDomEl.addClass( "anothertestClassName moreTestClassName" );

			expect( this.testDiv.className )
				.to.equal( "anothertestClassName moreTestClassName" );
		} );

		it( 'a classname that is already there isnt added again', function () {
			this.testDomEl.addClass( "classNameThatIsAddedTwice" );
			this.testDomEl.addClass( "classNameThatIsAddedTwice" );

			expect( this.testDiv.className )
				.to.equal( "classNameThatIsAddedTwice" );
		} );

		it( 'a classname that is already there isnt added again, but a new one is', function () {
			this.testDomEl.addClass( "testClassName" );
			this.testDomEl.addClass( "anotherTestClassName" );

			expect( this.testDiv.className )
				.to.equal( "testClassName anotherTestClassName" );
		} );

		it( 'a classname that is already there isnt added again, but a new one is, even when they are added at the same time', function () {
			this.testDomEl.addClass( "testClassName" );
			this.testDomEl.addClass( "testClassName anotherTestClassName" );

			expect( this.testDiv.className )
				.to.equal( "testClassName anotherTestClassName" );
		} );
	} );
} );

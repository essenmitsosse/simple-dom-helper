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
	describe( "Class Handler:", function () {
		describe( "Method 'hasClass':", function () {
			it( "returns FALSE if className doesn’t exists", function () {
				expect( this.$domElement.hasClass( "nonExistingClassName" ) )
					.to.equal( false );
			} );

			it( "returns TRUE if className does exists", function () {
				this.$domElement.addClass( "existingClassName" );

				expect( this.$domElement.hasClass( "existingClassName" ) )
					.to.equal( true );
			} );

			it( "returns TRUE if className does exists, even when there are several class names", function () {
				this.$domElement.addClass( "aClassName existingClassName anotherClassName" );

				expect( this.$domElement.hasClass( "existingClassName" ) )
					.to.equal( true );
			} );
		} );

		describe( "Method 'addClass':", function () {
			it( "adds class name to the element", function () {
				this.$domElement.addClass( "testClassName" );

				expect( this.testDiv.className )
					.to.equal( "testClassName" );
			} );

			it( "adds two class names to the element", function () {
				this.$domElement.addClass( "anothertestClassName moreTestClassName" );

				expect( this.testDiv.className )
					.to.equal( "anothertestClassName moreTestClassName" );
			} );

			it( "a class name that is already there isnt added again", function () {
				this.$domElement.addClass( "classNameThatIsAddedTwice" );
				this.$domElement.addClass( "classNameThatIsAddedTwice" );

				expect( this.testDiv.className )
					.to.equal( "classNameThatIsAddedTwice" );
			} );

			it( "a class name that is already there isnt added again, but a new one is", function () {
				this.$domElement.addClass( "testClassName" );
				this.$domElement.addClass( "anotherTestClassName" );

				expect( this.testDiv.className )
					.to.equal( "testClassName anotherTestClassName" );
			} );

			it( "a class name that is already there isnt added again, but a new one is, even when they are added at the same time", function () {
				this.$domElement.addClass( "testClassName" );
				this.$domElement.addClass( "testClassName anotherTestClassName" );

				expect( this.testDiv.className )
					.to.equal( "testClassName anotherTestClassName" );
			} );
		} );

		describe( "Method 'removeClass':", function () {
			it( "removes class name from an element", function () {
				this.$domElement.addClass( "testClassNameToBeRemoved" );
				this.$domElement.removeClass( "testClassNameToBeRemoved" );

				expect( this.testDiv.className )
					.to.equal( "" );
			} );

			it( "removes class name from an element but leaves all other class names", function () {
				this.$domElement.addClass( "classNameNotToBeRemoved testClassNameToBeRemoved" );
				this.$domElement.removeClass( "testClassNameToBeRemoved" );

				expect( this.testDiv.className )
					.to.equal( "classNameNotToBeRemoved" );
			} );

			it( "does nothing if the class name doesn’t exists", function () {
				this.$domElement.addClass( "classNameNotToBeRemoved" );
				this.$domElement.removeClass( "nonExistingClassName" );

				expect( this.testDiv.className )
					.to.equal( "classNameNotToBeRemoved" );
			} );

			it( "removes more then one class name at once", function () {
				this.$domElement.addClass( "classNameNotToBeRemoved testClassNameToBeRemoved anotherClassNameToBeRemoved" );
				this.$domElement.removeClass( "testClassNameToBeRemoved anotherClassNameToBeRemoved" );

				expect( this.testDiv.className )
					.to.equal( "classNameNotToBeRemoved" );
			} );
		} );

		describe( "Method 'addClasses':", function () {
			it( "adds class name to the element", function () {
				this.$domElement.addClasses( [ "testClassName" ] );

				expect( this.testDiv.className )
					.to.equal( "testClassName" );
			} );

			it( "adds two class names to the element", function () {
				this.$domElement.addClasses( [ "anothertestClassName", "moreTestClassName" ] );

				expect( this.testDiv.className )
					.to.equal( "anothertestClassName moreTestClassName" );
			} );

			it( "a class name that is already there isnt added again", function () {
				this.$domElement.addClasses( [ "classNameThatIsAddedTwice" ] );
				this.$domElement.addClasses( [ "classNameThatIsAddedTwice" ] );

				expect( this.testDiv.className )
					.to.equal( "classNameThatIsAddedTwice" );
			} );

			it( "a class name that is already there isnt added again, but a new one is", function () {
				this.$domElement.addClasses( [ "testClassName" ] );
				this.$domElement.addClasses( [ "anotherTestClassName" ] );

				expect( this.testDiv.className )
					.to.equal( "testClassName anotherTestClassName" );
			} );

			it( "a class name that is already there isnt added again, but a new one is, even when they are added at the same time", function () {
				this.$domElement.addClasses( [ "testClassName" ] );
				this.$domElement.addClasses( [ "testClassName", "anotherTestClassName" ] );

				expect( this.testDiv.className )
					.to.equal( "testClassName anotherTestClassName" );
			} );
		} );

		describe( "Method 'removeClasses':", function () {
			it( "removes class name from an element", function () {
				this.$domElement.addClass( "testClassNameToBeRemoved" );
				this.$domElement.removeClasses( [ "testClassNameToBeRemoved" ] );

				expect( this.testDiv.className )
					.to.equal( "" );
			} );

			it( "removes class name from an element but leaves all other class names", function () {
				this.$domElement.addClass( "classNameNotToBeRemoved testClassNameToBeRemoved" );
				this.$domElement.removeClasses( [ "testClassNameToBeRemoved" ] );

				expect( this.testDiv.className )
					.to.equal( "classNameNotToBeRemoved" );
			} );

			it( "does nothing if the class name doesn’t exists", function () {
				this.$domElement.addClass( "classNameNotToBeRemoved" );
				this.$domElement.removeClasses( [ "nonExistingClassName" ] );

				expect( this.testDiv.className )
					.to.equal( "classNameNotToBeRemoved" );
			} );

			it( "removes more then one class name at once", function () {
				this.$domElement.addClass( "classNameNotToBeRemoved testClassNameToBeRemoved anotherClassNameToBeRemoved" );
				this.$domElement.removeClasses( [ "testClassNameToBeRemoved", "anotherClassNameToBeRemoved" ] );

				expect( this.testDiv.className )
					.to.equal( "classNameNotToBeRemoved" );
			} );
		} );
	} );

} );

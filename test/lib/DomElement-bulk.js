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
	domHelper = require( "../../simple-dom-helper" );

chai.should();
chai.use( sinonChai );

beforeEach( function () {
	global.cleanup = jsdom();
} );

afterEach( function () {
	global.cleanup();
} );

describe( "DomElement - bulk edit:", function () {
	beforeEach( function () {
		this.testDiv = document.createElement( "div" );
		this.$domElement = new DomElement( this.testDiv );
	} );

	var bulkValueList = [ {
			name: "addClass",
			getArguments: () => "foo",
			calledWithArgs: true
		},
		{
			name: "removeClass",
			getArguments: () => "foo",
			calledWithArgs: true
		},
		{
			name: "addClasses",
			getArguments: () => [ "foo", "bar" ],
			calledWithArgs: true
		},
		{
			name: "removeClasses",
			getArguments: () => [ "foo", "bar" ],
			calledWithArgs: true
		},
		{
			name: "remove",
			getArguments: () => true,
			calledWithArgs: false
		},
		{
			name: "append",
			getArguments: () => {
				return domHelper.create( "div" );
			},
			calledWithArgs: true
		},
		{
			name: "appendList",
			getArguments: () => {
				return [ domHelper.create( "div" ) ];
			},
			calledWithArgs: true
		},
		{
			name: "appendTo",

			getArguments: () => {
				return domHelper.create( "div" );
			},
			calledWithArgs: true
		},
		{
			name: "setStyle",
			getArguments: () => ( {
				color: "red"
			} ),
			calledWithArgs: true
		},
		{
			name: "setStyleForce",
			getArguments: () => ( {
				color: "red"
			} ),
			calledWithArgs: true
		},
		{
			name: "setHTML",
			getArguments: () => "Test HTML content",
			calledWithArgs: true
		},
		{
			name: "setAttribute",
			getArguments: () => [ "attributeName", "attributeValue" ],
			calledWithArgs: true,
			multipleArguments: true
		},
		{
			name: "setAttributes",
			getArguments: () => ( {
				"attributeName": "atributeValue"
			} ),
			calledWithArgs: true
		},
		{
			name: "removeAttribute",
			getArguments: () => "attributeName",
			calledWithArgs: true
		},
		{
			name: "setData",
			getArguments: () => [ "dataName", "dataValue" ],
			calledWithArgs: true,
			multipleArguments: true
		},
		{
			name: "setDatas",
			getArguments: () => ( {
				"dataName": "dataValue"
			} ),
			calledWithArgs: true
		},
	];

	beforeEach( function () {
		this.testArgs = {};
	} );

	it( "should not return a value", function () {
		expect( this.$domElement.bulkEdit( this.testArgs ) )
			.to.equal( undefined );
	} );

	bulkValueList.forEach( function ( args ) {
		describe( "'" + args.name + "':", function () {
			beforeEach( function () {
				this.spyInternalFunction = spy( this.$domElement, args.name );
			} );

			it( "call '" + args.name + "'" + ( args.calledWithArgs ? ( ", with " + ( args.multipleArguments ? "arguments" : "argument" ) ) : " without arguments" ) + "", function () {
				var argumentsToBeCalledWith = args.getArguments();

				this.testArgs[ args.name ] = argumentsToBeCalledWith;
				this.$domElement.bulkEdit( this.testArgs );

				expect( this.spyInternalFunction )
					.to.have.been.calledOnce;

				if ( args.calledWithArgs === true ) {
					if ( args.multipleArguments ) {
						expect( this.spyInternalFunction )
							.to.have.been.calledWithExactly( ...argumentsToBeCalledWith );
					} else {
						expect( this.spyInternalFunction )
							.to.have.been.calledWithExactly( argumentsToBeCalledWith );
					}

				} else if ( args.calledWithArgs === false ) {
					expect( this.spyInternalFunction )
						.to.have.been.calledWithExactly();
				}
			} );

			it( "shouldn’t get called if 'false' is passed as a value", function () {
				this.testArgs[ args.name ] = false;
				this.$domElement.bulkEdit( this.testArgs );

				expect( this.spyInternalFunction )
					.to.not.have.been.called;
			} );

			it( "shouldn’t get called if no value is passed", function () {
				this.$domElement.bulkEdit( this.testArgs );

				expect( this.spyInternalFunction )
					.to.not.have.been.called;
			} );
		} );
	} );

	// describe( "'addClasses': ", function () {
	// 	it( "call 'addClasses' from the dom element with the values passed", function () {
	// 		var spyAddClassArray = spy( this.$domElement, "addClasses" ),
	// 			testClassArrayList = [ "foo", "bar" ];
	//
	// 		this.testArgs.addClasses = testClassArrayList;
	// 		this.$domElement.bulkEdit( this.testArgs );
	//
	// 		expect( spyAddClassArray )
	// 			.to.have.been.calledWith( testClassArrayList );
	// 	} );
	//
	// 	it( "'addClasses' shouldn’t be called if 'undefined' or 'false' is passed", function () {
	// 		var spyAddClassArray = spy( this.$domElement, "addClasses" );
	//
	// 		this.$domElement.bulkEdit( this.testArgs );
	//
	// 		expect( spyAddClassArray )
	// 			.to.not.have.been.called;
	// 	} );
	// } );
	//
	// describe( "'removeClass': ", function () {
	// 	it( "call 'removeClasses' from the dom element with the values passed", function () {
	// 		var spyRemoveClassArray = spy( this.$domElement, "removeClasses" ),
	// 			testClassArrayList = [ "foo", "bar" ];
	//
	// 		this.testArgs.removeClasses = testClassArrayList;
	// 		this.$domElement.bulkEdit( this.testArgs );
	//
	// 		expect( spyRemoveClassArray )
	// 			.to.have.been.calledWith( testClassArrayList );
	// 	} );
	//
	// 	it( "'removeClasses' shouldn’t be called if 'undefined' or 'false' is passed", function () {
	// 		var spyAddClassArray = spy( this.$domElement, "removeClasses" );
	//
	// 		this.$domElement.bulkEdit( this.testArgs );
	//
	// 		expect( spyAddClassArray )
	// 			.to.not.have.been.called;
	// 	} );
	// } );
	//
	// describe( "'remove': ", function () {
	// 	it( "call 'remove' if true is passed as a value", function () {
	// 		var spyRemoveClassArray = spy( this.$domElement, "remove" );
	//
	// 		this.testArgs.remove = true;
	// 		this.$domElement.bulkEdit( this.testArgs );
	//
	// 		expect( spyRemoveClassArray )
	// 			.to.have.been.called;
	// 	} );
	//
	// 	it( "'remove' shouldn’t be called if 'undefined' or 'false' is passed", function () {
	// 		var spyAddClassArray = spy( this.$domElement, "remove" );
	//
	// 		this.$domElement.bulkEdit( this.testArgs );
	//
	// 		expect( spyAddClassArray )
	// 			.to.not.have.been.called;
	// 	} );
	// } );

} );

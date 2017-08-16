'use strict';

var expect = require( 'chai' )
	.expect;
var numFormatter = require( '../index' );

describe( '#numFormatter', function () {
	it( 'should return a single digits', function () {
		var result = numFormatter( 1 );
		expect( result )
			.to.equal( 1 );
	} );

	it( 'should return double digits', function () {
		var result = numFormatter( 12 );
		expect( result )
			.to.equal( 12 );
	} );
} );

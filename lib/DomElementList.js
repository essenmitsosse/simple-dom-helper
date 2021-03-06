"use strict";

var domElementFactory = require( "./domElementFactory" );

function convertToDomElement( element ) {
	return domElementFactory( element );
}

function DomElementList( domElementList ) {
	this.list = [].slice.call( domElementList )
		.map( convertToDomElement );
}

module.exports = DomElementList;

DomElementList.prototype.getList = function () {
	return this.list;
};

DomElementList.prototype.getLength = function () {
	return this.list.length;
};

DomElementList.prototype.map = function ( functionName ) {
	var args = Array.from( arguments );
	args.shift(); // Polyfill for the rest operator

	function mapFunction( domElement ) {
		domElement[ functionName ].apply( domElement, args );
	}

	this.list.map( mapFunction );
};

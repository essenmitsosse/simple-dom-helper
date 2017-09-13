"use strict";

var DomElement;

module.exports = function ( element ) {
	if ( element === undefined || element === null ) {
		return false;
	}

	if ( element instanceof DomElement ) {
		return element;
	}

	return new DomElement( element );
};

DomElement = require( "./DomElement" );

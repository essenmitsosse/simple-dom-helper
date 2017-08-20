"use strict";

var DomElement;

module.exports = function ( element ) {
	if ( element === undefined || element === null ) {
		return false;
	}

	return new DomElement( element );
};

DomElement = require( "./DomElement" );

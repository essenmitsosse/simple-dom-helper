"use strict";

var DomElement;

module.exports = function ( element ) {
	if ( element === undefined || element === null ) {
		return false;
	}

	if ( !( element instanceof HTMLElement ) ) {
		throw "passed argument isn’t an HTMLElement";
	}

	return new DomElement( element );
};

DomElement = require( "./DomElement" );

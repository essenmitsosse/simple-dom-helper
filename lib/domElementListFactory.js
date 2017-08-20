"use strict";

var DomElementList;

module.exports = function ( elementsList ) {
	return new DomElementList( elementsList );
};

DomElementList = require( "./DomElementList" );

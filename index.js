"use strict";

var domElementFactory = require( "./lib/domElementFactory" ),
	domElementListFactory = require( "./lib/domElementListFactory" );

function createFromElement( element ) {
	return domElementFactory( element );
}

function createFromElementList( elementList ) {
	return domElementListFactory( elementList );
}

function getElementById( id ) {
	return domElementFactory( document.getElementById( id ) );
}

function getElementByClassName( className ) {
	return domElementFactory( document.getElementsByClassName( className )[ 0 ] );
}

function getElementByTagName( tagName ) {
	return domElementFactory( document.getElementsByTagName( tagName )[ 0 ] );
}

function getElementsByClassName( className ) {
	return domElementListFactory( document.getElementsByClassName( className ) );
}

function getElementsByTagName( tagName ) {
	return domElementListFactory( document.getElementsByTagName( tagName ) );
}

module.exports = {
	createFromElement: createFromElement,
	createFromElementList: createFromElementList,
	getElementById: getElementById,
	getElementByClassName: getElementByClassName,
	getElementByTagName: getElementByTagName,
	getElementsByClassName: getElementsByClassName,
	getElementsByTagName: getElementsByTagName
};

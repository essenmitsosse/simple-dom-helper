"use strict";

var getStyleStringFromObject = require( "./getStyleStringFromObject" ),
	getStyleObjectFromString = require( "./getStyleObjectFromString" );

function DomElement( element ) {
	if ( element.$domElementSave ) {
		return element.$domElementSave;
	} else {
		this.element = element;
		element.$domElementSave = this;
		this.dataSave = {};
	}
}

module.exports = DomElement;

DomElement.prototype.getDomElement = function () {
	return this.element;
};

DomElement.prototype.getSizeX = function () {
	return this.element.offsetWidth;
};

DomElement.prototype.getSizeY = function () {
	return this.element.offsetHeight;
};

DomElement.prototype.getPosX = function () {
	return this.element.getBoundingClientRect()
		.left;
};

DomElement.prototype.getPosY = function () {
	return this.element.getBoundingClientRect()
		.top;
};

DomElement.prototype.addClassArray = function ( classNamesToBeAddedArray ) {
	var elementClassName = this.element.className,
		elementClassNamesList;

	function checkAgainstOldClassNames( newClassName ) {
		var index = elementClassNamesList.indexOf( newClassName );

		if ( index === -1 ) {
			elementClassNamesList.push( newClassName );
		}
	}

	if ( elementClassName.length === 0 ) {
		elementClassNamesList = classNamesToBeAddedArray;
	} else {
		elementClassNamesList = elementClassName.split( " " );
		classNamesToBeAddedArray.forEach( checkAgainstOldClassNames );
	}

	this.element.className = elementClassNamesList.join( " " );
};

DomElement.prototype.removeClassArray = function ( classNamesToBeRemovedList ) {
	var classNamesList;

	function checkAgainstOldClassNames( classNameToBeRemoved ) {
		var index = classNamesList.indexOf( classNameToBeRemoved );

		if ( index >= 0 ) {
			classNamesList.splice( index, 1 );
		}
	}

	if ( this.element.className.length > 0 ) {
		classNamesList = this.element.className.split( " " );
		classNamesToBeRemovedList.forEach( checkAgainstOldClassNames );
		this.element.className = classNamesList.join( " " );
	}
};

DomElement.prototype.addClass = function ( classNamesToBeAddedString ) {
	if ( this.element.className.length === 0 ) {
		this.element.className = classNamesToBeAddedString;
	} else {
		this.addClassArray( classNamesToBeAddedString.split( " " ) );
	}
};

DomElement.prototype.removeClass = function ( classNamesToBeRemovedString ) {
	if ( this.element.className.length > 0 ) {
		this.removeClassArray( classNamesToBeRemovedString.split( " " ) );
	}
};

DomElement.prototype.hasClass = function ( classNameToBeChecked ) {
	var classNamesList = this.element.className.split( " " );

	function checkIfNameExists( currentClassName ) {
		return currentClassName === classNameToBeChecked;
	}

	return classNamesList.find( checkIfNameExists ) === undefined ? false : true;
};

DomElement.prototype.setAttribute = function ( attributeName, attributeValue ) {
	if ( attributeName === "text" ) {
		this.element.innerHTML = attributeValue;
	} else {
		this.element.setAttribute( attributeName, attributeValue );
	}
};

DomElement.prototype.getAttribute = function ( attributeName ) {
	if ( attributeName === "text" ) {
		return this.element.innerHTML;
	} else {
		return this.element.getAttribute( attributeName );
	}
};

DomElement.prototype.removeAttribute = function ( attributeName ) {
	this.element.removeAttribute( attributeName );
};

DomElement.prototype.attr = function ( attributeName, attributeValue ) {
	if ( arguments.length >= 2 ) {
		if ( attributeValue === false ) {
			this.removeAttribute( attributeName );
		} else {
			this.setAttribute( attributeName, attributeValue );
		}
	} else {
		return this.getAttribute( attributeName );
	}
};

DomElement.prototype.setAttributes = function ( args ) {
	for ( var key in args ) {
		if ( args[ key ] === false ) {
			this.removeAttribute( key );
		} else {
			this.setAttribute( key, args[ key ] );
		}
	}
};

DomElement.prototype.setData = function ( dataName, data ) {
	this.element.setAttribute( "data-" + dataName, data );
};

DomElement.prototype.getData = function ( dataName ) {
	return this.element.getAttribute( "data-" + dataName );
};

DomElement.prototype.removeData = function ( dataName ) {
	return this.element.removeAttribute( "data-" + dataName );
};

DomElement.prototype.html = function ( text ) {
	this.element.innerHTML = text;
};

DomElement.prototype.save = function ( dataName, value ) {
	this.dataSave[ dataName ] = value;
};

DomElement.prototype.get = function ( dataName ) {
	return this.dataSave[ dataName ];
};

DomElement.prototype.style = function ( styleObject ) {
	var currentStyleObject = getStyleObjectFromString( this.attr( "style" ) ),
		key;

	for ( key in styleObject ) {
		currentStyleObject[ key ] = styleObject[ key ];
	}

	this.styleForce( currentStyleObject );
};

DomElement.prototype.styleForce = function ( styleObject ) {
	var styleList = [],
		key;

	function addWithKey( key, styleValue ) {
		if ( typeof styleValue === "object" ) {
			styleValue = getStyleStringFromObject( styleValue );
		}

		styleList.push( key + ":" + styleValue );
	}

	for ( key in styleObject ) {
		if ( styleObject[ key ] !== false ) {
			addWithKey( key, styleObject[ key ] );
		}
	}

	this.attr( "style", styleList.join( ";" ) );
};

// DomElement.protoype.css = DomElement.prototype.style;

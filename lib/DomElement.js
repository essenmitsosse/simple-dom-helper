"use strict";

var getStyleStringFromObject = require( "./DomElement/getStyleStringFromObject" ),
	getStyleObjectFromString = require( "./DomElement/getStyleObjectFromString" ),
	domElementFactory,
	domElementListFactory,
	domElementList = [];

function DomElement( element ) {
	if ( element.$domElementSave !== undefined ) {
		return domElementList[ element.$domElementSave ];
	} else {
		this.element = element;
		this.id = element.$domElementSave = domElementList.length;
		domElementList.push( this );
		this.dataSave = {};
	}
}

module.exports = DomElement;
domElementFactory = require( "./domElementFactory" );
domElementListFactory = require( "./domElementListFactory" );

DomElement.prototype.getHtmlElement = function () {
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

DomElement.prototype.addClasses = function ( classNamesToBeAddedArray ) {
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

DomElement.prototype.removeClasses = function ( classNamesToBeRemovedList ) {
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
		this.addClasses( classNamesToBeAddedString.split( " " ) );
	}
};

DomElement.prototype.removeClass = function ( classNamesToBeRemovedString ) {
	if ( this.element.className.length > 0 ) {
		this.removeClasses( classNamesToBeRemovedString.split( " " ) );
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
	if ( attributeValue === undefined ) {
		return;
	} else if ( attributeValue === false ) {
		this.element.removeAttribute( attributeName );
	} else if ( attributeName === "text" ) {
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

DomElement.prototype.setAttributes = function ( args ) {
	for ( var key in args ) {
		this.setAttribute( key, args[ key ] );
	}
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
	var currentStyleObject = getStyleObjectFromString( this.getAttribute( "style" ) ),
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

	this.element.setAttribute( "style", styleList.join( ";" ) );
};

DomElement.prototype.css = DomElement.prototype.style;

DomElement.prototype.getElementByClassName = function ( className ) {
	return domElementFactory( this.element.getElementsByClassName( className )[ 0 ] );
};

DomElement.prototype.getElementByTagName = function ( tagName ) {
	return domElementFactory( this.element.getElementsByTagName( tagName )[ 0 ] );
};

DomElement.prototype.getElementsByClassName = function ( className ) {
	return domElementListFactory( this.element.getElementsByClassName( className ) );
};

DomElement.prototype.getElementsByTagName = function ( tagName ) {
	return domElementListFactory( this.element.getElementsByTagName( tagName ) );
};

DomElement.prototype.remove = function () {
	var parentNode = this.element.parentNode;

	if ( parentNode ) {
		parentNode.removeChild( this.element );
	}
};

DomElement.prototype.append = function ( $child ) {
	this.element.appendChild( $child.element );
};

DomElement.prototype.appendTo = function ( $parent ) {
	$parent.element.appendChild( this.element );
};

DomElement.prototype.appendList = function ( list ) {
	list.map( this.append.bind( this ) );
};

DomElement.prototype.parent = function () {
	var parentElement = this.element.parentNode;

	if ( parentElement === null ) {
		return null;
	}

	return new DomElement( parentElement )
};

DomElement.prototype.children = function () {
	var children = this.element.childNodes;

	return domElementListFactory( children );
};

DomElement.prototype.bulkEdit = function ( args ) {
	if ( args.addClasses ) {
		this.addClasses( args.addClasses );
	}

	if ( args.removeClasses ) {
		this.removeClasses( args.removeClasses );
	}

	if ( args.remove ) {
		this.remove();
	}
};

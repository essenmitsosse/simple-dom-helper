(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

DomElement.prototype.setAttribute = function ( attributeName, attributeValue ) {
	if ( attributeValue === undefined ) {
		return;
	} else if ( attributeValue === false ) {
		this.element.removeAttribute( attributeName );
	} else {
		this.element.setAttribute( attributeName, attributeValue );
	}
};

DomElement.prototype.getAttribute = function ( attributeName ) {
	return this.element.getAttribute( attributeName );
};

DomElement.prototype.removeAttribute = function ( attributeName ) {
	this.element.removeAttribute( attributeName );
};

DomElement.prototype.setAttributes = function ( args ) {
	for ( var key in args ) {
		this.setAttribute( key, args[ key ] );
	}
};

DomElement.prototype.setHTML = function ( text ) {
	this.element.innerHTML = text;
};

DomElement.prototype.getHTML = function () {
	return this.element.innerHTML;
};

DomElement.prototype.setData = function ( dataName, value ) {
	this.dataSave[ dataName ] = value;
};

DomElement.prototype.getData = function ( dataName ) {
	return this.dataSave[ dataName ];
};

DomElement.prototype.removeData = function ( dataName ) {
	this.dataSave[ dataName ] = undefined;
};

DomElement.prototype.setDatas = function ( args ) {
	for ( var key in args ) {
		this.setData( key, args[ key ] );
	}
};

DomElement.prototype.setStyle = function ( styleObject ) {
	var currentStyleObject = getStyleObjectFromString( this.getAttribute( "style" ) ),
		key;

	for ( key in styleObject ) {
		currentStyleObject[ key ] = styleObject[ key ];
	}

	this.setStyleForce( currentStyleObject );
};

DomElement.prototype.setStyleForce = function ( styleObject ) {
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

DomElement.prototype.getParent = function () {
	var parentElement = this.element.parentNode;

	if ( parentElement === null ) {
		return null;
	}

	return new DomElement( parentElement );
};

DomElement.prototype.getChildren = function () {
	var children = this.element.childNodes;

	return domElementListFactory( children );
};

var bulkFunctionData = {
	"remove": {
		calledWithOutArguments: true
	},
	"setAttribute": {
		multipleArguments: true
	},
	"setData": {
		multipleArguments: true
	},
};

DomElement.prototype._callFunction = function ( name, value, data ) {
	if ( value === false || value === undefined ) {
		return;
	}

	if ( data && data.calledWithOutArguments ) {
		this[ name ]();
	} else {
		if ( data && data.multipleArguments ) {
			this[ name ].apply( this, value );
		} else {
			this[ name ]( value );
		}
	}
};

DomElement.prototype.bulkEdit = function ( argumentsObject ) {
	var key;

	for ( key in argumentsObject ) {
		this._callFunction( key, argumentsObject[ key ], bulkFunctionData[ key ] );
	}
};

},{"./DomElement/getStyleObjectFromString":2,"./DomElement/getStyleStringFromObject":3,"./domElementFactory":5,"./domElementListFactory":6}],2:[function(require,module,exports){
"use strict";

function convertStyleArrayToObject( oldObject, currentValue ) {
	var parts = currentValue.split( ":" );

	oldObject[ parts[ 0 ] ] = parts[ 1 ];

	return oldObject;
}

module.exports = function ( style ) {
	if ( typeof style === "string" && style !== "" ) {
		style = style.replace( /(;|:) /g, "$1" )
			.split( ";" );

		return style.reduce( convertStyleArrayToObject, {} );
	} else {
		return {};
	}
};

},{}],3:[function(require,module,exports){
"use strict";

module.exports = function ( styleObject ) {
	var styleList = [],
		key;

	for ( key in styleObject ) {
		/* even when its an array, it will automatically be concatenated. */
		styleList.push( key + "(" + styleObject[ key ] + ")" );
	}
	return styleList.join( "" );
};

},{}],4:[function(require,module,exports){
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

},{"./domElementFactory":5}],5:[function(require,module,exports){
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

},{"./DomElement":1}],6:[function(require,module,exports){
"use strict";

var DomElementList;

module.exports = function ( elementsList ) {
	return new DomElementList( elementsList );
};

DomElementList = require( "./DomElementList" );

},{"./DomElementList":4}],7:[function(require,module,exports){
"use strict";

var domElementFactory = require( "./lib/domElementFactory" ),
	domElementListFactory = require( "./lib/domElementListFactory" );

function create( tagName, args ) {
	var $element = domElementFactory( document.createElement( tagName ) );

	if ( args ) {
		$element.bulkEdit( args );
	}

	return $element;
}

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
	create: create,
	createFromElement: createFromElement,
	createFromElementList: createFromElementList,
	getElementById: getElementById,
	getElementByClassName: getElementByClassName,
	getElementByTagName: getElementByTagName,
	getElementsByClassName: getElementsByClassName,
	getElementsByTagName: getElementsByTagName,
	_elements: {
		DomElement: require( "./lib/DomElement" ),
		DomElementList: require( "./lib/DomElementList" )
	}
};

},{"./lib/DomElement":1,"./lib/DomElementList":4,"./lib/domElementFactory":5,"./lib/domElementListFactory":6}]},{},[7]);

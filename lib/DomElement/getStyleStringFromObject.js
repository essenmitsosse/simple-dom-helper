"use strict";

module.exports = function ( styleObject ) {
	var styleList = [],
		key;

	for ( key in styleObject ) {
		if ( styleObject[ key ] !== false ) {
			if ( styleObject.constructor === "Array" ) {
				styleList.push( key + "(" + styleObject[ key ].join( "," ) + ")" );
			} else {
				styleList.push( key + "(" + styleObject[ key ] + ")" );
			}
		}
	}

	return styleList.join( "" );
}

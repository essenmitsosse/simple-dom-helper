"use strict";

module.exports = function ( styleObject ) {
	var styleList = [],
		key;

	for ( key in styleObject ) {
		if ( styleObject[ key ] !== false ) {
			/* even when its an array, it will automatically be concatenated. */
			styleList.push( key + "(" + styleObject[ key ] + ")" );
		}
	}

	return styleList.join( "" );
};

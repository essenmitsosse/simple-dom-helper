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

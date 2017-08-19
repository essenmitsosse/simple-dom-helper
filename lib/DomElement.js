function DomElement( element ) {
	this.element = element;
};

module.exports = DomElement;

DomElement.prototype.getDomElement = function () {
	return this.element;
}

DomElement.prototype.getSizeX = function () {
	return this.element.offsetWidth;
}

DomElement.prototype.getSizeY = function () {
	return this.element.offsetHeight;
}

DomElement.prototype.getPosX = function () {
	return this.element.getBoundingClientRect()
		.left;
};

DomElement.prototype.getPosY = function () {
	return this.element.getBoundingClientRect()
		.top;
};

DomElement.prototype.addClass = function ( newClassNamesString ) {
	var elementClassName = this.element.className,
		classNamesList,
		newClassNamesList;

	function checkAgainstOldClassNames( newClassName ) {
		var index = classNamesList.indexOf( newClassName );

		if ( index === -1 ) {
			classNamesList.push( newClassName );
		}
	}

	if ( elementClassName.length === 0 ) {
		this.element.className = newClassNamesString;
	} else {
		classNamesList = this.element.className.split( " " );
		newClassNamesList = newClassNamesString.split( " " );

		newClassNamesList.forEach( checkAgainstOldClassNames );

		this.element.className = classNamesList.join( " " );
	}
};

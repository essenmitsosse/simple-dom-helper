# Simple Dom Helper

[![Build Status](https://travis-ci.org/essenmitsosse/simple-dom-helper.svg?branch=master)](https://travis-ci.org/essenmitsosse/simple-dom-helper) [![Coverage Status](https://coveralls.io/repos/github/essenmitsosse/simple-dom-helper/badge.svg?branch=master)](https://coveralls.io/github/essenmitsosse/simple-dom-helper?branch=master) [![Dependency Status](https://david-dm.org/essenmitsosse/simple-dom-bulk-edit.svg)](https://david-dm.org/essenmitsosse/simple-dom-bulk-edit)

Offers a dependency-free javascript library to interact with DOM elements. Basically a really lightweight version of DOM-interaction part of jQuery (but with a slightly different, more consistent syntax).

The module is very small and has no dependencies and is intendet to be bundled with the rest of your Javascript.

It is only available as commonJS-module as of now. For frontend use, you probably want to use a build tool like [Browserify](http://browserify.org/) or [WebPack](https://github.com/webpack/webpack).

## Size

Format             | Size
:----------------- | ---:
Normal             |  12k
Uglified           |   8k
Uglified & gzipped |   4k

## Installation

`npm install simple-dom-helper -D`

## Usage

Simple Dom Helper uses two object-types to handle Dom Manipulation. `DomElement` for individual elements and `DomElementList` for lists of Elements.

```javascript
var $ = require( "simple-dom-helper" );

var $div = $.create( "div", { "addClass": [ "foo", "bar" ] } );
// returns a DomElement-object, I like to start variable names for DomElement-objects with $ as a naming convention.

var $existingDiv = $.getElementByClassName( "classOfExistingElement" );
// returns ONE DomElement for the first matching element found in the dom. For a DomElementList use 'getElementsByClassName'

$existingDiv.append( $div );
// Appends the created $div to $existingDiv.

var $findDivAgain = $existingDiv.getElementByClassName( "foo" );

// assuming there as no other element inside $existingDiv with the class 'foo':
$findDivAgain === $div // TRUE
// The DomElement associated with an element in the dom is cached and it will always return the same object.
```

### DomHelper

The only public object of this module. It has the following methods:

#### Methods

##### `create`

Creates a `DomElement` with the given tag name and initializes it using the passed object.

- **Arguments:** `String` (Tag Name), `Object` (Initialization object, see `DomElement.bulkEdit`)
- **Returns:** `DomElement`

##### `createFromElement`

Creates a `DomElement` from a `HTMLElement`.

- **Arguments:** `HTMLElement`
- **Returns:** `DomElement`

##### `getElementById`

Returns the first `DomElement` in the document that matches the id.

- **Arguments:** `String` (name of the Id)
- **Returns:** `DomElement`

##### `getElementByClassName`

Returns the first `DomElement` in the document that matches the class.

- **Arguments:** `String` (name of the class)
- **Returns:** `DomElement`

##### `getElementByTagName`

Returns the first `DomElement` in the document that matches the tag.

- **Arguments:** `String` (name of the tag)
- **Returns:** `DomElement`

##### `createFromElementList`

Create a `DomElementList` from an array.

- **Arguments:** `Array`(of `DomElement` / `HTMLElement`) / `HTMLCollection`
- **Returns:** `DomElementList`

##### `getElementsByClassName`

Returns a `DomElementList` with elements in the document, that match the class.

- **Arguments:** `String` (name of the class)
- **Returns:** `DomElementList`

##### `getElementsByTagName`

Returns a `DomElementList` with all elements in the document, that match the tag.

- **Arguments:** `String` (name of the tag)
- **Returns:** `DomElementList`

### DomElement

The `DomElement` is an object that relates to one HTMLElement, and only one. For each HTMLElement there can only be one `DomElement`. If it accessed again (for example by `domHelper.getElementById`) it will always return the same `DomElement`.

#### Methods

##### `getHtmlElement`

- **Arguments:** -
- **Returns:** `HTMLElement` (associated with this `DomElement`)

##### `getSizeX`

- **Arguments:** -
- **Returns:** `Number` (width in pixel)

##### `getSizeY`

- **Arguments:** -
- **Returns:** `Number` (height in pixel)

##### `getPosX`

- **Arguments:** -
- **Returns:** `Number` (X-position relative to the document)

##### `getPosY`

- **Arguments:** -
- **Returns:** `Number` (Y-position relative to the document)

##### `addClass`

- **Arguments:** `String` (new class name(s))
- **Returns:**: -

##### `removeClass`

- **Arguments:**
- **Returns:**

##### `hasClass`

- **Arguments:**
- **Returns:**

##### `addClasses`

- **Arguments:**
- **Returns:**

##### `removeClasses`

- **Arguments:**
- **Returns:**

##### `setAttribute`

- **Arguments:**
- **Returns:**

##### `getAttribute`

- **Arguments:**
- **Returns:**

##### `removeAttribute`

- **Arguments:**
- **Returns:**

##### `setAttributes`

- **Arguments:**
- **Returns:**

##### `setHTML`

- **Arguments:**
- **Returns:**

##### `getHTML`

- **Arguments:**
- **Returns:**

##### `setData`

- **Arguments:**
- **Returns:**

##### `getData`

- **Arguments:**
- **Returns:**

##### `removeData`

- **Arguments:**
- **Returns:**

##### `setDatas`

- **Arguments:**
- **Returns:**

##### `setStyle`

- **Arguments:**
- **Returns:**

##### `setStyleForce`

- **Arguments:**
- **Returns:**

##### `getElementByClassName`

- **Arguments:**
- **Returns:**

##### `getElementByTagName`

- **Arguments:**
- **Returns:**

##### `getElementsByClassName`

- **Arguments:**
- **Returns:**

##### `getElementsByTagName`

- **Arguments:**
- **Returns:**

##### `remove`

- **Arguments:**
- **Returns:**

##### `append`

- **Arguments:**
- **Returns:**

##### `appendTo`

- **Arguments:**
- **Returns:**

##### `appendList`

- **Arguments:**
- **Returns:**

##### `parent`

- **Arguments:**
- **Returns:**

##### `children`

- **Arguments:**
- **Returns:**

##### `bulkEdit`

- **Arguments:**
- **Returns:**

## Creating your own extensions

If you want to write your own extensions, you can create a commonJS module, that requires `lib/DomElement` and then add to the prototype of the object. Currently there is no documentation for this, so you will have to look at the code yourself. But it's possible.

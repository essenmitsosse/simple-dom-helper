# Simple Dom Helper

[![Build Status](https://travis-ci.org/essenmitsosse/simple-dom-helper.svg?branch=master)](https://travis-ci.org/essenmitsosse/simple-dom-helper) [![Coverage Status](https://coveralls.io/repos/github/essenmitsosse/simple-dom-helper/badge.svg?branch=master)](https://coveralls.io/github/essenmitsosse/simple-dom-helper?branch=master) [![Dependency Status](https://david-dm.org/essenmitsosse/simple-dom-bulk-edit.svg)](https://david-dm.org/essenmitsosse/simple-dom-bulk-edit)

Offers a dependency-free vanilla javascript library to interact with DOM elements. Basically a really lightweight version of DOM-interaction part of jQuery (but with a slightly different, more consistent syntax).

The module is intendet to be bundled with the rest of your Javascript.

It is only available as commonJS-module as of now. For frontend use, you probably want to use a build tool like [Browserify](http://browserify.org/) or [WebPack](https://github.com/webpack/webpack).

There are basically no checks for wrong types or values. It is assumed that you make sure to pass the correct values and the correct types. The advantage of this is, that it is really fast.

## Performance

Simple Dom Helper is up to 8 times faster then jQuery and only 60% slower then native code -- while still offering a lot of useful functions for DOM manipulation.

[jsPerf]()

Format                    |  Size
:------------------------ | ----:
normal                    | 12 KB
uglified                  |  8 KB
uglified & gzipped        |  4 KB
jQuery minified & gzipped | 28 KB

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

### domHelper

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

- **Arguments:** `String` (new class names, seperated by spaces)
- **Returns:** -

##### `removeClass`

- **Arguments:** `String` (class names to be removed, seperated by spaces)
- **Returns:** -

##### `hasClass`

- **Arguments:** `String` (single class name)
- **Returns:** `boolean`(whether `HTMLElement` has class or not)

##### `addClasses`

- **Arguments:** `Array` (of `String`s with new class names)
- **Returns:** -

##### `removeClasses`

- **Arguments:** `Array` (of `String`s with class names to be removed)
- **Returns:** -

##### `setAttribute`

- **Arguments:** `String` (name of attribute), `String` (value of attribute)
- **Returns:** -

##### `getAttribute`

- **Arguments:** `String` (name of attribute)
- **Returns:** `String` (value of the attribute, `null` if attribute doesn't exist)

##### `removeAttribute`

- **Arguments:** `String` (name of attribute)
- **Returns:** -

##### `setAttributes`

- **Arguments:** `Object` (keys are the name of the attribute, the values for each key are the value for each attribute)
- **Returns:** -

##### `setHTML`

- **Arguments:** `String` (HTML code that should replace the current content of the `HTMLElement`)
- **Returns:** -

##### `getHTML`

- **Arguments:** -
- **Returns:** `String` (current HTML code of the element)

##### `setData`

allows to store arbitrary information with an `DomElement`. The only way to access this information is through `getData` on the `DomElement` it was set on. Since the same `HTMLElement` always returns the same `DomElement`, the data can always be retrieved. This is useful for example to handle `onClick` events.

- **Arguments:** `String`(name under which data should be stored), any data value
- **Returns:** -

##### `getData`

- **Arguments:** `String` (name of data)
- **Returns:** value of data, returns `undefined` if no data is stored

##### `removeData`

- **Arguments:** `String` (name of data that will be deleted)
- **Returns:** -

##### `setDatas`

- **Arguments:** `Object` (keys are the name of the data, the values for each key are the value for each data)
- **Returns:** -

##### `setStyle`

- **Arguments:** `Object` (keys are the names of the style (like `font-size`), the values for each key, are the value for that style (like `12px`))
- **Returns:** -

##### `setStyleForce`

- **Arguments:** `Object` (works like `setStyle`, but removes any existing styles, that are not in the object)
- **Returns:** -

##### `getElementByClassName`/`getElementByTagName`/`getElementsByClassName`/`getElementsByTagName`

Works like the methods of the same name of `domHelper`, but only searches the children of the associated `HTMLElement`

##### `remove`

Removes the `HTMLElement` from its parent, if one exists.

- **Arguments:** -
- **Returns:** -

##### `append`

- **Arguments:** `DomElement` (appends the `HTMLElement`of the passed `DomElement`to the `HTMLElement` associated with the `DomElement` from which the method is invoked)
- **Returns:** -

##### `appendTo`

- **Arguments:** `DomElement` (appends the `HTMLElement` associated with the `DomElement` from which the method is invoked to the `HTMLElement` of the passed `DomElement`)
- **Returns:** -

##### `appendList`

- **Arguments:** `Array` (of `DomElement`s, works like `appendTo` for each element in the list)
- **Returns:** -

##### `getParent`

- **Arguments:** -
- **Returns:** `DomElement` (returns the `DomElement` associated with the parent element of the `HTMLElement` for this `DomElement`, returns `null` if there is no parent)

##### `getChildren`

- **Arguments:** -
- **Returns:** `DomElementList` (of all `HTMLElement` children of this element, returns empty `DomElementList` if no children are found)

##### `bulkEdit`

Allows to call multiple methods of `DomElement` at once. This will only work for methods with no return value. For example it works for `setData`, but not for `getData`.

- **Arguments:** `Object` (keys are method names of `DomElement`, the values for each key are the arguments that are passed. If a method expects more then one argument, the arguments must be in an `Array`.)
- **Returns:** -

### DomElementList

An object, that contains a list of `DomElements`.

#### Methods

##### `getList`

- **Arguments:** -
- **Returns:** `Array` (a list of all `DomElement`s in this)

##### `getLength`

- **Arguments:** -
- **Returns:** `Number` (number of `DomElement`s in this)

##### `map`

Calls the method of the name passed, on each `DomElement` in this. Like `DomElement.bulkEdit` This only works for methods without a return value. But it works on `bulkEdit` itself, allowing to invoke a number of methods on all `DomElement`s in this at once.

- **Arguments:** `String` (name of a `DomElement`method), followed by the arguments that would usually be passed to that method.
- **Returns:** -

## Creating your own extensions

If you want to write your own extensions, you can create a commonJS module, that requires `lib/DomElement` or `lib/DomElementList`and then add to the prototype of the object.

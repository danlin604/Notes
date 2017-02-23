/* -------------------------------------------------- */
	Mocha Basics
/* -------------------------------------------------- */

test code in the browser

	npm install mocha chai --save-dev

test Node.js code

	npm install -g mocha

This installs the packages mocha and chai. Mocha is the library that allows us to run tests, and Chai contains some helpful functions that we’ll use to verify our test results.



Test file

	var chai = require('chai');

	Run test using the mocha command 


Folder Structure

	test/test.js
	test/testrunner.html



/* -------------------------------------------------- */
	Setup a test Runner
/* -------------------------------------------------- */

/*
<!DOCTYPE html>
<html>
  <head>
    <title>Mocha Tests</title>
    <link rel="stylesheet" href="node_modules/mocha/mocha.css">
  </head>
  <body>
    <div id="mocha"></div>
    <script src="node_modules/mocha/mocha.js"></script>
    <script src="node_modules/chai/chai.js"></script>
    <script>mocha.setup('bdd')</script>

    <!-- load code you want to test here -->

    <!-- load your test files here -->

    <script>
      mocha.run();
    </script>
  </body>
</html>
*/

Important bits

	We load Mocha’s CSS styles to give our test results nice formatting.

	We create a div with the ID mocha. This is where the test results are inserted.

	We load Mocha and Chai. They are located in subfolders of the node_modules folder since we installed them via npm.

	By calling mocha.setup, we make Mocha’s testing helpers available.

	Then, we load the code we want to test and the test files. We don’t have anything here just yet.

	Last, we call mocha.run to run the tests. Make sure you call this after loading the source and test files.



/* -------------------------------------------------- */
	Testing Basic - Browser
/* -------------------------------------------------- */

Naming

	className.js --> classNameTest.js



/* js/className.js */

	function addClass(el, newClass) {
	  if(el.className.indexOf(newClass) === -1) {
	    el.className += newClass;
	  }
	}

/* test/classNameTest.js */

	var assert = chai.assert;

	describe('addClass', function() {
	    
	  it('should add class to element', function() {
	    var element = { className: '' };

	    addClass(element, 'test-class');

	    assert.equal(element.className, 'test-class');
	  });

	  it('should not add a class which already exists');
	});


/* testrunner.html

    <!-- load code you want to test here -->
    <script src="js/className.js"></script>

    <!-- load your test files here -->
    <script src="test/classNameTest.js"></script>
*/


/* -------------------------------------------------- */


/* expanded example */

/* addClass.js */

	function addClass(el, newClass) {

	  el.classname = el.classname || ''; 

	  if(el.className.indexOf(newClass) !== -1) {
	    return;
	  }

	  if(el.className) { // is empty string
	    //ensure class names are separated by a space
	    newClass = ' ' + newClass;
	  }

	  el.className += newClass;
	}

/* classNameTest.js */

	var assert = chai.assert;

	describe('addClass', function() {
	    
	  it('should add class to element', function() {
	    var element = { className: '' };

	    addClass(element, 'test-class');

	    assert.equal(element.className, 'test-class');
	  });

	  it('should not add a class which already exists', function() {
	    var element = { className: 'exists' };

	    addClass(element, 'exists');

	    var numClasses = element.className.split(' ').length;
	    assert.equal(numClasses, 1);
	  });

	  it('should append new class after existing one', function() {
	    var element = { className: 'exists' };

	    addClass(element, 'new-class');

	    var classes = element.className.split(' ');
	    assert.equal(classes[1], 'new-class');
	  });  

	});


/* -------------------------------------------------- */
	Testing Basic - Node
/* -------------------------------------------------- */

// className.js

	module.exports = {
	  addClass: function(el, newClass) {
	    if(el.className.indexOf(newClass) !== -1) {
	      return;
	    }

	    if(el.className !== '') {
	      //ensure class names are separated by a space
	      newClass = ' ' + newClass;
	    }

	    el.className += newClass;
	  }
	}


// classNameTest.js

	var chai = require('chai');
	var assert = chai.assert;

	var className = require('../js/className.js');
	var addClass = className.addClass;

	// The rest of the file remains the same

	describe('addClass', function() {
	  ...
	});

// Terminal

	test/test.js 
	test/classNameTest.js

	mocha . // test all
	mocha classNameTest.js 

/* -------------------------------------------------- */
	
/* -------------------------------------------------- */



/* -------------------------------------------------- */
	
/* -------------------------------------------------- */



/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
    Hosting JQuery
/* -------------------------------------------------- */


/*
<script src='js/jquery.min.js'></script>

<script src='//code.jquery.com/jquery-1.11.1.min.js'></script>

<script src='//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>
*/

CND jQuery prefered!

/* -------------------------------------------------- */
    $
/* -------------------------------------------------- */

$ is a pointer to a javascript object jQuery

$ -> jQuery collection (like an array but with additional methods)


/* -------------------------------------------------- */
    jQuery selector
/* -------------------------------------------------- */

$('tag')

	$('div');

// select all the li elements
var listElements;
listElements = $('li');
console.log(listElements);


Selecting by tag is not helpful...

$('.class') 

	// eg. $('.green') selects all elements of class green


$('#id')

	specific to single elements



var articleList, h1, kids, parents;
articleList = $('.article-list');
h1 = articleList.sibling('h1');
kids = articleList.find('*');
parents = articleList.parents('div');
console.log(h1, kids, parents);


/* -------------------------------------------------- */
    DOM traversal
/* -------------------------------------------------- */

$('#id')
		.parent()	// get parent, 1 level in tree
		.parents()	// get specific parent .parents('#JerryJudy'), many levels
		.children()	// created a jQuery collection of all immediate children, 1 level down
		.find()		// get many children .find('BabySammy'), many levels
		.siblings()	// get all siblings from the same parent

/* -------------------------------------------------- */
    .toggleClass()
/* -------------------------------------------------- */

// Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the state argument.

$( '#id' ).toggleClass( className, addOrRemove );

$( '#id' ).toggleClass( 'highlight' );

// if no arguments are passed to .toggleClass(), all class names on the element the first time .toggleClass() is called will be toggled. Also as of jQuery 1.4, the class name to be toggled can be determined by passing in a function.



/* -------------------------------------------------- */
    .next()
/* -------------------------------------------------- */

// Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.

// Example: remove the class featured from Article #2 and add it to Article #3!

var article2, article3;

article2 = $('.featured');
article2.toggleClass('featured'); // toggle off

article3 = article2.next();
article3.toggleClass('featured'); // toggle on


/* -------------------------------------------------- */
    .attr()
/* -------------------------------------------------- */

// Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.

.attr( attributeName )

	// Get the value of an attribute for the first element in the set of matched elements.

.attr( attributeName, value )

	// Set one or more attributes for the set of matched elements.

	$( "#greatphoto" ).attr( "alt", "Beijing Brush Seller" );


// Example: add href to <a> inside a <li> tag.

var navList;
navList = $('.nav-list');

var first;
first = navList.children().first().find('a');
first.attr('href', '#1');


/* -------------------------------------------------- */
    .first()
/* -------------------------------------------------- */

// Reduce the set of matched elements to the first in the set.

<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li>list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>

$( "li" ).first().css( "background-color", "red" );



/* -------------------------------------------------- */
    .css()
/* -------------------------------------------------- */

// Get the value of a computed style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.

.css( properties )

	// Get the computed style properties for the first element in the set of matched elements.

.css( propertyName, value )

	// Set one or more CSS properties for the set of matched elements.


// Example: change the font-size of all the article-items to 20px!
var articleItems;
articleItems = $('.article-item');
articleItems.css('font-size', '20px');

/* -------------------------------------------------- */
	.html()
/* -------------------------------------------------- */

// Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.

.html()

	// Get the HTML contents of the first element in the set of matched elements.

	// This method does not accept any arguments.

.html( htmlString )

	// Set the HTML contents of each element in the set of matched elements.

	$( "div" ).html( "<p>Hello World!</p>" );


/* -------------------------------------------------- */
	.text()
/* -------------------------------------------------- */

// Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.

.text()

	// Get the combined text contents of each element in the set of matched elements, including their descendants.

	// This method does not accept any arguments.

.text( text )

	// Set the content of each element in the set of matched elements to the specified text.

	$( "div.demo-container" ).text( "<p>This is a test.</p>" );

/*
<div class="demo-container">
	&lt;p&gt;This is a test.&lt;/p&gt;
</div>
*/


// Example: use jQuery's val method to make live changes to the 'Cool Articles' <h1>!
$('#input').on('change', function() {
    var val;
    val = $('#input').val();
    
    var h1;
    h1 = $('#input').next();	// .children('h1') is better
    
    h1.text(val);
});




/* -------------------------------------------------- */
	.remove()
/* -------------------------------------------------- */

// Remove the set of matched elements from the DOM.

.remove()

	$( ".hello" ).remove();




// Example: remove the <ul> from the first article item!
var articleItems;
articleItems = $('.article-item'); 

var ul;
ul = articleItems.first().find('ul');
ul.remove();




/* -------------------------------------------------- */
	Appending Child Elements
/* -------------------------------------------------- */

.append()

.prepend()

.insertBefore()	// add sibling

.insertAfter()	// add sibling



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

/* -------------------------------------------------- */
	
/* -------------------------------------------------- */
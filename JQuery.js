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

	// Insert content, specified by the parameter, to the end of each element in the set of matched elements.

	$( ".inner" ).append( "<p>Test</p>" );

.prepend()

.insertBefore()	// add sibling

.insertAfter()	// add sibling

/*
	#family2' should be a sibling of and come after '#family1'. 
	'#bruce' should be the only immediate child of '#family2'. 
	'#bruce' should have two <div>s as children, '#madison' and '#hunter'.
*/
$('<div id="family2"><h1>Family2</h1></div>').insertAfter('#family1');

var family2;
family2 = $('#family2');
family2.append('<div id="bruce"><h2>Bruce</h2></div>');

var bruce;
bruce = $('#bruce');
bruce.append('<div id="madison"><h3>Madison</h3></div>');
bruce.append('<div id="hunter"><h3>Hunter</h3></div>');

// Alternative 

var family1, family2, bruce, madison, hunter;

family1 = $('family1');
family2 = $('<div id="bruce"><h2>Bruce</h2></div>') // create DOM element
...
family2.insertAfter(family1);





/* -------------------------------------------------- */
	.each()
/* -------------------------------------------------- */

// Iterate over a jQuery object, executing a function for each matched element.

$('.example').each(function() {
	$(this).text(); // return text of each element
})

/* Example: 
use jQuery's each() method to iterate through the <p>s,
calculate the length of each one, and add each length to the end of each <p>.
*/

$('p').each(function() {
	var text;
	text = $(this).text();

	var length;
	length = text.length;

	text += length;
	$(this).text(text);
})

// Alternative

function numberAdder() {
	var text, number;

	text = $(this).text();

	number = text.length;

	$(this).text(text + " " + number);
}

$('p').each(numberAdder);




/* -------------------------------------------------- */
	jQuery object to run on document.ready
/* -------------------------------------------------- */

// You could include your script at the bottom of the <body>, but that would mean that the download could potentially start later in the load process, slowing down the initial page render.

function someFunction() {
    // Do interesting things
}
$(someFunction)

// or

$(function(){
    // Do interesting things
})

// Now, you can include your script in the <head> and it won't run until the DOM has been built and the elements that you want to manipulate are on the page.



/* -------------------------------------------------- */
	monitorEvents( elementToWatch ); Google Chrome
/* -------------------------------------------------- */

// This function can only be used on the Chrome console. It will not work inside a JavaScript file.

mouseout
mouseover
mousemove




/* -------------------------------------------------- */
	jQuery Event Listener
/* -------------------------------------------------- */

1. the target element to listen to
2. the event we want to react to
3. the action to take in response

$( '#my-input' ).on( 'keypress', function() {
	// do something
});



// Remove button and show success message
$('#my-button').on('click', function() {
    $(this).remove();				// remove button
    $('body').addClass('success');    
});

// show event
$( 'article' ).on( 'click', function( evt ) {
    console.log( evt );
});

// event target
$( 'article' ).on( 'click', function( evt ) {
    $( evt.target ).css( 'background', 'red' );
});

	// The target property holds the page element that is the target of the event.

// prevent default action
$( '#myAnchor' ).on( 'click', function( evt ) {
    evt.preventDefault();
    console.log( 'You clicked a link!' );
});


Convenience Methods

	target.keyup(...)
	target.mouseover(...)
	target.change(...)
	target.click(...)
	target.mouseenter(...)
	target.mouseleave(...)


Event Delegation

	// We'll listen to events that hit a parent element, and pay attention to the target of those events.

	$( '.container' ).on( 'click', 'article', function() { … });

		// This code tells jQuery to watch the .container element for clicks, and then if there are any, check if the click event's target is an article element.




/* Example
<ul id="rooms">
    <li>Room 1</li>
    <li>Room 2</li>
            .
            .
            .
    <li>Room 999</li>
    <li>Room 1000</li>
</ul>
*/

/* bad */
$( '#rooms li' ).on( 'click', function() {
    ...
});

	// The above code would set up an event listener for each 1,000 event listeners - one for each list item...that's 1,000 event listeners!

/* better */
$( '#rooms' ).on( 'click', 'li', function() {
    ...
});


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */

/* -------------------------------------------------- */
	
/* -------------------------------------------------- */
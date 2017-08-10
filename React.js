/* -------------------------------------------------- */
	Basics
/* -------------------------------------------------- */

JSX

	Allows us to write HTML like syntax which gets transformed to lightweight JavaScript objects.

Virtual DOM

	A JavaScript representation of the actual DOM.

React.createClass

	The way in which you create a new component.

render (method)

	What we would like our HTML Template to look like.

ReactDOM.render

	Renders a React component to a DOM node.

state

	The internal data store (object) of a component.

getInitialState
	
	The way in which you set the initial state of a component.

setState

	A helper method for altering the state of a component.

props

	The data which is passed to the child component from the parent component.

propTypes

	Allows you to control the presence, or types of certain props passed to the child component.

getDefaultProps

	Allows you to set default props for your component.



Component LifeCycle

	componentWillMount

		Fired before the component will mount

	componentDidMount

		Fired after the component mounted

	componentWillReceiveProps

		Fired whenever there is a change to props

	componentWillUnmount

		Fired before the component will unmount


Events

	onClick
	onSubmit
	onChange

/* -------------------------------------------------- */
	Quickstart
/* -------------------------------------------------- */

Creating a Single Page Application

	Create React App is the best way to start building a new React single page application. It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production.

Console

	npm install -g create-react-app

	create-react-app hello-world

	cd hello-world

	npm start


Create React App doesnt handle backend logic or databases; it just creates a frontend build pipeline, so you can use it with any backend you want. It uses webpack, Babel and ESLint under the hood, but configures them for you.

/* -------------------------------------------------- */
	GitHub Pages
/* -------------------------------------------------- */

create-react-app 

	Comes with detailed documentation to help users publish their work using all sorts of tools.

Steps

	Edit - package.json

		"homepage": "https://<github-username>.github.io/<project-repo>"
		"https://danlin604.github.io/react/"

	Run - npm run build

		reate-react-app CLI github tooltip displayed

	Install - npm install --save-dev gh-pages

		gh-pages is a special branch that GitHub Pages uses to publish projects.

	Edit - package.json - "scripts"

		"deploy" : "npm run build&&gh-pages -d build"

	Run - npm run deploy

	Verify - GitHub - project repo

		Settings --> GitHub Pages --> Source --> gh-pages branch

		Published @ "https://danlin604.github.io/react/"




/* -------------------------------------------------- */
	CSS
/* -------------------------------------------------- */

Old School

	.main .sidebar .button

	Complicated on larger applications



CSS Methodologies

	once you adopt one, you are pretty much stuck with that and its going to be difficult to migrate.

	OOCSS (Object Oriented CSS)

	SMACSS (Scalable and Modular Approach for CSS)

	BEM (Block Element Modifier)

		BEM originates from Yandex. The goal of BEM is to allow reusable components and code sharing.

	React Inline

		CSS is powerful, but it can become an unmaintainable mess without some discipline. Where do we draw the line between CSS and JavaScript?

		styling at the component level

		/* Instead of

			render(props, context) {
			  const notes = this.props.notes;

			  return <ul className='notes'>{notes.map(this.renderNote)}</ul>;
			}
		*/

		/* Use

			render(props, context) {
			  const notes = this.props.notes;
			  const style = {
			    margin: '0.5em',
			    paddingLeft: 0,
			    listStyle: 'none'
			  };

			  return <ul style={style}>{notes.map(this.renderNote)}</ul>;
			}
		*/

		It is going to be difficult to perform large, sweeping changes to our codebase as we need to tweak a lot of components to achieve that.










/* -------------------------------------------------- */
	Code Academy React Course
/* -------------------------------------------------- */

React is fast. Apps made in React can handle complex updates and still feel quick and responsive.

React is modular. Instead of writing large, dense files of code, you can write many smaller, reusable files. React's modularity can be a beautiful solution to JavaScript's maintainability problems.

React is scalable. Large programs that display a lot of changing data are where React performs best.

React is flexible. You can use React for interesting projects that have nothing to do with making a web app. People are still figuring out React's potential. There's room to explore.

React is popular. While this reason has admittedly little to do with React's quality, the truth is that understanding React will make you more employable.



/* -------------------------------------------------- */
	JSX
/* -------------------------------------------------- */

// Example

	const h1 = <h1>Hello world</h1>;



JSX is a syntax extension for JavaScript. It was written to be used with React. JSX code looks a lot like HTML.

What does "syntax extension" mean?

In this case, it means that JSX is not valid JavaScript. Web browsers can't read it!

If a JavaScript file contains JSX code, then that file will have to be compiled. That means that before the file reaches a web browser, a JSX compiler will translate any JSX into regular JavaScript.



// JSX Element

	A basic unit of JSX is called a JSX element.

	 // Example JSX Element
	
		<h1>Hello world</h1>



	JSX elements are treated as JavaScript expressions. They can go anywhere that JavaScript expressions can go.

	That means that a JSX element can be saved in a variable, passed to a function, stored in an object or array...you name it.

	// JSX Element saved as variable

		const navBar = <nav>I am a nav bar</nav>;

		const myTeam = {
		  center: <li>Benzo Walli</li>,
		  powerForward: <li>Rasha Loa</li>,
		  smallForward: <li>Tayshaun Dasmoto</li>,
		  shootingGuard: <li>Colmar Cumberbatch</li>,
		  pointGuard: <li>Femi Billon</li>
		};

	

// Attributes in JSX

	JSX elements can have attributes, just like HTML elements can.

	const title = <h1 id="title">Introduction to React.js: Part I</h1>;

	const panda = <img src="images/panda.jpg" alt="panda" width="500px" height="500px" />;



// Nested JSX

	You can nest JSX elements inside of other JSX elements, just like in HTML.

		<a href="https://www.example.com"><h1>Click me!</h1></a>

	// Multiline JSX

		(
		<a href="https://www.example.com">
			<h1>
			Click me!
			</h1>
		</a>
		)

	// Save nested JSX expression

		const theExample = (
		<a href="https://www.example.com">
			<h1>
			Click me!
			</h1>
		</a>
		);	


// JSX Outer Elements

	JSX expression must have exactly one outermost element.
	
	// Working

		const paragraphs = (
		<div id="i-am-the-outermost-element">
			<p>I am a paragraph.</p>
			<p>I, too, am a paragraph.</p>
		</div>
		);

	// Broken

		const paragraphs = (
		<p>I am a paragraph.</p> 
		<p>I, too, am a paragraph.</p>
		);


// Rendering JSX in app.js

	import React from 'react';
	import ReactDOM from 'react-dom';

	ReactDOM.render(<h1>Hello world</h1>, document.getElementById('app'));


// ReactDOM

	ReactDOM is the name of a JavaScript library. This library contains several React-specific methods, all of which deal with the DOM in some way or another.

	// Example

		import React from 'react';
		import ReactDOM from 'react-dom';
		
		ReactDOM.render(
			<h1>Render me!</h1>,
			document.getElementById('app')
		);

		/* index.html
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<link rel="stylesheet" href="/styles.css">
			<title>Learn ReactJS</title>
		</head>
		<body>
			<main id="app"></main>
		</body>
		</html>
		*/


// Passing a variable to ReactDOM.render()

	const toDoList = (
		<ol>
			<li>Learn React</li>
			<li>Become a Developer</li>
		</ol>
	);

	ReactDOM.render(
		toDoList, 
		document.getElementById('app')
	);


// Virtual DOM

	One special thing about ReactDOM.render() is that it only updates DOM elements that have changed.

	This is significant! Only updating the necessary DOM elements is a large part of what makes React so successful.

	React accomplishes this thanks to something called the virtual DOM.

	In React, for every DOM object, there is a corresponding "virtual DOM object." A virtual DOM object is a representation of a DOM object, like a lightweight copy.

	A virtual DOM object has the same properties as a real DOM object, but it lacks the real thing's power to directly change what's on the screen.

	Manipulating the DOM is slow. Manipulating the virtual DOM is much faster, because nothing gets drawn onscreen. Think of manipulating the virtual DOM as editing a blueprint, as opposed to moving rooms in an actual house.

	

// class vs className

	// HTML
	<h1 class="big">Hey</h1>

	// JSX
	<h1 className="big">Hey</h1>

		// When JSX is rendered, JSX className attributes are automatically rendered as class attributes.



// Self-closing tags

	/*
	Fine in HTML with a slash:

	<br />

	Also fine, without the slash:

	<br>

	Fine in JSX:

	<br />

	NOT FINE AT ALL in JSX:

	<br>
	*/


// JavaScript in JSX

	ReactDOM.render(
		<h1>2 + 3</h1>, // 2 + 3
		document.getElementById('app')
	);
	// Any code in between the tags of a JSX element will be read as JSX, not as regular JavaScript! JSX doesn't add numbers - it reads them as text, just like HTML.


	// You need curley braces!

	import React from 'react';
	import ReactDOM from 'react-dom';

	ReactDOM.render(
		<h1>{2 + 3}</h1>,
		document.getElementById('app')
	);

	// More example
	const math = <h1>2 + 3 = {2 + 3}</h1>;
	ReactDOM.render(
		math,
		document.getElementById('app')
	);


// Variables in JSX

	const theBestString = 'tralalalala i am da best';

	ReactDOM.render(<h1>{ theBestString }</h1>, document.getElementById('app'));



// Variable Attributes in JSX

	const sideLength = "200px";

	const panda = (
	<img 
		src="images/panda.jpg" 
		alt="panda" 
		height={sideLength} 
		width={sideLength} />
	);

	// More examples
	const pics = {
	panda: "http://bit.ly/1Tqltv5",
	owl: "http://bit.ly/1XGtkM3",
	owlCat: "http://bit.ly/1Upbczi"
	}; 

	const panda = (
	<img 
		src={pics.panda} 
		alt="Lazy Panda" />
	);

	const owl = (
	<img 
		src={pics.owl} 
		alt="Unimpressed Owl" />
	);

	const owlCat = (
	<img 
		src={pics.owlCat} 
		alt="Ghastly Abomination" />
	);


// Event Listeners in JSX

	function myFunc() {
		alert('Hello');
	}

	<img onClick={myFunc} />

		// Note that in HTML, event listener names are written in all lowercase, such as onclick or onmouseover. In JSX, event listener names are written in camelCase, such as onClick or onMouseOver



// JSX Conditionals: If Statements That Don't Work

	// This code will break
	(
		<h1>
		{
			if (purchase.complete) {
				'Thank you for placing an order!'
			}
		}
		</h1>
	)



// JSX Conditionals: If Statements That Do Work

	import React from 'react';
	import ReactDOM from 'react-dom';

	let message;

	if (user.age >= drinkingAge) {
		message = (
			<h1>
			Hey, check out this alcoholic beverage!
			</h1>
		);
	} else {
		message = (
			<h1>
			Hey, check out these earrings I got at Claire's!
			</h1>
		);
	}

	ReactDOM.render(
	message, 
	document.getElementById('app')
	);
	/*
	if.js works, because the words if and else are not injected in between JSX tags. The if statement is on the outside, and no JavaScript injection is necessary.

	This is a common way to express conditionals in JSX.
	*/


	// Example: coin toss
	import React from 'react';
	import ReactDOM from 'react-dom';

	function coinToss() {
	// This function will randomly return either 'heads' or 'tails'.
	return Math.random() < 0.5 ? 'heads' : 'tails';
	}

	const pics = {
		kitty: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-kitty.jpg',
		doggy: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-puppy.jpeg'
	};
	let img;

	// if/else statement begins here:
	if (coinToss() === 'heads') {
		img = <img src={pics.kitty} />;
	} else {
		img = <img src={pics.doggy} />;
	}

	ReactDOM.render(
		img,
		document.getElementById('app')
	);


// JSX Conditionals: The Ternary Operator

	const headline = (
		<h1>
			{ age >= drinkingAge ? 'Buy Drink' : 'Do Teen Stuff' }
		</h1>
	);

	// Example
	import React from 'react';
	import ReactDOM from 'react-dom';

	function coinToss () {
		// Randomly return either 'heads' or 'tails'.
		return Math.random() < 0.5 ? 'heads' : 'tails';
	}

	const pics = {
		kitty: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-kitty.jpg',
		doggy: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-puppy.jpeg'
	};

	const img = <img src={pics[coinToss() === 'heads' ? 'kitty' : 'doggy']} />;

	ReactDOM.render(
		img, 
		document.getElementById('app')
	);



// JSX Conditionals: &&

	const tasty = (
		<ul>
			<li>Applesauce</li>
			{ !baby && <li>Pizza</li> }
			{ age > 15 && <li>Brussels Sprouts</li> }
			{ age > 20 && <li>Oysters</li> }
			{ age > 25 && <li>Grappa</li> }
		</ul>
	);


	
// .map in JSX

	const strings = ['Home', 'Shop', 'About Me'];
	const listItems = strings.map(string => <li>{string}</li>);

	<ul>{listItems}</ul>

	// More example

		import React from 'react';
		import ReactDOM from 'react-dom';

		const people = ['Rowe', 'Prevost', 'Gare'];

		const peopleLis = people.map(person =>
		// expression goes here:
			<li>{ person }</li>
		);

		// ReactDOM.render goes here:
		ReactDOM.render(
			<ul>{ peopleLis }</ul>,
		document.getElementById('app')                           
		);



// Keys

	<ul>
		<li key="li-01">Example1</li>
		<li key="li-02">Example2</li>
		<li key="li-03">Example3</li>
	</ul>

	// A key is a JSX attribute. The attribute's name is key. The attribute's value should be something unique, similar to an id attribute.

	// keys don't do anything that you can see! React uses them internally to keep track of lists. If you don't use keys when you're supposed to, React might accidentally scramble your list-items into the wrong order.

	/*
	Not all lists need to have keys. A list needs keys if either of the following are true:

		The list-items have memory from one render to the next. For instance, when a to-do list renders, each item must "remember" whether it was checked off. The items shouldn't get amnesia when they render.

		A list's order might be shuffled. For instance, a list of search results might be shuffled from one render to the next.
	*/

	import React from 'react';
	import ReactDOM from 'react-dom';

	const people = ['Rowe', 'Prevost', 'Gare'];

	const peopleLis = people.map((person, i) =>
	// expression goes here:
		<li key={'person_' + i}>{ person }</li>
	);

	// ReactDOM.render goes here:
	ReactDOM.render(
		<ul>{ peopleLis }</ul>,
	document.getElementById('app')                           
	);



// React.createElement

	You can write React code without using JSX at all!

	// JSX
	const h1 = <h1>Hello world</h1>;

	// JS
	const h1 = React.createElement(
		"h1",
		null,
		"Hello, world"
	);




/* -------------------------------------------------- */
	Component
/* -------------------------------------------------- */

A component is a small, reusable chunk of code that is responsible for one job. That job is often to render some HTML.

	// Example
	import React from 'react';
	import ReactDOM from 'react-dom';

	class MyComponentClass extends React.Component {
		render() {
			return <h1>Hello world</h1>;
		}
	};

	ReactDOM.render(
		<MyComponentClass />,
		document.getElementById('app')
	);



// Import React

	import React from 'react';

		// This imported object contains methods that you need in order to use React. The object is called the React library.

		// The methods imported from 'react' don't deal with the DOM at all. They don't engage directly with anything that isn't part of React.

		// To clarify: the DOM is used in React applications, but it isn't part of React. After all, the DOM is also used in countless non-React applications. Methods imported from 'react' are only for pure React purposes, such as creating components or writing JSX elements.



// Import ReactDOM

	import ReactDOM from 'react-dom';

		// The methods imported from 'react-dom' are meant for interacting with the DOM. You are already familiar with one of them: ReactDOM.render().

	

// Create a Component Class

	// Every component must come from a component class.

	// A component class is like a factory that creates components. If you have a component class, then you can use that class to produce as many components as you want.

	// To make a component class, you use a base class from the React library: React.Component.

	// React.Component is a JavaScript class. To create your own component class, you must subclass React.Component. You can do this by using the syntax 

	class ComponentName extends React.Component {}




// Render Function

	// There is only one property that you have to include in your instructions: a render method.

	// A render method is a property whose name is render, and whose value is a function. The term "render method" can refer to the entire property, or to just the function part.

	class ComponentFactory extends React.Component {
		render() {
			return <h1>Hello world</h1>;
		}
	}

		// A render method must contain a return statement. Usually, this return statement returns a JSX expression.



// Create a Component Instance

	// To make a React component, you write a JSX element. Instead of naming your JSX element something like h1 or div like you've done before, give it the same name as a component class.

	import React from 'react';
	import ReactDOM from 'react-dom';

	class MyComponentClass extends React.Component {
		render() {
			return <h1>Hello world</h1>;
		}
	}

	ReactDOM.render(
		<MyComponentClass />, // Component Instance
		document.getElementById('app')
	);





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


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */
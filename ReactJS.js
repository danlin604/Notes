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
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */
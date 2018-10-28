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
  Basics
/* -------------------------------------------------- */

// Stateless functions
const Greeting = () => <div>Hi there!</div>

// Passing props and context
const Greeting = (props, context) =>
  <div style={{color: context.color}}>Hi {props.name}!</div>

// defaultProps, propTypes and contextTypes
Greeting.propTypes = {
  name: PropTypes.string.isRequired
}
Greeting.defaultProps = {
  name: "Guest"
}
Greeting.contextTypes = {
  color: PropTypes.string
}

// props written as attributes
<main className="main" role="main">{children}</main>
// props "spread" from object
<main {...{className: "main", role: "main", children}} />

// forward props
const FancyDiv = props =>
  <div className="fancy" {...props} />

<FancyDiv data-id="my-fancy-div">So Fancy</FancyDiv>
// output: <div className="fancy" data-id="my-fancy-div">So Fancy</div>

// destructure props
const Greeting = props => <div>Hi {props.name}!</div>
const Greeting = ({ name }) => <div>Hi {name}!</div>
const Greeting = ({ name, ...props }) => // rest
  <div {...props}>Hi {name}!</div> // spread

// conditionals
// id
{condition && <span>Rendered when `truthy`</span> }
// unless
{condition || <span>Rendered when `falsey`</span> }
// ternary
{condition
  ? <span>Rendered when `truthy`</span>
  : <span>Rendered when `falsey`</span>
}

// children types
//string
<div>
  Hello World!
</div>
// array
<div>
  {["Hello ", <span>World</span>, "!"]}
</div>
// function
<div>
  {(() => { return "hello world!"})()}
</div>
// map with destructure
<ul>
  {arrayOfMessageObjects.map(({ id, ...message }) =>
    <Message key={id} {...message} />
  )}
</ul>

// render callback with children
const Width = ({ children }) => children(500)
<Width>
  {width => <div>window is {width}</div>}
</Width>

<div>window is 500</div> // output

// reusable
const MinWidth = ({ width: minWidth, children }) =>
  <Width>
    {width =>
      width > minWidth
        ? children
        : null
    }
  </Width>

// proxy component
<button type="button" /> // no proxy
// is proxy
const Button = props =></button>
  <button type="button" {...props} />
// usage
<Button a='a' b='b' />

// style component
import classnames from 'classnames'

const PrimaryBtn = props =>
  <Btn {...props} primary />

const Btn = ({ className, primary, ...props }) =>
  <button
    type="button"
    className={classnames(
      "btn",
      primary && "btn-primary",
      className
    )}
    {...props}
  />

// same output
<PrimaryBtn />
<Btn primary />
<button type="button" className="btn btn-primary" />

// event switch
// no switch
handleClick() { require("./actions/doStuff")(/* action stuff */) } 
handleMouseEnter() { this.setState({ hovered: true }) }

// switch
handleEvent({type}) {
  switch(type) {
    case "click":
      return require("./actions/doStuff")(/* action dates */)
    case "mouseenter":
      return this.setState({ hovered: true })
    default:
      return console.warn(`No case for event type "${type}"`)
  }
}

// layout component
<HorizontalSplit
  leftSide={<SomeSmartComponent />}
  rightSide={<AnotherSmartComponent />}
/>

class HorizontalSplit extends React.Component {
  shouldComponentUpdate() {
    return false // optimized
  }

  render() {
    <FlexContainer>
      <div>{this.props.leftSide}</div>
      <div>{this.props.rightSide}</div>
    </FlexContainer>
  }
}


// container component
// A container does data fetching and then renders its corresponding sub-component.
const CommentList = ({ comments }) =>
  <ul>
    {comments.map(comment =>
      <li>{comment.body}-{comment.author}</li>
    )}
  </ul>

class CommentListContainer extends React.Component {
  constructor() {
    super()
    this.state = { comments: [] }
  }

  componentDidMount() {
    $.ajax({
      url: "/my-comments.json",
      dataType: 'json',
      success: comments =>
        this.setState({comments: comments});
    })
  }

  render() {
    return <CommentList comments={this.state.comments} />
  }
}


// higher-order component (HOC)
const Greeting = ({ name }) => {
  if (!name) { return <div>Connecting...</div> }
  return <div>Hi {name}!</div>
}

const Connect = ComposedComponent =>
  class extends React.Component {
    constructor() {
      super()
      this.state = { name: "" }
    }

    componentDidMount() {
      // this would fetch or connect to a store
      this.setState({ name: "Michael" })
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          name={this.state.name}
        />
      )
    }
  }

const ConnectedMyComponent = Connect(Greeting)

// state hoisting
// Events are changes in state. Their data needs to be passed to stateful container components parents.
class NameContainer extends React.Component {
  render() {
    return <Name onChange={newName => alert(newName)} />
  }
}

const Name = ({ onChange }) =>
  <input onChange={e => onChange(e.target.value)} />


// state is hoisted to parent (container)
class NameContainer extends React.Component {
  constructor() {
    super()
    this.state = {name: ""}
  }

  render() {
    return <Name onChange={newName => this.setState({name: newName})} />
  }
}


// controlled input
//uncontrolled
<input type="text" />

// controlled
class ControlledNameInput extends React.Component {
  constructor() {
    super()
    this.state = {name: ""}
  }

  render() {
    return (
      <input
        value={this.state.name}
        onChange={e => this.setState({ name: e.target.value })}
      />
    )
  }
}

/* -------------------------------------------------- */
  Export / Import
/* -------------------------------------------------- */

module.exports = {
  module1,
  module2,
}

// There are two different types of export, named and default. You can have multiple named exports per module but only one default export.
export default module1

exports.module1

export const module1 = {}

import React, { createElement as h } from 'react'

/* -------------------------------------------------- */
  compose, connect, redux
/* -------------------------------------------------- */

const enhance = compose(
  withRouter,
  withStyles(styles, 'some style'),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(MyComponent);

/* -------------------------------------------------- */
  promisify
/* -------------------------------------------------- */

// node
util.promisify

// wrapper example
function createTicket(ticket) {
  // 1 - Create a new Promise
  return new Promise(function (resolve, reject) {
      // 2 - Copy-paste your code inside this function
      client.tickets.create(ticket, function (err, req, result) {
          // 3 - in your async function's callback
          // replace return by reject (for the errors) and resolve (for the results)
          if (err) {
              reject(err);
          } else {
              resolve(JSON.stringify(result));
          }
      });
  });
}

async () => await createTicket `stub`

/* -------------------------------------------------- */
  Redux
/* -------------------------------------------------- */

// actions.js
export function showNotification(text) {
  return { type: 'SHOW_NOTIFICATION', text }
}
export function hideNotification() {
  return { type: 'HIDE_NOTIFICATION' }
}

// component.js
import { showNotification, hideNotification } from '../actions'

this.props.dispatch(showNotification('You just logged in.'))
setTimeout(() => {
  this.props.dispatch(hideNotification())
}, 5000)

// Extracting Async Action Creator

// Reasons

// It forces you to duplicate this logic anywhere you want to show a notification.

// The notifications have no IDs so you’ll have a race condition if you show two notifications fast enough. When the first timeout finishes, it will dispatch HIDE_NOTIFICATION, erroneously hiding the second notification sooner than after the timeout.

// actions.js
function showNotification(id, text) {
  return { type: 'SHOW_NOTIFICATION', id, text }
}
function hideNotification(id) {
  return { type: 'HIDE_NOTIFICATION', id }
}

let nextNotificationId = 0
export function showNotificationWithTimeout(dispatch, text) {
  // Assigning IDs to notifications lets reducer ignore HIDE_NOTIFICATION
  // for the notification that is not currently visible.
  // Alternatively, we could store the interval ID and call
  // clearInterval(), but we’d still want to do it in a single place.
  const id = nextNotificationId++
  dispatch(showNotification(id, text))

  setTimeout(() => {
    dispatch(hideNotification(id))
  }, 5000)
}

// component.js
showNotificationWithTimeout(this.props.dispatch, 'You just logged in.')

// otherComponent.js
showNotificationWithTimeout(this.props.dispatch, 'You just logged out.')

// Why does showNotificationWithTimeout() accept dispatch as the first argument? Because it needs to dispatch actions to the store. Normally a component has access to dispatch but since we want an external function to take control over dispatching, we need to give it control over dispatching.


// Thunk Middleware

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

// It still recognizes plain object actions
store.dispatch({ type: 'INCREMENT' })

// But with thunk middleware, it also recognizes functions
store.dispatch(function (dispatch) {
  // ... which themselves may dispatch many times
  dispatch({ type: 'INCREMENT' })
  dispatch({ type: 'INCREMENT' })
  dispatch({ type: 'INCREMENT' })

  setTimeout(() => {
    // ... even asynchronously!
    dispatch({ type: 'DECREMENT' })
  }, 1000)
})

// When this middleware is enabled, if you dispatch a function, Redux Thunk middleware will give it dispatch as an argument. It will also “swallow” such actions so don’t worry about your reducers receiving weird function arguments. Your reducers will only receive plain object actions—either emitted directly, or emitted by the functions as we just described.

// it lets us declare showNotificationWithTimeout() as a regular Redux action creator:

// actions.js
function showNotification(id, text) {
  return { type: 'SHOW_NOTIFICATION', id, text }
}
function hideNotification(id) {
  return { type: 'HIDE_NOTIFICATION', id }
}

let nextNotificationId = 0
export function showNotificationWithTimeout(text) {
  return function (dispatch) {
    const id = nextNotificationId++
    dispatch(showNotification(id, text))

    setTimeout(() => {
      dispatch(hideNotification(id))
    }, 5000)
  }
}

// Note how the function is almost identical to the one we wrote in the previous section. However it doesn’t accept dispatch as the first argument. Instead it returns a function that accepts dispatch as the first argument.

// component.js
showNotificationWithTimeout('You just logged in.')(this.props.dispatch)

// If Redux Thunk middleware is enabled, any time you attempt to dispatch a function instead of an action object, the middleware will call that function with dispatch method itself as the first argument.

// component.js
this.props.dispatch(showNotificationWithTimeout('You just logged in.'))


// we can now use them in any place where we would use regular action creators. For example, we can use them with connect():

// actions.js

function showNotification(id, text) {
  return { type: 'SHOW_NOTIFICATION', id, text }
}
function hideNotification(id) {
  return { type: 'HIDE_NOTIFICATION', id }
}

let nextNotificationId = 0
export function showNotificationWithTimeout(text) {
  return function (dispatch) {
    const id = nextNotificationId++
    dispatch(showNotification(id, text))

    setTimeout(() => {
      dispatch(hideNotification(id))
    }, 5000)
  }
}

// component.js

import { connect } from 'react-redux'

// ...

this.props.showNotificationWithTimeout('You just logged in.')

// ...

export default connect(
  mapStateToProps,
  { showNotificationWithTimeout }
)(MyComponent)


// Reading state in thunks

// component.js
if (this.props.areNotificationsEnabled) {
  showNotificationWithTimeout(this.props.dispatch, 'You just logged in.')
}


// action.js
let nextNotificationId = 0
export function showNotificationWithTimeout(text) {
  return function (dispatch, getState) {
    // Unlike in a regular action creator, we can exit early in a thunk
    // Redux doesn’t care about its return value (or lack of it)
    if (!getState().areNotificationsEnabled) {
      return
    }

    const id = nextNotificationId++
    dispatch(showNotification(id, text))

    setTimeout(() => {
      dispatch(hideNotification(id))
    }, 5000)
  }
}

// Don’t abuse this pattern. It is good for bailing out of API calls when there is cached data available, but it is not a very good foundation to build your business logic upon. If you use getState() only to conditionally dispatch different actions, consider putting the business logic into the reducers instead.

/* -------------------------------------------------- */
  Currying
/* -------------------------------------------------- */

let dragon =
  name =>
    size =>
      element =>
        name +
        size +
        element
console.log(dragon('deathwing')('big')('earth'))
// out: deathwingbigearth





const tag = t => contents => `<${t}>${contents}</${t}>`
tag('b')('this is bold!') // <b>this is bold!</b>

// example:
const encodeAttribute = (x = '') =>
  x.replace(/"/g, '&quot;')

const toAttributeString = (x = {}) =>
  Object.keys(x)
    .map(attr => `${encodeAttribute(attr)}="${encodeAttribute(x[attr])}"`) 
    .join(' ')

const tagAttributes = x => (c = '') =>
  `<${x.tag}${x.attr?' ':''}${toAttributeString(x.attr)}>${c}</${x.tag}>`

const tag = x =>
  typeof x === 'string'
    ? tagAttributes({ tag: x })
: tagAttributes(x)


// usage
const bold = tag('b')
bold('this is bold!') // <b>this is bold!</b>
tag('b')('this is bold!') // <b>this is bold!</b>
tag({ tag: 'div', attr: { 'class': 'title' }})('this is a title!') // <div class="title">this is a title!</div>


// practical example:
const listGroup = tag({ tag: 'ul', attr: { class: 'list-group' }})
const listGroupItem = tag({ tag: 'li', attr: { class: 'list-group-item' }})
const listGroupItems = items =>
  items.map(listGroupItem)
    .join('')

listGroup()
// <ul class="list-group"></ul>

listGroupItem('Cras justo')
// <li class="list-group-item">Cras justo</li>

listGroupItems(['Cras justo', 'Dapibus ac'])
// <li class='list-group-item'>Cras justo</li>
// <li class='list-group-item'>Dapibus ac</li>

listGroup(listGroupItems(['Cras justo', 'Dapibus ac']))
// <ul class='list-group'>
//   <li class='list-group-item'>Cras justo</li>
//   <li class='list-group-item'>Dapibus ac</li>
// </ul>

const listGroupTag = tag({ tag: 'ul', attr: { class: 'list-group' }})
const listGroup = items => listGroupTag(listGroupItems(items))

// compose
listGroupTag (listGroupItems (items)) // without
compose(listGroupTag, listGroupItems)(items) // with

const panelTag = tag({ tag: 'div', attr: { class: 'panel panel-default' }})
const panelBody = tag({ tag: 'div', attr: { class: 'panel-body' }})
const basicPanel =
compose(panelTag, panelBody)

const listGroupPanel =
  compose(basicPanel, listGroup)

const listGroupPanel =
  compose(basicPanel, listGroupTag, listGroupItems)


// pipe: compose has a companion function pipe

// pseudo code
const login = pipe(
  validateInput,
  getCustomer,
  getAuthToken
  loginResponse
)

// compose / pipe
const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const pipe = (...functions) => data =>
functions.reduce((value, func) => func(value), data)


/* -------------------------------------------------- */
  Fragments
/* -------------------------------------------------- */

// Fragments let you group a list of children without adding extra nodes to the DOM.


// Usage
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}

// short syntax
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}





/********************************
 * Portal
 ********************************/

// Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

// signature
ReactDOM.createPortal(child, container)

// usage
render() {
  // React mounts a new div and renders the children into it
  return (
    <div>
      {this.props.children}
    </div>
  );
}

render() {
  // React does *not* create a new div. It renders the children into `domNode`.
  // `domNode` is any valid DOM node, regardless of its location in the DOM.
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}

// Accessing the domNode
const domNode = document.createElement('div')
const domNode = document.getElementById('myNode')

// Limit use of portals to when-you-need-it.

/********************************
 * React + Redux
 ********************************/

// If previousState matters
const onClick = () => {
  this.setState((previousState, currentProps) => {
    return {
      show: !previousState.show,
    }
  })
}

// So value is the same, since setState is async
const onClick = (e) => {
  this.setState({ value: e.target.value, () => {
    this.props.onChange(this.state.value)
  }})
}

// Dyanmic component types
const { metatypes } = this.context

<metatypes.text value={'myData'} />

const metatypesEdit = {
  text: class extends React.Component {
    render() {
      return <input type="text" {...this.props} />
    }
  }
}

const metatypesView = {
  ...
}

class CardEditor extends React.Component {
  static childContextTypes = {
    metatypes: react.PropTypes.object
  }

  getChildContext() {
    return { metatypes: metatypesEdit }
  }

  render() {
    const { cardData } = this.props
    const CardComponent = selectCardComponent(cardData)

    return <CardComponent cardData={cardData} />
  }
}

// Feature fallback
<Feature name="new-feature" fallback={<OldFeature />}>
  <NewFeatureComponent />
</Feature>



 /********************************
 *
 ********************************/

 /********************************
 *
 ********************************/
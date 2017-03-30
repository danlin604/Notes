/*******************************************************
 * Quick Tour
 *******************************************************/

/* --------------------------------------------------- */
    Register an element
/* --------------------------------------------------- */

To register a new element, create an ES6 class{} that extends Polymer.Element, then call the customElements.define method, which registers a new element with the browser. Registering an element associates an element name with a class, so you can add properties and methods to your custom element. The custom elements name must start with an ASCII letter and contain a dash (-).

/* proto-element.html

<link rel="import"  href="https://polygit.org/polymer+2.0.0-rc.2/components/polymer/polymer-element.html">

<script>
  // Define the class for a new element called custom-element
  class CustomElement extends Polymer.Element {
    static get is() { return "custom-element"; }
    constructor() {
        super();
        this.textContent = "I'm a custom-element.";
      }
  }
  // Register the new element with the browser
  customElements.define(CustomElement.is, CustomElement);
</script>
*/


/* index.html 

<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://polygit.org/webcomponentsjs+1.0.0-rc.5/components/webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="custom-element.html">
  </head>
  <body>
    <custom-element></custom-element>
  </body>
</html>
*/

/* --------------------------------------------------- */
    Add shadow DOM
/* --------------------------------------------------- */

Many elements include some internal DOM nodes to implement the elements UI and behavior. You can use Polymers DOM templating to create a shadow DOM tree for your element.

/* dom-element.html

<link rel="import"  href="https://polygit.org/polymer+2.0.0-rc.2/components/polymer/polymer-element.html">

<dom-module id="dom-element">

  <template>
    <p>I'm a DOM element. This is my local DOM!</p>
  </template>

  <script>
    class DomElement extends Polymer.Element {
      static get is() { return "dom-element"; }
    }
    customElements.define(DomElement.is, DomElement);
  </script>

</dom-module>
*/

/* index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://polygit.org/webcomponentsjs+1.0.0-rc.5/components/webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="dom-element.html">
  </head>
  <body>
    <dom-element></dom-element>
  </body>
</html>
*/


/* --------------------------------------------------- */
    Compose with shadow DOM
/* --------------------------------------------------- */

Shadow DOM lets you control composition. The elements children can be distributed so they render as if they were inserted into the shadow DOM tree.

/* picture-frame.html

<link rel="import"  href="https://polygit.org/polymer+2.0.0-rc.2/components/polymer/polymer-element.html">

<dom-module id="picture-frame">

  <template>
    <!-- scoped CSS for this element -->
    <style>
      div {
        display: inline-block;
        background-color: #ccc;
        border-radius: 8px;
        padding: 4px;
      }
    </style>
    <div>
      <!-- any children are rendered here -->
      <slot></slot>
    </div>
  </template>

  <script>
    class PictureFrame extends Polymer.Element {
      static get is() { return "picture-frame"; }
    }
    customElements.define(PictureFrame.is, PictureFrame);
  </script>

</dom-module>
*/

/* index.html 

<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://polygit.org/webcomponentsjs+1.0.0-rc.5/components/webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="picture-frame.html">
  </head>
  <body>
    <picture-frame>
      <img src="https://www.polymer-project.org/images/logos/p-logo-32.png">
    </picture-frame>
  </body>
</html>
*/

!!Note!!

	The CSS styles defined inside the <dom-module> are scoped to the elements shadow DOM. So the div rule here only affects <div> tags inside <picture-frame>.



/* --------------------------------------------------- */
    Using data binding
/* --------------------------------------------------- */

Data binding is a great way to quickly propagate changes in your element and reduce boilerplate code. You can bind properties in your component using the "double-mustache" syntax ({{}}). The {{}} is replaced by the value of the property referenced between the brackets.

/* name-tag.html

<!-- import polymer-element -->
<link rel="import"  href="https://polygit.org/polymer+2.0.0-rc.2/components/polymer/polymer-element.html">

<dom-module id="name-tag">
  <template>
    <!-- bind to the "owner" property -->
    This is <b>{{owner}}</b>'s name-tag element.
  </template>
  
  <script>
    class NameTag extends Polymer.Element {
      static get is() { return "name-tag"; }
      
      // set this element's owner property
      constructor() {
        super();
        this.owner = "Daniel";
      }
    }
    
    customElements.define(NameTag.is, NameTag);
  </script>
</dom-module>
*/

/* index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://polygit.org/webcomponentsjs+1.0.0-rc.5/components/webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="name-tag.html">
  </head>
  <body>
    <name-tag></name-tag>
  </body>
</html>
*/


/* --------------------------------------------------- */
    Declare a property
/* --------------------------------------------------- */

Properties are an important part of an elements public API. Polymer declared properties support a number of common patterns for properties—setting default values, configuring properties from markup, observing property changes, and more.

/* configurable-name-tag.html

<link rel="import"  href="https://polygit.org/polymer+2.0.0-rc.2/components/polymer/polymer-element.html">

<dom-module id="configurable-name-tag">

  <template>
    <!-- bind to the "owner" property -->
    This is <b>[[owner]]</b>'s name-tag element.
  </template>

  <script>
    class ConfigurableNameTag extends Polymer.Element {
      static get is() { return "configurable-name-tag"; }
      // configure owner property
      constructor() {
        super();
        this.owner = "Daniel";
      }
    }
    customElements.define(ConfigurableNameTag.is, ConfigurableNameTag);
  </script>

</dom-module>
*/

/* index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://polygit.org/webcomponentsjs+1.0.0-rc.5/components/webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="configurable-name-tag.html">
  </head>
  <body>
    <!-- configure a property from markup by setting
         the corresponding attribute                 -->
    <configurable-name-tag owner="Scott"></configurable-name-tag>
  </body>
</html>
*/


/* --------------------------------------------------- */
    Bind to a property
/* --------------------------------------------------- */

In addition to text content, you can bind to an elements properties (using property-name="[[binding]]"). Polymer properties can optionally support two-way binding, using curly braces (property-name="{{binding}}").

/* editable-name-tag.html

<link rel="import"  href="https://polygit.org/polymer+2.0.0-rc.2/iron-input+polymerelements+:2.0-preview/shadycss+webcomponents+1.0.0-rc.2/components/polymer/polymer-element.html">
<!-- import the iron-input element -->
<link rel="import"  href="https://polygit.org/polymer+2.0.0-rc.2/iron-input+polymerelements+:2.0-preview/shadycss+webcomponents+1.0.0-rc.2/components/iron-input/iron-input.html">

<dom-module id="editable-name-tag">

  <template>
    <!-- bind to the "owner" property -->
    <p>This is <b>[[owner]]</b>'s name-tag element.</p>
    
    <!-- iron-input exposes a two-way bindable input value -->
    <iron-input bind-value="{{owner}}">
      <input is="iron-input" placeholder="Your name here...">
    </iron-input>
  </template>

  <script>
    class EditableNameTag extends Polymer.Element {
      static get is() { return "editable-name-tag"; }
      
      // configure the owner property
      static get properties() {
        return {
          owner: {
            type: String,
            value: 'Daniel'
          }
        };
      }
      
    }
    customElements.define(EditableNameTag.is, EditableNameTag);
  </script>

</dom-module>
*/

/* index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://polygit.org/webcomponentsjs+1.0.0-rc.5/components/webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="editable-name-tag.html">
  </head>
  <body>
    <editable-name-tag></editable-name-tag>
  </body>
</html>
*/

!!Note!!

	The <iron-input> element wraps a native <input> element and provides two-way data binding and input validation.


/* --------------------------------------------------- */
    Using <dom-repeat> for template repeating
/* --------------------------------------------------- */

/* employee-list.html

<!-- import polymer-element -->
<link rel="import"  href="https://polygit.org/polymer+2.0.0-rc.2/components/polymer/polymer-element.html">
<link rel="import"  href="https://polygit.org/polymer+2.0.0-rc.2/components/polymer/lib/elements/dom-repeat.html">

<dom-module id="employee-list">
  <template>
    <div> Employee list: </div>
    <p></p>
    <template is="dom-repeat" items="{{employees}}">
        <div>First name: <span>{{item.first}}</span></div>
        <div>Last name: <span>{{item.last}}</span></div>
        <p></p>
    </template>
  </template>
  <script>
    class EmployeeList extends Polymer.Element {
      static get is() { return "employee-list"; }
      
      // set this element's employees property
      constructor() {
        super();
        this.employees = [
          {first: 'Bob', last: 'Li'},
          {first: 'Ayesha', last: 'Johnson'},
          {first: 'Fatma', last: 'Kumari'},
          {first: 'Tony', last: 'Morelli'}
        ]; 
      }
    }
  customElements.define(EmployeeList.is, EmployeeList);
  </script>

</dom-module>
*/

/* index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://polygit.org/webcomponentsjs+1.0.0-rc.5/components/webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="employee-list.html">
  </head>
  <body>
    <employee-list></employee-list>
  </body>
</html>
*/





/*******************************************************
 * Install Polymer 2.x
 *******************************************************/

You can install Polymer via the Polymer CLI, or via Bower.


/* --------------------------------------------------- */
    Option 1: Start a blank application with polymer init
/* --------------------------------------------------- */



// Install the Polymer CLI

	npm install -g polymer-cli@next

// Verify your Polymer version.

	polymer --version

	The output of this command should be at least 0.18.0-pre.13.

// Create a test folder for Polymer 2.0, and switch to it.

	mkdir polymer-20-test
	cd polymer-20-test

// Initialize your project.

	polymer init

// Select polymer-2-application.

// Serve your project.

	polymer serve


/* Example app struct */

|── README.md
|── bower.json
|── bower_components
|── index.html
|── manifest.json
|── images
|    └── chrome-logo.svg
|── src
|    └── show-app
|         └── show-app.html
└── test
     └── show-app
          └── show-app_test.html


/* --------------------------------------------------- */
    Building for deployment
/* --------------------------------------------------- */

The polymer build command is the easiest way to build your project for deployment. It can minify, compile and bundle your code dependending on command line flags, or options specified in a polymer.json file.

// To create a universal build that works on all browsers, use the --js-compile flag:

	polymer build --js-compile

// This will build your project to build/default. Serve that directory with polymer serve:

	polymer serve build/default



/*******************************************************
 * Building a progressive web app
 *******************************************************/

npm init

	CLI generates:

		README.md
		index.html
		manifest.json
		bower.json
		bower_components 	// dir: external dependencies
		src 				// dir: app's elements will live here
		src/show-app.html	// main element



/*******************************************************
 * The PRPL pattern
 *******************************************************/

PRPL is a pattern for structuring and serving Progressive Web Apps (PWAs), with an emphasis on the performance of app delivery and launch. It stands for:

Push critical resources for the initial URL route.

Render initial route.

Pre-cache remaining routes.

Lazy-load and create remaining routes on demand.


/*******************************************************
 * Hello World
 *******************************************************/

/* index.html

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">

    <title>hello-world</title>
    <meta name="description" content="hello-world description">

    <link rel="manifest" href="/manifest.json">
    <script src="/bower_components/webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="/src/hello-world/hello-world.html">
 
  </head>
  <body>
    <hello-world id="greet" name="User"></hello-world>
  </body>
</html>

*/

webcomponents-lite.js 	// required
hello-world.html		// my web component

You can insert custom elemet properties.

/* hello-world.html 

<link rel="import" href="../../bower_components/polymer/polymer.html">

<dom-module id="hello-world">
  <template>    
    <h1>Hello, [[name]]</h1> <!-- One way data binding -->
    <input type="text" value="{{name::keyup}}">
  </template>
  <script>
    Polymer({
      is: 'hello-world'
    })
  </script>
</dom-module>
*/

One way data binding demonstrates input field that modifies hello-world name property.





/*******************************************************
 * 
 *******************************************************/

/*******************************************************
 * 
 *******************************************************/

/*******************************************************
 * 
 *******************************************************/


/*******************************************************
 * 
 *******************************************************/

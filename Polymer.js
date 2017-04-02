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
 * juicy-ace-editor
 *******************************************************/

bower install juicy-ace-editor --save

/* index.html 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
    <link rel="import" href="bower_components/juicy-ace-editor/juicy-ace-editor.html">
    <style type="text/css">
      #editor-container {
        position: absolute;
        top:  0px;
        left: 280px;
        bottom: 0px;
        right: 0px;
        background: white;
      }
    </style>
</head>
<body>
    <juicy-ace-editor id="editor-container" theme="ace/theme/monokai" mode="ace/mode/javascript">
    var User          = require('./controllers/user.server.controller'),
        Notification  = require('./controllers/notification.server.controller');

        module.exports = function(app) {

          app.get('/api',  User.welcome);

          app.post('/api/users',           User.createNewUser);
          app.delete('/api/user/:user_id', User.deleteOneUser);

          app.post('/api/notify', Notification.notifyUsers);
        };
    </juicy-ace-editor>
</body>
</html>
*/



/*******************************************************
 * Custom elements
 *******************************************************/

/* --------------------------------------------------- */
    Rules
/* --------------------------------------------------- */

	The name of your custom element must contain a dash (-). For example, <file-reader>, and <skype-login> are valid names for custom elements, while <skype_login>, and <skypelogin> are not. This is necessary in order to allow the HTML parser differentiate between a custom element and an inbuilt HTML element.

	A custom element cant be registered more than once. A DOMException error will be thrown if you do so.

	A custom element can't be self-closing. For example, you can't write a custom element like this: <skype-login />. It should always be written like this: <skype-login></skype-login>.


/* --------------------------------------------------- */
    Create custom element
/* --------------------------------------------------- */

class FileBag extends HTMLElement {
  // Define behavior here
}

window.customElements.define('file-bag', FileBag);




/* --------------------------------------------------- */
    Create anonymous custom element
/* --------------------------------------------------- */

window.customElements.define('file-bag', class extends HTMLElement {
  // Define behaviour here
});




/* --------------------------------------------------- */
    Usage
/* --------------------------------------------------- */

/* index.html

<file-bag></file-bag>
*/




/* --------------------------------------------------- */
    Define custom properties on a customElement
/* --------------------------------------------------- */

class FileBag extends HTMLElement {
  // Set the "open" property
  set open(option) {
    this.setAttribute("open", option);
  }

  // Get the "open" property
  get open() {
    return this.hasAttribute("open");
  }

}

/* index.html

<file-bag open="true"></file-bag>
*/


constructor(): 

	Here, you can attach event listeners and initialize state.

connectedCallback(): 

	Called whenever the custom element is inserted into the DOM.

disconnectedCallback(): 

	Called whenever the custom element is removed from the DOM.

attributeChangedCallback(attrName, oldVal, newVal): 

	Called whenever an attribute is added, removed or updated. Only attributes listed in the observedAttributes property are affected.

adoptedCallback(): 

	Called whenever the custom element has been moved into a new document.




/* --------------------------------------------------- */
    Shadow DOM
/* --------------------------------------------------- */

This is a powerful API to combine with custom elements. It provides encapsulation by hiding DOM subtrees under shadow roots.


/* Usage */

window.customElements.define('file-bag', class extends HTMLElement {
  constructor() {
    super();
    var shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `<strong>Shadow dom super powers for the win!</strong>`;
  }
});

/* Result

<file-bag>
    <strong>Shadow dom super powers for the win!</strong>
</file-bag>
*/

The main idea behind Shadow DOM is to mask all of the markup behind a custom element in the shadows. If you inspect the element in the browser, you wont see any of the markup apart from the attributes of the element. They are hidden under shadow roots. Browser vendors have been using Shadow DOM for years to natively implement elements such as <input>, <audio>, <video> and many others. Another benefit is that all the styling and scripts inside the custom element wont accidentally leak out and affect anything else on the page.






/* --------------------------------------------------- */
    HTML Imports
/* --------------------------------------------------- */

HTML Imports are a way to include and reuse HTML documents in other HTML documents.

/*
<link rel="import" href="/imports/file-reader.html">
*/



/* --------------------------------------------------- */
    HTML Template
/* --------------------------------------------------- */

This is a web component specification that defines how to declare pieces of markup at page load.

The <template> tag is placed within the web component. You can write HTML and CSS code within this tag to define how you want the component to be presented in the browser.


/*******************************************************
 * Build a Vimeo Embed Web Component
 *******************************************************/

bower install webcomponentsjs --save


/* index.html

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Vimeo Embed</title>
    <script src="./bower_components/webcomponentsjs/webcomponents.min.js"></script>
    <link rel="import" href="vimeo-embed.html">
    <style type="text/css">
        .wrapper {
            max-width: 680px;
            margin: 60px auto 100px;
        }
    </style>
</head>
<body>
    <h3 align="center"> VIMEO EMBEDED WEB COMPONENT</h3>
    <div class="wrapper">
        <vimeo-embed embed="203909195"></vimeo-embed>
    </div>   
</body>
</html>
*/




/* vimeo-embed.html

<!-- Defines element markup -->
<template>
    <style>
        .vimeo {
            background-color: #000;
            margin-bottom: 30px;
            position: relative;
            padding-top: 56.25%;
            overflow: hidden;
            cursor: pointer;
        }
        .vimeo img {
            width: 100%;
            top: -16.82%;
            left: 0;
            opacity: 0.7;
        }
        .vimeo .play-button {
            width: 90px;
            height: 60px;
            background-color: #333;
            box-shadow: 0 0 30px rgba( 0,0,0,0.6 );
            z-index: 1;
            opacity: 0.8;
            border-radius: 6px;
        }
        .vimeo .play-button:before {
            content: "";
            border-style: solid;
            border-width: 15px 0 15px 26.0px;
            border-color: transparent transparent transparent #fff;
        }
        .vimeo img,
        .vimeo .play-button {
            cursor: pointer;
        }
        .vimeo img,
        .vimeo iframe,
        .vimeo .play-button,
        .vimeo .play-button:before {
            position: absolute;
        }
        .vimeo .play-button,
        .vimeo .play-button:before {
            top: 50%;
            left: 50%;
            transform: translate3d( -50%, -50%, 0 );
        }
        .vimeo iframe {
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
        }
    </style>
    <div class="vimeo">
        <div class="play-button"></div>
    </div>
</template>
<script>
(function(window, document, undefined) {

    // Refers to the "importer", which is index.html
    var thatDoc = document;

    // Refers to the "importee", which is vimeo-embed.html
    var thisDoc = (thatDoc._currentScript || thatDoc.currentScript).ownerDocument;

    // Gets content from <template>.
    var template = thisDoc.querySelector( 'template' ).content;

    // Shim Shadow DOM styles if needed
    if (window.ShadowDOMPolyfill) {
        WebComponents.ShadowCSS.shimStyling(template, 'vimeo');
    }

    class VimeoEmbed extends HTMLElement {

        constructor() {
            super();
            var shadowRoot =  this.attachShadow({mode:'open'});
           
            // Adds a template clone into shadow root.
            var clone = thatDoc.importNode( template, true );
            
            shadowRoot.appendChild( clone );

            var embed = this.getAttribute( "embed" );
            var video = shadowRoot.querySelector( ".vimeo" );

            this.createAndPlay( embed, video );
        }


        createAndPlay(embedID, videoElem) {
            videoElem.addEventListener( "click", function() {

                var iframe = document.createElement( "iframe" );

                iframe.setAttribute( "frameborder", "0" );
                iframe.setAttribute( "allowfullscreen", "" );
                iframe.setAttribute( "webkitallowfullscreen", "" );
                iframe.setAttribute( "mozallowfullscreen", "" );
                iframe.setAttribute( "src", "https://player.vimeo.com/video/" + embedID + "?autoplay=1" );
                iframe.setAttribute( "width", "640");
                iframe.setAttribute( "height", "360");

                this.innerHTML = "";
                this.appendChild( iframe );
            });
        }
    }
    window.customElements.define('vimeo-embed', VimeoEmbed);
})(window, document);
</script>
*/


/* --------------------------------------------------- */
    
/* --------------------------------------------------- */

/*******************************************************
 * 
 *******************************************************/

/* --------------------------------------------------- */
    
/* --------------------------------------------------- */
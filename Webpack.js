/*******************************************************
* Webpack Configuration
*******************************************************/

entry

	the starting point of your application

loaders

	 the transformations you want to make on your code

output
	
	where you want your compiled code to go


/*******************************************************
* Start
*******************************************************/

npm init

	generate package.json

npm install webpack --save-dev

	dev dependency

webpack.config.js

	create @ project root

module.exports = {
  entry: [
    './app/index.js' 	// where to start (entry)
  ],
  module: {				// what transformations to make on the code
    loaders: []
  }
}

e.g. 

	module: babel-loader

		browser to understand latest JS

		npm install babel-loader babel-core babel-preset-es2015 --save-dev

module.exports = {
  entry: [
    './app/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, 						// regex, webpack to only run this loader with .js
        include:  __dirname + '/app',		// Webpack to only run the loader on files in the myapp/app directory
        loader: 'babel?presets[]=es2015'	// Webpack transformation to run on all paths that match test and are in the include
      }
    ]
  },
  output: {
    filename: 'index_bundle.js',			// Webpack generated code
    path: __dirname + '/dist'				// dest of bundle
  }  
}

Note!

	HTML needs to reference the bundle


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

/*******************************************************
* 
*******************************************************/
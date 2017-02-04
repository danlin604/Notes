/*******************************************************
* 
*******************************************************/

setTimeout(function() {
    console.log('3 seconds have passed');
}, 3000);

/*******************************************************
* 
*******************************************************/


var time = 0;

setInterval(function() {
	time += 2;
	console.log(time + ' seconds have passed');
}, 2000);





var time = 0;

var timer = setInterval(function() {
	time += 2;
	console.log(time + ' seconds have passed');

    if (time > 5) {
        clearInterval(timer);
    }
    
}, 2000);




/*******************************************************
* 
*******************************************************/

console.log(__dirname);

console.log(__filename);



/*******************************************************
* 
*******************************************************/


// Function Expression

function callFunction(f) {
    f();
}

var sayHi = function() {
    console.log('Hoi');
};


callFunction(sayHi);


/*******************************************************
* 
*******************************************************/


// module
var counter = function(list) {
    return 'There are ' + list.length + ' elements in this array';
};

module.exports = counter;

// app.js
var counter = require('./count');

console.log(counter(
    ['danny', 'daniele', 'davis', 'dannyboi'])
);



/*******************************************************
* 
*******************************************************/


var counter = function(list) {
    return 'There are ' + list.length + ' elements in this array';
};

module.exports.counter = counter;



/*******************************************************
* 
*******************************************************/




var stuff = require('./stuff');

console.log(stuff.counter(
    ['danny', 'daniele', 'davis', 'dannyboi'])
);

console.log(stuff.adder(1,2));
console.log(stuff.adder(1,stuff.pi));


module.exports.counter = function(list) {
    return 'There are ' + list.length + ' elements in this array';
};

module.exports.adder = function(a,b) {
    return `The sum of the ${a} + ${b} is ${a+b}`;
};

module.exports.pi = 3.142;




/*******************************************************
* 
*******************************************************/



module.exports = {
	counter: 	counter,
	adder: 		adder,
	pi: 		pi
};





/*******************************************************
* 
*******************************************************/





var events = require('events');

var myEmitter = new events.EventEmitter();

myEmitter.on('someEvent', function(msg){
    console.log(msg);
});

myEmitter.emit('someEvent', 'the event was emitted');




/*******************************************************
* 
*******************************************************/






var events  = require('events');
var util    = require('util');

var Person  = function(name) {
    this.name = name;
};

util.inherits(Person, events.EventEmitter);

var james = new Person('james');
var mary = new Person('mary');
var ryu = new Person('ryu');

var people = [james, mary, ryu];


people.forEach(function(person) {
    person.on('speak', function(msg){
        console.log(`${person.name} said: ${msg}`);
    });
});

james.emit('speak', "hey dudes and dudettes");
ryu.emit('speak', "curry are the best");



/*******************************************************
*  Read / Write / Delete
*******************************************************/



var fs = require('fs');

var dummy = fs.readFileSync('dummy.txt', 'utf8');
console.log(dummy);






var fs = require('fs');

var dummy = fs.readFileSync('dummy.txt', 'utf8');

fs.writeFileSync('writeMe.txt', 'dummy');




var fs = require('fs');

fs.readFile('dummy.txt', 'utf8', function(err, data){
    console.log(data);
});



/* Delete */

var fs = require('fs');

fs.unlink('writeMe.txt');


/*******************************************************
* Create Directory
*******************************************************/


/* Create Sync */

var fs = require('fs');

fs.mkdirSync('stuff');


/* Delete Sync */

var fs = require('fs');

fs.rmdirSync('stuff');


/* Create Async /w callback */

var fs = require('fs');

fs.mkdir('stuff', function() {
    fs.readFile('readMe.txt', 'utf8', function(err, data) {
        fs.writeFile('./stuff/writeMe.txt', data);
    });
});

/* Delete Directory */

//Directory need to be empty first
var fs = require('fs');

fs.unlink('./stuff/writeMe.txt', function(){
    fs.rmdir('stuff'); 
});


/*******************************************************
* Creating a Server
*******************************************************/

/* http://127.0.0.1:3000/ */

const http = require('http');

const server = http.createServer(function(request, response){
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hey there');
});

server.listen(3000, '127.0.0.1');
console.log('Now listening to port 3000');



/* response url:  http://127.0.0.1:3000/hello/world */

const server = http.createServer(function(request, response){
    
    console.log(`request was made: ${request.url}`)
    
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hey there');
});

/*******************************************************
* Readable streams
*******************************************************/

const http = require('http')
const fs = require('fs')

const readStream = fs.createReadStream(`${__dirname}/readMe.txt`, 'utf8')

readStream.on('data', function(chunk){
    console.log('new chunk received:')
    console.log(chunk)
})

/*******************************************************
* Writable Stream
*******************************************************/

const http = require('http')
const fs = require('fs')

const readStream = fs.createReadStream(`${__dirname}/readMe.txt`, 'utf8')
const writeStream = fs.createWriteStream(`${__dirname}/writeMe.txt`);

readStream.on('data', function(chunk){
    console.log('new chunk received:')
    writeStream.write(chunk);
})

/*******************************************************
* Pipes
*******************************************************/

readStream.pipe(writeStream)



/* Stream file content to browser */

/* http://127.0.0.1:3000/ */

const http = require('http')
const fs = require('fs')

const server = http.createServer(function(request, response){    
    
    console.log(`request was made: ${request.url}`)    
    
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    const readStream = fs.createReadStream(`${__dirname}/readMe.txt`, 'utf8')
    readStream.pipe(response)
})

server.listen(3000, '127.0.0.1')
console.log('Now listening to port 3000')

/* Serve HTML page */

response.writeHead(200, { 'Content-Type': 'text/html' })
const readStream = fs.createReadStream(`${__dirname}/index.html`, 'utf8')


/*******************************************************
* Serving JSON
*******************************************************/

/* http://127.0.0.1:3000/ */

const http = require('http')
const fs = require('fs')

const server = http.createServer(function(request, response){        
    console.log(`request was made: ${request.url}`)        
    response.writeHead(200, { 'Content-Type': 'application/json' })

    let object = {
        name:   'daniel',
        job:    'programmer',
        age:    '50'
    }

    response.end(JSON.stringify(object))
})

server.listen(3000, '127.0.0.1')
console.log('Now listening to port 3000')

/*******************************************************
* Basic Routing
*******************************************************/

/* http://127.0.0.1:3000/ */

const http = require('http')
const fs = require('fs')

const server = http.createServer(function(request, response){        
    console.log(`request was made: ${request.url}`)        
    if (request.url === '/home' || request.url === '/') {

        response.writeHead(200, { 'Content-Type': 'text/html' })
        fs.createReadStream(`${__dirname}/index.html`).pipe(response)
    
    } else if (request.url === '/contact') {

        response.writeHead(200, { 'Content-Type': 'text/html' })
        fs.createReadStream(`${__dirname}/contact.html`).pipe(response)

    } else if (request.url === '/api/json') {

        let object = [
            {name: 'dan', age: 60}, 
            {name: 'tibor', age: 124}
        ]

        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify(object))

    } else {

        response.writeHead(404, { 'Content-Type': 'text/html' })
        fs.createReadStream(`${__dirname}/404.html`).pipe(response)

    }
})

server.listen(3000, '127.0.0.1')
console.log('Now listening to port 3000')


/*******************************************************
* ExpressJS
*******************************************************/

npm install express

npm uninstall express

/* Package management */

npm init

	name:
	version:
	description:
	entry point:
	test command:
	git repository:
	keywords:
	license:
	...

npm install express -save

	save dependencies to our package.json

npm uninstall express

	dependency on express remains in package.json

npm inatll 

	installs all dependencies


/*******************************************************
* Nodemon
*******************************************************/

/* Monitor application files, restarts server when file modified */

npm install -g nodemon 

	-g means global install

// node app.js --> nodemon app.js

nodemon app

/*******************************************************
* Responding to requests
*******************************************************/

GET

	app.get('route', fn)

POST

	app.post('route', fn)

DELETE

	app.delete('route', fn)





/* quick routing */

const express = require('express')
const app = express() // express methods

app.get('/', function(req, res) {
    res.send('this is the homepage')
})

app.get('/contact', function(req, res) {
    res.send('this is the contact page')
})

app.listen(3000)



/*******************************************************
* Express Routing
*******************************************************/

app.get('/profile/:id', function(req, res) {
    res.send(`you requested to see a profile with the id of ${req.params.id}`)
})




/*******************************************************
* Templating/View Engine: EJS
*******************************************************/

npm install ejs -save

app.set('view engine', 'ejs') // ejs as express view engine

/* /views/profile.ejs */

<body>
    <h1>Welcome to the profile of <%= person %></h1>
    <p><strong>Age: </strong><%= data.age %></p>
    <p><strong>Job: </strong><%= data.job %></p>
</body>

/* app.js */

app.get('/profile/:name', function(req, res) {
    let data = {
        age: 60,
        job: 'coder'
    }
    res.render('profile', {
        person: req.params.name,
        data: data
    })
})





/* loop */

<h2>Hobbies</h2>
<ul>
    <% data.hobbies.forEach(function(item) { %>
        <li>
            <%= item %> 
        </li>
    <% }) %>
</ul>

app.get('/profile/:name', function(req, res) {
    
    let data = {
        age: 60,
        job: 'coder',
        hobbies: ['eating', 'belching', 'napping']
    }

    res.render('profile', {
        person: req.params.name,
        data: data
    })
})




/* views/partial/nav.ejs */
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>


/* views/index.ejs */

...
<body>
    <% include partials/nav.ejs %>
...


/* app.js */
app.get('/', function(req, res) {
    res.render('index')
})




/*******************************************************
* Express middleware & static files (css)
*******************************************************/

/* index.html */
<link href="/assets/styles.css" rel="stylesheet" type="text/css" />

/* assets/styles.css */
body { background: skyblue; font-family: verdana; color: #fff; padding: 30px; }
h1 { font-size: 48px; text-transform: uppercase; letter-spacing: 2px; text-align: center; }
h2 { font-size: 30px; text-transform: uppercase; letter-spacing: 2px; text-align: center; }
p, li { font-size: 16px; text-align: center; }

/* app.js */
app.use('/assets', express.static('assets')) // use middleware



/*******************************************************
* Query String
*******************************************************/

/* http://127.0.0.1:3000/contact?dept=5&person=joe */

app.get('/contact', function(req, res) {
    console.log(req.query) // { dep: '5', person: 'joe' }
    res.render('contact')
})




res.render('contact', { qs: req.query })

/* Call query-string object passed by the .render method

	<p><%= qs.dept %></p>
	<p><%= qs.person %></p>
*/

/* Form

    <form id="contact-form">
        <label for="who">Who do you want to contact?</label>
        <input type="text" name="who" value="<%= qs.person %>" />
        <label for="department">Which department?</label>
        <input type="text" name="department" value="<%= qs.dept %>" />
        <label for="email">Your email</label>
        <input type="email" name="email" />
        <input type="submit" value="submit" />
    </form>
*/


/*******************************************************
* Express body-parser middleware
*******************************************************/

/* url: https://www.npmjs.com/package/body-parser */

npm install body-parser -save


/*	POST form
    <form id="contact-form" method="POST" action="/contact">
        <label for="who">Who do you want to contact?</label>
        <input type="text" name="who" value="<%= qs.person %>" />
        <label for="department">Which department?</label>
        <input type="text" name="department" value="<%= qs.dept %>" />
        <label for="email">Your email</label>
        <input type="email" name="email" />
        <input type="submit" value="submit" />
    </form>
*/

app.post('/contact', urlencodedParser,  function(req, res) {
    console.log(req.body) // { who: 'dan', department: 'IT', email: 'dan@gmail.ca' }
    res.render('contact-success', { data: req.body })
})

/*
    <p>You contacted <%= data.who %> in the <%- data.department%> department.</p>
    <p>We will reply to you at <%= data.email %></p>    
*/

/*******************************************************
* Todo List
*******************************************************/

/* todoController.js */

const bodyParser = require('body-parser')

let data = [
    {item: 'get milk'},
    {item: 'walk dog'},
    {item: 'kick ass'}
]

const urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        res.render('todo', {todos: data})
    })

    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body)
        res.json(data)
    })

    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo) {
            return todo.item.replace(/ /g, '-') !== req.params.item
        })
        res.json(data)
    })
}

/* todo-list.js - jquery*/

$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});

/* todo.ejs 

    <h1>My Todo List</h1>
    <div id="todo-table">
        <form>
            <input type="text" name="item" placeholder="Add new item..." required />
            <button type="submit">Add Item</button>
        </form>
        <ul>
            <% for(let i = 0; i < todos.length; i++) { %>
                <li><%= todos[i].item %></li>
            <% } %>
        </ul>
    </div>

    <script src="/assets/todo-list.js"></script>
*/

/* app.js */

const express = require('express')
const todoController = require('./controllers/todoController')

const app = express() // express methods

// setup template engine
app.set('view engine', 'ejs')

// static files
app.use(express.static('./public'))

// fire controllers
todoController(app)

// listen to port
app.listen(3000)
console.log('You are listening to port 3000')


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
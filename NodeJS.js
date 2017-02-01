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


/*******************************************************
* 
*******************************************************/



/*******************************************************
* 
*******************************************************/



/*******************************************************
* 
*******************************************************/



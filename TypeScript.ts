/* -------------------------------------------------- */
	TypeScript
/* -------------------------------------------------- */

Superset of JavaScript

	Any valid JavaScript code will work.

TypeScript --> Transpiles --> JavaScript



// Installing

	npm install -g typescript

	tsc --version


// Getting started

	mkdir typescript // create dir

	code main.ts // create & open file


// Hello World

	function log(message) {
	    console.log(message);
	}
	var message = 'Hello World';
	log(message);


	$ tsc main.ts // transpiles --> main.js

	// Transpile and run main.js
	$ tsc main.ts | node main.js


// NOTE

	By default, TypeScript compiles to ES5, which does not have let keyword, instead var is used.

	// main.ts
	function x() {
	    for (let i = 0; i < 5; i++) {
	        console.log(i);
	    }
	    console.log(i);
	}
	x();

	// main.js
	function x() {
	    for (var i = 0; i < 5; i++) { // var is scoped differently
	        console.log(i);
	    }
	    console.log(i);
	}
	x();



/* -------------------------------------------------- */
	Types
/* -------------------------------------------------- */

// ts

	let count = 5;
	count = 'a'; // type error

	// Code will transpile correctly, because this is valid JS


// Types 

	let a: any;
	let a: number;
	let a: boolean;
	let a: string;
	let a: number[] = [1, 2, 3];
	let a: any[] = [1, true, 'a', false];

// Enum

	enum Color { Red = 0, Green = 1, Blue = 2 }; // Explicit # for maintainability
	let backgroundColor = Color.Red;


// Type Assertions

	let message; // : any
	message = 'abc';
	let endsWithC = (<string>message).endsWith('c');
	let alternative = (message as string).endsWith('c');


// arrow function

	// normal function
	let log = function(message) {
		console.log(message);
	}

	// ts
	let log = (message) => { 
		console.log(message) 
	};

	// or
	let log = (message) => console.log(message);

	// no param
	let log = () => console.log();


// Custom types

	interface Point() {
		x: number,
		y: number
	}

	let drawPoint = (point: Point) => {
		// ...
	}

	let getDistance = (pointA: Point, pointB: Point) => {
		// ...
	}

	drawPoint({
		x: 1,
		y: 3
	})



/* -------------------------------------------------- */
	Class	
/* -------------------------------------------------- */

OO values Cohesion!

/* Interface Implementation
	
	interface Point() {
		x: number,
		y: number,
		drawPoint: () => void
	}
*/

	// cohesive class
	class Point {
	    x: number;
	    y: number;

	    constructor(x?: number, y?: number) { // ? is optional
	        this.x = x;
	        this.y = y;
	    }
	    
	    draw() {
	        console.log('x: ' + this.x, ', y: ' + this.y);
	    }

	    getDistance(another: Point) {
	        // ...
	    }
	}

	let point: Point = new Point();
	point.draw();



// Access Modifiers

	class Point {
	    private x: number;
	    private y: number;

	    constructor(x?: number, y?: number) { // ? is optional
	    	// ...
	    }
	}

// NOTE 

	public is default


// Simplified

	class Point {
	    constructor(private x?: number, public y?: number) {
	        // typescript will generate param variables
	    }
	}



// Getter and Setter

	// cohesive class
	class Point {
	    constructor(private _x?: number, private _y?: number) {
	        // typescript will generate param variables
	    }
	    
	    draw() {
	        console.log('x: ' + this.x, ', y: ' + this.y);
	    }

	    getDistance(another: Point) {
	        // ...
	    }

	    get x() {
	        return this.x;
	    }

	    getY() {
	        return this.y;
	    }

	    set x(value) {
	        if (value < 0) {
	            throw new Error('value cannot be less than 0');
	        }
	    }

	    setY(value) {
	        if (value < 0) {
	            throw new Error('value cannot be less than 0');
	        }
	    }
	}

	let point: Point = new Point();
	let x = point.x;
	let y = point.getY();
	point.x = x;
	point.setY(5);
	point.draw();



/* -------------------------------------------------- */
	Modules
/* -------------------------------------------------- */

// point.ts

	export class Point {
	    constructor(private _x?: number, private _y?: number) {
	        // typescript will generate param variables
	    }
	    
	    draw() {
	        console.log('x: ' + this._x, ', y: ' + this._y);
	    }
	}

// main.ts

	import { Point } from './point';

	let point: Point = new Point(1, 2);
	point.draw();



// Example

	// like.component.ts
	export class LikeComponent {
	    constructor(private _likesCount: number, private _isSelected: boolean) { 
	        // init variables
	    }

	    onClick() {
	        this._likesCount += (this._isSelected) ? -1 : +1;
	        this._isSelected = !this._isSelected; // toggle
	    }

	    get likesCount() {
	        return this._likesCount;
	    }

	    get isSelected() {
	        return this._isSelected;
	    }
	}

	// main.ts
	import { LikeComponent } from './like.component';

	let component = new LikeComponent(10, true);
	component.onClick();
	console.log(`likesCount: ${component.likesCount}, isSelected: ${component.isSelected}`);

// target ES5 or heigher40

	tsc *.ts -- target ES5 && node main.js



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
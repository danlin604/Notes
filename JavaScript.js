/*******************************************************
 * Print
 *******************************************************/

document.write("Hello");
document.getElementById("id").innerHTML = "Hello";
window.alert("Hello");
console.log("Hello");

/*******************************************************
 * Map
 *******************************************************/

var myMap = new Map();

var keyString = "key",
    keyObj = {},
    keyFunc = function () {};

myMap.set(keyString, "value");
myMap.set(0, "zero");

myMap.get(keyString);
myMap.get("key");

myMap.delete(key);

myMap.clear();                          // Remove all elements

myMap.has(key);                         // Element exists, boolean

myMap.size;

// Show all key-value pairs
for (var [key, value] of myMap) {
  console.log(key + " = " + value);
}

for (var value of myMap.values()) {     // Option: myMap.keys()
  console.log(value);
}

myMap.forEach(function(value, key) {
  console.log(key + " = " + value);
});

/*******************************************************
 * Increment ACSII alphabet, RegExp, captialize vowels
 *******************************************************/

function changeString(str) {

  // Increment alphabets
  var replaced = str.replace(/[a-z]/gi, function(char) {
      return (char === 'z' || char === 'Z') ? 'a' : String.fromCharCode(char.charCodeAt() + 1);
  });

  // Captialize vowels
  var captialized = replaced.replace(/a|e|i|o|u/g, function(vowel) {
      return vowel.toUpperCase();
  });
  
  return captialized;
}

 /*******************************************************
 * Reverse string
 *******************************************************/

const s = 'hello'

function reverse(s) {
    s = s || ''
    let reversed = ''
    for(let i = s.length - 1; i >= 0; i--) {
        reversed += s.charAt(i)
    }
    return reversed
}

/* Alternative */

function reverse(s) {

	var arr = s.split("");
	var tmp = "";

	for (var i = 0; i < Math.floor(arr.length / 2); i++) {    		
    	tmp = arr[i];        
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = tmp;   
    }
    
    return arr.join("");
}

 /*******************************************************
 * Palindrome
 *******************************************************/

var test1 = "Anna", 
    test2 = "AnaNa",
    test3 = "H e   nr   y",
    test4 = "Eva Can I Stab Bats In A Cave";

function palindrome(s) {
    
	s = s.toLowerCase();
	s = s.replace(/\s/g,'');            // Ignore white-space

	var len = Math.floor(s.length / 2);

	for ( var i = 0; i < len; i++) {
		if (s.charAt(i) !== s.charAt(s.length - 1 - i)) {
			return false;
		}
	}
	return true;
}

 /*******************************************************
 * Binary search array
 *******************************************************/

function binarySearch(array, targetValue) {

	var min = 0,
	    max = array.length - 1;

	while (max >= min) {

		var mid = Math.floor((max + min) / 2);

		if (array[mid] < targetValue) {			    // Search higher
			min = mid + 1;
		} else if (array[mid] > targetValue) {		// Search lower
			max = mid - 1;
		} else {	// Exist
			return true;
		}
	}
	return false;                                   // Not exist
}

 /*******************************************************
 * Tree
 *******************************************************/

// Tree ctor
function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree(data) {
    var node = new Node(data);
    this._root = node;
}

// DFS
Tree.prototype.traverseDF = function(callback) {
    // this is a recurse and immediately-invoking function
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        } 
        // step 4
        callback(currentNode);         
        // step 1
    })(this._root);
};

// BFS
Tree.prototype.traverseBF = function(callback) {
    var queue = [];
    queue.push(this._root);
    currentNode = queue.shift();

    while(currentNode) {
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            queue.push(currentNode.children[i]);
        }
        callback(currentNode);
        currentNode = queue.shift();
    }
};

// Add node to tree
Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};

Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }

};

// Remove node from tree 
Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, data);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    } 
    return childToRemove;
};

function findIndex(arr, data) {
    var index;
 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
            index = i;
        }
    }
 
    return index;
}


/* Executer code here */

/* 
creates this tree:

 one (depth: 0)
 ├── two (depth: 1)
 │   ├── five (depth: 2)
 │   └── six (depth: 2)
 ├── three (depth: 1)
 └── four (depth: 1)
     └── seven (depth: 2)
*/

var tree = new Tree('one');

tree._root.children.push(new Node('two'));
tree._root.children[0].parent = tree;
 
tree._root.children.push(new Node('three'));
tree._root.children[1].parent = tree;
 
tree._root.children.push(new Node('four'));
tree._root.children[2].parent = tree;
 
tree._root.children[0].children.push(new Node('five'));
tree._root.children[0].children[0].parent = tree._root.children[0];
 
tree._root.children[0].children.push(new Node('six'));
tree._root.children[0].children[1].parent = tree._root.children[0];
 
tree._root.children[2].children.push(new Node('seven'));
tree._root.children[2].children[0].parent = tree._root.children[2];


/* Execution output appears here */

// DFS
document.write("<br>traverseDF<br>");
tree.traverseDF(function(node) {
    document.write(node.data + "<br>");
});

// BFS
document.write("<br>traverseBF<br>");
tree.traverseBF(function(node) {
    document.write(node.data + "<br>");
});

// Add
var tree = new Tree('CEO');
 
tree.add('VP of Happiness', 'CEO', tree.traverseBF);
tree.add('VP of Finance', 'CEO', tree.traverseBF);
tree.add('VP of Sadness', 'CEO', tree.traverseBF);
 
tree.add('Director of Puppies', 'VP of Finance', tree.traverseBF);
tree.add('Manager of Puppies', 'Director of Puppies', tree.traverseBF); 
/* 
 tree:
 
 'CEO'
 ├── 'VP of Happiness'
 ├── 'VP of Finance'
 │   ├── 'Director of Puppies'
 │   └── 'Manager of Puppies'
 └── 'VP of Sadness' 
 */
document.write("<br>Add nodes to tree<br>");
tree.traverseBF(function(node) {
    document.write(node.data + "<br>");
});


// Remove node

tree.remove('Director of Puppies', 'VP of Finance', tree.traverseBF);
document.write("<br>Remove a node<br>");

tree.traverseBF(function(node) {
    document.write(node.data + "<br>");
});


 /*******************************************************
 * peakPopulation
 *******************************************************/

var person = {};

var birth = [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000];
var death = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010];
var range;
var low;
var high;

function weighPopulation(birth, death) {
	low = 9999;
	high = 0;
	for (i = 0; i < birth.length; i++) {
		if (birth[i] < low) {
			low = birth[i];
		}
		if (death[i] > high) {
			high = death[i];
		}
	}

	range = new Array(high - low + 1);
	range.fill(0);
	for (j = 0; j < birth.length; j++) {
		var begin 	= birth[j] - low;
		var end 	= death[j] - low;
		for (k = begin; k <= end; k++) {
			range[k]++;
		}
	}
}

function populationPeak(range) {
	var max = 0;
	for (m = 0; m < range.length; m++) {
		if (range[m] > max) {
			max = range[m];
		}
	}

	for (n = 0; n < range.length; n++) {
		var date = low + n;
		if (range[n] === max) {
			document.write("Population peaked: " + date + ", " + range[n]);
			document.write("<br>");
		}
	}
}

//Test cases
weighPopulation(birth, death);
for (l = 0; l < range.length; l++) {
	var date = low + l;
	document.write("Year: " + date + ", " + range[l]);
	document.write("<br>");
}
populationPeak(range);


 /*******************************************************
 * Working with Objects
 *******************************************************/

//objectName.propertyName

var myCar = new Object();
myCar.make = "Ford";
myCar.model = "Mustang";
myCar.year = 1969;

myCar.color; // undefined

myCar["make"] = "Ford";
myCar["model"] = "Mustang";
myCar["year"] = 1969;

var myObj = new Object(),
    str = "myString",
    rand = Math.random(),
    obj = new Object();

function showProps(obj, objName) {
  var result = "";
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      result += objName + "." + i + " = " + obj[i] + "\n";
    }
  }
  return result;
}

function listAllProperties(o) {
	var objectToInspect;     
	var result = [];
	
	for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)){  
      result = result.concat(Object.getOwnPropertyNames(objectToInspect));  
	}
	
	return result; 
}

var obj = { property_1:   value_1,   // property_# may be an identifier...
            2:            value_2,   // or a number...
            // ...,
            "property n": value_n }; // or a string





/* Using a constructor function */

function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}

var rand = new Person("Rand McKinnon", 33, "M");
var ken = new Person("Ken Jones", 39, "M");

function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}

var car1 = new Car("Eagle", "Talon TSi", 1993, rand);
var car2 = new Car("Nissan", "300ZX", 1992, ken);







/* Using the Object.create method */

// Animal properties and method encapsulation
var Animal = {
  type: "Invertebrates", // Default value of properties
  displayType : function() {  // Method which will display type of Animal
    console.log(this.type);
  }
}

// Create new animal type called animal1 
var animal1 = Object.create(Animal);
animal1.displayType(); // Output:Invertebrates

// Create new animal type called Fishes
var fish = Object.create(Animal);
fish.type = "Fishes";
fish.displayType(); // Output:Fishes



 /*******************************************************
 * Implement a Stack
 *******************************************************/

/* Simple */

var stack = [];
stack.push(2);       // stack is now [2]
stack.push(5);       // stack is now [2, 5]
var i = stack.pop(); // stack is now [2]
alert(i);            // displays 5

/* Better */

function Stack() {
    this._size = 0;
    this._storage = {};
}

Stack.prototype.push = function(data) {
    // increases the size of our storage
    var size = this._size++;
 
    // assigns size as a key of storage
    // assigns data as the value of this key
    this._storage[size] = data;
};

Stack.prototype.pop = function() {
    var size = this._size,
        deletedData;
 
    if (size) {
        deletedData = this._storage[size];
 
        delete this._storage[size];
        this._size--;
 
        return deletedData;
    }
};


 /*******************************************************
 * Implement a Queue
 *******************************************************/

/* Simple */ 

var queue = [];
queue.push(2);         // queue is now [2]
queue.push(5);         // queue is now [2, 5]
var i = queue.shift(); // queue is now [5]
alert(i);              // displays 2

/* Better */

//enqueue(data)        adds data to a queue. 
//dequeue              removes the oldest added data to a queue.  

function Queue() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
}
 
Queue.prototype.size = function() {
    return this._newestIndex - this._oldestIndex;
};
 
Queue.prototype.enqueue = function(data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
};
 
Queue.prototype.dequeue = function() {
    var oldestIndex = this._oldestIndex,
        newestIndex = this._newestIndex,
        deletedData;
 
    if (oldestIndex !== newestIndex) {
        deletedData = this._storage[oldestIndex];
        delete this._storage[oldestIndex];
        this._oldestIndex++;
 
        return deletedData;
    }
};



 /*******************************************************
 * Merge Sort
 *******************************************************/

var list = generateRandomList(100);
list = mergeSort(list);

function mergeSort(list) {
    if (!list || list.length < 2) {
        return list
    }

    let mid = Math.floor(list.length / 2)
    let lhs = mergeSort(list.slice(0, mid))
    let rhs = mergeSort(list.slice(mid))

    return merge(lhs, rhs)
}

function merge(lhs, rhs) {
    let merged = []
    let l = 0, r = 0 // Index
    while(true) {
        if (l >= lhs.length ) {
            return merged.concat(rhs.slice(r))
        }
        else if (r >= rhs.length) {
            return merged.concat(lhs.slice(l))
        }
        else if (lhs[l] < rhs[r]) {
            merged.push(lhs[l++])
        }
        else {
            merged.push(rhs[r++])
        }
    }   
}

function generateRandomList(length) {    
    list = new Array();
    for (var i = 0; i < length; i++) {
        list.push(getRandomIntInclusive(1, length * 5));        
    }
    return list;
}

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Print
document.write("Length: " + list.length + "<br>");
for (let value of list) {    
    document.write("Value: " + value + "<br>");
}





 /*******************************************************
 * Set (unique values)
 *******************************************************/

var mySet = new Set();

mySet.add(1);
mySet.add(5);
mySet.add("some text");
var o = {a: 1, b: 2};
mySet.add(o);

mySet.add({a: 1, b: 2}); // o is referencing a different object so this is okay

mySet.has(1); // true
mySet.has(3); // false, 3 has not been added to the set
mySet.has(5);              // true
mySet.has(Math.sqrt(25));  // true
mySet.has("Some Text".toLowerCase()); // true
mySet.has(o); // true

mySet.size; // 5

mySet.delete(5); // removes 5 from the set
mySet.has(5);    // false, 5 has been removed

mySet.size; // 4, we just removed one value

// iterate over items in set
// logs the items in the order: 1, "some text", {"a": 1, "b": 2} 
for (let item of mySet) console.log(item);

// logs the items in the order: 1, "some text", {"a": 1, "b": 2} 
for (let item of mySet.keys()) console.log(item);
 
// logs the items in the order: 1, "some text", {"a": 1, "b": 2} 
for (let item of mySet.values()) console.log(item);

// logs the items in the order: 1, "some text", {"a": 1, "b": 2} 
//(key and value are the same here)
for (let [key, value] of mySet.entries()) console.log(key);

// convert Set object to an Array object, with Array.from
var myArr = Array.from(mySet); // [1, "some text", {"a": 1, "b": 2}]

// the following will also work if run in an HTML document
mySet.add(document.body);
mySet.has(document.querySelector("body")); // true

// converting between Set and Array
mySet2 = new Set([1,2,3,4]);
mySet2.size; // 4
[...mySet2]; // [1,2,3,4]

// intersect can be simulated via 
var intersection = new Set([...set1].filter(x => set2.has(x)));

// difference can be simulated via
var difference = new Set([...set1].filter(x => !set2.has(x)));

// Iterate set entries with forEach
mySet.forEach(function(value) {
  console.log(value);
});


 /*******************************************************
 * Factorial
 *******************************************************/

function factorial(num) { 
    
  var result = 1;
    
  for (var i = 1; i <= num; i++) {
    result *= i;
  }
  
  return result;         
}


 /*******************************************************
 * Regular Expression Patterns
 *******************************************************/

/* Matching a Username */
/^[a-z0-9_-]{3,16}$/            // Matches:     my-us3r_n4m3
                                // Mismatch:    th1s1s-wayt00_l0ngt0beausername (too long)

/* Matching a Password */	
/^[a-z0-9_-]{6,18}$/            // Matches:     myp4ssw0rd
                                // Mismatch:    mypa$$w0rd (contains a dollar sign)

/* Matching a Hex Value */
/^#?([a-f0-9]{6}|[a-f0-9]{3})$/ // Matches:     #a3c113
                                // Mismatch:    #4d82h4 (contains the letter h)

/* Matching a Slug */ 	
/^[a-z0-9-]+$/                  // Matches:     my-title-here
                                // Mismatch:    my_title_here (contains underscores)

/* Matching an Email */
/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

/* Matching a URL */
/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

/* Matching an IP Address */
/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

/* Matching an HTML tag */
/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/


 /*******************************************************
 * Re-introducing JavaScript
 *******************************************************/

Math.sin(3.5);
var circumference = Math.PI * (r + r);

parseInt("123", 10); // 123
parseInt("010", 10); // 10

isNaN(NaN); // true

isFinite(1/0); // false
isFinite(-Infinity); // false
isFinite(NaN); // false

"hello".charAt(0); // "h"
"hello, world".replace("hello", "goodbye"); // "goodbye, world"
"hello".toUpperCase(); // "HELLO"

Boolean("");  // false
Boolean(234); // true

for (var i = 0; i < 5; i++) {
  // Will execute 5 times
}

for(let value of array) {
  // do something with value
}

for(let property in object) {
  // do something with object property
}

// Checks for null object
var name = o && o.getName();

var name = otherName || "default";

// Ternary operator
var allowed = (age > 18) ? "yes" : "no";

switch(action) {
  case 'draw':
    drawIt();
    break;
  case 'eat':
    eatIt();
    break;
  default:
    doNothing();
}

 /*******************************************************
 * Array
 *******************************************************/

var a = new Array();
a[0] = "dog";
a[1] = "cat";
a[2] = "hen";
a.length; // 3

var a = ["dog", "cat", "hen"];
a.length; // 3

var a = ["dog", "cat", "hen"];
a[100] = "fox";
a.length; // 101

typeof a[90]; // undefined

["dog", "cat", "hen"].forEach(function(currentValue, index, array) {
  // Do something with currentValue or array[index]
});






 /*******************************************************
 * Tries
 *******************************************************/

function Trie() {
	this.head = {
		key : '',
		children: {}
	}
}

Trie.prototype.add = function(key) {

	var curNode = this.head
		, newNode = null
		, curChar = key.slice(0,1);

	key = key.slice(1);
	
	while(typeof curNode.children[curChar] !== "undefined" 
		&& curChar.length > 0){
		curNode = curNode.children[curChar];
		curChar = key.slice(0,1);
		key = key.slice(1);
	}

	while(curChar.length > 0) {
		newNode = {
				key : curChar
			, value : key.length === 0 ? null : undefined
			, children : {}
		};

		curNode.children[curChar] = newNode;

		curNode = newNode;

		curChar = key.slice(0,1);
		key = key.slice(1);
	}

};

Trie.prototype.search = function(key) {
	var curNode = this.head
		, curChar = key.slice(0,1)
		, d = 0;

	key = key.slice(1);

	while(typeof curNode.children[curChar] !== "undefined" && curChar.length > 0){
		curNode = curNode.children[curChar];
		curChar = key.slice(0,1);
		key = key.slice(1);
		d += 1;
	}

	if (curNode.value === null && key.length === 0) {
		return d;
	} else {
		return -1;
	}

}

Trie.prototype.remove = function(key) {
	var d = this.search(key);
	if (d > -1){
		removeH(this.head, key, d);
	}
}

function removeH(node, key, depth) {
	if (depth === 0 && Object.keys(node.children).length === 0){
		return true;
	} 

	var curChar = key.slice(0,1);

	if (removeH(node.children[curChar], key.slice(1), depth-1)) {
		delete node.children[curChar];
		if (Object.keys(node.children).length === 0) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

 /*******************************************************
 * Find specific pair sum in a list 
 *******************************************************/

/* Brute force */

function hasSum(list, target) {

    for (var i = 0; i < list.length; i++) {

        if (list | list[i] > target) { return false; }

        var difference = target - list[i];

        for (var j = i + 1; j < list.length; j++) {
            if (list[j] === difference)     { return true; }
            if (list[j] > target)           { break; }
        }    
    }  
}

/* Binary search */

function hasSum(list, target) {

    for (var i = 0; i < list.length; i++) {

        if (list | list[i] > target) { return false; }

        var difference = target - list[i];
        
        if (binarySearch(list, difference)) { return true; }
    }  
}

function binarySearch(array, targetValue) {

	var min = 0,
	    max = array.length - 1;

	while (max >= min) {

		var mid = Math.floor((max + min) / 2);

		if (array[mid] < targetValue) {			    // Search higher
			min = mid + 1;
		} else if (array[mid] > targetValue) {		// Search lower
			max = mid - 1;
		} else if (array[mid] === targetValue) {	// Exist
			return true;
		} else {
			// Unexpected
		}
	}
	return false;                                   // Not exist
}

/* More efficient for sorted array; highIdx + lowIdx */

function hasSum(list, target) {

		var lowIdx 	= 0,
    		highIdx = list.length - 1;
    
    while (lowIdx < highIdx) {
    		if 			(list[lowIdx] + list[highIdx] === target) { return true; }
        else if (list[lowIdx] + list[highIdx] > target)		{ highIdx--;   }
        else if (list[lowIdx] + list[highIdx] < target)		{ lowIdx++;    }
    }
    
    return false;    
}

/* Unsorted Map N */

function hasSum(list, target) {

    var set = new Set();

    for (var i = 0; i < list.length; i++) {

        if (set.has(target - list[i])) { 
            return true; 
        } else {            
            set.add(list[i]);
        }
    }

    return false;
}



 /*******************************************************
 * Quick Sort
 *******************************************************/

var list = [2, 1, 5, 4, 3];

function quicksort(items, left, right) {

	var mid = partition(items, left, right);
    
    if (left < mid - 1) {
    	quicksort(items, left, mid - 1);
    }
    
    if (right > mid) {
    	quicksort(items, mid, right);
    }

	return items;
}

function partition(items, left, right) {

	var pivot	= items[(left + right) >>> 1];
        
    while (left <= right) {
    
    	while (items[left] < pivot) { left++; }
        
        while (items[right] > pivot) { right--; }
        
        if (left <= right) {
        	var temp = swap(items, left++, right--);
        }    
    }
    
    return left;
}

function swap(items, first, second) {
	var temp = items[first];    
    items[first] = items[second];    
    items[second] = temp;
}

console.log(quicksort(list, 0, list.length - 1));


 /*******************************************************
 * Bubble Sort
 *******************************************************/

function bubbleSort(theArray) {
     var i, j;
     for (i = theArray.length - 1; i >= 0; i--) {
         for (j = 0; j <= i; j++) {
             if (theArray[j + 1] < theArray[j]) {
                var temp = theArray[j];
                theArray[j] = theArray[j + 1];
                theArray[j + 1] = temp;
             }
         }
     }
    return theArray;
 }

 /*******************************************************
 * Count negative in rows and columns
 *******************************************************/

var items = [
    [-3, -2, -1, 1],
    [-2, 2, 3, 4],
    [4, 5, 7, 8]
];

function countNegatives(items) {

    var index = items[0].length - 1,
        count = 0;
    
    for (var i = 0; i < items.length; i++) {

        for (var j = index; j >= 0; j--) {
            if (items[i][j] < 0) {
                index = j;
                count += j + 1;
                break;
            }            
        }
    }

    return count;
}

 /*******************************************************
 * Max Sum Subarray
 *******************************************************/

var list = [1, 1, -1, -1, 3, -3, 5, -1];

function maxSum(list) {
		
    var max = 0,
    	sum = 0;
    
    for (var i = 0; i < list.length; i++) {
    		        
        if (sum <= 0) {                 
            sum = 0;				// New subarray
        }
        
        sum += list[i];                 
        
        if (max < sum) {
            max = sum;              // New Max
        }
    }

    return max;
}

/* better */

//Kadane's Algo

//Compare local subarrays: previous subarray + current VS current

 /*******************************************************
 * Linked List
 *******************************************************/

/* Singly */

function Node(data) {
    this.data = data;
    this.next = null;
}
 
function SinglyList() {
    this._length = 0;
    this.head = null;
}
 
SinglyList.prototype.add = function(value) {
    var node = new Node(value),
        currentNode = this.head;
 
    // 1st use-case: an empty list
    if (!currentNode) {
        this.head = node;
        this._length++;
 
        return node;
    }
 
    // 2nd use-case: a non-empty list
    while (currentNode.next) {
        currentNode = currentNode.next;
    }
 
    currentNode.next = node;
 
    this._length++;
     
    return node;
};
 
SinglyList.prototype.searchNodeAt = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};
 
    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: a valid position
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }
 
    return currentNode;
};
 
SinglyList.prototype.remove = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 0,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;
 
    // 1st use-case: an invalid position
    if (position < 0 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: the first node is removed
    if (position === 1) {
        this.head = currentNode.next;
        deletedNode = currentNode;
        currentNode = null;
        this._length--;
         
        return deletedNode;
    }
 
    // 3rd use-case: any other node is removed
    while (count < position) {
        beforeNodeToDelete = currentNode;
        nodeToDelete = currentNode.next;
        count++;
    }
 
    beforeNodeToDelete.next = nodeToDelete.next;
    deletedNode = nodeToDelete;
    nodeToDelete = null;
    this._length--;
 
    return deletedNode;
};



/* Doubly */

function Node(value) {
    this.data = value;
    this.previous = null;
    this.next = null;
}
 
function DoublyList() {
    this._length = 0;
    this.head = null;
    this.tail = null;
}
 
DoublyList.prototype.add = function(value) {
    var node = new Node(value);
 
    if (this._length) {
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
    } else {
        this.head = node;
        this.tail = node;
    }
 
    this._length++;
 
    return node;
};
 
DoublyList.prototype.searchNodeAt = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};
 
    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: a valid position
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }
 
    return currentNode;
};
 
DoublyList.prototype.remove = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;
 
    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: the first node is removed
    if (position === 1) {
        this.head = currentNode.next;
 
        // 2nd use-case: there is a second node
        if (!this.head) {
            this.head.previous = null;
        // 2nd use-case: there is no second node
        } else {
            this.tail = null;
        }
 
    // 3rd use-case: the last node is removed
    } else if (position === this._length) {
        this.tail = this.tail.previous;
        this.tail.next = null;
    // 4th use-case: a middle node is removed
    } else {
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }
 
        beforeNodeToDelete = currentNode.previous;
        nodeToDelete = currentNode;
        afterNodeToDelete = currentNode.next;
 
        beforeNodeToDelete.next = afterNodeToDelete;
        afterNodeToDelete.previous = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
    }
 
    this._length--;
 
    return message.success;
};

 /*******************************************************
 * Find equal subarrays between pivot
 *******************************************************/

var list = [-1, 1, 0, 0, 0, 1, 5, 1];

function getVal(A) {
		
    var totalSum = 0,
    	temp = 0,
        lhs = 0,
        rhs = 0;
    
    for (var i = 0; i < A.length; i++) {        // Get total sum   		
        totalSum += A[i];   
    }
    
    for (var i = 0; i < A.length; i++) {        // Find equal
    
    	if (A[i] < 0) {

            lhs += A[i];  

        } else {   

            pivot = A[i];
            
            rhs = totalSum - pivot - lhs;
            
            if(lhs === rhs) {

            	return pivot;

            }

        	lhs += A[i];		    
        }  		
    }    
    return false;
}

console.log("pivot: " + getVal(list));

 /*******************************************************
 * Squish and round highest pair of numbers
 *******************************************************/

function squish(n) {	// all input should be string

		var s = n + "",
    		round = 0,
    		largestPair = -1,
    		largestPairString = "";
        
    if (s === 'undefined'   || 
    	s.length < 2        ||
        n < 0               ||
        isNaN(n))
    {
    		return n;
    }
	
  	for (var i = 0; i < s.length - 1; i++) {
        		
        round = Math.ceil( (parseInt(s.charAt(i), 10) + parseInt(s.charAt(i + 1), 10)) / 2 );
        
        if (round > largestPair) {        		
            largestPair = round;
            largestPairString = s.charAt(i) + s.charAt(i + 1);
        }       
    }
    
    return s.replace(largestPairString, largestPair.toString()); 
}

 /*******************************************************
 * Printing press for new book using Set
 *******************************************************/

function printable(src, dest) {

	var letters = new Set();
    
    for (var i = 0; i < src.length; i++) {
    	if (!letters.has(src.charAt(i))) {
       		letters.add(src.charAt(i));
        }
    }
    
    for (var i = 0; i < dest.length; i++) {
    	if (letters.has(dest.charAt(i))) {
       		letters.delete(dest.charAt(i));
        }
        
        if (letters.size === 0) {
       		return true;
        }
    }
    
    return false;
}

 /*******************************************************
 * Printing press for new book using dictionary
 *******************************************************/

var book1 = "Aaa aab";
var book2 = "aAa aba";

function printable(src, dest) {

	var letters = new Map(),
    	key = "",
        val = 0;
    
    for (var i = 0; i < src.length; i++) {
    
    	key = src.charAt(i);        
    
    	if(!letters.has(key)) {        
        	letters.set(src.charAt(i), 1);
        } else {
        	val = letters.get(src.charAt(i)) + 1;
        	letters.set(key, val);
        }      
    }    
    
    for (var i = 0; i < dest.length; i++) {
    
    	key = dest.charAt(i);        
    
    	if(!letters.has(key)) {
        	return false;
        } else {
        	val = letters.get(dest.charAt(i)) - 1;
        	letters.set(key, val);
            
            if (val < 0) {
            	return false;
            }
        }    
    }
    
		return true;
}

 /*******************************************************
 * Replace white space
 *******************************************************/

var input = "Mr John Smith    ";

// output = "Mr%20Dohn%20Smith"

function replaceSpace(s) {

	var result = "";

	for (var i = 0; i < s.length; i++) {   		
        
        if (result.length === s.length) {
        	return result;
        }
    
    	if (s.charAt(i) === " ") {        
        	result += "%20";	        
        } else {
        	result += s.charAt(i);
        }   
    }
}


/* Better */

var input = "Mr John Smith    ";

function replaceSpace(s) {
		
    var result = s.replace(/\s/g, "%20");
    
	return result.slice(0, s.length);
}

 /*******************************************************
 * Compress string
 *******************************************************/

var input = "aabcccccaaa";
//  output  "a2blc5a3"                

function compress(s) {

    var result = "",
        counter = 0;

    for (var i = 0; i < s.length; i++) {   
        if (counter === 0) {
            result += s.charAt(i);
            counter++;
        }
    
        if (i === s.length - 1) {
            result += counter;
            break;
        }
    
        if (s.charAt(i) !== s.charAt(i + 1)) {
            result += counter;
            counter = 0;            
        } else {
            counter++;
        }    
    }
    
    if (result.length < s.length) {
    	return result;
    }
    return s;
}

/*******************************************************
 * Rotate matrix array clockwise
 *******************************************************/

var matrix = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

function rotate(m) {

    var len = m[0].length;
        result = [],
        tmp = [];

	for (var i = 0; i < len; i++) { 

        for (var j = m.length - 1; j >= 0; j--) {
            tmp.push(m[j][i]);
        }

        result.push(tmp);
        tmp = [];
    }
  
    return result;
}

/*******************************************************
 * Rotate matrix in-place clockwise
 *******************************************************/

var matrix = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16]
];

function rotate(matrix) {

    //validate input
    if(matrix === "undefined" || matrix.length === 0) {
        return matrix;
    }

    //matrix must be square
    for (var i = 0; i < matrix.length; i++) {
        if (matrix[i].length !== matrix.length) {
            return matrix;
        }
    }

	var layers = Math.floor(matrix.length / 2),
    	tmp1, 
        tmp2,
    	length = matrix.length;

    for (var i = 0; i < layers; i++) {
  
  	    for (var j = 0 + i; j < length - 1 - i; j++) {
    
            //top left 			-> top right
            //0,0 -> 0,9
            tmp1 = matrix[j][length - 1 - i];
            matrix[j][length - 1 - i] = matrix[0 + i][j];      
        
            //top right 		-> bottom right
            //0,9 -> 9,9
            tmp2 = matrix[length - 1 - i][length - 1 - j];
            matrix[length - 1 - i][length - 1 - j] = tmp1;
        
            //bottom right 	-> bottom left
            //9,9 -> 9,0
            tmp1 = matrix[length - 1 - j][0 + i];
            matrix[length - 1 - j][0 + i] = tmp2;
        
            //bottom left		-> top left
            //9,0 -> 0,0
            matrix[i][j] = tmp1;   
        }  
  }
  
  return matrix;
}

/*******************************************************
 * Match string permutation
 *******************************************************/

const a = 'aaabbc'
const b = 'cabaab'

function permutation(a, b) {
    
    if(a.length !== b.length) {
        return false
    }

    let listA = a.split('')
    let listB = b.split('')

    listA.sort()
    listB.sort()

    for(let i = 0; i < listA.length; i++) {
        if(listA[i] !== listB[i]) {
            return false
        }
    }
    return true
}

console.log(permutation(a, b))

/* Better */
const a = ['a', 'b', 'c', 'a']
const b = ['a', 'a', 'c', 'c']

function permutation(a, b) {
    
    if(a.length !== b.length) {
        return false
    }

    let map = new Map()
    for(let i = 0; i < a.length; i++) {
        if(map.has(a[i])) {
            map.set(a[i], map.get(a[i]++))
        } else {
            map.set(a[i], 1)
        }
    }

    for(let i = 0; i < b.length; i++) {
        if(map.has(b[i])) {
            let val = map.get(b[i])
            if(val === 1) {
                map.delete(b[i])
            } else {
                map.set(b[i], val - 1)
            }
        } else {
            return false
        }
    }

    return true
}

console.log(permutation(a, b))

/*******************************************************
 * How close is my guess?
 *******************************************************/

/* unique */

secret word: times
guess: carts
output: 2

function guess(secret, guess) {

	var set = new Set(),
	    count = 0;

	for (var i = 0; i < secret.length; i++) {
		set.add(secret.charAt(i));
	}

	for (var i = 0; i < guess.length; i++) {
		if(set.has(guess.charAt(i))) {
			count++;
		}		
	}

	return count;
}

/* Non-unique */

secret word: poppy
guess: perks
output: 1

function guess(secret, guess) {

	var map = new Map();
	var count = 0;

	for (var i = 0; i < secret.length; i++) {
		if (map.has(secret.charAt(i)) {
		map.set(secret.charAt(i), map.get(secret.charAt(i) + 1);
		} else {
			map.set(secret.charAt(i), 1);
		}
	}

	for (var i = 0; i < guess.length; i++) {
		if(map.has(guess.charAt(i)) {
			map.set(guess.charAt(i), map.get(guess.charAt(i)) - 1);		
			if(map.get(guess.charAt(i)) === 0) {
				map.delete(guess.charAt(i));
			}
			count++;
		}	
	}

	return count;
}



/*******************************************************
 * Check diagonals
 *******************************************************/

var matrix = [
	[7,3,5,1],
	[2,7,3,5],
	[1,2,7,3],
	[4,1,2,7]
];

function diag(matrix) {

	var rowVal;
	var columnVal;
	var originVal = matrix[0][0];

	for (var i = 0; i < matrix.length - 1; i++) {		// starting idx

		rowVal = matrix[0][i];
		columnVal = matrix[i][0];
		
	for (var j = 1; j < matrix.length - i; j++) {

		if (i === 0 && matrix[i + j][i + j] !== originVal ) { // test origin
	  		return false;
	  	}
	  
	  	if (i > 0 && matrix[0 + j][i + j] !== rowVal) {
	  		return false;
	  	}
	  
	  	if (i > 0 && matrix[i + j][0 + j] !== columnVal) {
	  		return false;
	  	}      
	}   
  }
  
  return true;
}

/*******************************************************
 * Check diagonals using substring slice & join
 *******************************************************/

var matrix = [
	[7,3,5,1],
	[2,7,3,5],
	[1,2,7,3],
	[4,1,2,7]
];

function diag(matrix) {

	// create our pattern string

	var pattern = matrix[0].join("");
	var offset = 0;
	var patternLength = 0;

	for (var i = 1; i < matrix.length; i++) {
		
		patternLength = pattern.length + i + offset;

		if ( matrix[i].length > patternLength ) {
			pattern = pattern + (matrix[i].slice(patternLength).join(""));
		}    

		pattern = matrix[i][0] + pattern;
		offset--;
	}

	// test diagonal
	var index = matrix.length - 2;
	var rowLength = 0;

	for (var i = 1; i < matrix.length; i++) {  	

		rowLength = matrix[i].length;

		if (matrix[i].join("") !== pattern.slice(index, index + rowLength)) {
			return false;
		}
		
		index--;
	}

	return true;
}


/*******************************************************
 * Set matrix to zero
 *******************************************************/

var setZeroes = function(matrix) {
    
    var coords = new Set();
    
    for (var i = 0; i < matrix.length; i++) {    
    	for (var j = 0; j < matrix[i].length; j++) {              
            if (matrix[i][j] === 0) {
              coords.add("r" + i);
              coords.add("c" + j);
            }        
        }    	
    }
    
    
    var index;
    var header;
    for (let item of coords) {
        
    	index = parseInt(item.slice(1));
    	header = item.charAt(0);
    		   		
        if (header === "r") {        
        	for (var i = 0; i < matrix[index].length; i++) {            		
                matrix[index][i] = 0;                
            }                
        }   
        
        if (header === "c") {        
        	for (var i = 0; i < matrix.length; i++) {            		
                matrix[i][index] = 0;                
            }        
        } 
    }
};


/* hacking */

var setZeroes = function(matrix) {

	var r = matrix.length;
	var l = matrix[0].length;
	for (var i = 0; i < r; i++) {
	    for (var j = 0; j < l; j++) {
	        if (matrix[i][j] === 0 && 1 / matrix[i][j] === Infinity) {
	            for (var x = 0; x < r; x++) {
	                matrix[x][j] = matrix[x][j] && -0;
	            }
	            for (var y = 0; y < l; y++) {
	                matrix[i][y] = matrix[i][y] && -0;
	            }
	        }
	    }
	}

};


/*******************************************************
 * Longest increasing path matrix
 *******************************************************/
var longestIncreasingPath = function(matrix) {
    
    if (matrix.length === 0) return 0;
    
    var cache;
    var max = 1;
    
    for (var i = 0, row = matrix.length; i < row; i++) {
        for (var j = 0, col = matrix[i].length; j < col; j++) {            
            var length = dfs(matrix, i, j, row, col, -Infinity);
            max = Math.max(max, length);
        }
    }    
    return max;
};

function dfs(matrix, i, j, row, col, value) {
    
    if (i >= row || i < 0 || j < 0 || j >= col || value >= matrix[i][j]) {
        return 0;
    }    
    
    var top = dfs(matrix, i - 1, j, row, col, matrix[i][j]);
    var down = dfs(matrix, i + 1, j, row, col, matrix[i][j]);
    var left = dfs(matrix, i, j - 1, row, col, matrix[i][j]); 
    var right = dfs(matrix, i, j + 1, row, col, matrix[i][j]);
    
    var max = Math.max(top, down, left, right);   
    
    return max + 1;
}

/* format changed */

var longestIncreasingPath = function(matrix) {
    
    if (matrix.length === 0) return 0;
    
    var cache;
    var max = 1;
    
    for (var i = 0, row = matrix.length; i < row; i++) {
        for (var j = 0, col = matrix[i].length; j < col; j++) {            
            var length = dfs(matrix, i, j, row, col);
            max = Math.max(max, length);
        }
    }    
    return max;
};

function dfs(matrix, i, j, row, col) { 
    
    var top = 0;
    var down = 0;
    var left = 0; 
    var right = 0;    
    
    // UP
    if ( (i - 1) >= 0 && matrix[i][j] < matrix[i - 1][j]) {
        top = dfs(matrix, i - 1, j, row, col);
    }
    
    // DOWN
    if ( (i + 1) < row && matrix[i][j] < matrix[i + 1][j]) {
        down = dfs(matrix, i + 1, j, row, col);
    }
    
    // LEFT
    if ( (j - 1) >= 0 && matrix[i][j] < matrix[i][j - 1]) {
        left = dfs(matrix, i, j - 1, row, col);
    }
    
    // RIGHT
    if ( (j + 1) < col && matrix[i][j] < matrix[i][j + 1]) {
        right = dfs(matrix, i, j + 1, row, col);
    }
    
    var max = Math.max(top, down, left, right);   
    
    return max + 1;
}

/* Fast solution */

var longestIncreasingPath = function(matrix) {
    var cache = [], // sets max, traverse only once
        rows = matrix.length,
        max = 0;
    
    if (rows === 0) {
        return 0;
    }
    
    // Add rows
    for (var i = 0; i < rows; i++) {
        cache.push( new Array(matrix[i].length) );
    }
    
    // Zero the array
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            cache[i][j] = 0;
        }
    }
    
    
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            max = Math.max(max, dfs(i, j, rows, matrix[i].length, matrix, cache));
        }
    }
    
    return max;
};

function dfs(i, j, rows, cols, matrix, cache) {
    if (cache[i][j] !== 0) {
        return cache[i][j];
    }
    
    var dx = [1, 0, 0, -1],
        dy = [0, 1, -1, 0],
        max = 1,
        x,
        y;
    
    // Try each direction
    for (var m = 0; m < 4; m++) {
        x = dx[m] + i;
        y = dy[m] + j;
        
        if (x >= 0 && y >= 0 && x < rows && y < cols && matrix[i][j] < matrix[x][y]) {
            max = Math.max(max, 1 + dfs(x, y, rows, cols, matrix, cache));
        }
    }
    
    cache[i][j] = max;
    
    return max;
}

/*******************************************************
 * Search matrix sorted columns
 *******************************************************/

var searchMatrix = function(matrix, target) {
    
    var lower = 0;
    
    for (var i = 0; i < (matrix.length + lower) ; i++) {
        
        if ( target < matrix[matrix.length - 1 - i][0] ) {
            lower--;
        } 
    
        if ( target <= matrix[i][matrix[i].length - 1] && target >= matrix[i][0] ) {
            
            if(binarySearch( matrix, i, target )) {
                return true;
            }
        }
    }
    
    return false;
};

function binarySearch(matrix, row, target) {

	var min = 0,
	    max = matrix[row].length - 1;

	while (max >= min) {

		var mid = Math.floor((max + min) / 2);

		if (matrix[row][mid] < target) {
			min = mid + 1;
		} else if (matrix[row][mid] > target) {
			max = mid - 1;
		} else {
			return true;
		}
	}
}


/*******************************************************
 * Valid Parentheses
 *******************************************************/

var isValid = function(s) {
    
    var stack = [];
    
    if (s.length % 2 !== 0) return false;
    
    for (var i = 0; i < s.length; i++) {
        
        if (s.charAt(i) === "(") {
            stack.push(")");
        }
        else if (s.charAt(i) === "{") {
            stack.push("}");
        }
        else if (s.charAt(i) === "[") {
            stack.push("]");
        }
        else if (s.charAt(i) === ")" && stack[stack.length - 1] === ")") {
            stack.pop();
        }
        else if (s.charAt(i) === "}" && stack[stack.length - 1] === "}") {
            stack.pop();
        }
        else if (s.charAt(i) === "]" && stack[stack.length - 1] === "]") {
            stack.pop();
        } else {
            return false;
        }
    }
    
    if (stack.length > 0) {
    	return false;
    } else {
    	return true;
    }
};
/*******************************************************
 * 
 *******************************************************/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

function insertionSortList(head) {
    
    var before = {
        val: -Infinity,
        next: null
    };

    while (head) {
        
        var prev = before;
        
        while (prev.next && prev.next.val < head.val) {
            prev = prev.next;
        }
        
        var next = head.next;	// next head 

        head.next = prev.next; 	// insert head to sorted
        prev.next = head;      	// connect sorted to inserted
        head = next;           	// assign new head
    }    
};


/* Mine */

function insertionSortList(head) {
    
    var sorted = new ListNode(-Infinity);
    
    while (head) {
        
        var insert = sorted;
        
        // find location to insert
        while (insert.next && insert.next.val < head.val) {
            insert = insert.next;
        }
        
        var tmp = insert.next;
        
        insert.next = new ListNode(head.val);
        
        insert.next.next = tmp;
        
        head = head.next;
    }
    
    return sorted.next;
};


/*******************************************************
 * Pascal rows
 *******************************************************/

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    
    if (rowIndex === 0) {
        var result = [1];
        return result;
    }
    
    if (rowIndex === 1) {
        var result = [1,1];
        return result;
    }
    
    var previous = [1,1];
    var current = [];
    
    for (var i = 2; i <= rowIndex; i++) {
        
        current = [1];
        
        for (var j = 0; j < previous.length - 1; j++) {
            
            current.push(previous[j] + previous[j + 1]);
            
        }
        
        current.push(1);
        previous = current;
    }
    
    return current;
};


/*******************************************************
 * https://leetcode.com/problems/decode-string/
 *******************************************************/

// Incomplete

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    
    var result = "";
    var stack = 0;
    var repeat = "";
    
    for (var i = 0; i < s.length; i++) {
    
        if ( !isNaN(s.charAt(i)) ) {
            repeat += s.charAt(i);
        } else {
            
            
            if ( s.charAt(i) === "[") {
                
                
                // loop through subarray
                if (repeat !== "") {
                    
                    start = i + 1;
                
                    for (var j = 0; j < parseInt(repeat); j++) {
                        result += decodeString(s.slice(start));
                    }
                    
                    repeat = "";
                }
                
                stack++;
            }
            
            
            else if (s.charAt(i) === "]") {
                
                stack--;
                
                console.log(repeat + " : "  + result);
                
                if (stack < 0) {
                    return result;
                }
            }
            
            else if (stack === 0) {
                result += s.charAt(i);    
            }
                
                
        }
    }
    
    return result;
};

/*******************************************************
 * 
 *******************************************************/

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    
    if ( x === 'undefined' || isNaN(x) ) {
        return x;
    }
    
    var minus     = false;
    var reversed  = "";
    
    if (x < 0) {
        minus = true;
        reversed += "-";
        x *= -1;
    }
    
    var y = x.toString();
    
    for (var i = y.length - 1; i >= 0 ; i--) {
        reversed += y.charAt(i);
    }
    
    var result = parseInt(reversed);
    
    // Math.pow(2,31) ... Check for int32 overflow
    if (result > ( -(1 << 31) - 1) || result < ( 1 << 31) ) 
    {
        return 0;
    }
    
    return  result;
};


/*******************************************************
 * Template Literals
 *******************************************************/

console.log(`string text line 1
string text line 2`);
// "string text line 1
// string text line 2"

var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and\nnot ${2 * a + b}.`);
// "Fifteen is 15 and
// not 20."



var person = "mike";
var age = 28;

function myTag(strings, personExp, ageExp) {

  var str0 = strings[0]; // "that "
  var str1 = strings[1]; // " is a "

  // There is technically a string after
  // the final expression (in our example),
  // but it is empty (""), so disregard.
  // var str2 = strings[2];

  var ageStr;
  if (ageExp > 99){
    ageStr = "centenarian";
  } else {
    ageStr = "youngin'";
  }

  return str0 + personExp + str1 + ageStr;

}

var output = myTag`that ${ person } is a ${ age }`

console.log( output )
// that mike is a youngin'



function tag(strings, ...values) {
  console.log(strings.raw[0]); 
  // "string text line 1 \n string text line 2"
}

tag`string text line 1 \n string text line 2`;


String.raw`Hi\n${2+3}!`;
// "Hi\n5!"

/*******************************************************
 * 
 *******************************************************/
const dragonEvents = [
  { type: 'attack', value: 12, target: 'player-dorkman' },
  { type: 'yawn', value: 40 },
  { type: 'eat', target: 'horse' },
  { type: 'attack', value: 23, target: 'player-fluffykins' },
  { type: 'attack', value: 12, target: 'player-dorkman' },
]


const totalDamageOnDorkman = dragonEvents
  .filter(function (event) {
    return event.type === 'attack'
  })
  .filter(function (event) {
    return event.target === 'player-dorkman'
  })
  .map(function(event) {
    return event.value
  })
  .reduce(function(prev, value) {
    return (prev || 0) + value
  })


const totalDamageOnDorkman = dragonEvents
  .filter(e => e.type === 'attack')
  .filter(e => e.target === 'player-dorkman')
  .map(e => e.value)
  .reduce((prev, x) => (prev || 0) + x)


/*******************************************************
 * Destructuring
 *******************************************************/

makeSound({
    weight: 23,
    sound:  'woof'
})

function makeSound({ species = 'animal', sound }) {
    console.log(`the ${animal} goes ${sound}`)
}


/*******************************************************
 * 
 *******************************************************/

function play(grid, generation) {

	// remember to do generations

	for (var g = 0; g < generation; g++) {

	for (var i = 0; i < grid.length; i++) {

for (var j = 0; j < grid[i].length; j++) {

	var map = new Map();
	map.set(“A”, 0);
	map.set(“D”, 0);
	var isAlive = false;

// center 
var center = grid[i][j];

if (center === “A”) {
	isAlive = true;
}

	// Offsets
var topOffset = getOffset(i - 1, grid.length - 1);
var leftOffset = getOffset(j - 1, grid[i].length - 1);
var rightOffset = getOffset(j + 1, grid[i].length - 1);
var bottomOffset = getOffset(i + 1, grid.length - 1);

var top = grid[topOffset)][j];
map.set(top, map.get(top) + 1);

	//top right
	var topRight = grid[topOffset][rightOffset];
	map.set(topRight , map.get(topRight ) + 1);

	//top left
	var topLeft = grid[topOffset][leftOffset];
map.set(topLeft  , map.get(topLeft) + 1);

// center left
var centerLeft = grid[i][leftOffset];
map.set(centerLeft , map.get(centerLeft) + 1);
 
// center right
var centerRight = grid[i][rightOffset];
map.set(centerRight, map.get(centerRight) + 1);

// bottom
var bottom = grid[bottomOffset][j];
map.set(bottom , map.get(bottom ) + 1);

// bottom left
var bottomLeft = grid[bottomOffset][leftOffset];
map.set(bottomLeft , map.get(bottomLeft ) + 1);

// bottom right
var bottomRight = grid[bottomOffset][rightOffset];
map.set(bottomRight , map.get(bottomRight) + 1);

var result = [];

if(isAlive) {
	if(map.get(“A”) < 2){
		result[i][j] = “D”;
	} else if (map.get(“A”) > 3) {
		result[i][j] = “D”;
	} else {
		result[i][j] = “A”;
}	
} else {
if( map.get(“A”) === 3) {
	result[i][j] = “A”;
} else {
	result[i][j] = “D”;
}
}
}		

	}

	grid = result;

	}

	return result;
}


function getOffset(index, length) {

	if ( index > length) {
		return 0;
	} 

	if ( index < 0) {
		return length;
	}

	return index;	
}


/*******************************************************
 * Object Creation / this / Bind
 *******************************************************/

let dog = {
    sound: 'woof',
    talk: function() {
        console.log(this.sound)
    }
}

/* example */

dog.talk() // "woof"
let talkFunction = dog.talk // this = undefined
let boundFunction = talkFunction.bind(dog)
boundFunction() // "woof"

/* practical example */

let button = document.getElementById('myNiceButton')

button.addEventListener(
    'click',
    //dog.talk // undefined
    dog.talk.bind(dog)
)

/* 'this' refers to the global object when no context is given */

/* this.sound = undefined */

let talk() {
    console.log(this.sound)
}

talk()



/* using bind */

let talk() {
    console.log(this.sound)
}

let boromir = {
    sound: 'one does not simply walk into mordor!'
}

let talkBoundBoromir = talk.bind(boromir)
talkBoundBoromir()  // "one does not..."
talk() // undefined



/* talk as property of the object boromir */

let talk = function() {
    console.log(this.sound)
}

let boromir = {
    speak: talk,
    sound: 'one does not simply walk into mordor!'
}

boromir.speak() // "one does not..."
talk() // undefined


// 'this' is context sensitive determined at time of the call.


/* prototype */

function talk() {
  console.log(this)
  console.log(this.sound)
}
let animal = {
  talk // talk: talk
}
animal.talk() // this is assigned to animal





function talk() {
  console.log(this) // this -> cat
  console.log(this.sound)
}
let animal = {  
  talk
}
let cat = { // can't find talk -> check prototype animal
  sound: 'meow!'
}
Object.setPrototypeOf(cat, animal)
cat.talk() // this -> cat

/*
{ sound: 'meow!' }
meow!
*/



function talk() {
  console.log(this.sound)
}
let animal = {  
  talk
}
let dog = {
  sound: 'woof!'
}
let prarieDog = {
  howl: function() {
    console.log(this.sound.toUpperCase())
  }
}
Object.setPrototypeOf(dog, animal)
dog.talk() // woof!
Object.setPrototypeOf(prarieDog, dog)
prarieDog.howl() // WOOF!



 /*******************************************************
 * Function
 *******************************************************/

/*
A Function Declaration defines a named function variable without requiring variable assignment. Function Declarations occur as standalone constructs and cannot be nested within non-function blocks. It’s helpful to think of them as siblings of Variable Declarations. Just as Variable Declarations must start with “var”, Function Declarations must begin with “function”.
*/

function bar() {
    return 3;
} 
bar() //3
bar  //function


/*
A Function Expression defines a function as a part of a larger expression syntax (typically a variable assignment ). Functions defined via Functions Expressions can be named or anonymous. Function Expressions must not start with “function” (hence the parentheses around the self invoking example below)
*/

//anonymous function expression
var a = function() {
    return 3;
}
 
//named function expression
var a = function bar() {
    return 3;
}
 



//self invoking function expression
(function sayHello() {
    alert("hello!");
})();

/*
It is an anonymous function expression that is immediately invoked

The pair of parenthesis surrounding the anonymous function turns the anonymous function into a function expression or variable expression. So instead of a simple anonymous function in the global scope, or wherever it was defined, we now have an unnamed function expression.
*/

// Shown without the parentheses here:​
? = function () {};
​
​// And with the parentheses here:​
(? = function () {});
​// An unknown variable assigned the value of a function, wrapped in a parentheses, which turns it into an unnamed function expression.

(showName = function (name) {console.log(name || "No Name")}) (); // No Name​
​
showName ("Rich"); // Rich​
showName (); // No Name

/* 
— Note that you cannot use the var keyword inside the opening pair of parentheses (you will get a syntax error), but it is not necessary in this context to use var since any variable declared without the var keyword will be a global variable anyway.
— We were able to call this named function expression both immediately and later because it has a name.
— But we can’t call the anonymous function expression later, since there is no way to refer to it. This is the reason it is only useful when it is immediately invoked.
*/


IIFE (iffy) // mmediately-invoked function expression

	// We can call multiple functions within our IIFE

(function () {
    
  function init() {
    hello()
  }

  function hello() {
    console.log('hi!')
    goodbye()
  }

  function goodbye() {
    console.log('bye!')
  }

  init()

})();


/* conditional operator */
var unnamedDocs = [], namedDocs = ["a_bridge_runover", "great_dreamers"];
​
​function createDoc(documentTitle) {
    var documentName = documentTitle 
​
        ?
​
 (function (theName) {
        var newNamedDoc = theName.toLocaleLowerCase().replace(" ", "_");
        namedDocs.push(newNamedDoc);
​
        return newNamedDoc;
    })(documentTitle)​
​
        :​
​
        (function () {
            var newUnnamedDoc = "untitled_" + Number(namedDocs.length + 1);
            unnamedDocs.push(newUnnamedDoc);
            return newUnnamedDoc;
        })();​
​
    return documentName;
}
​createDoc("Over The Rainbow"); // over_the rainbow​
​createDoc(); // untitled_4





/* ECMAScript 5 */

function Person(saying) {
  this.saying = saying
}

Person.prototype.talk = function() {
  console.log('I say: ' + this.saying)
}

var crockforg = new Person('SEMICOLONS!!111one1')
crockforg.talk()



/* ECMAScript 5 */

function Person(saying) {
  this.saying = saying
  
  /* edge case */
  return {
    dumbObject: true
  }
}

Person.prototype.talk = function() {
  console.log('I say: ' + this.saying)
}

function spawn(ctor) { // mew = new
  var obj = {} // step 1
  Object.setPrototypeOf(obj, ctor.prototype) // step 2
  //var argsArray = Array.from(arguments) // ES6: argument -> array
  var argsArray = Array.prototype.slice.apply(arguments)  
  return ctor.apply(obj, argsArray.slice(1)) || obj
}

var crockforg = spawn(Person, 'SEMICOLONS!!111one1')

console.log(
  'hello', crockforg
)

crockforg.talk()



/* This is how 'new' works */
/* ECMAScript 5 */

function Person(saying) {
  this.saying = saying
}

Person.prototype.talk = function() {
  console.log('I say: ' + this.saying)
}

function spawn(ctor) { // mew = new
  var obj = {} // step 1
  Object.setPrototypeOf(obj, ctor.prototype) // step 2
  var argsArray = Array.prototype.slice.apply(arguments)  
  return ctor.apply(obj, argsArray.slice(1)) || obj
}

var crockforg = spawn(Person, 'SEMICOLONS!!111one1')
crockforg.talk()










/* Prototypes delegates objects */

/* 
Analogy: you ask if your friend has a pen, and he asks his, and a pen is passed back to you 

Object.__proto__ 

  all objects will delegate to __proto__

  Object.__proto__ === Object.prototype // true

  Global Object() is actually a function

Object.prototype

  prototype is used when the user calls 'new', the term prototype should be prototypeToInstall or prototypeToUseInNew to be more descriptive

Object.__proto__

  __proto__ is property on an object that points out the prototype that has been set for that object

*/


let cat = {
  breed: 'munchkin'
}

let myCat = {
  name: 'Dreadlord Razorfluff'
}

Object.setPrototypeOf(myCat, cat)

console.log(myCat.breed)

// reference to the same object
console.log(myCat.__proto__) // { breed: 'munchkin' } 

cat.tailLength = 15

console.log(myCat.__proto__) // { breed: 'munchkin', tailLength: 15 }






/* 
What is Object.create?

  Creates a new Object with the prototype set to a certain object 

Object.create

  More natural than 'new' keyword

  'new' kinda look like a class, but has many quirks...

  .create is more what prototype should have been

   Object.create is a method on Object constructor, not on prototype

setPrototypeOf & messing with prototype directly on existing object

  poor performance

  Not really used in real-life performance
  
*/

const cat = {
  makeSound: function() {
    console.log(this.sound)
  }
}

const mark = Object.create(cat)
mark.sound = 'mew'
mark.makeSound()

const waffles = Object.create(cat)
waffles.sound = "MOOF!"
waffles.makeSound()

console.log(
  'Is mark a cat?',
  cat.isPrototypeOf(mark)
)




/* Implement our own create */
const cat = {
  makeSound: function() {
    console.log(this.sound)
  }
}

function objectCreate(proto) {
  const obj = {}
  Object.setPrototypeOf(obj, proto) // poor performance
  return obj
}

const mark = objectCreate(cat)
mark.sound = 'mew'
mark.makeSound()

const waffles = objectCreate(cat)
waffles.sound = "MOOF!"
waffles.makeSound()

console.log(
  'Is mark a cat?',
  cat.isPrototypeOf(mark)
)




/* ctor pattern */
const cat = {
  init: function(sound) {
    this.sound = sound
  },
  makeSound: function() {
    console.log(this.sound)
  }
}

const mark = Object.create(cat)
mark.init('mew')
mark.makeSound()

const waffles = Object.create(cat)
waffles.init('meowth')
waffles.makeSound()

console.log(
  'Is mark a cat?',
  cat.isPrototypeOf(mark)
)



/* better pattern */
const cat = {
  init: function(sound) {
    this.sound = sound
    return this
  },
  makeSound: function() {
    console.log(this.sound)
  }
}

const mark = Object.create(cat).init('mew')
mark.makeSound()

const waffles = Object.create(cat).init('meowth')
waffles.makeSound()

console.log(
  'Is mark a cat?',
  cat.isPrototypeOf(mark)
)


 /*******************************************************
 * Hoist
 *******************************************************/

/*
Function declarations and function variables are always moved (‘hoisted’) to the top of their JavaScript scope by the JavaScript interpreter
*/


 /*******************************************************
 * Transpiler
 *******************************************************/

/*
Transpilers, or source-to-source compilers, are tools that read source code written in one programming language, and produce the equivalent code in another language. Languages you write that transpile to JavaScript are often called compile-to-JS languages, and are said to target JavaScript.

They read CoffeeScript, TypeScript, and ES2015, and spit out JavaScript guaranteed to work anywhere.
*/

Transpiler

	babeljs.io 

	traceur 



 /*******************************************************
 * Convert to boolean
 *******************************************************/

var foo = 0
console.log(foo) // 0
console.log(!!foo) // false, shorter than Boolean()
console.log(Boolean(foo)) // false 


 /*******************************************************
 * Convert arguments to array
 *******************************************************/

Array.prototype.slice.call(arguments) // idiom to convert arg object to array


// example
(function() {
  console.log(arguments instanceof Array) // false 

  let args = Array.prototype.slice.call(arguments)
  console.log(args instanceof Array) //true
})()


/*******************************************************
* Assigning default values using OR || / AND &&
*******************************************************/

/* classic */
let animal = {}

function speak(animal) {
  let sound = animal.sound ? animal.sound : 'woof'
  console.log(sound)
}
speak(animal) // woof




/* classic */
function bark(sound) {
	if (!sound) {
		sound = 'woof!'
	}
}



/* better */
function bark(sound) {
	sound = sound || 'woof!'
}




/* short circuting with AND */

/* classic */
function isAdult(age) {
  if (age && age > 17) {
    return true;
  }
  ​else {
    return false;
  }
}

/* better */
function isAdult(age) {
  return age && age > 17
}



/* if else example */

/* classic */
if (userName) {
  logIn(userName)
}
else {
  signUp()
}


/* better */
userName && logIn(userName) || signUp()

/*
Explanation:
— If userName is truthy, then call the logIn function with userName as the parameter.
— If userName is falsy, call the signUp function
*/

/* classic */
var userID;
​if (userName && userName.loggedIn) {
  userID = userName.id;
}
​else {
  userID = null;
}

/* better */
var userID = userName && userName.loggedIn && userName.id

/*
Explanation:
— If userName is truthy, call userName.loggedIn and check if it is truthy; if it is truthy, then get the id from userName.
— If userName is falsy, return null.
*/

/*******************************************************
* Convert to array if not already
*******************************************************/

/* classic */
let value = 1
let arr = value instanceof Array ? value : [value]
console.log(arr) // [1]

/* better */
let arr = [].concat(value)
console.log(arr) // [1]

/*******************************************************
* Convert strings to number
*******************************************************/

/* classic */
let int = parseInt('12')
let float = parseFloat('12.3')

/* alternative */
let int = +'12'
let float = +'12.3'

/*******************************************************
* Check if an array includes an element
*******************************************************/

/* classic */
if ([1,2,3].indexOf(2) > -1) {
  console.log('includes')
}

/* alternative */
if (~[1, 2, 3].indexOf(2)) {  
  console.log('includes') 
}

/*******************************************************
* Writing multiline strings
*******************************************************/

/* classic */
var multiStr = "This is the first line\n" +
  "This is the second line\n" +
  "This is more...";

/* alternative */
var multiStr = [
  "This is the first line",
  "This is the second line",
  "This is more..."
].join("\n");



/*******************************************************
* Looping through an array
*******************************************************/

// if order unimportant
for (var i = arr.length; i--;) {
  // ...
}

// instead of
for (var i = 0; i < arr.length; i++) {
  // ...
}



/*******************************************************
* Tilde ~
*******************************************************/

/* 
It is a unary operator that takes the expression to its right performs this small algorithm on it (where N is the expression to the right of the tilde): -(N+1). 
*/

console.log(~-2); // 1
console.log(~-1); // 0
console.log(~0);  // -1
console.log(~1);  // -2
console.log(~2);  // -3

// String to Int

console.log(~~-1);    // -1
console.log(~~0);     // 0
console.log(~~1);     // 1
console.log(~~"-1");  // -1
console.log(~~"0");   // 0
console.log(~~"1");   // 1
console.log(~~true);  // 1
console.log(~~false); // 0


// Possible usage


// indexOf not found is -1
if (someStr.indexOf("a") >= 0) { 
	// Found it
} else  {
	// Not Found
}


// alternative

// converts -1 to 0, and 0 is falsey
if (~someStr.indexOf("a")) {
	// Found it
} else  {
	// Not Found
}



/*******************************************************
* Falsey
*******************************************************/

/*
JavaScript Falsy Values: null, false, 0 undefined, NaN, and “” (this last item is an empty string).

— Note that Infinity, which is a special number like NaN, is truthy; it is not falsy, while NaN is falsy.

JavaScript Truthy Values: Anything other than the falsy values.
*/



/*******************************************************
* Breakout Game
*******************************************************/

/*
<canvas id="myCanvas" width="480" height="320"></canvas>
*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
// draw code
ctx.closePath();

ctx.rect(20, 40, 50, 50);

ctx.arc(240, 160, 20, 0, Math.PI*2, false);

ctx.fillStyle = "green";

ctx.fill(); // filled shape

ctx.stroke(); // outline

ctx.clearRect(0, 0, canvas.width, canvas.height); // clears

setInterval(draw, 10);


// EventListener on key press
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
      rightPressed = true;
    }
    else if(e.keyCode == 37) {
      leftPressed = true;
    }
}

ctx.font = "16px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Score: "+score, 8, 20);



document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}



// loop
function draw() {
  // do stuff
  requestAnimationFrame(draw); // browser control frames, loop on draw
}

draw();




/*******************************************************
* Testing
*******************************************************/

Prediction

  Validate prediction
  Validate an expectation
  Failing the test is not bad

*******************************************************

// sum of a and b
function add(a, b) {
  return a + b;
}

add(2, 3);      // 5, expected
add(2, 3);      // 6, unexpected
add('2', '3');  // '23', unexpected


Expectations

  Expect 2 + 3 = 5
  Expect error IF non-numbers are used // not passing
  Expect 0.1 + 0.2 = 0.3 // 0.30000...4


// Refactor
Red, Green, Refactor Cycle

  Red   = fail
  Green = pass


*******************************************************


function add(a, b) {
  if ((typeof a && typeof b) !== 'number') {
    throw new Error('Params must be a number.');
  }

  return a + b;
}

Expectations

  Expect 2 + 3 = 5        // pass
  Expect error            // pass
  Expect 0.1 + 0.2 = 0.3  // fail


*******************************************************


function add(a, b) {
  if ((typeof a && typeof b) !== 'number') {
    throw new Error('Params must be a number.');
  }

  result = a + b;
  if (parseInt(result) !== result) {
    result = parseFloat(result.toFixed(1));
  }

  return a + b;
}

Expectations

  Expect 2 + 3 = 5        // pass
  Expect error            // pass
  Expect 0.1 + 0.2 = 0.3  // pass


*******************************************************

// Expect Function and Matcher

expect(add(2, 3)).toBe(5);
expect(add(2, 'test')).toThrow();
expect(add(0.1, 0.2)).toBe(0.3);


/*******************************************************
* Storage
*******************************************************/

Window.localStorage

  The localStorage property allows you to access a local Storage object. localStorage is similar to sessionStorage. The only difference is that, while data stored in localStorage has no expiration time, data stored in sessionStorage gets cleared when the browsing session ends—that is, when the browser is closed.

myStorage = localStorage;
localStorage.setItem('myCat', 'Tom');

*******************************************************

Window.sessionStorage

  The sessionStorage property allows you to access a session Storage object for the current origin. sessionStorage is similar to Window.localStorage, the only difference is while data stored in localStorage has no expiration set, data stored in sessionStorage gets cleared when the page session ends. A page session lasts for as long as the browser is open and survives over page reloads and restores. Opening a page in a new tab or window will cause a new session to be initiated, which differs from how session cookies work.

  It should be noted that data stored in either sessionStorage or localStorage is specific to the protocol of the page.

// Save data to sessionStorage
sessionStorage.setItem('key', 'value');

// Get saved data from sessionStorage
var data = sessionStorage.getItem('key');

// Remove saved data from sessionStorage
sessionStorage.removeItem('key');

// Remove all saved data from sessionStorage
sessionStorage.clear();


/*******************************************************
* Geolocation
*******************************************************/

Navigator.geolocation

  The Navigator.geolocation read-only property returns a Geolocation object that gives Web content access to the location of the device. This allows a Web site or app to offer customized results based on the users location.

geo = navigator.geolocation

Geolocation.getCurrentPosition()

  Determines the devices current location and gives back a Position object with the data.

Geolocation.watchPosition()

  Returns a long value representing the newly established callback func to be invoked whenever the device location changes.

Geolocation.clearWatch()

  Removes the particular handler previously installed using watchPosition().

/*******************************************************
* Security
*******************************************************/

Validation

  Required for both client & server

    Client side JS can be manipulated

/*******************************************************
* const vs Object.freeze
*******************************************************/

// An immutable, empty object
const null = Object.freeze {
  Object.create()
};


const 
  
  const applies to bindings ("variables"). It creates an immutable binding, i.e. you cannot assign a new value to the binding.

  ES6 const does not indicate that a value is ‘constant’ or immutable. A const value can definitely change. The following is perfectly valid ES6 code that does not throw an exception:

    const foo = {};
    foo.bar = 42;
    console.log(foo.bar);
    // → 42

    The only thing that’s immutable here is the binding. const assigns a value ({}) to a variable name (foo), and guarantees that no rebinding will happen. Using an assignment operator or a unary or postfix -- or ++ operator on a const variable throws a TypeError exception:

      const foo = 27;
      // Any of the following uncommented lines throws an exception.
      // Assignment operators:
      foo = 42;
      foo *= 42;
      foo /= 42;
      foo %= 42;
      foo += 42;
      foo -= 42;
      foo <<= 0b101010;
      foo >>= 0b101010;
      foo >>>= 0b101010;
      foo &= 0b101010;
      foo ^= 0b101010;
      foo |= 0b101010;
      // Unary `--` and `++`:
      --foo;
      ++foo;
      // Postfix `--` and `++`:
      foo--;
      foo++;


Object.freeze works on values, and more specifically, object values. It makes an object immutable, i.e. you cannot change its properties.





/*******************************************************
* Const vs Let
*******************************************************/

use const by default

only use let if rebinding is needed

(var shouldn’t be used in ES6)

/*******************************************************
* Generators
*******************************************************/

function factory(...) {

  // The generator's state variables

  return function generator() {
    // compute the new value
    // and update the state variables
    return value;
  };
}


// powerful example
function element(array) {
  let i = 0;
  return function generator() {
    if (i < array.length) {
      i += 1;
      return value;
    }
  };
}



/*******************************************************
* Callback
*******************************************************/

// Does the continuation argument go first or last?

function first(callback, a) {
  return callback(a);
}

function last(a, callback) {
  return callback(a);
}

// The continuation argument goes first.

function first(callback, ...a) {
  return callback(a);
}


/*******************************************************
* Async
*******************************************************/

Promises

// better 
RQ 
  // https://github.com/douglascrockford/RQ


/*******************************************************
* Try
*******************************************************/

try {
  // plan a
} catch (ignore) {
  //plan b
}
// clean up


/*******************************************************
* HTML5 Constraint validation API
*******************************************************/

More and more browsers now support the constraint validation API, and its becoming reliable. This API consists of a set of methods and properties available on each form element.

validationMessage

	A localized message describing the validation constraints that the control does not satisfy (if any), or the empty string if the control is not a candidate for constraint validation (willValidate is false), or the elements value satisfies its constraints.

validity

	A ValidityState object describing the validity state of the element.

validity.customError

	Returns true if the element has a custom error; false otherwise.

validity.patternMismatch

	Returns true if the element's value doesn't match the provided pattern; false otherwise.

	If it returns true, the element will match the :invalid CSS pseudoclass.

validity.rangeOverflow

	Returns true if the elements value is higher than the provided maximum; false otherwise.

	If it returns true, the element will match the :invalid and :out-of-range and CSS pseudoclass.

validity.rangeUnderflow

	Returns true if the elements value is lower than the provided minimum; false otherwise.

	If it returns true, the element will match the :invalid and :out-of-range CSS pseudoclass.

validity.stepMismatch

	Returns true if the element's value doesn't fit the rules provided by the step attribute; otherwise false .

	If it returns true, the element will match the :invalid and :out-of-range CSS pseudoclass.

validity.tooLong

	Returns true if the elements value is longer than the provided maximum length; else it wil be false 

	If it returns true, the element will match the :invalid and :out-of-range CSS pseudoclass.

validity.typeMismatch

	Returns true if the elements value is not in the correct syntax; otherwise false.

	If it returns true, the element will match the :invalid css pseudoclass.

validity.valid

	Returns true if the elements value has no validity problems; false otherwise.

	If it returns true, the element will match the :valid css pseudoclass; the :invalid CSS pseudoclass otherwise.

validity.valueMissing

	Returns true if the element has no value but is a required field; false otherwise.

	If it returns true, the element will match the :invalid CSS pseudoclass.

willValidate

	Returns true if the element will be validated when the form is submitted; false otherwise.

checkValidity()

	Returns true if the elements value has no validity problems; false otherwise. If the element is invalid, this method also causes an invalid event at the element.

setCustomValidity(message)

	Adds a custom error message to the element; if you set a custom error message, the element is considered to be invalid, and the specified error is displayed. This lets you use JavaScript code to establish a validation failure other than those offered by the standard constraint validation API. The message is shown to the user when reporting the problem.

	If the argument is the empty string, the custom error is cleared.

*******************************************************
Example

/*
	<form novalidate>
	  <p>
	    <label for="mail">
	      <span>Please enter an email address:</span>
	      <input type="email" id="mail" name="mail">
	      <span class="error" aria-live="polite"></span>
	    </label>
	  </p>
	  <button>Submit</button>
	</form>
*/

// There are many ways to pick a DOM node; here we get the form itself and the email
// input box, as well as the span element into which we will place the error message.

var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');
var error = document.querySelector('.error');

email.addEventListener("keyup", function (event) {
  // Each time the user types something, we check if the
  // email field is valid.
  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    error.innerHTML = ""; // Reset the content of the message
    error.className = "error"; // Reset the visual state of the message
  }
}, false);
form.addEventListener("submit", function (event) {
  // Each time the user tries to send the data, we check
  // if the email field is valid.
  if (!email.validity.valid) {
    
    // If the field is not valid, we display a custom
    // error message.
    error.innerHTML = "I expect an e-mail, darling!";
    error.className = "error active";
    // And we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
}, false);


*******************************************************
Validating without built-in API

/*
<form>
  <p>
    <label for="mail">
        <span>Please enter an email address:</span>
        <input type="text" class="mail" id="mail" name="mail">
        <span class="error" aria-live="polite"></span>
    </label>
  <p>
  <!-- Some legacy browsers need to have the `type` attribute
       explicitly set to `submit` on the `button`element -->
  <button type="submit">Submit</button>
</form>
*/

// There are fewer ways to pick a DOM node with legacy browsers
var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');

// The following is a trick to reach the next sibling Element node in the DOM
// This is dangerous because you can easily build an infinite loop.
// In modern browsers, you should prefer using element.nextElementSibling
var error = email;
while ((error = error.nextSibling).nodeType != 1);

// As per the HTML5 Specification
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Many legacy browsers do not support the addEventListener method.
// Here is a simple way to handle this; it's far from the only one.
function addEvent(element, event, callback) {
  var previousEventCallBack = element["on"+event];
  element["on"+event] = function (e) {
    var output = callback(e);
    
    // A callback that returns `false` stops the callback chain
    // and interrupts the execution of the event callback.
    if (output === false) return false;

    if (typeof previousEventCallBack === 'function') {
      output = previousEventCallBack(e);
      if(output === false) return false;
    }
  }
};

// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to  
// explicitly set the valid/invalid class on our email field
addEvent(window, "load", function () {
  // Here, we test if the field is empty (remember, the field is not required)
  // If it is not, we check if its content is a well-formed e-mail address.
  var test = email.value.length === 0 || emailRegExp.test(email.value);
 
  email.className = test ? "valid" : "invalid";
});

// This defines what happens when the user types in the field
addEvent(email, "keyup", function () {
  var test = email.value.length === 0 || emailRegExp.test(email.value);
  if (test) {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  } else {
    email.className = "invalid";
  }
});

// This defines what happens when the user tries to submit the data
addEvent(form, "submit", function () {
  var test = email.value.length === 0 || emailRegExp.test(email.value);
 
  if (!test) {
    email.className = "invalid";
    error.innerHTML = "I expect an e-mail, darling!";
    error.className = "error active";

    // Some legacy browsers do not support the event.preventDefault() method
    return false;
  } else {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  }
});


/*******************************************************
* DOM
*******************************************************/

The Document Object Model (DOM) is a programming interface for HTML and XML documents.

var paragraphs = document.getElementsByTagName("P");
// paragraphs[0] is the first <p> element
// paragraphs[1] is the second <p> element, etc.
alert(paragraphs[0].nodeName);

The DOM is not a programming language, but without it, the JavaScript language wouldnt have any model or notion of web pages, HTML documents, XML documents, and their component parts (e.g. elements).

DOM is language neutral

/*
	# Python DOM example
	import xml.dom.minidom as m
	doc = m.parse("C:\\Projects\\Py\\chap1.xml");
	doc.nodeName # DOM property of document object;
	p_list = doc.getElementsByTagName("para");
*/

When you create a script–whether its inline in a <script> element or included in the web page by means of a script loading instruction–you can immediately begin using the API for the document or window elements to manipulate the document itself or to get at the children of that document, which are the various elements in the web page.

	// create a couple of elements in an otherwise empty HTML page
	var heading = document.createElement("h1");
	var heading_text = document.createTextNode("Big Head!");
	heading.appendChild(heading_text);
	document.body.appendChild(heading);

document

	document object

element

	element refers to an element or a node of type element returned by a member of the DOM API.

nodeList

	A nodeList is an array of elements, like the kind that is returned by the method document.getElementsByTagName(). Items in a nodeList are accessed by index.

		list.item(1)

		list[1]

		*They are equivalent

attribute

	When an attribute is returned by a member (e.g., by the createAttribute() method), it is an object reference that exposes a special (albeit small) interface for attributes. Attributes are nodes in the DOM just like elements are, though you may rarely use them as such.

namedNodeMap

	A namedNodeMap is like an array, but the items are accessed by name or index, though this latter case is merely a convenience for enumeration, as they are in no particular order in the list. A namedNodeMap has an item() method for this purpose, and you can also add and remove items from a namedNodeMap.


document.getElementById(id)
document.getElementsByTagName(name)
document.createElement(name)
parentNode.appendChild(node)
element.innerHTML
element.style.left
element.setAttribute
element.getAttribute
element.addEventListener
window.content
window.onload
window.dump
window.scrollTo

/*******************************************************
* Merge 2 Arrays
*******************************************************/

let a = [2,4,6,8,9]
let b = [1,3,5,7,8]

const merge = function(lhs, rhs) {
    
    let merged = []
    let idxl = 0
    let idxr = 0

    while(true) {
        if (idxl >= lhs.length) {
            return merged.concat(rhs.slice(idxr))
        }
        else if (idxr >= rhs.length) {
            return merged.concat(lhs.slice(idxl))
        }
        else if (lhs[idxl] < rhs[idxr]) {
            merged.push(lhs[idxl++])
        } else {
            merged.push(rhs[idxr++])
        }
    }

}

console.log(merge(a, b))


/*******************************************************
* Rank array numbers
*******************************************************/


let arr = [25, 7, 54, 90, 7]

const rank = function(arr) {

    let map = new Map()
    let rank = 1
    let result = []
    let sorted = arr.slice(0) // copy
    sorted.sort(function(a, b) { // sort
        return a - b
    })
    
    for(let i = 0; i < sorted.length; i++) {
        if (!map.has(sorted[i])) {
            map.set(sorted[i], rank++)
        }
    }

    for(let i = 0; i < arr.length; i++) {
        result.push(map.get(arr[i]))
    }

    return result
}

console.log(rank(arr))

/*******************************************************
* Parse File 
	 _   _   _
	|_| | | |_
	|_|   | |_|
*******************************************************/

const fs = require('fs')

const content = fs.readFileSync('./data', 'utf8')

function mapper(c) {
    if (c === '_' || c === '|') {
        return '1' 
    }
    return '0'
}

let parse = function(s) {

    let arr = []
    let word = 1 

    for (let i = 0; i < s.length; i++) {

        // next line
        if (s.charAt(i) === '\n') {
            word = 1         
        }
        // new word
        else if (((i + 1) % 4) === 0) {
            word++
        }
        else {
            if (arr.length < word) {
                arr.push(mapper(s.charAt(i)))
            } else {
                arr[word - 1] +=  mapper(s.charAt(i))
            }            
        }
    }
    return arr
}

let parsed = parse(content)

let match = function(arr) {

    const map = new Map()
    map.set('010111111', '8')
    map.set('010101001', '7')
    map.set('010110111', '6')

    let result = ''

    for (let i = 0; i < arr.length; i++) {
        
        if (!map.has(arr[i])) {
            return 'Bad data!'
        }

        result += map.get(arr[i])
    }
    return result
}

console.log(match(parsed))

/*******************************************************
* Recure Unique Array Merge
*******************************************************/

const a = ['a', 'b', 'c', 'f']
const b = ['c', 'e', 'f', 'a', 'c']

function mergeUnique(a, b, add) {
    let result = add(a, new Set())
    result = add(b, result)
    return result
}

function add(arr, set) {
    if(arr.length === 1) {
        return set.add(arr[0])
    }
    add(arr.slice(1), set)
    set.add(arr[0])
    return set
}

console.log(mergeUnique(a, b, add))


/*******************************************************
* Retroactive Buy low sell high
*******************************************************/

const a = [500, 100, 300, 50, 200, 20]

function buyLowSellHigh(list) {
    let best = -Infinity
    let buy = Infinity

    for (let i = 1; i < list.length; i++) {
        buy = Math.min(buy, list[i - 1])
        best = Math.max(best, list[i] - buy)
    }

    return best
}

console.log(buyLowSellHigh(a))

/*******************************************************
* OOJS Object-Oriented JavaScript
*******************************************************/

// define a person
function createNewPerson(name) {
  let obj = {}
  obj.name = name
  obj.greeting = function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
  return obj
}

// create a new person
let bob = createNewPerson('Bob')
console.log(bob.name)   // Bob
bob.greeting()          // Hi! I'm Bob.



/* shortcut */
function Person(name) {
    this.name = name
    this.greeting = function() {
        console.log('Hi! I\'m ' + this.name + '.')
    }
}

// create a new person
let bob = new Person('Bob')
let joe = new Person('Joe')

console.log(bob.name)   // Bob
bob.greeting()          // Hi! I'm Bob.
console.log(joe.name)   // Joe
joe.greeting()          // Hi! I'm Joe.


We now have two new namespace: bob and joe!

/* object view */
{
  name: 'Bob',
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}

/*
NOTE: ctor function greeting() is being created every time. To avoid this we can define functions on the prototype instead!
*/


/* longer version */

function Person(first, last, age, gender, interests) {
  this.name = {
    first,
    last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.bio = function() {
    console.log(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  };
  this.greeting = function() {
    console.log('Hi! I\'m ' + this.name.first + '.');
  };
};

var person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);

console.log(person1['age'])
console.log(person1.interests[1])
person1.bio()


/* --------------------------------------------------- */
    Object() constructor
/* --------------------------------------------------- */

var person1 = new Object();

// add properties to object
person1.name = 'Chris';
person1['age'] = 38;
person1.greeting = function() {
  alert('Hi! I\'m ' + this.name + '.');
};

// pass object literal to the object()
var person1 = new Object({
  name: 'Chris',
  age: 38,
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
});



/* --------------------------------------------------- */
    create() method
/* --------------------------------------------------- */

Create a new object instance based on an existing object. !!Not a real clone in the traditional sense!!

// Same properties as person1
var person2 = Object.create(person1);

console.log(person2.interests[1])
person2.greeting()


/*******************************************************
* OOJS Object Prototypes 
*******************************************************/

Prototypes are the mechanism by which JavaScript objects inherit features from one another, and they work differently than inheritance mechanisms in classical object-oriented programming languages.

Prototype-based Language

    JavaScript is often described as a prototype-based language — each object has a prototype object, which acts as a template object that it inherits methods and properties from. An objects prototype object may also have a prototype object, which it inherits methods and properties from, and so on. This is often referred to as a prototype chain, and explains why different objects have properties and methods defined on other objects available to them.

    In classic OOP, classes are defined, then when object instances are created all the properties and methods defined on the 'class' are copied over to the instance. In JavaScript, they are not copied over — instead, a link is made between the object instance and its constructor (a link in the prototype chain), and the properties and methods are found in the constructor by walking up the chain.



/* Example */

function Person(first, last, age, gender, interests) {  
  // property and method definitions  
};
var person1 = new Person('Bob');


'Person1'

    Inherites from prototype -> Person

'Person'

    Inherites from prototype -> Object


// What happens when you call a mthod on person1?
person1.valueOf()

// What happens...

    The browser initially checks to see if the person1 object has a valueOf() method available on it.

    It doesnt, so the browser then checks to see if the person1 objects prototype object (Person) has a valueOf() method available on it.

    It doesnt either, so the browser then checks to see if the Person() constructors prototype object (Object) has a valueOf() method available on it. It does, so it is called, and all is good!


!!Note!!

    We want to reiterate that the methods and properties are not copied from one object to another in the prototype chain — they are accessed by walking up the chain as described above.

    __proto__ contains the objects prototype object (modern bowsers)




/* Prototype Property */

Think of Object.prototype as a sub-namespace

The prototype propertys value is an object, which is basically a bucket for storing properties and methods that we want to be inherited by objects further down the prototype chain.

So Object.prototype.watch(), Object.prototype.valueOf(), etc., are available to any object types that inherit from Object.prototype, including new object instances created from the constructor.

Object.is(), Object.keys(), and other members not defined inside the prototype bucket are not inherited by object instances or object types that inherit from Object.prototype. They are methods/properties available just on the Object() constructor itself.


// Example
var myString = 'This is my string.';

    myString immediately has a number of useful methods available on it, like split(), indexOf(), replace(), etc.


!!Important!!

    The prototype property is one of the most confusingly-named parts of JavaScript — you might think that this points to the prototype object of the current object, but it doesn't (that's an internal object that can be accessed by __proto__, remember?) prototype instead is a property containing an object on which you define members that you want to be inherited.


/* --------------------------------------------------- */
    Revisiting create()
/* --------------------------------------------------- */

var person2 = Object.create(person1);

    What create() actually does is to create a new object from a specified prototype object. Here, person2 is being created using person1 as a prototype object. You can check this by entering the following in the console:

    person2.__proto__ // Person { name: 'bob'... }

        Returns the person1 object



/* --------------------------------------------------- */
    Constructor Property
/* --------------------------------------------------- */

/*
Every function has a prototype property whose value is an object containing a constructor property. This constructor property points to the original constructor function. As you will see in the next section that properties defined on the Person.prototype property (or in general on a constructor function's prototype property which is an object as mentioned in the above section) become available to all the instance objects created using the Person() constructor. Hence, the constructor property is also available to both person1 and person2 objects.
*/

person1.constructor // returns [Function: Person]
person2.constructor // returns [Function: Person]

    These should both return the Person() constructor, as it contains the original definition of these instances.


/* Clever trick to create another instance */
var person3 = new person1.constructor('Karen', 'Stephenson', 26, 'female', ['playing drums', 'mountain climbing']);

    // Handy when you need to create a new instance, but dont have reference to the original constructor.

console.log(person1.constructor.name) // Person 



/* --------------------------------------------------- */
    Modifying Prototypes
/* --------------------------------------------------- */

// Add new method to the ctor's prototype property
Person.prototype.farewell = function() {
  console.log(this.name.first + ' has left the building. Bye for now!');
}

person1.farewell() // Bob has left the building. Bye for now!

    //  The whole inheritance chain has updated dynamically, automatically making this new method available on all object instances derived from the constructor.


/* Common pattern 

    Define the properties inside the constructor, and the methods on the prototype.
*/

// Constructor with property definitions
function Test(a, b, c, d) {
  // property definitions
};

// First method definition
Test.prototype.x = function() { ... }

// Second method definition
Test.prototype.y = function() { ... }

// etc.



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

/*******************************************************
* 
*******************************************************/









































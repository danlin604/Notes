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
      return (char === 'z' || char === 'Z') ? 'a' : String.fromCharCode(char.charCodeAt() + 1)
  });

  // Captialize vowels
  var captialized = replaced.replace(/a|e|i|o|u/gi, function(vowel) {
      return vowel.toUpperCase();
  });
  
  return captialized;
}

 /*******************************************************
 * Reverse string
 *******************************************************/

function reverseString(str) { 

  var strTmp = "";    
    
  for (var i = 1, length = str.length; i <= length; i++) {
      strTmp += str.charAt(length - i);
  }  
  str = strTmp;
  
  return str;         
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
		} else if (array[mid] === targetValue) {	// Exist
			return true;
		} else {
			// Unexpected
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

function mergeSort(ls) {
    if (ls.length < 2) { return ls; }    
   
    var midIdx  = Math.floor(ls.length / 2),
        lhs     = mergeSort(ls.slice(0, midIdx)),
        rhs     = mergeSort(ls.slice(midIdx));

    return merge(lhs, rhs);
}

function merge(lhs, rhs) {
    var merged  = [];
    lIdx        = 0;
    rIdx        = 0;

    while(true) {
        if (rIdx >= rhs.length) {
            return merged.concat(lhs.slice(lIdx));           
        } else if (lIdx >= lhs.length) {
            return merged.concat(rhs.slice(rIdx));            
        } else if (lhs[lIdx] < rhs[rIdx]) {
            merged.push(lhs[lIdx++]);
        } else {
            merged.push(rhs[rIdx++]);
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
			key : ''
		, children: {}
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

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(items, left, right) {

    var pivot   = items[Math.floor((right + left) / 2)],  // pivot value is middle item
        i       = left,     // starts from left and goes right to pivot index
        j       = right;    // starts from right and goes left to pivot index


    // while the two indices don't match
    while (i <= j) {

        // if the item on the left is less than the pivot, continue right
        while (items[i] < pivot) {
            i++;
        }

        // if the item on the right is greater than the pivot, continue left
        while (items[j] > pivot) {
            j--;
        }

        // if the two indices still don't match, swap the values
        if (i <= j) {
            swap(items, i, j);

            // change indices to continue loop
            i++;
            j--;
        }
    }

    // this value is necessary for recursion
    return i;
}

function quickSort(items, left, right) {

    var index;

    // performance - don't sort an array with zero or one items
    if (items.length > 1) {

        // fix left and right values - might not be provided
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;

        // split up the entire array
        index = partition(items, left, right);

        // if the returned index
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }

        if (index < right) {
            quickSort(items, index, right);
        }

    }

    return items;
}



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

 /*******************************************************
 * 
 *******************************************************/
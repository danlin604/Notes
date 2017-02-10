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
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


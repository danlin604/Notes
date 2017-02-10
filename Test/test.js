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
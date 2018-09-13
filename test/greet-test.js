let assert = require('assert')
let greet = require('./greet')

describe('Tests the functionality of my greetings app', function () {
  it('Checks user name (Cobus) and greets me in (English)', function () {
    var greetingz = greetMe(pool)
    greetingz.greeter('Cobus', 'English')
   assert.equal(greeter.greeter('Howdy Cobus <3'))
  })
})

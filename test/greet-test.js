const assert = require('assert')
const Greet = require('../greet')
const pg = require('pg')

const Pool = pg.Pool
let useSSL = false
if (process.env.DATABASE_URL) {
  useSSL = true
}
const connectionString = process.env.DATABASE_URL || 'postresql://cobus:cobus123@localhost:5432/greetings'
// triggering database request actions(open connection to db)
const pool = new Pool({
  connectionString,
  ssl: useSSL
})

beforeEach (async function () {
  await pool.query('delete from users')
})

describe('Tests the functionality of my greetings app', function () {
  it('Checks counter does not count when no data is entered.', async function () {
    var greetingz = Greet(pool)
    assert.strictEqual(await greetingz.counter(), 0)
  })
})

beforeEach (async function () {
  await pool.query('delete from users')
})
describe('Tests the functionality of my greetings app', function () {
  it('Checks user name (Cobus) and greets me in (English)', async function () {
    var greetingz = Greet(pool)
    assert.strictEqual(await greetingz.greetMe('cobus', 'English'), 'Howdy cobus <3')
    
  })
})
beforeEach (async function () {
  await pool.query('delete from users')
})
describe('Tests the functionality of my greetings app', function () {
  it('Checks if counter is working', async function () {
    var greetingz = Greet(pool)
    await greetingz.greetMe('cobus', 'Xhosa')
    await greetingz.greetMe('Jon', 'Xhosa')
    await greetingz.greetMe('James', 'Xhosa')
    assert.strictEqual(await greetingz.counter(), 3)
  })
})
beforeEach (async function () {
  await pool.query('delete from users')
})

describe('Tests the functionality of my greetings app', function () {
  it('Checks if counter is working for capitals versus no capitals', async function () {
    var greetingz = Greet(pool)
    greetingz.greetMe('Cobus', 'English')
    greetingz.greetMe('cobus', 'English')
    greetingz.greetMe('COBUS', 'English')
    assert.strictEqual(await greetingz.counter(), 1)
  })
})
// describe('Tests the functionality of my greetings app', function () {
//   it('Checks no name entered error.', async function () {
//     var greetingz = Greet()
    
//   })
// })

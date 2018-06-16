/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Player} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'admin@email.com', password: 'admin', isAdmin: true})
  ])

  const players = [
    {first_name: 'Dustin', last_name: 'Johnson', rank: 1},
    {first_name: 'Justin', last_name: 'Thomas', rank: 2},    {first_name: 'Justin', last_name: 'Rose', rank: 3},    {first_name: 'Jordan', last_name: 'Spieth', rank: 4},
    {first_name: 'Jon', last_name: 'Rahm', rank: 5},
    {first_name: 'Rory', last_name: 'McIlroy', rank: 6},
    {first_name: 'Rickie', last_name: 'Fowler', rank: 7},
    {first_name: 'Jason', last_name: 'Day', rank: 8},
    {first_name: 'Brooks', last_name: 'Koepka', rank: 9},
    {first_name: 'Hideki', last_name: 'Matsuyama', rank: 10},
  ]

  await Player.bulkCreate(players);

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')

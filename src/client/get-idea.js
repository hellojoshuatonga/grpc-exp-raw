const client = require('./client')

client.get({ id: 'a8a6440d-bb06-4be6-a2b3-3bdc3e4d9168' }, (err, ideas) => {
  console.log('client.get')
  if (err) {
    console.log('Something went wrong while fetching the idea')
    console.log(err)
    return
  }

  console.log(ideas)
})

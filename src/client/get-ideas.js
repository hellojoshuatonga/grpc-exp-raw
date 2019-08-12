const client = require('./client')

client.list({}, (err, ideas) => {
  console.log('client.list')
  if (err) {
    console.log('Something went wrong while fetching the ideas')
    console.log(err)
    return
  }

  console.log(ideas)
})

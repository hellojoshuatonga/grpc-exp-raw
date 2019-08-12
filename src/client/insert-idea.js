const client = require('./client')

client.insert({ body: 'Uber for kids party' }, (err, idea) => {
  console.log('client.insert')
  if (err) {
    console.log('Something went wrong while inserting idea')
    console.log(err)
    return
  }

  console.log(idea)
})

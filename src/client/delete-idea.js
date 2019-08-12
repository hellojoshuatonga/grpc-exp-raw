const client = require('./client')

const idea = { id: 'a8a6440d-bb06-4be6-a2b3-3bdc3e4d9168' }
client.delete(idea, (err) => {
  console.log('client.delete')

  if (err) {
    console.log('Something went wrong while deleting the idea')
    console.log(err)
    return
  }
  console.log('Deleted idea', idea.id)
})

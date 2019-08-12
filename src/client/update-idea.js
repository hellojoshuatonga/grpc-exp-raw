const client = require('./client')

const idea = {
  id: '3f08f384-e17a-40df-959e-34d8fd3478b8',
  body: 'Uber for badminton players',
}
client.update(idea, (err, idea) => {
  console.log('client.update')
  if (err) {
    console.log('Something went wrong while updating idea')
    console.log(err)
    return
  }

  console.log(idea)
})

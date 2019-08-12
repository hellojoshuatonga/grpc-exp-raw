const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const uuid = require('uuid/v4')

const packageDefinition = protoLoader.loadSync('./src/ideas.proto')
const ideasProto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()
let ideas = [
  { id: '3f08f384-e17a-40df-959e-34d8fd3478b8', body: 'Uber but for basketball' },
  { id: 'a8a6440d-bb06-4be6-a2b3-3bdc3e4d9168', body: 'Uber but for helpers' },
]

const findIdeaById = (data, id) => {
  return data.find((i) => i.id === id)
}

server.addService(ideasProto.IdeaService.service, {
  list: (_, callback) => {
    console.log('Found ideas', ideas)
    callback(null, { ideas });
  },
  get: (call, callback) => {
    const idea = findIdeaById(ideas, call.request.id)

    if (!idea) {
      console.log('No idea for', call.request.id)
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'Idea not found'
      })
    }

    console.log('Found idea', idea)
    callback(null, idea);
  },
  insert: (call, callback) => {
    const idea = { ...call.request, id: uuid() }
    ideas = [...ideas, idea]
    callback(null, idea);
  },
  update: (call, callback) => {
    const idea = findIdeaById(ideas, call.request.id)

    if (!idea) {
      console.log('No idea for', call.request.id)
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'Idea not found'
      })
    }

    const updatedIdea = { ...call.request }
    ideas = [ ...ideas, updatedIdea]
    callback(null, updatedIdea);
  },
  delete: (call, callback) => {
    const index = ideas.findIndex((i) => i.id === call.request.id)

    if (index === -1) {
      console.log('No idea for', call.request.id)
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'Idea not found'
      })
    }

    ideas = ideas.filter((_, i) => i !== index)
    console.log('Deleted idea', call.request.id)
    callback(null, {});
  },
})

server.bind('localhost:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at localhost:50051')
server.start()

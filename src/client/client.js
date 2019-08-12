const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('./src/ideas.proto')
const IdeaService = grpc.loadPackageDefinition(packageDefinition).IdeaService

const client = new IdeaService('localhost:50051', grpc.credentials.createInsecure())
module.exports = client

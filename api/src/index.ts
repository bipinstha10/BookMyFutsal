import fastify from 'fastify'
import futsals from './data/futsal.js'

const server = fastify()

server.get('/', async (request, reply) => {
  reply.send({
    status: 200,
    message: "Success",
    data: futsals
  })
})

server.listen({ port: 4001 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
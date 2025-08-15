import fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { futsalsTable } from './db/schema.ts';

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
const server = fastify()
await server.register(cors, {
 origin: ["http://localhost:5173"]
})

server.get('/futsals', async (request, reply) => {
  const futsals = await db.select().from(futsalsTable);

  reply.send({
    status: 200,
    message: "Success",
    data: futsals
  })
})

server.post('/futsals', async (request, reply) => {
  const futsalInput = request.body as typeof futsalsTable.$inferInsert;
  const futsal = await db.insert(futsalsTable).values(futsalInput).returning();

  reply.code(201).send({
    status: 201,
    message: "Futsal created successfully.",
    data: futsal
  })
})

server.listen({ port: 4001 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
}

main();
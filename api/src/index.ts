import fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { desc, eq } from 'drizzle-orm';
import { futsalsTable } from './db/schema.ts';

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
const server = fastify()
await server.register(cors, {
 origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
})

server.get('/futsals', async (request, reply) => {
  const futsals = (await db.select().from(futsalsTable).orderBy(desc(futsalsTable.createdAt)));

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

server.delete('/futsals/:id', async (request, reply) => {
  const { id } = request.params as {id:string};
    const numericId = Number(id);

  const futsal = await db.delete(futsalsTable).where(eq(futsalsTable.id, numericId)).returning();

  reply.code(200).send({
    status: 200,
    message: "Futsal deleted successfully.",
    data: futsal
  })
})

server.get('/futsals/:id', async (request, reply) => {
  const { id } = request.params as {id:string};
    const numericId = Number(id);

  const futsal = await db.select().from(futsalsTable).where(eq(futsalsTable.id, numericId));

  reply.code(200).send({
    status: 200,
    message: "Data fetched successfully.",
    data: futsal[0]
  })
})

server.put('/futsals/:id', async (request, reply) => {
  const { id } = request.params as {id:string};
  const numericId = Number(id);

  const {name, location, imageURL} = request.body as typeof futsalsTable.$inferInsert;
  

  const futsal = await db.update(futsalsTable)
  .set({name, location, imageURL})
  .where(eq(futsalsTable.id, numericId)).returning();

  reply.code(200).send({
    status: 200,
    message: "Futsal updated successfully.",
    data: futsal[0]
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
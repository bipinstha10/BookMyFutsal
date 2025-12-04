import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import "dotenv/config";

import userRoutes from "./modules/users/routes";
import futsalRoutes from "./modules/futsals/routes";
import timeSlotRoutes from "./modules/time-slots/routes";
import bookingRoutes from "./modules/bookings/routes";

async function main() {
  const server = fastify();

  await server.register(cors, {
    origin: ["http://localhost:5173", "http://192.168.18.9:5173"],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  server.register(futsalRoutes, { prefix: "futsals" });
  server.register(timeSlotRoutes, { prefix: "futsals" });
  server.register(bookingRoutes, { prefix: "futsals" });
  server.register(userRoutes, { prefix: "users" });

  server.listen({ port: 4001 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

main();

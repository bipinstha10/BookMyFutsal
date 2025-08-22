import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { timeSlotsTable } from './schema';
import { sql } from 'drizzle-orm';

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  // Define hourly slots (example: 6AM – 10PM)
  const slots = [
    { startTime: "6:00:00", endTime: "07:00:00" },
    { startTime: "07:00:00", endTime: "08:00:00" },
    { startTime: "08:00:00", endTime: "09:00:00" },
    { startTime: "09:00:00", endTime: "10:00:00" },
    { startTime: "10:00:00", endTime: "11:00:00" },
    { startTime: "11:00:00", endTime: "12:00:00" },
    { startTime: "12:00:00", endTime: "13:00:00" },
    { startTime: "13:00:00", endTime: "14:00:00" },
    { startTime: "14:00:00", endTime: "15:00:00" },
    { startTime: "15:00:00", endTime: "16:00:00" },
    { startTime: "16:00:00", endTime: "17:00:00" },
    { startTime: "17:00:00", endTime: "18:00:00" },
    { startTime: "18:00:00", endTime: "19:00:00" },
    { startTime: "19:00:00", endTime: "20:00:00" },
    { startTime: "20:00:00", endTime: "21:00:00" },
    { startTime: "21:00:00", endTime: "22:00:00" }
  ];

  // Clean existing slots to avoid duplicates
  await db.execute(sql`DELETE FROM ${timeSlotsTable}`);

  // Insert new slots
  await db.insert(timeSlotsTable).values(slots);

  console.log("✅ Time slots seeded successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error seeding time slots:", err);
  process.exit(1);
});

ALTER TABLE "bookings" DROP CONSTRAINT "bookings_futsal_id_futsals_id_fk";
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_futsal_id_futsals_id_fk" FOREIGN KEY ("futsal_id") REFERENCES "public"."futsals"("id") ON DELETE cascade ON UPDATE no action;
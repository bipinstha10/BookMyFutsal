CREATE TABLE "futsals" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "futsals_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"imageURL" varchar(500) NOT NULL
);

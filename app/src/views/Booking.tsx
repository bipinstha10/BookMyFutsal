import { useParams } from "react-router";
import Hero from "../components/Hero";
import futsals from "../data/futsals";

import { Calendar } from "primereact/calendar";
import { useState } from "react";

const Booking = () => {
  const { id } = useParams<{ id: string }>();

  const futsal = futsals.find((f) => f.id === Number(id));

  const [date, setDate] = useState<Date | null | undefined>(null);

  if (!futsal) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">Futsal not found</h2>
      </div>
    );
  }

  return (
    <>
      <Hero
        img={futsal.img}
        heading1={futsal.name}
        paragraph={futsal.location}
      />
      <div className="calendar-wrapper">
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value)}
          inline
          showWeek
        />
      </div>
    </>
  );
};

export default Booking;

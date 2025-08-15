import { useParams } from "react-router";
import Hero from "../components/Hero";
import futsals from "../data/futsals";

import { Calendar } from "primereact/calendar";
import { useState } from "react";

const Booking = () => {
  const { id } = useParams<{ id: string }>();

  const futsal = futsals.find((f) => f.id === Number(id));

  const [date, setDate] = useState<Date | null | undefined>(null);

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleDateChange = (e: any) => {
    const selected = e.value;
    setDate(selected);

    if (selected) {
      // Example slots — replace with API data later
      setAvailableSlots([
        "8:00 AM - 9:00 AM",
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "5:00 PM - 6:00 PM",
        "6:00 PM - 7:00 PM",
      ]);
    } else {
      setAvailableSlots([]);
    }
    setSelectedSlot(null); // reset selection if date changes
  };

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
    console.log(`Selected: ${slot}`);
  };

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
          // onChange={(e) => setDate(e.value)}
          onChange={handleDateChange}
          inline
          showWeek
          minDate={new Date()}
        />
      </div>

      {availableSlots.length > 0 && (
        <div className="mt-10 mb-10 flex flex-col items-center px-4">
          <h3 className="text-lg font-semibold mb-5 text-center text-green-800">
            Available Slots for {date?.toLocaleDateString()}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                className={`slot-btn ${
                  selectedSlot === slot ? "selected" : ""
                }`}
                onClick={() => handleSlotClick(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          {selectedSlot && (
            <div className="mt-8 p-5 border rounded bg-green-50 w-full sm:w-2/3 md:w-1/2 text-center">
              <p className="text-green-800">
                <strong>Selected Slot:</strong> {selectedSlot}
              </p>
              <button
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => console.log("Proceeding to payment...")}
              >
                Proceed to Book
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Booking;

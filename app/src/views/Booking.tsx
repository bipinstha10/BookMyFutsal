import { useParams } from "react-router";
import Hero from "../components/Hero";
import { useLazyGetFutsalQuery } from "../redux/api/futsal";
import { toast } from "react-toastify";
import {
  useGetAvailableSlotsQuery,
  useCreateBookingMutation,
} from "../redux/api/booking";

import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";

const Booking = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const { id } = useParams<{ id: string }>();
  const [fetchData, { data: futsalData }] = useLazyGetFutsalQuery();
  const futsal = futsalData?.data;

  // Fetch available slots
  const formattedDate = date ? date.toISOString().split("T")[0] : "";
  const { data: slotsData, isFetching } = useGetAvailableSlotsQuery(
    { futsalId: id!, date: formattedDate },
    { skip: !id || !formattedDate }
  );

  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id, fetchData]);

  const handleSlotClick = (slotId: number, isBooked: boolean) => {
    if (isBooked) {
      return;
    }
    setSelectedSlot(slotId);
  };

  const handleBooking = async () => {
    if (!id || !selectedSlot || !formattedDate || !customerName.trim()) {
      alert("Please select a slot and fill in your details.");
      return;
    }

    try {
      await createBooking({
        futsalId: id,
        timeSlotId: selectedSlot,
        bookingDate: formattedDate,
        customerName,
        phone,
      }).unwrap();

      toast.success("Booking successful!");
      setSelectedSlot(null);
      setCustomerName("");
      setPhone("");
    } catch (error) {
      console.error(error);
      toast.error("Booking failed. Please try again.");
    }
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
        img={futsal.imageURL}
        heading1={futsal.name}
        paragraph={futsal.location}
      />

      {/* Calendar */}
      <div className="calendar-wrapper">
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value ?? null)}
          inline
          showWeek
          minDate={new Date()}
        />
      </div>

      {/* Slots */}
      {date && (
        <div className="mt-10 mb-10 flex flex-col items-center px-4">
          <h3 className="text-lg font-semibold mb-5 text-center text-green-800">
            Available Slots for {date?.toLocaleDateString()}
          </h3>

          {isFetching ? (
            <p>Loading slots...</p>
          ) : slotsData?.data?.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
              {slotsData.data.map((slot) => (
                <button
                  key={slot.id}
                  className={`slot-btn px-4 py-2 rounded ${
                    slot.isBooked
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : selectedSlot === slot.id
                      ? "bg-green-500 text-white"
                      : "bg-green-100 hover:bg-green-300"
                  }`}
                  disabled={slot.isBooked}
                  onClick={() => handleSlotClick(slot.id, slot.isBooked)}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))}
            </div>
          ) : (
            <p>No slots found</p>
          )}

          {/* Booking Form */}
          {selectedSlot && (
            <div className="mt-8 p-5 border rounded bg-green-50 w-full sm:w-2/3 md:w-1/2">
              <p className="text-green-800 text-center mb-4">
                <strong>Selected Slot:</strong>{" "}
                {slotsData?.data.find((s) => s.id === selectedSlot)?.startTime}{" "}
                - {slotsData?.data.find((s) => s.id === selectedSlot)?.endTime}
              </p>

              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="border rounded p-2 placeholder:text-gray-500 text-black"
                  required
                />

                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border rounded p-2 placeholder:text-gray-500 text-black"
                />

                <button
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                  onClick={handleBooking}
                  disabled={isBooking}
                >
                  {isBooking ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Booking;

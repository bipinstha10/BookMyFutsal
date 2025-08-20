import type { BookingResponse, SlotListResponse } from "../../types";
import baseApi from "./base-api";



export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAvailableSlots: build.query<SlotListResponse, {futsalId: string; date: string}>({
      query: ({futsalId, date}) =>{
        const url = `futsals/${futsalId}/slots?date=${date}`;

        return {
          url,
        };
      },
      providesTags: ["slots"]
    }),

    createBooking: build.mutation<BookingResponse,
    {futsalId: string; timeSlotId: number; bookingDate: string; customerName: string; phone?: string}>({
      query: ({futsalId, ...body})=>{
        const url = `futsals/${futsalId}/book`;
        
        return {
          url,
          method: "POST",
          body
        };
      },
      invalidatesTags: ["bookings","slots"]
    })

  })
});

export const {useGetAvailableSlotsQuery, useCreateBookingMutation} = bookingApi;
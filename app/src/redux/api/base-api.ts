import { retry } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: retry(fetchBaseQuery({ baseUrl: "http://localhost:3000" }), {
    maxRetries: 3,
  }),
  tagTypes: ["futsals", "futsal", "slots", "bookings", "users", "user"],
  endpoints: () => ({}),
});

export default baseApi;

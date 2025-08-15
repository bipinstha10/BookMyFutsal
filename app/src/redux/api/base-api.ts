import { retry } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: retry(fetchBaseQuery({baseUrl: "http://localhost:4001"}), {
    maxRetries: 3
  }),
   tagTypes: ["futsals"],
  endpoints: () => ({})
});

export default baseApi;
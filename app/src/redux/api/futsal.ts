import type { FutsalInput } from "../../types";
import baseApi from "./base-api";

interface FutsalResponse {
  data: Record<string, string>[],
  status: number,
  message: string
}

export const futsalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFutsals: build.query<FutsalResponse, void>({
      query: () =>{
        const url = "futsals";

        return {
          url,
        };
      },
      providesTags: ["futsals"]
    }),

    postFutsals: build.mutation<FutsalResponse, FutsalInput>({
      query: (futsalInput) => {
        const url = "futsals";

        return {
          url,
          method: "POST",
          body: futsalInput
        };
      },
      invalidatesTags: ["futsals"]
    }),

      deleteFutsal: build.mutation<FutsalResponse, number>({
      query: (id) => {
        const url = `futsals/${id}`;

        return {
          url,
          method: "DELETE",
        };
      },
      invalidatesTags: ["futsals"]
    })
  })
});

export const { useGetFutsalsQuery, usePostFutsalsMutation, useDeleteFutsalMutation } = futsalApi;
import type { Futsal, FutsalListResponse, FutsalResponse } from "../../types";
import baseApi from "./base-api";



export const futsalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFutsals: build.query<FutsalListResponse, void>({
      query: () =>{
        const url = "futsals";

        return {
          url,
        };
      },
      providesTags: ["futsals"]
    }),

    getFutsal: build.query<FutsalResponse, string>({
      query: (id) => {
        const url = `futsals/${id}`;

        return {
          url,
        };
      },
      providesTags: ["futsal"]
    }),

    postFutsals: build.mutation<FutsalResponse, Futsal>({
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

    updateFutsals: build.mutation<FutsalResponse, {id: string, futsalInput: Futsal}>({
      query: ({id, futsalInput}) => {
        const url = `futsals/${id}`;


        return {
          url,
          method: "PUT",
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

export const { useGetFutsalsQuery, useLazyGetFutsalQuery, usePostFutsalsMutation,useUpdateFutsalsMutation, useDeleteFutsalMutation } = futsalApi;
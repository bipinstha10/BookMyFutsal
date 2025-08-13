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
      }
    })
  })
});

export const { useGetFutsalsQuery } = futsalApi;
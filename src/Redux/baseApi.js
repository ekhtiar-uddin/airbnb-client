import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include", // this is to get cookies from backend,
  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  // this error show for expire the access token time limit
  const result = await baseQuery(args, api, extraOptions);

  // if (result.error?.status == 404) {
  //   toast.error(result?.error?.data?.message);
  // }
  // if (result.error?.status == 403) {
  //   toast.error(result?.error?.data?.message);
  // }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["property"],
  endpoints: () => ({}),
});

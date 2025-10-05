import { baseApi } from "../baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProperties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args && Array.isArray(args)) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/properties",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["property"],
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getPropertyById: builder.query({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "GET",
      }),
      providesTags: ["property"],
      transformResponse: (response) => response,
    }),
  }),
});

export const { useGetAllPropertiesQuery, useGetPropertyByIdQuery } =
  productManagementApi;

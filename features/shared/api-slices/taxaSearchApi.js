import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taxaSearchApi = createApi({
  reducerPath: "taxaSearch",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.inaturalist.org/v1/" }),
  endpoints: (builder) => ({
    fetchTaxaSearch: builder.query({
      query: (input) => {
        let idRegex = /^[-,0-9]+$/;
        let encoded = encodeURI(input);
        let url = idRegex.test(input) ? `taxa/${encoded}` : `taxa?q=${encoded}`;
        return url;
      },
      transformResponse: (response) => {
        return response.results.map((result) => ({
          name: result.name,
          commonName: result.preferred_common_name,
          taxonId: result.id,
          rank: result.rank,
        }));
      },
    }),
  }),
});

export const { useLazyFetchTaxaSearchQuery } = taxaSearchApi;

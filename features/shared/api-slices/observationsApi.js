import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { milesToKM } from "../utilities/distanceFunctions";
import { transformObservation } from "../utilities/transformObservation";

export const observationsApi = createApi({
  reducerPath: "observationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.inaturalist.org/v1" }),
  endpoints: (builder) => ({
    fetchObservations: builder.query({
      query: ({ latlon, ids, unfiltered, radius }) => {
        let filterMode = unfiltered ? "" : "&quality_grade=research";

        const url = `/observations/?taxon_id=${ids}${filterMode}&captive=false&lat=${
          latlon[0]
        }&lng=${latlon[1]}&radius=${milesToKM(
          radius
        )}&per_page=200&acc_below=100&geoprivacy=open&photos=true`;

        return url;
      },
      transformResponse: (response, meta, arg) => {
        let obsArray = [];
        if (response.results) {
          response.results.forEach((element) => {
            let thisObs = transformObservation(
              element,
              arg.latlon[0],
              arg.latlon[1]
            );
            if (!obsArray.includes(thisObs)) {
              obsArray.push(thisObs);
            }
          });
        }
        return obsArray;
      },
    }),
  }),
});

export const { useFetchObservationsQuery } = observationsApi;

import { idObject } from "../data/idObject";
import { milesToKM } from "./distanceFunctions";
import { transformObservation } from "./transformObservation";

export const fetchFile = async (latlon, type, unfiltered, radius) => {
  let obsArray = [];
  let filterMode = "&quality_grade=research";

  if (unfiltered) {
    filterMode = "";
  }

  // console.log(radius);

  let url;

  if (idObject[type]) {
    url = `https://api.inaturalist.org/v1/observations/?taxon_id=${
      idObject[type].ids
    }${filterMode}&captive=false&lat=${latlon[0]}&lng=${
      latlon[1]
    }&radius=${milesToKM(
      radius
    )}&per_page=200&acc_below=100&geoprivacy=open&photos=true`;
  } else {
    url = `https://api.inaturalist.org/v1/observations/?taxon_id=${type}${filterMode}&captive=false&lat=${
      latlon[0]
    }&lng=${latlon[1]}&radius=${milesToKM(
      radius
    )}&per_page=200&acc_below=100&geoprivacy=open&photos=true`;
  }

  const response = await fetch(url);

  const resultsObject = await response.json();

  if (resultsObject.results) {
    resultsObject.results.forEach((element) => {
      let thisObs = transformObservation(element, latlon[0], latlon[1]);

      //   console.log(thisObs);
      //   console.log("----------------");

      if (!obsArray.includes(thisObs)) {
        obsArray.push(thisObs);
      }
    });
  }

  return obsArray;
};

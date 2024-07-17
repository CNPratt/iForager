import { getDistance } from "./distanceFunctions";
import { Observation } from "../data/Observation";

export function transformObservation(element, lat, lon) {
  let coordSplit = element.location.split(",");

  let thisLat = parseFloat(coordSplit[0]);
  let thisLon = parseFloat(coordSplit[1]);

  let trueDistance = getDistance(thisLat, thisLon, lat, lon);
  // let preDistance = trueDistance.toString();
  // let distance = parseFloat(preDistance.slice(0, 4)) + "mi";

  let thisObs = new Observation(
    element.taxon.name,
    element.taxon.preferred_common_name,
    element.place_guess,
    thisLat,
    thisLon,
    trueDistance,
    element.uri,
    element.observation_photos[0].photo.url,
    element.created_at_details.date,
    trueDistance,
    element.id
  );

  // console.log(thisObs);
  return thisObs;

  // if (!obsArray.includes(thisObs)) {
  //   obsArray.push(thisObs);
  // }
}

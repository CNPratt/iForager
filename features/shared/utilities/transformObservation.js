import { getDistance } from "./distanceFunctions";

export function transformObservation(element, lat, lon) {
  let coordSplit = element.location.split(",");

  let thisLat = parseFloat(coordSplit[0]);
  let thisLon = parseFloat(coordSplit[1]);

  let trueDistance = getDistance(thisLat, thisLon, lat, lon);

  const objKeys = Object.keys(element);

  let thisObs = {
    name: element.taxon.preferred_common_name,
    species: element.taxon.name,
    genLocation: element.place_guess,
    obsLat: thisLat,
    obsLon: thisLon,
    distance: trueDistance,
    url: element.uri,
    image: element.observation_photos[0].photo.url,
    createDate: element.created_at_details.date,
    trueDistance: trueDistance,
    trueID: element.id,
  };

  return thisObs;
}

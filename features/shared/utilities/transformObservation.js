import { getDistance } from "./distanceFunctions";

export function transformObservation(element, lat, lon) {
  let coordSplit = element.location.split(",");

  let thisLat = parseFloat(coordSplit[0]);
  let thisLon = parseFloat(coordSplit[1]);

  // Distance in miles from current location
  let trueDistance = getDistance(thisLat, thisLon, lat, lon);

  let thisObs = {
    name: element.taxon.preferred_common_name,
    species: element.taxon.name,
    genLocation: element.place_guess,
    lat: thisLat,
    lon: thisLon,
    distance: trueDistance,
    url: element.uri,
    image: element.observation_photos[0].photo.url,
    createDate: element.created_at_details.date,
    id: element.id,
  };

  return thisObs;
}

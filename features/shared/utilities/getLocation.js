import * as Location from "expo-location";

export async function getLocation() {
  let location;

  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    location = await Location.getCurrentPositionAsync({});
  } catch (error) {
    console.error("An error occurred while trying to get the location:", error);
  }

  return location;
}

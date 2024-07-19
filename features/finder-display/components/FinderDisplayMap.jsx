import MapView, { Marker } from "react-native-maps";
import MapMarkers from "./MapMarkers";

const FinderDisplayMap = ({
  listData,
  location,
  selectedId,
  setSelectedId,
}) => {
  return (
    <MapView
      // Must switch to development build for this to work
      // provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        title="Home"
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        pinColor="brown"
      />
      <MapMarkers
        items={listData}
        selectedMarker={selectedId}
        onMarkerPress={(id) => setSelectedId(id)}
      />
    </MapView>
  );
};

export default FinderDisplayMap;

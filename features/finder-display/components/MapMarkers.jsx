import React from "react";
import { Marker } from "react-native-maps";

const MapMarkers = ({ items, selectedMarker, onMarkerPress = () => {} }) => {
  return items.map((item) => {
    const isSelected = item.trueID === selectedMarker;
    const color = isSelected ? "blue" : "green";
    const title = isSelected ? item.species : null;
    const zIndex = isSelected ? 100 : 0;

    return (
      <Marker
        key={item.trueID}
        title={title}
        coordinate={{ latitude: item.obsLat, longitude: item.obsLon }}
        pinColor={color}
        style={{ zIndex }}
        onPress={() => onMarkerPress(item.trueID)}
      />
    );
  });
};

export default MapMarkers;

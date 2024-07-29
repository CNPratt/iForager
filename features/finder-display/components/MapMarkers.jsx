import React from "react";
import { Marker } from "react-native-maps";

const MapMarkers = ({ items, selectedMarker, onMarkerPress = () => {} }) => {
  return items.map((item) => {
    const isSelected = item.id === selectedMarker;
    const color = isSelected ? "blue" : "green";
    const title = isSelected ? item.species : null;
    const zIndex = isSelected ? 100 : 0;

    return (
      <Marker
        key={item.id}
        title={title}
        coordinate={{ latitude: item.lat, longitude: item.lon }}
        pinColor={color}
        style={{ zIndex }}
        onPress={() => onMarkerPress(item.id)}
      />
    );
  });
};

export default MapMarkers;

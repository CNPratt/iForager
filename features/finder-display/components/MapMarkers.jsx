import React from "react";
import { Marker } from "react-native-maps";

const MapMarkers = ({ items, selectedMarker, onMarkerSelect = () => {} }) => {
  return items.map((item) => {
    const isSelected = item.id === selectedMarker;
    const color = isSelected ? "blue" : "green";
    const title = item.species;
    const zIndex = isSelected ? 100 : 0;

    return (
      <Marker
        key={item.id}
        title={title}
        coordinate={{ latitude: item.lat, longitude: item.lon }}
        pinColor={color}
        style={{ zIndex: zIndex }}
        onSelect={() => onMarkerSelect(item.id)}
      />
    );
  });
};

export default MapMarkers;

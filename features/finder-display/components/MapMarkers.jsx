import React, { useEffect, useRef } from "react";
import { DeviceEventEmitter } from "react-native";
import { Marker } from "react-native-maps";

const MapMarkers = ({ items, selectedMarker, onMarkerSelect = () => {} }) => {
  return items.map((item) => {
    return (
      <MapMarker
        key={item.id}
        item={item}
        selectedMarker={selectedMarker}
        onMarkerSelect={onMarkerSelect}
      />
    );
  });
};

const MapMarker = ({ item, selectedMarker, onMarkerSelect }) => {
  const ref = useRef(null);

  const isSelected = item.id === selectedMarker;
  const color = isSelected ? "blue" : "green";
  const title = item.species;
  const zIndex = isSelected ? 100 : 0;

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener("onMarkerSelect", (id) => {
      if (id === item.id) {
        if (ref.current) {
          ref.current.showCallout();
        }
      }
    });

    return () => {
      sub.remove();
    };
  }, []);

  return (
    <Marker
      ref={ref}
      key={item.id}
      title={title}
      coordinate={{ latitude: item.lat, longitude: item.lon }}
      pinColor={color}
      style={{ zIndex: zIndex }}
      onSelect={() => {
        if (!isSelected) {
          onMarkerSelect(item.id);
        }
      }}
    />
  );
};

export default MapMarkers;

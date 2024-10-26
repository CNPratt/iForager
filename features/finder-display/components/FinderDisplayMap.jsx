import React, { forwardRef, useImperativeHandle, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import MapMarkers from "./MapMarkers";
import { PROVIDER_GOOGLE } from "react-native-maps";

const FinderDisplayMap = forwardRef(
  ({ listData, location, selectedId, setSelectedId }, ref) => {
    const mapRef = useRef(null);

    useImperativeHandle(ref, () => ({
      animateToRegion: (region) => {
        mapRef.current.animateToRegion(region);
      },
    }));

    return (
      <MapView
        ref={mapRef}
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
          onMarkerSelect={(id) => setSelectedId(id)}
        />
      </MapView>
    );
  }
);

export default FinderDisplayMap;

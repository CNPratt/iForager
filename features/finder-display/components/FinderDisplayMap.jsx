import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import MapView, { Marker } from "react-native-maps";
import MapMarkers from "./MapMarkers";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { DeviceEventEmitter } from "react-native";

const FinderDisplayMap = forwardRef(
  ({ listData, location, selectedId, setSelectedId }, ref) => {
    const mapRef = useRef(null);

    useImperativeHandle(ref, () => ({
      animateCamera: (config) => {
        mapRef.current.animateCamera(config);
      },
    }));

    return (
      <MapView
        ref={mapRef}
        // // Must switch to development build for this to work
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        // initialCamera={{
        //   center: {
        //     latitude: location.coords.latitude,
        //     longitude: location.coords.longitude,
        //   },
        //   zoom: 12,
        // }}
        moveOnMarkerPress={false}
      >
        <Marker
          key={"home"}
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
          onMarkerSelect={(id) => {
            console.log("Selected marker", id);
            setSelectedId(id);
          }}
        />
      </MapView>
    );
  }
);

export default FinderDisplayMap;
